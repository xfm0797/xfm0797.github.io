---
lang: en
translationKey: xfmpress-install
title: What is xfmpress: Installation & Upgrades
date: 2026-11-21 10:40:00
description: Meet xfmpress — a zero-dependency static site generator for Node.js, with three ways to install and how to upgrade
category: xfmpress
tags: [xfmpress, tutorial]
series: xfmpress guide
---

# What is xfmpress

xfmpress is a **zero-dependency** static site generator (SSG). The npm package is `xfmpress` and the CLI command is `xfm`. It compiles Markdown into pure static HTML that you can host on GitHub Pages, Netlify, Vercel, Nginx, or any object storage.

Key highlights:

- **Zero runtime dependencies**: `npm install` pulls in exactly 1 package — no dependency tree.
- **Fast**: multithreaded rendering + incremental builds. A 1000-page Chinese docs site cold-builds in ~5–6.5s, rebuilds in ~2.8s, and dev hot-rebuilds a single page in 2–7ms.
- **Easy migration**: the template syntax is close to Nunjucks / Liquid, so Hexo theme authors can move over almost painlessly; the `scaffolds/` directory mirrors Hexo's.
- **Plug-and-play**: the core ships no plugins — 15 official plugins install on demand with `npm i -D xfm-plugin-xxx`.

## Prerequisites

- Node.js ≥ 18 (22 LTS recommended)
- Git (needed for deployment)

## Three ways to install

### Option 1: Global install (recommended)

```bash
npm i -g xfmpress
xfm --version
```

After installing, the `xfm` command is available everywhere. On Linux / macOS, if you hit an EACCES permission error, manage Node with nvm and reinstall instead of using sudo.

### Option 2: Try without installing

```bash
npx xfmpress --help
```

Nothing touches your global environment — perfect for a quick feel of the CLI.

### Option 3: Install inside a project

```bash
cd my-site
npm i -D xfmpress
npx xfm dev
```

Best for sites that need a locked version and CI builds (this site uses exactly this setup).

## Upgrading

```bash
npm update -g xfmpress    # global
npm update xfmpress       # project-local
```

After upgrading, run `xfm info` to confirm the config loads, then `xfm clean && xfm build` for a fresh build. Version history lives in the "Releases" section of the official docs.

## Verify the install

```bash
xfm info
```

It prints the config file in use, plus the active theme and plugins. Seeing that output means the install succeeded.

Next: [Quick Start: Create Your First xfmpress Site in 30 Seconds](/en/2026/11/21/xfmpress-quick-start/).
