/**
 * contact.js
 * Client-side validation for the contact form. This does not submit
 * to a server; it simulates a successful send so the deliverable is
 * ready to be wired into a backend endpoint later.
 */
(function () {
  'use strict';

  const form = document.querySelector('#contact-form');
  if (!form) return;

  const successBox = document.querySelector('.form-success');

  const validators = {
    name: (v) => v.trim().length >= 2 || 'Please enter your full name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    phone: (v) => v.trim() === '' || /^[0-9+\s()-]{7,}$/.test(v.trim()) || 'Please enter a valid phone number.',
    subject: (v) => v.trim().length >= 2 || 'Please enter a subject.',
    message: (v) => v.trim().length >= 10 || 'Message should be at least 10 characters.',
  };

  function showError(field, message) {
    const group = field.closest('.form-group');
    if (!group) return;
    const errorEl = group.querySelector('.form-error');
    field.classList.add('error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    }
  }

  function clearError(field) {
    const group = field.closest('.form-group');
    if (!group) return;
    const errorEl = group.querySelector('.form-error');
    field.classList.remove('error');
    if (errorEl) errorEl.classList.remove('show');
  }

  function validateField(field) {
    const rule = validators[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    if (result === true) {
      clearError(field);
      return true;
    }
    showError(field, result);
    return false;
  }

  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    form.querySelectorAll('input, textarea').forEach((field) => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
      if (successBox) {
        successBox.classList.add('show');
        successBox.setAttribute('tabindex', '-1');
        successBox.focus();
      }
      form.reset();
    }, 900);
  });
})();
