/**
 * animation.js
 * FAQ accordion behaviour + small UI micro-interactions
 * that don't belong to a more specific module.
 */
(function () {
  'use strict';

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others (single-open accordion)
      item.closest('.faq-list')?.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Tilt-free gentle hover lift for feature icons ---------- */
  document.querySelectorAll('.service-icon, .feature-icon').forEach((icon) => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.1) rotate(-4deg)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = '';
    });
  });
})();
