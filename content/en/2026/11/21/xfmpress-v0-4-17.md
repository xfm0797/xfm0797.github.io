---
lang: en
translationKey: xfmpress-v0-4-17
title: "xfmpress v0.4.17: per-language post streams, no more duplicated translations"
date: 2026-11-21 12:50:00
description: On multilingual sites, site.posts now holds only default-language posts; archives, tag counts, prev/next and feeds filter the same way, and each non-default language gets its own list pages.
category: changelog
tags: [xfmpress, changelog]
---

v0.4.17 is the version this site runs on, and it fixes a long-standing awkwardness on multilingual builds: ever since i18n arrived in 0.4.14, translations were built alongside originals but flowed into the same post stream — the same article appeared twice on the home list, doubled the category counts, and showed up twice in the feed. This release splits the stream cleanly by language.

## What this release solves

On a site that declares `site.languages`, `site.posts` now only contains posts in the default language (`languages[0]`). Archives, tag/category/series aggregation, `prev`/`next`, RSS and JSON Feed are filtered the same way, so a translation no longer shows up a second time in the home list, the category counts or the feed. Posts in other languages stay reachable — keeping their `hreflang` links — and are grouped in `site.postsByLang[lang]`. That's exactly how this site's Chinese and English articles stay in their own lanes.

## What changed

### Changed

- **The post stream is split per language.** The filter only engages when more than one language is declared; single-language sites take the old code path untouched, and existing output stays byte-identical.
- **Per-language list pages.** Every non-default language that has posts gets `/<lang>/` plus `/<lang>/page/N/`, rendered with the home layout and the same `pagination` shape. `page.lang` is set so `<html lang>`, localized nav labels and the language switcher all agree. The page is skipped when the language has no posts or a content file already owns that URL. A multilingual home page also gets a synthetic `page.translations` table (`/` ↔ `/en/`), so the switcher works from the front page.
- **`postsTotal` in listing templates** — the post count of the current list, which on `/<lang>/` is the per-language number. The default theme's sidebar uses it instead of `site.posts.length`.
- **`documents[].inStream` for plugins** — tells plugins whether a document belongs to the default stream. `xfm-plugin-rss`, `xfm-plugin-feed-json` (0.4.3) filter on it, and `xfm-plugin-related` (0.4.3) only recommends posts in the same language. `search.json` and `llms.txt` still index every page.

## Should you upgrade

Single-language sites: nothing to do — this release has zero effect on you. Multilingual sites: the semantics of the post stream changed, so audit every custom template that consumes `site.posts` directly; if a page needs to list posts across all languages, switch it to `site.postsByLang`. The behavior of archives, feeds and the related-posts plugin updates automatically, with no configuration required. For the bigger picture on multilingual setup, see the [configuration guide](/en/2026/11/21/xfmpress-config/) and the [templates guide](/en/2026/11/21/xfmpress-templates/).
