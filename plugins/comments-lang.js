/**
 * comments-lang — 让评论组件跟随页面语言
 * -------------------------------------------------------------------
 * xfm-plugin-comments 的 waline 配置里 lang 是站点级常量（默认 zh-CN），
 * 英文文章页会拿到中文界面。站点 plugins/ 目录在 npm 插件之后加载，所以本插件
 * 的 transformHtml 在评论插件注入脚本之后执行，可以就地把 init({...}) 里的
 * lang 改写成当前页面的 page.lang。
 */

module.exports = () => ({
  name: 'comments-lang',

  transformHtml(html, ctx) {
    const lang = ctx && ctx.page && ctx.page.lang;
    if (!lang || !html.includes('init({"el":"#waline"')) return html;

    return html.replace(/init\((\{"el":"#waline".*?\})\);/s, (matched, rawJson) => {
      try {
        const opt = JSON.parse(rawJson);
        if (String(opt.lang || '').toLowerCase() === String(lang).toLowerCase()) return matched;
        opt.lang = lang;
        return `init(${JSON.stringify(opt)});`;
      } catch (e) {
        return matched; // 解析失败就保持原样，不影响评论可用性
      }
    });
  },
});
