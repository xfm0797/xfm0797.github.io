---
lang: en
translationKey: hexo-theme-yilia
title: hexo-theme-yilia — A Simple and Elegant Hexo Theme
date: 2025-11-01 21:31:20
description: hexo-theme-yilia is a simple and elegant hexo theme
cover: https://img.lovou.eu.org/file/1762004305757_hexo-theme-yilia.gif
category: theme
toc: true
---


hexo-theme-yilia
================

Yilia is a theme made for [hexo](https://github.com/tommy351/hexo) 2.4+.
It values simplicity and elegance, as well as ultimate performance. You can click [My Blog](http://litten.me/) to see it in action.

If you want to experience the mobile browsing effect, scan the QR code:

![litten-qrcode](https://cloud.githubusercontent.com/assets/2024949/6349328/51a067fe-bc64-11e4-881c-f68050c50c28.png)

—————————————————————

**About the theme:**

1. Values simplicity
2. Pursues a great mobile experience
3. Strives for ultimate loading speed (work in progress)
4. Keeps everyone's attention on the content — this is the original design intent of this theme
5. The theme does not support IE6, 7, 8, and never will

**Recent updates (2017.07.09):**

2017.07.09
1. Back to top
2. TOC

2016.12.04
1. Reward/donation
2. Search
3. A "better" tag cloud
4. "Better" sharing
5. Some animations

**Planned:**

1. Mobile optimization

## I. Appearance

####**Desktop**

![Desktop](https://cloud.githubusercontent.com/assets/2024949/19027861/92879edc-8967-11e6-8e60-7987b6507c8d.gif)

####**Mobile**

![Mobile](https://cloud.githubusercontent.com/assets/2024949/19027020/1c5b756a-895f-11e6-99bf-ddff9687aee0.gif)

####**iPad portrait/landscape switching**

![iPad portrait/landscape switching](https://cloud.githubusercontent.com/assets/2024949/19026392/e74e1816-8957-11e6-8f08-eac9b3c8c036.gif)

## II. Developers

For performance and engineering reasons, Yilia needs to be built with webpack.

If you have customization needs for the theme, please refer to the wiki [“Yilia source directory structure and build notes”](https://github.com/litten/hexo-theme-yilia/wiki/Yilia%E6%BA%90%E7%A0%81%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E5%8F%8A%E6%9E%84%E5%BB%BA%E9%A1%BB%E7%9F%A5) (in Chinese)

## III. Usage

#### Installation

``` bash
$ git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia
```

#### Configuration

Edit `_config.yml` in the hexo root directory: `theme: yilia`

#### Update

``` bash
cd themes/yilia
git pull
```

## IV. Configuration

The theme config file is `_config.yml` in the theme root directory. Modify it as needed.
For a complete configuration example, see [my blog backup](https://github.com/litten/BlogBackup)

```
# Header

menu:
  主页 (Home): /
  随笔 (Essays): /tags/随笔/

# SubNav
subnav:
  github: "#"
  weibo: "#"
  rss: "#"
  zhihu: "#"
  #qq: "#"
  #weixin: "#"
  #jianshu: "#"
  #douban: "#"
  #segmentfault: "#"
  #bilibili: "#"
  #acfun: "#"
  #mail: "mailto:litten225@qq.com"
  #facebook: "#"
  #google: "#"
  #twitter: "#"
  #linkedin: "#"

rss: /atom.xml

# Whether to change the root path
# If your site is in a subdirectory, e.g. http://yoursite.com/blog,
# set your url to http://yoursite.com/blog and set root to /blog/.
root: 

# Content

# Post is too long — text of the "read more" button
excerpt_link: more
# Permanent link at the bottom right of the post card; set to false if not needed
show_all_link: '展开全文 (Expand full text)'
# Math formulas
mathjax: false
# Whether to open links in a new window
open_in_new: false

# Reward
# reward_type options: 0 - disable reward; 1 - reward only if the post's md file has the reward:true property; 2 - all posts have reward
reward_type: 2
# Reward wording
reward_wording: '谢谢你请我吃糖果 (Thank you for treating me to candy)'
# Alipay QR code image URL, set it the same way as your avatar. e.g.: /assets/img/alipay.jpg
alipay: 
# WeChat QR code image URL
weixin: 

# TOC
# toc options: 0 - don't show TOC; 1 - show TOC only if the post's md file has the toc:true property; 2 - show TOC for all posts
toc: 1
# Set according to your own habits: if your heading titles conventionally include numbering, set to true to hide Hexo's duplicate numbering; otherwise set to false
toc_hide_index: true
# Prompt when the TOC is empty
toc_empty_wording: '目录，不存在的… (TOC — doesn't exist…)'

# Whether to have a quick back-to-top button
top: true

# Miscellaneous
baidu_analytics: ''
google_analytics: ''
favicon: /favicon.png

#Your avatar url
avatar:

#Whether to enable sharing
share_jia: true

#Comments: 1. duoshuo; 2. NetEase YunTie; 3. Changyan; 4. Disqus; 5. Gitment
#For any option you don't need, just set the value to false or comment it out
#See the wiki for details: https://github.com/litten/hexo-theme-yilia/wiki/

#1. duoshuo
duoshuo: false

#2. NetEase YunTie
wangyiyun: false

#3. Changyan
changyan_appid: false
changyan_conf: false

#4. Disqus — there is also a disqus_shortname field in the hexo root config; yilia's takes precedence
disqus: false

#5. Gitment
gitment_owner: false      #Your GitHub ID
gitment_repo: ''          #The repo for storing comments
gitment_oauth:
  client_id: ''           #client ID
  client_secret: ''       #client secret

# Style customization - generally no need to modify, unless you have a strong desire to customize…
style:
  # Background color above the avatar
  header: '#4d4d4d'
  # Background of the sliding panel
  slider: 'linear-gradient(200deg,#a0cfe4,#e8c37e)'

# slider settings
slider:
  # Whether to expand the tags panel by default
  showTags: false

# Smart menu
# If not needed, set the corresponding item to false
# e.g.
#smart_menu:
#  friends: false
smart_menu:
  innerArchive: '所有文章 (All posts)'
  friends: '友链 (Friends)'
  aboutme: '关于我 (About me)'

friends:
  Friend link 1: http://localhost:4000/
  Friend link 2: http://localhost:4000/
  Friend link 3: http://localhost:4000/
  Friend link 4: http://localhost:4000/
  Friend link 5: http://localhost:4000/
  Friend link 6: http://localhost:4000/

aboutme: 很惭愧<br><br>只做了一点微小的工作<br>谢谢大家 (I'm ashamed to say<br><br>I've only done a little bit of tiny work<br>Thank you all)
```
