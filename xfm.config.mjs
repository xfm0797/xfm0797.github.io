export default {
  site: {
    title: 'XFMpress',
    description: '静态站点生成器XFMpress的官方网站',
    url: 'https://xfm0797.github.io',
    lang: 'zh-CN',
    languages: ['zh-CN', 'en'],
    author: 'xfm',
    base: '/',
    favicon: '/assets/favicon.svg',
    announcement: '欢迎来到 XFMpress 官网：使用教程 13 篇、更新日志 22 篇、主题 3 篇、官方插件 17 篇，欢迎按顺序阅读！',
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
  server: { port: 4173 },
};
