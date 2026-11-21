---
lang: en
translationKey: xfmpress-v0-4-5
title: "xfmpress v0.4.5: Quieter, More Accurate xfm create Output"
date: 2026-11-09 13:00:00
description: v0.4.5 polishes the xfm create console output: no more pointless cd . when scaffolding into the current directory, and already-installed plugins are listed instead of repeating the install hint.
category: changelog
tags: [xfmpress, changelog]
---

v0.4.5 is a pure polish release — no new features, just two bits of noise removed from the `xfm create` console output.

## What this release solves

The last step of scaffolding usually means following the instructions printed on screen, and inaccurate instructions create work instead of saving it. Two such cases are fixed:

- **The pointless `cd .`** — when scaffolding into the current directory, the output told you to `cd .`, which is a no-op in any shell. That prompt no longer appears.
- **Repeated install hints** — `xfm create` suggests installing plugins, but if some are already in `package.json`, following the hint means installing the same thing twice with no clarity about what actually needs doing. The output now lists the plugins already present and keeps the install hint only for what's genuinely missing.

## What changed

### Changed: create's output, and only that

The sole change is `xfm create`'s console output. Build behavior, generated file contents, and plugin loading are all untouched. The one edge case worth knowing about: if any of your tooling parses the text output of `xfm create` (rare, but it happens), check whether it's affected.

## Should you change anything on upgrade?

Nothing — just upgrade. For the complete from-zero workflow, see the [quick start guide](/en/2026/11/21/xfmpress-quick-start/).
