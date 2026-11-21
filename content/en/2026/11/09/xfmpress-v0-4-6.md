---
lang: en
translationKey: xfmpress-v0-4-6
title: "xfmpress v0.4.6: Six New Plugins — Analytics, Comments, Redirects, PWA, Dead Links, Image Size"
date: 2026-11-09 14:00:00
description: v0.4.6 adds six zero-dependency plugins (analytics, giscus, redirect, pwa, deadlinks, image-size), growing the official set from nine to fifteen, plus dev-server fixes for directory URLs and MIME types.
category: changelog
tags: [xfmpress, changelog]
---

v0.4.6 is the largest plugin expansion of the 0.4.x series: six new plugins, all zero-dependency, growing the official set from nine to fifteen. The last pieces of the "after launch" puzzle — analytics, comments, URL migrations, PWA, dead-link detection, image dimensions — are now built in.

## What this release solves

After 0.4.2 opened the plugin ecosystem, the official set still lacked several things you only realize you need once a site is live: analytics code to wire up by hand, comments to integrate yourself, broken inbound links after a URL change, a service worker to write from scratch for PWA support. v0.4.6 turns all six into plugins.

## What changed

### Added: six new plugins

- **`xfm-plugin-analytics`** — one place for page views: Umami, Plausible, Google Analytics, Baidu, or a raw snippet. `provider` accepts an array, so a migration can run two at once.
- **`xfm-plugin-giscus`** — GitHub Discussions comments (giscus or utterances) on post pages only. The iframe follows the theme toggle via `postMessage`, so dark mode stays dark.
- **`xfm-plugin-redirect`** — writes a redirect page at every alias (`redirect_from` in front-matter, or a global `redirects` map): `meta refresh` + `location.replace` + a visible link, marked `noindex,follow`, with the canonical pointing to the new URL. Changing URLs no longer costs you traffic.
- **`xfm-plugin-pwa`** — `manifest.webmanifest`, a service worker (network-first for pages, cache-first for assets, with the precache list built from the real theme assets and `public/`), `offline.html`, and an `icon.svg` generated from the site title if you bring no icons.
- **`xfm-plugin-deadlinks`** — after the build, resolves every internal `href`/`src` against the real output set and prints the ones pointing nowhere. `strict: true` turns failures into build failures for CI; external URLs are never fetched.
- **`xfm-plugin-image-size`** — parses PNG / JPEG / GIF / WebP / SVG headers and writes `width`/`height` onto `<img>` so the browser reserves space (no CLS). It reads at most the first 64 KB of a local file — no network, no full decode.

### Fixed: two dev-server blind spots

- `xfm dev` only answered plugin output at its exact file path: a redirect page emitted at `old/index.html` returned 404 for `/old/` even though the build was correct. Extra files now also answer at their directory URL, and the MIME type comes from the real file (`/old/` used to be served as `application/octet-stream`).
- The dev server now knows `.webmanifest` → `application/manifest+json`. Chrome refuses to install a manifest served as octet-stream, so this fix is essential for debugging PWA locally.

### Changed

README / README_CN reorganized the plugin list into **site output** and **page enhancements** (fifteen packages), and the front-matter switch table gained `pwa` / `comments` / `analytics` / `imageSize`. The example site enables `pwa` and `deadlinks`, so every build of it doubles as a PWA demo and a dead-link self-check.

## Should you change anything on upgrade?

No breaking changes — all six plugins are optional; install what you need with `npm i -D xfm-plugin-…`. If you want CI to guard against broken links, set `deadlinks` to `strict: true`. Full details in the [plugins guide](/en/2026/11/21/xfmpress-plugins/) and the [deployment guide](/en/2026/11/21/xfmpress-deploy/).
