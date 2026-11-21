---
title: 命令行完全指南：create / dev / build / new / clean / info
date: 2026-11-21 10:20:00
description: xfmpress 全部六个命令的选项、别名与典型用法
category: xfmpress
tags: [xfmpress, 教程]
series: xfmpress使用教程
---

# 命令行一览

| 命令 | 说明 |
| --- | --- |
| `xfm create [目录]` | 创建站点，别名 `init` |
| `xfm dev [目录]` | 开发服务器，别名 `serve` / `server` / `preview` |
| `xfm build [目录]` | 生产构建，别名 `generate` / `gen` |
| `xfm new [布局] "标题"` | 新建内容：文章 / 页面 / 草稿 |
| `xfm clean` | 清理产物与缓存 |
| `xfm info` | 查看最终生效的配置 |

每个命令都接受 `[目录]` 参数指定站点路径，不传就是当前目录。

## create：创建站点

```bash
xfm create my-blog --template=blog --title=站点名
```

- `--template=blog|docs`：blog 是博客模板，docs 是侧栏文档模板
- 判断「目录已是站点」的依据是配置文件存在，所以用 `.js` / `.cjs` / `.json` 配置的老站点不会被误覆盖

## dev：开发服务器

```bash
xfm dev --port=4173 --host=127.0.0.1
```

- `--port`：端口，默认 4173（也可在配置 `server.port` 里改）
- `--host=0.0.0.0`：让同网段设备访问
- 配置文件本身也在监听范围内，改 `xfm.config.mjs` 保存即重建，不需要重启

## build：生产构建

```bash
xfm build --incremental    # 启用缓存（.xfm/cache.json）
xfm build --drafts         # 包含草稿（覆盖 buildDrafts 配置）
xfm build --no-drafts      # 排除草稿
xfm build --scheduled      # 强制发布 date 在未来的文章
xfm build --no-scheduled   # 排除未来文章（默认行为）
```

注意：`date` 在未来的文章默认会被**暂缓发布**——不进页面、RSS、sitemap 与文章列表计数，到点自动发布；`dev` 模式下依然可见方便预览。

## new：新建内容

```bash
xfm new "标题"                  # 文章（默认）
xfm new post "标题"             # 同上，显式写
xfm new page 标题               # 页面，自动写 layout: page.html 与 type: page
xfm new draft "标题"            # 草稿，自动写 draft: true
xfm new "标题" --dir=notes      # 指定子目录
xfm new "标题" --slug=my-post   # 指定 slug
xfm new "标题" --force          # 同名覆盖
```

规则：

- **只给一个参数时它一定是标题**——`xfm new page` 建的是一篇标题叫 "page" 的文章，不是页面
- 多个参数不会截断，`xfm new 我的 文章` 标题就是「我的 文章」
- 同名文件自动追加编号，不怕覆盖

## clean 与 info

```bash
xfm clean    # 删除 dist/ 与 .xfm/ 缓存
xfm info     # 显示配置查找命中了哪个文件、主题、插件
```

排查「配置没生效」「插件没加载」时，第一步永远是 `xfm info`。

下一篇：[配置详解](/2026/11/21/xfmpress-config/)。
