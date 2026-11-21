---
lang: en
translationKey: xfmpress-plugins
title: The Plugin System: Hooks, Official Plugins, and Custom Plugins
date: 2026-11-21 09:20:00
description: The core ships no plugins — four ways to load them, the semantics of six hooks and their concurrency trade-offs, 17 official plugins, and writing your own in ten minutes
category: xfmpress
tags: [xfmpress, tutorial]
series: xfmpress guide
---

# The core ships no plugins

`npm i -g xfmpress` installs only the generator and two themes; everything else is installed on demand — same philosophy as Hexo: a site has whatever it has installed.

## Four ways to load plugins

```bash
npm i -D xfm-plugin-sitemap xfm-plugin-rss xfm-plugin-search
```

1. **Auto-discovery**: any `xfm-plugin-*` dependency in `package.json` takes effect once installed
2. **Short-name declaration**: `plugins: ['rss']` resolves to `xfm-plugin-rss`, and lets you pin the load order
3. **Path**: `plugins: ['./plugins/my.js']` for local plugins inside the site
4. **Inline**: `plugins: [{ name, ...hooks }]` — write the object directly in the config

After installing, **restart `xfm dev`** — plugins are resolved at startup; hot reload doesn't rescan node_modules. A declared-but-missing plugin fails immediately with the matching `npm i` command, never silently skipped.

## The six hooks

| Hook | When | Return value |
| --- | --- | --- |
| `extendContext(ctx)` | After pages are collected, before rendering | Replaces the site context |
| `markdown(raw, page)` | While a single page is parsed | Replaces the Markdown source |
| `transformHtml(html, ctx)` | After a single page renders, before writing to disk | Replaces the HTML |
| `afterCollect(site)` | Once all pages are in place | Ignored; you can write cross-page data into page.data |
| `afterBuild(site)` | After everything is rendered | Return `[{ path, contents }]` to write extra files |
| `configureServer(server)` / `finish(site)` | Dev server startup / build finished | Ignored |

Two trade-offs worth knowing:

- Sites registering a `markdown` hook **disable the worker pool** (the hook runs during single-page parsing, and serializing in and out of threads costs more than it saves); `transformHtml` is unaffected
- Cross-page computation (like related posts) belongs in `afterCollect`, where it runs once; putting it in a per-page hook means 1000 pages trigger 1000 rounds of site-wide similarity computation

## The 17 official plugins

**Site outputs**: `sitemap` (sitemap.xml + robots.txt), `rss` (full-text feed.xml), `feed-json` (JSON Feed 1.1), `llms` (llms.txt / llms-full.txt), `search` (search.json + Ctrl/⌘+K panel), `pwa` (manifest + sw.js), `redirect` (jump pages for old URLs), `reading-stats`

**Content enhancements**: `math` (build-time KaTeX), `mermaid` (diagrams — see [Chapter 13](/en/2026/11/21/xfmpress-math-mermaid/))

**Page enhancements**: `seo` (canonical / Open Graph / Twitter Card / JSON-LD), `related` (related posts), `minify` (HTML minification, skipping pre/code/script/style), `image-size` (adds width/height to img tags, improving CLS), `deadlinks` (broken link checking; strict mode can fail CI), `comments` (ten comment services: giscus / waline / twikoo / disqus and more — see [Chapter 12](/en/2026/11/21/xfmpress-comments/)), `analytics` (Umami / Plausible / GA / Baidu Analytics)

## Per-page switches

The front-matter can disable plugins page by page: `sitemap: false`, `rss: false`, `search: false`, `related: false`, `noindex: true`, `comments: false`, and so on. Plugins and themes integrate through just two conventions: `site.search` (whether a search entry exists) and `page.data.related` (whether a recommendation block exists), so uninstalling a plugin only removes a feature — it never breaks the build.

## Writing a plugin

A plugin is simply a module exporting `(site) => ({ name, ...hooks })`; drop it into the site's `plugins/` directory and it's loaded automatically:

```js
// plugins/reading-index.js
module.exports = (site) => {
  const { plainText, absoluteUrl } = site.helpers;
  return {
    name: 'reading-index',
    afterBuild(site) {
      const index = site.documents.map((d) => ({
        title: d.title,
        url: absoluteUrl(site.config.site, d.url),
        text: plainText(d.html).slice(0, 800),
      }));
      return [{ path: 'index.json', contents: JSON.stringify(index) }];
    },
  };
};
```

`site.helpers` provides four utilities: `plainText(html)` strips tags into plain text, `absoluteUrl(config, url)` builds absolute URLs, `withBase` adds the subpath, and `normalizeBase` normalizes the base. The `site.documents[].html` that `afterBuild` receives is body HTML without the layout — perfect for full-text indexing.

When publishing to npm, name it `xfm-plugin-<name>` so others' installs are auto-discovered.

Next: [SEO and Site Search](/en/2026/11/21/xfmpress-seo-search/).
