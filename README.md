# 学习Hexo建站

- 搭建在 GitHub Pages 的小破站 [学习Hexo](https://xfm0797.github.io)
- 记录些建站过程中遇到的问题，学习如何解决方法，优化思路
- 本站有使用 **Cloudflare Pages** 托管，保证在任何地方都可以访问

## 生成器

站点使用 [xfmpress](https://github.com/xfm0797/xfm)（命令 `xfm`）构建 —— 一个零依赖的静态站点生成器。

## 目录结构

```
├── xfm.config.mjs      # 站点配置
├── content/            # 内容目录（目录结构决定 URL）
│   ├── about.md        # 关于页（/about/）
│   └── YYYY/MM/DD/     # 文章，URL 为 /YYYY/MM/DD/<slug>/（与原 Hexo 永久链接一致）
├── scaffolds/          # xfm new 的脚手架模板
└── dist/               # 构建产物（gitignore）
```

## 常用命令

```bash
npm install        # 安装 xfmpress
npm run dev        # 本地开发（毫秒级热更新，http://127.0.0.1:4173）
npm run build      # 生产构建，产物在 dist/
npm run clean      # 清理构建产物
```

## 写新文章

```bash
npx xfm new "文章标题"          # content/posts 下新建文章
```

或直接在 `content/YYYY/MM/DD/` 下新建 `.md` 文件，front-matter 参考 `scaffolds/post.md`。
