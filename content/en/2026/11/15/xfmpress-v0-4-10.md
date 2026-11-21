---
lang: en
translationKey: xfmpress-v0-4-10
title: "xfmpress v0.4.10: clearing three known Markdown edge cases"
date: 2026-11-15 09:00:00
description: Three long-standing known issues in the Markdown engine are fixed: block content inside list items, footnote indentation, and link reference definitions breaking paragraphs.
category: changelog
tags: [xfmpress, changelog]
---

Every Markdown implementation carries a list of known issues — cases with tricky trigger conditions that are infuriating once you hit them. v0.4.10 clears three of xfmpress's in one pass, all inside `lib/engine/markdown.js`, and all adjudicated by the CommonMark spec.

## What this release solves

The three cases share a root cause: they all happen where two syntaxes meet — a fence or quote inside a list item, a nested list right after a footnote definition, a link reference definition in the middle of a paragraph. The old parser got greedy or misjudged at those boundaries, producing HTML that didn't match what you wrote. The fix principle: where the spec speaks, follow the spec.

## What changed

### Fixed

- **Block content inside a list item is rendered as blocks.** `- 安装：` followed by an indented fence used to be flattened into one text run (`<li>安装： npm i -g xfmpress</li>`), and an indented `>` was escaped to `&gt;`. List items now collect their content at the item's content indent and hand quote / fenced code / `:::` container / rule blocks to the block parser, producing structures like `<li><p>安装：</p><div class="code-block">…</div></li>`. `- 标题` + `  ---` keeps its Setext meaning instead of turning into a rule.
- **Footnote block content requires the canonical 4-space indent.** The old rule accepted 2 spaces and dedented up to 4, so a two-space nested list right after a footnote definition was swallowed into the note. Now 4 spaces (or a tab) means block content, 1–3 spaces still means "same paragraph, next line" (no break for existing prose), and an unindented paragraph after a footnote stays a paragraph.
- **A link reference definition no longer interrupts a paragraph.** `collectDefinitions` used to pull every `[a]: /url` line out of the text, so one definition mid-paragraph split the paragraph in two and removed a line from it. Definitions are now only collected at paragraph start — which is also what CommonMark requires — and a mid-paragraph `[a]: /url` stays literal text without registering a reference.
- Default and docs themes: list items with block children no longer get extra leading/trailing space from the child's `p` margin.

### Tests

128 → 131: list-item blocks (quote / fence / callout), paragraph-safe definitions, and footnote indent boundaries.

## Do you need to do anything

No. The fixes only change output for markup that was previously rendered wrongly. If you never put code blocks inside list items, this release is invisible to you; if you'd been working around these cases, you can now write them naturally and get CommonMark behavior. The full syntax coverage is documented in the [Markdown guide](/en/2026/11/21/xfmpress-markdown/).
