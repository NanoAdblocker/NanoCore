# Install in Edge

The Edge builds are still **in beta**, please report problems you encounter,
even minor ones! We can not fix bugs that we are not aware of!

## Store Version

[Nano Adblocker](https://www.microsoft.com/store/productId/9NSXDX2TDB3V)

Nano Defender is in review queue, please use
[Feedback Hub](https://aka.ms/extension-request) to help speeding up the
process.

## Side Loading

*Note: Edge will disable side loaded extensions on every launch*

1. Download build(s) from the release page and extract it:
    - [Nano Adblocker](https://github.com/NanoAdblocker/NanoCore/releases)
    - [Nano Defender](https://github.com/jspenguin2017/uBlockProtector/releases)

2. Open Edge, open `Settings` pannel, scroll all the way down, you should see
   a version number that is at least `42.17134.1.0`. If not, you need to
   first update Windows. 

3. Enter the page `about:flags` and check `Enable extension developer features`.

4. Restart Edge, open `Extensions` pannel, click `Load extension` button to side
   load the extracted package(s) from step 1.

## Privacy Policy

Nano Adblocker and Nano Defender do not actively collect any data of any kind.

Nano Adblocker may connect to first-party and/or third-party servers to download
assets updates. Built-in assets are defined [here](/assets/assets.json). You
may import other assets, in which case Nano Adblocker will connect to
additional servers as per your instruction.

When connecting to first-party servers, Nano Adblocker *may* supply a version
key (a hard-coded random string generated at *compile time*). A cache buster
will always be supplied, it will reveal your system time accurate to 1 hour,
your timezone will be kept private.

By default, Nano Adblocker will *try* to block tracking scripts that would not
result in breakage of the website, but there may be both false negatives and
false positives. Nano Adblocker cannot protect yourself from tracking done by
Edge nor Windows.

Nano Defender may connect to third-party servers when it is required for fixing
a website, only the bare minimum data required to successfully perform the
request will be sent. Nano Defender will never connect to a first-party server
unless you loaded it in debug mode.

We reserve the right to modify this privacy policy at any time, with or without
notice. By using Nano Adblocker and/or Nano Defender, you consent to this
privacy policy as well as the GPL-3.0 license.
