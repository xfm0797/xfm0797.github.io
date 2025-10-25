---
title: hexo-theme-Fluid主题安装及配置方法
cover: 'https://img.lovou.eu.org/file/1759567275346_cover.png'
toc: true
swiper_index: 10
top_group_index: 10
background: '#fff'
date: 2025-10-07 14:24:55
updated:
tags:
- hexo-theme-fluid
- theme
- hexo-theme
categories: theme
keywords: hexo-theme-Fluid主题安装及配置方法
description: hexo-theme-Fluid主题安装及配置方法
top:
top_img: https://img.lovou.eu.org/file/1759818579600_hexo-theme-Fluid.png
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

hexo-theme-Fluid 是一款以「内容优先」为核心的极简风格 Hexo 主题，设计简洁、加载快速，且配置轻量化，非常适合文字类博客（如随笔、笔记、散文等）。以下是详细的安装及配置步骤：

### **一、安装前的准备**

1. **确保 Hexo 环境正常**  

   已安装 Node.js、Git，并初始化 Hexo 博客（若未初始化，参考之前的教程：`hexo init myblog && cd myblog && npm install`）。  

2. **检查 Hexo 版本**  

   Fluid 要求 Hexo 版本 ≥ 5.0.0，终端执行 `hexo -v` 确认版本，若低于要求，升级 Hexo：  

   

```bash
   npm install hexo@latest --save
```

   

### **二、安装 Fluid 主题**

#### 1. 克隆主题到本地

进入 Hexo 博客根目录（如 `myblog`），执行以下命令克隆 Fluid 主题到 `themes/fluid` 文件夹：  

```bash
git clone https://github.com/fluid-dev/hexo-theme-fluid.git themes/fluid
```

#### 2. 安装主题依赖

Fluid 依赖部分插件，需手动安装：  

```bash
npm install hexo-theme-fluid@latest --save
```

### **三、启用主题**

编辑 Hexo 根目录的 **全局配置文件** `_config.yml`，将 `theme` 字段改为 `fluid`：  

```yaml
theme: fluid  # 替换默认主题（如 landscape）
```

### **四、核心配置（关键步骤）**

Fluid 的配置通过两个文件实现：  

- **主题默认配置**：`themes/fluid/_config.yml`（存放主题默认设置，不建议直接修改）。  

- **用户自定义配置**：建议复制主题配置文件到根目录，命名为 `_config.fluid.yml`（优先级更高，且更新主题时不会被覆盖）。  

#### 1. 复制配置文件（推荐）

在博客根目录执行：  

```bash
cp themes/fluid/_config.yml _config.fluid.yml
```

后续所有配置均在 `_config.fluid.yml` 中修改。

#### 2. 基础配置（必改项）

打开 `_config.fluid.yml`，修改以下核心配置：  

##### （1）网站基本信息

```yaml
# 网站标题、副标题（显示在首页顶部）

title: 你的博客名称  

subtitle: "副标题/一句话描述"  



# 作者信息（显示在侧边栏/底部）

author: 你的名字  

avatar: /img/avatar.jpg  # 头像路径（图片需放在 source/img/ 文件夹）
```

##### （2）导航菜单

配置顶部导航栏的菜单（如首页、分类、标签等）：  

```yaml
menu:

  首页: / || fa fa-home

  分类: /categories/ || fa fa-th

  标签: /tags/ || fa fa-tags

  关于: /about/ || fa fa-user

  # 可选：添加自定义页面（如“归档”）

  # 归档: /archives/ || fa fa-archive
```

- 菜单对应的页面需要手动创建（例如「关于页」）：  



```bash
  hexo new page "about"  # 在 source/about/index.md 中编辑内容
```

  

##### （3）首页设置

Fluid 首页默认显示文章列表，可配置顶部图和描述：  

```yaml
index:

  # 首页顶部图（建议尺寸 1920×1080）

  top_img: /img/index_top.jpg  # 图片放 source/img/ 文件夹

  # 首页描述文字（显示在标题下方）

  description:

    - 一行描述文字

    - 可换行显示

    - 支持 Markdown 语法（如 **加粗**）
```

##### （4）URL 配置（影响资源加载）

确保 Hexo 根目录 `_config.yml` 中的 `url` 配置正确（部署后的博客地址）：  

```yaml
# 根目录 _config.yml 中

url: https://yourname.github.io  # 替换为你的博客地址（如 GitHub Pages 地址）
```

