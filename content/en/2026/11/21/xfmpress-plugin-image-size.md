---
lang: en
translationKey: xfmpress-plugin-image-size
title: "image-size plugin: width and height attributes with no layout shift"
date: 2026-11-21 14:12:00
description: Reads local image headers at build time to add width and height attributes to img tags, eliminating layout shift and adding loading="lazy" by default
category: plugins
tags: [xfmpress, plugin]
---

The page jumping down the moment an image loads — that is layout shift, the CLS metric in Core Web Vitals. The cause is an `<img>` missing `width` and `height`, so the browser cannot reserve space before the image arrives. `xfm-plugin-image-size` is the official xfmpress image-size plugin: at build time it reads the first few bytes of each local image and writes the dimensions onto the tag, so the browser reserves the space up front and the page stops jumping.

## What it solves

Hand-annotating image dimensions in every post is tedious and goes stale. This plugin automates it with no network access and no full decode — reading just the file header is enough to parse the size. PNG, JPEG, GIF, WebP, and SVG are supported; for SVG it prefers `width`/`height` attributes and falls back to `viewBox`.

## Install and configure

```bash
npm i -D xfm-plugin-image-size
```

That is all, or declare it explicitly in your [config file](/en/2026/11/21/xfmpress-config/):

```js
// xfm.config.mjs
export default {
  plugins: ['image-size'],
  imageSize: {
    publicDir: 'public', // the site's static asset directory
    lazy: true,          // also add loading="lazy" to images without one
    dev: false,          // whether to run in dev too; production-only by default
  },
};
```

## Output and behavior

`![Cover](/img/cover.png)` in Markdown becomes:

```html
<img src="/img/cover.png" width="1280" height="720" loading="lazy">
```

Image lookup tries three locations in order: the `public/` directory (configurable via `publicDir`), the post's own directory under `content/` (page bundles), and the theme's `assets/` directory. Sizes are cached per file path, so an image referenced in a thousand posts is read from disk once. Relative paths like `./cover.png` are resolved against the page URL into site-absolute paths.

## Details worth knowing

**What gets skipped**: external images, `data:` URIs, bare anchors, and `<img>` tags that already have both `width` and `height` pass through untouched — the plugin only fills in what is missing, never overrides. References that escape the site directory are dropped outright, so the plugin never reads outside its boundaries.

**Dev versus production**: by default the plugin only runs during production builds (`xfm dev` leaves HTML untouched); set `imageSize.dev: true` if you want to preview the behavior locally. To opt out on a specific page — for example when images are emitted by a custom template — set `imageSize: false` in that page's front-matter.

**The lazy attribute**: with the default `lazy: true`, every image lacking a `loading` attribute also gets `loading="lazy"`; set it to `false` if you want dimensions only. Paired with the [SEO plugin](/en/2026/11/21/xfmpress-seo-search/), this plugin helps two Core Web Vitals scores at once. For the rest of the ecosystem, see the [plugin overview](/en/2026/11/21/xfmpress-plugins/).
