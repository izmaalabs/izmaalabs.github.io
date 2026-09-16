/* IZMΛΛ Labs × ChemPrep — site behavior
   Vanilla JS only: theme toggle, mobile menu, scrollspy, reveal, FAQ, copy. */

(function () {
  'use strict';

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('js');

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById('theme-toggle');
  var MOON = '<span class="theme-bars" aria-hidden="true"><b></b><b></b><b></b></span>';
  var SUN = '<span class="theme-sun" aria-hidden="true"><i></i></span>';

  function renderThemeIcon() {
    if (!themeToggle) return;
    if (document.documentElement.getAttribute('data-theme') === 'light') {
      themeToggle.innerHTML = SUN;
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      themeToggle.innerHTML = MOON;
      themeToggle.setAttribute('aria-label', 'Switch to light theme');
    }
  }

  /* IZMΛΛ Labs wordmark — swap the theme-aware variant (dark-first default). */
  var WORDMARK_LIGHT = 'izmaalabs-wordmark.svg';
  var WORDMARK_DARK = 'izmaalabs-wordmark-dark.svg';
  function applyWordmark() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    var marker = isLight ? WORDMARK_LIGHT : WORDMARK_DARK;
    var imgs = document.querySelectorAll('[data-wordmark]');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var src = img.getAttribute('src') || '';
      img.setAttribute('src', src.replace(/izmaalabs-wordmark(?:-dark)?\.svg$/, marker));
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('cp-theme', next);
      } catch (err) {}
      renderThemeIcon();
      applyWordmark();
    });
  }
  renderThemeIcon();
  applyWordmark();

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  function buildMobileNav() {
    if (!mobileMenu) return;
    var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
    var list = document.createElement('ul');
    links.forEach(function (link) {
      var li = document.createElement('li');
      var clone = link.cloneNode(true);
      clone.addEventListener('click', closeMenu);
      li.appendChild(clone);
      list.appendChild(li);
    });
    mobileMenu.appendChild(list);
  }

  function openMenu() {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }

  if (menuToggle && mobileMenu) {
    buildMobileNav();
    menuToggle.addEventListener('click', function () {
      if (menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      } else {
        openMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 881) closeMenu();
    });
  }

  /* ---------- Header border strength on scroll ---------- */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scrollspy (active section highlight) ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.getElementById(id.slice(1)) : null;
    })
    .filter(Boolean);

  var spyTimer = null;
  function updateSpy() {
    var pos = window.scrollY + 120;
    var current = null;
    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top + window.scrollY;
      if (top <= pos) current = section;
    });
    var activeId = current ? '#' + current.id : null;
    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === activeId);
    });
  }

  if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        if (spyTimer) return;
        spyTimer = window.setTimeout(function () {
          updateSpy();
          spyTimer = null;
        }, 90);
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );
    sections.forEach(function (section) {
      spy.observe(section);
    });
    window.addEventListener(
      'scroll',
      function () {
        if (spyTimer) return;
        spyTimer = window.setTimeout(function () {
          updateSpy();
          spyTimer = null;
        }, 90);
      },
      { passive: true },
    );
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- FAQ accordion ---------- */
  var toggles = Array.prototype.slice.call(document.querySelectorAll('.faq__toggle'));
  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var item = toggle.closest('.faq__item');
      var isOpen = item.classList.contains('is-open');
      toggles.forEach(function (other, index) {
        var otherItem = other.closest('.faq__item');
        var shouldClose = otherItem !== item || (otherItem === item && isOpen);
        otherItem.classList.toggle('is-open', !shouldClose);
        other.setAttribute('aria-expanded', String(!shouldClose));
      });
    });
  });

  /* ---------- Copy to clipboard ---------- */
  var copyButtons = Array.prototype.slice.call(document.querySelectorAll('.copy-btn'));
  copyButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var text = button.getAttribute('data-copy');
      if (!text) return;
      function done(success) {
        button.textContent = success ? 'Copied' : 'Copy failed';
        button.classList.add('is-copied');
        window.setTimeout(function () {
          button.textContent = 'Copy';
          button.classList.remove('is-copied');
        }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () {
            done(true);
          },
          function () {
            fallbackCopy(text, done);
          },
        );
      } else {
        fallbackCopy(text, function (ok) {
          done(ok);
        });
      }
    });
  });

  function fallbackCopy(text, callback) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(ta);
    callback(ok);
  }
})();
