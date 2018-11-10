# Advanced Settings

If you are not familiar with advanced settings of uBlock Origin,
[**please read this first**](https://github.com/gorhill/uBlock/wiki/Advanced-settings).

## Differences

In Nano Adblocker, most of the advanced settings are the same as uBlock Origin,
however, the default value of some settings are different:
- `assetFetchTimeout` defaults to `60`
- `autoUpdateAssetFetchPeriod` defaults to `300` <sup>1</sup>
- `autoUpdatePeriod` defaults to `4`
- `manualUpdateAssetFetchPeriod` defaults to `1` <sup>1</sup>

<sup>1</sup> When fetching assets, you should either get them all done in one
burst or wait a significant delay between them. It is expensive to keep sockets
open and it is even more expensive to create new ones. In fact, holding sockets
open is how
[Slowloris](https://en.wikipedia.org/wiki/Slowloris_(computer_security)) attacks
are carried out.

Beside different defaults, Nano Adblocker also offers a few more functionalities
in the advanced settings page. These advanced functionalities **can change or
break at any time**, make sure to back up your settings if you want to play
around with them. Please open an issue when they break for you, or otherwise
behave in a way that contradicts the description below. We cannot fix issues
that we are not aware of, so please take the time to report them!

## Extra Functionalities

When a functionality is marked as `[unavailable]`, it may show in the advanced
settings page, but will not work at all, not work as expected, or cause breakage
when touched. Also, implications of the descriptions of such functionalities
may not be accurate.

When a functionality is marked as `[experimental]`, it may work properly, work
sometimes, not work at all, not work as expected, or cause breakage when
touched.

Even when a functionality is considered stable, it is not guaranteed to always
work. **Use at your own risk!**

### `_nanoRestart` invokable

Available since 1.0.0.29

When invoked, Nano Adblocker will restart. **Any unsaved changes will be
discarded** during the restart and all opened extension pages will be closed.

### `_nanoForceRecompile` invokable

Available since 1.0.0.22

When invoked, Nano Adblocker will discard compiled filters and internal selfies
then restart, during which *all* filters will be recompiled. **Any unsaved
changes will be discarded** during the restart and all opened extension pages
will be closed.

### `_nanoAttemptPolyfillHTMLFiltering` toggleable `[unavailable]`

Default: `false`

When set to `true`, Nano Adblocker will attempt to polyfill request body
filtering for (only) browsers that are *marked* as do not natively support it.
The polyfill is less reliable and consumes more resource. This settings is
**not** affected by whether advanced mode is on.

### `_nanoDisableHTMLFiltering` toggleable `[experimental]`

Available since 1.0.0.29

Default: `false`

When set to `true`, Nano Adblocker will *mark* the browser as does not support
native request body filtering regardless whether it actually supports it. An
extension restart is required. This settings is **not** affected by whether
advanced mode is on.

### `_nanoIgnorePerformanceAuditing` toggleable `[unavailable]`

Default: `false`

When set to `true`, Nano Adblocker will no longer discard slow filter rules
from `My filters` when compiling filters **in the future**. Similarly, setting
this toggle to `false` **or turning off advanced mode** will **not** cause slow
filters to be immediately removed.

Performance *will* be flushed down the toilet if not used properly, make sure
you have a *really* fast computer when playing around with this settings.

### `_nanoIgnoreThirdPartyWhitelist` toggleable `[experimental]`

Available since 1.0.0.22

Default: `false`

When set to `true`, Nano Adblocker will discard exception and `badfilter` rules
from all filter lists except `My filters` when compiling filters **in the
future**. Similarly, setting this toggle to `false` **or turning off advanced
mode** will **not** cause discarded filters to be immediately restored.

Negated domains are sometimes transformed into exception rules, and they will
not be affected **for now**. This will be fixed soon.

Setting this toggle to `true` **will definitely** break *many* websites and
you are to fix them **by yourself**.

### `_nanoMakeUserFiltersPrivileged` toggleable

Available since 1.0.0.22

Default: `false`

When set to `true`, Nano Adblocker will treat user filters as a privileged
filter when compiling filters **in the future**. Similarly, setting this
toggle to `false` **or turning off advanced mode** will **not** cause
privileged filters to be immediately removed.

Privileged filters have access to privileged resources. Nano Adblocker's own
filters (Nano filters) are always privileged.
