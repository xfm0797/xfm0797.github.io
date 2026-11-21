---
lang: en
translationKey: xfmpress-v0-4-0
title: "xfmpress v0.4.0: Built-in Search, Real Pagination, and a Round of Reading Polish"
date: 2026-11-09 08:00:00
description: v0.4.0 adds zero-dependency site search, true static pagination, and reading-experience upgrades, while site.base handling moves from a build-time patcher into the engine itself.
category: changelog
tags: [xfmpress, changelog]
---

v0.4.0 is the release where xfmpress visibly grows up. Search, pagination, and a handful of reading niceties that used to mean wiring up third-party services or hand-rolling scripts are now built in — all with zero runtime dependencies.

## What this release solves

Three classic static-site pain points, each addressed head-on: visitors can't find content (no search), the home page list grows forever (no pagination), and the reading experience feels rough (no copy button, no image zoom, no sense of progress). v0.4.0 answers each with one addition.

## What changed

### Added: search, pagination, reading polish

- **Site search** — a new `search` plugin compiles every content page into one `search.json` (title, description, tags, and the first N characters of the body, tunable via `search.maxChars`). Both themes ship a zero-dependency Ctrl/⌘+K (or `/`) panel that lazily fetches the index and filters entirely client-side. Home, taxonomy, index, and pagination pages are excluded by default; opt a page out with `search: false` in front-matter.
- **Listing pagination** — set `pagination: { perPage }` and the post list splits into real static pages at `/page/2/`, `/page/3/`, and so on, with a pager (prev / numbered / next, gaps ellipsized). Page 1 is the home page itself, so templates read the same `pagination` structure everywhere. Pagination is skipped when the home layout doesn't render a post list (the docs theme, for example), and paged pages stay out of RSS, nav groups, prev/next links, and the search index.
- **Reading polish** — both themes gain a shared `ux.js`: a copy button on code blocks, click-to-zoom images, a reading progress bar on posts, and external links opening in a new tab with `noopener noreferrer`. Markdown images now render with `loading="lazy"` and `decoding="async"`.

### Changed: site.base is now the engine's job

The build-time patcher `scripts/pages-base.js` is gone. After rendering, the engine itself prefixes every root-absolute `href`/`src` in the page HTML — templates, Markdown links, and raw HTML all covered — exactly once. Sitemap, RSS, and search-index URLs go through the same helper, and the dev server serves the site under the configured prefix. Paths on disk are unchanged; the Pages workflow passes `SITE_BASE` to the build instead.

One small behavioral note: `robots.txt` now emits the `Sitemap:` line only when `site.url` is configured.

## Should you change anything on upgrade?

No breaking changes. If you relied on `scripts/pages-base.js` for subpath deployments, drop it and use `site.base` instead — the engine now covers it more thoroughly. Adding `search` to your plugins or setting `pagination.perPage` is purely additive. New to xfmpress? Start with the [quick start guide](/en/2026/11/21/xfmpress-quick-start/), then come back to configure these.
