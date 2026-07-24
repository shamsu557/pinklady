/**
 * products.js
 * Product category filtering + wishlist toggle on the Products page.
 * Filtering works on existing .product-card markup rendered in HTML,
 * matched against data-category attributes.
 */
(function () {
  'use strict';

  const grid = document.querySelector('.products-grid');
  if (!grid) return;

  const cards = grid.querySelectorAll('.product-card');
  const filterPills = document.querySelectorAll('.shop-toolbar .filter-pill');
  const noResults = document.querySelector('.no-results');

  function applyFilter(category) {
    let visibleCount = 0;
    cards.forEach((card) => {
      const match = category === 'all' || card.dataset.category === category;
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });
    if (noResults) noResults.classList.toggle('show', visibleCount === 0);
  }

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      applyFilter(pill.dataset.filter);
    });
  });

  /* ---------- Wishlist Toggle ---------- */
  document.querySelectorAll('.product-wishlist').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-regular');
        icon.classList.toggle('fa-solid');
      }
    });
  });

  /* ---------- Quick View (simple modal-free preview scroll) ---------- */
  document.querySelectorAll('.product-quickview').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      const name = card ? card.querySelector('.product-name')?.textContent : '';
      alert('Quick View: ' + (name || 'Product') + '\n\nFull quick-view modal coming soon — for now, message us on WhatsApp to ask about this item!');
    });
  });
})();
