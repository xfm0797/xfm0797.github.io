---
lang: en
translationKey: xfmpress-cli
title: Complete CLI Guide: create / dev / build / new / clean / info
date: 2026-11-21 10:20:00
description: Options, aliases, and typical usage for all six xfmpress commands
category: xfmpress
tags: [xfmpress, tutorial]
series: xfmpress guide
---

# CLI overview

| Command | Description |
| --- | --- |
| `xfm create [dir]` | Create a site, alias `init` |
| `xfm dev [dir]` | Dev server, aliases `serve` / `server` / `preview` |
| `xfm build [dir]` | Production build, aliases `generate` / `gen` |
| `xfm new [layout] "title"` | Create content: post / page / draft |
| `xfm clean` | Remove build output and cache |
| `xfm info` | Show the final effective configuration |

Every command accepts a `[dir]` argument to specify the site path; when omitted, the current directory is used.

## create: create a site

```bash
xfm create my-blog --template=blog --title=站点名
```

- `--template=blog|docs`: `blog` is the blog template, `docs` is the sidebar docs template
- Whether "the directory is already a site" is determined by the presence of a config file, so older sites using `.js` / `.cjs` / `.json` configs won't be accidentally overwritten

## dev: dev server

```bash
xfm dev --port=4173 --host=127.0.0.1
```

- `--port`: the port, defaults to 4173 (also changeable via `server.port` in the config)
- `--host=0.0.0.0`: make the server reachable from other devices on the same network
- The config file itself is watched too — saving changes to `xfm.config.mjs` triggers a rebuild, no restart needed

## build: production build

```bash
xfm build --incremental    # enable caching (.xfm/cache.json)
xfm build --drafts         # include drafts (overrides buildDrafts config)
xfm build --no-drafts      # exclude drafts
xfm build --scheduled      # force-publish posts with future dates
xfm build --no-scheduled   # exclude future posts (default behavior)
```

Note: posts with a future `date` are **held back** by default — they don't appear in pages, RSS, the sitemap, or post list counts, and are published automatically when their time comes; in `dev` mode they remain visible for previewing.

## new: create content

```bash
xfm new "标题"                  # post (default)
xfm new post "标题"             # same as above, explicit
xfm new page 标题               # page, automatically writes layout: page.html and type: page
xfm new draft "标题"            # draft, automatically writes draft: true
xfm new "标题" --dir=notes      # specify a subdirectory
xfm new "标题" --slug=my-post   # specify the slug
xfm new "标题" --force          # overwrite an existing file with the same name
```

Rules:

- **With a single argument, it is always the title** — `xfm new page` creates a post titled "page", not a page
- Multiple arguments are not truncated: `xfm new 我的 文章` gives the title 「我的 文章」
- Same-name files get a number appended automatically, so nothing is overwritten

## clean and info

```bash
xfm clean    # remove dist/ and the .xfm/ cache
xfm info     # show which config file was found, plus theme and plugins
```

When troubleshooting "the config didn't take effect" or "the plugin didn't load", the first step is always `xfm info`.

Next: [Configuration in Depth](/en/2026/11/21/xfmpress-config/).
