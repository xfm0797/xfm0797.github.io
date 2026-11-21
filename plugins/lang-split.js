/**
 * lang-split — 按语言分流全站列表页
 * -------------------------------------------------------------------
 * xfmpress 0.4.17 起，引擎自己就把 site.posts 收窄成默认语言，并生成 /page/N/。
 * 但它仍留了三处需要站点补的地方，本插件在 afterCollect 阶段处理：
 *
 * 1. 词条页 /tags|categories|series/<名>/：引擎用「全部语言」的 items 生成（词条 URL
 *    只按名字索引，非默认语言文章必须能指到这里），所以中文词条页里会混进英文卡片。
 *    这里按语言重建：中文页只留中文文章，英文另开 /en/tags/<名>/ 孪生页。
 * 2. 分类索引 /categories/ 的 latest 卡片取自全部语言，中文页可能链到英文文章；
 *    归档 /archives/ 引擎已按默认语言过滤，保留引擎版本，只补 /en/archives/。
 * 3. content/en/index.md 自己占了 /en/，引擎遇到「内容文件已占该 URL」就整页跳过，
 *    于是 /en/ 没有分页数据、也没有 /en/page/N/ —— 这里补上。
 *
 * 同时向模板注入：site.langCounts、site.postsZh / postsEn、site.tagsZh|En、
 * site.categoriesZh|En、site.seriesZh|En（侧栏、云标签用）。
 */

const ZH = 'zh-CN';
const EN = 'en';

const isEn = (p) => String(p.lang || '').toLowerCase().startsWith('en');
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

function homePagination(list, perPage, homeUrl, prefix) {
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

/** 首页分页页（第 2 页起）：引擎不会生成被内容文件占位的语言首页分页 */
function chunkPages(prefix, homeUrl, list, perPage, lang) {
  const out = [];
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));
  const pageUrl = (n) => (n === 1 ? homeUrl : `${prefix}${n}/`);
  for (let i = 2; i <= totalPages; i++) {
    const url = pageUrl(i);
    const chunk = list.slice((i - 1) * perPage, i * perPage);
    out.push({
      key: `langsplit:home:${lang}:${i}`,
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
          posts: chunk,
        },
      },
      body: '',
      isMd: false,
      ext: '.html',
      excerpt: '',
      readTime: 0,
      raw: `langsplit|home|${lang}|${i}|${chunk.map((p) => p.url).join(',')}`,
      taxonomy: true,
    });
  }
  return out;
}

/**
 * 词条表：直接从两种语言的文章聚合，而不是读 site.tags / categories / series。
 * 后者只保留「默认语言有文章」的词条，只在英文出现的标签 / 系列名会整个丢掉，
 * 英文文章页上的对应链接就成了死链。
 */
function termTable(kind, zh, en, pick) {
  const map = new Map();
  const push = (name, side, p) => {
    if (name == null || name === '') return;
    let v = map.get(name);
    if (!v) map.set(name, (v = { name, url: `/${kind}/${encodeURIComponent(name)}/`, zh: [], en: [] }));
    v[side].push(p);
  };
  for (const p of zh) for (const n of pick(p)) push(n, 'zh', p);
  for (const p of en) for (const n of pick(p)) push(n, 'en', p);
  return [...map.values()];
}

