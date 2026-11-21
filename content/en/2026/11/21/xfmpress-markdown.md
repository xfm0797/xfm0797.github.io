---
lang: en
translationKey: xfmpress-markdown
title: Extended Markdown Syntax: Containers, Footnotes, and Code Highlighting
date: 2026-11-21 09:50:00
description: xfmpress extensions on top of GFM — tip containers, code block titles, reference-style links, footnotes, Setext headings, and Chinese anchors
category: xfmpress
tags: [xfmpress, tutorial]
series: xfmpress guide
---

# Built-in Markdown capabilities

The body is standard Markdown, with all common GFM syntax supported: tables, task lists, strikethrough, autolinks. On top of that, the engine ships a set of extensions, all handled **at build time** — no runtime JS involved.

## Tip containers

```markdown
::: tip Tip title
A highlighted box with a title.
:::
```

Five types are supported — `tip` / `info` / `warning` / `danger` / `details`; the type controls the color and icon. The title can be omitted. `details` collapses by default, which is great for long appendices.

## Code blocks

A fenced block with a language tag gets syntax highlighting, and you can append a title to the first line of the fence:

````markdown
```js app.js
const ok = true;
```
````

Language aliases are normalized and case-insensitive, covering common languages like `js / ts / java / c / cpp / go / rust / python / bash / json / yaml / html / css / vue / md`; unknown languages fall back to plain escaped text without errors. Meta information on the fence's first line (such as `{1,3-5}` highlight ranges) is ignored.

If you don't want fences, four leading spaces or a tab also creates an indented code block, both inside and outside list items.

## Reference-style links

Write each URL once at the end of the document:

```markdown
I spent these days tinkering with [static site generators][ssg] and reorganized the [docs][docs] along the way.

[ssg]: https://example.com/ssg "Static site generator"
[docs]: https://example.com/docs
```

Definition lines don't appear in the body. The shorthand form `[ssg]` is also supported — when the link text is the identifier itself, the second pair of brackets can be dropped. Definitions only take effect **at the start of a paragraph**; that's a CommonMark rule.

## Footnotes

```markdown
Drop a note in the body[^note] and the annotation appears at the end of the document.

[^note]: Numbered by first-reference order, with an individual backlink for each reference.
```

Footnotes are numbered by first-reference order, and every reference gets its own backlink. Block-level content inside a footnote (a second paragraph, a sub-list, a code block) needs to be indented four spaces.

## Other extensions

- **Setext headings**: write `====` (level 1) or `----` (level 2) on the line below a paragraph
- **Loose lists**: blank lines between items still form a single list, with paragraphs wrapped in `<p>`; ordered lists preserve their start number (starting at `3.` outputs `start="3"`)
- **Escapes**: `\*not italic\*`, `` \`not code\` ``
- **Task lists**: `- [x] done`, with support for indented continuation lines and nesting

## Heading anchors and the table of contents

Level-2 and level-3 headings get an automatic `id`, and **Chinese headings get readable anchors too** (duplicate headings get a sequence number appended). Headings are also collected into `page.toc`, which the theme uses to render the right-hand table of contents and highlight the current section while scrolling — that's exactly how the TOC on this site's post pages works.

`toc: false` only affects the table of contents, not the anchors themselves.

## Automatic resolution of relative links

Relative paths in Markdown are resolved against the source file's location at build time into the correct site URL:

```markdown
See [the previous chapter](./xfmpress-content.md).
```

Links to `.md` files that don't exist as source files are kept as-is — a typo won't silently turn into a weird path.

Next: [Template Syntax](/en/2026/11/21/xfmpress-templates/).
