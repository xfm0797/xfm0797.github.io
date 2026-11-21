---
lang: zh-CN
translationKey: xfmpress-plugin-rss
title: RSS 插件：一个依赖生成全文订阅源 feed.xml
date: 2026-11-21 14:39:00
description: 安装即生效的 RSS 2.0 输出：content:encoded 打包全文、标签进 category、链接全绝对化，多语言站默认只收默认语言的流，limit 可调收录条数
category: 官方插件
tags: [xfmpress, 插件]
---

订阅是博客最老也最可靠的分发渠道。`xfm-plugin-rss` 在构建末尾扫描全部文档，产出一份标准 RSS 2.0 的 `feed.xml`，正文全文打包，读者在阅读器里不用点开链接就能读完整篇。

## 它解决什么

不少生成器的订阅源只输出摘要，阅读器里永远差最后一跳。这个插件把每篇的完整 HTML 放进 `content:encoded`（CDATA 包裹），同时保留 `description` 与标签（转为 `<category>`）；所有链接由 `site.url` 与 `site.base` 拼成绝对地址，子路径部署也不会出现相对链接。频道级的标题、描述、语言直接取自 `site` 配置。

## 安装与配置

```bash
npm i -D xfm-plugin-rss
```

装了即生效——生成器自动发现 `package.json` 里所有 `xfm-plugin-*` 依赖（也可在 `plugins` 里写短名 `'rss'` 固定顺序）。唯一可调项是收录条数：

```js
// xfm.config.mjs
export default {
  site: {
    url: 'https://example.com',  // 没配则退回带 base 的相对路径
    rss: { limit: 20 },          // 默认 20
  },
};
```

要上阅读器就务必配 `site.url`，见[部署](/2026/11/21/xfmpress-deploy/)。

## 产物与字段

输出一个文件 `feed.xml`，channel 节点带站点标题、链接、描述、语言（`site.lang`，默认 `zh-CN`）、`lastBuildDate` 和指向自身的 `atom:link`。每个 item 包含：

- `title`、`link`、`guid`（permalink）
- `pubDate`（UTC 格式）
- `description`：front-matter 的 `description`，没有则用摘要
- `category`：文章标签
- `content:encoded`：正文全文 HTML

收录规则：有 `date`、不是 `type: page`、front-matter 没写 `rss: false`、URL 不是首页。0.4.17 之后还按 `inStream` 过滤——多语言站的翻译版本（`inStream: false`）不会混进默认语言的订阅源。

## 注意事项

- 本站（xfmpress 官网）就启用了这个插件，`feed.xml` 只收录中文默认流，英文页面不在其中。
- 想单独排除某篇文章，front-matter 写 `rss: false`。
- 插件在启动时解析，装完要重启 `xfm dev`。
