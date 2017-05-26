Ahead LSH
===========

Sub second latency HLS and DASH Server and CDN

ffmpeg -thread_queue_size 32 \
        -f v4l2 -input_format mjpeg -video_size 640x360 -framerate 30 -i /dev/video0 \
        -f alsa -i hw:3 -map 0 \
        -c:v libx264 -b:v 1m -preset fast -pix_fmt yuv420p -tune zerolatency -x264-params keyint=15:min-keyint=15 -r 25\
        -c:a aac -ac 2 -b:a 96k \
        -f ssegment -segment_list_flags live \
            -segment_list_type csv -segment_time .5 -segment_list pipe:1 \
            -segment_wrap 99 work/out%02d.ts \
    | node ./ahead-server.js

Server operation
------------------

The server follows the guidelines theoretically set in the following document from GPAC and uses a special twist to this to deliver
sub second latency in the player itself.

[Overhead and Performance of Low Latency Live Streaming using MPEG-DASH](http://biblio.telecom-paristech.fr/cgi-bin/download.cgi?id=14719).



License
--------

THIS IS NOT LICENSED. YOU HAVE NO RIGHT TO USE THIS UNLESS YOU HAVE A WRITTEN PERMISSION FROM THE RIGHTS OWNER!
