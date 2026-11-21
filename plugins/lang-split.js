/**
 * lang-split — 按语言分流全站列表页
 * -------------------------------------------------------------------
 * xfmpress 引擎的首页分页 / taxonomy 聚合 / 归档 / 分类索引都混排全部
 * 语言的文章。本插件在 afterCollect 阶段把这些生成页按 lang 重建：
 *
 * - 中文区：/（首页）、/page/N/、/tags|categories|series/<名>/、/archives/、/categories/
 * - 英文区：/en/（首页）、/en/page/N/、/en/tags|categories|series/<名>/、/en/archives/、/en/categories/
 * - 空聚合页自动消失（某语言没有该分类的文章时不再生成）
 * - 注入 site.langCounts = { zh, en }、site.postsZh / site.postsEn 供模板取数
 *
 * 模板约定：文章项带 lang 字段；页面对象生成时直接带 lang，使模板里
 * page.lang 双语化文案对生成页同样生效。
 */

const ZH = 'zh-CN';
const EN = 'en';

const isEn = (p) => p.lang === EN;
const dateDesc = (a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1);

/** 与引擎 pagerLinks 输出同构：{n,url,current} | {gap:true} */
function pagerLinks(cur, total, pageUrl) {
  const wanted = new Set([1, total, cur - 1, cur, cur + 1].filter((n) => n >= 1 && n <= total));
  const nums = [...wanted].sort((a, b) => a - b);
  const links = [];
  let prev = 0;
  for (const n of nums) {
    if (prev && n - prev > 1) links.push({ gap: true });
    links.push({ n, url: pageUrl(n), current: n === cur });
    prev = n;
  }
  return links;
}

function chunkPages(prefix, homeUrl, list, perPage, lang, kind) {
  const out = [];
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));
  const pageUrl = (n) => (n === 1 ? homeUrl : `${prefix}${n}/`);
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1) continue; // 第 1 页挂在首页对象上，不单独生成
    const url = pageUrl(i);
    out.push({
      key: `langsplit:${kind}:${lang}:${i}`,
      rel: '',
      url,
      layout: 'index.html',
      title: lang === EN ? `Page ${i}` : `第 ${i} 页`,
      description: '',
      date: null,
      updated: null,
      tags: [],
      category: null,
      series: null,
      weight: 0,
      draft: false,
      toc: false,
      lang,
      translations: [],
      data: {
        type: 'pagination',
        pagination: {
          current: i,
          totalPages,
          perPage,
          total: list.length,
          url,
          prev: i === 2 ? homeUrl : `${prefix}${i - 1}/`,
          next: i < totalPages ? `${prefix}${i + 1}/` : null,
          links: pagerLinks(i, totalPages, pageUrl),
          posts: list.slice((i - 1) * perPage, i * perPage),
        },
      },
      body: '',
      isMd: false,
      ext: '.html',
      excerpt: '',
      readTime: 0,
      raw: `langsplit|${kind}|${lang}|${i}|${list.slice((i - 1) * perPage, i * perPage).map((p) => p.url).join(',')}`,
      taxonomy: true,
    });
  }
  return { totalPages, pages: out };
}

function homePagination(list, perPage, homeUrl, prefix, lang) {
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));
  const pageUrl = (n) => (n === 1 ? homeUrl : `${prefix}${n}/`);
  return {
    current: 1,
    totalPages,
    perPage,
    total: list.length,
    url: homeUrl,
    prev: null,
    next: totalPages > 1 ? pageUrl(2) : null,
    links: pagerLinks(1, totalPages, pageUrl),
    posts: list.slice(0, perPage),
  };
}

