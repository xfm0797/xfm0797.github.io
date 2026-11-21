---
lang: zh-CN
translationKey: xfmpress-plugin-analytics
title: 访问统计：一行配置接入五类统计服务
date: 2026-11-21 22:00:00
description: xfm-plugin-analytics 在构建时往每页 body 结束前注入统计脚本，内置 umami、plausible、google、baidu 与自定义片段五种 provider，支持数组并行埋点、按路径排除、单页关闭
category: 官方插件
tags: [xfmpress, 插件]
---

静态站点想知道每天有多少人来读，不必往主题模板里塞第三方 SDK。`xfm-plugin-analytics` 把统计脚本收进配置：构建时自动注入每个页面，换服务改一行配置就行，模板零改动。

## 它解决什么

- 统计代码散落在布局模板里，换一家服务就要改一遍模板。这个插件把脚本生成收进 `xfm.config.mjs`，配置即切换。
- 迁移期常需要两套统计并行跑，`provider` 直接给数组：`provider: ['umami', 'google']` 同时埋两套。
- 用自建或小众服务？`provider: 'custom'` 把整段代码贴进 `analytics.script` 原样插入。

内置五种 provider：`umami`、`plausible`、`google`（GA4 gtag）、`baidu`（百度统计）、`custom`。

## 安装与配置

```bash
npm i -D xfm-plugin-analytics
```

生成器会自动加载站点 `package.json` 里所有 `xfm-plugin-*` 依赖，装完即生效；`xfm dev` 正在跑的话重启一次。也可以在 `plugins: ['analytics']` 里显式声明，短名会解析成 `xfm-plugin-analytics`。

```js
// xfm.config.mjs
export default {
  analytics: {
    provider: 'umami',   // umami | plausible | google | baidu | custom
    umami: { src: 'https://umami.example.com/script.js', id: '网站ID' },
    // plausible: { domain: 'example.com', src: 'https://plausible.io/js/script.js' }
    // google: { id: 'G-XXXXXXX' }
    // baidu: { id: '0123456789abcdef' }
    // custom 模式：script: '<script>…你的代码…</script>'
    dev: false,
    exclude: ['/draft-preview/'],
  },
};
```

## 运行时行为

生产构建时，插件把统计脚本插到每个页面的 `</body>` 之前，并留下一个 `<div data-xfm-analytics hidden></div>` 标记，同一页不会重复注入。脚本片段按配置只计算一次再逐页插入，几百个页面也没有额外构建开销。

三种情况会跳过注入：

- `xfm dev` 本地预览默认不注入，第三方脚本不该拖慢本地开发（`analytics.dev: true` 可打开）；
- 页面 front-matter 写了 `analytics: false`；
- 页面 URL 以 `analytics.exclude` 中的某个前缀开头，比如草稿预览目录。

## 注意事项

- `provider` 写错不会让构建失败，只在日志里警告一次，页面原样输出——数字突然断了先回头看终端输出。
- `custom` 模式的 `script` 原样插入 HTML，脚本内容是否合法需要自己把关。
- 它提供的是访客行为数据，要看数得去统计服务自己的后台；想在页面上展示整站字数、阅读时长这类构建期数据，配合 reading-stats 插件，两者互不冲突。更多插件见[官方插件总览](/2026/11/21/xfmpress-plugins/)。
