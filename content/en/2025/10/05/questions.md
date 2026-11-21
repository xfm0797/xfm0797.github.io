---
lang: en
translationKey: questions
title: Qexo Frequently Asked Questions
date: 2025-10-05 01:18:20
cover: https://img.lovou.eu.org/file/1759567275346_cover.png
category: Hexo
tags: [qexo]
---


# Frequently Asked Questions

## What is an API Key

After you complete initialization, you can create/modify the API Key in the settings page. It is used for authentication in Webhooks. If left empty, the system will generate a random API Key

## Why Doesn't My New Post Show Up | How Does Qexo Keep Files Up to Date

Qexo uses a caching mechanism to speed things up. You can clear the cache in the settings & set up a Webhook to clear the cache automatically

## What is a Webhook

The Webhook in Qexo refers to /api/webhook, used for automated operations. Currently it can be used to clear the cache automatically

## 504 Time out After Installation

1. Your database is not configured correctly or does not allow access from all IPs on the whitelist. You can change this in the MongoDB console. After changing it, **make sure to redeploy**
2. Delete and recreate the database. Make sure the region **is AWS / N. Virginia (us-east-1)**

## 5xx Errors After Installation/Update

Every Qexo Release has been tested on the Dev branch, so major problems are uncommon. If you encounter a 500 or similar error, try the following steps

1. Check the database configuration
2. Clear the browser cache / application cache
3. On the `/settings.html` page, check the blog platform and provider configuration and click save
4. On `/advanced.html`, click the "Fix" button
5. If you can't log in, use the API: `/pub/fix?token=(Your API Key)`
6. Keep the environment variables for the database configuration and redeploy
7. Redeploy the entire application
8. Try the Dev branch

## AssertionError("xxx object ... its id attribute is set to None.")

Please check whether you ever used version 0.01 or 0.1. These two versions have serious problems — recreate the database and redeploy

## How to Create Posts in Subdirectories

Fill in dir/filename in the post name field. For example, if you want to create source/_posts/about/me.md, enter about/me

## KeyError: 'XXX'

This means the environment variable "XXX" was not found. Add it according to the table below, then Redeploy


| Name         | Meaning                                                                | Example                                       |
| ------------ | ---------------------------------------------------------------------- | --------------------------------------------- |
| DOMAINS      | The secure domains you allow to communicate. Note the double quotes and half-width punctuation | [".vercel.app", "127.0.0.1", ".yoursite.com"] |
| MONGODB_HOST | MongoDB database connection address                                    | mongodb+srv://cluster0.xxxx.mongodb.net       |
| MONGODB_PORT | MongoDB database port, default should be 27017                         | 27017                                         |
| MONGODB_USER | MongoDB database username                                              | abudu                                         |
| MONGODB_DB   | MongoDB database name                                                  | Cluster0                                      |
| MONGODB_PASS | MongoDB database password                                              | JWo0xxxxxxxx                                  |

## Github Configuration Validation Error

If you run into problems with the configuration, you can use the [HPP Validation Helper](https://hexoplusplus.cronfly.workers.dev/?step=start) to self-check. If everything looks fine, check whether there are already published posts in the repository

Note: the Github repository must be the one where your blog source code with **automated deployment** lives

## Vercel Usage Issues

Vercel's serverless function usage is plentiful for Qexo, but that won't stop malicious attacks, so protect your dashboard URL. Fortunately, Vercel won't charge you arbitrarily — no fees will be incurred once resources run out. If you're still worried, consider deploying on your own server [#Server Deployment#](https://github.com/am-abudu/Qexo/wiki/%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2)

## Online Update Failed

Check whether VERCEL_TOKEN and PROJECT_ID in the advanced settings are correct and belong to the Qexo deployment project

## My CDN Has Problems

If you are using a `.top` domain, do not try to use CNPM as the CDN source — this causes fatal problems. If the tragedy has already happened, recover from the command line:

```shell
python manage.py shell
```

Then run this Python script:

```python
from hexoweb.functions import get_setting, save_setting
save_setting('CDN_PREV', "https://unpkg.com/qexo-static@{version}/qexo")
```

## Forgot the Admin Password

If you unfortunately forgot your admin password, you can change it directly with the built-in command line

```shell
python manage.py changepassword [user_name]
```

## Other Issues

If you still have problems, submit an [issue](https://github.com/am-abudu/Qexo/issues) or join the [HexoPlusPlus group](https://jq.qq.com/?_wv=1027&k=rAcnhzqK) to ask

If you can't join the QQ group via the link, use the group number `467731779`
