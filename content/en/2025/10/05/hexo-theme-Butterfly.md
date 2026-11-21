---
lang: en
translationKey: hexo-theme-Butterfly
title: hexo-theme-Butterfly Installation and Basic Configuration Tutorial
date: 2025-10-05 00:00:00
description: hexo-theme-Butterfly installation and basic configuration tutorial
cover: https://img.lovou.eu.org/file/1759567275346_cover.png
category: theme
---

<div class="video-container"><iframe width="300" height="150" src="https://www.youtube.com/embed/LM3-htR23AU" title="Hexo | 基础配置 | Butterfly主题安装 | 文章发布 | 保姆级教程" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
<style>.video-container { position: relative; padding-top: 56.25%; } .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style>

# 🌟 Prerequisites:
    -  ✅ A Hexo project already deployed
    -  🔗 For the installation guide, see: Hexo Site Setup | GitHub Deployment | Cloudflare Pages Publishing | Step-by-Step Tutorial
# 🎨 Installing the Butterfly Theme
## 🔽 Download the theme (recommended: Git clone)
    -  Users in mainland China are advised to use Gitee:
```bash
git clone -b master https://gitee.com/immyw/hexo-theme-butterfly.git themes/butterfly
```
    -  With a good network connection, you can use GitHub:
```bash
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```
# ⚙️ Applying the Theme
    -  Edit the `_config.yml` in the Hexo root directory:
```
theme: butterfly
```
# 📦 Installing Dependencies
    -  If the pug and stylus renderers are not installed yet, run:
```
npm install hexo-renderer-pug hexo-renderer-stylus --save
```
# 📁 Configuration Tips (Optional)
To save time on maintenance and avoid confusion caused by theme upgrades, it is recommended to manage the theme configuration with an external config file:

    - Create a file named `_config.butterfly.yml` in the Hexo root directory
    - Copy all content from `themes/butterfly/_config.yml` into that file
Run the following command as a shortcut:
```
copy "themes\butterfly\_config.yml" "_config.butterfly.yml"
```
# 🌟 Submodule Configuration
1. Create the .gitmodules file
Run the creation command:
```bash
echo. > .gitmodules
```
Edit the *.gitmodules* file and add the following content, making sure the path and URL are correct:
```
[submodule "themes/butterfly"]
  path = themes/butterfly
  url = https://github.com/jerryc127/hexo-theme-butterfly.git
```
2. Add the *.gitmodules* file to version control
```bash
git add .gitmodules
git commit -m "Add .gitmodules file"
git push origin main
```
3. Initialize and update the submodule
Initialize and update the submodule:
```bash
git submodule init   # Initialize the submodule
git submodule update --recursive   # Fetch the submodule code
```
4. Check the submodule status
Confirm that the submodule is properly synced:
```bash
git submodule status
```
5. Push to the remote repository
Push the submodule changes to the remote repository:
```bash
git add themes/butterfly
git commit -m "Add butterfly theme as submodule"
git push origin main
```
# 🛠️ Basic Configuration
    - Hexo global configuration file: **_config.yml**
        > Official documentation: https://hexo.io/zh-cn/docs/configuration

    - Butterfly theme configuration file: **_config.butterfly.yml**
        > Official documentation: https://butterfly.js.org/

# ✍️ Publishing Posts
✅ Recommended editors
Hexo uses Markdown format for writing posts by default. The following editors are recommended:

    - **VSCode**: Powerful, supports many languages and plugin extensions
    - **MarkText**: Lightweight, open source, free (currently English UI only)
I have uploaded the installers to a cloud drive — feel free to grab them: [Cloud Drive](https://pan.nbvil.com/)

# 🔧 Creating and Editing Posts
1. Open a terminal and navigate to the Hexo project root directory
2. Create a post:
```bash
hexo new "posts"       # Creates a post named posts.md
```
The post file will be generated under the **/source/_posts/** directory

Open posts.md with a Markdown editor and write your content
> 💡 Tip: You can draft the content in Word or a TXT file first, then use AI (e.g., DeepSeek) to convert it to Markdown, and paste it into your Hexo post.

# 🚀 Publishing Posts
Run the following commands in order:
```bash
hexo generate        # Generate static files
hexo deploy          # Deploy to the remote repository

git add .            # Stage all changes to local git

git commit -m "update"   # Describe this change

git push origin main     # Push to the remote repository
```
Once the upload succeeds, refresh your site and the post will be live.
