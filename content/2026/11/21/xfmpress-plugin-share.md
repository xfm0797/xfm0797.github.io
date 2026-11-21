---
lang: zh-CN
translationKey: xfmpress-plugin-share
title: 分享插件：一篇文章十二个转发入口，不加载任何第三方脚本
date: 2026-11-21 15:30:00
description: 微博、微信、QQ、X、Telegram、邮件、复制链接等十二个渠道，按钮只是普通链接加本地复制，零依赖、零外部请求，按语言自动切换文案
category: 官方插件
tags: [xfmpress, 插件]
---

读者想转发一篇文章时，卡点往往不是「愿不愿意」，而是「找不到按钮」。`xfm-plugin-share` 在每篇文章结尾加一排分享按钮，十二个渠道可选，全部用原生的分享地址实现——不引 SDK、不加载统计脚本，连复制链接都不依赖任何第三方服务。

## 它解决什么

- 一次交互相当于「读者帮你分发」，比任何 SEO 手段都直接，但很多静态站根本没有分享入口
- 不用接入 Jiathis、AddThis 这类聚合服务，也就没有外部脚本、没有隐私争议、没有第三方挂了按钮跟着失效
- 所有按钮都是普通 `<a>` 链接，微信这种「不能直接分享」的渠道改为复制链接 + 提示文案，不依赖二维码服务

## 支持的渠道

| 网络 | 标签 | 说明 |
| --- | --- | --- |
| `weibo` | 微博 | 微博分享地址 |
| `wechat` | 微信 | 复制链接后提示去微信粘贴，不需要二维码服务 |
| `qq` | QQ 好友 | QQ 好友分享 |
| `qzone` | QQ 空间 | QQ 空间分享 |
| `twitter` | X | 推特/X intent，别名 `x` |
| `facebook` / `linkedin` | — | sharer / share-offsite |
| `telegram` | Telegram | t.me 分享 |
| `whatsapp` / `reddit` | — | 各自官方分享地址 |
| `email` | 邮件 | `mailto:` 链接，别名 `mail` |
| `copy` | 复制链接 | Clipboard API，失败回退 `execCommand`，附两秒提示 |

## 安装与配置

```bash
npm i -D xfm-plugin-share
```

生成器会自动加载 `package.json` 里所有 `xfm-plugin-*` 依赖；如果 `xfm dev` 正在运行，重启一下。

```js
// xfm.config.mjs
export default {
  share: {
    // 顺序即渲染顺序，默认：weibo, wechat, qq, twitter, telegram, copy
    networks: ['weibo', 'wechat', 'qq', 'qzone', 'twitter', 'telegram', 'copy'],
    title: '分享到', // 按钮前的文案，'' 则隐藏
    dev: false,     // 开发模式下也渲染，默认只在生产构建出现
  },
};
```

不写这段配置也能用，默认六个渠道。`site.url` 必须配置——分享链接要是完整地址，否则插件只能给出相对路径，并在构建时提醒一次。

## 挂载规则

默认挂在**文章**结尾：有 `date`、且不是 `type: page` 的页面。首页、归档页、分类/标签页、关于页这类独立页面一律跳过。单篇不想出现分享栏，在 front-matter 写 `share: false` 即可。

样式只有几行内联 CSS，注入在有分享栏的页面 `<head>` 里，跟随主题的 `--border` / `--muted` 变量。主题若只定义了 `--line` 之类的命名，补一行 `--border: var(--line)` 就能对上色。

## 复制类按钮怎么工作

`copy` 与 `wechat` 两个按钮不会跳转，它们把完整地址写进 `data-share-url`，点击时先试 `navigator.clipboard`，再回退到 `document.execCommand('copy')`，成功后弹一个两秒消失的提示（文案在 `data-share-msg`）。整个过程没有网络请求，断网也能用。

## 模板接管与本站做法

模板里放一个 `<div data-xfm-share></div>` 可以让插件只注入样式与脚本、不自动插入分享栏，由主题自己渲染——适合想把分享栏做进卡片侧边或浮动条的场景。

本站没有走这条路：直接让插件自动挂载，再用本地插件 `plugins/share-lang.js` 做两件事——把分享栏从 `</article>` 前挪到正文结尾（插件默认落点在文章卡片之外），以及按 `page.lang` 把中文标签换成英文。因为插件的标签是站点级常量，多语言站点若不做这一步，英文页会出现「微博」「复制链接」。

## 注意事项

- 微信没有网页分享接口，只能复制链接，这是平台限制而非实现取巧；想要扫码分享得自己接第三方二维码服务
- 分享数、点击量这类统计不在插件范围内，需要的话配合 `analytics` 插件用事件埋点
- 渠道并非越多越好：中英混排的站建议按主要读者选 5–7 个，铺满十二个反而稀释点击

插件系统怎么加载、配置文件的完整写法，分别见[插件系统总览](/2026/11/21/xfmpress-plugins/)与[配置指南](/2026/11/21/xfmpress-config/)。
