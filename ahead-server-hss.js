const express = require('express');
const cors = require('cors');
const csvToArray = require('./lib/csv-to-array');
const morgan = require('morgan');

const scramjet = require('scramjet')
    .plugin(require("./ahead-sj-plugin"));

const conf = {
    chunk_duration: 1,
    index_length: 10,
    lookback: 3,
    chunkTemplate: "/fragments/:no.mp4"
};

const chunks = require("./lib/chunk-repo")();

let currentManifest = '';

const updateStream = process.stdin.pipe(new scramjet.StringStream())
    .split(/\r?\n/)
    .parse(csvToArray)
    .mapChunkInfo(conf)
    .mapChunksToIndex(conf, chunks)
    .createSmoothManifest(conf)
    .each((manifest) => currentManifest = manifest)
    .on("error", (e) => {
        console.error(e + '');
        process.exit(126);
    });

express()
    .use(cors())
    .use(morgan("tiny"))
    .get('/index-up', (req, res) => updateStream.pipe(res))
    .get('/Manifest', (req, res) => res.set({"content-type": "application/x-mpegURL"}).send(currentManifest))
    .get(conf.chunkTemplate, (req, res) => chunks.get(req.params.no).then((chunk) => res.send(chunk)))
    .listen(3000)
;
