# Filter List Authoring

A filter list is simply a text file, it can be served over HTTPS or file system.
HTTP is also accepted for backwards compatibility. However, unless served from
localhost, filter lists served over HTTP may be blocked in the future.

Details on syntax can be found [here](/notes/filter-syntax.MD#filter-syntax).

## Headers

Although optional, it is highly recommended that you write a well formatted
header. This can not only help others to understand the purpose of your filter,
but also make automated indexing easier.

Unlike Adblock Plus, Nano Adblocker and uBlock Origin will only parse a limited
set of headers. Any header that you want to be parsed must also be in the first
1024 characters of your filter list, and only the *first* one will take effect
if you have duplicate headers (for example, if you have 3 title headers, then
the first one that appears will override the next two).

### `! Title: <title>` or `# Title: <title>`

Indicates the title of the filter list, it is displayed in filter lists manager.
If this header is missing, the URL of the filter list will be used.

Examples:
```
! Title: My Filter List
# Title: My Hosts File
```

### `! Expires: <time>` or `# Expires: <time>`

Indicates the update interval of the filter list. Time can be expressed as days
or hours, but you must use an integer in either case. If you use hour as unit,
it will be rounded *up* to the nearest day. The lower cap is 1 day and the upper
cap is 60.

uBlock Origin does not enforce an upper cap, and does not accept hour as unit.

If this header is missing, Nano Adblocker will default to 3 days and uBlock
Origin will default to 5. Some built-in filter lists of Nano Adblocker
also have different update intervals than uBlock Origin, please see
[`assets.json`](/assets/assets.json) for more details. Note that this header
will override the value set in `assets.json`.

Note that if your filter list used to have this header, but removed (or became
invalid) later, then Nano Adblocker will reset the update interval to the
default value; uBlock Origin does not do this and will keep the last update
interval that it has.

Examples:
```
! Expires: 1 day
! Expires: 2 days
! Expires: 24 hours
# Expires: 3 days
```

### Other Common Headers

The first line of most filter lists is `[Adblock Plus 2.0]`, so you should name
the primary adblocker that your filter list support, that is, `[Nano Adblocker]`
or `[uBlock Origin]`. Keep in mind that even if you write `[Adblock Plus 2.0]`,
Adblock Plus will still reject your filter list if you use extended filter
syntax. Note that lines starting with `[` are treated as comments in Nano
Adblocker and uBlock Origin, so this line is optional.

Although not parsed, these are some headers that you should consider including:
- `[! or #] Description: <short description>`
- `[! or #] Author[s]: <author or list of authors>`
- `[! or #] Version: <version number>`
- `[! or #] Last modified: <date>`
- `[! or #] Homepage: <URL>`
- `[! or #] Support: <URL or email>`
- `[! or #] Licen[s or c]e: <SPDX license identifier or URL>`

## Publishing

Although users can easily subscribe to filter lists from the dashboard, it is
usually better to allow them to subscribe by simply clicking a link.

To make such link, you need to assign `href` of an anchor element (`<a>`) to:
```
ubo://subscribe?location=<URL>&title=<title>
```

Make sure the URL is pointing to a *raw* text file and not HTML. Also, only
anchor elements work, and the click must be initiated by the user. If you abuse
this feature, your domain will be blacklisted.

At lease one of such link must be present on the page when `load` event is
fired. Unlike Adblock Plus, Nano Adblocker and uBlock Origin do not parse the
link like a query string, so do not switch the order of `location` and `title`.
You should encode the URL and title with `encodeURIComponent`. Also, the title
field is required.

Note that `abp://` is also accepted, but it is recommended to use `ubo://` for
filter lists with extended syntax.

Examples (with URL to be `https://example.com/filter.txt` and title `My
Filter`):
```
ubo://subscribe?location=https%3A%2F%2Fexample.com%2Ffilter.txt&title=My%20Filter
abp://subscribe?location=https%3A%2F%2Fexample.com%2Ffilter.txt&title=My%20Filter
```
