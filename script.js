(() => {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  const revealables = document.querySelectorAll('.reveal');
  const show = (el) => el.classList.add('is-visible');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach(show);
  }

  // Red de seguridad: si un elemento ya está en pantalla y el observer no
  // dispara (carga instantánea, anclas, capturas), se muestra igual.
  const sweep = () => {
    revealables.forEach((el) => {
      if (el.classList.contains('is-visible')) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) show(el);
    });
  };
  const sweepId = setInterval(sweep, 400);
  setTimeout(() => clearInterval(sweepId), 8000);
  window.addEventListener('load', sweep);

  const toast = document.getElementById('toast');
  let toastTimer;
  const showToast = () => {
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };

  const download = document.getElementById('downloadBtn');
  if (download) {
    download.addEventListener('click', (e) => {
      if (download.getAttribute('href') === '#') {
        e.preventDefault();
        showToast();
      }
    });
  }
})();
