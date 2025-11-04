---
title: hexo+github博客快速搭建基础步骤及设置
cover: https://img.lovou.eu.org/file/1762239638729_hexo-github-lovou.png
toc: true
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-11-04 14:51:20
updated:
tags:
- Hexo
- Github
- 搭建
categories: Hexo
keywords: hexo+github博客快速搭建基础步骤及设置
description: hexo+github博客快速搭建基础步骤及设置
top:
top_img:
comments:
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
以下是使用 Hexo + GitHub 快速搭建博客的基础步骤及设置指南，适合新手入门：


### **一、环境准备**
1. **安装 Node.js**  
   Hexo 基于 Node.js 运行，需先安装：  
   - 官网下载：[Node.js](https://nodejs.org/)（推荐 LTS 版本，含 npm 包管理器）  
   - 验证安装：终端输入 `node -v` 和 `npm -v`，显示版本号即成功。

2. **安装 Git**  
   用于管理代码和部署到 GitHub：  
   - 官网下载：[Git](https://git-scm.com/)  
   - 验证安装：终端输入 `git --version`。

3. **GitHub 账号与仓库创建**  
   - 注册 GitHub 账号后，新建仓库（Repository），仓库名必须为：  
     `你的用户名.github.io`（例如 `xxx.github.io`），否则无法正常访问。


### **二、Hexo 初始化与本地配置**
1. **安装 Hexo 脚手架**  
   打开终端，执行以下命令全局安装 Hexo：  
   ```bash
   npm install -g hexo-cli
   ```

2. **初始化博客项目**  
   选择一个本地文件夹（如 `Blog`），执行：  
   ```bash
   hexo init blog  # 创建名为 blog 的文件夹并初始化
   cd blog         # 进入项目目录
   npm install     # 安装依赖
   ```

3. **本地预览博客**  
   执行以下命令启动本地服务器：  
   ```bash
   hexo clean     # 清理缓存（可选，首次可跳过）
   hexo g         # 生成静态文件（g = generate）
   hexo s         # 启动服务器（s = server）
   ```  
   浏览器访问 `http://localhost:4000` 即可看到默认博客页面。


### **三、配置部署到 GitHub**
1. **安装部署插件**  
   在博客目录下执行：  
   ```bash
   npm install hexo-deployer-git --save
   ```

2. **修改配置文件**  
   打开博客目录下的 `_config.yml`（主配置文件），找到 `deploy` 部分，修改为：  
   ```yaml
   deploy:
     type: git
     repo: https://github.com/你的用户名/你的用户名.github.io.git  # 仓库地址（可从 GitHub 仓库复制 HTTPS 链接）
     branch: main  # 分支名（GitHub 新仓库默认分支为 main，旧仓库可能是 master，需对应）
   ```  
   注意：配置文件中 `:` 后需有空格，否则会报错。

3. **部署到 GitHub**  
   执行以下命令部署：  
   ```bash
   hexo clean     # 清理旧文件
   hexo g         # 重新生成
   hexo d         # 部署（d = deploy）
   ```  
   首次部署需输入 GitHub 账号密码（或使用 SSH 密钥免密，推荐后者，见进阶步骤）。

4. **访问博客**  
   部署成功后，等待几分钟，访问 `https://你的用户名.github.io` 即可看到博客。


### **四、基础设置（必做）**
1. **修改博客基本信息**  
   编辑 `_config.yml`，修改以下内容：  
   ```yaml
   title: 你的博客名称    # 博客标题
   subtitle: 副标题      # 可选
   description: 博客描述  # 用于 SEO
   author: 你的名字      # 作者名
   language: zh-CN       # 语言（中文）
   timezone: Asia/Shanghai  # 时区
   ```

2. **设置主题（以默认主题为例）**  
   Hexo 默认主题为 `landscape`，如需更换主题：  
   - 在 [Hexo 主题商店](https://hexo.io/themes/) 选择主题，克隆到 `themes` 文件夹：  
     ```bash
     git clone 主题仓库地址 themes/主题名
     ```  
   - 编辑 `_config.yml`，修改 `theme: 主题名`（如 `theme: next`）。


### **五、常用操作**
1. **新建文章**  
   ```bash
   hexo new "文章标题"  # 在 source/_posts 下生成 Markdown 文件
   ```  
   编辑 Markdown 文件即可撰写文章，支持 Markdown 语法和 Hexo 标签（如图片、代码块）。

2. **发布文章**  
   写完后执行部署命令：  
   ```bash
   hexo clean && hexo g && hexo d
   ```

3. **创建页面（如“关于我”）**  
   ```bash
   hexo new page "about"  # 在 source/about 下生成 index.md
   ```


### **六、进阶优化（可选）**
- **SSH 免密部署**：生成 SSH 密钥并添加到 GitHub，避免每次输入密码（[参考 GitHub 文档](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)）。
- **自定义域名**：在 GitHub 仓库设置中绑定自己的域名（需购买域名并解析）。
- **插件扩展**：安装评论插件（如 `gitalk`）、统计插件（如 `busuanzi`）等增强功能。


通过以上步骤，即可快速搭建一个可用的 Hexo 博客并部署到 GitHub，后续可根据需求自定义主题和功能。