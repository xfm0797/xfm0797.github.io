---
lang: zh-CN
translationKey: xfmpress-install
title: xfmpress 是什么：安装与升级
date: 2026-11-21 10:40:00
description: 认识 xfmpress——一个零依赖的 Node.js 静态站点生成器，以及三种安装方式与升级方法
category: xfmpress
tags: [xfmpress, 教程]
series: xfmpress使用教程
---

# xfmpress 是什么

xfmpress 是一个**零依赖**的静态站点生成器（Static Site Generator），npm 包名是 `xfmpress`，装好后的命令是 `xfm`。它把 Markdown 压成纯静态 HTML，产物可以直接丢给 GitHub Pages、Netlify、Vercel、Nginx 或任何对象存储。

它的几个核心特点：

- **零运行时依赖**：`npm install` 只装 1 个包，没有漫长的依赖树。
- **快**：多线程渲染 + 增量构建。1000 篇中文文档全量冷构建约 5–6.5 秒，重复构建约 2.8 秒，dev 热更新单页重建只要 2–7 毫秒。
- **易迁移**：模板语法与 Nunjucks / Liquid 高度接近，写过 Hexo 主题基本可以无痛搬家；脚手架目录 `scaffolds/` 与 Hexo 同构。
- **即插即用**：内核不带插件，15 个官方插件按需 `npm i -D xfm-plugin-xxx` 安装。

## 前置要求

- Node.js ≥ 18（推荐 22 LTS）
- Git（部署时需要）

## 三种安装方式

### 方式一：全局安装（推荐）

```bash
npm i -g xfmpress
xfm --version
```

装完直接使用 `xfm` 命令。如果在 Linux / macOS 上遇到 EACCES 权限错误，建议用 nvm 管理 Node 版本后重装，避免 sudo。

### 方式二：免安装试用

```bash
npx xfmpress --help
```

不落盘全局环境，适合先试试手感。

### 方式三：项目内安装

```bash
cd my-site
npm i -D xfmpress
npx xfm dev
```

适合需要锁定版本、配合 CI 构建的站点（本站就是这种用法）。

## 升级

```bash
npm update -g xfmpress    # 全局
npm update xfmpress       # 项目内
```

升级后跑一次 `xfm info` 确认配置正常，再 `xfm clean && xfm build` 重建一遍产物即可。所有版本记录见官方文档的「版本记录」章节。

## 验证安装

```bash
xfm info
```

会输出当前读取的配置文件、主题与插件列表。看到这个输出，说明安装成功了。

下一篇：[快速上手：30 秒创建你的第一个 xfmpress 站点](/2026/11/21/xfmpress-quick-start/)。
