(() => {
  // Pega aquí la URL de tu App Web de Google Apps Script (ver ../waitlist/README.md).
  const WAITLIST_ENDPOINT = 'PEGA_TU_URL_DEL_APPS_SCRIPT_AQUI';

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
  const showToast = (text) => {
    if (text) toast.textContent = text;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };

  const download = document.getElementById('downloadBtn');
  if (download) {
    download.addEventListener('click', (e) => {
      if (download.getAttribute('href') === '#') {
        e.preventDefault();
        showToast('Enlace de descarga próximamente ✨');
      }
    });
  }

  const form = document.getElementById('waitlistForm');
  if (form) {
    const btn = form.querySelector('button[type="submit"]');
    const msg = document.getElementById('waitlistMsg');
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const app = form.dataset.app || 'ingresaya';

      msg.textContent = '';
      msg.classList.remove('is-ok', 'is-error');

      if (nombre.length < 2) {
        msg.textContent = 'Escribe tu nombre para continuar.';
        msg.classList.add('is-error');
        return;
      }
      if (!EMAIL_RE.test(email)) {
        msg.textContent = 'Escribe un correo válido.';
        msg.classList.add('is-error');
        return;
      }
      if (!WAITLIST_ENDPOINT.includes('script.google.com')) {
        msg.textContent = 'Formulario en configuración: aún no se conectó el servidor.';
        msg.classList.add('is-error');
        return;
      }

      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Enviando…';

      try {
        const res = await fetch(WAITLIST_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ app, nombre, email }),
        });
        const data = await res.json();
        if (!data.ok) throw new Error(data.error || 'error');

        msg.textContent = '¡Listo! Te avisaremos cuando Ingresa Ya despegue. 🐦';
        msg.classList.add('is-ok');
        form.reset();
        showToast('¡Bienvenida al acceso anticipado! 🎉');
      } catch (err) {
        msg.textContent = 'No se pudo enviar. Intenta de nuevo en unos segundos.';
        msg.classList.add('is-error');
      } finally {
        btn.disabled = false;
        btn.textContent = original;
      }
    });
  }
})();
