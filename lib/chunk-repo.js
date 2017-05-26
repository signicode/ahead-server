const path = require('path');
const fs = require("mz/fs");

module.exports = () => ({
    cache: [],
    stub(no) {
        if (!this.cache[no]) {
            this.cache[no] = {};
            this.cache[no].promise = new Promise((res, rej) => {
                this.cache[no].resolver = (v) => (this.cache[no] = {promise: this.cache[no].promise}, res(v));
                this.cache[no].rejector = (v) => (this.cache[no] = {promise: this.cache[no].promise}, rej(v));
            });
        }

        return this.cache[no];
    },
    get(no) {
        return this.stub(no).promise;
    },
    set(no, file) {
        fs.readFile(path.resolve(process.cwd(), 'work', file)).then(this.stub(no).resolver);
    },
    drop(no) {
        this.removed++;
        if ("rejector" in this.cache[no])
            this.cache[no].rejector();
            
        this.cache[no] = null;
    },
    end() {
        for (const k in this.cache) {
            if (this.cache.hasOwnProperty(k) && this.cache[k] && this.cache[k].rejector) {
                this.cache[k].rejector();
            }
        }
    }
});
