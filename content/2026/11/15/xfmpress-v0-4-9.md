---
lang: zh-CN
translationKey: xfmpress-v0-4-9
title: xfmpress v0.4.9：CLI 与开发服务器的八处「沉默的错误」
date: 2026-11-15 08:00:00
description: 一次针对 CLI 与开发服务器的复查，修复八处「工具不报错但结果错误」的场景，涵盖配置识别、BOM、日期时区、脚手架冲突与子路径下的热更新。
category: 更新日志
tags: [xfmpress, 更新日志]
---

v0.4.9 是一次系统性的复查：对 CLI 和开发服务器逐条过一遍，专挑那些「工具开心地给出了错误结果」的场景。这八处修复的共同点是——旧版本在这八种情况下都不报错，你直到某个细节对不上才发现不对劲。

## 这一版在解决什么

「宁可报错，不要静默出错」是这版的原则。空目录里 `xfm new` 创建完文件再让你撞上构建失败、BOM 吃掉整个 front-matter、日期时区让文章早一天发布……这些问题都属于同一类：工具自作主张，而错误的代价由使用者承担。v0.4.9 把它们逐个变成「要么正确，要么明确报错」。

## 变了什么

### Fixed

- **站点目录外执行 `xfm new` 现在会报错**。旧版在空目录里照样创建 `content/posts/<slug>.md`，还提示「可以直接构建了」，而构建本身会因缺少主题而失败。现在它会停下并提示使用 `xfm create`，什么都不创建。
- **`xfm create` 认识所有配置形态**。旧版只检查 `xfm.config.mjs`，如果你的站点用的是 `xfm.config.js` / `.cjs` / `.json`，或 `package.json` 里的 `"xfm"` 字段，不带 `--force` 执行 `xfm create` 会直接覆盖 `content/index.md`、`content/about.md` 和初始文章。`hasConfig()` 现在同时服务于这个检查和开发服务器的配置监听。
- **UTF-8 BOM 不再吞掉 front-matter**。几个 Windows 编辑器默认以「带 BOM 的 UTF-8」保存文件，旧版下整块 front-matter 失效：标题回退成文件路径，`date` / `layout` / `tags` 全部消失。现在查找 `---` 之前会先剥掉 BOM。
- **layout 以脚手架为准，反向冲突也会被纠正**。如果 `scaffolds/draft.md` 里残留 `draft: false` 或 `layout: page.html`（从别的模板复制时很常见），旧版会产出一个「已发布」的页面，而 CLI 却报告它不会出现在构建输出里。现在 `layout`、`type`、`draft` 按请求的 layout 强制写入；反过来，post 脚手架里残留的 `draft: true` 也会被写回 `false`，两者不再互相矛盾。
- **`--dir=` 的反斜杠被规范化**。`xfm new page about --dir=docs\sub` 此前在摘要里回显 `/docs\sub/about/`，真实 URL 却是 `/docs/sub/about/`。路径在输出前统一规范化，且 `--dir` 拒绝跳出内容目录。
- **只有日期的 front-matter 按本地日历日处理**。按规范 `new Date('2026-11-10')` 是 UTC 零点，UTC 以西的所有站点都会把这类文章的日期渲染成早一天。只有日期和 `YYYY-MM-DD HH:mm` 形式的值现在显式按本地时间构造；带时间戳的值保持原样。
- **开发服务器支持子路径部署**（`site.base: '/blog/'`）：热更新事件流跟随 base（`/blog/__xfm/events`），404 页面链接带上前缀，半关闭的浏览器连接不再中断重建，`xfm.config.cjs` / `config.js` 也像其他配置文件一样被监听，而不是被默默忽略。

### Added

- `xfm create` 生成的站点自带 `.gitignore`（`node_modules/`、`dist/`、`.xfm/` 和系统垃圾文件），第一次构建不再刷屏 `git status`；已有的 `.gitignore` 不会被改动。
- 测试从 120 增加到 128，覆盖 BOM、日期解析、脚手架/layout 冲突、`--dir` 规范化、非站点目录守卫、配置识别和 `.gitignore`。

## 升级要不要动手

不需要改配置，升上去就行。但有两处行为差异值得留意：一是日期只有 `YYYY-MM-DD` 的文章，渲染日期可能与旧版相差一天（新行为才是你想要的）；二是如果你的 `xfm create` 流程依赖「覆盖已有站点」，现在必须显式加 `--force`。命令细节见 [CLI 教程](/2026/11/21/xfmpress-cli/)。
