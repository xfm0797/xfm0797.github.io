---
lang: en
translationKey: xfmpress-config
title: Configuration in Depth: Every Field of xfm.config.mjs
date: 2026-11-21 10:10:00
description: Config file lookup order, site field defaults, build behavior, pagination and index pages, environment variable injection
category: xfmpress
tags: [xfmpress, tutorial]
series: xfmpress guide
---

# The config file

The config is just a plain JS object — export it and it takes effect. **Every field has a default value**, so even an empty `xfm.config.mjs` can build a site.

## Lookup order

Files are checked in order; the first hit wins:

1. `xfm.config.mjs` — recommended, ESM, supports `process.env`
2. `xfm.config.js` — module format determined by the `type` field in `package.json`
3. `xfm.config.cjs` — forced CommonJS
4. `xfm.config.json` — plain data
5. `config.js` — for compatibility with early versions
6. the `xfm` field in `package.json`

If in doubt, run `xfm info` — it tells you exactly which file was loaded.

## Merge rules

User config is **deep-merged** with the defaults, so you only need to write the fields you care about:

- objects are merged recursively, key by key;
- **arrays are replaced as a whole** — if you write `nav`, you must write the full list;
- keys whose value is `undefined` are ignored.

## The site fields

```js
export default {
  site: {
    title: 'XFMpress',            // site name, used in <title>, footer, and brand slot
    description: '站点描述',       // fallback for list pages and meta
    url: 'https://xfm0797.github.io', // required for absolute links in sitemap / RSS
    lang: 'zh-CN',                // <html lang>
    author: 'xfm',                // for plugins and themes
    base: '/',                    // subpath deployment, e.g. '/blog/'
    assets: '/assets/',           // theme asset prefix
    nav: [                        // navigation (arrays are replaced as a whole)
      { title: '首页', url: '/' },
      { title: '归档', url: '/archives/' },
    ],
  },
};
```

Keys under `site` that aren't listed above still enter the template context as-is — for example `site.copyright` can be used directly in templates.

## Build behavior

| Field | Default | Description |
| --- | --- | --- |
| `buildDrafts` | `false` | Whether production builds include drafts |
| `workerThreshold` | `40` | The worker pool kicks in once the page count reaches this value |
| `workers` | `0` | Concurrency; 0 means auto-calibrated based on workload |
| `markdown.highlight` | `true` | Syntax highlighting for code blocks |

## Pagination and index pages

```js
pagination: { enabled: true, perPage: 9, url: '/page/' },
indexes: {
  categories: { enabled: true, url: '/categories/' },  // category index page
  archives: { enabled: true, url: '/archives/' },      // archive pages by year
},
```

Pagination generates **real static pages** (`/page/2/`), each with its own HTML and title — good for SEO. Index pages require the theme to provide the corresponding layout — if the layout is missing they are silently skipped, without errors.

## Directories and theme

| Field | Default | Description |
| --- | --- | --- |
| `contentDir` | `'content'` | Markdown source directory |
| `outDir` | `'dist'` | Output directory |
| `publicDir` | `'public'` | Static directory copied as-is |
| `theme` | `'themes/default'` | `'default'` / `'docs'` / a theme path |
| `defaults.layout` | `'page.html'` | Fallback when no layout field is set |

## Environment variables and multiple environments

The config file is ESM and can read environment variables — the standard approach in CI:

```js
export default {
  site: {
    base: process.env.SITE_BASE || '/',
    url: process.env.SITE_URL || '',
  },
};
```

Local builds use the defaults, while CI injects `SITE_BASE` and `SITE_URL` — one config file covers both environments.

Next: [Organizing Content: Directories as URLs and front-matter](/en/2026/11/21/xfmpress-content/).
