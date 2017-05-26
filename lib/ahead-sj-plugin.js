module.exports = {
    DataStream: {
        mapChunkInfo({chunk_duration: duration}) {
            let n = 0;
            return this.map(arr => ({
                file: arr[0],
                start_ts: arr[1],
                end_ts: arr[2],
                duration,
                indexName: "out" + (n++) + '.ts'
            }));
        },
        mapChunksToIndex({index_length: indexLength}, chunks) {
            const index = [];

            return this.map(
                (chunk) => {

                    if (index.length > indexLength) {
                        const ref = index.shift();
                        if (index.length > indexLength * 2) {
                            chunks.drop(ref);
                        }
                    }

                    chunks.set(chunk.indexName, chunk);

                    return index.slice();
                }
            );
        },
        createSmoothManifest({chunkTemplate}) {

        }
    }
};
