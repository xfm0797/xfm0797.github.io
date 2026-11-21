---
lang: en
translationKey: hexo-setup
title: hexo - How to Install
date: 2025-10-05 03:24:57
cover: https://img.lovou.eu.org/file/1759567275346_cover.png
category: Hexo
tags: [hexo]
---

# Installation

Once Hexo is installed, run the following commands to have Hexo initialize a new website in your target `<folder>`.

```bash
$ hexo init <folder>
$ cd <folder>
$ npm install
```

After initialization, your project folder will look like this:

```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
_config.yml
```

The site's configuration file. You can configure most parameters here.

# package.json

Application info. The EJS, Stylus, and Markdown renderers are installed by default, and you can freely remove them. You can uninstall them later if you like.

```json
package.json
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "hexo": {
    "version": ""
  },
  "dependencies": {
    "hexo": "^7.0.0",
    "hexo-generator-archive": "^2.0.0",
    "hexo-generator-category": "^2.0.0",
    "hexo-generator-index": "^3.0.0",
    "hexo-generator-tag": "^2.0.0",
    "hexo-renderer-ejs": "^2.0.0",
    "hexo-renderer-stylus": "^3.0.0",
    "hexo-renderer-marked": "^6.0.0",
    "hexo-server": "^3.0.0",
    "hexo-theme-landscape": "^1.0.0"
  }
}
```

# scaffolds

The scaffold folder. When you create a new post, Hexo builds the file based on the scaffold.

# source

The resource folder. This is where user assets live. Except for the `_posts` folder, files/folders prefixed with `_` (an underscore) and hidden files will be ignored. Markdown and HTML files are parsed and placed into the `public` folder, while other files are copied over as-is.

# themes

The theme folder. Hexo generates the static pages based on your theme.
