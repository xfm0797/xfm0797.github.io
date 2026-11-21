---
lang: en
translationKey: xfmpress-plugin-analytics
title: "analytics: page-view tracking with one config key"
date: 2026-11-21 22:00:00
description: xfm-plugin-analytics injects a tracking snippet before the closing body tag on every page, with five built-in providers and per-page opt-out.
category: plugins
tags: [xfmpress, plugin]
---

Static sites deserve page-view numbers too, and `xfm-plugin-analytics` handles it the xfmpress way: a few lines in `xfm.config.mjs`, and the build injects the tracking snippet into every page. Switching providers is a one-line change; templates stay untouched.

## What it solves

- Tracking scripts buried in theme templates are painful to migrate. This plugin generates the snippet from config instead.
- During a migration you often need two services in parallel: `provider: ['umami', 'google']` runs both at once.
- Self-hosting something uncommon like Matomo? `provider: 'custom'` takes your raw snippet verbatim via `analytics.script`.

Five providers are built in: `umami`, `plausible`, `google` (GA4 gtag), `baidu`, and `custom`.

## Install and configure

```bash
npm i -D xfm-plugin-analytics
```

The generator auto-loads every `xfm-plugin-*` dependency found in your site's `package.json`, so that is all — restart `xfm dev` if it is running. You can also declare it explicitly with `plugins: ['analytics']`.

```js
// xfm.config.mjs
export default {
  analytics: {
    provider: 'umami',   // umami | plausible | google | baidu | custom
    umami: { src: 'https://umami.example.com/script.js', id: 'your-website-id' },
    // plausible: { domain: 'example.com', src: 'https://plausible.io/js/script.js' }
    // google: { id: 'G-XXXXXXX' }
    // baidu: { id: '0123456789abcdef' }
    // custom mode: script: '<script>…</script>'
    dev: false,
    exclude: ['/draft-preview/'],
  },
};
```

## Runtime behavior

In production builds the snippet is inserted right before `</body>` on every page, preceded by a hidden `<div data-xfm-analytics hidden></div>` marker that guards against double injection. The snippet itself is computed once and reused across pages, so large sites pay no extra build cost.

The plugin skips injection when:

- running `xfm dev` — third-party scripts stay out of local previews by default (opt in with `analytics.dev: true`);
- a page sets `analytics: false` in its front-matter;
- the page URL starts with any prefix listed in `analytics.exclude`.

## Notes

- An unknown `provider` value only logs a warning and the build succeeds without a snippet — if numbers suddenly stop, check the console output first.
- `custom` scripts are inserted verbatim, so their validity is your responsibility.
- For build-time numbers such as word counts and reading minutes, pair it with the reading-stats plugin; visitor data is a different job. See the [plugins overview](/en/2026/11/21/xfmpress-plugins/) for the full list.
