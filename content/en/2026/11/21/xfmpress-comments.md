---
lang: en
translationKey: xfmpress-comments
title: Comments: One Plugin, Ten Comment Services
date: 2026-11-21 08:45:00
description: xfm-plugin-comments plugs in giscus, waline, twikoo, disqus and seven more behind one provider switch, with per-provider validation and on-demand stylesheets
category: xfmpress
tags: [xfmpress, tutorial]
series: xfmpress guide
---

# One plugin, ten comment services

Adding comments to a static site doesn't take ten plugins — `xfm-plugin-comments` unifies ten comment services behind a single `comments.provider` switch:

| provider | Notes | Required config |
| --- | --- | --- |
| `giscus` | GitHub Discussions based, the go-to for dev blogs | `repo`, `repoId`, `category`, `categoryId` |
| `beaudar` | GitHub Issues based, Chinese-friendly | `repo` |
| `utterances` | The original GitHub Issues comments | `repo` |
| `disqus` | Established international service | `shortname` |
| `waline` | Self-hosted, friendly for China access | `serverURL` |
| `twikoo` | Self-hosted, lightweight | `envId` |
| `valine` | LeanCloud based | `appId`, `appKey` |
| `gitalk` | Another GitHub Issues implementation | `clientID`, `clientSecret`, `repo` |
| `artalk` | Self-hosted, multi-site management | `server` |
| `cusdis` | Privacy-friendly, no tracking | `appId`, `host` |

# Install and configure

```bash
npm i -D xfm-plugin-comments
```

```js
// xfm.config.mjs
export default {
  comments: {
    provider: 'giscus',        // switch services by changing one line
    repo: 'xfm0797/xfm0797.github.io',
    repoId: 'R_kgDOxxxxxxx',
    category: 'Announcements',
    categoryId: 'DIC_kwDOxxxxxxx',
  },
  // ...
};
```

Switching services only touches `provider` and its required fields — no theme template changes.

# What a thread binds to: identifier

`comments.identifier` decides what a comment thread binds to:

- `path` (default) — binds to the URL path; changing paths "loses" comments
- `url` — binds to the full URL (with domain), good for multi-domain setups
- `title` — binds to the page title; comments follow the title however the URL changes

# Required-field validation: skip, don't ship broken widgets

Missing required fields such as `repoId` / `envId` makes the plugin **warn and skip mounting** instead of injecting a component guaranteed to error; an unknown `provider` lists the supported names. Builds never fail — the log tells you what's missing.

# Stylesheets on demand

Services that ship their own styles (Waline, Gitalk, Artalk) get their CSS injected into `<head>` **only on pages that actually mount the widget** — listing and archive pages stay lean.

# Page-level switch

```yaml
---
comments: false   # no comment section on this page (about / links pages)
---
```

# Theme mounting point

By default the plugin injects the whole section before `</article>`. To choose the position yourself, leave an empty container carrying `data-xfm-comments` in the template — the plugin then only adds the scripts and never builds a second container:

```html
{% if site.comments %}
<section class="post-comments">
  <h2 class="section-title">{{ page.lang == 'en' ? 'Comments' : '评论' }}</h2>
  <!-- Waline looks for #waline, so a custom container needs the id -->
  <div id="waline" data-xfm-comments></div>
</section>
{% endif %}
```

This site (xfmpress-theme-anziyu) mounts it under the post card; the config lives in the `comments` block of `xfm.config.mjs`:

```js
comments: {
  provider: 'waline',
  serverURL: 'https://waline.xfm.qzz.io',   // no trailing slash — a "/" yields //api/... and a 308 redirect
  lang: 'zh-CN',
  login: 'enable',
  requiredMeta: ['nick', 'mail'],
  commentSorting: 'newest',
}
```

::: tip Multilingual sites
`comments.lang` is a site-wide constant, so English pages do not switch the widget's UI by themselves. This site ships a dozen-line local plugin (`plugins/comments-lang.js`) that rewrites `lang` inside `init({...})` to `page.lang` during `transformHtml`; threads still stay separate because they are keyed by path (`/xxx/` vs `/en/xxx/`).
:::

::: tip
Coming from `xfm-plugin-giscus`? No config changes needed — the package was renamed but the `provider: 'giscus'` config key is unchanged; just install `xfm-plugin-comments`.
:::

---

**Next**: [Math and Diagrams](/en/2026/11/21/xfmpress-math-mermaid/) — build-time KaTeX and Mermaid rendering.