module.exports = () => ({
  name: 'lang-split',

  afterCollect(site) {
    const ctx = site.siteContext;
    const perPage = Math.max(1, Number((site.config.pagination || {}).perPage) || 10);

    // ---- 1. 按语言拆分文章流 ----
    const all = ctx.posts || [];
    const zh = all.filter((p) => !isEn(p)).slice().sort(dateDesc);
    const en = all.filter(isEn).slice().sort(dateDesc);
    ctx.langCounts = { zh: zh.length, en: en.length };
    ctx.postsZh = zh;
    ctx.postsEn = en;

    // 按语言拆分 taxonomy 清单（侧栏/云标签用）
    // 仅英文的词条：英文页接管原 URL，侧栏链接须与实际路径一致
    const splitTerms = (list, enSide) =>
      (list || [])
        .map((item) => {
          const items = item.items || [];
          const hasZh = items.some((p) => !isEn(p));
          const mine = items.filter(enSide ? isEn : (p) => !isEn(p));
          if (!mine.length) return null;
          const url = enSide && hasZh ? '/en' + item.url : item.url;
          return { name: item.name, url, count: mine.length };
        })
        .filter(Boolean)
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    ctx.tagsZh = splitTerms(ctx.tags, false);
    ctx.tagsEn = splitTerms(ctx.tags, true);
    ctx.categoriesZh = splitTerms(ctx.categories, false);
    ctx.categoriesEn = splitTerms(ctx.categories, true);
    ctx.seriesZh = splitTerms(ctx.series, false);
    ctx.seriesEn = splitTerms(ctx.series, true);

    // ---- 2. 移除引擎混排的生成页（分页 / taxonomy / 索引）----
    const kept = [];
    for (const p of site.pages) {
      const t = p.data && p.data.type;
      if (t === 'pagination' || t === 'taxonomy' || t === 'index') {
        site.pageByKey.delete(p.key);
        continue;
      }
      kept.push(p);
    }
    site.pages = kept;

    const generated = [];

    // ---- 3. 重建首页分页（中文 / 与英文 /en/）----
    const homeZh = site.pages.find((p) => p.url === '/');
    const homeEn = site.pages.find((p) => p.url === '/en/');
    if (homeZh) homeZh.data.pagination = homePagination(zh, perPage, '/', '/page/', ZH);
    if (homeEn) homeEn.data.pagination = homePagination(en, perPage, '/en/', '/en/page/', EN);
    if (homeZh) generated.push(...chunkPages('/page/', '/', zh, perPage, ZH, 'home').pages);
    if (homeEn) generated.push(...chunkPages('/en/page/', '/en/', en, perPage, EN, 'home').pages);

    // ---- 4. 重建 taxonomy 聚合页（tags / categories / series），中文原 URL + 英文 /en/ 孪生 ----
            const groups = [
      ['tags', ctx.tags || []],
      ['categories', ctx.categories || []],
      ['series', ctx.series || []],
    ];
    const labels = {
      [ZH]: { tags: '标签', categories: '分类', series: '系列' },
      en: { tags: 'Tag', categories: 'Category', series: 'Series' },
    };
    for (const [kind, list] of groups) {
      for (const item of list) {
        const items = (item.items || []).slice().sort(dateDesc);
        const zhPosts = items.filter((p) => !isEn(p));
        const enPosts = items.filter(isEn);
        for (const [lang, posts] of [[ZH, zhPosts], [EN, enPosts]]) {
          if (!posts.length) continue;
          // 中文：原 URL；英文：有中文文章时用 /en/ 孪生，否则接管原 URL
          // （接管时原 URL 与 /en/ 孪生都生成，兜底旧链接）
          const enTwin = `/en${item.url}`;
          const bases = lang === EN
            ? (zhPosts.length ? [enTwin] : [enTwin, item.url])
            : [item.url];
          for (const base of bases) {
          const total = posts.length;
          const totalPages = Math.max(1, Math.ceil(total / perPage));
          const pageUrl = (n) => (n === 1 ? base : `${base.replace(/\/$/, '')}/page/${n}/`);
          for (let i = 1; i <= totalPages; i++) {
            const url = pageUrl(i);
            const chunk = posts.slice((i - 1) * perPage, i * perPage);
            const zhUi = lang === ZH;
            const pagination = {
              current: i,
              totalPages,
              perPage,
              total,
              url,
              prev: i === 1 ? null : pageUrl(i - 1),
              next: i < totalPages ? pageUrl(i + 1) : null,
              links: pagerLinks(i, totalPages, pageUrl),
              posts: chunk,
            };
            generated.push({
              key: `langsplit:taxonomy:${kind}:${item.name}:${lang}:${base}${i === 1 ? '' : `:${i}`}`,
              rel: '',
              url,
              layout: 'taxonomy.html',
              title: i === 1 ? item.name : `${item.name} · ${zhUi ? `第 ${i} 页` : `Page ${i}`}`,
              description: `${labels[lang][kind]} · ${zhUi ? `共 ${total} 篇` : `${total} posts`}`,
              date: null,
              updated: null,
              tags: [],
              category: null,
              series: null,
              weight: 0,
              draft: false,
              toc: false,
              lang,
              translations: [],
              data: { type: 'taxonomy', taxonomy: kind, term: item.name, posts: chunk, pagination },
              body: '',
              isMd: false,
              ext: '.html',
              excerpt: '',
              readTime: 0,
              raw: `langsplit|taxonomy|${kind}|${item.name}|${lang}|${base}|${i}|${chunk.map((p) => p.url).join(',')}`,
              taxonomy: true,
            });
          }
          }
        }
      }
    }

    // ---- 5. 重建分类索引（/categories/ 与 /en/categories/）----
    for (const [lang, posts] of [[ZH, zh], [EN, en]]) {
      if (!posts.length) continue;
      const base = lang === EN ? '/en/categories/' : '/categories/';
      const byCat = new Map();
      for (const p of posts) {
        const c = p.category;
        if (!c) continue;
        if (!byCat.has(c)) byCat.set(c, []);
        byCat.get(c).push(p);
      }
      const terms = [...byCat.entries()]
        .map(([name, list]) => ({
          name,
          url: lang === EN ? `/en/categories/${encodeURIComponent(name)}/` : `/categories/${encodeURIComponent(name)}/`,
          count: list.length,
          latest: list[0] ? { url: list[0].url, title: list[0].title, date: list[0].date } : null,
        }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
      generated.push({
        key: `langsplit:index:categories:${lang}`,
        rel: '',
        url: base,
        layout: 'categories.html',
        title: lang === EN ? 'Categories' : '分类',
        description: lang === EN ? 'Browse all posts by topic' : '按主题浏览全部文章',
        date: null,
        updated: null,
        tags: [],
        category: null,
        series: null,
        weight: 0,
        draft: false,
        toc: false,
        lang,
        translations: [],
        data: { type: 'index', index: 'categories', terms, total: terms.length },
        body: '',
        isMd: false,
        ext: '.html',
        excerpt: '',
        readTime: 0,
        raw: `langsplit|index:categories|${lang}|${terms.map((t) => t.name + ':' + t.count).join(',')}`,
        taxonomy: true,
      });

      // ---- 6. 重建归档（/archives/ 与 /en/archives/）----
      const abase = lang === EN ? '/en/archives/' : '/archives/';
      const byYear = new Map();
      for (const p of posts) {
        const year = (p.date || '').slice(0, 4) || '—';
        if (!byYear.has(year)) byYear.set(year, []);
        byYear.get(year).push(p);
      }
      const years = [...byYear.entries()].map(([year, list]) => ({ year, posts: list }));
      generated.push({
        key: `langsplit:index:archives:${lang}`,
        rel: '',
        url: abase,
        layout: 'archives.html',
        title: lang === EN ? 'Archives' : '归档',
        description: lang === EN ? `Browse all ${posts.length} posts by date` : `按时间线浏览全部 ${posts.length} 篇文章`,
        date: null,
        updated: null,
        tags: [],
        category: null,
        series: null,
        weight: 0,
        draft: false,
        toc: false,
        lang,
        translations: [],
        data: { type: 'index', index: 'archives', years, total: posts.length },
        body: '',
        isMd: false,
        ext: '.html',
        excerpt: '',
        readTime: 0,
        raw: `langsplit|index:archives|${lang}|${posts.map((p) => p.url).join(',')}`,
        taxonomy: true,
      });
    }

    for (const p of generated) {
      site.pages.push(p);
      site.pageByKey.set(p.key, p);
    }
  },
});
