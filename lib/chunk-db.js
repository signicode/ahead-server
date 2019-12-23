const path = require("path");
const fs = require("mz/fs");

module.exports = () => {
    const chunks = {
        removed: 0,
        stub(no) {
            if (!chunks[no]) {
                chunks[no] = {};
                chunks[no].promise = new Promise((res, rej) => {
                    chunks[no].resolver = (v) => (chunks[no] = {promise: chunks[no].promise}, res(v));
                    chunks[no].rejector = (v) => (chunks[no] = {promise: chunks[no].promise}, rej(v));
                });
            }

            return chunks[no];
        },
        get(no) {
            return chunks.stub(no).promise;
        },
        set(no, file) {
            fs.readFile(path.resolve(process.cwd(), "work", file)).then(chunks.stub(no).resolver);
        },
        drop(no) {
            chunks.removed++;
            chunks[no] = null;
        },
        end() {
            for (const k in chunks) {
                if (Object.prototype.hasOwnProperty.call(chunks, k) && chunks[k] && chunks[k].rejector) {
                    chunks[k].rejector();
                }
            }
        }
    };

    return chunks;
};
