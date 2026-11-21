---
lang: en
translationKey: xfmpress-plugin-comments
title: "comments: ten comment providers behind one switch"
date: 2026-11-21 22:05:00
description: xfm-plugin-comments unifies giscus, waline, twikoo, disqus and six more providers behind a single comments.provider key, with per-provider validation.
category: plugins
tags: [xfmpress, plugin]
---

Adding comments to a static site used to mean one plugin per service. As of 0.4.16, `xfm-plugin-giscus` has been renamed to `xfm-plugin-comments`, which puts ten comment services behind a single `comments.provider` switch — swap providers without swapping plugins or touching templates. This very site runs it with Waline.

## What it solves

Ten providers are built in: `giscus` (the default), `beaudar` (a giscus-compatible fork reachable from mainland China), `utterances`, `disqus`, `waline`, `twikoo`, `valine`, `gitalk`, `artalk`, and `cusdis`. Writing `github` is treated as `giscus`.

Required fields are validated per provider: giscus and beaudar need `repo` and `repoId`; disqus needs `shortname`; waline needs `serverURL`; twikoo needs `envId`; valine needs `appId` and `appKey`; gitalk needs `clientID`, `clientSecret`, `repo`, `owner`, and `admin`; artalk needs `server`; cusdis needs `appId`. Unknown providers or missing fields fail loudly in the build log and leave the page untouched — a typo in `repoId` never ships a broken widget silently.

## Install and configure

```bash
npm i -D xfm-plugin-comments
```

Coming from `xfm-plugin-giscus`? Drop the old package, install this one, and your existing `comments: { provider: 'giscus', … }` block keeps working unchanged.

```js
// xfm.config.mjs
export default {
  comments: {
    provider: 'waline',      // one of ten, default giscus
    serverURL: 'https://waline.example.com',
    title: 'Comments',       // section heading, '' hides it
    identifier: 'path',      // path (default) | url | title
    dev: false,
  },
};
```

Provider-specific fields (giscus's `category`, `categoryId`, `mapping`, `theme`, `lang`, and so on) also live directly under `comments`; see the package README for the full list.

## Runtime behavior

In production builds the plugin inserts a `.comments` section just before `</article>` (falling back to `</main>`, then `</body>`), containing the heading, the mount point, and the provider script. Providers that need stylesheets (Waline, Gitalk, Artalk) get their CSS added to `<head>` once, on pages that actually mount a widget. giscus and beaudar follow the site's light/dark toggle via `postMessage`; Waline switches by CSS selector, Cusdis uses `auto`.

Only post pages get a widget: a page needs a `date` and must not be `type: page` or `type: index` — home, archives, tag pages, and standalone pages never see one. Set `comments: false` in front-matter to disable it for a single page. Put `<div data-xfm-comments></div>` in your template to choose the position yourself; the plugin then injects only the scripts. Templates can also read `site.comments` (its `provider` and `title`).

## Notes

- A real-world example: this site's Waline `serverURL: 'https://waline.xfm.qzz.io'` has no trailing slash — the Waline client builds API paths itself, and a trailing slash produces `//api/...` requests that get 308-redirected.
- With the default `identifier: 'path'`, threads bind to the site-relative URL, so changing domains keeps existing comments; switch to `url` to bind the absolute URL instead.
- Comments do not render in `xfm dev` by default; set `comments.dev: true` to change that.
