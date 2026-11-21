---
lang: en
translationKey: icarus
title: Icarus User Guide - Theme Configuration
date: 2025-10-25 15:09:03
description: Icarus User Guide - Theme Configuration
cover: https://img.lovou.eu.org/file/1759567275346_cover.png
category: Hexo
toc: true
---

# Icarus Theme Configuration in Detail

The default theme configuration file for Icarus is `_config.icarus.yml`. This file defines the site-wide layout and style settings, and also controls the configuration of external features such as plugins and widgets. This article describes the general configuration of this theme in detail, and explains which configuration files Icarus uses and how it generates and validates them.

This article is also available in the following languages: English.

## General Theme Configuration

### Config Version

This version number is related to, but not always identical to, the theme version. Icarus uses this version number to decide whether to upgrade the default theme configuration file. Do not change this version number yourself.

```yaml
_config.icarus.yml
version: 5.0.0
```

### Theme Variant

Use this setting to change the "skin" of Icarus. Currently this setting supports two values: "default" and "cyberpunk". You can view the effect of the Cyberpunk variant here.

```yaml
_config.icarus.yml
variant: default
```

### Logo

Sets the logo of your site. This logo appears in the navigation bar and the footer. The logo can be set either to the path or URL of your logo image:

```yaml
_config.icarus.yml
logo: /img/logo.svg
```

Or to text, like this:

```yaml
_config.icarus.yml
logo:
    text: My Beautiful Site
```

### Favicon

You can specify the path or URL of your site's favicon in the head configuration.

```yaml
_config.icarus.yml
head:
    favicon: /img/favicon.svg
```

### Web App Manifest

Icarus supports the generation of a basic PWA manifest.json and Meta tags. To enable the web app manifest, use the following configuration in the theme configuration. You can also refer to MDN for details on each configuration item.

```yaml
_config.icarus.yml
```

### Open Graph

You can configure Open Graph in the head configuration. You should leave most of the settings empty in the configuration file. Only set values for these settings in a post's front-matter when needed. Please refer to the Hexo documentation for details on each configuration item.

```yaml
_config.icarus.yml
```

### Google Structured Data

You can configure Google Structured Data in the head configuration. You should leave most of the settings empty in the configuration file. Only set values for these settings in a post's front-matter when needed. Please refer to Search for Developers for details on each configuration item.

```yaml
_config.icarus.yml
```

### Page Metadata

You can add custom `<meta>` tags to the generated HTML through the meta settings in the head section. Each meta tag should appear as an element in the meta array. Each element in the meta setting should be in the format `<attribute name>=<attribute value>`, where the attribute name and value represent the attribute and value of the `<meta>` tag. If a `<meta>` tag has multiple attributes and values, separate each `<attribute name>=<attribute value>` with `;`.

```yaml
_config.icarus.yml
head:
    meta:
        - 'name=theme-color;content=#123456'
        - 'name=generator;content="Hexo 4.2.0"'
```

### RSS

You can add RSS link information through the rss setting in the head section.

```yaml
_config.icarus.yml
head:
    rss: /path/to/atom.xml
```

### Navigation Bar

The navbar section defines the menus and links in the navigation bar. You can add any navigation bar menu link by adding `<link name>: <link URL>` to the menu setting. To add links to the right side of the navigation bar, add `<link name>: <link URL>` to the links setting.

```yaml
_config.icarus.yml
navbar:
    # Navigation bar menu items
    menu:
        Home: /
        Archives: /archives
        Categories: /categories
        Tags: /tags
        About: /about
    # Links on the right side of the navigation bar
    links:
        GitHub: 'https://github.com'
        Download on GitHub:
            icon: fab fa-github
            url: 'https://github.com/ppoffice/hexo-theme-icarus'
```

You can also use FontAwesome icons instead of plain text links, in the following format:

```yaml
Link format
<link name>:
    icon: <FontAwesome icon class name>
    url: <link URL>
```

### Footer

The footer section defines the links on the right side of the footer. The link configuration format is exactly the same as the links configuration in the navbar.

