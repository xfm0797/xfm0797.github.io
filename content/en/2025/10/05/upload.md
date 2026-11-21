---
lang: en
translationKey: upload
title: Qexo Image Host Configuration
date: 2025-10-05 03:07:10
cover: https://img.lovou.eu.org/file/1759567275346_cover.png
---

# Image Host Configuration

Since 2.0.0, Qexo supports a modular approach to image host integration. The previous S3, FTP, and Custom documentation has been merged here

## Remote API

Qexo provides a custom API image host feature. Once configured, you can upload images in the post/page editing interface

### API URL

The image host's image upload API

```
https://7bu.top/api/upload
```

### POST Parameter Name

The parameter name of the image file in the image host's upload API

```
image
```

![](https://s2.loli.net/2024/07/19/9IJXAxzrCcKvs3Y.png)

### JSON Path

The path to the **image URL** in the data returned by the image host API. Leave empty if the whole response is the URL
Example:

```
data.url
```

### Custom Headers

Headers attached to the POST request. Standard JSON format required. Leave empty if not needed

```json
{"key":"value"}
```

### Custom BODY

The extra request body for the POST request. Standard JSON format required. Leave empty if not needed

```json
{"key":"value"}
```

### Custom Prefix

The prefix to be added to the returned URL. Leave empty if not needed

```
some_text_or_url
```

### Delete API

The path to the **delete image URL** in the data returned by the image host API. Leave empty if it doesn't exist
Example:

```
data.delete_url
```

## S3 Protocol

Qexo provides support for S3 buckets. Once configured, you can upload images in the post/page editing interface

### Access Key ID

The Access Key ID of the S3 application

```
1000000000000080000000000
```

### Access Key

The Access Key of the S3 application

```
S12******************6129E
```

### Bucket Name

The S3 Bucket name

```
Bucket
```

### Edge Node

The S3 Endpoint

```
https://s3.us-west-002.backblazeb2.com
```

### Save Path

The path where files are saved after upload, including the file name


| Keyword      | Meaning             | Example                          |
| ------------ | ------------------- | -------------------------------- |
| *{year}*     | Current year        | 21                               |
| *{month}*    | Current month       | 1                                |
| *{day}*      | Current day         | 2                                |
| *{YEAR}*     | Current year        | 2021                             |
| *{MONTH}*    | Current month       | 01                               |
| *{DAY}*      | Current day         | 02                               |
| *{filename}* | Filename w/o suffix | image                            |
| *{time}*     | Timestamp           | 1640186955.4339228               |
| *{extName}*  | File extension      | png                              |
| *{md5}*      | Image MD5-Hash      | 0c8bfe6821a91c3d96b25e2ea2dcf827 |

```
Qexo/{year}/{month}/{md5}.{extName}
```

### Custom Domain

The URL from which the file link is returned — the final returned link. Supports the same keywords as above

```
https://file.example.com/file/CDN/Qexo/{year}/{month}/{md5}.{extName}
```

## FTP Protocol

You can use this module to upload images to a remote FTP location

### FTP Host

The FTP host to connect to

```
127.0.0.1
```

### FTP Port

The FTP connection port, usually **21**

```
21
```

### Username

The FTP login username

```
username
```

### Password

The FTP login password

```
password
```

### Save Path

The path where files are saved after upload, including the file name


| Keyword      | Meaning             | Example                          |
| ------------ | ------------------- | -------------------------------- |
| *{year}*     | Current year        | 21                               |
| *{month}*    | Current month       | 1                                |
| *{day}*      | Current day         | 2                                |
| *{YEAR}*     | Current year        | 2021                             |
| *{MONTH}*    | Current month       | 01                               |
| *{DAY}*      | Current day         | 02                               |
| *{filename}* | Filename w/o suffix | image                            |
| *{time}*     | Timestamp           | 1640186955.4339228               |
| *{md5}*      | Image MD5-Hash      | 0c8bfe6821a91c3d96b25e2ea2dcf827 |
| *{extName}*  | File extension      | png                              |

```
/Qexo/{year}/{month}/{time}.{extName}
```

### Custom Domain

The URL from which the file link is returned — the final returned link. Supports the same keywords as above

```
https://file.example.com/file/CDN/Qexo/{year}/{month}/{time}.{extName}
```

## Github

(Not recommended) Upload images to a Github repository and use Github Actions for further processing

### Github Repository

The repository your images are uploaded to

```
username/repo
```

### Project Branch

The branch of the repository where your images are uploaded

```
master
```

### Github Token

A Token generated in [Github Settings](https://github.com/settings/tokens)
It needs at least read and write permissions under Repo *granting all permissions is not recommended*

```
wrq_P8sYPlYA9fjMlOPEYSKA84xxxxxxxxxxxxxx
```

### Save Path

The path where files are saved after upload, including the file name


| Keyword      | Meaning             | Example                          |
| ------------ | ------------------- | -------------------------------- |
| *{year}*     | Current year        | 21                               |
| *{month}*    | Current month       | 1                                |
| *{day}*      | Current day         | 2                                |
| *{YEAR}*     | Current year        | 2021                             |
| *{MONTH}*    | Current month       | 01                               |
| *{DAY}*      | Current day         | 02                               |
| *{filename}* | Filename w/o suffix | image                            |
| *{time}*     | Timestamp           | 1640186955.4339228               |
| *{md5}*      | File MD5-Hash       | 0c8bfe6821a91c3d96b25e2ea2dcf827 |
| *{extName}*  | File extension      | png                              |

```
Qexo/{year}/{month}/{filename}_{md5}.{extName}
```

### Custom Domain

The URL from which the file link is returned — the final returned link. Supports the same keywords as above

```
https://github.com/username/repo/raw/master/Qexo/{year}/{month}/{filename}_{md5}.{extName}
```
