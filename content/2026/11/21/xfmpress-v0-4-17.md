---
lang: zh-CN
translationKey: xfmpress-v0-4-17
title: xfmpress v0.4.17：多语言站文章流按语言拆分，译文不再重复出现在列表和订阅里
date: 2026-11-21 12:50:00
description: 多语言站点上 site.posts 现在只含默认语言文章，归档、标签统计、prev/next 与 RSS/JSON Feed 同步过滤，并为每个非默认语言生成独立列表页，单语言站点输出保持逐字节不变。
category: 更新日志
tags: [xfmpress, 更新日志]
---

v0.4.17 是本站当前正在运行的版本，它解决的是多语言站点一个由来已久的尴尬：0.4.14 引入 i18n 后，译文和原文都能构建出来，但它们会一起挤进首页文章流——同一篇文章在列表里出现两次，分类计数翻倍，订阅源里也是两份。这一版把文章流按语言干净地拆开了。

## 这一版在解决什么

对声明了 `site.languages` 的站点，`site.posts` 现在只包含默认语言（`languages[0]`）的文章。归档、标签/分类/系列聚合、`prev`/`next`、RSS 和 JSON Feed 按同样规则过滤，译文不会再在首页列表、分类计数或 feed 里重复出现。其他语言的文章仍然可以访问（并保留 `hreflang`），被归入 `site.postsByLang[lang]`。本站的中英文文章正是靠这一机制各归各位。

## 变了什么

### Changed

- **文章流按语言拆分**：如上所述，过滤只在声明了多于一种语言时启用，单语言站点走完全不变的老代码路径——现有输出逐字节一致。
- **按语言的列表页**：每个有文章的非默认语言都会得到 `/<lang>/` 以及 `/<lang>/page/N/`，用首页布局渲染，`pagination` 结构相同，并设置 `page.lang`，使 `<html lang>`、本地化导航标签和语言切换器保持一致。该语言没有文章或 URL 已被内容文件占用时跳过。多语言首页还会获得一个合成的 `page.translations` 表（`/` ↔ `/en/`），语言切换器从首页也能用。
- **模板新增 `postsTotal`**：当前列表的文章数——在 `/<lang>/` 上就是该语言的文章数。默认主题的侧栏已用它替代 `site.posts.length`。
- **插件可见 `documents[].inStream`**：标记文档是否属于默认文章流。`xfm-plugin-rss`、`xfm-plugin-feed-json`（0.4.3 起）据此过滤，`xfm-plugin-related`（0.4.3 起）只推荐同语言文章。`search.json` 和 `llms.txt` 仍索引全部页面。

## 升级要不要动手

如果你是单语言站点：什么都不用做，这一版对你零影响。如果你声明了多语言：文章流的语义变了，需要检查自定义模板里所有直接消费 `site.posts` 的地方——如果想在某个页面列出全部语言的文章，改用 `site.postsByLang`。归档、feed、相关文章插件的行为变化都是自动的，不需要配置。多语言站点的整体搭建流程见 [配置教程](/2026/11/21/xfmpress-config/) 与 [模板教程](/2026/11/21/xfmpress-templates/)。
