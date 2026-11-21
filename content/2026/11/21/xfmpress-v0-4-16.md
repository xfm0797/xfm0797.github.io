---
lang: zh-CN
translationKey: xfmpress-v0-4-16
title: xfmpress v0.4.16：评论插件统一为 xfm-plugin-comments，一站接入十种评论系统
date: 2026-11-21 10:00:00
description: 原来的 giscus 专用插件更名为 xfm-plugin-comments，同一配置开关支持 giscus、waline、disqus 等十种评论系统，配置键不变，并新增线程绑定方式、按 provider 校验必填项与按页注入样式。
category: 更新日志
tags: [xfmpress, 更新日志]
---

v0.4.16 只做了一件事，但把它做透了：把评论系统从"只支持 giscus"升级为"一套配置接十家"。改名、扩展、校验、样式注入，全部围绕 `comments.provider` 这一个开关展开。

## 这一版在解决什么

评论区是博客站点的标配，但各家评论服务的接入方式各不相同：giscus 要 `repoId`，Waline 要 `envId`，Disqus 只要 shortname。此前 xfmpress 只有 giscus 专用插件，想换系统就得换插件、改配置。这一版把十个评论系统收进同一个插件，换来换去只改一个 `provider` 字段。

## 变了什么

### Changed

- **`xfm-plugin-giscus` 更名为 `xfm-plugin-comments`**：同一个插件现在通过 `comments.provider` 支持十种评论系统——`giscus`、`beaudar`、`utterances`、`disqus`、`waline`、`twikoo`、`valine`、`gitalk`、`artalk`、`cusdis`。配置键没有变化，已有的 `provider: 'giscus'` 配置原样可用；包改名只影响安装命令那一行。
- **新选项 `comments.identifier`**：取值 `path` | `url` | `title`，决定评论线程绑定到页面的什么标识上。换主题或换域名时这个选项很关键——绑定方式不同，老评论能否延续也不同。
- **按 provider 校验必填字段**：缺少 `repoId` / `envId` 等必填项时会给出警告并跳过该组件，而不是输出一个坏掉的评论框；填了不支持的 provider 则会列出所有支持的名字，方便对照修正。
- **样式按需注入**：Waline、Gitalk、Artalk 的样式表只注入到真正挂载了评论组件的页面的 `<head>`，其余页面零负担。

## 升级要不要动手

分两种情况。如果你已经在用 giscus 插件：升级后配置完全兼容，唯一要动的是把依赖从 `xfm-plugin-giscus` 换成 `xfm-plugin-comments`（包名变了）。如果你是全新接入：装新包、写 `comments.provider` 即可，不再需要挑专用插件。唯一需要留意的决策点是 `comments.identifier`——它决定线程的唯一性来源，建议在建站初期就定下来，之后改动会导致老评论对不上页面。评论插件的完整配置见 [评论教程](/2026/11/21/xfmpress-comments/)。
