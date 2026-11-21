---
lang: en
translationKey: xfmpress-v0-4-11
title: "xfmpress v0.4.11: loose lists — a blank line no longer splits a list"
date: 2026-11-15 10:00:00
description: A loose-lists fix for the Markdown engine: blank lines between items keep one list, indented content after a blank line stays in the li, and CommonMark's tight/loose rule is implemented.
category: changelog
tags: [xfmpress, changelog]
---

Leaving a blank line between list items is a common way to keep long lists readable — but the old xfmpress engine responded by splitting your one list into two. v0.4.11 is a dedicated loose-lists fix, entirely in `lib/engine/markdown.js`, making lists with blank lines behave the way CommonMark says they should.

## What this release solves

A blank line plays two roles in Markdown: paragraph separator, and breathing room between list items. The old engine treated every blank line as "list over", which broke ordered numbering, mangled nested lists, and disabled any CSS that relies on `li + li`. This release redraws the boundary of what a blank line means inside a list.

## What changed

### Fixed

- **A blank line between items no longer splits one list into two.** `- a` + blank line + `- b` produced two separate lists, breaking `ol` numbering, nested lists and any CSS styling `li + li`. Items separated by blank lines now stay in one list.
- **Content after a blank line inside an item no longer falls out of the list.** `- 第一段` + blank line + ` 第二段` rendered the second paragraph outside the `li`, at the wrong indent too. Indented content after a blank line now belongs to the item and is rendered by the block parser — a follow-up paragraph, a sub-list, a fenced code block or a quote all work.

### Changed

- **CommonMark's tight/loose rule is now followed**: if any item is separated from its neighbour by a blank line, or contains a blank line, every paragraph in that list is wrapped in `<p>`. Tight lists are untouched (`<li>a</li>`), and an item with block content keeps the `<p>` it already had. Blank lines after a list still end it, and lazy continuation is still not allowed after a blank line.
- **A blank line belonging to an outer list is handed back to it.** In `- a` / `  - b` / blank / `- d`, that blank line belongs to the outer list and no longer marks the inner one loose.

## Do you need to do anything

No config changes, but rendered output will differ: if your CSS targets `li > p` spacing, those previously "impossible" `<p>` elements now appear in loose lists, so the visuals may shift — usually toward more correct spacing, but worth a glance. And any workarounds where you deleted blank lines to dodge the bug can now be reverted. Engine behavior details in the [Markdown guide](/en/2026/11/21/xfmpress-markdown/).
