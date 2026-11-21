---
title: 配置详解：xfm.config.mjs 所有字段
date: 2026-11-21 09:30:00
description: 配置文件查找顺序、site 字段默认值、构建行为、分页与索引页、环境变量注入
category: xfmpress
tags: [xfmpress, 教程]
series: xfmpress使用教程
weight: 4
---

# 配置文件

配置就是一个普通 JS 对象，导出即生效。**所有字段都有默认值**，一个空的 `xfm.config.mjs` 也能构建出站点。

## 查找顺序

按顺序找，命中第一个就停：

1. `xfm.config.mjs` —— 推荐，ESM，支持 `process.env`
2. `xfm.config.js` —— 视 `package.json` 的 `type` 决定模块格式
3. `xfm.config.cjs` —— 强制 CommonJS
4. `xfm.config.json` —— 纯数据
5. `config.js` —— 早期版本兼容
6. `package.json` 的 `xfm` 字段

拿不准就跑 `xfm info`，它会直接告诉你最终读的是哪个文件。

## 合并规则

用户配置与默认值**深合并**，只写关心的字段即可：

- 对象逐键递归合并；
- **数组是整体替换**——写 `nav` 就得写全量；
- 值为 `undefined` 的键被忽略。

## site 字段

```js
export default {
  site: {
    title: 'XFMpress',            // 站点名，进 <title>、页脚、品牌位
    description: '站点描述',       // 列表页与 meta 的兜底
    url: 'https://xfm0797.github.io', // sitemap / RSS 输出绝对链接必须配
    lang: 'zh-CN',                // <html lang>
    author: 'xfm',                // 供插件与主题使用
    base: '/',                    // 子路径部署，如 '/blog/'
    assets: '/assets/',           // 主题资源前缀
    nav: [                        // 导航（数组整体替换）
      { title: '首页', url: '/' },
      { title: '归档', url: '/archives/' },
    ],
  },
};
```

`site` 下没列出的键也会原样进入模板上下文，比如 `site.copyright` 可以直接在模板里用。

## 构建行为

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `buildDrafts` | `false` | 生产构建是否包含草稿 |
| `workerThreshold` | `40` | 页面数达到该值才启用 worker 池 |
| `workers` | `0` | 并发数，0 表示自动按任务量标定 |
| `markdown.highlight` | `true` | 代码块语法高亮 |

## 分页与索引页

```js
pagination: { enabled: true, perPage: 9, url: '/page/' },
indexes: {
  categories: { enabled: true, url: '/categories/' },  // 分类索引页
  archives: { enabled: true, url: '/archives/' },      // 按年归档页
},
```

分页是**真实静态页**（`/page/2/`），每页有自己的 HTML 与标题，对 SEO 友好。索引页的前提是主题提供了对应布局——缺布局时静默不生成，不报错。

## 目录与主题

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `contentDir` | `'content'` | Markdown 源目录 |
| `outDir` | `'dist'` | 产物目录 |
| `publicDir` | `'public'` | 原样拷贝的静态目录 |
| `theme` | `'themes/default'` | `'default'` / `'docs'` / 主题路径 |
| `defaults.layout` | `'page.html'` | 无 layout 字段时的兜底 |

## 环境变量与多环境

配置文件是 ESM，可以读环境变量，这是 CI 里的标准做法：

```js
export default {
  site: {
    base: process.env.SITE_BASE || '/',
    url: process.env.SITE_URL || '',
  },
};
```

本地构建用默认值，CI 里注入 `SITE_BASE` 与 `SITE_URL`，同一份配置覆盖两种环境。

下一篇：[内容组织：目录即 URL 与 front-matter](/2026/11/21/xfmpress-content/)。
