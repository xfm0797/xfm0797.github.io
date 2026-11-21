---
lang: en
translationKey: xfmpress-plugin-related
title: "related: weighted related posts by tags, category, and series"
date: 2026-11-21 14:36:00
description: Scores every post by shared tags (3), category (2) and series (3) before rendering; from 0.4.17 it only recommends posts in the same language
category: plugins
tags: [xfmpress, plugin]
---

"What should I read next?" is how content sites keep readers around. `xfm-plugin-related` computes related posts for every article before rendering and writes them into `page.data.related` — when the key exists, the theme renders a recommendation block automatically, with zero template code on your side.

## What it solves

Related posts are fundamentally a site-wide pairwise comparison; doing it in a per-page hook would drag rendering back to a single thread. This plugin uses the `afterCollect` hook instead: it computes everything once after all pages are in place, the worker pool keeps running, and incremental builds never leave stale recommendations (the list participates in the page cache hash).

## The scoring rules

Relevance is scored on three kinds of overlap:

| Overlap | Points |
| --- | --- |
| Tags | 3 per shared tag |
| Category | 2 |
| Series | 3 |

Posts scoring at least `minScore` are ranked by score, ties broken by date (newest first), and the top `limit` are kept. Only posts are recommended — the homepage, taxonomy pages, and plain pages never appear. Since 0.4.17, multilingual sites only recommend posts in the same language, so a Chinese post never recommends its English twin. One more safeguard: under any single tag, only the most recent 200 posts are considered, so a giant "misc" tag can't drown out the results.

## Installation and configuration

```bash
npm i -D xfm-plugin-related
```

```js
// xfm.config.mjs
export default {
  plugins: ['related'],
  related: {
    limit: 3,      // max recommendations per post, default 3
    minScore: 2,   // minimum score to qualify, default 2
  },
};
```

It works as soon as it's installed (restart `xfm dev` if it's running). This site runs it too, and both bundled themes render the block whenever recommendation data exists.

## Per-page control

The front-matter can override the computation per post:

```yaml
---
related: false              # no recommendations on this post
related:                    # pin a manual list (site paths)
  - /en/2026/11/21/xfmpress-quick-start/
  - /en/2026/11/21/xfmpress-config/
---
```

A manual list replaces the automatic ranking and is still truncated to `limit`.

## Notes

- Recommendation quality follows metadata quality: the more accurate your tags, categories, and series, the better the picks. Series carries the highest weight and is especially worthwhile for serialized tutorials — see [content organization](/en/2026/11/21/xfmpress-content/)
- `minScore: 2` means sharing only a category (2 points) already qualifies; raise it to 3 for stricter matching
- The plugin only computes data; the block's styling belongs to the theme — see the [default theme](/en/2026/11/21/xfmpress-theme-default/)
