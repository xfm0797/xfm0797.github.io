---
lang: en
translationKey: xfmpress-plugin-reading-stats
title: "reading-stats: word counts and reading time, zero config"
date: 2026-11-21 14:30:00
description: xfm-plugin-reading-stats counts words per page at build time (CJK by character, Latin by word), estimates reading minutes, and writes stats.json.
category: plugins
tags: [xfmpress, plugin]
---

"How long is this post and how many minutes does it take to read" is common meta information — and it is more reliable computed at build time than estimated at runtime. `xfm-plugin-reading-stats` needs no configuration: install it, and every page gets a word count and an estimated reading time, plus a site-wide stats file.

## What it solves

- Word counting is language-aware: CJK characters count individually, Latin text counts by word — not a raw character count divided by a constant. Code blocks never inflate the number: `<pre>`, `<script>`, and `<style>` blocks plus all HTML tags are stripped before counting.
- Reading minutes are estimated at 400 words per minute, with a floor of 1 minute.
- It doubles as the official example of the `extendContext` hook: site-wide stats are injected into the template context, so it is the pattern to copy when your own plugin needs to feed templates.

## Install and configure

```bash
npm i -D xfm-plugin-reading-stats
```

There are no options — no `reading-stats` key in `xfm.config.mjs`, no front-matter switch. Install it and it applies site-wide.

## Runtime behavior and output

After the build, the plugin writes `stats.json` containing `totalWords`, `totalPages`, and `pages` — the top 200 pages sorted by word count, each with `url`, `title`, `words`, and `minutes`. Use it for a "longest posts" list, a build report, or front-end display.

Templates read the site-wide overview as `site.stats.words` and `site.stats.minutes`, for example to show the site's scale in a footer:

```liquid
{{ site.stats.words }} words / about {{ site.stats.minutes }} minutes
```

Mind the difference in scope: `site.stats.words` aggregates excerpt and title text per page, so it is a site-scale overview figure; per-page exact counts live in `stats.json`, which is computed from each page's fully rendered HTML.

## Notes

- The counting basis is "CJK characters + Latin words", which differs from a word processor's character count — do not present it as an exact figure.
- The 400-words-per-minute reading speed is a hard-coded estimate and cannot be adjusted per page.
- `stats.json` keeps at most 200 rows of per-page detail; pages beyond that only contribute to the totals.
