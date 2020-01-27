Ahead LHS
===========

Low latency HLS and DASH Server and CDN example:

```sh
ffmpeg -thread_queue_size 32 \
        -f v4l2 -input_format mjpeg -video_size 640x360 -framerate 30 -i /dev/video0 \
        -f alsa -i hw:3 -map 0 \
        -c:v libx264 -b:v 1m -preset fast -pix_fmt yuv420p -tune zerolatency -x264-params keyint=15:min-keyint=15 -r 25\
        -c:a aac -ac 2 -b:a 96k \
        -f ssegment -segment_list_flags live \
            -segment_list_type csv -segment_time .5 -segment_list pipe:1 \
            -segment_wrap 99 work/out%02d.ts \
    | node ./ahead-server.js
```

See the samples in:

* `generate.sh` - generated image on the server
* `test-publish.sh` - an RTMP publishing point
* `test-win.sh` - simple windows example straight from a webcam
* `test.sh` - run on linux.

In order to run Ahead LHS you need to execute any ffmpeg stream with the follwing output:

```text
-f ssegment
-segment_list_flags live \
-segment_list_type csv
-segment_time .5
-segment_list pipe:1 \
-segment_wrap 99 work/out%02d.ts
```

The csv outputted by the above setup to stdout is parsed by Ahead on stdin and served immediately to the queued requests. The playlist is delivered ahead of time, hence the name.

The intention behind this
---------------------------

This software is intended to be a good http server that can serve files that don't yet exist. There are good encoders and good segmenters already, so we don't want to go into chunking
the video stream on our own.

The server is intended to:

1. Create a playlist - hls, dash and whatever else.
2. Stream the files out as soon as possible (best before they are completed)

License
--------

Ahead server is licensed under GNU Affero GPL 3.0. The details of the license can be found in the [LICENSE](./LICENSE) file.
