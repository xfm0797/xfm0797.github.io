---
lang: en
translationKey: xfmpress-plugin-minify
title: "minify plugin: production-only HTML minification that skips code blocks"
date: 2026-11-21 14:24:00
description: Strips HTML comments, trailing whitespace and indentation from built pages in production builds only, leaving pre, code, textarea, script and style untouched
category: plugins
tags: [xfmpress, plugin]
---

Static site HTML carries a lot of dead weight: indentation, blank lines, and template comments that mean nothing to the browser but still cost bytes on the wire. `xfm-plugin-minify` is the official xfmpress HTML minifier, and it cleans that up during **production builds** while carefully avoiding everything it should not touch. Like the [SEO plugin](/en/2026/11/21/xfmpress-seo-search/), it is a set-and-forget plugin that quietly improves every page.

## What it solves

The biggest risk in minification is collateral damage: one wrong space collapses inline-element spacing, and one touched `<pre>` mangles a code listing. This plugin first stashes every protected block, minifies the rest, then puts the stashes back — so it only removes whitespace that is provably safe to remove.

## Install and configure

```bash
npm i -D xfm-plugin-minify
```

That is all, or declare it explicitly in your [config file](/en/2026/11/21/xfmpress-config/):

```js
// xfm.config.mjs
export default {
  plugins: ['minify'],
  minify: {
    enabled: true,     // on by default; set false to disable entirely
    aggressive: false, // true also folds newlines between tags
  },
};
```

## Output and behavior

In its default mode the plugin does four things:

- Strips HTML comments, but keeps `<!--[if ...]>` conditional comments
- Strips trailing whitespace and whitespace-only lines
- Strips leading indentation (newlines are kept, so rendering is unchanged)
- Collapses runs of blank lines

**The protected list**: `<pre>`, `<code>`, `<textarea>`, `<script>`, and `<style>` are skipped wholesale — code indentation, script line breaks, and CSS formatting all survive byte for byte.

**Why the default mode is conservative**: it only folds whitespace *across* lines and never touches single spaces within a line. The space between `<a>甲</a> <b>乙</b>` is meaningful inline spacing; removing it would glue the words together, so the default mode leaves it alone.

**Dev builds are never minified**: under `xfm dev` the HTML stays readable for hot-reloading and debugging. Minification only happens in `xfm build`.

## Details worth knowing

`aggressive: true` additionally folds newlines between tags (`>\n<` becomes `><`) for a smaller output, but it can affect inline layouts that rely on that spacing. If you are not sure whether your theme depends on it, keep the default `false` and compare pages in browser devtools first. You do not need to worry about ordering with other plugins: minification runs on the final HTML, so KaTeX fragments produced by the [math plugin](/en/2026/11/21/xfmpress-plugin-math/) are equally safe. For the rest of the ecosystem, see the [plugin overview](/en/2026/11/21/xfmpress-plugins/).
