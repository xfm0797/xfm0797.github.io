---
lang: en
translationKey: xfmpress-templates
title: Template Syntax: Variables, Filters, and Template Inheritance
date: 2026-11-21 09:40:00
description: Nunjucks-style template syntax — escaped output, six filters, conditionals and loops, include fragments, extend/block inheritance, and the full template context
category: xfmpress
tags: [xfmpress, tutorial]
series: xfmpress guide
---

# Template syntax overview

The syntax is very close to Nunjucks / Liquid — if you've written Hexo themes, migration is nearly seamless. The implementation differs though: templates are **compiled once into JS functions at build time**, and rendering is pure string concatenation — no interpreter loop, no AST traversal.

| Syntax | Purpose |
| --- | --- |
| `{{ expr }}` | Output, HTML-escaped by default |
| `{{ expr | safe }}` | Output, escaping disabled |
| `{% if %} / {% elif %} / {% else %}` | Conditionals |
| `{% for x in list %}` | Loops |
| `{% set x = expr %}` | Assignment |
| `{% include "partials/toc.html" %}` | Include a fragment |
| `{% extend "base.html" %}` + `{% block %}` | Inheritance and overrides |
| `{% raw %}…{% endraw %}` | Output verbatim, unparsed |
| `{# comment #}` | Comment, excluded from output |

## Output and escaping

```html
<h1>{{ page.title }}</h1>
<div class="prose">{{ content | safe }}</div>
```

`{{ }}` escapes `& < > " '` by default; write plain fields directly, and body HTML must have `| safe`. **Undefined variables don't throw** — they output an empty string. `page.data.prev.title` quietly yields undefined when `prev` doesn't exist; no TypeError.

## Filters

| Filter | Purpose |
| --- | --- |
| `safe` | Disables HTML escaping |
| `length` | Array element count / object key count / string length |
| `upper` / `lower` | Change case |
| `trim` | Strip leading and trailing whitespace |
| `json` | Serialize to JSON |
| `default` | Provide a default when the value is empty |

Filters chain with pipes: `{{ page.title | trim | upper }}`. A misspelled filter name is a **compile-time error** listing the available filters — a typo like `| saft` silently escaping an entire page is harder to debug than a failed build, so the engine chooses to fail fast.

## Conditionals and loops

Expressions support `and` / `or` / `not`, comparisons, member access, and indexing. Inside a loop there's a `loop` object: `loop.index` (starting at 1), `loop.first` / `loop.last`, `loop.length`, `loop.revindex`. An empty list falls back to `else`:

```html
{% for post in site.posts %}
  <a href="{{ post.url }}">{{ post.title }}</a>
{% else %}
  <p>No posts yet.</p>
{% endfor %}
```

Iterated values are handled leniently: null is treated as an empty array; strings are split into characters; **plain objects are split into `{ key, value }` entries**.

## include and extend

```html
{% include "partials/toc.html" %}
```

Resolution order: `layouts/` → `partials/` → theme root. Fragments share the context with the main template, and includes can be recursive.

Inheritance uses extend plus same-name block overrides:

```html
{% extend "base.html" %}
{% block main %}
  <article><h1>{{ page.title }}</h1>{{ content | safe }}</article>
{% endblock %}
```

Conventions: only override same-name blocks; when the parent template has no matching block, the child template's content is **appended to the end** (a misspelled block name doesn't error but lands in the wrong place); nested blocks and `super()` are not supported; the inheritance chain is capped at 10 levels.

## Template context

Top-level keys available on every render:

- `site` — config + aggregated data: `site.posts` (the post list), `site.tags` / `site.categories` / `site.series` (each with name/url/count), `site.nav`, `site.assets`, `site.base`
- `page` — the current page: `page.url` / `page.title` / `page.date` / `page.tags` / `page.category`, `page.excerpt`, `page.readTime`, `page.toc`
- `page.data` — the most useful layer: cross-page data injected by plugins (`related` posts, `prev` / `next` navigation) all live here
- `content` — the body HTML
- `headings` — an array of `{ level, text, id }`
- `pagination` — only on list pages

## One important rule: links don't need base prefixes

Feel free to write root-absolute paths like `<a href="/about/">` in templates — the `site.base` prefix is applied **uniformly at the render output**, covering templates, Markdown, and handwritten HTML alike. Manually concatenating `site.base + 'about/'` would double the prefix instead.

Next: [Theme Development](/en/2026/11/21/xfmpress-theme/).
