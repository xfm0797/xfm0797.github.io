---
lang: zh-CN
translationKey: xfmpress-v0-4-6
title: xfmpress v0.4.6：六个新插件，统计、评论、PWA、死链检测一次补齐
date: 2026-11-09 14:00:00
description: v0.4.6 新增 analytics、giscus、redirect、pwa、deadlinks、image-size 六个零依赖插件，官方插件从九个扩到十五个，并修复 dev 服务器对插件产物的目录 URL 与 MIME 处理。
category: 更新日志
tags: [xfmpress, 更新日志]
---

v0.4.6 是 0.4.x 系列收官前最大的一次插件扩容：六个新插件全部零依赖，官方插件从九个增至十五个，把站点运营的最后几块拼图——访问统计、评论、URL 迁移、PWA、死链检测、图片尺寸——都补齐了。

## 这一版在解决什么

0.4.2 之后插件体系已经能承载外部生态，但官方插件还缺几样「上线后」才意识到需要的东西：统计代码要自己嵌、评论要自己接、改 URL 会留下一堆死链、想加 PWA 得手写 service worker。v0.4.6 一次把这六件事做成插件。

## 变了什么

### Added：六个新插件

- **`xfm-plugin-analytics`**：统一接入口，支持 Umami、Plausible、Google Analytics、百度统计或原始代码片段。`provider` 接受数组，迁移期间可以同时跑两个统计。
- **`xfm-plugin-giscus`**：基于 GitHub Discussions 的评论（giscus 或 utterances），只出现在文章页。iframe 通过 `postMessage` 跟随主题切换，暗色模式下评论区不会闪白。
- **`xfm-plugin-redirect`**：在每个别名处生成重定向页（front-matter 的 `redirect_from`，或全局 `redirects` 映射）：`meta refresh` + `location.replace` + 可见链接，带 `noindex,follow`，canonical 指向新 URL——改 URL 不再丢流量。
- **`xfm-plugin-pwa`**：生成 `manifest.webmanifest`、service worker（页面 network-first、资源 cache-first，预缓存列表从真实主题资源和 `public/` 构建）、`offline.html`；不带图标时还会用站点标题生成 `icon.svg`。
- **`xfm-plugin-deadlinks`**：构建后把每个内部 `href`/`src` 对照真实输出集合解析，打印指向空处的链接。`strict: true` 会使其变成构建失败，直接接入 CI；外部 URL 永不请求。
- **`xfm-plugin-image-size`**：解析 PNG / JPEG / GIF / WebP / SVG 头部，把 `width`/`height` 写到 `<img>` 上，让浏览器预留空间消除 CLS。本地文件最多只读前 64 KB，不联网、不解码整图。

### Fixed：dev 服务器的两处盲区

- `xfm dev` 此前只在确切文件路径上响应插件产物：重定向页生成在 `old/index.html`，访问 `/old/` 会 404，尽管构建产物完全正确。现在额外文件也能以目录 URL 响应，且 MIME 类型取自真实文件（`/old/` 过去会被当成 `application/octet-stream` 返回）。
- dev 服务器认识 `.webmanifest` 对应的 `application/manifest+json`——Chrome 拒绝安装以 octet-stream 提供的 manifest，这一修对 PWA 本地调试必不可少。

### Changed

README / README_CN 把插件清单按**站点级产物**与**页面增强**分组整理（共十五个包），front-matter 开关表新增 `pwa` / `comments` / `analytics` / `imageSize`。示例站点启用了 `pwa` 和 `deadlinks`，它的每次构建同时是 PWA 演示和死链自检。

## 升级要不要动手

没有破坏性变更，六个新插件均为可选，按需 `npm i -D xfm-plugin-…` 即可。想让 CI 帮你守住死链，推荐给 `deadlinks` 配 `strict: true`；详细配置见[插件教程](/2026/11/21/xfmpress-plugins/)与[部署教程](/2026/11/21/xfmpress-deploy/)。
