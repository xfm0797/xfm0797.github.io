---
lang: en
translationKey: xfmpress-v0-4-2
title: "xfmpress v0.4.2: Plugins Split Out of the Core — Install What You Use (Breaking)"
date: 2026-11-09 10:00:00
description: v0.4.2 is the only breaking release of the series: nine plugins leave the core and become independent npm packages with Hexo-style auto-discovery, and a missing plugin now fails the build with the exact install command.
category: changelog
tags: [xfmpress, changelog]
---

v0.4.2 is the only release in the 0.4.x series with breaking changes — and the trade is worth it. Plugins are now fully decoupled from the core: independent npm packages, installed on demand, published separately. Read the upgrade notes carefully before updating.

## What this release solves

Previously all nine plugins lived inside the core's `lib/plugins/`. You carried them whether you used them or not, customizing meant touching core code, and there was no boundary between "kernel" and "plugin" — which meant no third-party ecosystem was possible. v0.4.2 draws that line: the core renders; everything else is a package.

## What changed

### Breaking: plugins are no longer bundled

`lib/plugins/` is gone. The nine plugins (`xfm-plugin-sitemap`, `-rss`, `-feed-json`, `-search`, `-seo`, `-related`, `-llms`, `-minify`, `-reading-stats`) now live in the repository's `packages/` directory and are published as independent npm packages. Two concrete behavior changes:

- A site that used to write `plugins: ['rss']` must now run `npm i -D xfm-plugin-rss`. The upside: a missing plugin no longer silently falls back to a bundled copy — the build fails with the **exact `npm i` command** to fix it.
- `xfm create` writes a `package.json` with **no** `plugins` entry: new sites start with zero plugins and add what they need. The `xfm:<name>` prefix and the `lib/plugins/<name>.js` fallback were removed along the way.

### Added: Hexo-style discovery and site.helpers

- Every `xfm-plugin-*` (or `@scope/xfm-plugin-*`) dependency in your site's `package.json` is **loaded automatically** — no config change required. Short names in `plugins: ['rss']` resolve to `xfm-plugin-rss`.
- Resolution order is explicit: site-local file (`./plugins/x.js`) → site `node_modules` → the CLI's own `node_modules`, so globally installed plugins work too.
- New `site.helpers` — a frozen, public helper set (`absoluteUrl`, `withBase`, `normalizeBase`, `applyBase`, `plainText`, `markdownPlain`, `escapeHtml`). Plugin packages no longer reach into `xfm/lib/...` internals, so they work regardless of how the CLI was installed.
- `xfm info` lists declared and auto-discovered plugins side by side.
- Four new tests (107 → 111) cover auto-discovery, duplicate registration, the missing-plugin error, and the architectural guarantee that the core depends on no plugin package.

### Changed / Fixed

The repository is now an npm workspace (`packages/*`); `npm publish --workspaces` releases the whole plugin set, each with its own README. README and README_CN gained a complete Plugins chapter: install commands, a table of all nine official plugins (package, output, options), per-page front-matter switches, and a plugin-authoring example built on `site.helpers`. One docs fix too: the deployment note still mentioned `scripts/pages-base.js`, which was removed back in 0.4.0.

## Should you change anything on upgrade?

Yes — one thing: make sure every plugin your site uses is installed as a devDependency, e.g. `npm i -D xfm-plugin-rss`. Short-name config entries stay unchanged. Getting it wrong is safe: the build fails and tells you exactly what to install. After upgrading, `xfm info` (covered in the [CLI guide](/en/2026/11/21/xfmpress-cli/)) is the quickest way to verify what loaded.
