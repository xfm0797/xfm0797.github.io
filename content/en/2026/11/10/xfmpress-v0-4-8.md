---
lang: en
translationKey: xfmpress-v0-4-8
title: "xfmpress v0.4.8: xfm new becomes a first-class command"
date: 2026-11-10 09:00:00
description: Pages and drafts get real commands, scaffolds become editable files, and front-matter gaps are filled automatically — no more hand-maintained page boilerplate.
category: changelog
tags: [xfmpress, changelog]
---

Before v0.4.8, `xfm new` could only create posts. Wanting an About page meant copying a post, editing the front-matter, and hoping you didn't forget `type: page` — because if you did, the page would quietly show up in the post list, RSS and the search index. This release makes content creation a first-class command, aligned with Hexo's `xfm new [layout] <title>` shape.

## What this release solves

The reach of the create command defines how pleasant day-to-day writing feels. Pages and drafts were both faked by hand, with the critical front-matter keys maintained from memory. v0.4.8 turns every one of those implicit conventions into an explicit command.

## What changed

### Added

- **`xfm new [layout] <title>`** — pages and drafts finally have their own command form:
  - `xfm new page about` creates `content/about.md`, published at `/about/`
  - `xfm new draft "Half an idea"` creates a post with `draft: true`
  - `xfm new "Hello"` and `xfm new post "Hello"` still create posts, unchanged
  - Use `--layout=` when the title itself starts with a layout name; `--dir=` still places the file in any subdirectory.
- **Pages get `layout: page.html` and `type: page` automatically**: they have their own URL and can be added to `site.nav`, but never appear in the post list, RSS, JSON Feed, related posts or the search index.
- **A `scaffolds/` directory**: `xfm new` now takes its initial content from `scaffolds/<layout>.md` in your site, with `{{ title }}` / `{{ date }}` / `{{ layout }}` placeholders — exactly like Hexo. `xfm create` writes the three default scaffolds for you to edit; sites without the directory fall back to the built-in templates.
- Front-matter keys a custom scaffold omits (title, date, layout, `type: page`, draft) are filled in automatically, so a bare scaffold can't silently produce a page that behaves like a post or a draft that gets published.

### Changed

- `xfm new` prints the layout and the resulting URL (`[page] → /about/`), names the scaffold it used, and suggests the right command when the first word looks like a misspelled layout.
- A multi-word title stays whole: `xfm new 我的 文章` creates 「我的 文章」 instead of dropping everything after the first word. A single argument is always a title (`xfm new page` is a post named "page"), matching Hexo.
- The starter post body no longer repeats the `# H1` the theme already renders from `page.title`.

## Do you need to do anything

No breaking changes — existing commands behave exactly as before. Two things are worth doing: create pages with `xfm new page <title>` from now on, and consider moving your hand-rolled templates into `scaffolds/` to benefit from the placeholder filling. Full command reference in the [CLI guide](/en/2026/11/21/xfmpress-cli/).
