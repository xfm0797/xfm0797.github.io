---
lang: zh-CN
translationKey: xfmpress-v0-4-8
title: xfmpress v0.4.8：xfm new 成为一等公民，页面与脚手架齐备
date: 2026-11-10 09:00:00
description: 这一版让 xfm new 支持 layout 与脚手架目录，页面首次拥有独立的 URL 和完整 front-matter，多词标题不再被截断。
category: 更新日志
tags: [xfmpress, 更新日志]
---

在 v0.4.8 之前，`xfm new` 只能创建文章，想新建一个「关于」页面，你得手动复制一篇文章、改 front-matter、再祈祷没漏掉 `type: page`。这一版把内容创建做成了一等公民：`xfm new [layout] <title>` 的形式与 Hexo 对齐，脚手架可以自定义，页面和草稿也有了正式的入口。

## 这一版在解决什么

内容创建命令的能力边界，直接决定了写站点的顺手程度。此前页面（page）和草稿（draft）都靠手工「伪装」成文章，front-matter 的关键字段靠记忆维护，漏一个 `type: page` 页面就会混进文章列表、RSS 和搜索索引。v0.4.8 把这些隐式约定全部变成了显式命令。

## 变了什么

### Added

- **`xfm new [layout] <title>`**：页面和草稿第一次有了自己的命令形态。
  - `xfm new page about` 创建 `content/about.md`，发布在 `/about/`
  - `xfm new draft "Half an idea"` 创建带 `draft: true` 的草稿
  - `xfm new "Hello"` 与 `xfm new post "Hello"` 仍是创建文章，行为不变
  - 标题本身以 layout 名开头时可用 `--layout=` 指定，`--dir=` 仍可把文件放进任意子目录。
- **页面自动获得 `layout: page.html` 和 `type: page`**：页面有自己的 URL、可以加进 `site.nav`，但不会出现在文章列表、RSS、JSON Feed、相关文章和搜索索引里。这些此前全靠手写记忆。
- **`scaffolds/` 目录**：`xfm new` 的初始内容来自站点里的 `scaffolds/<layout>.md`，支持 `{{ title }}` / `{{ date }}` / `{{ layout }}` 占位符，和 Hexo 一样。`xfm create` 会写出三个默认脚手架供你修改；没有这个目录的站点回退到内置模板。
- 自定义脚手架漏写的 front-matter 键（title、date、layout、`type: page`、draft）会被自动补齐，一个「裸」脚手架不会再悄悄生成行为像文章的页面或会被发布的草稿。

### Changed

- `xfm new` 的输出更有信息量：打印所用 layout 和生成的 URL（如 `[page] → /about/`），指出使用了哪个脚手架，第一个词疑似拼错的 layout 名时会提示正确的命令。
- 多词标题保持完整：`xfm new 我的 文章` 创建的是「我的 文章」，不再丢弃第一个词之后的内容。单个参数永远视为标题（`xfm new page` 创建一篇名为 "page" 的文章），与 Hexo 一致。
- 初始示例文章的正文不再重复主题已经从 `page.title` 渲染出来的 `# H1`。

## 升级要不要动手

没有破坏性变更，已有命令的行为不变。值得动手的是两件事：一是以后建页面用 `xfm new page <标题>`，别再手改 front-matter；二是如果站点里已有 `scaffolds/` 目录以外的自定义模板习惯，可以迁移到脚手架里，享受占位符补齐的便利。CLI 的完整用法见 [CLI 教程](/2026/11/21/xfmpress-cli/)。
