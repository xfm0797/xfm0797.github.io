---
lang: zh-CN
translationKey: xfmpress-plugin-minify
title: HTML 压缩插件：只删安全空白，代码块原样保留
date: 2026-11-21 22:55:00
description: xfm-plugin-minify 在生产构建时删除 HTML 注释、行尾空白与缩进，pre、code、textarea、script、style 整体跳过，dev 模式不压缩
category: 官方插件
tags: [xfmpress, 插件]
---

静态站点的 HTML 往往带着大量缩进、空行和模板注释——它们对浏览器毫无意义，却实打实占着传输体积。xfm-plugin-minify 是 xfmpress 官方的 HTML 压缩插件，在**生产构建**时把这些死重清掉，同时小心避开所有不该碰的内容。它和 [SEO 插件](/2026/11/21/xfmpress-seo-search/) 一样属于「装上就受益」的收尾型插件。

## 它解决什么

压缩器最大的风险是误伤：删错一个空格，行内元素的间距就没了；碰一下 `<pre>`，代码格式就乱了。本插件的做法是先把保护名单里的块整体摘出、压完再放回去，其余部分只删确定安全的空白。

## 安装与配置

```bash
npm i -D xfm-plugin-minify
```

装完即生效，或在 [配置文件](/2026/11/21/xfmpress-config/) 里显式声明：

```js
// xfm.config.mjs
export default {
  plugins: ['minify'],
  minify: {
    enabled: true,     // 默认开启，写 false 可整体关闭
    aggressive: false, // true 时额外折叠标签之间的换行
  },
};
```

## 产物与行为

默认模式做四件事：

- 删除 HTML 注释，但保留 `<!--[if ...]>` 条件注释
- 删除行尾空白与只含空白的行
- 删除行首缩进（保留换行符，渲染结果不变）
- 合并连续空行

**保护名单**：`<pre>`、`<code>`、`<textarea>`、`<script>`、`<style>` 五类元素整体跳过，内容一字不动——代码缩进、脚本换行、CSS 格式都保持原样。

**默认模式为什么保守**：它只折叠「跨行」的空白，不碰同一行里的单个空格。`<a>甲</a> <b>乙</b>` 中间那个空格是行内元素之间的语义间距，删掉会让文字粘成一坨，所以默认模式绝不碰它。

**dev 模式完全不压缩**：`xfm dev` 下源码保持可读，热更新和调试时看生成的 HTML 更直观。压缩只发生在 `xfm build`。

## 注意事项

`aggressive: true` 会额外把标签之间的换行折叠掉（`>\n<` 变 `><`），产物更小，但可能影响依赖标签间距的行内布局——如果你不确定主题是否依赖这些换行，先保持默认的 `false`，用浏览器开发者工具对比一下再决定。与其他插件的先后配合无需操心：压缩作用于最终 HTML，对 [math](/2026/11/21/xfmpress-plugin-math/) 产出的 KaTeX 片段同样安全。插件生态总览见[官方插件](/2026/11/21/xfmpress-plugins/)。
