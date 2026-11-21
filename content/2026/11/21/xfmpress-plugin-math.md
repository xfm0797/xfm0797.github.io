---
lang: zh-CN
translationKey: xfmpress-plugin-math
title: 数学公式插件：构建期 KaTeX 渲染，零客户端 JS
date: 2026-11-21 14:18:00
description: xfm-plugin-math 在构建时用 KaTeX 把 LaTeX 公式渲染成 HTML，页面只有静态 HTML 与本地 CSS，无客户端 JS、无 CDN 请求，代码块与美元转义不受影响
category: 官方插件
tags: [xfmpress, 插件]
---

写技术博客绕不开公式：算法推导、统计口径、损失函数。xfm-plugin-math 是 xfmpress 官方的数学插件，它在**构建期**用 KaTeX 把 LaTeX 公式渲染成 HTML——发布出去的页面里只有静态 HTML 和一段本地 CSS，浏览器不需要加载任何渲染脚本，也不会出现「闪一下未渲染的 LaTeX」的尴尬。这也是它与 0.4.15 同期推出的[图表插件](/2026/11/21/xfmpress-plugin-mermaid/)最大的分工差异：公式在构建期解决，图表交给浏览器。

## 它解决什么

MathJax 一类的方案在浏览器里渲染公式，首屏会先闪现原始 LaTeX 源码；而依赖 CDN 意味着多一个第三方请求、多一个故障点。xfm-plugin-math 把渲染挪到构建期，页面加载即最终形态，样式表和字体也全部自托管进站点产物。

## 安装与配置

```bash
npm i -D xfm-plugin-math
```

装完即生效——生成器会自动加载站点 `package.json` 里所有 `xfm-plugin-*` 依赖。也可以在 [配置文件](/2026/11/21/xfmpress-config/) 里显式声明：

```js
// xfm.config.mjs
export default {
  plugins: ['math'],
  math: {
    css: 'local',         // 'local' 复制进产物 | 'cdn' | 'none' 自己引
    path: 'assets/katex', // css: 'local' 时的产物目录
    fonts: 'woff2',       // 'woff2'（约 300 KB）| 'all' 连 woff/ttf 一起
    macros: {},           // 自定义宏，如 { '\\RR': '\\mathbb{R}' }
    output: 'html',       // 'html' | 'htmlAndMathml'（后者利于读屏，体积更大）
    strict: false,
    errorColor: '#cc0000',
  },
};
```

KaTeX 覆盖分式、根式、求和积分、矩阵、多行对齐、希腊字母、`\text{中文}` 等绝大多数常用命令，完整列表见 katex.org 的 supported 页。

## 产物与写法

三种写法，与主流 Markdown 编辑器一致：

```markdown
行内：$a^2 + b^2 = c^2$ 出现在句子中间。

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$

LaTeX 习惯也支持：\(x^2\) 与 \[x^2\]
```

块级公式会渲染成居中的 KaTeX HTML，样式只在**真正含公式的页面**注入（且页面已引过 katex.css 时不重复）。`css: 'local'`（默认）时，构建会把 `katex.min.css` 和 woff2 字体复制到 `assets/katex/`，CSS 里的 woff/ttf 回退源会被顺手删掉，产物里不留指向不存在文件的 `url()`。

## 注意事项

**为什么 `$a_1$` 不会变斜体**：下划线在 Markdown 里是强调记号。插件在 Markdown 解析**之前**就把每个公式换成 Unicode 私用区占位符（公式源码以 base64url 编码在占位符内），Markdown 引擎根本看不到 `$...$` 里的 `_` 和 `*`；页面渲染完成后再把占位符换回 KaTeX HTML。整个过程无跨阶段状态，这是它比「事后正则修补」可靠的根本原因。

**边界保护**：围栏代码块、行内代码、缩进代码块里的 `$` 原样保留；`\$` 输出字面美元符号，所以「$5 和 $10」不会被吃掉。行内公式还有额外约束：不跨行、开 `$` 后不留空白、闭 `$` 后不接数字，纯数字价格不会被误判。

**构建方式变化**：因为注册了 `markdown` 钩子，安装本插件后生产构建在主线程渲染而非 worker 池。实测千页站点的额外渲染时间不到一秒，可忽略。

公式写错了也不会让构建失败——KaTeX 出错时会以红色错误色保留可读片段（可用 `errorColor` 改色），方便发布前发现。更多插件生态见[官方插件总览](/2026/11/21/xfmpress-plugins/)。
