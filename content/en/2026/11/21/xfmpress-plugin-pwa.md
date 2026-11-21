---
lang: en
translationKey: xfmpress-plugin-pwa
title: "pwa: manifest, service worker, and offline page"
date: 2026-11-21 23:20:00
description: Generates manifest.webmanifest, sw.js and offline.html at build time, and an icon.svg from the site title when you bring no icons of your own
category: plugins
tags: [xfmpress, plugin]
---

Making a blog installable and readable offline sounds like a pile of boilerplate. `xfm-plugin-pwa` moves all of it to build time: one install, and your output gains a manifest, a service worker, and an offline fallback page, with the matching tags injected into every page's head automatically.

## What it solves

- **Installable**: generates `manifest.webmanifest` (name, icons, theme color, standalone window) so mobile browsers treat the site as an installable app
- **Offline-readable**: a service worker caches pages and static assets, falling back to the cache or an offline page when the network is gone
- **No icon dependency**: if you bring no icons, the plugin generates an `icon.svg` from the first character of your site title — a missing icon never blocks installation

## Installation and configuration

```bash
npm i -D xfm-plugin-pwa
```

```js
// xfm.config.mjs
export default {
  plugins: ['pwa'],
  pwa: {
    name: 'My Site',            // defaults to site.title
    shortName: 'Site',          // defaults to site.title, truncated if long
    themeColor: '#3b82f6',      // browser address bar / status bar color, default #3b82f6
    backgroundColor: '#ffffff', // default #ffffff
    display: 'standalone',      // default standalone
    offline: true,              // generate the offline fallback page, on by default
    cacheExtra: ['/assets/font.woff2'], // extra URLs to precache
  },
};
```

Most options default to the site's own `site` configuration, so the minimal setup — install the plugin, write no `pwa` section — already works.

## Output and behavior

The build gains four files:

| File | Purpose |
| --- | --- |
| `manifest.webmanifest` | Install manifest: name, icons, theme color, start URL |
| `sw.js` | Service worker: network-first for navigation, cache-first for assets |
| `offline.html` | Fallback page shown when offline with no cache |
| `icon.svg` | Auto-generated initial-letter icon when none is provided |

Every page's head is injected with `<link rel="manifest">`, `<meta name="theme-color">`, and `apple-touch-icon`; the service worker is registered automatically in production builds. The precache list covers the homepage, theme assets, and static files in `public` (css/js/fonts/images), and the cache version is derived from a content hash of that list — when the list changes, clients switch to the new cache automatically instead of getting stuck on a stale one. Use `cacheExtra` to force specific files into the precache.

## Notes

- **Service workers only work on https or localhost**; opening the build output directly via `file://` does nothing
- The manifest link is only injected in production builds by default; set `dev: true` to see it during development
- To skip the manifest link on a single page, set `pwa: false` in its front-matter
- When you provide `icons`, the plugin stops generating `icon.svg` so it never overwrites your own file

This site does not use the plugin — offline support depends on the nature of the site, though for a reading-first blog it's a low-cost nice-to-have. Hosting requirements are covered in the [deployment guide](/en/2026/11/21/xfmpress-deploy/).
