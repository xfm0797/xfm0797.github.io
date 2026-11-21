export default {
  site: {
    title: 'XFMpress',
    description: '静态站点生成器XFMpress的官方网站',
    url: 'https://xfm0797.github.io',
    lang: 'zh-CN',
    author: 'xfm',
    base: '/',
    nav: [
      { title: '首页', url: '/' },
      { title: '分类', url: '/categories/' },
      { title: '归档', url: '/archives/' },
      { title: '关于', url: '/about/' },
    ],
  },
  theme: 'default',
  defaults: { layout: 'post.html' },
  pagination: { perPage: 9 },
  server: { port: 4173 },
};
