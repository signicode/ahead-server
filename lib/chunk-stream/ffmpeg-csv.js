"use strict";

const {StringStream, createTransformModule} = require("scramjet");
const csvToArray = require("../csv-to-array");

module.exports = createTransformModule(
    (input) => input
        .split(/\r?\n/)
        .parse(csvToArray)
        .map(arr => ({
            file: arr[0],
            no: arr[0].substr(3,3),
            start_ts: arr[1],
            end_ts: arr[2]
        })),
    {StreamClass: StringStream}
);
