---
lang: en
translationKey: hexo-theme-Fluid
title: hexo-theme-Fluid Installation and Configuration Guide
date: 2025-10-07 14:24:55
description: hexo-theme-Fluid installation and configuration guide
cover: https://img.lovou.eu.org/file/1759567275346_cover.png
category: theme
toc: true
---


hexo-theme-Fluid is a minimalist Hexo theme built around a "content-first" philosophy. It features a clean design, fast loading, and lightweight configuration — perfect for text-focused blogs (such as notes, essays, and journals). Below are the detailed installation and configuration steps:

### **1. Preparation Before Installation**

1. **Make sure the Hexo environment works**

   Node.js and Git are installed, and a Hexo blog has been initialized (if not, refer to the previous tutorial: `hexo init myblog && cd myblog && npm install`).

2. **Check the Hexo version**

   Fluid requires Hexo ≥ 5.0.0. Run `hexo -v` in the terminal to confirm the version. If it's below the requirement, upgrade Hexo:

```bash
   npm install hexo@latest --save
```

### **2. Installing the Fluid Theme**

#### 1. Clone the theme locally

Navigate to the Hexo blog root directory (e.g., `myblog`) and run the following command to clone the Fluid theme into the `themes/fluid` folder:

```bash
git clone https://github.com/fluid-dev/hexo-theme-fluid.git themes/fluid
```

#### 2. Install the theme dependencies

Fluid depends on a few plugins, which need to be installed manually:

```bash
npm install hexo-theme-fluid@latest --save
```

### **3. Enabling the Theme**

Edit the **global configuration file** `_config.yml` in the Hexo root directory and change the `theme` field to `fluid`:

```yaml
theme: fluid  # Replace the default theme (e.g., landscape)
```

### **4. Core Configuration (Key Step)**

Fluid's configuration is handled by two files:

