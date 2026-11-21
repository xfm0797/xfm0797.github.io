---
lang: zh-CN
translationKey: xfmpress-plugin-redirect
title: 跳转插件：旧地址生成跳转页，链接永不 404
date: 2026-11-21 23:15:00
description: 在每个旧地址生成极小的跳转页，meta refresh、JS 跳转与可见链接三条腿走路，带 rel=canonical 与 noindex,follow
category: 官方插件
tags: [xfmpress, 插件]
---

文章换了地址，旧链接不会跟着消失：外站引用、搜索引擎索引、读者的书签都还指着老地方。`xfm-plugin-redirect` 在每个旧地址生成一个极小的跳转页，让这些入口照常工作，而不是撞上 404。

## 它解决什么

迁移文章、调整 URL 结构、从其他博客系统搬家，都会制造一批失效地址。这个插件在构建时把旧地址映射到新地址，产物是真正的 HTML 文件，静态托管直接可用。

跳转页做了三层保险，任何环境都能跳：

1. `meta refresh`——禁 JS 的浏览器也能跳
2. `location.replace`——JS 环境下瞬时跳转且不污染历史记录
3. 一个可见链接——万一都没生效，读者手动点一下就能过去

## 安装与配置

```bash
npm i -D xfm-plugin-redirect
```

两种声明方式，按场景选：

```js
// xfm.config.mjs
export default {
  plugins: ['redirect'],
  redirects: {
    '/old-post/': '/posts/new-post/',
    '/2020/01/hello.html': 'https://example.com/hello/',
  },
};
```

- **全局映射**：在配置的 `redirects` 里写死「旧地址 → 新地址」，适合整站级别的规则。目标可以是站内路径，也可以是 `https://` 外链
- **跟着页面走**：在文章自己的 front-matter 写 `redirect_from`（或其别名 `aliases`），改地址时最顺手——删掉文章，跳转也跟着消失：

```yaml
---
redirect_from:
  - /old-post/
  - /2020/01/hello.html
---
```

## 产物与行为

每个旧地址生成一个 HTML 文件，按内核的 URL 规则落盘（`/x/` 对应 `x/index.html`，`.html` 结尾原样保留）。跳转页带 `rel=canonical` 指向新地址、`robots` 为 `noindex,follow`——搜索引擎会更新索引而不是收录一堆重复页。

旧地址会先规范化（补前导斜杠、去掉 query 和 hash、`/x` 视作 `/x/`），写的时候不用纠结格式。

## 注意事项

- 如果某个旧地址上本来就有真实页面，插件会跳过并告警，绝不覆盖真实内容
- 某篇想临时关掉跳转，front-matter 写 `redirect: false`
- 跳转页解决的是「人还能找到内容」，搜索引擎权重迁移建议配合 `seo` 插件的 canonical 输出；本站从 Hexo 迁来后下掉了不少旧文章，这类场景正适合它。URL 规则的细节见[内容组织](/2026/11/21/xfmpress-content/)