```yaml
_config.icarus.yml
footer:
    links:
        Creative Commons:
            icon: fab fa-creative-commons
            url: 'https://creativecommons.org/'
        Attribution 4.0 International:
            icon: fab fa-creative-commons-by
            url: 'https://creativecommons.org/licenses/by/4.0/'
        Download on GitHub:
            icon: fab fa-github
            url: 'https://github.com/ppoffice/hexo-theme-icarus'
```

You can also display custom copyright text in the footer:

```yaml
_config.icarus.yml
footer:
    copyright: Powered by 💖
```

### Code Highlighting

If you have enabled code highlighting in Hexo, you can customize code blocks through the highlight setting in the article section. Choose a theme from all the themes listed under highlight.js/src/styles. Then, copy the file name (without the .css extension) into the theme setting.

To hide the copy-code button, set clipboard to false. If you want all code blocks to be collapsed or expanded by default, set fold to "folded" or "unfolded". You can also set fold to empty to disable code block folding.

```yaml
_config.icarus.yml
article:
    highlight:
        # Code highlight theme
        # https://github.com/highlightjs/highlight.js/tree/master/src/styles
        theme: atom-one-light
        # Show the copy code button
        clipboard: true
        # The default folding state of code blocks. Can be "", "folded", "unfolded"
        fold: unfolded
```

In addition, you can use the following syntax in a Markdown file to fold an individual code block:

```
{% codeblock "Optional filename" lang:code-language >folded %}
...code block content...
{% endcodeblock %}
```

### Cover & Thumbnail

To add a cover image to a post, add the cover option in the post's front-matter:

```
post.md
title: Getting Started with Icarus
cover: /gallery/covers/cover.jpg
---
Post content...
```

Similarly, you can set a thumbnail for a post in its front-matter:

```
post.md
title: Getting Started with Icarus
thumbnail: /gallery/covers/thumbnail.jpg
---
Post content...
```

A post's thumbnail is displayed on the archive page and in the Recent Posts widget.

If you use an image path in the front-matter, you need to make sure it is an absolute path or a path relative to your source directory. For example, to use `<your blog>/source/gallery/image.jpg` as the thumbnail, you need to use `/gallery/image.jpg` as the image path in the front-matter.

### Post Reading Time

You can set the readtime setting in the article section to true to display the post word count and estimated reading time.

```yaml
_config.icarus.yml
article:
    readtime: true
```

### Post Update Time

To display a post's update time, set the updated time in the post's front-matter:

```
post.md
title: Getting Started with Icarus
updated: 2020-04-01 00:00:00
---
Post content...
```

Then, set the update_time setting in the article section of the theme configuration file to true:

```yaml
_config.icarus.yml
article:
    update_time: true
```

You can also set update_time to false to hide the update time for all posts, or set it to auto to hide the update time when it is the same as the publish time.

### Post Licenses

You can display the license of your work at the bottom of your posts/pages. The license links can be text or icons. The configuration here is the same as the links configuration in the navbar or footer:

```yaml
_config.icarus.yml
article:
    # Post licenses
    licenses:
        Creative Commons:
            icon: fab fa-creative-commons
            url: 'https://creativecommons.org/'
        'CC BY-NC-SA 4.0': 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
```

### Sidebars

Set sticky to true for a sidebar in the sidebar section to fix its position so it doesn't scroll with the page.

```yaml
_config.icarus.yml
sidebar:
    left:
        sticky: false
    right:
        sticky: true
```

### Other Configurations

You can refer to the Icarus User Guide to learn more about the configuration of third-party plugins, widgets, and CDN providers.

## Configuration Files and Precedence

Besides the default theme configuration file in `_config.icarus.yml`, Icarus also reads alternative configurations from the following locations:

- The site configuration file in `_config.yml`
- The layout configuration files in `_config.post.yml` and `_config.page.yml`
- The front-matter of posts/pages
- (Deprecated) The old theme configuration file in `themes/icarus/_config.yml`
- (Deprecated) The old layout configuration files in `themes/icarus/_config.post.yml` and `themes/icarus/_config.page.yml`

### Layout Configuration Files

Layout configuration files follow the same format and definitions as the theme configuration file. The configuration in `_config.post.yml` applies to all posts, while the configuration in `_config.page.yml` applies to all custom pages. These two files override the configuration in the theme configuration file.

