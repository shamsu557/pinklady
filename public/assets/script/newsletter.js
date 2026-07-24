/**
 * newsletter.js
 * Email validation and success animation for newsletter subscription
 * forms (there may be more than one on a page, e.g. footer + section).
 */
(function () {
  'use strict';

  function initNewsletterForm(form) {
    const input = form.querySelector('input[type="email"]');
    const msg = form.parentElement.querySelector('.newsletter-msg');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input ? input.value.trim() : '';
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!msg) return;

      if (!isValid) {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'newsletter-msg error';
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const originalHTML = btn ? btn.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      }

      setTimeout(() => {
        msg.textContent = "You're subscribed! Welcome to the Pinklady family.";
        msg.className = 'newsletter-msg success';
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = originalHTML;
        }
      }, 700);
    });
  }

  document.querySelectorAll('.newsletter-form').forEach(initNewsletterForm);
})();
