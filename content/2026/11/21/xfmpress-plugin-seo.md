---
lang: zh-CN
translationKey: xfmpress-plugin-seo
title: SEO 插件：canonical、Open Graph、Twitter Card 与 JSON-LD
date: 2026-11-21 22:30:00
description: 按页面类型注入爬虫与社交平台需要的 head 标记：文章得 Article 结构化数据，首页得 WebSite 与 SearchAction，多语言站自动补 hreflang，手写标签永不重复
category: 官方插件
tags: [xfmpress, 插件]
---

搜索引擎的收录与社交平台的分享卡片都依赖 `<head>` 里的元信息。`xfm-plugin-seo` 在每个页面渲染后注入 canonical、Open Graph、Twitter Card 与 JSON-LD，并且尊重模板里手写的标签——已有的部分绝不重复注入。

## 它解决什么

这些标记手写繁琐、页面间还要变化：文章要有发布与修改时间、标签与作者，首页要有站点级结构化数据。插件按页面类型自动区分——文章得到 `og:type: article` 与 `Article` 结构化数据，首页得到 `WebSite`；站点配置了搜索时，首页还会附上 `SearchAction`。

## 安装与配置

```bash
npm i -D xfm-plugin-seo
```

```js
// xfm.config.mjs
export default {
  seo: {
    image: '/og.png',    // 默认分享图（相对路径自动拼绝对地址）
    twitter: '@handle',  // 输出 twitter:site
    jsonLd: true,        // 设为 false 可整体关闭 JSON-LD
  },
};
```

## 产物与字段

插件不生成文件，只在每个页面 `</head>` 前插入一段标记：

- `<link rel="canonical">`：默认取页面绝对地址，front-matter 的 `canonical` 可覆盖；
- Open Graph：`og:title/description/url/site_name/locale`，文章另有 `article:published_time`、`article:modified_time` 与每条标签一个 `article:tag`；页面 `image` 或配置的默认图转为 `og:image`；
- Twitter Card：有图用 `summary_large_image`，没图退回 `summary`，配了 `twitter` 再加 `twitter:site`；
- JSON-LD：文章是 `Article`（含 `author`、`publisher`、`keywords`，作者取 `site.author`），首页是 `WebSite`。

多语言站会在页面存在翻译版本时自动注入 `hreflang` 与 `og:locale:alternate`，`x-default` 指向默认语言；单语站完全不输出，产物零变化。description 的回退顺序是：front-matter `description` → 摘要前 160 字 → `site.description`。

页面级开关：`image` 覆盖分享图、`canonical` 覆盖规范地址、`noindex: true` 输出 `noindex, follow`、`seo: false` 整页跳过本插件。

## 注意事项

- 模板里已手写 `rel="canonical"` 或 `og:title` 时，对应部分不再注入，主题可以自行接管。
- 日期只写到天时按当天 00:00:00 UTC 输出，避免不同运行环境解析出前一天。
- 配合 [sitemap 插件](/2026/11/21/xfmpress-plugin-sitemap/)可一并解决抓取入口问题，背景见[SEO 与站内搜索](/2026/11/21/xfmpress-seo-search/)。
