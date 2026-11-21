---
lang: en
translationKey: xfmpress-v0-4-1
title: "xfmpress v0.4.1: Five New Plugins for SEO, Related Posts, llms.txt, JSON Feed, and Minification"
date: 2026-11-09 09:00:00
description: v0.4.1 ships five zero-dependency built-in plugins (seo, related, llms, feed-json, minify), a new afterCollect hook for cross-page plugin data, and fixes plugin output 404s in dev.
category: changelog
tags: [xfmpress, changelog]
---

v0.4.1 is a big expansion of the plugin layer: five new plugins — `seo`, `related`, `llms`, `feed-json`, `minify` — all zero-dependency, covering the most common "operational" needs of a static site. A new `afterCollect` hook also lets plugins do cross-page computation for the first time.

## What this release solves

Before 0.4.1, xfmpress could build a site — but then what? Search engines want canonical URLs and Open Graph tags, readers want related-post suggestions, AI crawlers want llms.txt, subscribers want JSON Feed, and production deserves clean HTML. This release turns all five into plug-and-play.

## What changed

### Added: five plugins and the afterCollect hook

- **`seo`** — per-page canonical, Open Graph, Twitter Card, and JSON-LD (Article for posts; WebSite + SearchAction for the home page). Hand-written `canonical` / `og:title` tags in templates are respected, not overwritten; front-matter can set `image`, `canonical`, or `noindex`, or skip the page entirely with `seo: false`.
- **`related`** — scores every post by shared tags (3), category (2), and series (3) before rendering, exposing the result as `page.data.related`. Tune it with `related.limit` / `related.minScore`; front-matter can pass an explicit list or opt out with `related: false`. Both themes render a related-posts block when the plugin is on.
- **`llms`** — writes `llms.txt` and `llms-full.txt` following the llmstxt.org convention: a grouped post index, optional full text, controlled by `llms.full: false`.
- **`feed-json`** — JSON Feed 1.1 alongside the existing RSS output.
- **`minify`** — a production-only HTML minifier (comments, trailing whitespace, blank lines, indentation) that leaves `<pre>` / `<code>` / `<textarea>` / `<script>` / `<style>` untouched; `minify.aggressive` also folds newlines between tags.

Architecturally, the new `afterCollect` hook runs once after every page is collected — taxonomy, index, and pagination pages included — and before rendering, so plugins can write cross-page data into `page.data`; that's exactly how `related` works. The scaffold now enables the modern set by default: `sitemap`, `rss`, `feed-json`, `search`, `seo`, `related`, `llms`, `minify`.

### Changed: plugins no longer cost you parallelism

`transformHtml`-style plugins used to disable the worker pool, which hurt large sites. Now workers keep handling Markdown and template rendering, and the hook runs once per page on the main thread afterwards — so `seo` and `minify` no longer sacrifice parallelism. Related-post URLs are also folded into the page hash, meaning a post whose neighbors change gets re-rendered by the incremental cache instead of serving a stale list.

### Fixed: plugin output 404s in dev

`xfm dev` now serves plugin outputs (`search.json`, `sitemap.xml`, `feed.xml`, `feed.json`, `llms.txt`, ...) from memory. Previously `afterBuild` never ran in dev, so the search panel 404'd locally. Separately, `minify` normalizes CRLF before collapsing whitespace and drops whitespace-only lines, avoiding mixed-line-ending artifacts from templates and Markdown.

## Should you change anything on upgrade?

No breaking changes — existing plugin configs work as-is. Everything new is optional: add `seo` for metadata, `related` for suggestions, and so on, simply by listing them in `plugins`. For configuration details, see the [site configuration guide](/en/2026/11/21/xfmpress-config/).
