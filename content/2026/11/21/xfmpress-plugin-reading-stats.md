---
lang: zh-CN
translationKey: xfmpress-plugin-reading-stats
title: 阅读统计：字数与时长零配置生成
date: 2026-11-21 22:15:00
description: xfm-plugin-reading-stats 在构建时为每页统计字数（中文按字、英文按词）并估算阅读分钟数，生成 stats.json 供榜单或报告使用，同时注入 site.stats 模板变量
category: 官方插件
tags: [xfmpress, 插件]
---

「这篇文章多少字、要读几分钟」是文章页常见的元信息，放构建期算好比运行时估算更可靠。`xfm-plugin-reading-stats` 零配置：装上就在构建时给每个页面算字数和预计阅读时长，并生成一份整站统计文件。

## 它解决什么

- 字数统计分语种：中文按字计，英文按词计，不是简单按字符数除以常数。统计前会剥掉 `<pre>`、`<script>`、`<style>` 块和所有 HTML 标签，代码块不会虚增字数。
- 阅读分钟数按每分钟 400 字估算，不足 1 分钟按 1 分钟计。
- 它同时是 `extendContext` 钩子的官方示例：整站统计注入模板上下文，想给自己的插件加模板数据，照它抄就行。

## 安装与配置

```bash
npm i -D xfm-plugin-reading-stats
```

没有任何配置项——`xfm.config.mjs` 里没有 `reading-stats` 键，也没有 front-matter 开关，装上即全站生效。

## 运行时行为 / 产物

构建结束后生成 `stats.json`：`totalWords`（整站总字数）、`totalPages`（页数）、`pages`（按字数从多到少排列的前 200 页，每条含 `url`、`title`、`words`、`minutes`）。拿它做「字数最多」榜单、构建报告或前端展示都行。

模板侧通过 `site.stats` 拿整站概览的 `words` 与 `minutes`，比如在页脚显示全站规模：

```liquid
{{ site.stats.words }} 字 / 约 {{ site.stats.minutes }} 分钟读完
```

注意口径差异：`site.stats.words` 基于各页摘要与标题聚合，是整站量级的概览数字；单页的精确字数看 `stats.json` 里的逐页数据，那才是基于渲染后 HTML 全文的统计。

## 注意事项

- 字数口径是「中文字数 + 英文单词数」，与字处理软件的「字符数」不是一回事，别拿它对外宣称精确字数。
- 阅读速度 400 字/分钟是写死的常数估算，无法按页面调整。
- `stats.json` 的 `pages` 明细最多记录 200 页，超出的页面只计入总量，不出现在明细里。
