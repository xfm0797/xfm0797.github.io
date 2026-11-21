---
lang: en
translationKey: xfmpress-plugin-seo
title: "seo: canonical, Open Graph, Twitter Card and JSON-LD per page"
date: 2026-11-21 22:30:00
description: Injects the head markup crawlers and social cards need, typed per page — Article for posts, WebSite plus SearchAction for the home page, hreflang on multilingual sites
category: plugins
tags: [xfmpress, plugin]
---

Search indexing and social share cards both live or die by the metadata in `<head>`. `xfm-plugin-seo` injects canonical links, Open Graph, Twitter Card, and JSON-LD into every rendered page — and it respects tags your template already wrote, never duplicating anything.

## What it solves

These tags are tedious to hand-write and vary from page to page: posts need publish and modified times, tags, and an author; the home page needs site-level structured data. The plugin distinguishes automatically — posts get `og:type: article` and `Article` structured data, the home page gets `WebSite`, and when site search is configured the home page also carries a `SearchAction`.

## Install and configure

```bash
npm i -D xfm-plugin-seo
```

```js
// xfm.config.mjs
export default {
  seo: {
    image: '/og.png',    // default share image; relative paths become absolute
    twitter: '@handle',  // emits twitter:site
    jsonLd: true,        // set false to disable JSON-LD entirely
  },
};
```

## Output and fields

The plugin writes no files; it inserts one block before each page's `</head>`:

- `<link rel="canonical">`: the page's absolute URL by default, overridable via front-matter `canonical`;
- Open Graph: `og:title/description/url/site_name/locale`, plus `article:published_time`, `article:modified_time`, and one `article:tag` per tag on posts; the page `image` or configured default becomes `og:image`;
- Twitter Card: `summary_large_image` with an image, `summary` without; `twitter:site` appears when `twitter` is set;
- JSON-LD: `Article` for posts (with `author` from `site.author`, `publisher`, `keywords`), `WebSite` for the home page.

On multilingual sites, pages with translations automatically gain `hreflang` links and `og:locale:alternate`, with `x-default` pointing at the default language; single-language sites emit none of these, so their output is unchanged. The description falls back in order: front-matter `description` → first 160 characters of the excerpt → `site.description`.

Page-level switches: `image` overrides the share image, `canonical` overrides the canonical URL, `noindex: true` emits `noindex, follow`, and `seo: false` skips the page entirely.

## Notes

- If your template already writes `rel="canonical"` or `og:title`, the plugin leaves those parts alone, so themes can take over.
- Date-only values are emitted as midnight UTC to avoid off-by-one-day parsing differences between environments.
- Pair with the [sitemap plugin](/en/2026/11/21/xfmpress-plugin-sitemap/) to cover crawl entry points too; background in [SEO and site search](/en/2026/11/21/xfmpress-seo-search/).
