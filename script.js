// ── Cursor glow
  const glow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });

  // ── Navbar shrink
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── Scroll reveal
  const allReveal = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.width; }, 300);
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  allReveal.forEach(el => obs.observe(el));

  window.addEventListener('load', () => {
    allReveal.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
        el.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
      }
    });
  });

  // ── Toast helpers
  let toastTimer = null;

  function showToast(duration = 5000) {
    const toast = document.getElementById('toast');
    const progress = document.getElementById('toastProgress');

    // Reset progress bar
    progress.style.transition = 'none';
    progress.style.transform = 'scaleX(1)';

    toast.classList.add('show');

    // Animate progress bar shrinking
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progress.style.transition = `transform ${duration}ms linear`;
        progress.style.transform = 'scaleX(0)';
      });
    });

    // Auto-hide
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, duration);
  }

  function hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('show');
    clearTimeout(toastTimer);
  }

  // ── Contact form submit
  document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const data = new FormData(this);

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      await fetch('https://formspree.io/f/xnjopplr', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
    } catch(err) {
      // still show toast even if network error (for demo)
    }

    btn.textContent = 'Send Message ✉️';
    btn.disabled = false;
    this.reset();

    // Show the floating toast!
    showToast(5000);
  })