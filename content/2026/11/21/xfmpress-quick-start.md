---
lang: zh-CN
translationKey: xfmpress-quick-start
title: 快速上手：30 秒创建你的第一个 xfmpress 站点
date: 2026-11-21 10:30:00
description: 从 xfm create 到 xfm dev，最快速度跑起一个带热更新的博客站点
category: xfmpress
tags: [xfmpress, 教程]
series: xfmpress使用教程
---

# 30 秒创建站点

三条命令跑通一个博客：

```bash
xfm create my-blog      # 创建站点
cd my-blog && xfm dev   # 毫秒级热更新的开发服务器
xfm build               # 生产构建，产物在 dist/
```

## xfm create

```bash
xfm create my-blog --template=blog --title=我的博客
```

- `--template=blog|docs`：博客模板或侧栏文档模板，默认 blog
- `--title=`：站点名称
- 别名 `xfm init`

生成出来的是一套**源码骨架**，目录长这样：

```
my-blog/
├── README.md           # 起步说明
├── xfm.config.mjs      # 站点配置
├── package.json        # devDependencies 里有 xfmpress
├── content/            # 内容目录
│   ├── index.md        # 首页
│   ├── about.md        # 关于页
│   └── posts/          # 文章
├── scaffolds/          # xfm new 的脚手架模板
│   ├── post.md
│   ├── page.md
│   └── draft.md
├── plugins/            # 站点本地插件目录
└── public/             # 静态文件（默认只有一个 .gitkeep 占位）
```

注意 `xfm create` 不会生成任何构建产物，`dist/` 是 `xfm build` 之后才出现的输出目录：

```
my-blog/dist/           # 构建产物（执行 xfm build 后才存在）
├── index.html
├── posts/              # 每篇文章一个目录
├── assets/             # 主题资源 + public 里的静态文件
└── ...                 # feed.xml / sitemap.xml / search.json 等由插件追加
```

`public/` 和 `dist/` 是两回事：`public/` 在源码里，你往里放的东西会被**原样拷贝**到 `dist/` 根目录（放 `favicon.ico`、`CNAME`、`robots.txt` 这类文件）；`dist/` 是整个站点构建出来的最终成品，随时可以删掉重建。

## xfm dev：开发服务器

```bash
xfm dev                # 默认 http://127.0.0.1:4173
xfm dev --port=5000    # 换端口
```

特点是**毫秒级热更新**：改 Markdown、改模板、改配置都是保存即生效，页面通过 SSE 自动刷新并保持滚动位置；CSS 单独热替换，连刷新都省了。404 页会列出当前所有可用路由，拼错地址一眼就能看出来。

## xfm build：生产构建

```bash
xfm build                 # 产物在 dist/
xfm build --incremental   # 启用增量缓存
xfm build --drafts        # 临时把草稿也构建进去
```

`dist/` 里是纯静态 HTML + CSS，零 JavaScript 依赖（主题自带的小交互除外），任何静态托管都能直接用。

## 创建内容

```bash
xfm new "你好世界"           # 新建文章 → content/posts/你好世界.md
xfm new page about          # 新建页面 → content/about.md（不进文章流）
xfm new draft "写一半的想法"  # 新建草稿，生产构建会跳过
```

初始内容取自 `scaffolds/<布局>.md`，占位符是 `{{ title }}`、`{{ date }}`、`{{ layout }}`，改一次脚手架以后所有新文章都按它来。

下一篇：[命令行完全指南](/2026/11/21/xfmpress-cli/)。
