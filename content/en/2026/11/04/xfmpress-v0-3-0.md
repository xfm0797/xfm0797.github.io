---
lang: en
translationKey: xfmpress-v0-3-0
title: "xfmpress v0.3.0: categories, archives, tag pages and a new default theme"
date: 2026-11-04 12:00:00
description: The largest release yet adds category indexes, yearly archives, real tag and series pages, a redesigned default theme with a scroll-following TOC, and fixes encoded output paths plus relative sitemap links.
category: changelog
tags: [xfmpress, changelog]
---

Version 0.3.0 is the biggest release since the initial launch: sites finally get a complete navigation skeleton — category indexes, yearly archives, and a real page for every tag and category — while the default theme gets a full visual redesign and the TOC now follows your reading position. Several behavioral bugs that hurt CI builds and non-ASCII sites are fixed along the way.

## What this release solves

Post templates already linked to `/tags/<name>/` and friends, but the engine never generated those pages, so every tag link on the site was a 404. There was also no category index and no archive, leaving readers with nowhere to browse once content grew. The fixes matter just as much: Chinese tag names produced percent-encoded directories like `dist/tags/%E6%8F%92%E4%BB%B6/`, which no static server resolves (servers decode the request path first), and when `site.url` was unset, `sitemap.xml` and `feed.xml` emitted relative `<loc>` values — broken addresses submitted to search engines by CI builds.

## What changed

### Added

- Category index and archive pages: a new `indexes` config block generates `/categories/` (term cards with post counts) and `/archives/` (posts grouped by year), and the default theme's navigation now ships with Home / Categories / Archives / About. Pages are only generated when the theme provides the matching layout, so custom themes keep working, and `indexes.categories.enabled: false` turns them off. Index pages go into `sitemap.xml` but not RSS, nav groups or prev/next.
- Tag, category and series pages: every term now gets a real page at `/tags/<name>/`, `/categories/<name>/` and `/series/<name>/`, rendered with the theme's `taxonomy.html` layout and listing its posts newest first. Every previous 404 is gone.
- A redesigned default theme: a calm jade-green palette, a two-column card grid on the home page with a sticky widget sidebar (site intro, categories, tags, archive link), refreshed header navigation with a pill highlight, category chips on post cards, and responsive breakpoints down to mobile widths.
- A table of contents that follows the reading position: `assets/toc.js` marks the section at the top of the viewport (compensating for the sticky header height), forces the last entry when you reach the page bottom, scrolls the entry back into view if the TOC itself overflows, and loads only on pages that have headings. Both themes style it through `.toc a.is-active`.
- A GitHub Pages workflow (`.github/workflows/pages.yml`) that runs tests, builds `examples/blog` and deploys the artifact when the site, engine or themes change, with `SITE_URL` injected from the repository coordinates.
- `scripts/pages-base.js`, a temporary build-time prefixer for the root-absolute links produced today, so the example site works under a project page path. It will be removed once `site.base` is applied during URL generation.

### Fixed

- Dev-server config hot reload could keep serving the old config: `.mjs` configs were cache-busted with `?t=Date.now()`, so two saves in the same millisecond produced the same URL and Node's ESM cache returned the stale module. Cache-busting now uses a monotonically increasing counter.
- Percent-encoded URLs wrote percent-encoded directories; output paths are now decoded (`dist/tags/插件/`) while URLs and `sitemap.xml` stay encoded.
- `sitemap.xml` and `feed.xml` no longer emit relative `<loc>` values when `site.url` is unset; the example site reads `SITE_URL` from the environment so CI builds produce absolute links.

## Should you upgrade

Upgrade freely: existing sites build without any config changes. To get the index and archive pages, add an `indexes` block to your config (see the [configuration guide](/en/2026/11/21/xfmpress-config/)); custom themes need to provide the matching layouts to receive them. Default-theme users will see the new design immediately — if you relied on the old visuals, revisit your custom styles. For GitHub Pages deployments, the new workflow file is a good starting point, and the [deployment guide](/en/2026/11/21/xfmpress-deploy/) walks through the full setup.
