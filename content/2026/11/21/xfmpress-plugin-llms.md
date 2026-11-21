---
lang: zh-CN
translationKey: xfmpress-plugin-llms
title: llms 插件：给大模型读的 llms.txt 与 llms-full.txt
date: 2026-11-21 14:15:00
description: 按 llmstxt.org 约定生成纯文本索引：分组文章清单带一句话描述，可选全文版附剥离标签后的正文纯文本，多语言站收录所有语言页面
category: 官方插件
tags: [xfmpress, 插件]
---

让大模型了解一个站点，最便宜的方式不是让它解析整站 HTML，而是给它一份 llms.txt。`xfm-plugin-llms` 按 [llmstxt.org](https://llmstxt.org) 约定在构建末尾生成 `llms.txt` 与 `llms-full.txt`，体积远小于整站页面。

## 它解决什么

整站 HTML 噪音多、体积大，模型抓起来贵、读起来累。`llms.txt` 是一份分组的文章索引——站点摘要加每篇的标题、绝对链接与一句话描述；`llms-full.txt` 在此之上附每篇正文的纯文本（构建期去掉 script、style、pre 等标签）。AI 搜索爬虫与「把整个站喂给模型」的场景直接受益，见[SEO 与站内搜索](/2026/11/21/xfmpress-seo-search/)。

## 安装与配置

```bash
npm i -D xfm-plugin-llms
```

装了即生效，四个可调项：

```js
// xfm.config.mjs
export default {
  llms: {
    path: 'llms.txt',        // 索引文件路径
    full: true,              // 设为 false 跳过全文文件
    fullPath: 'llms-full.txt', // 全文文件路径
    maxItems: 0,             // 清单条数上限，0 = 全部
  },
};
```

## 产物与字段

`llms.txt` 的结构：`#` 站点标题开头，有 `site.description` 时跟一行 `>` 引用，接着是文章数与语言两行统计；正文按 `category` 分组，每组一个 `##` 小节，每行格式为 `- [标题](绝对链接): 描述`。`llms-full.txt` 先放同一份清单，之后逐篇追加 `##` 标题、页面链接与正文纯文本。

收录规则：有 `date`、不是 `type: page`、URL 不是首页；front-matter 写 `llms: false` 可排除某一页。

值得多语言站留意：与 [rss 插件](/2026/11/21/xfmpress-plugin-rss/)不同，`llms.txt` 不做 `inStream` 过滤，所有语言的页面都在清单里——和 `search.json` 一样，这正是它对 AI 场景的价值：模型一次就能看到全站（含各语言）的内容。

## 注意事项

- 全文文件体积与文章总量成正比，站大可以用 `maxItems` 收紧清单，或 `full: false` 只留索引。
- 正文转纯文本是够用级实现：`pre` 代码块会被整段剥掉，依赖代码示例完整呈现的内容自己权衡是否进全文文件。
- 没有任何文章时插件不输出文件，不用做空文件判断。
