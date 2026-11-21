---
lang: en
translationKey: xfmpress-content
title: Organizing Content: Directories as URLs and front-matter
date: 2026-11-21 10:00:00
description: How the content directory maps to URLs, every front-matter field, the three roles of posts/pages/drafts, Page Bundles, and scheduled publishing
category: xfmpress
tags: [xfmpress, tutorial]
series: xfmpress guide
---

# How directories map to URLs

All content lives under `content/`, with support for `.md`, `.markdown`, `.html`, and `.htm`. The rules in three sentences: **`index` collapses into the directory itself; extensions are removed and a trailing slash is added; `.html` stays as-is**.

| Source file | Generated URL |
| --- | --- |
| `content/index.md` | `/` |
| `content/about.md` | `/about/` |
| `content/posts/hello.md` | `/posts/hello/` |
| `content/2026/11/21/a.md` | `/2026/11/21/a/` |

To pin a specific address, set it directly in the front-matter — `url`, `permalink`, and `slug` are all recognized:

```yaml
---
title: About
url: /about-me/
---
```

Non-ASCII paths work too — the real directory name is restored on disk, so filenames in Chinese won't 404.

## Every front-matter field

| Field | Description |
| --- | --- |
| `title` | Title; falls back to the filename if omitted |
| `date` / `published` | Publish date; RSS and sorting depend on it |
| `updated` | Update time; feeds the sitemap's lastmod |
| `description` / `summary` | Summary; takes priority over the auto-generated excerpt |
| `tags` | Array or comma-separated string; both `[a, b]` and `a, b` are accepted |
| `category` | Category, a single string |
| `series` | Series, a single string |
| `layout` | Layout filename; defaults to `defaults.layout` |
| `weight` / `order` | Sort weight; smaller values come first |
| `draft` | When `true`, skipped in production builds |
| `toc` | When `false`, no table of contents is generated |
| `type` | Set to `page` to exclude from post lists, RSS, and prev/next navigation |

Two date details: date-only values (`2026-11-10`) are interpreted as a **local calendar day**, so they never shift a day earlier due to time zones; timestamps with a timezone offset keep their original value. A UTF-8 BOM from Windows editors doesn't affect parsing.

## Posts, pages, and drafts

Content has only three roles, and the difference is entirely in the front-matter:

- **Post**: has a `date`; appears in the home page list, RSS, the search index, prev/next navigation, and related posts
- **Page**: `type: page`; has its own URL but does **not** appear in any list or feed — use it for about pages and link pages; to put a page in the navigation, add it to `site.nav` yourself
- **Draft**: `draft: true`; still rendered by `xfm dev`, skipped by `xfm build`; delete that line to publish

## Page Bundles: assets alongside pages

Files under `content/` that aren't pages (images, PDFs, etc.) are copied to the output as-is:

```
content/posts/hello/
├── index.md      → /posts/hello/
└── cover.png     → /posts/hello/cover.png
```

Just write `![cover](./cover.png)` in `index.md`. Relative URLs resolve under the page's own URL, so the same source works with any `site.base`.

## Scheduled publishing

Set `date` to a future time and production builds will hold the post back — it won't appear in pages, RSS, the sitemap, or post list counts, and is published automatically when its time comes; in `dev` mode it remains visible for previewing. To force publishing, use `xfm build --scheduled` or set `buildScheduled: true` in the config.

## Excerpts and reading time

When there's no `description`, the engine truncates the rendered body to roughly 140 characters as the `excerpt` (automatically stripping noise like code blocks and link definitions); reading time is estimated at 350 words per minute. Templates uniformly use `page.desc` (= `description || excerpt`) and `page.readTime`.

Next: [Extended Markdown Syntax](/en/2026/11/21/xfmpress-markdown/).
