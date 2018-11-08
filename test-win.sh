#!/bin/bash

 ffmpeg -video_size 640x480 -framerate 25 -f dshow -i video="Live! Cam Sync HD VF0770" \
        -r 25 \
        -c:v libx264 -b:v 1m -preset fast -pix_fmt yuv420p -tune zerolatency -x264-params keyint=25:min-keyint=25 \
        -c:a aac -ac 2 -b:a 96k \
        -f ssegment -segment_list_flags live \
            -segment_list_type csv -segment_time 1 -segment_list pipe:1 \
            work/out-1-%03d.ts \
        -c:v libx264 -b:v 768k -preset fast -pix_fmt yuv420p -tune zerolatency -x264-params keyint=25:min-keyint=25 \
        -c:a aac -ac 2 -b:a 96k \
        -f ssegment -segment_list_flags live \
            -segment_list_type csv -segment_time 1 -segment_list pipe:1 \
            work/out-2-%03d.ts \
        -c:v libx264 -b:v 512k -preset fast -pix_fmt yuv420p -tune zerolatency -x264-params keyint=25:min-keyint=25 \
        -c:a aac -ac 2 -b:a 96k \
        -f ssegment -segment_list_flags live \
            -segment_list_type csv -segment_time 1 -segment_list pipe:1 \
            work/out-3-%03d.ts \
    | node ./ahead-server.js
