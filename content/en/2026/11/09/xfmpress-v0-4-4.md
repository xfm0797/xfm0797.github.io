---
lang: en
translationKey: xfmpress-v0-4-4
title: "xfmpress v0.4.4: xfm create No Longer Overwrites an Existing package.json"
date: 2026-11-09 12:00:00
description: v0.4.4 fixes a bug where xfm create replaced an existing package.json outright; it now merges, so sites that installed plugins before scaffolding keep their xfm-plugin-* dependencies.
category: changelog
tags: [xfmpress, changelog]
---

v0.4.4 fixes a bug that made plugins silently disappear: `xfm create` no longer overwrites an existing `package.json` — it merges instead.

## What this release solves

Since plugins moved out of the core in 0.4.2, a site loads its plugins through `xfm-plugin-*` dependencies in `package.json`. The old `xfm create` logic generated a fresh `package.json` that replaced whatever was there. So a site that installed plugins first and then re-ran `xfm create` — say, to reinitialize or try a different template — lost every `xfm-plugin-*` dependency at once. The plugins silently stopped loading, and the build didn't complain. Failures that look perfectly normal while a feature quietly dies are far harder to notice than a crash.

## What changed

### Fixed: overwrite is now a merge

`xfm create` merges the generated content into your existing `package.json`: existing `xfm-plugin-*` dependencies are preserved, and whatever the scaffold needs is added on top. Installing plugins before running `create` is now a safe order of operations.

### Added: test coverage for the merge path

The test suite grew from 111 to 112, with the new test covering both the merge itself and the "plugins still load after `create`" path — a regression test for exactly the silent-failure scenario described above.

## Should you change anything on upgrade?

Nothing to configure or run. If you re-ran `xfm create` in the past and noticed plugins going dark, check your `package.json` for `xfm-plugin-*` dependencies — if an older version wiped them, reinstall with `npm i -D xfm-plugin-…` and confirm the plugin list in the `xfm build` output. The full scaffolding flow is covered in the [installation guide](/en/2026/11/21/xfmpress-install/).
