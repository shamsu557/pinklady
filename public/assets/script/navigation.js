/**
 * navigation.js
 * Sticky header on scroll, animated mobile menu toggle,
 * dropdown handling for touch devices, and active-link highlighting.
 */
(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  /* ---------- Sticky Navigation ---------- */
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ---------- Mobile Menu Toggle ---------- */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active', isActive);
      menuToggle.setAttribute('aria-expanded', String(isActive));
      document.body.classList.toggle('no-scroll', isActive);
    });

    // Close on link click (mobile)
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          navMenu.classList.remove('active');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('no-scroll');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  /* ---------- Dropdown (mobile tap-to-open) ---------- */
  document.querySelectorAll('.has-dropdown > a').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        const parent = trigger.parentElement;
        const isOpen = parent.classList.contains('open');
        if (!isOpen) {
          e.preventDefault();
          document.querySelectorAll('.has-dropdown.open').forEach((el) => el.classList.remove('open'));
          parent.classList.add('open');
        }
      }
    });
  });

  /* ---------- Active Link Highlighting ---------- */
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  navLinks.forEach((link) => {
    const linkPage = (link.getAttribute('href') || '').toLowerCase();
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
