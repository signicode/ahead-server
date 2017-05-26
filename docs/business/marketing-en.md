Ahead Live Streaming Server
=============================

The **Ahead** Live Streaming Server is a dedicated live video streaming delivery system that allows HLS and DASH live
video streaming with super-low end-to-end latency. The whole delivery system, including CDN, adds just a single
chunk-length delay between the input and the playback using any existing video player. This means that the system
generates only **one second delay** in the whole delivery chain, compared to approximately 10 seconds in industry
standard peers like Wowza or Unified Streaming and 15 seconds on live streaming on Facebook.

**Ahead Server** offers the following market advantages:

* **Standards-Based**: The solution follows the HLS and DASH standards word-to-word (this is not a hack, this is streaming done properly)
* **Quick**: Allows with just 1 second delay for HLS and DASH streaming (over 10 times less latency than industry standard)
* **Cost-Effective**: A solely back-end solution that works with any existing player (no need to deploy any new apps or replace any players)
* **Flexible**: Able to ingest any stream compatible (rtmp, rtsp, rtp, udp, direct and more supported by ffmpeg)
* **Complete**: The solution includes all the components to integrate into any current pipeline
* **Accessible**: Video streams pass all firewalls and can be played over all networks
* **Efficient**: **Ahead Server** is highly efficient on memory, disk and CPU usage.

Signicode
-----------

Signicode, the creator of **Ahead Server**, is a technology company, based in Warsaw, Poland. The company is built
around experienced people in the video and data streaming industry. Michał Czapracki, the founder of Signicode has spent
last 10 years working on large scale polish video portals including Gazeta.tv, Onet.tv, tvn24.pl as well as on some big
international services like BeIN Sports or Fanseat.

With **Ahead Server**, Signicode is able to create a second generation live streaming ecosystem with it's partners. An
ecosystem consisting of well built encoders, CDN systems, video platforms and backbone network will allow reaching
target latencies below one second whilst fully conforming to [EU Net Neutrality Rules / Reg 2015/2120](http://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2015.310.01.0001.01.ENG&toc=OJ:L:2015:310:TOC).

To achieve that we are in the process of finding a small group of partners in these areas:

 * Broadcasters and Media Companies - entities producing the live streams
 * OVP/OTT Platform Providers - entities who handle encoding of live streams
 * CDN Service Providers - entities responsible for delivery of live streams
 * Custom Development Companies - entities responsible for end-to-end development of custom apps
 * Internet Service Providers - entities providing the network topology used to deliver live streams

All categories are where the potential customers are, but all also benefit for gaining access to **Ahead Server** before the
competition and being able to affect the development direction.

Hence Signicode offers it's partners:

 * pre-release deployment of **Ahead Server**,
 * support of a custom, on-premises integration with any existing service,
 * source code access and training to enable in-house tweaking and integration,
 * an investment offer granting the above plus direct influence over the direction of further development of the ecosystem.

Working Example
-----------------

The following recording is a showcase of the camera-to-player low latency using **Ahead Server**. The recording below is
a clip recorded by **Ahead Server** with the camera pointed at the monitor displaying the video player.

<video src="https://miura.signicode.com/zweb/alss-demo-2017-04-11-1.mp4" controls width="640" height="360"></video>

The setup casues what is called "video feedback" which is directly dependent on the delay between the camera and the
monitor. The picture that the camera records is send to the encoder, packetised, downloaded by the CDN, and subsequently
by the player, displayed on the monitor, which is then recorded by the camera. As a result you can see an infinite loop
of videos, somewhat as if you were looking at two oposing mirrors, but with a delay on every appearing picture. This
delay is exacly equal to camera-to-monitor. Here it falls much below 2 seconds despite using low end systems and without
any tuning on the encoder and player side.

The "machinery" used for recording this example is as follows:

* One standard, not modified [HLS.js v0.7.5 player from Streambox.fr](http://streambox.fr/mse/hls.js-0.7.5/demo/)
* One cheap-as-chips Creative USB 2.0 webcam
* Two [Intel NUC NUC5i5RYH](https://www-ssl.intel.com/content/www/us/en/nuc/nuc-kit-nuc5i5ryh.html) (i5-5250U CPU, 16 GB RAM)
  * First one works as the camera grabber and encoder server,
  * Second one works as the CDN proxy,
  * Both are stacked one on another and placed to act as a tripod for the camera. ;)
* One [Asus UX32VD Laptop](https://www.asus.com/Notebooks/ASUS-ZenBook-UX32VD/) as the player
* One Samsung monitor as the display
