---
lang: zh-CN
translationKey: xfmpress-plugin-comments
title: 评论系统：十家评论服务一个开关
date: 2026-11-21 22:05:00
description: xfm-plugin-comments 把 giscus、beaudar、waline、twikoo、disqus 等十家评论服务收进一个 comments.provider 开关，按 provider 校验必填项，只挂文章页，换服务不改模板
category: 官方插件
tags: [xfmpress, 插件]
---

给静态站加评论，过去要按服务各装一个插件。0.4.16 起，原来的 `xfm-plugin-giscus` 改名为 `xfm-plugin-comments`，十家评论服务收进一个 `comments.provider` 开关——换服务不用换插件、不用动模板。本站自己就在用它挂 Waline。

## 它解决什么

内置十种 provider：`giscus`（默认）、`beaudar`（giscus 的国内可访问版）、`utterances`、`disqus`、`waline`、`twikoo`、`valine`、`gitalk`、`artalk`、`cusdis`。写 `github` 会被当作 `giscus` 处理。

必填项按 provider 校验：giscus 和 beaudar 要 `repo`、`repoId`；disqus 要 `shortname`；waline 要 `serverURL`；twikoo 要 `envId`；valine 要 `appId`、`appKey`；gitalk 要 `clientID`、`clientSecret`、`repo`、`owner`、`admin`；artalk 要 `server`；cusdis 要 `appId`。缺了或写错 provider，构建日志会警告且页面保持原样——拼错 `repoId` 不会悄悄上线一个坏掉的小组件。

## 安装与配置

```bash
npm i -D xfm-plugin-comments
```

如果你在用旧的 `xfm-plugin-giscus`：卸掉旧包装新包即可，配置键仍是 `comments`，`provider: 'giscus'` 的行为完全不变。

```js
// xfm.config.mjs
export default {
  comments: {
    provider: 'waline',      // 十选一，默认 giscus
    serverURL: 'https://waline.example.com',
    title: '评论',            // 区块标题，设 '' 隐藏
    identifier: 'path',      // path（默认）| url | title
    dev: false,
  },
};
```

各 provider 的专属字段（giscus 的 `category`、`categoryId`、`mapping`、`theme`、`lang` 等）也直接写在 `comments` 下，详见包内 README。

## 运行时行为

生产构建时，插件在每篇文章的 `</article>` 之前（没有就找 `</main>`，最后退到 `</body>`）插入一个 `.comments` 区块：标题、挂载点和 provider 脚本都在里面。需要样式表的 provider（Waline、Gitalk、Artalk）会在用到它的页面的 `<head>` 里注入一次 CSS。giscus 和 beaudar 通过 `postMessage` 跟随站点明暗主题切换，Waline 按 CSS 选择器切换，Cusdis 走 `auto`。

只有文章页会挂评论：页面要有 `date`，且不是 `type: page` / `type: index`——首页、归档、标签页、独立页面一律没有。单页关闭写 front-matter `comments: false`；想在模板里自定位置就放 `<div data-xfm-comments></div>`，插件此时只补脚本不重复建容器。模板里还能拿到 `site.comments`（含 `provider`、`title`）。

## 注意事项

- 本站实例：Waline 的 `serverURL: 'https://waline.xfm.qzz.io'`。末尾不要带斜杠——Waline 客户端会自己拼路径，尾斜杠会拼出 `//api/...` 被 308 重定向。
- `identifier` 默认 `path`，评论绑定站点内路径，换域名不影响已有评论；改成 `url` 绑定完整 URL，改成 `title` 则跟标题走。
- 本地 `xfm dev` 默认不渲染评论区，`comments.dev: true` 可打开。
