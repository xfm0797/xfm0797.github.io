---
lang: en
translationKey: xfmpress-v0-2-1
title: "xfmpress v0.2.1: a friendlier, safer CLI"
date: 2026-11-04 10:00:00
description: This patch adds Hexo-style command aliases and did-you-mean suggestions to the CLI, and fixes prototype-key command lookup plus handling of leading-dash input.
category: changelog
tags: [xfmpress, changelog]
---

Version 0.2.1 is small and sharp: everything in it is about the command line. Users coming from Hexo no longer need to relearn commands, typos produce suggestions instead of a wall of help text, and two command-parsing holes are closed.

## What this release solves

The native commands are `create` / `build` / `dev`, but a large share of static-site users come from Hexo, where muscle memory says `init` / `generate` / `serve`. Hitting "unknown command" every time is a poor welcome. There were also two parsing hazards: `xfm constructor` — or any key inherited from `Object.prototype` — was resolved as a command and invoked the prototype method, and leading-dash input such as `xfm --port=4173` dumped the entire command list instead of telling you it was an unrecognized *option*.

## What changed

### Added

- Hexo-style command aliases: `init` → `create`, `generate` / `gen` → `build`, and `serve` / `server` / `preview` → `dev`. Existing Hexo users get a zero-cost transition.
- Unknown commands now suggest the closest match: `xfm buils` prints "did you mean `xfm build`?" rather than reprinting the whole help text.
- npm / Node / license / zero-dependency badges were added to both READMEs.

### Fixed

- `xfm constructor` (or any `Object.prototype` key) no longer resolves as a command; command lookup now uses own properties only, so the prototype chain is out of reach.
- Leading-dash input such as `xfm --port=4173` is reported as an unknown *option* with a usage hint, instead of dumping the command list.

## Should you upgrade

Upgrade and move on — no breaking changes, no config edits. Scripts that call `xfm build` keep working, and switching them to `gen` or `serve` is equally fine. The full command reference lives in the [CLI guide](/en/2026/11/21/xfmpress-cli/).
