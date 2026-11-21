---
lang: en
translationKey: xfmpress-plugin-redirect
title: "redirect: alias pages so old URLs never 404"
date: 2026-11-21 14:33:00
description: Writes a tiny redirect page at every old address — meta refresh, JS replace and a visible link, with rel=canonical and noindex,follow
category: plugins
tags: [xfmpress, plugin]
---

Moving a post doesn't make its old links disappear: external references, search-engine indexes, and readers' bookmarks all still point at the old address. `xfm-plugin-redirect` writes a tiny redirect page at every old address so those entry points keep working instead of hitting a 404.

## What it solves

Migrating posts, restructuring URLs, or moving from another blog system all leave a trail of dead addresses. This plugin maps old URLs to new ones at build time and emits real HTML files, so plain static hosting works with no server-side config.

Each redirect page has three layers of fallback, so it works everywhere:

1. `meta refresh` — browsers with JavaScript disabled still redirect
2. `location.replace` — an instant redirect in JS environments that doesn't pollute browser history
3. A visible link — if everything else fails, the reader can click through manually

## Installation and configuration

```bash
npm i -D xfm-plugin-redirect
```

Two ways to declare redirects, pick by scenario:

```js
// xfm.config.mjs
export default {
  plugins: ['redirect'],
  redirects: {
    '/old-post/': '/posts/new-post/',
    '/2020/01/hello.html': 'https://example.com/hello/',
  },
};
```

- **Global map**: declare `old → new` pairs in the `redirects` config, best for site-wide rules. Targets can be site paths or absolute `https://` URLs
- **With the page**: write `redirect_from` (or its alias `aliases`) in the post's own front-matter — handiest when changing an address, since deleting the post removes the redirect with it:

```yaml
---
redirect_from:
  - /old-post/
  - /2020/01/hello.html
---
```

## Output and behavior

Each old address gets one HTML file, placed by the core's URL rules (`/x/` becomes `x/index.html`, `.html` endings are kept as-is). The page carries `rel=canonical` pointing at the new address and `robots: noindex,follow` — search engines update their indexes instead of collecting duplicate pages.

Old addresses are normalized first (leading slash added, query and hash stripped, `/x` treated as `/x/`), so you don't need to worry about the exact format.

## Notes

- If a real page already exists at an old address, the plugin skips it with a warning — it never overwrites real content
- To temporarily disable redirects on one post, set `redirect: false` in its front-matter
- Redirect pages solve "people can still find the content"; for search-engine weight transfer, pair it with the canonical output of the `seo` plugin. This kind of migration is exactly the plugin's use case when retiring old posts — URL rules are covered in [content organization](/en/2026/11/21/xfmpress-content/)
