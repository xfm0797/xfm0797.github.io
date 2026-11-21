---
lang: zh-CN
translationKey: xfmpress-plugin-deadlinks
title: 死链检查：构建时揪出站内坏链接
date: 2026-11-21 22:10:00
description: xfm-plugin-deadlinks 在构建收尾时扫描每个成品页面，把站内 href 和 src 对着真实产物清单核对，指不上的链接直接在终端列出，可产出 deadlinks.json 或让构建失败
category: 官方插件
tags: [xfmpress, 插件]
---

文章越写越多，手动检查站内链接不现实。`xfm-plugin-deadlinks` 在构建结束后扫描每个成品页面，把所有站内 `href` 和 `src` 对着真实产物清单逐一核对，指不上的就是死链，直接在终端里列出来。外链从不发请求——静态构建不该为了检查去联网。

## 它解决什么

- 改名、移动目录之后旧链接悄悄失效，浏览器点到才现形。这个插件把检查挪进构建，写错的链接在构建日志里现形。
- 比对对象是真实存在的输出：所有页面 URL、主题资源、`public/` 文件、内容目录资源，以及其他插件的产物；`sitemap.xml`、`feed.xml`、`search.json`、`stats.json` 等常见插件产物还有一份内置白名单，即使该插件注册在后面也不会误报。
- 相对链接按当前页面 URL 解析；目录形式（`/posts/x/`）、无斜杠（`/posts/x`）、带 `index.html` 三种写法都认；`#锚点`、`http:`、`mailto:`、`data:`、`//cdn` 这类地址自动跳过，URL 编码差异也会归一处理。

## 安装与配置

```bash
npm i -D xfm-plugin-deadlinks
```

```js
// xfm.config.mjs
export default {
  deadlinks: {
    report: true,        // 产出 deadlinks.json，排查用
    strict: false,       // true = 发现死链构建直接失败，可当 CI 门禁
    limit: 20,           // 控制台最多列多少条
    ignore: [            // 前缀字符串或正则
      '/api/',
      /^\/assets\/legacy\//,
    ],
    dev: false,
  },
};
```

## 运行时行为

检查在构建收尾阶段执行，生产构建默认开启（`dev: true` 可让 `xfm dev` 也查）。没有死链时只在生产构建打一行确认；发现死链时，终端按「链接 ← 来源页面」的格式列出（默认最多 20 条，`limit` 可调），并生成 `deadlinks.json` 记录完整清单；`strict: true` 则直接抛错让构建失败。

## 注意事项

- 只查站内同源地址，外链是否可达不在职责范围内——那是 CI 里 curl 类工具的活。
- 想把死链当部署门禁，开 `strict: true`，流水线里的构建会非零退出。
- 内置白名单只覆盖常见插件产物名；自定义产物如果被误报，用 `ignore` 的前缀或正则排除。
