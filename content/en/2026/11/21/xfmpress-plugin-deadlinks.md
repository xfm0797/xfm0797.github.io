---
lang: en
translationKey: xfmpress-plugin-deadlinks
title: "deadlinks: catch broken internal links at build time"
date: 2026-11-21 14:06:00
description: xfm-plugin-deadlinks resolves every internal href and src against the real output set after a build and lists whatever points nowhere in the console.
category: plugins
tags: [xfmpress, plugin]
---

As a site grows, manually checking internal links stops being realistic. `xfm-plugin-deadlinks` walks every built page after the build, resolves each internal `href` and `src` against the real output set, and lists whatever points nowhere — right in your terminal. External links are never fetched; a static build should not go online just to check itself.

## What it solves

- Renames and moved directories leave broken links behind that only surface when a visitor clicks one. This plugin moves the check into the build.
- The comparison set is what actually exists: every page URL, theme assets, `public/` files, content assets, and outputs from other plugins. Common plugin outputs such as `sitemap.xml`, `feed.xml`, `search.json`, and `stats.json` also have a built-in whitelist, so registration order cannot cause false positives.
- Relative links are resolved against the current page URL; directory (`/posts/x/`), no-slash (`/posts/x`), and `index.html` forms all count as hits. `#anchors`, `http:`, `mailto:`, `data:`, and `//cdn` URLs are skipped automatically, and percent-encoding differences are normalized.

## Install and configure

```bash
npm i -D xfm-plugin-deadlinks
```

```js
// xfm.config.mjs
export default {
  deadlinks: {
    report: true,        // also write deadlinks.json for triage
    strict: false,       // true = fail the build on dead links (CI gate)
    limit: 20,           // max entries listed in the console
    ignore: [            // prefixes or RegExp
      '/api/',
      /^\/assets\/legacy\//,
    ],
    dev: false,
  },
};
```

## Runtime behavior

The check runs at the end of the build, enabled by default in production (`deadlinks.dev: true` also checks during `xfm dev`). A clean site gets a one-line confirmation; when dead links are found, they are printed as `link ← source page` (up to `limit`, default 20), and `deadlinks.json` is written with the full list. With `strict: true`, the plugin throws and the build fails.

## Notes

- Only same-origin addresses are checked; whether external links resolve is out of scope — that is a job for curl-based CI tooling.
- To use dead links as a deployment gate, set `strict: true` and the pipeline build exits non-zero.
- The whitelist covers common plugin output names; if a custom output gets flagged, exclude it with an `ignore` prefix or regex.
