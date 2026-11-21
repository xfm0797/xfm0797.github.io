---
lang: en
translationKey: xfmpress-v0-4-13
title: "xfmpress v0.4.13: write phase 5.3 s to 0.9 s on repeat builds"
date: 2026-11-15 12:00:00
description: Counting filesystem calls exposed two wastes — a failing rmdir sweep over every dist directory and rewriting identical pages — cutting repeat-build write time to 0.9 s.
category: changelog
tags: [xfmpress, changelog]
---

v0.4.13 started with unglamorous profiling: counting filesystem calls on a 1,000-page site. The count revealed two pure wastes in the write phase — a flood of system calls doomed to fail, and files being rewritten despite byte-identical content. After the fix, the write phase of a repeat build on that site drops from **5.3 s to 0.9 s**, while a cold build (with `dist` removed) is unchanged.

## What this release solves

Repeat builds are the daily reality: change one word, rewrite a thousand pages. Every build flushed all pages to disk (~1.5 s) and `mkdir`'d their directories (~1.1 s) even when the bytes were identical. On top of that, `pruneStale` tried `rmdir` on every directory in `dist` on every build — 1,000 page directories meant 1,000 failing `rmdir` calls, ~3.3 s sequentially on NTFS. Together, that's the couple of seconds you wait after every save.

## What changed

### Fixed

- **The `pruneStale` empty-directory sweep now runs on demand.** A directory can only become empty because a file inside it was deleted, so the sweep runs only when something was actually deleted, and only over the ancestors of those files — deepest first, in parallel. No deletions means no `rmdir` calls at all.
- **Unchanged pages are no longer rewritten.** Output is compared per file (size first, then content) and skipped when it already matches; a skipped file needs no directory either. Assets use the same idea with a make rule (size equal and destination not older than source → leave it alone), so large images are not even read.

### Added

- `xfm build` reports `未变化 N 个文件（内容一致，未重写）` when files were skipped, so you can see exactly how much the build actually wrote.
- `bench/bench.js` now reports cold (`dist` removed) and repeat builds separately instead of mixing them into one median — their cost structures are entirely different.

## Do you need to do anything

No configuration changes; upgrade and the speed-up applies. The only visible differences are faster repeat builds and one extra line in the build output counting skipped files. If your CI always starts from a clean `dist`, this particular win won't apply (cold builds are unchanged) — but for the local writing loop, the save-to-preview wait shrinks noticeably. Everyday build usage in the [quick start](/en/2026/11/21/xfmpress-quick-start/).
