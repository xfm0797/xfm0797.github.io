---
lang: en
translationKey: xfmpress-plugin-sitemap
title: "sitemap: sitemap.xml and robots.txt from one build"
date: 2026-11-21 22:25:00
description: Zero-option sitemap.xml generated from site.documents with lastmod and priority, plus a robots.txt that points at the sitemap once site.url is set
category: plugins
tags: [xfmpress, plugin]
---

sitemap.xml and robots.txt are the two entry points search engines use to crawl a site. `xfm-plugin-sitemap` walks every document at the end of each build and writes both files, with no plugin-level options at all.

## What it solves

Hand-maintained sitemaps go stale and miss pages. This one is generated directly from `site.documents`, so the URL set always matches what was actually built. URLs are made absolute from `site.url` and `site.base`, which keeps subpath deployments correct. The matching `robots.txt` automatically gains a `Sitemap:` line pointing at the sitemap once `site.url` is configured, so the two files never drift apart.

## Install and configure

```bash
npm i -D xfm-plugin-sitemap
```

Install and it works — the plugin has no options of its own. Everything it needs comes from the site basics (see [configuration](/en/2026/11/21/xfmpress-config/)):

```js
// xfm.config.mjs
export default {
  site: {
    url: 'https://xfm0797.github.io',
    base: '',  // e.g. '/blog' for subpath deployments
  },
};
```

## Output and fields

Two files per build:

- `sitemap.xml`: each `<url>` carries an absolute `<loc>`; pages with `updated` (or `date`) in front-matter get a `<lastmod>`; pages that declare a `weight` get a `<priority>` computed as `1 - weight/100`, clamped to the 0.1–1 range and printed with one decimal.
- `robots.txt`: `User-agent: *` with `Allow: /`, plus `Sitemap: <absolute url>` when `site.url` is set.

Set `sitemap: false` in a page's front-matter to drop it — handy for about pages and tag aggregates you would rather not have crawled individually.

## Notes

- `lastmod` uses `updated || date`; pages with neither date simply omit the field.
- `sitemap: false` only removes a page from the sitemap — it does not prevent indexing. For that, combine the [seo plugin](/en/2026/11/21/xfmpress-plugin-seo/) or a `noindex` meta in your theme.
- The xfmpress site itself runs this plugin; both files regenerate on every build. See [SEO and site search](/en/2026/11/21/xfmpress-seo-search/).
