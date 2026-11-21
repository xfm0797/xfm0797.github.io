---
lang: en
translationKey: xfmpress-theme
title: Theme Development: Building Your Own Theme from Scratch
date: 2026-11-21 09:30:00
description: Theme directory structure, the layout checklist and selection order, a minimal working theme in four files, asset bundling, and debugging tips
category: xfmpress
tags: [xfmpress, tutorial]
series: xfmpress guide
---

# Themes are plain files

Themes need no bundling and no registration. Point at a directory, and at build time the layouts are read and assets copied by convention:

```
themes/my-theme/
├── theme.config.js     # optional: theme-level config
├── layouts/            # page skeletons (at least base.html)
│   ├── base.html
│   ├── index.html
│   ├── post.html
│   └── page.html
├── partials/           # reusable fragments, optional
│   └── toc.html
└── assets/             # static assets, copied to site.assets at build time
    └── style.css
```

## Layout checklist and selection order

| Layout | When it's used | Required |
| --- | --- | --- |
| `base.html` | Not rendered directly; for extend | Yes |
| `post.html` | Dated posts | Recommended |
| `page.html` | Fallback when no layout field is set | Recommended |
| `index.html` | Home page and paginated pages | Recommended |
| `taxonomy.html` | Tag / category / series aggregation pages | Optional |
| `categories.html` | Category index page `/categories/` | Optional |
| `archives.html` | Archive pages by year `/archives/` | Optional |

Selection order: the front-matter `layout` → the config's `defaults.layout` → `page.html`. The home page always uses `index.html`, and aggregation pages always use `taxonomy.html`. **A missing layout means that kind of page simply isn't generated, without errors** — if the theme has no `archives.html`, there will be no `/archives/`.

Two themes are built in: `default` (blog: home list + post page + right-hand TOC + dark/light mode) and `docs` (sidebar docs site, driven by `site.navGroups`).

## A minimal theme from scratch

Four files are enough to run. `layouts/base.html`:

```html
<!DOCTYPE html>
<html lang="{{ site.lang }}">
<head>
  <meta charset="utf-8">
  <title>{{ page.title | default(site.title) }}</title>
  <link rel="stylesheet" href="{{ site.assets }}style.css">
</head>
<body>
  <header><a href="/">{{ site.title }}</a></header>
  <main>{% block main %}{{ content | safe }}{% endblock %}</main>
</body>
</html>
```

`layouts/index.html` (home page list):

```html
{% extend "base.html" %}
{% block main %}
<h1>{{ site.title }}</h1>
<ul>
{% for post in site.posts %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> <time>{{ post.date }}</time></li>
{% else %}
  <li>No posts yet.</li>
{% endfor %}
</ul>
{% endblock %}
```

`layouts/post.html` (post page):

```html
{% extend "base.html" %}
{% block main %}
<article>
  <h1>{{ page.title }}</h1>
  <div class="prose">{{ content | safe }}</div>
</article>
{% endblock %}
```

Point the config at it:

```js
export default { theme: 'themes/mini' };
```

`xfm dev` immediately renders with the new theme; templates are cached by mtime, so saving recompiles them.

## Asset bundling

Everything under `assets/` is copied by relative path to `site.assets` (default `/assets/`):

```
themes/my-theme/assets/style.css → dist/assets/style.css
themes/my-theme/assets/fonts/a.woff2 → dist/assets/fonts/a.woff2
```

In templates, build paths with `{{ site.assets }}style.css`, so switching themes or changing the prefix requires no template edits. The site's `public/` directory is a separate channel that lands directly in the output root — use it for fixed-path files like favicon and robots.txt.

## Debugging tips

- **Template errors point to the file**: e.g. `partials/toc.html: unsupported filter "safee" (available: safe, length, …)` — just follow the hint
- **A block change didn't take effect**: first check that the parent layout has a same-name block — when the matching block is missing, content is appended to the end of the page instead of replacing anything
- **Styles are right but content didn't change**: content comes from page/site, so check the layout field in the front-matter
- **Don't do heavy work in templates**: complex computation inside a `for` loop runs N times; leave cross-page computation to a plugin's afterCollect hook and write the results into page.data

Next: [The Plugin System](/en/2026/11/21/xfmpress-plugins/).
