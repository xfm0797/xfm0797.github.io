---
lang: zh-CN
translationKey: xfmpress-plugin-feed-json
title: feed-json 插件：JSON Feed 1.1 格式的 feed.json
date: 2026-11-21 14:09:00
description: 与 rss 插件互补的 JSON 订阅源：content_html 全文、发布与修改时间、标签与作者齐备，前端 fetch 一行即得，rss: false 一个开关同时管住两个 feed
category: 官方插件
tags: [xfmpress, 插件]
---

JSON Feed 1.1 用一份普通 JSON 描述订阅源，不需要解析 XML。`xfm-plugin-feed-json` 在构建末尾产出 `feed.json`，与内置的 [rss 插件](/2026/11/21/xfmpress-plugin-rss/)互补：阅读器、自动化脚本和浏览器端代码都能直接消费。

## 它解决什么

XML 是给阅读器的历史包袱，程序消费订阅源时还得引入解析器。有了 `feed.json`，前端一行 `fetch('/feed.json').then(r => r.json())` 就能拿到全部文章数据——做「最新文章」侧栏、构建自动化通知、甚至给 AI 管道喂数据，都比 XML 直接。

## 安装与配置

```bash
npm i -D xfm-plugin-feed-json
```

装了即生效。两个可调项：

```js
// xfm.config.mjs
export default {
  feedJson: {
    path: 'feed.json',  // 输出路径
    limit: 20,          // 收录条数，默认 20
  },
};
```

## 产物与字段

输出一个文件 `feed.json`（2 空格缩进、末尾带换行的合法 JSON）。顶层字段：`version`（JSON Feed 1.1）、`title`、`home_page_url`、`feed_url`、`description`、`language`（取 `site.lang`，默认 `zh-CN`），配了 `site.author` 时还有 `authors`。每个 item 包含：

- `id` 与 `url`：页面绝对地址
- `title`、`content_html`（正文全文 HTML）、`summary`（front-matter `description` 或摘要）
- `date_published` 与 `date_modified`（取 `updated || date`，纯日期补成当天 00:00:00 UTC）
- `tags` 与 `authors`（有才输出）

收录规则与 rss 插件一致：有 `date`、不是 `type: page`、front-matter 没写 `rss: false`、URL 不是首页。0.4.17 之后同样按 `inStream` 过滤——多语言站的翻译版本不进默认语言的流，因此 `rss: false` 这一个开关同时管住 XML 与 JSON 两份订阅源。

## 注意事项

- 与 rss 插件互不依赖，但订阅源通常成对提供：XML 给阅读器，JSON 给程序。
- `content_html` 是完整正文，整份 feed 体积与文章篇幅成正比，站大可用 `limit` 控制。
- 想单独排除某篇文章，front-matter 写 `rss: false` 即可。
