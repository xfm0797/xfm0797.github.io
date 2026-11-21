---
lang: en
translationKey: xfmpress-v0-4-7
title: "xfmpress v0.4.7: the official manual is live"
date: 2026-11-10 08:00:00
description: This release ships a ten-chapter official manual and points the READMEs, npm homepage and scaffolded site at it, with no changes to the build engine.
category: changelog
tags: [xfmpress, changelog]
---

xfmpress had long outgrown its README: templates, themes, plugins and deployment each deserved more than a README subsection. v0.4.7 doesn't touch the build engine at all — it focuses on the thing every newcomer hits first: where to start.

## What this release solves

For a static site generator, the real on-ramp isn't the build kernel — it's documentation. Everything previously scattered across the READMEs is now consolidated into a structured manual, so "look it up in the docs" replaces "read the whole README top to bottom".

## What changed

### Added

- **The official manual is live at [doc.lovou.pw/docs/xfmpress](https://doc.lovou.pw/docs/xfmpress/)** — ten chapters covering install, CLI, configuration, content, templates, themes, plugins, deploy and architecture.
- Both READMEs gained a `docs` badge and a Documentation table; the CLI / configuration / plugins / themes / deployment sections now link to the matching chapter instead of repeating themselves.
- The npm `homepage` field points at the manual, and the README generated with a scaffolded site sends readers there too.
- The scaffold's README now lists all fifteen official plugins — it had stopped at nine, leaving the rest to be discovered by rummaging through `node_modules`.

### Fixed

- The test count stated in the README had gone stale (111 there, 118 in reality). Corrected.

## Do you need to do anything

No. This release changes no API, no config and no build behavior — just `npm update xfmpress` and keep going. If you've been keeping private notes on usage gaps, check the manual for the matching chapter and swap the notes for a link.
