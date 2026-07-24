/**
 * main.js
 * Core site bootstrap: loading screen, scroll progress bar,
 * back-to-top button, cookie consent banner, and scroll-reveal animations.
 */
(function () {
  'use strict';

  /* ---------- Loading Screen ---------- */
  const loadingScreen = document.querySelector('.loading-screen');
  window.addEventListener('load', () => {
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('loaded');
        document.body.classList.remove('pre-load');
      }, 350);
    } else {
      document.body.classList.remove('pre-load');
    }
  });
  // Fallback in case 'load' is delayed by slow assets
  setTimeout(() => {
    if (loadingScreen && !loadingScreen.classList.contains('loaded')) {
      loadingScreen.classList.add('loaded');
      document.body.classList.remove('pre-load');
    }
  }, 2500);

  /* ---------- Scroll Progress Indicator ---------- */
  const progressBar = document.querySelector('.scroll-progress');
  function updateScrollProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ---------- Back To Top ---------- */
  const backToTop = document.querySelector('.back-to-top');
  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 480) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  }
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Cookie Consent Banner ---------- */
  const cookieBanner = document.querySelector('.cookie-banner');
  const COOKIE_KEY = 'pinklady_cookie_consent';
  if (cookieBanner) {
    let consent = null;
    try { consent = localStorage.getItem(COOKIE_KEY); } catch (e) { /* storage unavailable */ }
    if (!consent) {
      setTimeout(() => cookieBanner.classList.add('visible'), 1200);
    }
    const acceptBtn = cookieBanner.querySelector('[data-cookie-accept]');
    const declineBtn = cookieBanner.querySelector('[data-cookie-decline]');
    const dismiss = (value) => {
      try { localStorage.setItem(COOKIE_KEY, value); } catch (e) { /* ignore */ }
      cookieBanner.classList.remove('visible');
    };
    if (acceptBtn) acceptBtn.addEventListener('click', () => dismiss('accepted'));
    if (declineBtn) declineBtn.addEventListener('click', () => dismiss('declined'));
  }

  /* ---------- Scroll Reveal Animations ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- Button Ripple Effect ---------- */
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- Lazy Image Fade-in ---------- */
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    if (img.complete) {
      img.classList.add('lazy-loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('lazy-loaded'));
    }
  });

  /* ---------- External / Internal Nav Link Page Transition ---------- */
  const transitionEl = document.querySelector('.page-transition');
  if (transitionEl) {
    document.querySelectorAll('a[href$=".html"]').forEach((link) => {
      link.addEventListener('click', function (e) {
        const isSameTab = !this.target || this.target === '_self';
        if (isSameTab && this.origin === window.location.origin) {
          e.preventDefault();
          const href = this.href;
          transitionEl.classList.add('active');
          setTimeout(() => { window.location.href = href; }, 320);
        }
      });
    });
  }

  /* ---------- Current Year in Footer ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
