---
lang: en
translationKey: xfmpress-quick-start
title: Quick Start: Create Your First xfmpress Site in 30 Seconds
date: 2026-11-21 10:30:00
description: From xfm create to xfm dev — get a blog with millisecond hot reload running as fast as possible
category: xfmpress
tags: [xfmpress, tutorial]
series: xfmpress guide
---

# Create a site in 30 seconds

Three commands to get a blog running:

```bash
xfm create my-blog      # scaffold a site
cd my-blog && xfm dev   # dev server with millisecond hot reload
xfm build               # production build, output in dist/
```

## xfm create

```bash
xfm create my-blog --template=blog --title=My Blog
```

- `--template=blog|docs`: blog template or sidebar docs template, blog by default
- `--title=`: site title
- Alias: `xfm init`

The generated directory looks like this:

```
my-blog/
├── xfm.config.mjs      # site config
├── package.json        # xfmpress in devDependencies
├── content/            # content directory
│   └── posts/          # posts
├── scaffolds/          # templates used by xfm new
│   ├── post.md
│   ├── page.md
│   └── draft.md
└── public/             # static files copied as-is to the output root
```

## xfm dev: the dev server

```bash
xfm dev                # default http://127.0.0.1:4173
xfm dev --port=5000    # pick another port
```

The hallmark is **millisecond hot reload**: Markdown, templates, and config all apply on save; the page refreshes via SSE and keeps its scroll position. CSS hot-swaps without even a refresh. The 404 page lists every available route, so typos are obvious at a glance.

## xfm build: production build

```bash
xfm build                 # output in dist/
xfm build --incremental   # enable the incremental cache
xfm build --drafts        # include drafts temporarily
```

`dist/` contains pure static HTML + CSS with zero JavaScript dependencies (aside from small theme interactions) — any static host will do.

## Creating content

```bash
xfm new "Hello World"        # new post → content/posts/Hello World.md
xfm new page about           # new page → content/about.md (not in the post stream)
xfm new draft "Half-baked"   # new draft, skipped in production builds
```

Initial content comes from `scaffolds/<layout>.md` with the `{{ title }}`, `{{ date }}`, and `{{ layout }}` placeholders — edit a scaffold once and every future post follows it.

> This article is part of the [xfmpress guide](/series/xfmpress%20guide/) series. The remaining chapters are currently available in Chinese only.
