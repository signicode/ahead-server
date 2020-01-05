const ffmpegCsv = require("./ffmpeg-csv");

const getChunkStream = (type, input) => {
    switch(type) {
    case "ffmpeg":
    case "ffmpeg-csv":
        return ffmpegCsv(input);
    }
};

module.exports = Object.assign(
    getChunkStream,
    {
        ffmpegCsv
    }
);
