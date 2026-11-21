---
lang: en
translationKey: xfmpress-seo-search
title: SEO and Site Search: sitemap / RSS / search / related
date: 2026-11-21 09:10:00
description: Fill in SEO and the reading experience with a combination of official plugins — sitemap, full-text RSS, Ctrl+K search, related posts, and AI-friendly output
category: xfmpress
tags: [xfmpress, tutorial]
series: xfmpress guide
---

# Install them all at once

```bash
npm i -D xfm-plugin-sitemap xfm-plugin-rss xfm-plugin-search xfm-plugin-seo xfm-plugin-related xfm-plugin-llms
```

Restart `xfm dev` after installing. There's only one prerequisite: **set `site.url` in the config** — otherwise crawlers won't accept the relative links in the sitemap and RSS.

## sitemap: the site map

```bash
# outputs
dist/sitemap.xml
dist/robots.txt
```

With `site.url` configured, absolute `<loc>` entries are emitted; pages with `noindex: true` or front-matter `sitemap: false` are excluded automatically. Verify the count:

```bash
grep -c "<loc>" dist/sitemap.xml
```

## rss: full-text RSS

Outputs an RSS 2.0 `feed.xml` with the full body text. Use `site.rss.limit` to control the number of entries; to keep a single post out of the feed, set front-matter `rss: false`.

## search: Ctrl + K search

Generates a `search.json` index (configurable via `search.path` and `search.maxChars` for the per-post body limit). Once the theme detects `site.search`, it renders a search entry — **pure frontend filtering, zero dependencies**, summoned with Ctrl / ⌘ + K. Exclude a single post with `search: false`.

## seo: structured metadata

Injects canonical, Open Graph, Twitter Card, and JSON-LD structured data per page:

```js
export default {
  seo: { image: '/og.png', twitter: '@handle', jsonLd: true },
};
```

It never duplicates canonical or `og:*` tags already handwritten in templates. Page-level control is available via `seo: false`, `noindex: true`, `image`, and `canonical`.

## related: related posts

Weighted scoring is computed before rendering — **3 points per shared tag / 2 points per category / 3 points per series** — and written into `page.data.related`. When both themes find this key, they render a recommendation block:

```js
export default {
  related: { limit: 3, minScore: 2 },
};
```

Anything below `minScore` isn't recommended; `related: [url, ...]` lets you specify the list manually.

## llms: AI-friendly output

Generates `llms.txt` and `llms-full.txt` following the llmstxt.org convention, so AI assistants can read your site content efficiently. Configurable via `llms.full` and `llms.maxItems`.

## Checklist

```bash
xfm build
grep -c "<loc>" dist/sitemap.xml   # sitemap entry count
head dist/feed.xml                 # full-text RSS
head dist/search.json              # search index
```

Next: [Building and Deploying](/en/2026/11/21/xfmpress-deploy/).
