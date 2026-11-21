---
lang: en
translationKey: xfmpress-plugin-llms
title: "llms: llms.txt and llms-full.txt for large language models"
date: 2026-11-21 14:15:00
description: Generates an llmstxt.org-compliant plain-text index of your site — grouped links with one-line summaries, plus an optional full-text version with tags stripped
category: plugins
tags: [xfmpress, plugin]
---

The cheapest way to let a large language model know your site is not to make it crawl your HTML — it is to hand it an `llms.txt`. Following the [llmstxt.org](https://llmstxt.org) convention, `xfm-plugin-llms` writes `llms.txt` and `llms-full.txt` at the end of each build, at a fraction of the size of your pages.

## What it solves

Full-site HTML is noisy and heavy: expensive to fetch, tiring to read. `llms.txt` is a grouped article index — a site summary plus each post's title, absolute link, and one-line description. `llms-full.txt` adds the plain text of every post, with script, style, and pre blocks stripped at build time. AI search crawlers and "feed the whole site to a model" workflows benefit directly; see [SEO and site search](/en/2026/11/21/xfmpress-seo-search/).

## Install and configure

```bash
npm i -D xfm-plugin-llms
```

Install and it works. Four options:

```js
// xfm.config.mjs
export default {
  llms: {
    path: 'llms.txt',          // index file path
    full: true,                // set false to skip the full-text file
    fullPath: 'llms-full.txt', // full-text file path
    maxItems: 0,               // cap on listed items, 0 = all
  },
};
```

## Output and fields

The structure of `llms.txt`: it opens with `#` plus the site title, followed by a `>` quote of `site.description` when present, then two stat lines with the post count and language. The body is grouped by `category`, one `##` section per group, with lines in the form `- [Title](absolute link): description`. `llms-full.txt` repeats the same index and then appends, post by post, a `##` title, the page link, and the stripped plain text.

Inclusion rules: posts need a `date`, must not be `type: page`, and must not be the home page; set `llms: false` in front-matter to exclude a page.

Something multilingual sites should notice: unlike the [rss plugin](/en/2026/11/21/xfmpress-plugin-rss/), `llms.txt` applies no `inStream` filter — pages in every language appear in the index, just like `search.json`. That is precisely its value for AI use cases: a model sees the entire site, in all languages, at once.

## Notes

- The full-text file grows with your total post volume; on large sites tighten the list with `maxItems` or keep only the index with `full: false`.
- The HTML-to-text conversion is pragmatic: `pre` code blocks are stripped entirely, so weigh whether code-heavy content belongs in the full-text file.
- With no eligible posts the plugin writes nothing, so there is no empty file to guard against.
