---
lang: en
translationKey: xfmpress-v0-4-9
title: "xfmpress v0.4.9: eight silent failures in the CLI and dev server"
date: 2026-11-15 08:00:00
description: A review pass over the CLI and dev server fixes eight cases where the tool happily produced a wrong result instead of complaining — config detection, BOM, dates, scaffolds and more.
category: changelog
tags: [xfmpress, changelog]
---

v0.4.9 is a systematic review: walk through the CLI and dev server, hunting specifically for cases where the tool "happily produced the wrong result instead of complaining". All eight fixes share that pattern — the old version never raised an error, and you only found out when some detail didn't line up.

## What this release solves

The principle here is simple: prefer a loud error over a silent wrong result. `xfm new` creating files in an empty directory and then pointing you at a build that fails, a UTF-8 BOM swallowing the entire front-matter, dates off by a day because of a timezone — all of these put the cost of the tool's assumption on your shoulders. Each is now either correct or explicitly rejected.

## What changed

### Fixed

- **`xfm new` outside a site now errors out.** In an empty directory it used to create `content/posts/<slug>.md` and print "already publishable — `xfm build` and you'll see it", while the build itself failed on the missing theme. It now stops with the path, a hint to `xfm create`, and creates nothing.
- **`xfm create` recognises every config form.** Only `xfm.config.mjs` was checked, so a site configured via `xfm.config.js` / `.cjs` / `.json` or a `"xfm"` field in `package.json` got overwritten without `--force` — including `content/index.md`, `content/about.md` and the starter post. `hasConfig()` now backs both this check and the dev-server config watcher.
- **A UTF-8 BOM no longer swallows front-matter.** Files saved as "UTF-8 with BOM" — the default in several Windows editors — lost the whole block: the title fell back to the file path and `date` / `layout` / `tags` vanished. The BOM is now stripped before looking for `---`.
- **The layout wins over a contradicting scaffold.** A `scaffolds/draft.md` that still says `draft: false` or `layout: page.html` (usual when copied from another template) produced a *published* page while the CLI reported it wouldn't appear in the build output. `layout`, `type` and `draft` are now forced from the requested layout; a `post` scaffold with a leftover `draft: true` is written back to `false`, so the two never disagree.
- **Backslashes in `--dir=` are normalised.** `xfm new page about --dir=docs\sub` echoed `/docs\sub/about/` while the real URL was `/docs/sub/about/`. Paths are normalised before the summary, and `--dir` refuses to climb out of the content directory.
- **Date-only front-matter is a local calendar day.** By spec, `new Date('2026-11-10')` is UTC midnight, so every site west of UTC rendered those posts one day early. Date-only and `YYYY-MM-DD HH:mm` values are now constructed in local time explicitly; timestamped values keep their time.
- **The dev server works under a sub-path** (`site.base: '/blog/'`): the live-reload event stream follows the base (`/blog/__xfm/events`), 404-page links carry the prefix, a half-closed browser connection can no longer abort a rebuild, and `xfm.config.cjs` / `config.js` are watched like the other config files instead of silently ignored.

### Added

- `xfm create` writes a `.gitignore` (`node_modules/`, `dist/`, `.xfm/`, OS junk) so the first build no longer floods `git status`; an existing `.gitignore` is left untouched.
- Tests went from 120 to 128, covering BOM handling, date parsing, scaffold/layout conflicts, `--dir` normalisation, the non-site guard, config detection and `.gitignore`.

## Do you need to do anything

No config changes needed. Two behavioral differences worth noting: posts whose front-matter date is a bare `YYYY-MM-DD` may render a day apart from the old version (the new behavior is the one you wanted), and `xfm create` now requires an explicit `--force` to overwrite an existing site. Command details in the [CLI guide](/en/2026/11/21/xfmpress-cli/).
