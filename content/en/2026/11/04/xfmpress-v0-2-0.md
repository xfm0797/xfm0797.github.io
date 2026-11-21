---
lang: en
translationKey: xfmpress-v0-2-0
title: "xfmpress v0.2.0: a major Markdown rendering upgrade"
date: 2026-11-04 08:00:00
description: This release adds footnotes, reference-style links, setext headings and more Markdown syntax, fixes front-matter parsing of titles with colons, and cleans up anchors and excerpts.
category: changelog
tags: [xfmpress, changelog]
---

Version 0.2.0 is all about the writing experience. It fills in the everyday Markdown features the 0.1.x renderer lacked, and fixes two parsing bugs that could make an article fail to build at all. If you are migrating an existing blog, compatibility improves a lot from this release on.

## What this release solves

The 0.1.x renderer covered only the basics, and real-world content quickly ran into its limits: no footnotes for academic writing, no `[text][id]` reference links for long documents, and no setext headings for articles that underline titles with `====`. Worse, two edge cases broke builds outright — a title containing `:` or `#` produced unparsable front-matter, and reference links inside blockquotes, callouts and tables silently failed to resolve. This release closes those gaps in one pass.

## What changed

### Added

- Reference-style links and images: `[text][id]`, the shorthand `[id]`, and `![alt][id]`, all resolved from a single `[id]: url "title"` definition — and definitions no longer leak into the rendered body.
- Footnotes: `text[^1]` with `[^1]: note`, numbered by first reference, with a back link at every reference and a `.footnotes` section at the end.
- Setext headings: a paragraph line followed by `====` becomes h1, `----` becomes h2.
- Four-space / tab indented code blocks, backslash escapes (`\*literal\*`), and lazy (unindented) list continuation lines, as in CommonMark.
- Ordered lists keep their start number: `3.` renders `<ol start="3">`.
- `xfm new` auto-numbers duplicate titles (`title.md`, `title-2.md`, ...) instead of exiting with an error.

### Changed

- Heading anchors and TOC entries ignore inline markup, so `## Use [xfm](/x) **now**` becomes the anchor `use-xfm-now` instead of the mangled `use-xfmx-now`.
- Auto-generated excerpts strip link definitions, footnote definitions and footnote markers instead of exposing `[id]: https://...` as body text.
- The front-matter parser unescapes double-quoted strings with JSON semantics (`\"`, `\n`) and handles `''` inside single quotes. New posts write the title double-quoted, so titles containing special characters stay valid YAML.

### Fixed

- A title containing YAML special characters (`:` / `#`) no longer produces unparsable front-matter.
- Reference links inside blockquotes, callouts and tables now resolve; previously nested rendering started from an empty definition scope and dropped them.

## Should you upgrade

Yes, and it is painless: no breaking changes, no config edits. Existing articles simply render more correctly — especially where anchors were polluted by inline markup or excerpts leaked link definitions. See the [Markdown support guide](/en/2026/11/21/xfmpress-markdown/) for the full syntax reference.
