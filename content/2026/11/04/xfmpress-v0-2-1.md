---
lang: zh-CN
translationKey: xfmpress-v0-2-1
title: xfmpress v0.2.1：命令行贴合 Hexo 肌肉记忆
date: 2026-11-04 10:00:00
description: 为 CLI 加入 Hexo 风格命令别名与拼写建议，修复原型链键被当作命令执行、连字符开头输入处理不当两个命令解析问题。
category: 更新日志
tags: [xfmpress, 更新日志]
---

0.2.1 是一个小而锋利的版本，全部围绕命令行体验：从 Hexo 迁移过来的用户不用重新学命令，敲错命令时得到的是建议而不是一屏帮助文本，同时堵上了两个命令解析的安全与健壮性问题。

## 这一版在解决什么

xfmpress 的原生命令是 `create` / `build` / `dev`，但大量静态站点用户来自 Hexo，手指已经记住了 `init` / `generate` / `serve`。每次都撞"未知命令"很劝退。另外命令解析还有两个隐患：`xfm constructor` 这样的原型链键名会被当成命令调用原型方法；`xfm --port=4173` 这种以连字符开头的输入会直接倾倒整个命令列表而不是告诉你"这是个不认识的选项"。

## 变了什么

### Added

- Hexo 风格命令别名：`init` → `create`，`generate` / `gen` → `build`，`serve` / `server` / `preview` → `dev`。老用户零学习成本。
- 未知命令给出最近似拼写建议：`xfm buils` 会提示 "did you mean `xfm build`?"，而不是重印整份帮助。
- 两份 README 加入 npm / Node / license / 零依赖徽章。

### Fixed

- `xfm constructor`（或任意 `Object.prototype` 上的键）此前会被解析为命令并调用原型方法；命令查找现在只使用自有属性，原型链不再参与。
- 以连字符开头的输入（如 `xfm --port=4173`）现在被报告为未知的**选项**并附使用提示，而不是倾倒命令列表。

## 升级要不要动手

升级即用，无破坏性变更、无需改配置。原来用 `xfm build` 的脚本继续工作；脚本里换成 `gen`、`serve` 等别名也没问题。命令行的完整用法见 [CLI 教程](/2026/11/21/xfmpress-cli/)。
