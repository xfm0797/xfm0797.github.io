---
lang: zh-CN
translationKey: xfmpress-plugin-search
title: 站内搜索插件：构建期生成索引，Ctrl/⌘+K 全站检索
date: 2026-11-21 23:05:00
description: 构建期把全站压缩成一份 search.json，纯前端筛选，没有服务端、不引入依赖；主题自带 Ctrl/⌘+K 搜索面板
category: 官方插件
tags: [xfmpress, 插件]
---

静态站的搜索通常卡在两件事上：要么接一个外部搜索服务，要么自己写服务端。`xfm-plugin-search` 走第三条路——构建期把全部页面压成一份 `search.json`，浏览器打开面板时按需拉取、纯前端筛选。没有服务端，没有第三方依赖，搜索能力跟着构建产物走。

## 它解决什么

- 零依赖、零服务：索引是构建产物的一部分，GitHub Pages 这类纯静态托管照样能用
- 构建期生成，访客首次打开面板才下载 `search.json`，不影响首屏
- 索引里存了标题、摘要、标签、分类和正文前若干字符，站内全文检索开箱即用

## 安装与配置

```bash
npm i -D xfm-plugin-search
```

装完即生效——生成器会自动加载 `package.json` 里所有 `xfm-plugin-*` 依赖（若 `xfm dev` 正在运行，需重启）。也可以显式声明：

```js
// xfm.config.mjs
export default {
  plugins: ['search'],
  search: {
    path: 'search.json',  // 索引文件路径
    maxChars: 1500,       // 每页收录的正文长度，默认 1500
    hint: '',             // 搜索框占位文案
  },
};
```

三个配置项都有合理默认，不配也能直接用。

## 产物与行为

构建结束后插件写出一份 `search.json`，内容是 `{ version, generated, count, items }`，每条 item 包含页面地址、标题、描述、标签、分类、日期和正文摘录。同时它会往模板上下文注入 `site.search`，主题据此决定是否渲染搜索入口、索引在哪个地址。

本站就装着它：装好之后主题导航栏出现搜索按钮，按 `Ctrl/⌘+K`（macOS 下 `⌘+K`）打开面板即可检索全站。索引只收内容页——首页、标签/分类等聚合页、分页页都不会进索引。

## 注意事项

- 某个页面不想被搜到，在它的 front-matter 写 `search: false` 即可退出索引。本站的 404 页就是这么处理的
- `maxChars` 决定索引体积：文章长、站点大时可以调小摘录长度，换取更小的 `search.json`
- 索引地址可通过 `path` 调整，改动后主题会通过 `site.search` 拿到新地址，不需要改模板

搜索引擎收录是 `seo` 插件的事，这个插件只负责「访客在你的站里找内容」这一段。如果你还没装任何插件，建议从[插件系统总览](/2026/11/21/xfmpress-plugins/)读起，配置文件的写法见[配置指南](/2026/11/21/xfmpress-config/)。
