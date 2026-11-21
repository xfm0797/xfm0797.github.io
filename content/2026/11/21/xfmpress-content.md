---
title: 内容组织：目录即 URL 与 front-matter
date: 2026-11-21 10:00:00
description: content 目录与 URL 的对应规则、front-matter 全部字段、文章页面草稿三种角色、Page Bundle 与定时发布
category: xfmpress
tags: [xfmpress, 教程]
series: xfmpress使用教程
---

# 目录与 URL 的对应

内容全部放 `content/` 下，支持 `.md`、`.markdown`、`.html`、`.htm`。规则三句话：**`index` 折叠成目录本身；去掉扩展名后补尾斜杠；`.html` 保持原样**。

| 源文件 | 生成的 URL |
| --- | --- |
| `content/index.md` | `/` |
| `content/about.md` | `/about/` |
| `content/posts/hello.md` | `/posts/hello/` |
| `content/2026/11/21/a.md` | `/2026/11/21/a/` |

想固定某个地址，在 front-matter 里直接指定，`url` / `permalink` / `slug` 三个字段都认：

```yaml
---
title: 关于
url: /about-me/
---
```

非 ASCII 路径同样可用，落盘时会还原成真实目录名，中文文件名不会 404。

## front-matter 全部字段

| 字段 | 说明 |
| --- | --- |
| `title` | 标题，不写则用文件名 |
| `date` / `published` | 发布日期，RSS 与排序依赖它 |
| `updated` | 更新时间，进 sitemap 的 lastmod |
| `description` / `summary` | 摘要，优先于自动截取的 excerpt |
| `tags` | 数组或逗号串，`[a, b]` 与 `a, b` 都接受 |
| `category` | 分类，单个字符串 |
| `series` | 系列，单个字符串 |
| `layout` | 布局文件名，默认取 `defaults.layout` |
| `weight` / `order` | 排序权重，小的在前 |
| `draft` | `true` 时生产构建跳过 |
| `toc` | `false` 时不生成目录 |
| `type` | 设为 `page` 不进文章列表、RSS 与上下篇 |

两个日期细节：只有日期的值（`2026-11-10`）按**本地日历日**解释，不会因为时区漂移早一天；带时区偏移的时间戳保持原值。Windows 编辑器的 UTF-8 BOM 不影响解析。

## 文章、页面与草稿

内容只有三种角色，差别全在 front-matter：

- **文章**：有 `date`，进首页列表、RSS、搜索索引、上下篇与相关推荐
- **页面**：`type: page`，有独立 URL，但**不进**任何列表与 feed——关于页、友链页用它；想让页面进导航要自己加进 `site.nav`
- **草稿**：`draft: true`，`xfm dev` 照常渲染，`xfm build` 跳过，删掉那行就发布

## Page Bundle：附件与页面放一起

`content/` 下不是页面的文件（图片、PDF 等）会原样复制到输出：

```
content/posts/hello/
├── index.md      → /posts/hello/
└── cover.png     → /posts/hello/cover.png
```

在 `index.md` 里写 `![cover](./cover.png)` 即可。相对 URL 会解析到页面自身 URL 之下，同一份源码换任何 `site.base` 都能用。

## 定时发布

把 `date` 设为未来时间，生产构建会暂缓发布——不进页面、RSS、sitemap 与文章列表计数，到点自动发布；`dev` 模式下依然可见方便预览。强制发布用 `xfm build --scheduled` 或配置 `buildScheduled: true`。

## 摘要与阅读时长

没有 `description` 时，引擎把渲染后的正文截到约 140 字作为 `excerpt`（自动剔除代码块、链接定义等噪音）；阅读时长按每分钟 350 字估算。模板里统一用 `page.desc`（= `description || excerpt`）与 `page.readTime`。

下一篇：[Markdown 扩展语法](/2026/11/21/xfmpress-markdown/)。
