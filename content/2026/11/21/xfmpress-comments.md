---
lang: zh-CN
translationKey: xfmpress-comments
title: 评论系统：一套插件接入十家评论服务
date: 2026-11-21 08:45:00
description: xfm-plugin-comments 统一接入 giscus、waline、twikoo、disqus 等十家评论系统，provider 一键切换、按 provider 校验必填项、样式按需注入
category: xfmpress
tags: [xfmpress, 教程]
series: xfmpress使用教程
---

# 一套插件，十家评论

静态站点加评论不需要十个插件——`xfm-plugin-comments` 把十家评论服务收进一个 `comments.provider` 开关：

| provider | 说明 | 必填配置 |
| --- | --- | --- |
| `giscus` | 基于 GitHub Discussions，程序员博客首选 | `repo`、`repoId`、`category`、`categoryId` |
| `beaudar` | 基于 GitHub Issues 的中文评论 | `repo` |
| `utterances` | GitHub Issues 评论的鼻祖 | `repo` |
| `disqus` | 老牌国际评论服务 | `shortname` |
| `waline` | 自部署、国内访问友好 | `serverURL` |
| `twikoo` | 自部署、轻量 | `envId` |
| `valine` | 基于 LeanCloud | `appId`、`appKey` |
| `gitalk` | GitHub Issues 另一实现 | `clientID`、`clientSecret`、`repo` |
| `artalk` | 自托管、多站点管理 | `server` |
| `cusdis` | 隐私友好、无追踪 | `appId`、`host` |

# 安装与配置

```bash
npm i -D xfm-plugin-comments
```

```js
// xfm.config.mjs
export default {
  comments: {
    provider: 'giscus',        // 换一行就能切换评论服务
    repo: 'xfm0797/xfm0797.github.io',
    repoId: 'R_kgDOxxxxxxx',
    category: 'Announcements',
    categoryId: 'DIC_kwDOxxxxxxx',
  },
  // ...
};
```

换评论服务只需要改 `provider` 和对应必填项，主题模板一行都不用动。

# 评论绑定什么：identifier

`comments.identifier` 决定一条评论串绑在页面的哪个标识上：

- `path`（默认）—— 绑 URL 路径，路径变了评论会"丢"
- `url` —— 绑完整 URL（含域名），适合多域名部署
- `title` —— 绑页面标题，URL 怎么变评论都跟标题走

# 必填项校验：宁可跳过，不出残件

漏配 `repoId` / `envId` 等必填项时，插件**警告并跳过挂载**，而不是往页面里塞一个必然报错的残缺组件；`provider` 写错会直接列出支持的名称。构建不会失败，但日志会告诉你哪里没配对。

# 样式按需注入

Waline、Gitalk、Artalk 这类需要自带样式的服务，插件**只在真正挂载评论组件的页面**往 `<head>` 注入对应 CSS——列表页、归档页不会被拖累。

# 页面级开关

```yaml
---
comments: false   # 本页不出评论区（关于页、友链页常用）
---
```

# 主题侧的挂载点

插件约定：文章页模板里预留 `page.data.comments` 判断即可。本站主题（xfmpress-theme-anziyu）在文章卡片底部挂载评论区，未来启用时补一段配置就能上线。

::: tip
从 `xfm-plugin-giscus` 升级上来的站点无需改配置——包名变了，`provider: 'giscus'` 的配置键不变，重装一次 `xfm-plugin-comments` 即可。
:::

---

**下一篇**：[数学公式与图表](/2026/11/21/xfmpress-math-mermaid/) —— KaTeX 构建期渲染与 Mermaid 图表。
