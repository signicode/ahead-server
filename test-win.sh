#!/bin/bash

 ffmpeg -video_size 640x480 -framerate 25 -f dshow -i video="USB2.0 HD UVC WebCam" \
        -r 25 \
        -c:v libx264 -b:v 1m -preset fast -pix_fmt yuv420p -tune zerolatency -x264-params keyint=50:min-keyint=50 \
        -c:a aac -ac 2 -b:a 96k \
        -f ssegment -segment_list_flags live \
            -segment_list_type csv -segment_time 2 -segment_list pipe:1 \
            work/out%03d.ts \
    | node ./ahead-server.js
