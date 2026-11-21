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

插件默认把整个区块插到 `</article>` 之前；想自己决定位置，就在模板里留一个带 `data-xfm-comments` 的空容器，插件就只补脚本、不再造容器：

```html
{% if site.comments %}
<section class="post-comments">
  <h2 class="section-title">{{ page.lang == 'en' ? 'Comments' : '评论' }}</h2>
  <!-- Waline 靠 #waline 定位，自建容器时 id 不能少 -->
  <div id="waline" data-xfm-comments></div>
</section>
{% endif %}
```

本站（xfmpress-theme-anziyu）就挂在正文卡片底部，配置在 `xfm.config.mjs` 的 `comments` 段：

```js
comments: {
  provider: 'waline',
  serverURL: 'https://waline.xfm.qzz.io',   // 末尾不要带 /，否则会拼出 //api/... 被 308 重定向
  lang: 'zh-CN',
  login: 'enable',
  requiredMeta: ['nick', 'mail'],
  commentSorting: 'newest',
}
```

::: tip 多语言站
`comments.lang` 是站点级常量，英文页不会自己切成英文界面。本站用十几行本地插件（`plugins/comments-lang.js`）在 `transformHtml` 阶段把 `init({...})` 里的 `lang` 换成 `page.lang`，评论串仍按路径分开（`/xxx/` 与 `/en/xxx/` 各一份）。
:::

::: tip
从 `xfm-plugin-giscus` 升级上来的站点无需改配置——包名变了，`provider: 'giscus'` 的配置键不变，重装一次 `xfm-plugin-comments` 即可。
:::

---

**下一篇**：[数学公式与图表](/2026/11/21/xfmpress-math-mermaid/) —— KaTeX 构建期渲染与 Mermaid 图表。