#### 3. 功能配置（按需开启）

##### （1）评论系统（以 Waline 为例，轻量且支持匿名）

1. 先去 [Waline 官网](https://waline.js.org/) 注册并获取 `serverURL`（评论后台地址）。  

2. 在 `_config.fluid.yml` 中配置：  

```yaml
  comments:

      enable: true

      type: waline

      waline:

      serverURL: https://your-waline-server.example.com  # 你的 Waline 服务地址

      placeholder: 来说点什么吧~  # 评论框提示文字
```



##### （2）代码高亮

Fluid 内置代码高亮，支持多种主题（如 `atom-one-dark`、`github`）：  

```yaml
code:

  highlight:

    theme: atom-one-dark  # 代码高亮主题

    line_number: true     # 显示行号

    wrap: true            # 代码过长时自动换行
```

##### （3）社交链接（显示在侧边栏或底部）

```yaml
social:

  GitHub: https://github.com/yourname || fa fa-github

  知乎: https://zhihu.com/people/yourname || fa fa-book

  邮箱: mailto:your@email.com || fa fa-envelope

  # 图标来自 Font Awesome，可自行添加其他平台
```

##### （4）文章版权声明

自动在文章末尾添加版权信息：  

```yaml
copyright:

  enable: true

  # 版权声明内容（支持 Markdown）

  content: "本文采用 <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a> 许可协议，转载请注明出处。"
```

### **五、本地预览效果**

配置完成后，执行以下命令本地预览：  

```bash
hexo clean  # 清理缓存（确保新配置生效）
hexo g      # 生成静态文件
hexo s      # 启动本地服务器
```

浏览器访问 `http://localhost:4000`，确认主题样式、菜单、功能是否正常。

### **六、更新主题**

若 Fluid 发布新版本，可更新主题文件（不影响 `_config.fluid.yml` 中的自定义配置）：  

```bash
# 进入主题目录
cd themes/fluid
# 拉取最新代码
git pull
# 返回根目录，重新生成
cd ..
hexo clean && hexo g
```

hexo-theme-Fluid 是一款以「内容优先」为核心的极简风格 Hexo 主题，设计简洁、加载快速，且配置轻量化，非常适合文字类博客（如随笔、笔记、散文等）。以下是详细的安装及配置步骤：

### **一、安装前的准备**

1. **确保 Hexo 环境正常**  

   已安装 Node.js、Git，并初始化 Hexo 博客（若未初始化，参考之前的教程：`hexo init myblog && cd myblog && npm install`）。  

2. **检查 Hexo 版本**  

   Fluid 要求 Hexo 版本 ≥ 5.0.0，终端执行 `hexo -v` 确认版本，若低于要求，升级 Hexo：  

  

```bash
   npm install hexo@latest --save
```



### **二、安装 Fluid 主题**

#### 1. 克隆主题到本地

进入 Hexo 博客根目录（如 `myblog`），执行以下命令克隆 Fluid 主题到 `themes/fluid` 文件夹：  

```bash
git clone https://github.com/fluid-dev/hexo-theme-fluid.git themes/fluid
```

#### 2. 安装主题依赖

Fluid 依赖部分插件，需手动安装：  

```bash
npm install hexo-theme-fluid@latest --save
```

### **三、启用主题**

编辑 Hexo 根目录的 **全局配置文件** `_config.yml`，将 `theme` 字段改为 `fluid`：  

```yaml
theme: fluid  # 替换默认主题（如 landscape）
```

### **四、核心配置（关键步骤）**

Fluid 的配置通过两个文件实现：  

- **主题默认配置**：`themes/fluid/_config.yml`（存放主题默认设置，不建议直接修改）。  

- **用户自定义配置**：建议复制主题配置文件到根目录，命名为 `_config.fluid.yml`（优先级更高，且更新主题时不会被覆盖）。  

#### 1. 复制配置文件（推荐）

在博客根目录执行：  

```bash
cp themes/fluid/_config.yml _config.fluid.yml
```

后续所有配置均在 `_config.fluid.yml` 中修改。

#### 2. 基础配置（必改项）

打开 `_config.fluid.yml`，修改以下核心配置：  

##### （1）网站基本信息

```yaml
# 网站标题、副标题（显示在首页顶部）

title: 你的博客名称  

subtitle: "副标题/一句话描述"  



# 作者信息（显示在侧边栏/底部）

author: 你的名字  

avatar: /img/avatar.jpg  # 头像路径（图片需放在 source/img/ 文件夹）
```

##### （2）导航菜单

配置顶部导航栏的菜单（如首页、分类、标签等）：  

```yaml
menu:

  首页: / || fa fa-home

  分类: /categories/ || fa fa-th

  标签: /tags/ || fa fa-tags

  关于: /about/ || fa fa-user

  # 可选：添加自定义页面（如“归档”）

  # 归档: /archives/ || fa fa-archive
```

- 菜单对应的页面需要手动创建（例如「关于页」）：  

  

```bash
  hexo new page "about"  # 在 source/about/index.md 中编辑内容
```

  

##### （3）首页设置

Fluid 首页默认显示文章列表，可配置顶部图和描述：  

```yaml
index:

  # 首页顶部图（建议尺寸 1920×1080）

  top_img: /img/index_top.jpg  # 图片放 source/img/ 文件夹

  # 首页描述文字（显示在标题下方）

  description:

    - 一行描述文字

    - 可换行显示

    - 支持 Markdown 语法（如 **加粗**）
```

##### （4）URL 配置（影响资源加载）

确保 Hexo 根目录 `_config.yml` 中的 `url` 配置正确（部署后的博客地址）：  

```yaml
# 根目录 _config.yml 中

url: https://yourname.github.io  # 替换为你的博客地址（如 GitHub Pages 地址）
```

#### 3. 功能配置（按需开启）

##### （1）评论系统（以 Waline 为例，轻量且支持匿名）

1. 先去 [Waline 官网](https://waline.js.org/) 注册并获取 `serverURL`（评论后台地址）。  

2. 在 `_config.fluid.yml` 中配置：  

  

```yaml
comments:

     enable: true

     type: waline

     waline:

     serverURL: https://your-waline-server.example.com  # 你的 Waline 服务地址

     placeholder: 来说点什么吧~  # 评论框提示文字
```

   

##### （2）代码高亮

Fluid 内置代码高亮，支持多种主题（如 `atom-one-dark`、`github`）：  

```yaml
code:

  highlight:

    theme: atom-one-dark  # 代码高亮主题

    line_number: true     # 显示行号

    wrap: true            # 代码过长时自动换行
```

##### （3）社交链接（显示在侧边栏或底部）

```yaml
social:

  GitHub: https://github.com/yourname || fa fa-github

  知乎: https://zhihu.com/people/yourname || fa fa-book

  邮箱: mailto:your@email.com || fa fa-envelope

  # 图标来自 Font Awesome，可自行添加其他平台
```

##### （4）文章版权声明

自动在文章末尾添加版权信息：  

```yaml
copyright:

  enable: true

  # 版权声明内容（支持 Markdown）

  content: "本文采用 <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a> 许可协议，转载请注明出处。"
```

### **五、本地预览效果**

配置完成后，执行以下命令本地预览：  

```bash
hexo clean  # 清理缓存（确保新配置生效）

hexo g      # 生成静态文件

hexo s      # 启动本地服务器
```

浏览器访问 `http://localhost:4000`，确认主题样式、菜单、功能是否正常。

### **六、更新主题**

若 Fluid 发布新版本，可更新主题文件（不影响 `_config.fluid.yml` 中的自定义配置）：  

```bash
# 进入主题目录

cd themes/fluid

# 拉取最新代码

git pull

# 返回根目录，重新生成

cd ..

hexo clean && hexo g
```

### **七、常见问题**

1. **首页图片不显示？**  
-   检查图片路径是否正确（需放在 `source/img/` 下，配置中用 `/img/文件名` 引用）。  

-   确保 `url` 配置正确（根目录 `_config.yml`），避免路径拼接错误。
2. **评论系统不生效？**  
-   确认 `serverURL` 正确（Waline/Valine 等服务是否正常运行）。  

-   执行 `hexo clean` 后重新生成，避免缓存导致配置未加载。
3. **导航菜单点击 404？**  
-   确保对应页面已创建（如 `hexo new page "categories"`），且页面文件 `source/分类/index.md` 存在。  

Fluid 主题的核心优势是「简约而不简单」，通过以上配置即可满足多数博客的需求。如需更详细的功能（如自定义 CSS、SEO 优化），可参考 [Fluid 官方文档](https://hexo.fluid-dev.com/docs/)。
