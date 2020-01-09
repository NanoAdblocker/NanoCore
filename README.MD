# Nano Adblocker Core

Just another adblocker

Nano Adblocker is based on [uBlock Origin](https://github.com/gorhill/uBlock).

Please open an issue if there is something you want us to know.

## Announcements

New code is now in the
[NanoCore2 repository](https://github.com/NanoAdblocker/NanoCore2). Legacy
code can be downloaded from release archives.

**Warning: Do not install from unofficial sources! Any websites that are not
linked below are considered to be unofficial.**

## Install Links

### [Get it for Edge](https://microsoftedge.microsoft.com/addons/detail/epbkapkgcmdmfpogenoebpdeibmfinpf)

### [Get it for Legacy Edge (Unmaintained)](https://www.microsoft.com/store/productId/9NSXDX2TDB3V)

### [Get it for Chrome or Chromium](https://chrome.google.com/webstore/detail/nano-adblocker/gabbbocakeomblphkmmnoamkioajlkfo)

### [Get Nano Defender, the perfect companion extension for Nano Adblocker](https://jspenguin2017.github.io/uBlockProtector/)

## Official Ports

### [Get it for Firefox (Maintained by @LiCybora)](https://github.com/LiCybora/NanoCoreFirefox#nano-adblocker-core-for-firefox)

**Maintainers wanted for other browsers (open an issue and let me know)**

## For Developers

### [Edge version discussion thread](https://github.com/NanoAdblocker/NanoCore/issues/253)

## Notable Changes

### Nano Filter Editor

- Syntax highlighting
- Linting

![Screenshot](https://i.imgur.com/4KlLbcp.png)

### Nano Filter Viewer

- Blazing fast
- Plain string and regular expression search

![Screenshot](https://i.imgur.com/d9pVP3z.png)

### Nano Extra Resources

[View resources library](https://github.com/NanoAdblocker/NanoFilters/blob/master/NanoFiltersSource/NanoResources.txt)

## Other Changes

*Note: user interface and other housekeeping changes are not listed here.*

- [Extended advanced settings](https://github.com/NanoAdblocker/NanoCore2/blob/master/notes/advanced_settings.md#advanced-settings)
- [Tweaked filter syntax](https://github.com/NanoAdblocker/NanoCore2/blob/master/notes/filter_syntax.md#filter-syntax)
- Enabled `Block CSP reports` by default (to prevent websites from abusing it
  to track users)
- Made cache control button to be always shown
- Added force scroll mode (to be used with element zapper)
- Added Quick Issue Reporter
- Added a few more filters to filters manager

There are also a few changes specifically for Edge:
- Mapped `fetch` requests to `xhr`
