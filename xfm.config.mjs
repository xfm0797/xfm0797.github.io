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
    announcement: '欢迎来到 XFMpress 官网，使用教程已收录 11 篇，欢迎按顺序阅读！',
    nav: [
      { title: '首页', url: '/', translations: { en: { title: 'Home', url: '/en/' } } },
      { title: '分类', url: '/categories/', translations: { en: { title: 'Categories', url: '/categories/' } } },
      { title: '归档', url: '/archives/', translations: { en: { title: 'Archives', url: '/archives/' } } },
      { title: '关于', url: '/about/', translations: { en: { title: 'About', url: '/en/about/' } } },
    ],
  },
  theme: 'themes/xfmpress-theme-anziyu',
  defaults: { layout: 'post.html' },
  pagination: { perPage: 10 },
  server: { port: 4173 },
};
