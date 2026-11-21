---
lang: en
translationKey: hexo-github-basic-config
title: Quick Hexo + GitHub Blog Setup — Basic Steps and Configuration
date: 2025-11-04 14:51:20
description: Quick hexo+github blog setup — basic steps and settings
cover: https://img.lovou.eu.org/file/1762239638729_hexo-github-lovou.png
category: Hexo
toc: true
---

Below is a guide to the basic steps and settings for quickly setting up a blog with Hexo + GitHub, suitable for beginners:


### **1. Environment Preparation**
1. **Install Node.js**  
   Hexo runs on Node.js, which must be installed first:  
   - Download from the official site: [Node.js](https://nodejs.org/) (LTS version recommended, includes the npm package manager)  
   - Verify the installation: enter `node -v` and `npm -v` in the terminal; version numbers mean success.

2. **Install Git**  
   Used to manage code and deploy to GitHub:  
   - Download from the official site: [Git](https://git-scm.com/)  
   - Verify the installation: enter `git --version` in the terminal.

3. **GitHub Account and Repository Creation**  
   - After registering a GitHub account, create a new repository. The repository name must be:  
     `your-username.github.io` (e.g., `xxx.github.io`); otherwise it won't be accessible.


### **2. Hexo Initialization and Local Configuration**
1. **Install the Hexo CLI**  
   Open a terminal and run the following command to install Hexo globally:  
   ```bash
   npm install -g hexo-cli
   ```

2. **Initialize the blog project**  
   Choose a local folder (e.g., `Blog`) and run:  
   ```bash
   hexo init blog  # Create a folder named blog and initialize it
   cd blog         # Enter the project directory
   npm install     # Install dependencies
   ```

3. **Preview the blog locally**  
   Run the following commands to start a local server:  
   ```bash
   hexo clean     # Clear the cache (optional; can be skipped on first run)
   hexo g         # Generate static files (g = generate)
   hexo s         # Start the server (s = server)
   ```  
   Visit `http://localhost:4000` in your browser to see the default blog page.


### **3. Configuring Deployment to GitHub**
1. **Install the deployer plugin**  
   Run the following in the blog directory:  
   ```bash
   npm install hexo-deployer-git --save
   ```

2. **Modify the config file**  
   Open `_config.yml` in the blog directory (the main config file), find the `deploy` section, and change it to:  
   ```yaml
   deploy:
     type: git
     repo: https://github.com/your-username/your-username.github.io.git  # Repository URL (copy the HTTPS link from the GitHub repo)
     branch: main  # Branch name (new GitHub repos default to main; older ones may use master — make sure it matches)
   ```  
   Note: there must be a space after `:` in the config file, or it will throw errors.

3. **Deploy to GitHub**  
   Run the following commands to deploy:  
   ```bash
   hexo clean     # Clean old files
   hexo g         # Regenerate
   hexo d         # Deploy (d = deploy)
   ```  
   The first deployment requires entering your GitHub username and password (or use SSH keys for password-free deployment — the latter is recommended, see the advanced steps).

4. **Visit the blog**  
   After a successful deployment, wait a few minutes and visit `https://your-username.github.io` to see your blog.


### **4. Basic Settings (Required)**
1. **Edit the blog's basic information**  
   Edit `_config.yml` and modify the following:  
   ```yaml
   title: Your Blog Name     # Blog title
   subtitle: Subtitle        # Optional
   description: Blog description  # Used for SEO
   author: Your Name         # Author name
   language: zh-CN       # Language (Chinese)
   timezone: Asia/Shanghai   # Timezone
   ```

2. **Set the theme (using the default theme as an example)**  
   Hexo's default theme is `landscape`. To change the theme:  
   - Pick a theme from the [Hexo theme gallery](https://hexo.io/themes/) and clone it into the `themes` folder:  
     ```bash
     git clone theme-repo-url themes/theme-name
     ```  
   - Edit `_config.yml` and set `theme: theme-name` (e.g., `theme: next`).


### **5. Common Operations**
1. **Create a new post**  
   ```bash
   hexo new "Post Title"  # Generates a Markdown file under source/_posts
   ```  
   Edit the Markdown file to write your post; Markdown syntax and Hexo tags (e.g., images, code blocks) are supported.

2. **Publish a post**  
   After writing, run the deploy commands:  
   ```bash
   hexo clean && hexo g && hexo d
   ```

3. **Create a page (e.g., "About")**  
   ```bash
   hexo new page "about"  # Generates index.md under source/about
   ```


### **6. Advanced Optimization (Optional)**
- **SSH password-free deployment**: Generate SSH keys and add them to GitHub to avoid entering a password every time ([see the GitHub docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)).
- **Custom domain**: Bind your own domain in the GitHub repository settings (requires purchasing a domain and setting up DNS).
- **Plugin extensions**: Install comment plugins (e.g., `gitalk`), analytics plugins (e.g., `busuanzi`), etc. to enhance functionality.


With the steps above, you can quickly set up a working Hexo blog and deploy it to GitHub; afterwards you can customize the theme and features as needed.
