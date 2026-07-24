/**
 * slider.js
 * Generic lightweight carousel engine used for the testimonials
 * carousel (and any other `[data-carousel]` block on the site).
 */
(function () {
  'use strict';

  function initCarousel(root) {
    const track = root.querySelector('.testimonial-slides');
    const slides = root.querySelectorAll('.testimonial-slide');
    const dotsWrap = root.querySelector('.carousel-dots');
    const prevBtn = root.querySelector('.carousel-prev');
    const nextBtn = root.querySelector('.carousel-next');
    if (!track || !slides.length) return;

    let index = 0;
    let autoplayTimer = null;
    const AUTOPLAY_DELAY = 6000;

    // Build dots
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
          d.classList.toggle('active', i === index);
        });
      }
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
      resetAutoplay();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function resetAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(next, AUTOPLAY_DELAY);
    }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // Swipe support
    let startX = 0;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) diff < 0 ? next() : prev();
    }, { passive: true });

    // Pause on hover
    root.addEventListener('mouseenter', () => autoplayTimer && clearInterval(autoplayTimer));
    root.addEventListener('mouseleave', resetAutoplay);

    update();
    resetAutoplay();
  }

  document.querySelectorAll('[data-carousel]').forEach(initCarousel);
})();
