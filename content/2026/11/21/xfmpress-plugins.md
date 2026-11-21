---
lang: zh-CN
translationKey: xfmpress-plugins
title: 插件系统：钩子、官方插件与自定义插件
date: 2026-11-21 09:20:00
description: 内核不带插件——四种加载方式、六个钩子的语义与并行取舍、17 个官方插件、十分钟写一个自己的插件
category: xfmpress
tags: [xfmpress, 教程]
series: xfmpress使用教程
---

# 内核不带任何插件

`npm i -g xfmpress` 只装生成器与两套主题，其余能力全按需安装——和 Hexo 的思路一致：站点里装了什么，就有什么。

## 四种加载方式

```bash
npm i -D xfm-plugin-sitemap xfm-plugin-rss xfm-plugin-search
```

1. **自动发现**：`package.json` 里任何 `xfm-plugin-*` 依赖，装了即生效
2. **短名声明**：`plugins: ['rss']` 解析成 `xfm-plugin-rss`，可固定加载顺序
3. **路径**：`plugins: ['./plugins/my.js']` 站点内本地插件
4. **内联**：`plugins: [{ name, ...hooks }]` 配置里直接写对象

装完要**重启 `xfm dev`**——插件在启动时解析，热更新不会重新扫 node_modules。声明了却没装会直接报错并给出 `npm i` 命令，不会静默跳过。

## 六个钩子

| 钩子 | 时机 | 返回值 |
| --- | --- | --- |
| `extendContext(ctx)` | 页面收集后、渲染前 | 替换站点上下文 |
| `markdown(raw, page)` | 单页解析时 | 替换 Markdown 源码 |
| `transformHtml(html, ctx)` | 单页渲染后、写盘前 | 替换 HTML |
| `afterCollect(site)` | 全部页面就位后 | 忽略，可往 page.data 写跨页数据 |
| `afterBuild(site)` | 全部渲染完毕 | 返回 `[{ path, contents }]` 汇总写出 |
| `configureServer(server)` / `finish(site)` | dev 启动 / 构建结束 | 忽略 |

两个值得知道的取舍：

- 注册了 `markdown` 钩子的站点**不启用 worker 池**（钩子跑在单页解析阶段，进线程来回序列化得不偿失）；`transformHtml` 不受影响
- 跨页计算（如相关文章）放 `afterCollect` 只算一次；放单页钩子里 1000 页就要算 1000 次全站相似度

## 17 个官方插件

**站点产物**：`sitemap`（sitemap.xml + robots.txt）、`rss`（feed.xml 全文）、`feed-json`（JSON Feed 1.1）、`llms`（llms.txt / llms-full.txt）、`search`（search.json + Ctrl/⌘+K 面板）、`pwa`（manifest + sw.js）、`redirect`（旧地址跳转页）、`reading-stats`

**内容增强**：`math`（构建期 KaTeX 公式）、`mermaid`（图表，见[第 13 章](/2026/11/21/xfmpress-math-mermaid/)）

**页面增强**：`seo`（canonical / Open Graph / Twitter Card / JSON-LD）、`related`（相关文章）、`minify`（HTML 压缩，跳过 pre/code/script/style）、`image-size`（给 img 补宽高，改善 CLS）、`deadlinks`（死链检查，strict 模式可让 CI 失败）、`comments`（十家评论系统：giscus / waline / twikoo / disqus 等，见[第 12 章](/2026/11/21/xfmpress-comments/)）、`analytics`（Umami / Plausible / GA / 百度统计）

## 页面级开关

front-matter 可以逐页关掉插件：`sitemap: false`、`rss: false`、`search: false`、`related: false`、`noindex: true`、`comments: false` 等。插件与主题只通过两个约定交接：`site.search`（有无搜索入口）与 `page.data.related`（有无推荐区块），所以卸载插件只会少功能，不会构建失败。

## 写一个插件

插件就是导出 `(site) => ({ name, ...hooks })` 的模块，放进站点 `plugins/` 目录自动加载：

```js
// plugins/reading-index.js
module.exports = (site) => {
  const { plainText, absoluteUrl } = site.helpers;
  return {
    name: 'reading-index',
    afterBuild(site) {
      const index = site.documents.map((d) => ({
        title: d.title,
        url: absoluteUrl(site.config.site, d.url),
        text: plainText(d.html).slice(0, 800),
      }));
      return [{ path: 'index.json', contents: JSON.stringify(index) }];
    },
  };
};
```

`site.helpers` 提供四件工具：`plainText(html)` 去标签取纯文本、`absoluteUrl(config, url)` 拼绝对地址、`withBase` 补子路径、`normalizeBase` 规范化 base。`afterBuild` 拿到的 `site.documents[].html` 是正文 HTML 不含布局，做全文索引正合适。

发布到 npm 时按 `xfm-plugin-<name>` 命名，别人装上就会被自动发现。

下一篇：[SEO 与站内搜索](/2026/11/21/xfmpress-seo-search/)。
