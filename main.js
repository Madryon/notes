/* ==========================================================================
   ARSD College Clone - Main JavaScript
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Mobile Nav Toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const navOverlay = document.querySelector('.nav-overlay');
  const navClose = document.querySelector('.nav-close');

  function openNav() {
    if (!nav) return;
    nav.classList.add('open');
    navOverlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('open');
    navOverlay?.classList.remove('show');
    document.body.style.overflow = '';
  }

  navToggle?.addEventListener('click', openNav);
  navClose?.addEventListener('click', closeNav);
  navOverlay?.addEventListener('click', closeNav);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // Close nav when clicking a link (mobile)
  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeNav();
    });
  });

  /* ---------- Active Nav Link ---------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Notices Ticker Pause on Hover ---------- */
  const ticker = document.querySelector('.notices-track');
  ticker?.addEventListener('mouseenter', () => {
    ticker.style.animationPlayState = 'paused';
  });
  ticker?.addEventListener('mouseleave', () => {
    ticker.style.animationPlayState = 'running';
  });

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector('.header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (header) {
      if (scroll > 8) {
        header.style.boxShadow = '0 2px 12px rgba(15, 23, 42, 0.08)';
      } else {
        header.style.boxShadow = '0 1px 2px rgba(15, 23, 42, 0.05)';
      }
    }
    lastScroll = scroll;
  }, { passive: true });

  /* ---------- Notice Tabs (Notices page) ---------- */
  const tabs = document.querySelectorAll('.notice-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      document.querySelectorAll('.notice-item').forEach((item) => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---------- Contact Form ---------- */
  const form = document.querySelector('#contact-form');
  const formSuccess = document.querySelector('#form-success');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulated submission — wire to your backend later
    formSuccess?.classList.add('show');
    form.reset();
    setTimeout(() => formSuccess?.classList.remove('show'), 5000);
  });

  /* ---------- Year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Stats counter (homepage) ---------- */
  const stats = document.querySelectorAll('.stat[data-target]');
  if (stats.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1500;
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.floor(eased * target);
            el.querySelector('.stat-value').textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    stats.forEach((s) => observer.observe(s));
  }
})();
