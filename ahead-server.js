const express = require("express");
const scramjet = require("scramjet");
const cors = require("cors");
const csvToArray = require("./lib/csv-to-array");
const chunkdb = require("./lib/chunk-db");
const morgan = require("morgan");

const playlistHeader = "#EXTM3U\n#EXT-X-TARGETDURATION:1\n#EXT-X-VERSION:3\n";

const mainPlaylist = "#EXTM3U\n"+
    "#EXT-X-STREAM-INF:BANDWIDTH=1228800,CODECS=\"mp4a.40.2,avc1.4d401e\",RESOLUTION=640x360\n"+"360p.m3u8\n"
;

const index = [];
const noIndex = [];
const conf = {
    chunk_length: 1,
    index_length: 10
};

const chunks = chunkdb();

const updateStream = process.stdin.pipe(new scramjet.StringStream())
    .split(/\r?\n/)
    .parse(csvToArray)
    .map(arr => ({
        file: arr[0],
        no: arr[0].substr(3,3),
        start_ts: arr[1],
        end_ts: arr[2]
    }))
    .each(
        (chunk) => {
            console.error("chunk", chunk.no);
            index.push("#EXTINF:" + conf.chunk_length);

            let no = "00" + ( (+chunk.no.replace(/^0/, "") + 3) % 1000);
            no = no.substr(no.length - 3);
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
        console.error(e.stack);
        // eslint-disable-next-line no-process-exit
        process.exit(126);
    });

express()
    .use(cors())
    .use(morgan("tiny"))
    .get("/index-up", (_req, res) => updateStream.pipe(res))
    .get("/index.m3u8", (_req, res) => res.set({"content-type": "application/x-mpegURL"}).send(mainPlaylist))
    .get("/360p.m3u8", (_req, res) => res.send(playlistHeader + "#EXT-X-MEDIA-SEQUENCE:" + chunks.removed + "\n" + index.join("\n")))
    .get("/out:no.ts", (req, res) => chunks.get(req.params.no).then((chunk) => res.send(chunk)))
    .listen(3000)
;
