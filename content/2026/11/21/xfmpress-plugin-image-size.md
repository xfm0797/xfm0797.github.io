---
lang: zh-CN
translationKey: xfmpress-plugin-image-size
title: 图片尺寸插件：补全宽高属性，消除布局抖动
date: 2026-11-21 23:00:00
description: xfm-plugin-image-size 构建时读取本地图片文件头，为 img 补上 width 与 height 属性并默认加 loading="lazy"，消除图片加载引起的布局抖动
category: 官方插件
tags: [xfmpress, 插件]
---

图片加载完成时页面突然往下蹦一下——这是布局抖动（CLS），Core Web Vitals 里的扣分项。根因是 `<img>` 缺少 `width`/`height`，浏览器在图片到达前不知道该留多大位置。xfm-plugin-image-size 是 xfmpress 官方的图片尺寸插件，构建时读一下本地图片的文件头，把尺寸写进属性，浏览器据此预留空间，页面从此稳定。

## 它解决什么

逐篇文章手工标注图片尺寸既繁琐又容易过期。本插件自动化这件事：不联网、不解码整张图，只读文件头几十个字节就能解析出宽高，PNG、JPEG、GIF、WebP、SVG 都支持。SVG 取 `width`/`height` 属性，缺失时回退到 `viewBox`。

## 安装与配置

```bash
npm i -D xfm-plugin-image-size
```

装完即生效，或在 [配置文件](/2026/11/21/xfmpress-config/) 里显式声明：

```js
// xfm.config.mjs
export default {
  plugins: ['image-size'],
  imageSize: {
    publicDir: 'public', // 站点静态资源目录
    lazy: true,          // 顺带给没有 loading 的图片补 loading="lazy"
    dev: false,          // dev 下是否也处理，默认只在生产构建
  },
};
```

## 产物与行为

Markdown 里的 `![封面](/img/cover.png)` 构建后变成：

```html
<img src="/img/cover.png" width="1280" height="720" loading="lazy">
```

图片查找按顺序尝试三处：`public/` 目录（可用 `publicDir` 改）、`content/` 下与文章同目录（支持 Page Bundle 配图）、主题的 `assets/` 目录。尺寸结果按文件路径缓存，同一张图在一千篇文章里引用也只读一次文件。相对路径如 `./cover.png` 会按页面 URL 解析成站内绝对路径。

## 注意事项

**哪些图片会被放过**：外链图片、`data:` URI、纯锚点，以及已经同时写有 `width` 和 `height` 的 `<img>` 都原样保留——插件只补缺，不覆盖。路径越出站点目录的引用直接放弃，不会越界读文件。

**dev 与生产**：默认只在生产构建处理（`xfm dev` 不动 HTML），需要本地预览效果时把 `imageSize.dev` 设为 `true`。某页不想被处理（比如图片由自定义模板输出），在该页 front-matter 写 `imageSize: false` 即可逐页跳过。

**lazy 属性**：默认 `lazy: true` 会给所有没有 `loading` 属性的图片补上 `loading="lazy"`；不想要这个行为就设为 `false`，插件便只补尺寸。这个插件与 [SEO 插件](/2026/11/21/xfmpress-seo-search/) 搭配使用，对 Core Web Vitals 的两项得分都有帮助。插件生态总览见[官方插件](/2026/11/21/xfmpress-plugins/)。
