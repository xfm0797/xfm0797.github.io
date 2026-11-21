---
title: 构建与部署：GitHub Pages、Netlify 与 Nginx
date: 2026-11-21 09:00:00
description: 产物结构、增量缓存原理、GitHub Pages / Netlify / Vercel / Nginx / 对象存储部署与子路径方案、上线检查清单
category: xfmpress
tags: [xfmpress, 教程]
series: xfmpress使用教程
---

# 产物是纯静态文件

`xfm build` 的产物没有 Node 运行时、没有服务端渲染，CDN、对象存储、GitHub Pages 直接接：

```
dist/
├── index.html              # 首页
├── about/index.html        # 页面 = 目录 + index.html
├── 2026/11/21/post/index.html
├── page/2/index.html       # 列表分页
├── tags/Node.js/index.html # 聚合页
├── categories/index.html   # 索引页（主题提供布局时）
├── archives/index.html
├── assets/                 # 主题资源
├── sitemap.xml             # 以下由插件产出
├── feed.xml
└── search.json
```

页面都是目录形式，URL 天然是干净的 `/<path>/`。聚合页、分页页、索引页三类非内容页不进文章列表、RSS 与上下篇链条。

## 增量缓存

缓存放在站点根 `.xfm/cache.json`，每页一条。一页的哈希由六部分拼成：

```
layout | 主题指纹 | 配置指纹 | 源文件原文 | 列表摘要 | 相关文章列表
```

后两项防的是「新增文章后首页还是旧列表」「改标签后推荐位留旧值」这两个经典坑。主题一改全站缓存失效，这是设计使然。CI 里缓存 `.xfm/` 目录能显著提速；`xfm clean` 删 dist 与缓存彻底重来。

## GitHub Pages

**用户根站**（`<user>.github.io`）base 是 `/`；**项目页**是子路径，用环境变量注入：

```js
export default {
  site: {
    base: process.env.SITE_BASE || '/',
    url: process.env.SITE_URL || '',
  },
};
```

workflow 里判断仓库类型分别注入 `SITE_BASE=/repo/` 与 `SITE_URL`。另一种简单做法：构建产物推到一个独立分支（本站就是用 GitHub Actions 把 `dist/` 推到 `gh-page` 分支），Pages 从该分支读取。

## Netlify / Vercel

构建命令 `npx xfm build`，发布目录 `dist`，`site.base` 保持 `'/'`。Netlify 的 `netlify.toml`：

```toml
[build]
  command = "npx xfm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

## Nginx

关键在 `try_files`——页面是目录形式，`/about/` 要能命中 `about/index.html`：

```nginx
location / {
    try_files $uri $uri/ $uri/index.html =404;
}
```

对象存储同理：开启「静态网站托管」并指定索引文档为 `index.html`。

## 子路径部署

`site.base` 设成 `'/blog/'`（前后斜杠必须带），前缀由引擎在渲染出口统一补一次，覆盖模板、Markdown、手写 HTML 三类来源，sitemap / RSS / search.json 也自动带上。`xfm dev` 同样按前缀访问，本地预览就能暴露「线上 404」类问题。

## 上线检查清单

| 检查项 | 方法 |
| --- | --- |
| `site.url` 已配 | 否则 sitemap 是相对 `<loc>` |
| 首页标题正确 | 打开 `/` 看 `<title>` |
| 资源 200 | 开发者工具看 `assets/style.css` |
| sitemap 数量对 | `grep -c "<loc>" dist/sitemap.xml` |
| 草稿不漏 | 构建后搜草稿标题 |
| 死链为零 | 装 deadlinks 插件设 `strict: true` |
| 404 页存在 | 访问一个不存在的地址 |

## 常见问题

- **页面能开样式全丢**：十有八九是 `site.base` 与部署路径不一致
- **子页面刷新 404**：服务器目录索引没配（Nginx `try_files` / 对象存储索引文档）
- **构建慢几乎全在写盘**：Windows / NTFS 的文件系统元数据操作是瓶颈，放 Linux 上构建
- **改了模板产物没变**：`xfm clean` 后重建

—— xfmpress 使用教程系列到此完结，祝你建站愉快。
