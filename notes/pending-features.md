# Pending Features

This file details all feature requests that are accepted or close to be
accepted. We will implement them eventually, feel free to submit Pull Requests
to speed up the process.

Features in the same group do not have any particular order.

Local issues (**issues in *this* repository, *not* upstream**) related to
features listed here will stay closed until there are work being done to
implementing them. Discussion can continue in those closed issues. Please
create new local issues if none exists for the feature you want to talk about.

Please search this file and the local issues tracker before opening feature
request issues.

## Group 1

These features are either trivial to implement or pretty useful. We will
implement them when we have time.

---

Add clear statistics.

`easy`

https://github.com/gorhill/uBlock/issues/3315

---

Make `_nanoIgnoreThirdPartyWhitelist` also discard rules transformed to
exception rules due to only having negated domains.

---

Add button to Logger for disabling selected filter.

Use `badfilter` for network filters and `#@#` for others, not possible to
neutralize all filters as of now.

## Group 2

These features are either too hard to implement for what they achieve or not
very useful. We have no plan in implementing them for now. They will be moved
to group 1 if there are enough demand for them. Like always, you can submit
Pull Requests to speed things up.

---

Option to synchronize settings to Google Drive or Dropbox.

https://github.com/gorhill/uBlock/issues/3572

---

`$document` for whitelist.

This should only be available to user filters unless the user chooses to
enable it for all fitlers.

`hard`

---

Option to make synchronization automatic.

Could be difficult to get it right. Need to consider merge conflicts and
storage cap.

`hard`

https://github.com/gorhill/uBlock/issues/783

---

An option to not collapse network blocked resources on a per-domain or URL
basis.

Adblock Plus seems to have the option `$~collapse`.

`hard`

https://github.com/gorhill/uBlock/issues/1146

---

Whitelist for a limited amount of time or until page close.

Need to investigate how should cache be handled.

`hard`

https://github.com/gorhill/uBlock/issues/3178

---

Allow custom warning text for strict blocking.

https://github.com/NanoAdblocker/NanoFilters/issues/2

---

Clicking domain in popup UI expand that one domain.

`low priority`

https://github.com/gorhill/uBlock/issues/284

---

Add undo button for wizard-created filters.

`hard`

https://github.com/gorhill/uBlock/issues/515

---

Add dark theme.

Maybe separate settings for normal and incognito mode?

Blocked by https://github.com/NanoAdblocker/NanoCore/issues/33

`blocked` `low priority`

https://github.com/gorhill/uBlock/issues/3342

---

Add tool tips to Logger.

`low priority`

---

Style Subreddit to fit our theme.

`low priority`

## Group 3

These features are either unimaginably hard to implement or close to pointless.
We are still considering whether the idea should be accepted. Please inform us
before making Pull Requests for these features.

---

Count script snippets separately.

`pointless` `hard`

https://github.com/gorhill/uBlock/issues/2837

---

Public API for better integration with other extensions.

It is more difficult than it sounds, as we also need a whitelist manager for
which extension is allowed to connect.

`very hard`

https://github.com/gorhill/uBlock/issues/3352

---

Add XPath 3.1 polyfill.

`very hard`

https://github.com/gorhill/uBlock/issues/3389
