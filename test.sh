#!/bin/bash

ffmpeg -thread_queue_size 32 \
        -f v4l2 -input_format mjpeg -video_size 640x360 -framerate 30 -i /dev/video0 \
        -f alsa -i hw:3 -map 0 \
        -c:v libx264 -b:v 1m -preset fast -pix_fmt yuv420p -tune zerolatency -x264-params keyint=15:min-keyint=15 -r 25\
        -c:a aac -ac 2 -b:a 96k \
        -f ssegment -segment_list_flags live \
            -segment_list_type csv -segment_time 1 -segment_list pipe:1 \
            -segment_wrap 99 work/out%02d.ts \
    | node ./ahead-server.js
