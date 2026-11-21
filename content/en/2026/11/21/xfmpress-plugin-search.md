---
lang: en
translationKey: xfmpress-plugin-search
title: "search: build-time search index with a Ctrl/⌘+K panel"
date: 2026-11-21 14:42:00
description: Compresses every page into a single search.json at build time; the browser filters it client-side, with no server and no dependencies
category: plugins
tags: [xfmpress, plugin]
---

Search on a static site usually means either wiring up an external service or running a backend. `xfm-plugin-search` takes a third path: at build time it compresses every page into one `search.json`, which the browser fetches on demand and filters entirely client-side. No server, no third-party dependencies — search ships as part of your build output.

## What it solves

- Zero dependencies, zero infrastructure: the index is part of the build output, so pure static hosting like GitHub Pages works out of the box
- Generated at build time and fetched only when a visitor first opens the panel, so it never affects first paint
- The index stores titles, descriptions, tags, categories, and the first characters of each page's body, giving you full-text search for free

## Installation and configuration

```bash
npm i -D xfm-plugin-search
```

That is all — the generator automatically loads every `xfm-plugin-*` dependency in `package.json` (restart `xfm dev` if it is running). Explicit declaration also works:

```js
// xfm.config.mjs
export default {
  plugins: ['search'],
  search: {
    path: 'search.json',  // index file path
    maxChars: 1500,       // how much body text to index per page, default 1500
    hint: '',             // placeholder text for the search box
  },
};
```

All three options have sensible defaults; the plugin works without any configuration.

## Output and behavior

After the build, the plugin writes `search.json` — a payload of `{ version, generated, count, items }` where each item carries the page URL, title, description, tags, category, date, and a body excerpt. It also injects `site.search` into the template context, which themes use to decide whether to render a search entry and where the index lives.

This very site runs it: once installed, the theme's navigation gains a search button, and `Ctrl/⌘+K` opens the panel to search the whole site. The index only covers content pages — the homepage, tag and category listings, and pagination pages are all excluded.

## Notes

- To keep a page out of the index, set `search: false` in its front-matter. This site's 404 page does exactly that
- `maxChars` controls index size: on large sites with long articles, trim the excerpt length for a smaller `search.json`
- Move the index with `path`; the theme picks up the new location through `site.search`, so no template changes are needed

Getting indexed by search engines is the `seo` plugin's job — this one only covers "visitors finding things on your site." If you haven't installed any plugins yet, start with the [plugin system overview](/en/2026/11/21/xfmpress-plugins/); configuration syntax is covered in the [configuration guide](/en/2026/11/21/xfmpress-config/).
