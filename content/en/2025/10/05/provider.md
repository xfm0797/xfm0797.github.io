---
lang: en
translationKey: provider
title: Qexo Blog Settings
date: 2025-10-05 02:32:19
cover: https://img.lovou.eu.org/file/1759567275346_cover.png
---

# Provider Settings

Qexo has supported provider extensions since version 2.0


|                | Github | Gitlab        | Local    |
| -------------- | ------ | ------------- | -------- |
| Get file       | √      | No Size data  | √        |
| Get directory  | √      | √             | √        |
| Save file      | √      | √             | √        |
| Delete file    | √      | √             | √        |
| Webhook        | Auto   | Manual        | ×        |
| Auto deploy    | Action | Action        | CLI      |

# Blog Platform Settings

Qexo has supported multiple blog platforms since version 2.6 (as of 2.6, Hexo, Hugo, and Valaxy are supported)

## Using Github

If you run into problems during deployment, you can use the [HPP Validation Helper](https://hexoplusplus.cronfly.workers.dev/?step=start) to self-check your configuration *GitHub only*. If everything looks fine, check whether there are already published posts in the repository

### Github Repository

The repository where your blog source code with **automated deployment** lives

```
username/repo
```

References:

https://blog.cyfan.top/p/e626cb30.html

https://oplog.cn/archives/24998.html

https://crazywong.com/posts/74006f42

### Project Branch

The branch of the repository where your blog source code with automated deployment lives

```
master
```

### Github Token

A Token generated in [Github Settings](https://github.com/settings/tokens) (the Classical type is recommended)
It needs permissions under Repo & Workflow *granting all permissions is not recommended*

```
wrq_P8sYPlYA9fjMlOPEYSKA84xxxxxxxxxxxxxx
```

### Repository Path

The path within the repository where your blog source code with automated deployment lives. Leave empty if it's the root directory

```
path/
```

## Using Gitlab

### Gitlab Repository

The repository where your blog source code with **automated deployment** lives

```
username/repo
```

References:

https://blog.cyfan.top/p/e626cb30.html

https://oplog.cn/archives/24998.html

https://crazywong.com/posts/74006f42

### Project Branch

The branch of the repository where your blog source code with automated deployment lives

```
master
```

### Gitlab Token

A Token generated in [Gitlab Settings](https://gitlab.com/-/profile/personal_access_tokens)
It needs at least read and write permissions under Repo *granting all permissions is not recommended*

```
wrq_P8sYPlYA9fjMlOPEYSKA84xxxxxxxxxxxxxx
```

### Repository Path

The path within the repository where your blog source code with automated deployment lives. Leave empty if it's the root directory

```
path/
```

## Using Local

### Blog Path

The local *absolute path* where your blog source code lives

```
D:\Hexo
```

```
/www/myblog
```

### Auto Deploy

The auto-deploy command, executed after each source code change. Leave empty to disable

```bash
hexo clean && hexo g && hexo d
```

```bash
hugo
```

If you see /bin/sh: 1: xxx : not found

Try prepending `/bin/bash -c` to each command

```bash
/bin/bash -c "hexo clean" && /bin/bash -c "hexo g"
```
