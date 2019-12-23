
/** From: https://stackoverflow.com/a/41563966/3790725 */
const csvToArray = (text) => {
    let p = "";
    let row = [""];
    let ret = [row];
    let i = 0;
    let r = 0;
    let s = !0;
    for (let l of text) {
        if ("\"" === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if ("," === l && s) l = row[++i] = "";
        else if ("\n" === l && s) {
            if ("\r" === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = ""]; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret[0];
};

module.exports = csvToArray;
