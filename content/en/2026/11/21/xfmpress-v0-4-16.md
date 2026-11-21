---
lang: en
translationKey: xfmpress-v0-4-16
title: "xfmpress v0.4.16: one comments plugin for ten comment systems"
date: 2026-11-21 10:00:00
description: The giscus-only plugin is renamed xfm-plugin-comments and now supports ten comment systems behind one comments.provider switch, with unchanged config keys, per-provider validation and scoped style injection.
category: changelog
tags: [xfmpress, changelog]
---

v0.4.16 does exactly one thing, and does it thoroughly: it grows the comment support from "giscus only" into "one config switch, ten systems". The rename, the expansion, the validation and the style handling all revolve around a single `comments.provider` field.

## What this release solves

Comment sections are table stakes for a blog, but every service wires up differently: giscus needs a `repoId`, Waline wants an `envId`, Disqus just takes a shortname. Until now xfmpress shipped a giscus-specific plugin, and switching systems meant swapping plugins and rewriting config. This release folds ten systems into one plugin, so switching is a one-field change.

## What changed

### Changed

- **`xfm-plugin-giscus` → `xfm-plugin-comments`** — the same plugin now serves ten comment systems behind one `comments.provider` switch: `giscus`, `beaudar`, `utterances`, `disqus`, `waline`, `twikoo`, `valine`, `gitalk`, `artalk`, `cusdis`. The config key is unchanged, so existing `provider: 'giscus'` setups keep working; the package rename only changes the install line.
- **New option: `comments.identifier`** (`path` | `url` | `title`) decides what a comment thread is bound to. This matters when you redesign or move domains — different bindings decide whether old threads survive the migration.
- **Per-provider validation of required fields.** A missing `repoId` / `envId` now warns and skips the widget instead of emitting a broken one, and an unknown provider gets you the full list of supported names to pick from.
- **Scoped stylesheet injection.** Stylesheets for Waline, Gitalk and Artalk are injected into `<head>` only on pages that actually mount a widget; every other page stays clean.

## Should you upgrade

Two scenarios. If you already use the giscus plugin: the config is fully compatible after upgrading, and the only change is swapping the dependency from `xfm-plugin-giscus` to `xfm-plugin-comments` (the package was renamed). If you're setting up comments for the first time: install the new package and pick a provider — there's no longer a need to hunt for a dedicated plugin. The one decision worth thinking about is `comments.identifier`: it defines what makes a thread unique, so settle it early; changing it later will strand old comments on the wrong pages. Full setup details are in the [comments guide](/en/2026/11/21/xfmpress-comments/).
