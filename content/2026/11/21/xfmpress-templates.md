---
lang: zh-CN
translationKey: xfmpress-templates
title: 模板语法：变量、过滤器与模板继承
date: 2026-11-21 09:40:00
description: Nunjucks 风格的模板语法——输出转义、六种过滤器、条件循环、include 片段、extend/block 继承与完整模板上下文
category: xfmpress
tags: [xfmpress, 教程]
series: xfmpress使用教程
---

# 模板语法总览

语法与 Nunjucks / Liquid 高度接近，写过 Hexo 主题基本直接迁移。实现方式不同：模板在**构建期一次性编译成 JS 函数**，渲染只做字符串拼接——没有解释器循环，没有 AST 遍历。

| 语法 | 作用 |
| --- | --- |
| `{{ expr }}` | 输出，默认 HTML 转义 |
| `{{ expr | safe }}` | 输出，关闭转义 |
| `{% if %} / {% elif %} / {% else %}` | 条件 |
| `{% for x in list %}` | 循环 |
| `{% set x = expr %}` | 赋值 |
| `{% include "partials/toc.html" %}` | 引入片段 |
| `{% extend "base.html" %}` + `{% block %}` | 继承与覆写 |
| `{% raw %}…{% endraw %}` | 原样输出不解析 |
| `{# 注释 #}` | 注释，不进产物 |

## 输出与转义

```html
<h1>{{ page.title }}</h1>
<div class="prose">{{ content | safe }}</div>
```

`{{ }}` 默认转义 `& < > " '`，普通字段直接写；正文 HTML 必须加 `| safe`。**未定义变量不抛错**，输出空字符串——`page.data.prev.title` 在 prev 不存在时安静得到 undefined，不会 TypeError。

## 过滤器

| 过滤器 | 作用 |
| --- | --- |
| `safe` | 关闭 HTML 转义 |
| `length` | 数组元素数 / 对象键数 / 字符串长度 |
| `upper` / `lower` | 大小写 |
| `trim` | 去首尾空白 |
| `json` | 序列化成 JSON |
| `default` | 值为空时给默认值 |

过滤器用竖线串联：`{{ page.title | trim | upper }}`。写错过滤器名会**编译期报错**并列出可用清单——拼错 `| saft` 导致整页内容被转义，比构建失败更难查，所以引擎选了直接报错。

## 条件与循环

表达式支持 `and` / `or` / `not`、比较运算、成员访问与下标。循环体里有 `loop` 对象：`loop.index`（从 1 起）、`loop.first` / `loop.last`、`loop.length`、`loop.revindex`。空列表用 `else` 兜底：

```html
{% for post in site.posts %}
  <a href="{{ post.url }}">{{ post.title }}</a>
{% else %}
  <p>还没有文章。</p>
{% endfor %}
```

被迭代的值做了宽松处理：null 视为空数组；字符串按字符拆；**普通对象按 `{ key, value }` 拆成条目**。

## include 与 extend

```html
{% include "partials/toc.html" %}
```

解析顺序 `layouts/` → `partials/` → 主题根目录，片段与主模板共享上下文，可递归 include。

继承用 extend + 同名 block 覆盖：

```html
{% extend "base.html" %}
{% block main %}
  <article><h1>{{ page.title }}</h1>{{ content | safe }}</article>
{% endblock %}
```

约定：只覆盖同名 block；父模板没有同名 block 时子模板内容**追加到末尾**（拼错 block 名不报错但位置不对）；不支持嵌套 block 与 `super()`；继承链上限 10 层。

## 模板上下文

每次渲染拿到的顶层键：

- `site`——配置 + 聚合数据：`site.posts`（文章列表）、`site.tags` / `site.categories` / `site.series`（各含 name/url/count）、`site.nav`、`site.assets`、`site.base`
- `page`——当前页：`page.url` / `page.title` / `page.date` / `page.tags` / `page.category`、`page.excerpt`、`page.readTime`、`page.toc`
- `page.data`——最有用的一层：插件注入的跨页数据（`related` 相关文章、`prev` / `next` 上下篇）都挂这里
- `content`——正文 HTML
- `headings`——标题数组 `{ level, text, id }`
- `pagination`——仅列表页有

## 一条重要规则：链接不用拼 base

模板里放心写根绝对路径 `<a href="/about/">`——`site.base` 前缀由引擎在**渲染出口统一补**，覆盖模板、Markdown、手写 HTML 三类来源。自己拼 `site.base + 'about/'` 反而会双重前缀。

下一篇：[主题开发](/2026/11/21/xfmpress-theme/)。
