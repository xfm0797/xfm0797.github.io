---
lang: en
translationKey: hexo-theme-next
title: hexo-theme-next — An Elegant, High-Quality Hexo Theme
date: 2025-11-01 21:26:36
description: hexo-theme-next is an elegant, high-quality Hexo theme
cover: https://img.lovou.eu.org/file/1762003875852_hexo-theme-next.png
category: theme
toc: true
---



# <div align="center"><a title="NexT website repository" href="https://github.com/theme-next/theme-next.org"><img align="center" width="56" height="56" src="https://raw.githubusercontent.com/theme-next/hexo-theme-next/master/source/images/logo.svg?sanitize=true"></a> e x T</div>

<p align="center">
  «NexT» is an elegant, high-quality <a href="https://hexo.io">Hexo</a> theme, crafted with love from every little detail.
<br>
<br>
  <a href="https://www.npmjs.com/package/hexo-theme-next"><img src="https://img.shields.io/github/package-json/v/theme-next/hexo-theme-next?style=flat-square"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E=10.9.0-green?style=flat-square"></a>
  <a href="https://hexo.io"><img src="https://img.shields.io/badge/hexo-%3E=4.0.0-blue?style=flat-square&logo=hexo"></a>
  <a href="https://github.com/theme-next/hexo-theme-next/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-%20AGPL-orange?style=flat-square&logo=gnu"></a>
<br>
  <a href="https://bestpractices.coreinfrastructure.org/projects/2625"><img src="https://img.shields.io/cii/level/2625?style=flat-square" title="Core Infrastructure Initiative Best Practices"></a>
  <a href="https://travis-ci.org/theme-next/hexo-theme-next?branch=master"><img src="https://img.shields.io/travis/theme-next/hexo-theme-next/master?style=flat-square&logo=travis%20ci" title="Travis CI [Linux]"></a>
  <a href="https://app.codacy.com/manual/theme-next/hexo-theme-next/dashboard"><img src="https://img.shields.io/codacy/grade/72f7fe7609c2438a92069f448e5a341a/master?style=flat-square&logo=codacy" title="Project Grade"></a>
  <img src="https://img.shields.io/snyk/vulnerabilities/github/theme-next/hexo-theme-next?style=flat-square" title="Vulnerabilities">
<br>
  <img src="https://user-images.githubusercontent.com/16272760/63487983-da41b080-c4df-11e9-951c-64883a8a5e9b.png">
</p>

## Instant Preview

<p align="center">
  💟 <a href="https://muse.theme-next.org">Muse</a> | 🔯 <a href="https://mist.theme-next.org">Mist</a> | ♓️ <a href="https://pisces.theme-next.org">Pisces</a> | ♊️ <a href="https://theme-next.org">Gemini</a>
<br>
<br>
  See <a href="https://github.com/theme-next/awesome-next#live-preview">here</a> for more examples of «NexT».
</p>

## Installation

The simplest way to install is to clone the entire repository directly:

```sh
$ cd hexo
$ git clone https://github.com/theme-next/hexo-theme-next themes/next
```

Alternatively, if you want to use another method, see the [detailed installation steps][docs-installation-url].

## Plugins

NexT supports a large number of third-party plugins, which can be easily configured.

For example, if you want to use the `pjax` plugin on your site, open the NexT config file and enable the `pjax` option:

```yml
# Easily enable fast Ajax navigation on your website.
# Dependencies: https://github.com/theme-next/theme-next-pjax
pjax: true
```

Then, open the «Dependencies» link above it to see its installation steps.

### Setting the CDN

If you want to load plugin scripts via a CDN, you need to set the relevant CDN links.

For example, if you want to use the `mediumzoom` plugin loaded via CDN, open the Next config file and find the following:

```yml
vendors:
  # ...
  # Some contents...
  # ...
  mediumzoom: # Set or update mediumzoom CDN URL.
```

## Update

NexT releases a new version every month. You can update to the latest master branch with the following commands:

```sh
$ cd themes/next
$ git pull
```

