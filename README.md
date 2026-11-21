# XFMpress 官网

[https://xfm0797.github.io](https://xfm0797.github.io) —— 静态站点生成器 **XFMpress** 的官方网站。

## 关于本站

- 由 [xfmpress](https://github.com/xfm0797/xfm)（命令 `xfm`）构建——一个零依赖的 Node.js 静态站点生成器
- 收录 xfmpress 的使用教程，按知识点拆分为 11 篇，[按顺序阅读](https://xfm0797.github.io/series/xfmpress%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B/)
- 同时保留历史文章（Hexo 建站、主题配置等），文章永久链接格式 `/YYYY/MM/DD/<slug>/`
- 部署在 GitHub Pages，并通过 **Cloudflare Pages** 双线托管，保证在任何地方都可以访问

## 目录结构

```
├── xfm.config.mjs      # 站点配置（标题、导航、分页等）
├── content/            # 内容目录（目录结构决定 URL）
│   ├── index.md        # 首页列表
│   ├── about.md        # 关于页（/about/）
│   └── YYYY/MM/DD/     # 文章，URL 为 /YYYY/MM/DD/<slug>/
├── scaffolds/          # xfm new 的脚手架模板
└── dist/               # 构建产物（gitignore）
```

## 本地开发

```bash
npm install        # 安装 xfmpress 与插件（rss / sitemap）
npm run dev        # 开发服务器（毫秒级热更新，http://127.0.0.1:4173）
npm run build      # 生产构建，产物在 dist/
npm run clean      # 清理产物与缓存
```

## 写新文章

```bash
npx xfm new "文章标题"    # 新建文章
npx xfm new page 标题     # 新建页面
npx xfm new draft 标题    # 新建草稿
```

或直接在 `content/YYYY/MM/DD/` 下新建 `.md` 文件，front-matter 参考 `scaffolds/post.md`。分类与系列用 `category` / `series` 字段聚合。

## 自动部署

推送 `main` 分支后，GitHub Actions（`.github/workflows/deploy.yml`）自动执行 `npm ci → xfm build`，并将 `dist/` 发布到 `gh-page` 分支，无需手动部署。
