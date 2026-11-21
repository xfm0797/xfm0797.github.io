---
lang: en
translationKey: xfmpress-v0-4-12
title: "xfmpress v0.4.12: indented code blocks now work inside list items"
date: 2026-11-15 11:00:00
description: Two rule deviations are fixed so indented (four-space) code blocks behave the same inside list items as outside, and the last "only fenced code works here" limitation is gone.
category: changelog
tags: [xfmpress, changelog]
---

xfmpress's Markdown engine has always supported indented (four-space) code blocks — inside list items after a blank line, in blockquotes, in `:::` containers and footnotes. But two rule deviations kept them from working in the most common case of all. v0.4.12 removes the last two "only fenced code works here" limitations.

## What this release solves

The failure of indented code blocks inside list items traces back to one question: what do the spaces after a list marker mean? The old regex swallowed every space after `- ` as item padding, discarding exactly the extra indentation that signals "this content is a code block". v0.4.12 redraws that line per CommonMark.

## What changed

### Fixed

- **`-     code` (five spaces after the marker) rendered as plain text.** Per CommonMark, 1–4 spaces after the marker are padding, while 5+ means one space of padding and the rest belongs to the content. The item now starts with a code block, and following lines indented four past the content column join it.
- **Leading spaces leaked into paragraphs.** A paragraph line starting with 1–3 spaces kept them (`<p>  code</p>`), which also surfaced after a list item's content indent was stripped. Up to three leading spaces are now treated as indentation and dropped.

Worth noting: indented code blocks already worked in items after a blank line, inside blockquotes, `:::` containers and footnotes — those paths are unchanged. This release fixes only the two deviations above.

## Do you need to do anything

No. Both fixes make the output match what you meant when you wrote the source: paragraphs with a few accidental leading spaces no longer show them, and five-space indented code lines inside list items finally render as code blocks. If you'd been switching to fenced blocks in these situations, both forms now work — pick whichever you prefer. Indented vs. fenced code in the [Markdown guide](/en/2026/11/21/xfmpress-markdown/).
