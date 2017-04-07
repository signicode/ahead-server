const express = require('express');
const scramjet = require('scramjet');
const path = require('path');
const fs = require("mz/fs");
const cors = require('cors');
const csvToArray = require('./lib/csv-to-array');
const morgan = require('morgan');
//const qs = require('querystring');

const playlistHeader = [
    "#EXTM3U",
    "#EXT-X-TARGETDURATION:1",
    "#EXT-X-VERSION:3",
    ""
].join("\n");

const index = [];
const noIndex = [];
const conf = {
    chunk_length: 1,
    index_length: 10
};

let removed = 0;
const chunks = {
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
        fs.readFile(path.resolve(process.cwd(), 'work', file)).then(chunks.stub(no).resolver);
    },
    drop(no) {
        removed++;
        chunks[no] = null;
    },
    end() {
        for (const k in chunks) {
            if (chunks.hasOwnProperty(k) && chunks[k] && chunks[k].rejector) {
                chunks[k].rejector();
            }
        }
    }
};

const updateStream = process.stdin.pipe(new scramjet.StringStream())
    .split(/\r?\n/)
    .parse(csvToArray)
    .map(arr => ({
        file: arr[0],
        no: arr[0].substr(3,2),
        start_ts: arr[1],
        end_ts: arr[2]
    }))
    .each(
        (chunk) => {
            console.error("chunk", chunk.no);
            index.push("#EXTINF:" + conf.chunk_length);

            let no = "0" + ( (+chunk.no.replace(/^0/, '') + 8) % 100);
            no = no.substr(no.length - 2);
            index.push("out"+no+".ts");

            noIndex.push(chunk.no);


            if (index.length > conf.index_length * 2) {
                index.shift();
                index.shift();
                chunks.drop(noIndex.shift());
            }

            chunks.set(chunk.no, chunk.file);
        }
    )
    .on("error", (e) => {
        console.error(e + '');
        process.exit(126);
    });

express()
    .use(cors())
    .use(morgan("tiny"))
    .get('/index-up', (req, res) => updateStream.pipe(res))
    .get('/index.m3u8', (req, res) => res.send(
        '#EXTM3U\n' +
        '#EXT-X-STREAM-INF:BANDWIDTH=1228800,CODECS="mp4a.40.2,avc1.4d401e",RESOLUTION=640x360\n' +
        '360p.m3u8\n'
    ))
    .get('/360p.m3u8', (req, res) => res.send(playlistHeader + "#EXT-X-MEDIA-SEQUENCE:" + removed + "\n" + index.join('\n')))
    .get("/out:no.ts", (req, res) => chunks.get(req.params.no).then((chunk) => res.send(chunk)))
    .listen(3000)
;
