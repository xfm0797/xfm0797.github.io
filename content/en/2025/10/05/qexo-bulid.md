---
lang: en
translationKey: qexo-bulid
title: Deploying the Qexo Project
date: 2025-10-05 01:05:49
cover: https://img.lovou.eu.org/file/1759567275346_cover.png
category: Hexo
tags: [qexo]
---


# Deployment

Thanks to Python's powerful cross-platform capabilities, Qexo can be deployed on various platforms. Supported deployment methods are Vercel or Docker. Deploying from source locally is recommended only for advanced users.

One thing worth noting: if you deploy on Vercel, I do not recommend bringing your own database, because you often can't guarantee the connection quality with Vercel.

## Docker Deployment

It is recommended to use Docker to deploy the Qexo app anytime, anywhere with one click

> Qexo now supports pulling images from the ghcr.io or cnb.cool registries. If you are a user in mainland China, it is recommended to replace `abudulin/qexo` below with `docker.cnb.cool/qexo/qexo` to speed up deployment

```bash
docker run -d \
    --restart=unless-stopped \
    -v $(pwd)/db:/app/db \
    -p 8000:8000 \
    -e TIMEOUT=600 \
    --name="qexo" \
    abudulin/qexo:latest
```

Here `$(pwd)/db` is the data storage directory; you can change it to whatever you need

If you need the Dev branch, pull `qexo:testing`

Of course, you can also use docker-compose

```yml
version: '3.8'

services:
  qexo:
    image: abudulin/qexo:latest
    container_name: qexo
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      WORKERS: 4
      THREADS: 4
      TIMEOUT: 600
    volumes:
      - ./db:/app/db
```

## Vercel Deployment (PostgreSQL/Vercel)

You can use the free database provided by Vercel. But note that this is a Beta feature

### One-Click Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/am-abudu/Qexo)

The first deployment will fail — ignore the error and proceed to the next steps

### Applying for a Vercel Database