module.exports = () => ({
  name: 'lang-split',

  afterCollect(site) {
    const ctx = site.siteContext;
    const perPage = Math.max(1, Number((site.config.pagination || {}).perPage) || 10);

    // ---- 1. 取两种语言的文章流（引擎已按语言分好，posts 只有默认语言）----
    const byLang = ctx.postsByLang || {};
    const zh = (byLang[ZH] || ctx.posts || []).filter((p) => !isEn(p)).slice().sort(dateDesc);
    const en = (byLang[EN] || []).filter(isEn).slice().sort(dateDesc);
    ctx.langCounts = { zh: zh.length, en: en.length };
    ctx.postsZh = zh;
    ctx.postsEn = en;

    // ---- 2. 词条表 + 各语言的词条清单（侧栏 / 云标签用）----
    const terms = {
      tags: termTable('tags', zh, en, (p) => p.tags || []),
      categories: termTable('categories', zh, en, (p) => (p.category ? [p.category] : [])),
      series: termTable('series', zh, en, (p) => (p.series ? [p.series] : [])),
    };
    const sideList = (kind, side) =>
      terms[kind]
        .filter((t) => t[side].length)
        .map((t) => ({
          name: t.name,
          // 英文：该词条也有中文文章时挂 /en/ 孪生，否则直接接管原 URL
          url: side === 'en' && t.zh.length ? '/en' + t.url : t.url,
          count: t[side].length,
        }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    ctx.tagsZh = sideList('tags', 'zh');
    ctx.tagsEn = sideList('tags', 'en');
    ctx.categoriesZh = sideList('categories', 'zh');
    ctx.categoriesEn = sideList('categories', 'en');
    ctx.seriesZh = sideList('series', 'zh');
    ctx.seriesEn = sideList('series', 'en');

    // ---- 3. 摘掉引擎混排的生成页：词条页 + 分类索引 ----
    // 首页分页 /page/N/、归档 /archives/ 引擎已按默认语言输出，原样保留。
    const kept = [];
    for (const p of site.pages) {
      const t = p.data && p.data.type;
      const idx = p.data && p.data.index;
      if (t === 'taxonomy' || (t === 'index' && idx === 'categories')) {
        site.pageByKey.delete(p.key);
        continue;
      }
      kept.push(p);
    }
    site.pages = kept;

    const generated = [];

    // ---- 4. 英文首页：补分页数据 + /en/page/N/（/en/ 被 content/en/index.md 占位）----
    const homeEn = site.pages.find((p) => p.url === '/en/');
    if (homeEn && en.length) {
      homeEn.data.pagination = homePagination(en, perPage, '/en/', '/en/page/');
      generated.push(...chunkPages('/en/page/', '/en/', en, perPage, EN));
    }

    // ---- 5. 按语言重建词条页（tags / categories / series）----
    const labels = {
      [ZH]: { tags: '标签', categories: '分类', series: '系列' },
      [EN]: { tags: 'Tag', categories: 'Category', series: 'Series' },
    };
    for (const kind of ['tags', 'categories', 'series']) {
      for (const term of terms[kind]) {
        for (const [lang, posts] of [
          [ZH, term.zh],
          [EN, term.en],
        ]) {
          if (!posts.length) continue;
          // 中文：原 URL；英文：有中文文章时用 /en/ 孪生，否则接管原 URL
          // （接管时原 URL 与 /en/ 孪生都生成，兜底旧链接）
          const enTwin = `/en${term.url}`;
          const bases = lang === EN ? (term.zh.length ? [enTwin] : [enTwin, term.url]) : [term.url];
          const sorted = posts.slice().sort(dateDesc);
          for (const base of bases) {
            const total = sorted.length;
            const totalPages = Math.max(1, Math.ceil(total / perPage));
            const pageUrl = (n) => (n === 1 ? base : `${base.replace(/\/$/, '')}/page/${n}/`);
            for (let i = 1; i <= totalPages; i++) {
              const url = pageUrl(i);
              const chunk = sorted.slice((i - 1) * perPage, i * perPage);
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
                key: `langsplit:taxonomy:${kind}:${term.name}:${lang}:${base}:${i}`,
                rel: '',
                url,
                layout: 'taxonomy.html',
                title: i === 1 ? term.name : `${term.name} · ${zhUi ? `第 ${i} 页` : `Page ${i}`}`,
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
                data: { type: 'taxonomy', taxonomy: kind, term: term.name, posts: chunk, pagination },
                body: '',
                isMd: false,
                ext: '.html',
                excerpt: '',
                readTime: 0,
                raw: `langsplit|taxonomy|${kind}|${term.name}|${lang}|${base}|${i}|${chunk.map((p) => p.url).join(',')}`,
                taxonomy: true,
              });
            }
          }
        }
      }
    }

    // ---- 6. 分类索引（/categories/ 与 /en/categories/）----
    for (const [lang, posts] of [
      [ZH, zh],
      [EN, en],
    ]) {
      if (!posts.length) continue;
      const base = lang === EN ? '/en/categories/' : '/categories/';
      const byCat = new Map();
      for (const p of posts) {
        const c = p.category;
        if (!c) continue;
        if (!byCat.has(c)) byCat.set(c, []);
        byCat.get(c).push(p);
      }
      const list = [...byCat.entries()]
        .map(([name, items]) => ({
          name,
          url: `${lang === EN ? '/en' : ''}/categories/${encodeURIComponent(name)}/`,
          count: items.length,
          latest: items[0] ? { url: items[0].url, title: items[0].title, date: items[0].date } : null,
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
        data: { type: 'index', index: 'categories', terms: list, total: list.length },
        body: '',
        isMd: false,
        ext: '.html',
        excerpt: '',
        readTime: 0,
        raw: `langsplit|index:categories|${lang}|${list.map((t) => t.name + ':' + t.count).join(',')}`,
        taxonomy: true,
      });
    }

    // ---- 7. 英文归档（/archives/ 由引擎按默认语言生成，无需重建）----
    if (en.length) {
      const byYear = new Map();
      for (const p of en) {
        const year = (p.date || '').slice(0, 4) || '—';
        if (!byYear.has(year)) byYear.set(year, []);
        byYear.get(year).push(p);
      }
      const years = [...byYear.entries()].map(([year, list]) => ({ year, posts: list }));
      generated.push({
        key: 'langsplit:index:archives:en',
        rel: '',
        url: '/en/archives/',
        layout: 'archives.html',
        title: 'Archives',
        description: `Browse all ${en.length} posts by date`,
        date: null,
        updated: null,
        tags: [],
        category: null,
        series: null,
        weight: 0,
        draft: false,
        toc: false,
        lang: EN,
        translations: [],
        data: { type: 'index', index: 'archives', years, total: en.length },
        body: '',
        isMd: false,
        ext: '.html',
        excerpt: '',
        readTime: 0,
        raw: `langsplit|index:archives|${EN}|${en.map((p) => p.url).join(',')}`,
        taxonomy: true,
      });
    }

    for (const p of generated) {
      site.pages.push(p);
      site.pageByKey.set(p.key, p);
    }
  },
});
