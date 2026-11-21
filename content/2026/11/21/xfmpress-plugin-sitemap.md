---
lang: zh-CN
translationKey: xfmpress-plugin-sitemap
title: Sitemap 插件：sitemap.xml 与 robots.txt 一次生成
date: 2026-11-21 22:25:00
description: 零配置遍历全部文档生成 sitemap.xml，updated 字段转 lastmod、weight 可调 priority，robots.txt 自动指向站点地图，sitemap: false 逐页排除
category: 官方插件
tags: [xfmpress, 插件]
---

sitemap.xml 与 robots.txt 是搜索引擎抓取一个站点的两份入口文件。`xfm-plugin-sitemap` 在每次构建末尾遍历全部文档，同时产出这两份文件，没有任何插件级配置。

## 它解决什么

手写 sitemap 很容易漏页、过期。插件直接以 `site.documents` 为准生成，页面集合与实际产物永远一致；URL 由 `site.url` 与 `site.base` 拼成绝对地址，子路径部署自动正确。配套的 robots.txt 会在配了 `site.url` 后自动追加一行指向站点地图的 `Sitemap:`，两个文件不需要分开维护。

## 安装与配置

```bash
npm i -D xfm-plugin-sitemap
```

装了即生效，插件本身没有可调项，需要的只是站点基础信息（见[配置](/2026/11/21/xfmpress-config/)）：

```js
// xfm.config.mjs
export default {
  site: {
    url: 'https://xfm0797.github.io',
    base: '',  // 子路径部署时写 '/blog' 之类
  },
};
```

## 产物与字段

输出两个文件：

- `sitemap.xml`：每个 `<url>` 含 `<loc>` 绝对地址；页面 front-matter 有 `updated`（或 `date`）时输出 `<lastmod>`；页面写了 `weight` 时计算 `<priority>`（公式为 `1 - weight/100`，限制在 0.1–1 之间，保留一位小数）。
- `robots.txt`：`User-agent: *` 加 `Allow: /`，配了 `site.url` 时再追加 `Sitemap: <绝对地址>`。

front-matter 写 `sitemap: false` 可把某一页排除——关于页、标签聚合页这类不希望单独被抓取的页面常用。

## 注意事项

- `lastmod` 取 `updated || date`，两处都没写日期的页面不会输出 `lastmod`。
- `sitemap: false` 只是不进站点地图，不等于不被索引；需要 `noindex` 请配合 [seo 插件](/2026/11/21/xfmpress-plugin-seo/)或主题里写 meta。
- 本站就启用了 sitemap，`sitemap.xml` 与 `robots.txt` 随每次构建同步更新，见[SEO 与站内搜索](/2026/11/21/xfmpress-seo-search/)。