For example, you can make all posts use a two-column layout in `_config.post.yml`:

```yaml
_config.post.yml
widgets:
    -
        type: recent_posts
        position: left
    -
        type: categories
        position: left
    -
        type: tags
        position: left
```

While all other pages keep the three-column layout:

```yaml
_config.icarus.yml
widgets:
    -
        type: recent_posts
        position: left
    -
        type: categories
        position: right
    -
        type: tags
        position: right
```

### Post/Page Front-matter

If you only want to override the theme configuration in a single post/page, you can write the configuration in that post/page's front-matter. For example, you can change the code highlight theme of a particular post by writing the following in its front-matter:

```
source/_post/some-post.md
title: My First Post
date: '2015-01-01 00:00:01'
article:
    highlight:
        theme: atom-one-dark
---
# Post title
```

The configuration above overrides the `article.highlight` in `_config.post.yml` and `_config.icarus.yml` for that post. This hierarchical configuration system is very effective for page personalization and differentiation across different visitors. For example, you can enable a faster CDN or a localized comment service based on the country and language of your page's target audience.

However, note that some post or page attributes defined by Hexo do not override configurations of the same name from other configuration sources, such as title, date, updated, comments (not comment), layout, source, photos, and excerpt.

### Site Configuration File

All configuration sources listed above, including the theme configuration file, layout configuration files, and post/page front-matter, override the Icarus-related configuration in the site configuration file. For example, the title setting in `_config.icarus.yml` overrides the title in `_config.yml`, but new_post_name does not, since Icarus does not use that setting.

In addition, the theme_config option in the site configuration file is merged with the theme configuration in the theme configuration file, overriding settings of the same name. However, we strongly discourage the use of this configuration option.

### Summary

In summary, the scope and precedence of configuration sources are as follows:

For a particular post or page

1. The post/page front-matter overrides all configuration sources below.
2. The layout configuration files override all configuration sources below.
3. The theme_config option in the site configuration file overrides all configuration sources below.
4. The theme configuration file overrides all configuration sources below.
5. The site configuration file.

For all posts or pages

1. The layout configuration files override all configuration sources below.
2. The theme_config option in the site configuration file overrides all configuration sources below.
3. The theme configuration file overrides all configuration sources below.
4. The site configuration file.

For all posts, pages, and index pages

1. The theme_config option in the site configuration file overrides all configuration sources below.
2. The theme configuration file overrides all configuration sources below.
3. The site configuration file.

## Configuration Generation and Validation

All Icarus theme configurations are written in YAML. If a configuration file does not exist, Icarus automatically generates the default configuration file `_config.icarus.yml` through a set of JSON Schemas. This is why you cannot find an example configuration file (such as `_config.yml.example`) in the theme directory. Most of the JSON Schemas reside in the `<icarus_directory>/include/schema` directory, while others reside in the ppoffice/hexo-component-inferno repository. You can append `--icarus-dont-generate-config` to your hexo command to prevent the automatic generation of configuration files.

Every time you run a hexo command, the theme also validates your configuration file against the JSON Schemas. If any error occurs during validation, Icarus prints the location and type of the error to the screen. For example, the following error message tells us that the logo configuration value should be a string or an object, not an integer. You can append `--icarus-dont-check-config` to your hexo command to skip validation, but this is not recommended.

```
hexo log
INFO  === Checking package dependencies ===
INFO  === Checking the configuration file ===
WARN  Configuration file failed one or more checks.
WARN  Icarus may still run, but you will encounter unexcepted results.
WARN  Here is some information for you to correct the configuration file.
WARN  [
  {
    keyword: 'type',
    dataPath: '.logo',
    schemaPath: '#/properties/logo/type',
    params: { type: 'string,object' },
    message: 'should be string,object'
  }
]
```

In addition, if your default theme configuration file is not the latest version, Icarus runs migration scripts to upgrade it to the latest version. These scripts reside in the `<icarus_directory>/include/migration` directory. You can append `--icarus-dont-upgrade-config` to your hexo command to disable configuration upgrades. Finally, Icarus also checks whether the Node.js libraries the theme depends on are installed and reminds you to install any missing libraries.
