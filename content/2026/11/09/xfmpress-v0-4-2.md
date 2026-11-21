---
lang: zh-CN
translationKey: xfmpress-v0-4-2
title: xfmpress v0.4.2：插件拆出核心，按需安装、独立发布（破坏性变更）
date: 2026-11-09 10:00:00
description: v0.4.2 是本系列唯一的破坏性版本：九个插件从核心拆成独立 npm 包，按 Hexo 风格自动发现，缺插件时构建直接报错并给出安装命令，核心不再依赖任何插件。
category: 更新日志
tags: [xfmpress, 更新日志]
---

v0.4.2 是 0.4.x 里唯一带破坏性变更的版本，但它换来的是一个更健康的架构：插件彻底从核心剥离，成为独立发布、按需安装的 npm 包。这一版值得认真读一遍升级说明。

## 这一版在解决什么

以前九个插件全部捆在核心的 `lib/plugins/` 里，你不用也得装着，想自定义也只能改核心代码。「插件」和「内核」没有边界，第三方生态无从谈起。v0.4.2 把这条边界画清楚了：核心只管渲染，插件全是外部包。

## 变了什么

### Breaking：插件不再随核心分发

`lib/plugins/` 目录没有了。原来的九个插件（`xfm-plugin-sitemap`、`-rss`、`-feed-json`、`-search`、`-seo`、`-related`、`-llms`、`-minify`、`-reading-stats`）迁移到仓库的 `packages/` 下，作为独立 npm 包分别发布。两处具体的行为变化：

- 以前写 `plugins: ['rss']` 的站点，现在必须先 `npm i -D xfm-plugin-rss`。好消息是缺插件不会静默回退到内置副本——构建会直接失败，并给出**确切的安装命令**，你照着复制就行。
- `xfm create` 生成的站点带 `package.json` 但不带任何 `plugins` 条目：新站点从零插件开始，需要什么自己加。`xfm:<name>` 前缀和 `lib/plugins/<name>.js` 回退路径一并移除。

### Added：Hexo 风格的自动发现与 site.helpers

- 站点 `package.json` 里所有 `xfm-plugin-*`（或 `@scope/xfm-plugin-*`）依赖会被**自动加载**，无需改配置；`plugins: ['rss']` 里的短名会解析成 `xfm-plugin-rss`。
- 解析顺序明确：站点本地文件（`./plugins/x.js`）→ 站点 `node_modules` → CLI 自身的 `node_modules`，全局安装的插件也能用。
- 新增 `site.helpers`：一组冻结的公开 helper（`absoluteUrl`、`withBase`、`normalizeBase`、`applyBase`、`plainText`、`markdownPlain`、`escapeHtml`）。插件包不再深入 `xfm/lib/...` 内部取工具函数，无论 CLI 怎么安装都能正常工作。
- `xfm info` 会并排列出声明式配置和自动发现的插件。
- 新增四个测试（107 → 111），覆盖自动发现、重复注册、缺插件报错，以及「核心不依赖任何插件包」这条架构约束。

### Changed / Fixed

仓库改为 npm workspace（`packages/*`），`npm publish --workspaces` 一次发布整套插件，每个包有独立 README。README 和 README_CN 新增了完整的插件章节：安装命令、九个官方插件的包名/产物/选项表格、逐页 front-matter 开关，以及基于 `site.helpers` 的插件编写示例。顺带修了一个文档问题：部署说明里还提到早在 0.4.0 就删掉的 `scripts/pages-base.js`。

## 升级要不要动手

要动，但只有一件事：确认站点用到的每个插件都已安装为 devDependency，例如 `npm i -D xfm-plugin-rss`。配置里的短名写法不用改。装漏了也不危险——构建会失败并告诉你装哪个。装好之后如果想理清插件加载链路，可以看看 [CLI 教程](/2026/11/21/xfmpress-cli/)里的 `xfm info` 用法。
