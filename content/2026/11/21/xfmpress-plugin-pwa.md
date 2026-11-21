---
lang: zh-CN
translationKey: xfmpress-plugin-pwa
title: PWA 插件：manifest、Service Worker 与离线页
date: 2026-11-21 14:27:00
description: 构建期生成 manifest.webmanifest、sw.js 与 offline.html，没准备图标时自动用站点标题首字生成 icon.svg
category: 官方插件
tags: [xfmpress, 插件]
---

让博客「可以安装到主屏幕、断网也能读」听起来要写不少样板代码。`xfm-plugin-pwa` 把这些活全部挪到构建期：一次安装，产物里多出 manifest、Service Worker 和离线兜底页，页面头部自动注入对应的链接与标签。

## 它解决什么

- **可安装**：生成 `manifest.webmanifest`（名称、图标、主题色、独立窗口），手机浏览器会把站点当作可安装应用
- **离线可读**：Service Worker 缓存页面与静态资源，断网时回退缓存或离线页
- **零图标依赖**：如果你没准备任何图标，插件会用站点标题的首字生成一个 `icon.svg`，不会因为缺图而装不起来

## 安装与配置

```bash
npm i -D xfm-plugin-pwa
```

```js
// xfm.config.mjs
export default {
  plugins: ['pwa'],
  pwa: {
    name: '我的站点',           // 默认取 site.title
    shortName: '站点',          // 默认取 site.title，过长会截断
    themeColor: '#3b82f6',     // 浏览器地址栏 / 状态栏颜色，默认 #3b82f6
    backgroundColor: '#ffffff', // 默认 #ffffff
    display: 'standalone',     // 默认 standalone
    offline: true,             // 生成离线兜底页，默认开启
    cacheExtra: ['/assets/font.woff2'], // 额外要预缓存的地址
  },
};
```

多数配置默认取自站点的 `site` 配置，最小配置（只装插件、不写 `pwa` 段）就能跑。

## 产物与行为

构建产物新增四个文件：

| 文件 | 作用 |
| --- | --- |
| `manifest.webmanifest` | 安装清单：名称、图标、主题色、启动地址 |
| `sw.js` | Service Worker，导航请求网络优先、静态资源缓存优先 |
| `offline.html` | 断网且无缓存时的兜底页 |
| `icon.svg` | 未提供图标时自动生成的首字图标 |

页面头部会被注入 `<link rel="manifest">`、`<meta name="theme-color">` 和 `apple-touch-icon`，生产环境还会自动注册 Service Worker。缓存清单包含首页、主题资源与 `public` 里的静态资源（css/js/字体/图片），缓存版本号由清单内容摘要生成——清单一变，用户端自动换新缓存，不会卡在旧版本上。想强制预缓存某几个文件，用 `cacheExtra`。

## 注意事项

- **Service Worker 只在 https 或 localhost 下生效**；构建产物直接用 `file://` 打开无效
- manifest 链接默认只在生产构建注入，开发阶段想看效果设 `dev: true`
- 某个页面不想注入 manifest 链接，front-matter 写 `pwa: false`
- 提供了 `icons` 时插件不再生成 `icon.svg`，避免覆盖你自己的文件

本站没有安装这个插件——是否要离线能力取决于站点性质，对以阅读为主的博客来说它是低成本加分项。部署环境要求见[部署指南](/2026/11/21/xfmpress-deploy/)。