Go to the [Vercel Storage page](https://vercel.com/dashboard/stores), click Create Database in the top-right corner, and choose Postgres to create a free PostgreSQL database. Get the database connection details on the Connect page. Make sure to select the region matching your project from the previous step (usually Washington, D.C., USA (East) - iad1).

### Binding the Project

Select Projects in the left sidebar, then click Connect Project to connect to the project you created in the first step

### Deploy

Back on your project page, click Redeploy under Deployments to start deployment. If there are no Error messages, you can open the domain and go through the initialization wizard

## Vercel Deployment (MySQL/PlanetScale)

> The popular database platform PlanetScale removed its free plan — developers must pay up by April 8

You can use the free database provided by PlanetScale

### Applying for a PlanetScale Database

[Sign up for a PlanetScale account](https://www.planetscale.com/) and create a free MySQL database (mainland China IPs not supported). The region **must be AWS / N. Virginia (us-east-1)**, and record the database connection details

### One-Click Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/am-abudu/Qexo)

The first deployment will fail — ignore the error, re-enter the project, and add the Environment Variables in the project settings


| Name           | Meaning                                                   | Example                    |
| -------------- | --------------------------------------------------------- | -------------------------- |
| MYSQL_HOST     | MySQL database connection address                         | us-east.connect.psdb.cloud |
| MYSQL_PORT     | MySQL database port, default should be 3306               | 3306                       |
| MYSQL_USER     | MySQL database username                                   | abudu                      |
| MYSQL_NAME     | MySQL database name                                       | mydatabase                 |
| MYSQL_PASSWORD | MySQL database password                                   | password                   |
| PLANETSCALE    | (Optional) Set to 1 when using PlanetScale                | 1                          |

`PLANETSCALE` is used to disable foreign key constraints to prevent deployment failures on PlanetScale databases. If you bring your own database and have no special requirements, do **NOT** set it

Click Redeploy under Deployments to start deployment. If there are no Error messages, you can open the domain and go through the initialization wizard

## Vercel Deployment (PostgreSQL/SupaBase)

You can use the free database provided by SupaBase

### Applying for a SupaBase Database

[Sign up for a SupaBase account](https://supabase.com) and create a free SupaBase database. The region **must be N. Virginia (us-east-1)**. Get the database connection details on the project settings page; the password is the one you set

### One-Click Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/am-abudu/Qexo)

The first deployment will fail — ignore the error, re-enter the project, and add the Environment Variables in the project settings


| Name    | Meaning                                                       | Example            |
| ------- | ------------------------------------------------------------- | ------------------ |
| PG_HOST | PostgreSQL database connection address                        | db.xxx.supabase.co |
| PG_PORT | PostgreSQL database port, default should be 5432              | 5432               |
| PG_USER | PostgreSQL database username                                  | postgres           |
| PG_DB   | PostgreSQL database name                                      | postgres           |
| PG_PASS | PostgreSQL database password                                  | password           |

Click Redeploy under Deployments to start deployment. If there are no Error messages, you can open the domain and go through the initialization wizard

## Vercel Deployment (MongoDB/Not Recommended)

Since Django's support for MongoDB is not complete enough, it is recommended to **use another database (MySQL/PostgreSQL)** instead

### Applying for a MongoDB Database

[Sign up for a MongoDB account](https://www.mongodb.com/cloud/atlas/register) and create a free MongoDB database. The region **must be AWS / N. Virginia (us-east-1)**. On the Clusters page, click CONNECT and follow the steps to allow connections from all IP addresses, create a database user, and record the database connection details; the password is the one you set
![](https://s2.loli.net/2024/07/19/9axCOdNGJWUIqQ7.png)

### One-Click Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/am-abudu/Qexo)

The first deployment will fail — ignore the error, re-enter the project, and add the Environment Variables in the project settings


| Name         | Meaning                                                   | Example                                 |
| ------------ | --------------------------------------------------------- | --------------------------------------- |
| MONGODB_HOST | MongoDB database connection address                       | mongodb+srv://cluster0.xxxx.mongodb.net |
| MONGODB_PORT | MongoDB database port, default should be 27017            | 27017                                   |
| MONGODB_USER | MongoDB database username                                 | abudu                                   |
| MONGODB_DB   | MongoDB database name                                     | Cluster0                                |
| MONGODB_PASS | MongoDB database password                                 | password                                |

Click Redeploy under Deployments to start deployment. If there are no Error messages, you can open the domain and go through the initialization wizard

## Local Source Deployment (Advanced)

Since version 2.0, Qexo has fairly complete support for local deployment

Due to the variety and unpredictability of issues with local deployment, maintainers cannot guarantee effective support. Regular users are advised to use Docker deployment. Source deployment is recommended only for advanced users and requires setting up your own local Python3 environment

For local deployment, please use version 2.0+ or the Dev branch

### Download a Release

Download the latest version *Source code (zip)* from [Release](https://github.com/am-abudu/Qexo/releases) and extract it

### Prepare the Database

Refer to the [official Django documentation](https://docs.djangoproject.com/en/3.2/ref/databases/)


| Officially supported | Third-party supported |
| -------------------- | --------------------- |
| PostgreSQL           | CockroachDB           |
| MariaDB              | Firebird              |
| MySQL                | Google Cloud Spanner  |
| Oracle               | Microsoft SQL Server  |
| SQLite               | ......                |

Note 1: You may need to modify `requirement.txt` to install the dependencies for the database you use

Note 2: During one-click updates, files in the directory named `db` and the file named `configs.py` will not be deleted. You should put important files (such as the database) in that folder

### Edit the Configuration

Taking MySQL as an example, after confirming the relevant dependencies are installed, create and edit `configs.py` in the same directory as `manage.py`

```python
import pymysql
pymysql.install_as_MySQLdb()
DOMAINS = ["127.0.0.1", "yoursite.com"]
DATABASES = {
    'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'qexo',
            'USER': 'root',
            'PASSWORD': 'password',
            'HOST': '127.0.0.1',
            'PORT': '3306',
            'OPTIONS': {
                "init_command": "SET sql_mode='STRICT_TRANS_TABLES'"
            }
    }
}
```

If you need to import other libraries or run code in `init.py`, you can simply write `import pymysql` at the top

### Run the Commands

```bash
pip3 install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000 --noreload
```

For production environments, uWSGI or Gunicorn is recommended.
