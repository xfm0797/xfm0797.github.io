---
lang: en
translationKey: xfmpress-theme-butterfly
title: "New official theme butterfly: Hexo's glassmorphism look, rebuilt for xfmpress"
date: 2026-11-22 13:30:00
description: "themes/butterfly in the repo — blurred fixed nav, gradient banner, horizontal cards with the cover on the right, author sidebar, timeline archive, zero deps, zero build"
category: themes
tags: [xfmpress, theme]
cover: /assets/theme-butterfly.png
---

The official repository gained a third theme today: `themes/butterfly`. It rebuilds the look of [hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly) for xfmpress — if you migrated from Hexo, the blue-to-purple gradient, the frosted fixed nav and the horizontal cards with the cover on the right should feel instantly familiar.

Like the other two, it is zero-dependency and zero-build: the templates only use xfm's built-in `{% extend %} / {% block %} / {% include %}`, and the styles and scripts are hand-written CSS and vanilla JS — no Sass step, no bundler.

![The butterfly home page: frosted nav, blue-purple gradient banner, cards with the cover on the right, author card in the sidebar](/assets/theme-butterfly.png)

That is the theme running on the demo site (cropped to 1200×630): a fixed nav on top, a gradient banner with the site title, horizontal post cards below it, and an author card on the right. The whole look comes from one 29KB `style.css` and a 7KB `main.js`.

## Enabling it

Point the config at the theme directory:

```js
// xfm.config.mjs
export default {
  theme: 'themes/butterfly',
};
```

One practical catch: the package you get from `npm i xfmpress` currently ships only `default` and `docs`. butterfly landed in the repository first, so to use it today, copy the repo's `themes/butterfly` directory into your site's `themes/` folder (or just clone the repo and run `examples/blog`) and reference `themes/butterfly`. Once a directory with that name exists in your site root, theme resolution picks your copy first.

Resolution order is "site path → bundled in the npm package → shorthand", which is why the shorthand `theme: 'butterfly'` only works for the two bundled themes — after copying, spell out the full path.

## Layout map: 8 layouts, 5 partials

```
themes/butterfly/
├── layouts/
│   ├── base.html        # shell: progress bar, fixed nav, banner slot, footer, back-to-top, theme script
│   ├── index.html       # home: banner + card list + sidebar
│   ├── post.html        # post: cover banner, body card, copyright box, prev/next, related, TOC
│   ├── page.html        # standalone page
│   ├── archives.html    # timeline archive, grouped by year
│   ├── categories.html  # category index
│   ├── taxonomy.html    # posts of one category / tag
│   └── collection.html  # custom collection list
├── partials/            # post-list / pager / sidebar / toc / lang-switcher
└── assets/              # style.css (29KB) / main.js (7.4KB) / search.js
```

The banner is not duplicated per layout: `base.html` leaves a `{% block banner %}` slot. Home and post override it, while standalone pages and the archive leave it empty — so those pages simply have no banner, with no blank placeholder either.

## Four visual signatures

**Frosted fixed nav**: `backdrop-filter: blur(14px)` over a translucent surface, with a shadow appearing after 10px of scroll. Below 860px it collapses into a drawer whose three bars morph into a cross.

**Gradient banner**: without `site.banner` it is a 132-degree blue-purple gradient (`#49b1f5 → #8661f5`); with one, the image gets a 38% dark mask. That mask is not optional — white text over a light photo turns to mush without it. Home banner height is `min(62vh, 560px)`, post banner `min(46vh, 420px)`, both a notch shorter on phones.

**Horizontal cards, cover on the right**: the left side holds the date, category pill, title, a two-line clamped summary and tags; the right is a fixed 220px cover that scales to 1.05 on hover while the card lifts 3px. A post without `cover` falls back to a gradient block, so the list never has gaps. Under 560px the card stacks vertically with the cover on top.

**The sidebar**: author card (avatar, one-line bio, counts for posts/categories/tags, RSS button), the first 6 categories with counts, a cloud of the first 16 tags, the latest 5 posts, and an archive link. The whole column is `position: sticky`; below 1024px it becomes a single column and stickiness is dropped.

## On the post page

The post page is denser: cover banner (title, date, category, tags and reading time all sit on the mask) → white body card → copyright box → prev/next → related posts → table of contents on the right.

A few deliberate choices:

- **The TOC only exists when there are headings.** With an empty `headings` the entire right column is skipped and the body card returns to a centred 800px width; with a TOC the container widens to 1080px in two columns, and below 900px the right column disappears rather than turning into a drawer.
- **The copyright box only renders when `site.author` is set**, showing the author, the post URL and a "please credit the source" line. Omit `site.author` and it is gone.
- **Related posts read `page.data.related`**, i.e. what the `related` plugin computed. Without the plugin the block simply does not appear — no error.
- **Code blocks carry a language label and a copy button.** The button sits at opacity 0 until you hover the block, so it never competes with the code.

## Optional fields

All under `site`, all optional:

| Field | Effect | Fallback |
| --- | --- | --- |
| `site.banner` | Home banner background | Blue-purple gradient |
| `site.subtitle` | Banner subtitle | `site.description` |
| `site.avatar` | Author card avatar | ✍ placeholder |
| `site.author` | Author name, post copyright box | Name falls back to `site.title`, box is skipped |
| `site.copyright` | Footer copyright line | `© site title` |

Post covers come from front-matter:

```yaml
---
title: My first post
date: 2026-11-22
cover: /img/hello.jpg   # root-absolute or remote; ./cover.png works inside a Page Bundle
---
```

`cover` only affects how this theme renders; RSS, sitemap and the other themes ignore it.

## Interactions and palette

`main.js` has seven modules: nav drawer and scroll shadow, back-to-top, reading progress, TOC highlighting, code copy, image zoom, and external links opening in a new tab. All scroll maths goes through `requestAnimationFrame` — at most one computation per frame — and any block whose elements are missing bails out silently, so dropping it onto any page is safe.

Light/dark is a hand-written `data-theme` switch stored under `xfm-theme-butterfly`, following `prefers-color-scheme` on first visit. Recolouring means editing the top of `style.css`:

```css
:root {
  --accent: #49b1f5;    /* primary: sky blue */
  --accent-2: #8661f5;  /* secondary: purple */
  --grad: linear-gradient(132deg, #49b1f5 0%, #8661f5 100%);
  --radius: 12px;       /* card radius */
  --nav-h: 60px;        /* nav height */
}
```

Install the `search` plugin and a search button appears on the right of the nav (the plugin injects `site.search`); `Ctrl/⌘ + K` opens the client-side filter panel. The theme toggle sits next to it — both vanilla, no dependencies.

## Which theme should you pick?

| Theme | Look | Best for |
| --- | --- | --- |
| `default` | Muted jade, lots of whitespace | Quiet writing |
| `docs` | Left sidebar doc tree | Product manuals, knowledge bases |
| `butterfly` | Blue-purple gradients, card walls, more ornament | Personal blogs that want instant identity |
| `xfmpress-theme-anziyu` | Glass nav + cover cards (this site's own) | An even more decorative blog |

It shares the template syntax and the content format with `default`, so switching themes requires zero Markdown changes. That is the payoff of shipping themes as directories instead of baking one into the engine: to reskin, change one line of `theme` and run `xfm build` again.
