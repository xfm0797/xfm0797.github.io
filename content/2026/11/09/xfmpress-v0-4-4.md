---
lang: zh-CN
translationKey: xfmpress-v0-4-4
title: xfmpress v0.4.4：xfm create 不再覆盖已有 package.json
date: 2026-11-09 12:00:00
description: v0.4.4 修复 xfm create 会整体替换已有 package.json 的问题：现在改为合并写入，先装插件再脚手架的站点不会再丢失 xfm-plugin-* 依赖。
category: 更新日志
tags: [xfmpress, 更新日志]
---

v0.4.4 修复了一个会让插件「悄悄失效」的问题：`xfm create` 遇到已存在的 `package.json` 时不再整体覆盖，而是合并写入。

## 这一版在解决什么

插件外置后（0.4.2），站点通过 `package.json` 里的 `xfm-plugin-*` 依赖来加载插件。但 `xfm create` 的旧逻辑是直接生成一份新的 `package.json` 覆盖旧文件——如果一个站点先装好了插件、后来又跑了一次 `xfm create`（比如重新初始化或换模板），所有 `xfm-plugin-*` 依赖会被生成文件抹掉，插件从此静默停止加载，而构建却不报错。这类「看起来一切正常、功能其实没了」的问题，比直接崩溃难发现得多。

## 变了什么

### Fixed：覆盖改为合并

现在 `xfm create` 会把生成内容与现有 `package.json` 合并：已有的 `xfm-plugin-*` 依赖原样保留，脚手架需要的字段再补进去。先装插件、后跑 `create` 的顺序从此安全。

### Added：合并路径的测试覆盖

测试从 111 增至 112，新增的测试专门覆盖合并行为以及「`create` 之后插件仍然加载」这条路径——也就是上面那个静默失效场景的回归测试。

## 升级要不要动手

无需任何配置或操作。如果你之前在重跑 `xfm create` 后发现插件莫名失效，先检查一下 `package.json` 里的 `xfm-plugin-*` 依赖是否还在——被旧版本覆盖掉的话，重新 `npm i -D xfm-plugin-…` 即可恢复。装完跑一次 `xfm build`，从输出里的插件清单确认它们都回来了。脚手架的完整流程见[安装教程](/2026/11/21/xfmpress-install/)。
