/**
 * search.js
 * Live search box behaviour:
 *  - On the Products page, filters visible .product-card elements by name/category.
 *  - In the header, toggles a lightweight search overlay (if present) for site-wide search.
 */
(function () {
  'use strict';

  /* ---------- Product Search (Products page toolbar) ---------- */
  const productSearchInput = document.querySelector('.shop-toolbar .search-box input');
  const productCards = document.querySelectorAll('.products-grid .product-card');
  const noResults = document.querySelector('.no-results');

  if (productSearchInput && productCards.length) {
    productSearchInput.addEventListener('input', () => {
      const query = productSearchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      // Reset active filter pill to "All" once a text search is used
      if (query) {
        document.querySelectorAll('.shop-toolbar .filter-pill').forEach((p) => p.classList.remove('active'));
        document.querySelector('.shop-toolbar .filter-pill[data-filter="all"]')?.classList.add('active');
      }

      productCards.forEach((card) => {
        const name = (card.querySelector('.product-name')?.textContent || '').toLowerCase();
        const cat = (card.dataset.category || '').toLowerCase();
        const match = !query || name.includes(query) || cat.includes(query);
        card.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });

      if (noResults) noResults.classList.toggle('show', visibleCount === 0);
    });
  }

  /* ---------- Header Search Overlay (site-wide) ---------- */
  const searchToggle = document.querySelector('[data-search-toggle]');
  const searchOverlay = document.querySelector('.search-overlay');

  if (searchToggle && searchOverlay) {
    const overlayInput = searchOverlay.querySelector('input');
    const closeBtn = searchOverlay.querySelector('.search-overlay-close');

    const open = () => {
      searchOverlay.classList.add('active');
      document.body.classList.add('no-scroll');
      setTimeout(() => overlayInput && overlayInput.focus(), 200);
    };
    const close = () => {
      searchOverlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    };

    searchToggle.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) close();
    });

    const form = searchOverlay.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = overlayInput ? overlayInput.value.trim() : '';
        if (q) window.location.href = 'products.html?search=' + encodeURIComponent(q);
      });
    }
  }

  /* ---------- Pre-fill Products search from ?search= query param ---------- */
  if (productSearchInput) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('search');
    if (q) {
      productSearchInput.value = q;
      productSearchInput.dispatchEvent(new Event('input'));
    }
  }
})();
