---
lang: en
translationKey: xfmpress-deploy
title: Building and Deploying: GitHub Pages, Netlify, and Nginx
date: 2026-11-21 09:00:00
description: Output structure, how the incremental cache works, deployment to GitHub Pages / Netlify / Vercel / Nginx / object storage and subpath setups, plus a launch checklist
category: xfmpress
tags: [xfmpress, tutorial]
series: xfmpress guide
---

# The output is pure static files

The output of `xfm build` has no Node runtime and no server-side rendering — CDN, object storage, and GitHub Pages can serve it directly:

```
dist/
├── index.html              # home page
├── about/index.html        # page = directory + index.html
├── 2026/11/21/post/index.html
├── page/2/index.html       # list pagination
├── tags/Node.js/index.html # aggregation page
├── categories/index.html   # index page (when the theme provides the layout)
├── archives/index.html
├── assets/                 # theme assets
├── sitemap.xml             # the rest is produced by plugins
├── feed.xml
└── search.json
```

Every page is a directory, so URLs are naturally clean `/<path>/` addresses. The three kinds of non-content pages — aggregation, pagination, and index pages — don't enter post lists, RSS, or the prev/next chain.

## The incremental cache

The cache lives at `.xfm/cache.json` in the site root, with one entry per page. A page's hash is composed of six parts:

```
layout | theme fingerprint | config fingerprint | raw source file | list digest | related posts list
```

The last two guard against two classic pitfalls: "the home page still shows the old list after a new post is added" and "the recommendation block keeps stale values after tags change". Changing the theme invalidates the entire site cache — by design. Caching the `.xfm/` directory in CI speeds builds up significantly; `xfm clean` deletes dist and the cache for a completely fresh start.

## GitHub Pages

For a **user root site** (`<user>.github.io`) the base is `/`; a **project page** lives under a subpath, injected via environment variables:

```js
export default {
  site: {
    base: process.env.SITE_BASE || '/',
    url: process.env.SITE_URL || '',
  },
};
```

In the workflow, detect the repository type and inject `SITE_BASE=/repo/` and `SITE_URL` accordingly. A simpler alternative: push the build output to a dedicated branch (this site uses GitHub Actions to push `dist/` to the `gh-page` branch), and have Pages read from that branch.

## Netlify / Vercel

Build command `npx xfm build`, publish directory `dist`, and keep `site.base` as `'/'`. Netlify's `netlify.toml`:

```toml
[build]
  command = "npx xfm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

## Nginx

The key is `try_files` — pages are directories, so `/about/` must resolve to `about/index.html`:

```nginx
location / {
    try_files $uri $uri/ $uri/index.html =404;
}
```

The same applies to object storage: enable "static website hosting" and set the index document to `index.html`.

## Subpath deployment

Set `site.base` to `'/blog/'` (leading and trailing slashes are required), and the prefix is applied once uniformly by the engine at the render output, covering templates, Markdown, and handwritten HTML alike; sitemap / RSS / search.json get it automatically. `xfm dev` also serves under the prefix, so local preview exposes "works locally but 404s in production" problems.

## Launch checklist

| Check | Method |
| --- | --- |
| `site.url` is set | Otherwise the sitemap has relative `<loc>` entries |
| Home page title is correct | Open `/` and inspect `<title>` |
| Assets return 200 | Check `assets/style.css` in devtools |
| Sitemap count is right | `grep -c "<loc>" dist/sitemap.xml` |
| No leaked drafts | Search draft titles after building |
| Zero broken links | Install the deadlinks plugin with `strict: true` |
| 404 page exists | Visit a nonexistent address |

## Common problems

- **Pages load but all styles are gone**: nine times out of ten, `site.base` doesn't match the deployment path
- **Subpages 404 on refresh**: the server's directory index isn't configured (Nginx `try_files` / object storage index document)
- **Slow builds are almost entirely disk writes**: filesystem metadata operations on Windows / NTFS are the bottleneck — build on Linux instead
- **Changed templates but output didn't change**: run `xfm clean` and rebuild

---

**Next**: [Comments](/en/2026/11/21/xfmpress-comments/) — one plugin, ten comment services.
