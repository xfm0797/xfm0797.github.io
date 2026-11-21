---
lang: zh-CN
translationKey: xfmpress-v0-4-1
title: xfmpress v0.4.1：SEO、相关文章与 llms.txt，五个新插件一次到位
date: 2026-11-09 09:00:00
description: v0.4.1 一次带来五个零依赖内置插件——seo、related、llms、feed-json、minify，并新增 afterCollect 钩子让插件能做跨页计算，同时修复了 dev 模式下插件产物 404 的问题。
category: 更新日志
tags: [xfmpress, 更新日志]
---

v0.4.1 是插件体系的一次大扩容：seo、related、llms、feed-json、minify 五个新插件全部零依赖，覆盖了静态站点最常见的「运营层」需求。配套的 `afterCollect` 钩子也让插件第一次能在渲染前做跨页面计算。

## 这一版在解决什么

0.4.0 之前的 xfmpress 解决的是「把站点建出来」，但建出来之后呢？搜索引擎需要 canonical 和 Open Graph，读者需要相关文章推荐，AI 爬虫需要 llms.txt，订阅者需要 JSON Feed，生产环境还想要干净的 HTML。这一版把这五件事都变成了开箱即用的插件。

## 变了什么

### Added：五个新插件与 afterCollect 钩子

- **`seo`**：逐页生成 canonical、Open Graph、Twitter Card 和 JSON-LD（文章页用 Article，首页用 WebSite + SearchAction）。如果你在模板里手写了 `canonical` / `og:title`，插件会尊重而不覆盖；front-matter 可以设置 `image`、`canonical`、`noindex`，或用 `seo: false` 整页跳过。
- **`related`**：渲染前按共享标签（3 分）、分类（2 分）、系列（3 分）给每篇文章打分，结果以 `page.data.related` 暴露给模板。`related.limit` / `related.minScore` 可调；front-matter 可以传显式列表，或用 `related: false` 退出。两套主题都会在开启时渲染相关文章区块。
- **`llms`**：按 llmstxt.org 约定输出 `llms.txt` 和 `llms-full.txt`（分组文章索引 + 可选全文，`llms.full: false` 关闭全文）。
- **`feed-json`**：在现有 RSS 旁边输出 JSON Feed 1.1。
- **`minify`**：仅生产构建启用的 HTML 压缩，处理注释、行尾空白、空行和缩进，但完全不动 `<pre>` / `<code>` / `<textarea>` / `<script>` / `<style>` 的内容；`minify.aggressive` 还会折叠标签间换行。

架构层面，新增了 `afterCollect` 插件钩子：它在所有页面（含分类、索引、分页页）收集完毕、渲染开始之前运行一次，插件可以借它把跨页面数据写进 `page.data`——`related` 正是靠它实现的。脚手架生成的新站点也默认启用 `sitemap`、`rss`、`feed-json`、`search`、`seo`、`related`、`llms`、`minify` 这套现代组合。

### Changed：性能不再为插件让路

以前 `transformHtml` 类插件会关掉 worker 池，大站点跑起来明显变慢。现在 worker 池照常处理 Markdown 和模板渲染，钩子只在主线程逐页收尾，`seo` / `minify` 不再牺牲并行度。相关文章的 URL 也被折进页面哈希：某篇文章的邻居变了，增量缓存会重渲染它，而不是展示过期列表。

### Fixed：dev 下插件产物 404

`xfm dev` 现在直接从内存服务插件产物（`search.json`、`sitemap.xml`、`feed.xml`、`feed.json`、`llms.txt` 等）。此前 `afterBuild` 在 dev 模式下根本不运行，本地预览时搜索面板会 404。另外 `minify` 会先把 CRLF 归一化再折叠空白，并丢弃纯空白行，避免模板与 Markdown 混合换行符导致的输出问题。

## 升级要不要动手

没有破坏性变更，升级后旧插件配置原样可用。新插件全部是可选的：想加强 SEO 就加 `seo`，想要相关文章就加 `related`，都只是往 `plugins` 数组里加一个名字。配置细节可参考[站点配置](/2026/11/21/xfmpress-config/)教程。
