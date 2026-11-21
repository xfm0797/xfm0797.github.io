---
lang: en
translationKey: xfmpress-v0-4-14
title: "xfmpress v0.4.14: data files, custom collections and built-in i18n"
date: 2026-11-21 08:00:00
description: v0.4.14 adds global data files, custom collections outside the post stream, and translationKey-based i18n, plus an auto-excerpt fallback and a stale-output cleanup fix.
category: changelog
tags: [xfmpress, changelog]
---

v0.4.14 is an infrastructure release. It leaves build performance untouched and instead turns three common site-organization needs — structured data, non-post content sections, and multilingual content — into first-class features of the core. This very site relies on the i18n groundwork laid here.

## What this release solves

Once a static site grows past a blog, three problems keep coming back: reusing a team roster or nav config means hard-coding it into templates; sections like "projects" or "work" that don't belong in the post stream get shoehorned into tags; and shipping two languages usually means forking a second build pipeline. v0.4.14 addresses all three natively.

## What changed

### Added

- **Global data files (`data/`)** — `.json`, `.yaml`, `.yml`, `.js` and `.mjs` files under `data/` (configurable via `dataDir`) are exposed to every template and plugin as `site.data`. Nested directories become nested objects, so `data/team/members.yml` is reachable as `site.data.team.members`. Editing a data file invalidates all page caches, and values are JSON-cloned so the worker payload stays safe.
- **Custom collections** — `collections: { projects: { dir, url, layout, perPage, title, posts } }` turns a content subdirectory into an independent section with its own list page at `/projects/`, real static pagination at `/projects/page/2/…`, and `site.collections.<name>` available in templates. Items stay out of the default post stream, RSS and prev/next unless you opt in with `posts: true`. Both themes ship a `collection.html` layout.
- **Multi-language (i18n)** — declare `site.languages` and per-page `lang` front-matter drives `<html lang>`. Pages sharing a `translationKey` become each other's translations via `page.translations`, and `xfm-plugin-seo` injects `hreflang` alternates, `x-default` and `og:locale:alternate`. A single-language site outputs none of this. Themes include a `lang-switcher.html` partial, and nav items accept a `translations` map for localized labels and URLs.
- **Auto excerpt fallback (`page.desc`)** — pages without a `description` get an `excerpt` truncated from the rendered body. Templates can use `page.desc` (`description || excerpt`) in list cards and meta tags; both themes render `post.desc` in post lists.

### Fixed

- **Stale-output cleanup raced on directories.** `pruneStale` sorted directories deepest-first but removed them with `Promise.all`, so a parent `rmdir` could run before its children were gone and fail with `ENOTEMPTY` — silently swallowed, leaving empty directories behind, such as an old `/tags/x/page/` shell surviving after `pagination.taxonomy` was turned off. Directories are now removed sequentially, deepest first.

## Should you upgrade

There are no breaking changes — everything here is additive, plus one cleanup fix. Upgrade freely: `dataDir`, `collections` and `site.languages` are all optional and do nothing until configured. If you're starting out, the [content guide](/en/2026/11/21/xfmpress-content/) and the [configuration guide](/en/2026/11/21/xfmpress-config/) cover data files and collections in depth. The `translationKey` convention described here is exactly how the Chinese and English articles on this site are paired.
