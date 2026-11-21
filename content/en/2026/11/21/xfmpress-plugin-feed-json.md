---
lang: en
translationKey: xfmpress-plugin-feed-json
title: "feed-json: a JSON Feed 1.1 file your scripts can read"
date: 2026-11-21 14:09:00
description: A JSON Feed 1.1 companion to the RSS plugin with full content_html, publish and modified dates, tags and authors — consumable with a single fetch call
category: plugins
tags: [xfmpress, plugin]
---

JSON Feed 1.1 describes a subscription feed in plain JSON — no XML parsing required. `xfm-plugin-feed-json` writes `feed.json` at the end of each build, complementing the built-in [rss plugin](/en/2026/11/21/xfmpress-plugin-rss/): readers, automation scripts, and browser-side code can all consume it directly.

## What it solves

XML is a historical tax paid for the sake of feed readers; programs consuming a feed still need a parser. With `feed.json`, a front end gets every post with one call — `fetch('/feed.json').then(r => r.json())` — which makes a "latest posts" sidebar, build-time notifications, or feeding an AI pipeline far more direct than scraping XML.

## Install and configure

```bash
npm i -D xfm-plugin-feed-json
```

Install and it works. Two options:

```js
// xfm.config.mjs
export default {
  feedJson: {
    path: 'feed.json',  // output path
    limit: 20,          // item count, default 20
  },
};
```

## Output and fields

One file, `feed.json` (valid JSON, two-space indented, trailing newline). Top-level fields: `version` (JSON Feed 1.1), `title`, `home_page_url`, `feed_url`, `description`, `language` (from `site.lang`, default `zh-CN`), and `authors` when `site.author` is configured. Each item carries:

- `id` and `url`: the page's absolute address
- `title`, `content_html` (the full post HTML), and `summary` (front-matter `description` or the excerpt)
- `date_published` and `date_modified` (from `updated || date`; date-only values become midnight UTC)
- `tags` and `authors`, present only when non-empty

Inclusion rules match the rss plugin: posts need a `date`, must not be `type: page`, must not set `rss: false` in front-matter, and must not be the home page. Since 0.4.17 the same `inStream` filter applies, so translations on multilingual sites stay out of the default-language feed — one `rss: false` switch therefore governs both the XML and JSON feeds.

## Notes

- The plugin is independent of the rss plugin, but feeds usually ship in pairs: XML for readers, JSON for programs.
- `content_html` contains full bodies, so file size grows with your posts; cap it with `limit` on large sites.
- To exclude a single post, set `rss: false` in its front-matter.
