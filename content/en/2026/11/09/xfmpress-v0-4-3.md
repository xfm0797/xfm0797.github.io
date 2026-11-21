---
lang: en
translationKey: xfmpress-v0-4-3
title: "xfmpress v0.4.3: Builds Now Tell You Which Plugins Loaded and What They Produced"
date: 2026-11-09 11:00:00
description: v0.4.3 makes xfm build and xfm dev print the plugins that actually loaded plus the files they emitted, so "installed but not picked up" is visible at a glance.
category: changelog
tags: [xfmpress, changelog]
---

v0.4.3 is a small but genuinely useful observability release: `xfm build` and `xfm dev` now print which plugins actually loaded, along with the files each one emitted.

## What this release solves

After 0.4.2 turned plugins into external npm packages, a new class of question appeared: did the plugin get installed, was it auto-discovered, is it actually running? That state used to live hidden in your config and `node_modules`. "Installed but not picked up" is the worst kind of failure — you suspect a config typo while the real cause is a misspelled package name, or you assume the plugin is running when it never loaded. Now that plugins are external packages, that state has to be visible in the build output.

## What changed

### Changed: visibility, nothing else

`xfm build` and `xfm dev` print the loaded plugins plus the files they emitted (`sitemap.xml`, `robots.txt`, `feed.xml`, and so on). One command run now confirms two things at a glance:

- whether the plugins you expect were auto-discovered and loaded (against your `xfm-plugin-*` dependencies in `package.json`);
- exactly which files each plugin wrote, matching what you'll find in the output directory.

No new configuration, no behavior change — the only thing that grew is what you can see. Combined with `xfm info` from 0.4.2 (which lists declared and auto-discovered plugins side by side), the troubleshooting path is complete: watch the build output for day-to-day checks, reach for `xfm info` when you need to dig deeper.

## Should you change anything on upgrade?

Nothing. This is a pure output improvement — config format, plugin loading order, and generated files are all unchanged. It's worth glancing at the plugin list the first time you build after upgrading, just to confirm everything loads as expected. For a tour of what each plugin produces, see the [plugins guide](/en/2026/11/21/xfmpress-plugins/).
