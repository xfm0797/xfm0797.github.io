---
lang: zh-CN
translationKey: xfmpress-v0-4-15
title: xfmpress v0.4.15：构建期 KaTeX 数学公式与 Mermaid 图表插件上线
date: 2026-11-21 09:00:00
description: 这一版新增 math 与 mermaid 两个插件：公式在构建期渲染为 KaTeX HTML 无需客户端 JS，Mermaid 图表按页注入渲染器，并修复了插件间输出不可见与集合条目泄漏进 RSS 两个问题。
category: 更新日志
tags: [xfmpress, 更新日志]
---

v0.4.15 把两块高频内容能力——数学公式和流程图——做成了官方插件，同时顺手修掉了插件管线里两个隐蔽的 bug。如果你在写技术博客或文档，这一版值得认真看一下。

## 这一版在解决什么

技术写作离不开公式和图表，但常见的做法是把 KaTeX 或 Mermaid 的 JS 丢给浏览器在运行时渲染：首屏会闪一下原文，页面还得多背一个 CDN 依赖。xfm-plugin-math 把渲染挪到了构建期；xfm-plugin-mermaid 则坚持在浏览器绘制（Mermaid 本身需要 JS），但把脚本注入控制在真正有图的页面上。

## 变了什么

### Added

- **`xfm-plugin-math`**：构建期 KaTeX 渲染。行内 `$a^2$`、独立 `$$…$$` 以及 LaTeX 的 `\(…\)` / `\[…\]` 写法都支持。公式在 Markdown 处理前先被替换为私有区占位符，所以 `$a_1$` 里的下划线不会再被误认成强调语法，代码块和 `\$` 转义也原样保留。页面输出的是纯 KaTeX HTML，样式表和 woff2 字体复制到 `assets/katex/`——没有客户端 JS，不依赖 CDN。
- **`xfm-plugin-mermaid`**：`mermaid` 围栏代码块变成 `<pre class="mermaid">`，在浏览器中绘制。渲染器只注入到包含图表的页面，从本地 `assets/mermaid/` 提供（也可用 `mermaid.mode: 'cdn'` 走 CDN），并支持在单页 front-matter 里用 `mermaid: false` 关闭。
- 两个插件都附带 README、测试（`test/run.js`）和示例站点上的演示文章。
- **0.4.14 新特性的示例站点演示**：`examples/blog` 现在覆盖了上一版的所有新能力——一个 `projects` 自定义集合（出现在导航里，独立于文章流）、一对中英文 `about` 翻译页（含本地化导航标签和 `hreflang`）、一个被站点本地插件 `plugins/author-byline.js` 消费的 `authors.json` 数据文件（向文章注入署名），以及一篇以自动摘要作为列表卡片文案的特性文章。示例 changelog 页也同步到了 0.4.14。

### Fixed

- **后执行的 `afterBuild` 插件看不到先执行插件的输出**：`site.extraFiles` 原本要等整个钩子跑完才填充，导致 `xfm-plugin-deadlinks` 把其他插件生成的资源（例如 `assets/katex/katex.min.css`）误报为死链。现在输出在钩子执行过程中按插件顺序累积。
- **集合条目泄漏进 RSS / JSON Feed**：两个 feed 插件读取的是 `site.documents` 而非文章流，于是标记为独立的集合条目也会出现在 `feed.xml` / `feed.json` 里。现在非 `posts` 集合会把条目标记为 `rss: false`（尊重 front-matter 中显式的 `rss` 值），feed 插件本就遵循这个标记。

## 升级要不要动手

两个插件都是可选安装，现有站点不装不受影响；修复部分无破坏性变更。值得注意的一点：如果你在用 deadlinks 插件并开启了 math 插件，升级后死链误报会消失，这不是新问题，是修正。公式与图表的写法详见 [Markdown 教程](/2026/11/21/xfmpress-markdown/)。
