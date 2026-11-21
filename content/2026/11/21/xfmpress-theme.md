---
lang: zh-CN
translationKey: xfmpress-theme
title: 主题开发：从零写一个自己的主题
date: 2026-11-21 09:30:00
description: 主题目录结构、布局清单与选择顺序、四个文件写出最小可用主题、资源打包与调试要点
category: xfmpress
tags: [xfmpress, 教程]
series: xfmpress使用教程
---

# 主题是纯文件

主题不需要打包、不需要注册。指向一个目录，构建时按约定读布局、拷资源：

```
themes/my-theme/
├── theme.config.js     # 可选：主题级配置
├── layouts/            # 页面骨架（至少 base.html）
│   ├── base.html
│   ├── index.html
│   ├── post.html
│   └── page.html
├── partials/           # 可复用片段，可选
│   └── toc.html
└── assets/             # 静态资源，构建时复制到 site.assets
    └── style.css
```

## 布局清单与选择顺序

| 布局 | 何时被选中 | 必需 |
| --- | --- | --- |
| `base.html` | 不直接渲染，供 extend | 是 |
| `post.html` | 带日期的文章 | 建议有 |
| `page.html` | 无 layout 字段的兜底 | 建议有 |
| `index.html` | 首页与分页页 | 建议有 |
| `taxonomy.html` | 标签 / 分类 / 系列聚合页 | 可选 |
| `categories.html` | 分类索引页 `/categories/` | 可选 |
| `archives.html` | 按年归档页 `/archives/` | 可选 |

选择顺序：front-matter 的 `layout` → 配置的 `defaults.layout` → `page.html`。首页固定 `index.html`，聚合页固定 `taxonomy.html`。**缺哪个布局就少生成哪类页面，不报错**——主题没写 `archives.html` 就不会有 `/archives/`。

内置两套主题：`default`（博客：首页列表 + 文章页 + 右侧目录 + 深浅色）与 `docs`（侧栏文档站，由 `site.navGroups` 驱动）。

## 从零写一个最小主题

四个文件就能跑。`layouts/base.html`：

```html
<!DOCTYPE html>
<html lang="{{ site.lang }}">
<head>
  <meta charset="utf-8">
  <title>{{ page.title | default(site.title) }}</title>
  <link rel="stylesheet" href="{{ site.assets }}style.css">
</head>
<body>
  <header><a href="/">{{ site.title }}</a></header>
  <main>{% block main %}{{ content | safe }}{% endblock %}</main>
</body>
</html>
```

`layouts/index.html`（首页列表）：

```html
{% extend "base.html" %}
{% block main %}
<h1>{{ site.title }}</h1>
<ul>
{% for post in site.posts %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> <time>{{ post.date }}</time></li>
{% else %}
  <li>还没有文章。</li>
{% endfor %}
</ul>
{% endblock %}
```

`layouts/post.html`（文章页）：

```html
{% extend "base.html" %}
{% block main %}
<article>
  <h1>{{ page.title }}</h1>
  <div class="prose">{{ content | safe }}</div>
</article>
{% endblock %}
```

配置里指过去：

```js
export default { theme: 'themes/mini' };
```

`xfm dev` 立刻用新主题渲染，模板按 mtime 缓存，保存即重新编译。

## 资源打包

`assets/` 下按相对路径复制到 `site.assets`（默认 `/assets/`）：

```
themes/my-theme/assets/style.css → dist/assets/style.css
themes/my-theme/assets/fonts/a.woff2 → dist/assets/fonts/a.woff2
```

模板里用 `{{ site.assets }}style.css` 拼路径，换主题或改前缀都不必改模板。站点 `public/` 目录是另一条通道，直接落到产物根目录，放 favicon、robots.txt 这类固定路径文件。

## 调试要点

- **模板报错定位到文件**：如 `partials/toc.html: 不支持的过滤器 "safee"（可用：safe, length, …）`，按提示改
- **改了 block 没生效**：先确认父布局里有同名 block——缺同名 block 时内容追加到页面末尾而不是替换
- **样式对但内容没变**：内容来自 page/site，检查 front-matter 的 layout 字段
- **别在模板里做重活**：for 里套复杂运算会被执行 N 次；跨页数据交给插件的 afterCollect 钩子算好写进 page.data

下一篇：[插件系统](/2026/11/21/xfmpress-plugins/)。
