/**
 * 分享栏的补正（配合 xfm-plugin-share 使用）。
 *
 * xfm-plugin-share 默认把 <section class="xfm-share"> 插到 </article> 前，且用
 * `html.includes('data-xfm-share')` 判断主题是否已留挂载点——只要正文里出现
 * 这个字符串（比如一篇讲分享插件的文档），它就会误以为主题接管了，整条分享栏
 * 直接不生成。本插件按顺序做三件事：
 *
 * 1. 位置：挪到正文结尾（上一篇/下一篇之前），留在文章列里；
 * 2. 语言：按 page.lang 把中文标签换成英文；
 * 3. 兜底：文章页要是没有分享栏，就按配置自己生成一条（复用插件注入的
 *    样式与复制脚本，不重复注入）。
 */

// 与插件 NETWORKS 中的定义保持一致（只覆盖本站配置里用到的渠道）
const NETWORKS = {
  weibo: { zh: '微博', en: 'Weibo', color: '#e6162d', href: (u, t) => `https://service.weibo.com/share/share.php?url=${u}&title=${t}` },
  wechat: { zh: '微信', en: 'WeChat', color: '#07c160', copy: '链接已复制，可在微信中粘贴分享', copyEn: 'Link copied — paste it in WeChat to share' },
  qq: { zh: 'QQ 好友', en: 'QQ', color: '#12b7f5', href: (u, t) => `https://connect.qq.com/widget/shareqq/index.html?url=${u}&title=${t}&summary=` },
  qzone: { zh: 'QQ 空间', en: 'Qzone', color: '#f5b60d', href: (u, t) => `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${u}&title=${t}` },
  twitter: { zh: 'X', en: 'X', color: '#000000', href: (u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
  telegram: { zh: 'Telegram', en: 'Telegram', color: '#26a5e4', href: (u, t) => `https://t.me/share/url?url=${u}&text=${t}` },
  copy: { zh: '复制链接', en: 'Copy link', color: '#5f6368', copy: '链接已复制', copyEn: 'Link copied' },
};

const SECTION_RE = /<section class="xfm-share"[\s\S]*?<\/section>/;
const LABELS = [
  ['微博', 'Weibo'],
  ['微信', 'WeChat'],
  ['QQ 好友', 'QQ'],
  ['QQ 空间', 'Qzone'],
  ['LinkedIn', 'LinkedIn'],
  ['WhatsApp', 'WhatsApp'],
  ['Reddit', 'Reddit'],
  ['邮件', 'Email'],
  ['复制链接', 'Copy link'],
  ['分享到', 'Share to'],
  ['链接已复制，可在微信中粘贴分享', 'Link copied — paste it in WeChat to share'],
  ['链接已复制', 'Link copied'],
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function localize(section) {
  let s = section;
  s = s.replace(/title="分享到([^"]*)"/g, (m, label) => {
    if (label === '复制链接') return 'title="Copy link"';
    const hit = LABELS.find(([zh]) => zh === label);
    return `title="Share to ${hit ? hit[1] : label}"`;
  });
  s = s.replace(/<span( class="xfm-share-label")?>([^<]+)<\/span>/g, (m, cls, label) => {
    const hit = LABELS.find(([zh]) => zh === label);
    return hit ? `<span${cls || ''}>${hit[1]}</span>` : m;
  });
  s = s.replace(/data-share-msg="([^"]*)"/g, (m, msg) => {
    const hit = LABELS.find(([zh]) => zh === msg);
    return hit ? `data-share-msg="${hit[1]}"` : m;
  });
  return s;
}

/** 自己拼一条分享栏，结构、class、data-* 与插件生成的完全一致 */
function buildSection(names, title, full, pageTitle, isEn) {
  const u = encodeURIComponent(full);
  const t = encodeURIComponent(pageTitle || '');
  const label = (def) => (isEn ? def.en : def.zh);

  const buttons = names
    .filter((n) => NETWORKS[n])
    .map((name) => {
      const def = NETWORKS[name];
      if (def.copy) {
        const msg = isEn ? def.copyEn : def.copy;
        return (
          `<a href="#" style="--c:${def.color}" data-share-copy` +
          ` data-share-url="${esc(full)}" data-share-msg="${esc(msg)}"` +
          ` title="${esc(isEn ? 'Copy link' : '分享到' + def.zh)}"><span>${label(def)}</span></a>`
        );
      }
      return (
        `<a href="${esc(def.href(u, t))}" style="--c:${def.color}" target="_blank" rel="noopener"` +
        ` title="${esc((isEn ? 'Share to ' : '分享到') + label(def))}"><span>${label(def)}</span></a>`
      );
    })
    .join('\n');

  const heading = title ? `<span class="xfm-share-label">${esc(isEn && title === '分享到' ? 'Share to' : title)}</span>` : '';
  return `<section class="xfm-share" data-share-networks="${names.join(',')}" aria-label="${isEn ? 'Share' : '分享'}">${heading}\n${buttons}\n</section>`;
}

function insertAt(out, section) {
  for (const anchor of ['<nav class="post-pn">', '<section class="post-comments"']) {
    const at = out.indexOf(anchor);
    if (at !== -1) return out.slice(0, at) + section + '\n      ' + out.slice(at);
  }
  const end = out.lastIndexOf('</article>');
  return end !== -1 ? out.slice(0, end) + section + '\n' + out.slice(end) : out;
}

module.exports = function (site) {
  return {
    name: 'share-lang',

    transformHtml(html, ctx) {
      const page = (ctx && ctx.page) || null;
      if (!page) return html;

      try {
        const isEn = page.lang === 'en';
        const existing = html.match(SECTION_RE);

        if (existing) {
          // 有的话：改写语言 + 挪到正文结尾
          const section = isEn ? localize(existing[0]) : existing[0];
          return insertAt(html.replace(existing[0], ''), section);
        }

        // 兜底：文章页却没有分享栏（插件被正文里的 data-xfm-share 误导）
        const data = page.data || {};
        const isPost = page.date && data.type !== 'page' && data.type !== 'index' && page.url !== '/' && data.share !== false;
        const conf = (site.config && site.config.share) || null;
        if (!isPost || !conf || conf.dev === false) return html;

        const names = (conf.networks && conf.networks.length ? conf.networks : ['weibo', 'wechat', 'qq', 'twitter', 'telegram', 'copy']);
        const full = site.helpers.absoluteUrl(site.config.site, page.url || '/');
        const section = buildSection(names, conf.title === undefined ? '分享到' : conf.title, full, page.title, isEn);
        return insertAt(html, section);
      } catch (e) {
        return html;
      }
    },
  };
};
