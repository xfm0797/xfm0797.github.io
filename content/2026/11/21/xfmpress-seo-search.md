---
title: SEO 与站内搜索：sitemap / RSS / search / related
date: 2026-11-21 10:30:00
description: 用官方插件组合补齐 SEO 与阅读体验——站点地图、全文 RSS、Ctrl+K 搜索、相关文章与 AI 友好输出
category: xfmpress
tags: [xfmpress, 教程]
series: xfmpress使用教程
weight: 10
---

# 一次装齐

```bash
npm i -D xfm-plugin-sitemap xfm-plugin-rss xfm-plugin-search xfm-plugin-seo xfm-plugin-related xfm-plugin-llms
```

装完重启 `xfm dev`。前置条件只有一个：**配置里写好 `site.url`**，否则 sitemap 与 RSS 里的相对链接爬虫不认。

## sitemap：站点地图

```bash
# 产物
dist/sitemap.xml
dist/robots.txt
```

配了 `site.url` 时输出绝对 `<loc>`；自动排除 `noindex: true` 与 front-matter `sitemap: false` 的页面。验证数量：

```bash
grep -c "<loc>" dist/sitemap.xml
```

## rss：全文 RSS

输出 RSS 2.0 的 `feed.xml`，正文全文输出。可配置 `site.rss.limit` 控制条数；单篇不想进 feed 用 front-matter `rss: false`。

## search：Ctrl + K 搜索

生成 `search.json` 索引（可配 `search.path` 与 `search.maxChars` 每篇正文上限）。主题检测到 `site.search` 就会渲染搜索入口——**纯前端筛选、零依赖**，Ctrl / ⌘ + K 呼出面板。单篇排除用 `search: false`。

## seo：结构化元数据

按页注入 canonical、Open Graph、Twitter Card 与 JSON-LD 结构化数据：

```js
export default {
  seo: { image: '/og.png', twitter: '@handle', jsonLd: true },
};
```

不会重复注入模板里已手写的 canonical 与 `og:*`。页面级可用 `seo: false`、`noindex: true`、`image`、`canonical` 控制。

## related：相关文章

渲染前按**标签 3 分 / 分类 2 分 / 系列 3 分**加权算好，写进 `page.data.related`，两套主题发现这个键就渲染推荐区块：

```js
export default {
  related: { limit: 3, minScore: 2 },
};
```

低于 `minScore` 的不推荐；`related: [url, ...]` 可手动指定推荐列表。

## llms：AI 友好输出

按 llmstxt.org 约定生成 `llms.txt` 与 `llms-full.txt`，让 AI 助手能高效读取你的站点内容。可配 `llms.full` 与 `llms.maxItems`。

## 检查清单

```bash
xfm build
grep -c "<loc>" dist/sitemap.xml   # sitemap 数量
head dist/feed.xml                 # RSS 全文
head dist/search.json              # 搜索索引
```

下一篇：[构建与部署](/2026/11/21/xfmpress-deploy/)。
