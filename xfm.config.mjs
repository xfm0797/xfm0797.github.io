export default {
  site: {
    title: 'XFMpress',
    description: '极致性能的静态站点生成器 —— 零运行时依赖、多线程渲染、Nunjucks 风格模板、即插即用的主题与插件',
    // 多语言站点文案：site.i18n.<lang>.<字段>，模板按 page.lang 解析。
    // 引擎把 ...site 展开进 siteContext，所以模板里直接读 site.i18n.<lang>.<字段>；
    // 页面自己的 front-matter description（page.desc）优先级更高，只在页面没写时才用这里的翻译。
    i18n: {
      en: {
        description: 'A performance-first static site generator — zero runtime dependencies, multi-threaded rendering, Nunjucks-style templates, drop-in themes and plugins',
      },
    },
    url: 'https://xfm0797.github.io',
    lang: 'zh-CN',
    languages: ['zh-CN', 'en'],
    author: 'xfm',
    base: '/',
    favicon: '/assets/favicon.svg',
    announcement: '欢迎来到 XFMpress 官网：使用教程 13 篇、更新日志 22 篇、主题 4 篇、官方插件 18 篇，欢迎按顺序阅读！',
    nav: [
      { title: '首页', url: '/', translations: { en: { title: 'Home', url: '/en/' } } },
      { title: '分类', url: '/categories/', translations: { en: { title: 'Categories', url: '/en/categories/' } } },
      { title: '归档', url: '/archives/', translations: { en: { title: 'Archives', url: '/en/archives/' } } },
      { title: '关于', url: '/about/', translations: { en: { title: 'About', url: '/en/about/' } } },
    ],
  },
  theme: 'themes/xfmpress-theme-anziyu',
  defaults: { layout: 'post.html' },
  pagination: { perPage: 10 },
  // 评论：Waline（自托管 @ https://waline.xfm.qzz.io）。
  // serverURL 末尾不能带斜杠，否则客户端会拼出 //api/... 被 308 重定向，POST 发不出去。
  // 挂载点写在主题 post.html 里，插件只负责注入脚本与样式；
  // 英文页面的界面语言由 plugins/comments-lang.js 按 page.lang 改写。
  comments: {
    provider: 'waline',
    serverURL: 'https://waline.xfm.qzz.io',
    lang: 'zh-CN',
    login: 'enable',
    requiredMeta: ['nick', 'mail'],
    commentSorting: 'newest',
  },
  // 分享栏：xfm-plugin-share 在每篇文章结尾自动挂载（聚合页与独立页跳过）。
  // 按钮标签是中文常量，英文页由 plugins/share-lang.js 按 page.lang 改写。
  share: {
    networks: ['weibo', 'wechat', 'qq', 'qzone', 'twitter', 'telegram', 'copy'],
    title: '分享到',
  },
  server: { port: 4173 },
};
