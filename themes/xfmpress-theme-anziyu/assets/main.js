/* xfmpress-theme-anziyu 交互脚本
   深浅色切换 / 阅读进度 / 导航阴影 / 移动端抽屉 / TOC 高亮 / 代码复制 / 回到顶部 / 图片放大 */
(function () {
  'use strict';

  var doc = document, root = doc.documentElement;

  /* 深浅色切换（base.html 内联脚本负责初始值，这里只绑定事件） */
  var toggle = doc.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      localStorage.setItem('xfm-theme', next);
    });
  }

  /* 滚动：进度条 + 导航阴影 + 回到顶部 */
  var bar = doc.getElementById('progress-bar');
  var nav = doc.getElementById('site-nav');
  var backTop = doc.getElementById('back-top');
  function onScroll() {
    var h = doc.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('scrolled', h.scrollTop > 10);
    if (backTop) backTop.classList.toggle('show', h.scrollTop > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 移动端菜单抽屉 */
  var menuBtn = doc.getElementById('nav-menu-btn');
  var drawer = doc.getElementById('nav-drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', function () {
      drawer.style.display = drawer.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  /* TOC 随滚动高亮 */
  var toc = doc.getElementById('toc');
  if (toc && 'IntersectionObserver' in window) {
    var links = {};
    toc.querySelectorAll('a[href^="#"]').forEach(function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          Object.keys(links).forEach(function (id) {
            links[id].classList.toggle('active', id === e.target.id);
          });
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });
    Object.keys(links).forEach(function (id) {
      var el = doc.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* 代码块复制按钮 */
  doc.querySelectorAll('.prose pre').forEach(function (pre) {
    if (pre.querySelector('.code-copy-btn')) return;
    var btn = doc.createElement('button');
    btn.className = 'code-copy-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', '复制代码');
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
    btn.addEventListener('click', function () {
      var code = pre.querySelector('code');
      if (!code) return;
      navigator.clipboard.writeText(code.textContent).then(function () {
        btn.classList.add('done');
        setTimeout(function () { btn.classList.remove('done'); }, 1500);
      });
    });
    pre.appendChild(btn);
  });

  /* 图片点击放大 */
  var mask = doc.getElementById('img-mask');
  if (mask) {
    var maskImg = mask.querySelector('img');
    doc.addEventListener('click', function (e) {
      var img = e.target.closest('.prose img');
      if (img) {
        maskImg.src = img.src;
        maskImg.alt = img.alt || '';
        mask.classList.add('show');
      } else if (mask.classList.contains('show')) {
        mask.classList.remove('show');
      }
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') mask.classList.remove('show');
    });
  }
})();
