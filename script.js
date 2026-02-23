// ═══════════════════════════════════════
//  SIDRA MUSHTAQ — PORTFOLIO JS
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ──
  const cursor     = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '20px';
      cursor.style.height = '20px';
      cursorRing.style.width  = '52px';
      cursorRing.style.height = '52px';
      cursorRing.style.opacity = '0.9';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '12px';
      cursor.style.height = '12px';
      cursorRing.style.width  = '36px';
      cursorRing.style.height = '36px';
      cursorRing.style.opacity = '0.5';
    });
  });

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── MOBILE MENU ──
  const toggle   = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.innerHTML = navLinks.classList.contains('open')
      ? '<i class="fas fa-xmark"></i>'
      : '<i class="fas fa-bars"></i>';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // ── TYPING EFFECT ──
  const roles = ['IT Graduate', 'Web Developer', 'Database Designer', 'Problem Solver'];
  const typingEl = document.getElementById('typing-text');
  let roleIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const word = roles[roleIdx];
    typingEl.textContent = isDeleting
      ? word.substring(0, charIdx--)
      : word.substring(0, charIdx++);

    let delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIdx === word.length + 1) {
      delay = 1800; isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // ── SKILL BARS ANIMATE ON SCROLL ──
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillObserver.observe(skillsSection);

  // ── ACTIVE NAV LINK on SCROLL ──
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAs.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--cyan)' : '';
    });
  });

  // ── CONTACT FORM ──
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-send');
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #00aa55, #22dd88)';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  // ── SMOOTH SCROLL for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── COUNT UP ANIMATION ──
  function countUp(el, target, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = target + '+'; clearInterval(timer); }
      else el.textContent = Math.floor(start) + '+';
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          countUp(el, parseInt(el.dataset.count));
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const aboutSec = document.getElementById('about');
  if (aboutSec) statsObserver.observe(aboutSec);
});
