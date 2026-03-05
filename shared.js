/* ── shared.js — runs on every page ───────────────────── */
(function () {

  /* NAV SCROLL */
  const nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
    const bt = document.getElementById('backTop');
    if (bt) bt.classList.toggle('visible', window.scrollY > 380);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* MOBILE NAV */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    let open = false;
    hamburger.addEventListener('click', () => {
      open = !open;
      mobileNav.classList.toggle('open', open);
      const spans = hamburger.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    document.querySelectorAll('.mobile-nav a').forEach(a => {
      a.addEventListener('click', () => {
        open = false;
        mobileNav.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  /* REVEAL ON SCROLL */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* STAT COUNTER */
  function countUp(el, target, suffix) {
    let start = null;
    const dur = 1800;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const statIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const t = parseInt(el.dataset.target);
        const s = el.dataset.suffix || '+';
        if (!isNaN(t)) countUp(el, t, s);
        statIO.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => statIO.observe(el));

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ACTIVE NAV LINK */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html') || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* CONTACT FORM SUBMIT */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const msg = document.getElementById('formMsg');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      // Simulated submit — replace with Formspree/EmailJS endpoint
      await new Promise(r => setTimeout(r, 1200));
      msg.textContent = '✓ Thank you! We\'ll call you back shortly.';
      msg.style.color = '#2ECC71';
      btn.textContent = 'Message Sent ✓';
      form.reset();
    });
  }

})();