If you receive any error reports during this process (e.g., **«Commit your changes or stash them before you can merge»**), we recommend you use the [Hexo data files][docs-data-files-url] feature.\
However, you can also bypass this update error by committing (`Commit`), stashing (`Stash`), or discarding (`Discard`) your local changes. See [here](https://stackoverflow.com/a/15745424/5861495) for details.

**If you want to update from v5.1.x to the latest version, read [this document][docs-update-5-1-x-url].**

## Feedback

* Browse the [Awesome NexT][awesome-next-url] list to share plugins and tutorials with other users.
* Join our [Telegram][t-chat-url] / [Gitter][gitter-url] / [Riot][riot-url] chat.
* Please take a few seconds to [add or fix a translation][i18n-url].
* Report bugs in [GitHub Issues][issues-bug-url].
* Request new features on [GitHub][issues-feat-url].
* Vote for [popular feature requests][feat-req-vote-url].

## Contribute Your Code

We welcome you to join the development of NexT and contribute your part. See the [contribution guide][contributing-document-url]. 🤗

You are also welcome to submit Issues or Pull Requests to our [official plugins][official-plugins-url] at any time.

## Contributors

[![][contributors-image]][contributors-url]

## Acknowledgements

<p align="center">
  «NexT» specially thanks these great services that support our core infrastructure:
<br>
<br>
  <a href="https://github.com"><img align="center" width="100" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.netlify.com"><img align="center" width="150" src="https://cdn.netlify.com/15ecf59b59c9d04b88097c6b5d2c7e8a7d1302d0/1b6d6/img/press/logos/full-logo-light.svg"></a>
<br>
  <sub>GitHub allows us to host the Git repositories, and Netlify allows us to distribute the docs.</sub>
<br>
<br>
  <a href="https://crowdin.com"><img align="center" width="180" src="https://support.crowdin.com/assets/logos/crowdin-logo1-small.png"></a>
<br>
  <sub>Crowdin allows us to translate the docs conveniently.</sub>
<br>
<br>
  <a href="https://codacy.com"><img align="center" width="155" src="https://user-images.githubusercontent.com/16944225/55026017-623f8f00-5002-11e9-88bf-0d6a5884c6c2.png"></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://travis-ci.com"><img align="center" width="140" src="https://raw.githubusercontent.com/travis-ci/travis-web/master/public/images/logos/TravisCI-Full-Color.png"></a>
<br>
  <sub>Codacy allows us to monitor code quality, and Travis CI allows us to run the test suites.</sub>
</p>

[docs-installation-url]: https://github.com/theme-next/hexo-theme-next/blob/master/docs/zh-CN/INSTALLATION.md
[docs-data-files-url]: https://github.com/theme-next/hexo-theme-next/blob/master/docs/zh-CN/DATA-FILES.md
[docs-update-5-1-x-url]: https://github.com/theme-next/hexo-theme-next/blob/master/docs/zh-CN/UPDATE-FROM-5.1.X.md

[t-news-url]: https://t.me/theme_next_news
[t-chat-url]: https://t.me/theme_next_chinese
[gitter-url]: https://gitter.im/theme-next
[riot-url]: https://riot.im/app/#/room/#theme-next:matrix.org
[i18n-url]: https://i18n.theme-next.org

[awesome-next-url]: https://github.com/theme-next/awesome-next
[issues-bug-url]: https://github.com/theme-next/hexo-theme-next/issues/new?assignees=&labels=Bug&template=bug-report.md
[issues-feat-url]: https://github.com/theme-next/hexo-theme-next/issues/new?assignees=&labels=Feature+Request&template=feature-request.md
[feat-req-vote-url]: https://github.com/theme-next/hexo-theme-next/issues?q=is%3Aopen+is%3Aissue+label%3A%22Feature+Request%22

[contributing-document-url]: https://github.com/theme-next/hexo-theme-next/blob/master/docs/zh-CN/CONTRIBUTING.md
[official-plugins-url]: https://github.com/theme-next
[contributors-image]: https://opencollective.com/theme-next/contributors.svg?width=890
[contributors-url]: https://github.com/theme-next/hexo-theme-next/graphs/contributors
