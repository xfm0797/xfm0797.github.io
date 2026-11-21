---
lang: zh-CN
translationKey: xfmpress-v0-4-14
title: xfmpress v0.4.14：数据文件、自定义集合与多语言三件套一次到位
date: 2026-11-21 08:00:00
description: 这一版为 xfmpress 补齐了三类内容基建：全局数据文件、独立于文章流的自定义集合，以及基于 translationKey 的多语言支持，外加自动摘要兜底与陈旧输出清理的修复。
category: 更新日志
tags: [xfmpress, 更新日志]
---

v0.4.14 是一个偏"基建"的版本：它没有改构建性能，而是把站点内容组织的三类常见需求——结构化数据、非文章内容、多语言——一次性做进了核心。本站在迁移到多语言时用的正是这一版奠定的机制。

## 这一版在解决什么

静态站点写到一定规模，你会遇到三类老问题：想复用一份团队名单或导航配置，却只能在模板里硬编码；想做"项目""作品"这类不属于博客文章流的栏目，只能用 tag/category 勉强凑合；想提供中英双语内容，就得 fork 出第二条构建管线。v0.4.14 的目标就是让这三件事在 xfmpress 里成为一等公民。

## 变了什么

### Added

- **全局数据文件（`data/` 目录）**：`data/` 下的 `.json` / `.yaml` / `.yml` / `.js` / `.mjs` 文件会以 `site.data` 暴露给所有模板和插件，目录结构直接映射为嵌套对象（`data/team/members.yml` → `site.data.team.members`），目录名可通过 `dataDir` 配置。编辑数据文件会使所有页面缓存失效；取值经过 JSON 克隆，worker 载荷安全。
- **自定义集合**：`collections: { projects: { dir, url, layout, perPage, title, posts } }` 可把某个内容子目录变成独立栏目，拥有自己的列表页 `/projects/`、真实的静态分页 `/projects/page/2/…`，并在模板中以 `site.collections.<name>` 访问。集合条目默认不进入默认文章流、RSS 和 prev/next，除非显式设置 `posts: true`。两套主题都附带了 `collection.html` 布局。
- **多语言（i18n）**：声明 `site.languages` 后，每页通过 `lang` front-matter 驱动 `<html lang>`；共享同一 `translationKey` 的页面互为翻译（通过 `page.translations` 互查）；`xfm-plugin-seo` 会注入 `hreflang` 备用链接、`x-default` 与 `og:locale:alternate`。单语言站点不会输出上述任何标记。主题自带 `lang-switcher.html` partial，导航项也支持 `translations` 映射来本地化标签和链接。
- **自动摘要兜底（`page.desc`）**：没有写 `description` 的页面会从渲染后的正文截取 `excerpt`；模板可在列表卡片和 meta 标签里使用 `page.desc`（即 `description || excerpt`），两套主题的文章列表都已渲染 `post.desc`。

### Fixed

- **陈旧输出清理在目录上竞态**：`pruneStale` 原本按深度排序目录却用 `Promise.all` 并发删除，父目录可能在子目录消失前先执行 `rmdir` 而报 `ENOTEMPTY`（且被静默吞掉），留下空目录——例如关掉 `pagination.taxonomy` 后残留的旧 `/tags/x/page/` 空壳。现在目录按深度优先顺序逐个删除。

## 升级要不要动手

这一版没有破坏性变更，全是新增能力加一个清理逻辑的修复。直接升级即可；`dataDir`、`collections`、`site.languages` 都是可选配置，不配置就不生效。想上手数据文件和集合，可以参考 [内容组织教程](/2026/11/21/xfmpress-content/) 与 [配置教程](/2026/11/21/xfmpress-config/)；多语言的 translationKey 约定也正是本站中英文章互相关联的方式。
