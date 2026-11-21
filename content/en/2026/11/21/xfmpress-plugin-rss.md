---
lang: en
translationKey: xfmpress-plugin-rss
title: "rss: a full-text RSS 2.0 feed with one dependency"
date: 2026-11-21 22:20:00
description: Install-and-done RSS 2.0 output with full post bodies in content:encoded, absolute links from site.url, and a single limit option
category: plugins
tags: [xfmpress, plugin]
---

Syndication is the oldest and most dependable distribution channel a blog has. `xfm-plugin-rss` scans every document at the end of a build and writes a standards-compliant RSS 2.0 `feed.xml` with full post bodies, so readers never need to click through to finish an article.

## What it solves

Many generators ship feeds with summaries only, leaving a permanent "read more" gap in every reader. This plugin puts each post's complete HTML into `content:encoded` (wrapped in CDATA), keeps the description, and turns tags into `<category>` elements. Every link is built from `site.url` and `site.base`, so absolute URLs come out right even when the site lives under a subpath. Channel-level title, description, and language come straight from your `site` config.

## Install and configure

```bash
npm i -D xfm-plugin-rss
```

That is all — the generator auto-discovers every `xfm-plugin-*` dependency in your `package.json` (you can also list the short name `'rss'` in `plugins` to pin load order). The only option is the item count:

```js
// xfm.config.mjs
export default {
  site: {
    url: 'https://example.com',  // without it, links fall back to base-relative paths
    rss: { limit: 20 },          // default: 20
  },
};
```

Set `site.url` if the feed will ever meet a real reader; see [deploying](/en/2026/11/21/xfmpress-deploy/).

## Output and fields

One file, `feed.xml`. The channel carries the site title, link, description, language (`site.lang`, default `zh-CN`), `lastBuildDate`, and a self-referencing `atom:link`. Each item includes:

- `title`, `link`, and `guid` (permalink)
- `pubDate` in UTC
- `description`: the front-matter `description`, falling back to the excerpt
- `category`: the post's tags
- `content:encoded`: the full post HTML

Which posts make it in: they must have a `date`, must not be `type: page`, must not set `rss: false` in front-matter, and must not be the home page. Since 0.4.17 the feed also filters on `inStream`, so translations on multilingual sites never leak into the default-language feed.

## Notes

- The xfmpress site itself runs this plugin; its `feed.xml` contains only the Chinese default stream, not the English pages.
- To exclude a single post, set `rss: false` in its front-matter.
- Plugins are resolved at startup, so restart `xfm dev` after installing.
