#!/bin/bash

ffmpeg -thread_queue_size 32 \
	-listen 1 -rtmp_app live -i rtmp://0.0.0.0/\
        -r 25\
        -c:v libx264 -b:v 1m -preset fast -pix_fmt yuv420p -tune zerolatency -x264-params keyint=25:min-keyint=25\
        -c:a aac -ac 2 -b:a 96k \
        -f ssegment -segment_list_flags live \
            -segment_list_type csv -segment_time 1 -segment_list pipe:1\
            work/out%03d.ts \
    | node ./ahead-server.js
