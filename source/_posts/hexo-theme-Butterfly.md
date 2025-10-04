---
title: hexo-theme-Butterfly 主题安装与基础配置操作教程
cover: 'https://img.lovou.eu.org/file/1759567275346_cover.png'
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-10-5
updated:
tags: hexo-theme
categories: Hexo
keywords:
description:
top:
top_img:
comments:
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
ai:
---
<div class="video-container"><iframe width="300" height="150" src="https://www.youtube.com/embed/LM3-htR23AU" title="Hexo | 基础配置 | Butterfly主题安装 | 文章发布 | 保姆级教程" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
<style>.video-container { position: relative; padding-top: 56.25%; } .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style>

# 🌟前提条件：
    -  ✅ 已部署 Hexo 项目
    -  🔗 安装教程参考：Hexo站点搭建 | GitHub部署 | Cloudflare Pages发布 | 保姆级教程
# 🎨 安装 Butterfly 主题
## 🔽 下载主题（推荐方式：Git 克隆）
    -  国内用户建议使用 Gitee：
```bash
git clone -b master https://gitee.com/immyw/hexo-theme-butterfly.git themes/butterfly
```
    -  网络环境较好可使用 GitHub：
```bash
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```
# ⚙️ 应用主题
    -  修改 Hexo 根目录下的 _config.yml：
```
theme: butterfly
```
# 📦 安装依赖插件
    -  如果未安装 pug 与 stylus 渲染器，请执行：
```
npm install hexo-renderer-pug hexo-renderer-stylus --save
```
# 📁 配置建议（可选）
为了减少时间上维护或主题升级引起的混乱，建议使用外部配置文件管理主题配置：

    - 在 Hexo 根目录创建文件 _config.butterfly.yml
    - 将 themes/butterfly/_config.yml 中所有内容复制到该文件
运行以下命令来快捷操作
```
copy "themes\butterfly\_config.yml" "_config.butterfly.yml"
```
# 🌟 子模块配置
1. 创建 .gitmodules 文件
运行创建命令：
```bash
echo. > .gitmodules
```
编辑 *.gitmodules* 文件，添加以下内容，确保路径和 URL 正确：
```
[submodule "themes/butterfly"]
  path = themes/butterfly
  url = https://github.com/jerryc127/hexo-theme-butterfly.git
```
2. 添加 *.gitmodules* 文件到版本控制
```bash
git add .gitmodules
git commit -m "Add .gitmodules file"
git push origin main
```
3. 初始化和更新子模块
初始化和更新子模块：
```bash
git submodule init   # 初始化子模块
git submodule update --recursive   # 拉取子模块代码
```
4. 检查子模块状态
确认子模块是否正确同步：
```bash
git submodule status
```
5. 推送到远程仓库
将子模块变更推送到远程仓库：
```bash
git add themes/butterfly
git commit -m "Add butterfly theme as submodule"
git push origin main
```
# 🛠️ 基础配置
    - Hexo 全局配置文件：**_config.yml** 
        > 官方文档：https://hexo.io/zh-cn/docs/configuration

    - Butterfly 主题配置文件：**_config.butterfly.yml**
        > 官方文档：https://butterfly.js.org/

# ✍️ 文章发布说明
✅ 推荐编辑器
Hexo 默认使用 Markdown 格式撰写文章，推荐使用以下编辑器：

    - **VSCode**：功能强大，支持多种语言和插件扩展
    - **MarkText**：轻量级、开源、免费（目前仅英文界面）
安装包我已上传至云盘，可自取：[云盘传送](https://pan.nbvil.com/)

# 🔧 创建与编辑文章
1. 打开终端，进入 Hexo 项目根目录
2. 创建文章：
```bash
hexo new "posts"       # 创建一篇文章 posts.md
```
文章文件会生成在 **/source/_posts/** 目录下

使用 Markdown 编辑器打开 posts.md，编写文章内容
> 💡 小技巧：可以先在 Word 或 TXT 中撰写内容，再使用 AI（如 DeepSeek）转换为 Markdown 格式，粘贴进 Hexo 文章中。

# 🚀 发布文章
依次执行以下命令：
```bash
hexo generate        # 生成静态文件
hexo deploy          # 部署至远程仓库

git add .            # 添加所有更改到本地 git

git commit -m "update"   # 描述本次更改

git push origin main     # 推送到远程仓库
```
等待上传成功后，刷新站点即可看到文章上线。