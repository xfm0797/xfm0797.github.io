---
lang: en
translationKey: hexo-theme-anzhiyu-install
title: hexo-theme-anzhiyu AnZhiYu Theme Installation
date: 2025-10-05 08:00:00
description: A theme based on a modified version of hexo-theme-butterfly
cover: https://upload-bbs.miyoushe.com/upload/2025/07/09/125766904/658277d773c29a145adf0d05055ce477_4298679859740980134.webp
category: theme
toc: true
---


# Theme Installation
## Setting Up a Hexo Blog
If you don't have a Hexo blog yet, please follow the [Hexo official documentation](https://hexo.io/docs/) to install and set up your site.

## A Word from the Author

Please note that the configuration in `_config.anzhiyu.yml` takes priority over `_config.yml`. Therefore, after updating the theme, you need to compare the content of `theme/anzhiyu/_config.yml` in the theme folder. The [release](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/releases) notes usually point out config changes or provide a diff between config file versions — simply apply the corresponding changes to your config file.

:::tip
To new users of this theme:

- This guide has been polished over several versions, and most features are described in detail. Please read it carefully to save time for yourself and others;

- In this guide, "**site configuration**" refers to the `_config.yml` in the Hexo blog root directory, and "**theme configuration**" refers to `theme/anzhiyu/_config.yml` or `_config.anzhiyu.yml`. Please distinguish between them;

- The `source` directory mentioned in this guide always refers to the `source` folder in the blog directory. Modifying the `source` directory inside the theme is not recommended;

- Before running either `hexo g` or `hexo s`, it is best to run `hexo clean` first to clear the local cache;

- The local `hexo s` result is the source of truth. Most anomalies after deployment are caused by CDN/online caching; if there are no errors, just wait a while and things should return to normal;

- Since different versions of the theme may differ in configuration, this guide is based on the latest version.

:::

This guide does not cover every configuration option — almost every setting has a comment in the theme configuration, so use the guide together with those comments.

Also, this guide only covers usage within the theme itself. For questions about Hexo itself or Hexo plugins, please refer to their respective documentation.

For other theme-related questions, please leave a comment in the [issues](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/issues/new).

## Installing the Theme
::: tip Friendly reminder
The Anzhiyu theme comes in two versions: **Main** (stable) and **Dev** (testing). We recommend installing the **Github** (stable) version for the best theme experience.
:::

**Method 1 (Github, recommended):**

```bash
git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```

If the installation fails, you can use the following proxy URL:

```bash
git clone -b main https://ghproxy.com/https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```

**Method 2 (Release, recommended):**

Download the [latest release](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/releases) and extract it into the `themes` directory, then rename the extracted folder to `anzhiyu`.

**Method 3 (npm install):**
```bash
npm i hexo-theme-anzhiyu
```

This method only supports Hexo 5.0.0 and above. Installing via npm does not create the theme folder in `themes` — instead it goes into `node_modules`.

**Dev (testing) version**
```bash [dev]
git clone -b dev https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```
The dev version may contain bugs. If you value stability, install the stable version.

## Applying the Theme
Open the `config.yml` in the **Hexo** root directory, find the following setting, and change the theme to `anzhiyu`:

```yml [config.yml]
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: anzhiyu
```

## Installing the pug and stylus Renderer Plugins

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

If installation fails, you can try using cnpm:

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save --registry=http://registry.npmmirror.com
```

## Overriding Configuration

Overriding the configuration lets you keep the "theme configuration" outside the anzhiyu directory, so your custom settings won't be lost when updating the theme.

Users who installed the theme via npm can skip this; other users are encouraged to learn this approach.

- macos/linux
  Run in the blog root directory:

```bash
cp -rf ./themes/anzhiyu/_config.yml ./_config.anzhiyu.yml
```

- windows
  Copy `/themes/anzhiyu/_config.yml` to the Hexo root directory and rename it to `_config.anzhiyu.yml`

From now on, any theme configuration changes only need to be made in `_config.anzhiyu.yml`.

Notes:
 - Any configuration present in `_config.anzhiyu.yml` has high priority; modifying the original `_config.yml` will have no effect.
 - Theme updates may come with configuration changes. Pay attention to the update notes — you may need to manually sync changes into `_config.anzhiyu.yml`.
 - To check whether the override is in effect, use `hexo g --debug` and inspect the command-line output.
 - If you want to override a setting to an empty value, do not delete the primary key — otherwise the override won't work.

## Running Hexo Locally

```bash
hexo cl
hexo g
hexo s
```

Now you can see the result.

## Upgrade Methods

**Method 1**
> Applies when the theme was installed via GitHub or a Release archive, and you haven't modified any code yourself.

1. First rename the original folder to something else, e.g. `anzhiyu-bkp`, so you can roll back if the upgrade fails;

2. Upgrade using your installation method

`Github`: Simply re-run the install command:

```bash
git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```

`Release`: Follow the installation steps — download the [release](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/releases), extract it, and rename the folder to `anzhiyu`;

3. Compare the upgraded `_config.yml` against your own. If any settings changed (renamed or deprecated), the [release](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/releases) notes usually point them out or provide a config diff — apply the corresponding changes to your config file.

**Method 2**

> Applies when the theme was installed via npm.

Run the following command in the blog directory:
```bash
npm update --save hexo-theme-anzhiyu
```

Compare the upgraded `_config.yml` against your own. If any settings changed (renamed or deprecated), the [release](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/releases) notes usually point them out or provide a config diff — apply the corresponding changes to your config file.


**Method 3**

Full update: delete the **theme/anzhiyu** folder, then re-run the install command.

Compare the upgraded `_config.yml` against your own. If any settings changed (renamed or deprecated), the [release](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/releases) notes usually point them out or provide a config diff — apply the corresponding changes to your config file.


::: danger Video Tutorial
What? Still stuck? Here's a video: [AnZhiYu Theme Installation Tutorial](https://www.bilibili.com/video/BV1Rs4y127hu/?spm_id_from=333.788&vd_source=4d9717102296e4b7a60ecdfad55ae2dd)
:::

## Version Number Semantics

This project uses the X.Y.Z version format, which differs slightly from the common [semantic versioning spec](https://semver.org/). The specifics are as follows:

X: A product-level redesign, including major framework refactors, with large-scale feature and configuration changes. You must read the relevant documentation before updating.

Y: Includes medium-to-large new features, as well as breaking (non-backward-compatible) feature and configuration changes. Updating to this version may require modifying your configuration or removing some existing features.

Z: Includes not only bug fixes and small new features, but also backward-compatible updates to existing features and configuration. In principle, no extra action is needed when this version number changes.
