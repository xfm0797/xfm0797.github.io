---
lang: en
translationKey: hexo-theme-matery
title: hexo-theme-matery — A Comprehensive and Beautiful Hexo Theme Based on Material Design and Responsive Design
date: 2025-11-01 21:40:45
description: hexo-theme-matery — A comprehensive and beautiful Hexo theme built on Material Design and responsive design
cover: https://img.lovou.eu.org/file/1762004649474_hexo-theme-martery.png
category: theme
toc: true
---


# hexo-theme-matery

[![HitCount](http://hits.dwyl.io/blinkfox/hexo-theme-matery.svg)](http://hits.dwyl.io/blinkfox/hexo-theme-matery) [![Gitter](https://img.shields.io/gitter/room/blinkfox/hexo-theme-matery.svg)](https://gitter.im/hexo-theme-matery/Lobby?utm_source=badge) [![GitHub issues](https://img.shields.io/github/issues/blinkfox/hexo-theme-matery.svg)](https://github.com/blinkfox/hexo-theme-matery/issues) [![GitHub license](https://img.shields.io/github/license/blinkfox/hexo-theme-matery.svg)](https://github.com/blinkfox/hexo-theme-matery/blob/master/LICENSE) [![Download](https://img.shields.io/badge/downloads-master-green.svg)](https://codeload.github.com/blinkfox/hexo-theme-matery/zip/master) [![Hexo Version](https://img.shields.io/badge/hexo-%3E%3D%205.0.0-blue.svg)](http://hexo.io) [![GitHub forks](https://img.shields.io/github/forks/blinkfox/hexo-theme-matery.svg)](https://github.com/blinkfox/hexo-theme-matery/network) [![GitHub stars](https://img.shields.io/github/stars/blinkfox/hexo-theme-matery.svg)](https://github.com/blinkfox/hexo-theme-matery/stargazers)

[🇺🇸English Document](README.md) | [Live Demo (http://blinkfox.com)](http://blinkfox.com) | [GitHub Pages Demo (https://blinkfox.github.io)](https://blinkfox.github.io)



> This is a Hexo blog theme featuring `Material Design` and responsive design.

## Features

- Simple and beautiful, with article content that is pleasant and easy to read
- [Material Design](https://material.io/) design
- Responsive design — the blog displays well on desktops, tablets, phones, and other devices
- Homepage featured-post carousel and a `Banner` image that switches dynamically every day
- Masonry-style blog post list (when a post has no featured image, one of `24` beautiful images is used instead)
- Timeline-style archive page
- **Word cloud** tags page and **radar chart** categories page
- A rich "About Me" page (including About Me, post statistics charts, My Projects, My Skills, photo gallery, etc.)
- A friendly-links page with customizable data
- Post pinning (featured posts) and post donation/reward support
- `MathJax` support
- Simplified/Traditional Chinese conversion support
- `TOC` table of contents
- Optional copyright notice appended when copying post content
- Optional password protection when reading posts
- [Gitalk](https://gitalk.github.io/), [Gitment](https://imsun.github.io/gitment/), [Valine](https://valine.js.org/), and [Disqus](https://disqus.com/) comment modules (`Gitalk` recommended)
- Integrated [Busuanzi visit counter](http://busuanzi.ibruce.info/), Google Analytics (`Google Analytics`), and post word-count features
- Music player and video playback on the homepage
- `emoji` support — write with `markdown emoji` syntax to render corresponding **bouncing** emojis directly.
- [DaoVoice](http://www.daovoice.io/) and [Tidio](https://www.tidio.com/) online chat support.

## Contributors

Thanks to the contributors listed below — without them, hexo-theme-matery wouldn't be this polished.

- [@HarborZeng](https://github.com/HarborZeng)
- [@shw2018](https://github.com/shw2018)
- [@L1cardo](https://github.com/L1cardo)
- [@Five-great](https://github.com/Five-great)

## Download

This theme **recommends Hexo 5.0.0 or above**. If you already have your own [Hexo](https://hexo.io/) blog, it is suggested that you upgrade Hexo to the latest stable version.

Click [here](https://codeload.github.com/blinkfox/hexo-theme-matery/zip/master) to download the latest stable code of the `master` branch. After extracting it, copy the `hexo-theme-matery` folder into your Hexo `themes` folder.

Of course, you can also use the `git clone` command inside your `themes` folder to download it:

```bash
git clone https://github.com/blinkfox/hexo-theme-matery.git
```

## Configuration

### Switching the Theme

Modify the `theme` value in the `_config.yml` file in your Hexo root directory: `theme: hexo-theme-matery`

#### Other suggested changes to the `_config.yml` file:

- Please change the `url` value in `_config.yml` to your site's main `URL` (e.g., `http://xxx.github.io`).
- It is recommended to set both `per_page` pagination values to a multiple of `6`, such as `12`, `18`, etc., so the post list displays well on all screen sizes.
- If you are a Chinese user, it is recommended to set `language` to `zh-CN`.

### Creating the Categories Page

The `categories` page displays all categories. If you don't yet have a `categories/index.md` file under your blog's `source` directory, you need to create one with the following command:

```bash
hexo new page "categories"
```

Edit the newly created page file `/source/categories/index.md` with at least the following content:

```yaml
---
title: categories
date: 2018-09-30 17:25:30
type: "categories"
layout: "categories"
---
```

### Creating the Tags Page

The `tags` page displays all tags. If you don't yet have a `tags/index.md` file under your blog's `source` directory, you need to create one with the following command:

```bash
hexo new page "tags"
```

Edit the newly created page file `/source/tags/index.md` with at least the following content:

```yaml
---
title: tags
date: 2018-09-30 18:23:38
type: "tags"
layout: "tags"
---
```

### Creating the About Page

The `about` page displays information **about me and my blog**. If you don't yet have an `about/index.md` file under your blog's `source` directory, you need to create one with the following command:

```bash
hexo new page "about"
```

Edit the newly created page file `/source/about/index.md` with at least the following content:

```yaml
---
title: about
date: 2018-09-30 17:25:30
type: "about"
layout: "about"
---
```

### Creating the Contact Page (Optional)

The `contact` page displays the **message board**. If you don't yet have a `contact/index.md` file under your blog's `source` directory, you need to create one with the following command:

```bash
hexo new page "contact"
```

Edit the newly created page file `/source/contact/index.md` with at least the following content:

```yaml
---
title: contact
date: 2018-09-30 17:25:30
type: "contact"
layout: "contact"
---
```

> **Note**: The message board feature depends on a third-party comment system, so please **activate** your comment system for it to work. Also, in the theme's `_config.yml` file, uncomment the message board entry in the "**menu**" configuration at lines `19` to `21`.

### Creating the Friends Page (Optional)

The `friends` page displays **friendly links**. If you don't yet have a `friends/index.md` file under your blog's `source` directory, you need to create one with the following command:

```bash
hexo new page "friends"
```

Edit the newly created page file `/source/friends/index.md` with at least the following content:

```yaml
---
title: friends
date: 2018-12-12 21:25:30
type: "friends"
layout: "friends"
---
```

Meanwhile, create a `_data` directory under your blog's `source` directory, and inside it create a `friends.json` file with content like the following:

```json
[{
    "avatar": "http://image.luokangyuan.com/1_qq_27922023.jpg",
    "name": "Majiang (码酱)",
    "introduction": "I'm not a master; I'm just following in the footsteps of the masters",
    "url": "http://luokangyuan.com/",
    "title": "Go and learn"
}, {
    "avatar": "http://image.luokangyuan.com/4027734.jpeg",
    "name": "Blinkfox (闪烁之狐)",
    "introduction": "A top programmer, skilled and very kind — feel free to ask about anything you don't understand",
    "url": "https://blinkfox.github.io/",
    "title": "Go and learn"
}, {
    "avatar": "http://image.luokangyuan.com/avatar.jpg",
    "name": "ja_rome",
    "introduction": "Ordinary steps can also lead to a great journey",
    "url": "https://me.csdn.net/jlh912008548",
    "title": "Go and learn"
}]
```
### Creating the 404 Page

If you don't yet have a `404.md` file under your blog's `source` directory, you need to create one. Edit the newly created page file `/source/404.md` with at least the following content:

```yaml
---
title: 404
date: 2018-09-30 17:25:30
type: "404"
layout: "404"
description: "Oops～，我崩溃了！找不到你想要的页面 :( (Oops, I crashed! The page you want cannot be found)"
---
```

### Menu Navigation Configuration

#### Configure the names, URLs, and icons of the basic menu navigation.

1. Menu navigation names can be in either Chinese or English (e.g., `Index` or `主页`/Home)
2. Icons can be found on [Font Awesome](https://fontawesome.com/icons)

```yaml
menu:
  Index:
    url: /
    icon: fas fa-home
  Tags:
    url: /tags
    icon: fas fa-tags
  Categories:
    url: /categories
    icon: fas fa-bookmark
  Archives:
    url: /archives
    icon: fas fa-archive
  About:
    url: /about
    icon: fas fa-user-circle
  Friends:
    url: /friends
    icon: fas fa-address-book
```

#### How to Configure a Secondary Menu

If you need a secondary menu, you can do the following on top of the basic menu navigation:

1. Add the `children` keyword under the top-level menu item that needs a secondary menu (e.g., add `children` under the `About` menu)
2. Under `children`, create the secondary menu's name, url, and icon.
3. Note that each secondary menu item must be prefixed with `-`.
4. Pay attention to indentation.

```yaml
menu:
  Index:
    url: /
    icon: fas fa-home
  Tags:
    url: /tags
    icon: fas fa-tags
  Categories:
    url: /categories
    icon: fas fa-bookmark
  Archives:
    url: /archives
    icon: fas fa-archive
  About:
    url: /about
    icon: fas fa-user-circle-o
  Friends:
    url: /friends
    icon: fas fa-address-book
  Medias:
    icon: fas fa-list
    children:
      - name: Music
        url: /music
        icon: fas fa-music
      - name: Movies
        url: /movies
        icon: fas fa-film
      - name: Books
        url: /books
        icon: fas fa-book
      - name: Galleries
        url: /galleries
        icon: fas fa-image
```


### Code Highlighting

Starting from Hexo 5.0, `prismjs` syntax highlighting is built in, and this theme has been adapted to support it.

If you previously installed the `hexo-prism-plugin` in your blog, you must run `npm uninstall hexo-prism-plugin` to uninstall it; otherwise, the generated code will contain `&#123;` and `&#125;` escape characters.

Then, change `highlight.enable` to `false` in the `_config.yml` file in your Hexo root directory, and set `prismjs.enable` to `true`. The main configuration is as follows:

```yaml
highlight:
  enable: false
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false
prismjs:
  enable: true
  preprocess: true
  line_number: true
  tab_replace: ''
```

The default `prismjs` theme in this theme is `Tomorrow Night`. If you want to customize your own theme, go to the [prismjs download page](https://prismjs.com/download.html), customize and download your preferred theme `css` file, rename it to `prism.css`, and replace the `source/libs/prism/prism.css` file in the `hexo-theme-matery` theme folder.

### Search

This theme also uses the [hexo-generator-search](https://github.com/wzpan/hexo-generator-search) Hexo plugin for content search. Install it with the following command:

```bash
npm install hexo-generator-search --save
```

Add the following configuration to the `_config.yml` file in your Hexo root directory:

```yaml
search:
  path: search.xml
  field: post
```

### Chinese-to-Pinyin Permalinks (Recommended)

If your post titles are in Chinese, the permalinks Hexo generates by default will also contain Chinese characters, which is bad for `SEO`, and `gitment` comments don't support Chinese URLs either. You can use the [hexo-permalink-pinyin](https://github.com/viko16/hexo-permalink-pinyin) Hexo plugin to generate pinyin-based permalinks when generating posts.

Install it with the following command:

```bash
npm i hexo-permalink-pinyin --save
```

Add the following configuration to the `_config.yml` file in your Hexo root directory:

```yaml
permalink_pinyin:
  enable: true
  separator: '-' # default: '-'
```

> **Note**: Besides this plugin, the [hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink) plugin can also generate non-Chinese links.

### Post Word-Count Plugin (Recommended)

If you want to display word count and reading-time information in posts, install the [hexo-wordcount](https://github.com/willin/hexo-wordcount) plugin.

Install it with the following command:

```bash
npm i --save hexo-wordcount
```

Then simply enable the word-count-related settings in the theme's `_config.yml` file:

```yaml
postInfo:
  date: true
  update: false
  wordCount: false # Set post word count to true.
  totalCount: false # Set total site word count to true.
  min2read: false # Reading time.
  readCount: false # Read count.
```

### Adding Emoji Support (Optional)

This theme adds `emoji` support, using the [hexo-filter-github-emojis](https://npm.taobao.org/package/hexo-filter-github-emojis) Hexo plugin to render `emoji` — converting `markdown emoji` syntax (`::`, e.g., `:smile:`) into bouncing `emoji`. Install it with the following command:

```bash
npm install hexo-filter-github-emojis --save
```

Add the following configuration to the `_config.yml` file in your Hexo root directory:

```yaml
githubEmojis:
  enable: true
  className: github-emoji
  inject: true
  styles:
  customEmojis:
```
Run `hexo clean && hexo g` to regenerate the blog files, and you'll see the emojis written in `emoji` syntax at the corresponding places in your posts.

### Adding RSS Feed Support (Optional)

This theme also uses the [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed) Hexo plugin for `RSS`. Install it with the following command:

```bash
npm install hexo-generator-feed --save
```

Add the following configuration to the `_config.yml` file in your Hexo root directory:

```yaml
feed:
  type: atom
  path: atom.xml
  limit: 20
  hub:
  content:
  content_limit: 140
  content_limit_delim: ' '
  order_by: -date
```

Run `hexo clean && hexo g` to regenerate the blog files; if you can see the `atom.xml` file in the `public` folder, the installation succeeded.

### Adding [DaoVoice](http://www.daovoice.io/) Online Chat (Optional)

Go to the [DaoVoice](http://www.daovoice.io/) website to register and get an `app_id`, then fill the `app_id` into the theme's `_config.yml` file.

### Adding [Tidio](https://www.tidio.com/) Online Chat (Optional)

Go to the [Tidio](https://www.tidio.com/) website to register and get a `Public Key`, then fill the `Public Key` into the theme's `_config.yml` file.

### Modifying the Footer

The footer information may need customization, and it isn't convenient to make configurable, so you may need to modify it yourself. The place to modify is `/layout/_partial/footer.ejs` in the theme files, which includes site info, the theme in use, visit counts, etc.

### Adding Simplified/Traditional Chinese Conversion

In the theme's `_config.yml` file, set translate to enable.

> Enable Simplified/Traditional Chinese conversion with the following change. Disabled by default.
> Live demo: [Chinese conversion](https://blog.17lai.site) in the footer bar at the bottom.

```yaml
translate:
  enable: true
```

### Modifying Social Links

The theme's `_config.yml` file supports `QQ`, `GitHub`, email, etc. by default. You can add or modify your desired social link addresses in the theme's `/layout/_partial/social-link.ejs` file. Refer to the following code for adding a link:

```html
<% if (theme.socialLink.github) { %>
    <a href="<%= theme.socialLink.github %>" class="tooltipped" target="_blank" data-tooltip="访问我的GitHub (Visit my GitHub)" data-position="top" data-delay="50">
        <i class="fab fa-github"></i>
    </a>
<% } %>
```

You can find social icons (e.g., `fa-github`) by searching [Font Awesome](https://fontawesome.com/icons). Below are the identifiers of common social icons for your reference:

- Facebook: `fab fa-facebook`
- Twitter: `fab fa-twitter`
- Google-plus: `fab fa-google-plus`
- Linkedin: `fab fa-linkedin`
- Tumblr: `fab fa-tumblr`
- Medium: `fab fa-medium`
- Slack: `fab fa-slack`
- Sina Weibo: `fab fa-weibo`
- Wechat: `fab fa-weixin`
- QQ: `fab fa-qq`
- Zhihu: `fab fa-zhihu`

> **Note**: The `Font Awesome` version used in this theme is `5.11.0`.

### Modifying the Reward QR Code Images

In the theme's `source/medias/reward` files, you can replace them with your own WeChat and Alipay reward QR code images.

### Configuring the Music Player (Optional)

To enable music playback, simply activate the music configuration in the theme's `_config.yml`:

```yaml
# Whether to show music on the homepage
music:
  enable: true
  title:     	    # Only effective in non-docked mode
    enable: true
    show: 听听音乐 (Listen to music)
  server: netease   # require music platform: netease, tencent, kugou, xiami, baidu
  type: playlist    # require song, playlist, album, search, artist
  id: 503838841     # require song id / playlist id / album id / search keyword
  fixed: false      # Enable docked (fixed) mode
  autoplay: false   # Whether to autoplay
  theme: '#42b983'
  loop: 'all'       # Audio loop mode, options: 'all', 'one', 'none'
  order: 'random'   # Audio playback order, options: 'list', 'random'
  preload: 'auto'   # Preload, options: 'none', 'metadata', 'auto'
  volume: 0.7       # Default volume; note the player remembers user settings — after the user manually sets the volume, the default volume no longer applies
  listFolded: true  # Fold the list by default
```

> `server` options: `netease` (NetEase Cloud Music), `tencent` (QQ Music), `kugou` (KuGou Music), `xiami` (Xiami Music),
>
> `baidu` (Baidu Music).
>
> `type` options: `song` (song), `playlist` (playlist), `album` (album), `search` (search keyword), `artist` (artist)
>
> Example of how to get the `id`: open NetEase Cloud Music in your browser, click the "My Favorite Music" playlist, and a string of digits will appear at the end of the browser address bar — that number is the `id` of the
>
> `playlist`.

### Adding Notes

> [Demo](https://blog.17lai.site/posts/cf0f47fd/#tag-note)

#### Usage

```
{% note [class] [no-icon] [summary] %}
Any content (support inline tags too).
{% endnote %}
```

- `[class]` : *Optional parameter.* Supported values: default | primary | success | info | warning | danger.
- `[no-icon]` : *Optional parameter.* Disable icon in note.
- `[summary]` : *Optional parameter.* Optional summary of the note.

All parameters are optional.

#### example

```
{% note %}
#### Header
(without define class style)
{% endnote %}
```

### Adding Buttons

> [Demo](https://blog.17lai.site/posts/cf0f47fd/#tag-button)

#### Usage

```
{% button url, text, icon [class], [title] %}
```

or

```
{% btn url, text, icon [class], [title] %}
```

- `url` : Absolute or relative path to URL.
- `text` : Button text. Required if no icon specified.
- `icon` : Font Awesome icon name. Required if no text specified.
- `[class]` : *Optional parameter.* Font Awesome class(es): `fa-fw` | `fa-lg` | `fa-2x` | `fa-3x` | `fa-4x` | `fa-5x`
- `[title]` : *Optional parameter.* Tooltip at mouseover.

#### Examples

```
{% button #, Text %}
```


## Post Front-matter Introduction

### Front-matter Options Explained

Everything in the `Front-matter` options is **optional**. However, I still recommend filling in at least `title` and `date`.

| Option        | Default value                       | Description |
| --------------| ----------------------------------- | ----------- |
| title         | The `Markdown` file title           | Post title; strongly recommended to fill in |
| date          | The date/time the file was created  | Publish time; strongly recommended to fill in, and ideally globally unique |
| author        | The `author` in the root `_config.yml` | Post author |
| img           | A value from `featureImages`        | Post featured image; it is recommended to use an image host (Tencent Cloud, Qiniu Cloud, Upyun, etc.) for the image path, e.g.: `http://xxx.com/xxx.jpg` |
| top           | `true`                              | Featured post (whether pinned). If `top` is `true`, the post appears as a featured post on the homepage |
| hide          | `false`                             | Hide the post. If `hide` is `true`, the post won't be shown on the homepage |
| cover         | `false`                             | Added in `v1.0.2`; whether this post should be included in the homepage carousel covers |
| coverImg      | None                                | Added in `v1.0.2`; the image path to display for this post in the homepage carousel cover. If absent, the post's featured image is used by default |
| password      | None                                | Post reading password. To set a reading password for a post, set the `password` value, which must be the password encrypted with `SHA256` to prevent it from being discovered. Prerequisite: the `verifyPassword` option is enabled in the theme's `config.yml` |
| toc           | `true`                              | Whether to enable TOC; you can disable TOC for a specific post. Prerequisite: the `toc` option is enabled in the theme's `config.yml` |
| mathjax       | `false`                             | Whether to enable math formula support — whether this post enables `mathjax`; it also needs to be enabled in the theme's `_config.yml` |
| summary       | None                                | Post summary; a custom summary. If this property has a value, the post card shows this text as the summary; otherwise the program automatically extracts part of the post as the summary |
| categories    | None                                | Post categories. In this theme, categories represent broad, macro-level groups; only one category per post is recommended |
| tags          | None                                | Post tags; a post can have multiple tags |
| keywords      | Post title                          | Post keywords, needed for SEO |
| reprintPolicy | cc_by                               | Post reprint policy; can be one of cc_by, cc_by_nd, cc_by_sa, cc_by_nc, cc_by_nc_nd, cc_by_nc_sa, cc0, noreprint, or pay |

> **Notes**:
> 1. If the `img` property is not filled in, the post's featured image will be chosen by taking the remainder of the `hashcode` of the post title and picking the corresponding featured image in the theme, so that every post's featured image is **distinctive**.
> 2. The `date` value should be unique for each post, because in this theme `Gitalk` and `Gitment` identify posts by the `date` value as a unique identifier.
> 3. To set a reading password for a post, besides setting the SHA256-encrypted password value in the Front-matter, you also need to enable the corresponding configuration in the theme's `_config.yml`. Some online SHA256 encryption tools you can use: [oschina online tools](http://tool.oschina.net/encrypt?type=2), [chahuo](http://encode.chahuo.com/), [站长工具 (Chinaz tools)](http://tool.chinaz.com/tools/hash.aspx).
> 4. You can specify reprintPolicy in a post's markdown front-matter to configure the reprint policy for that individual post.

The following is a `Front-matter` example for a post.

### Minimal Example

```yaml
---
title: typora-vue-theme主题介绍 (Introduction to the typora-vue-theme)
date: 2018-09-07 09:25:00
---
```

### Full Example

```yaml
---
title: typora-vue-theme主题介绍 (Introduction to the typora-vue-theme)
date: 2018-09-07 09:25:00
author: 赵奇 (Zhao Qi)
img: /source/images/xxx.jpg
top: true
hide: false
cover: true
coverImg: /images/1.jpg
password: 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
toc: false
mathjax: false
summary: 这是你自定义的文章摘要内容，如果这个属性有值，文章卡片摘要就显示这段文字，否则程序会自动截取文章的部分内容作为摘要 (This is your custom post summary; if this property has a value, the post card shows this text as the summary, otherwise the program automatically extracts part of the post as the summary)
categories: Markdown
tags:
  - Typora
  - Markdown
---
```

## Screenshots

![Homepage](http://static.blinkfox.com/matery-20181202-1.png)

![Homepage featured posts](http://static.blinkfox.com/matery-20181202-2.png)

![Homepage post list](http://static.blinkfox.com/matery-20181202-3.png)

![Homepage post list](http://static.blinkfox.com/matery-20181202-7.png)

![Homepage post list](http://static.blinkfox.com/matery-20181202-8.png)

## Custom Modifications

Some custom information can be modified in the theme's `_config.yml`, in the following areas:

- Menu
- My dream
- Homepage music player and video player configuration
- Whether to show featured post titles and buttons
- `favicon` and `Logo`
- Personal information
- TOC
- Post reward/donation information
- Copyright notice appended when copying post content
- MathJax
- Post word count and reading time
- The 'heart' click effect on the page
- My projects
- My skills
- My gallery
- `Gitalk`, `Gitment`, `Valine`, and `disqus` comment configuration
- [Busuanzi visit counter](http://busuanzi.ibruce.info/) and Google Analytics (`Google Analytics`)
- The collection of default featured images. When a post has no featured image, the theme picks one by taking the remainder of the post title's `hashcode` value

**I believe a personal blog should have its own style and character**. If you're not satisfied with the many features and theme colors in this theme, you can customize it. Many freer features and finer modifications are hard to accomplish through the theme's `_config.yml` and require modifying the source code. Below are places that may be useful to you:

### Modifying the Theme Color

In the theme's `/source/css/matery.css` file, search for `.bg-color` to modify the background color:

```css
/* Overall background color, including the navbar, mobile navbar, footer, tags page, etc. */
.bg-color {
    background-image: linear-gradient(to right, #4cbf30 0%, #0f9d58 100%);
}

@-webkit-keyframes rainbow {
   /* Dynamically switch the background color. */
}

@keyframes rainbow {
    /* Dynamically switch the background color. */
}
```

### Modifying the Banner Images and Post Featured Images

You can directly replace the `banner` images in the `/source/medias/banner` folder with your favorites. The theme code switches one image per day dynamically, so only `7` images are needed. If you know `JavaScript`, you can change the switching logic to your liking, e.g., random switching. The banner switching code is in the `<script></script>` section of the `/layout/_partial/bg-cover-content.ejs` file:

```javascript
$('.bg-cover').css('background-image', 'url(/medias/banner/' + new Date().getDay() + '.jpg)');
```

There are 24 default featured images in the `/source/medias/featureimages` folder; you can add or remove them, with corresponding changes in `_config.yml`.

## Changelog

See [CHANGELOG.md](https://github.com/blinkfox/hexo-theme-matery/blob/master/CHANGELOG.md)

## More Deployment Options

> Jsdelivr has been blocked; the following two options can speed up access a bit

### [Vercel Deployment](https://blog.17lai.site/posts/5311b619/#vercel-%E9%83%A8%E7%BD%B2)

### [Cloudflare Pages Deployment](https://blog.17lai.site/posts/5311b619/#cloudflare-Pages-%E9%83%A8%E7%BD%B2)
