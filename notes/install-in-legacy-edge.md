# Install in Legacy Edge

Builds for legacy Edge are no longer maintained!

## Store Version

[Nano Adblocker](https://www.microsoft.com/store/productId/9NSXDX2TDB3V)

## Side Loading

*Note: Edge will disable side loaded extensions on every launch*

1. Download build(s) from the release page and extract it:
    - [Nano Adblocker](https://github.com/NanoAdblocker/NanoCore/releases)
    - [Nano Defender](https://github.com/jspenguin2017/uBlockProtector/releases)

2. Open Edge, open `Settings` pannel, scroll all the way down, you should see
   a version number that is at least `42.17134.1.0`. If not, you need to
   first update Windows. 

3. Enter the page `about:flags` and check `Enable extension developer features`.

4. Restart Edge, open `Extensions` pannel, click `Load extension` button to
   side load the extracted package(s) from step 1.
