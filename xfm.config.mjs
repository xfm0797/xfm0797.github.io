export default {
  site: {
    title: '学习Hexo',
    description: 'xfm 的博客',
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
