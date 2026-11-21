---
lang: en
translationKey: xfmpress-plugin-share
title: "Share plugin: twelve forwarding targets per post, zero third-party scripts"
date: 2026-11-21 15:30:00
description: Weibo, WeChat, QQ, X, Telegram, email, copy-link and more — plain links plus a local clipboard, no SDKs, labels follow the page language
category: plugins
tags: [xfmpress, plugin]
---

When a reader wants to pass an article along, the blocker is rarely willingness — it is finding the button. `xfm-plugin-share` adds a share row at the end of every post, with twelve available networks, all built on native share URLs: no SDK, no tracking script, and not even the copy button touches a third-party service.

## What it solves

- A share button is the cheapest distribution you will ever get, yet most static sites ship without one
- No AddThis/Jiathis-style aggregator means no external script, no privacy question, and nothing that breaks when a vendor shuts down
- Every button is an ordinary `<a>` link; channels that cannot be shared directly (WeChat) fall back to copying the link with a hint, so no QR-code service is required

## Supported networks

| Network | Label | Note |
| --- | --- | --- |
| `weibo` | 微博 | Weibo share endpoint |
| `wechat` | 微信 | copies the link, then hints at pasting it in WeChat |
| `qq` / `qzone` | QQ 好友 / QQ 空间 | QQ friend and Qzone endpoints |
| `twitter` | X | Twitter/X intent, alias `x` |
| `facebook` / `linkedin` | — | sharer / share-offsite |
| `telegram` | Telegram | t.me share |
| `whatsapp` / `reddit` | — | official share endpoints |
| `email` | 邮件 | `mailto:` link, alias `mail` |
| `copy` | 复制链接 | Clipboard API with an `execCommand` fallback and a two-second toast |

## Install and configure

```bash
npm i -D xfm-plugin-share
```

The generator auto-loads every `xfm-plugin-*` dependency in your `package.json`; restart `xfm dev` if it is running.

```js
// xfm.config.mjs
export default {
  share: {
    // render order follows the array; defaults to the first six
    networks: ['weibo', 'wechat', 'qq', 'qzone', 'twitter', 'telegram', 'copy'],
    title: '分享到', // text before the buttons; '' hides it
    dev: false,     // also render under `xfm dev` (production only by default)
  },
};
```

None of this is required — six networks are wired up by default. What *is* required is `site.url`: share links must be absolute, otherwise the plugin emits relative URLs and warns once per build.

## Where it mounts

Posts only: pages that carry a `date` and are not `type: page`. Home, archives, taxonomy pages and standalone pages are skipped. To suppress the bar on a single post, set `share: false` in its front-matter.

Styling is a few lines of inline CSS injected into the `<head>` of pages that mount a bar. It reads `--border` and `--muted` from the theme, so a theme that names its borders `--line` only needs an alias — `--border: var(--line)` — to blend in.

## How the copy buttons work

`copy` and `wechat` do not navigate. They carry the full URL in `data-share-url`; on click the script tries `navigator.clipboard` first, falls back to `document.execCommand('copy')`, then shows a toast that disappears after two seconds (message in `data-share-msg`). No network request at any point, so it works offline.

## Taking over in the template

Placing `<div data-xfm-share></div>` in a template tells the plugin to inject only the CSS and script and skip the automatic bar, leaving rendering to the theme — useful when the share row belongs in a sticky sidebar or a floating pill rather than at the end of the article.

This site takes the simpler route: the plugin mounts the bar itself, and a small local plugin, `plugins/share-lang.js`, moves it from just before `</article>` to the end of the article body, then rewrites the labels according to `page.lang`. The labels are site-level constants; without that step an English page would show 微博 and 复制链接.

## Caveats

- WeChat has no web share endpoint, so copying the link is the ceiling — that is a platform limit, not a shortcut. QR sharing needs a third-party service
- Share counts and click tracking are out of scope; pair it with the `analytics` plugin if you need events
- More networks is not better. For a bilingual site, pick five to seven that match your actual readers; twelve buttons dilute clicks

For how plugins load and how the config file is structured, see the [plugin system overview](/en/2026/11/21/xfmpress-plugins/) and the [configuration guide](/en/2026/11/21/xfmpress-config/).
