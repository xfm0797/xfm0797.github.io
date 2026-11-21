---
lang: en
translationKey: xfmpress-v0-1-1
title: "xfmpress v0.1.1: documentation fixes and install guidance"
date: 2026-11-03 09:00:00
description: A documentation-only patch release that fixes the wrong install command, unifies the dev-server port to 4173, and splits all docs into English/Chinese pairs.
category: changelog
tags: [xfmpress, changelog]
---

xfmpress 0.1.0 had just shipped, and 0.1.1 is a documentation-only patch. No engine code changed — the goal was to fix everything that made a newcomer's first hour harder than it needed to be.

## What this release solves

The most embarrassing issue: the docs told people to run `npm i -D xfm`, but the installable package on npm is actually `xfmpress` (`xfm` is only the CLI command). Anyone following the install guide verbatim hit an install failure. On top of that, the dev-server port was documented inconsistently as `4000` in some places and `4321` in others, so readers who followed different pages could not connect to the server. A new project lives or dies by its first-run experience, so this release clears out those traps in one pass.

## What changed

### Changed

- The English `README.md` is now the document shown by default on the npm page; the Chinese version ships as `README_CN.md`, and the two link to each other. npm is the international entry point, so English-first presentation reaches more users.
- Documentation is now split into English/Chinese pairs: `README` / `README_CN`, `INSTALL` / `INSTALL_CN`, and `PROGRAM` / `PROGRAM_CN`, so Chinese-speaking users get a complete set too.
- The dev-server port is corrected to `4173` in all docs and scaffolds, replacing the previously inconsistent `4000` / `4321`.
- The package description was rewritten in English to match the npm-facing README.

### Fixed

- The wrong install target (`npm i -D xfm`) was corrected; the installable package is `xfmpress`, while the CLI command remains `xfm`.
- Configuration examples now consistently use the `site: {}` shape with a top-level `outDir`, so users no longer copy mutually contradictory snippets.

## Should you upgrade

There is nothing to upgrade — 0.1.1 contains no code changes and installed sites behave identically. The only action worth taking: if your notes or articles reference the old install command, change it to `npm i -D xfmpress`. New users can follow the corrected [installation guide](/en/2026/11/21/xfmpress-install/) end to end without hitting mismatched ports or commands.
