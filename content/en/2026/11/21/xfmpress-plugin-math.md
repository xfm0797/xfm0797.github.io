---
lang: en
translationKey: xfmpress-plugin-math
title: "math plugin: build-time KaTeX rendering with zero client-side JS"
date: 2026-11-21 14:18:00
description: Renders LaTeX math to HTML with KaTeX at build time, so pages ship plain HTML plus self-hosted CSS with no client-side JavaScript and no CDN requests
category: plugins
tags: [xfmpress, plugin]
---

Math is hard to avoid in technical writing. `xfm-plugin-math` is the official xfmpress math plugin, and it renders LaTeX with KaTeX **at build time**. Published pages contain plain HTML plus a self-hosted stylesheet — no client-side rendering script, no flash of unrendered LaTeX, no CDN request. That is the deliberate split with the sibling [mermaid plugin](/en/2026/11/21/xfmpress-plugin-mermaid/): formulas are solved at build time, diagrams are left to the browser.

## What it solves

Browser-side solutions like MathJax render formulas after first paint, so readers see raw LaTeX for a moment; a CDN dependency means an extra third-party request and failure point. This plugin moves rendering into the build, so the page ships in its final form, with styles and fonts self-hosted inside your site output.

## Install and configure

```bash
npm i -D xfm-plugin-math
```

That is all — the generator auto-loads every `xfm-plugin-*` dependency in your site's `package.json`. Explicit configuration also works in your [config file](/en/2026/11/21/xfmpress-config/):

```js
// xfm.config.mjs
export default {
  plugins: ['math'],
  math: {
    css: 'local',         // 'local' copy into output | 'cdn' | 'none' (bring your own)
    path: 'assets/katex', // output directory when css: 'local'
    fonts: 'woff2',       // 'woff2' (~300 KB) | 'all' (woff2 + woff + ttf)
    macros: {},           // e.g. { '\\RR': '\\mathbb{R}' }
    output: 'html',       // 'html' | 'htmlAndMathml' (better for screen readers, larger HTML)
    strict: false,
    errorColor: '#cc0000',
  },
};
```

KaTeX covers nearly every everyday LaTeX command — fractions, roots, sums and integrals, matrices, aligned environments, Greek letters, `\text{...}` with CJK text.

## Output and usage

Three syntaxes, matching mainstream Markdown editors:

```markdown
Inline: $a^2 + b^2 = c^2$ sits mid-sentence.

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$

LaTeX habits also work: \(x^2\) and \[x^2\]
```

Display math becomes centered KaTeX HTML, and the stylesheet is injected **only on pages that actually contain math** (and skipped if the page already links a katex stylesheet). With the default `css: 'local'`, the build copies `katex.min.css` plus woff2 fonts into `assets/katex/`; the woff/ttf fallback `url()` entries are stripped from the CSS so the output never references files that do not exist.

## Details worth knowing

**Why `$a_1$` stays intact**: the underscore in Markdown means emphasis. Before Markdown runs, the plugin swaps every formula for a private-use-area placeholder that carries the TeX source (base64url-encoded), so the Markdown engine never sees the `_` inside `$...$`; after the page is rendered, placeholders are replaced with KaTeX HTML. No state needs to survive between the two phases — that is why it beats post-hoc regex patching.

**Boundaries**: `$` inside fenced, inline, and indented code blocks is left alone, and `\$` prints a literal dollar sign, so prices like `$5 and $10` survive. Inline math additionally requires no line breaks, no whitespace right after the opening `$`, and no digit right after the closing one, so bare prices are never mistaken for formulas.

**Build behavior**: because the plugin registers a `markdown` hook, production builds render on the main thread instead of the worker pool. In practice a 1000-page site stays well under a second of extra render time.

A broken formula never fails the build — KaTeX errors keep a readable snippet in the configured error color so you can spot them before publishing. See the [plugin overview](/en/2026/11/21/xfmpress-plugins/) for the rest of the ecosystem.