- **Theme default configuration**: `themes/fluid/_config.yml` (contains the theme's default settings; direct modification is not recommended).

- **User custom configuration**: It is recommended to copy the theme config file to the root directory and name it `_config.fluid.yml` (higher priority, and won't be overwritten when updating the theme).

#### 1. Copy the configuration file (recommended)

Run this in the blog root directory:

```bash
cp themes/fluid/_config.yml _config.fluid.yml
```

All subsequent configuration goes into `_config.fluid.yml`.

#### 2. Basic configuration (required changes)

Open `_config.fluid.yml` and modify the following core settings:

##### (1) Basic site information

```yaml
# Site title and subtitle (shown at the top of the homepage)

title: Your Blog Name

subtitle: "Subtitle / One-line description"



# Author info (shown in the sidebar/footer)

author: Your Name

avatar: /img/avatar.jpg  # Avatar path (the image must be in the source/img/ folder)
```

##### (2) Navigation menu

Configure the top navigation menu (e.g., Home, Categories, Tags):

```yaml
menu:

  Home: / || fa fa-home

  Categories: /categories/ || fa fa-th

  Tags: /tags/ || fa fa-tags

  About: /about/ || fa fa-user

  # Optional: add custom pages (e.g., "Archives")

  # Archives: /archives/ || fa fa-archive
```

- Pages linked in the menu need to be created manually (e.g., the "About" page):



```bash
  hexo new page "about"  # Edit content in source/about/index.md
```



##### (3) Homepage settings

The Fluid homepage shows a list of posts by default. You can configure the banner image and description:

```yaml
index:

  # Homepage banner image (recommended size 1920×1080)

  top_img: /img/index_top.jpg  # Put the image in the source/img/ folder

  # Homepage description text (shown below the title)

  description:

    - One line of description

    - Can span multiple lines

    - Supports Markdown syntax (e.g., **bold**)
```

##### (4) URL configuration (affects resource loading)

Make sure the `url` setting in the Hexo root `_config.yml` is correct (the blog address after deployment):

```yaml
# In the root _config.yml

url: https://yourname.github.io  # Replace with your blog address (e.g., the GitHub Pages URL)
```

#### 3. Feature configuration (enable as needed)

##### (1) Comment system (using Waline as an example — lightweight and supports anonymous comments)

1. First go to the [Waline website](https://waline.js.org/) to register and get your `serverURL` (the comment backend address).

2. Configure it in `_config.fluid.yml`:

```yaml
  comments:

      enable: true

      type: waline

      waline:

      serverURL: https://your-waline-server.example.com  # Your Waline service address

      placeholder: Say something~  # Placeholder text for the comment box
```



##### (2) Code highlighting

Fluid has built-in code highlighting and supports multiple themes (e.g., `atom-one-dark`, `github`):

```yaml
code:

  highlight:

    theme: atom-one-dark  # Code highlight theme

    line_number: true     # Show line numbers

    wrap: true            # Auto-wrap long lines of code
```

##### (3) Social links (shown in the sidebar or footer)

```yaml
social:

  GitHub: https://github.com/yourname || fa fa-github

  Zhihu: https://zhihu.com/people/yourname || fa fa-book

  Email: mailto:your@email.com || fa fa-envelope

  # Icons come from Font Awesome; you can add other platforms yourself
```

##### (4) Post copyright notice

Automatically adds copyright info at the end of each post:

```yaml
copyright:

  enable: true

  # Copyright notice content (supports Markdown)

  content: "This article is licensed under the <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a> license. Please credit the source when republishing."
```

### **5. Previewing Locally**

After configuration, run the following commands to preview locally:

```bash
hexo clean  # Clear the cache (make sure the new config takes effect)
hexo g      # Generate static files
hexo s      # Start the local server
```

Visit `http://localhost:4000` in your browser and check that the theme styles, menu, and features work correctly.

### **6. Updating the Theme**

When Fluid releases a new version, you can update the theme files (this won't affect your custom settings in `_config.fluid.yml`):

```bash
# Enter the theme directory
cd themes/fluid
# Pull the latest code
git pull
# Return to the root directory and regenerate
cd ..
hexo clean && hexo g
```

hexo-theme-Fluid is a minimalist Hexo theme built around a "content-first" philosophy. It features a clean design, fast loading, and lightweight configuration — perfect for text-focused blogs (such as notes, essays, and journals). Below are the detailed installation and configuration steps:

### **1. Preparation Before Installation**

1. **Make sure the Hexo environment works**

   Node.js and Git are installed, and a Hexo blog has been initialized (if not, refer to the previous tutorial: `hexo init myblog && cd myblog && npm install`).

2. **Check the Hexo version**

   Fluid requires Hexo ≥ 5.0.0. Run `hexo -v` in the terminal to confirm the version. If it's below the requirement, upgrade Hexo:

```bash
   npm install hexo@latest --save
```



### **2. Installing the Fluid Theme**

#### 1. Clone the theme locally

Navigate to the Hexo blog root directory (e.g., `myblog`) and run the following command to clone the Fluid theme into the `themes/fluid` folder:

```bash
git clone https://github.com/fluid-dev/hexo-theme-fluid.git themes/fluid
```

#### 2. Install the theme dependencies

Fluid depends on a few plugins, which need to be installed manually:

```bash
npm install hexo-theme-fluid@latest --save
```

### **3. Enabling the Theme**

Edit the **global configuration file** `_config.yml` in the Hexo root directory and change the `theme` field to `fluid`:

```yaml
theme: fluid  # Replace the default theme (e.g., landscape)
```

### **4. Core Configuration (Key Step)**

Fluid's configuration is handled by two files:

- **Theme default configuration**: `themes/fluid/_config.yml` (contains the theme's default settings; direct modification is not recommended).

- **User custom configuration**: It is recommended to copy the theme config file to the root directory and name it `_config.fluid.yml` (higher priority, and won't be overwritten when updating the theme).

#### 1. Copy the configuration file (recommended)

Run this in the blog root directory:

```bash
cp themes/fluid/_config.yml _config.fluid.yml
```

All subsequent configuration goes into `_config.fluid.yml`.

#### 2. Basic configuration (required changes)

Open `_config.fluid.yml` and modify the following core settings:

##### (1) Basic site information

```yaml
# Site title and subtitle (shown at the top of the homepage)

title: Your Blog Name

subtitle: "Subtitle / One-line description"



# Author info (shown in the sidebar/footer)

author: Your Name

avatar: /img/avatar.jpg  # Avatar path (the image must be in the source/img/ folder)
```

##### (2) Navigation menu

Configure the top navigation menu (e.g., Home, Categories, Tags):

```yaml
menu:

  Home: / || fa fa-home

  Categories: /categories/ || fa fa-th

  Tags: /tags/ || fa fa-tags

  About: /about/ || fa fa-user

  # Optional: add custom pages (e.g., "Archives")

  # Archives: /archives/ || fa fa-archive
```

- Pages linked in the menu need to be created manually (e.g., the "About" page):



```bash
  hexo new page "about"  # Edit content in source/about/index.md
```



##### (3) Homepage settings

The Fluid homepage shows a list of posts by default. You can configure the banner image and description:

```yaml
index:

  # Homepage banner image (recommended size 1920×1080)

  top_img: /img/index_top.jpg  # Put the image in the source/img/ folder

  # Homepage description text (shown below the title)

  description:

    - One line of description

    - Can span multiple lines

    - Supports Markdown syntax (e.g., **bold**)
```

##### (4) URL configuration (affects resource loading)

Make sure the `url` setting in the Hexo root `_config.yml` is correct (the blog address after deployment):

```yaml
# In the root _config.yml

url: https://yourname.github.io  # Replace with your blog address (e.g., the GitHub Pages URL)
```

#### 3. Feature configuration (enable as needed)

##### (1) Comment system (using Waline as an example — lightweight and supports anonymous comments)

1. First go to the [Waline website](https://waline.js.org/) to register and get your `serverURL` (the comment backend address).

2. Configure it in `_config.fluid.yml`:



```yaml
comments:

     enable: true

     type: waline

     waline:

     serverURL: https://your-waline-server.example.com  # Your Waline service address

     placeholder: Say something~  # Placeholder text for the comment box
```



##### (2) Code highlighting

Fluid has built-in code highlighting and supports multiple themes (e.g., `atom-one-dark`, `github`):

```yaml
code:

  highlight:

    theme: atom-one-dark  # Code highlight theme

    line_number: true     # Show line numbers

    wrap: true            # Auto-wrap long lines of code
```

##### (3) Social links (shown in the sidebar or footer)

```yaml
social:

  GitHub: https://github.com/yourname || fa fa-github

  Zhihu: https://zhihu.com/people/yourname || fa fa-book

  Email: mailto:your@email.com || fa fa-envelope

  # Icons come from Font Awesome; you can add other platforms yourself
```

##### (4) Post copyright notice

Automatically adds copyright info at the end of each post:

```yaml
copyright:

  enable: true

  # Copyright notice content (supports Markdown)

  content: "This article is licensed under the <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a> license. Please credit the source when republishing."
```

### **5. Previewing Locally**

After configuration, run the following commands to preview locally:

```bash
hexo clean  # Clear the cache (make sure the new config takes effect)

hexo g      # Generate static files

hexo s      # Start the local server
```

Visit `http://localhost:4000` in your browser and check that the theme styles, menu, and features work correctly.

### **6. Updating the Theme**

When Fluid releases a new version, you can update the theme files (this won't affect your custom settings in `_config.fluid.yml`):

```bash
# Enter the theme directory

cd themes/fluid

# Pull the latest code

git pull

# Return to the root directory and regenerate

cd ..

hexo clean && hexo g
```

### **7. Common Issues**

1. **Homepage images not showing?**
-   Check that the image path is correct (images must be in `source/img/`, referenced as `/img/filename` in the config).

-   Make sure the `url` setting is correct (in the root `_config.yml`) to avoid path concatenation errors.
2. **Comment system not working?**
-   Confirm the `serverURL` is correct (and that Waline/Valine and similar services are running properly).

-   Run `hexo clean` and regenerate to avoid cached configs not being loaded.
3. **Navigation menu links return 404?**
-   Make sure the corresponding page exists (e.g., `hexo new page "categories"`) and that the page file `source/分类/index.md` exists.

The core advantage of the Fluid theme is "simple but not simplistic" — the configuration above covers the needs of most blogs. For more advanced features (e.g., custom CSS, SEO optimization), refer to the [Fluid official documentation](https://hexo.fluid-dev.com/docs/).
