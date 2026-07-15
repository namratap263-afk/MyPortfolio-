// =========================
// Theme controls
// =========================
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const currentPath = window.location.pathname.split('/').pop() || 'index.html';

const applyTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'light' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }
  localStorage.setItem('portfolio-theme', theme);
};

const savedTheme = localStorage.getItem('portfolio-theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });
}

// =========================
// Navigation & responsive menu
// =========================
Array.from(document.querySelectorAll('.nav-links a')).forEach((link) => {
  const href = link.getAttribute('href') || '';
  if (href.endsWith(currentPath) || (currentPath === '' && href.endsWith('index.html'))) {
    link.classList.add('active');
  }
});

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(navLinks.classList.contains('open')));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// =========================
// Scroll reveal
// =========================
const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => observer.observe(item));

// =========================
// Typing effect
// =========================
const typingTarget = document.querySelector('.typing');
const words = ['Data Analyst', 'Dashboard Designer', 'Problem Solver', 'Storyteller'];

if (typingTarget) {
  let wordIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;

  const typeLoop = () => {
    const current = words[wordIndex];
    typingTarget.textContent = current.slice(0, letterIndex);

    if (!isDeleting && letterIndex < current.length) {
      letterIndex += 1;
    } else if (isDeleting && letterIndex > 0) {
      letterIndex -= 1;
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    const speed = isDeleting ? 70 : 110;
    setTimeout(typeLoop, speed);
  };

  typeLoop();
}

// =========================
// Counter animation
// =========================
const counters = document.querySelectorAll('.counter');
if (counters.length) {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const duration = 900;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = `${value}${counter.dataset.suffix || ''}`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
}

// =========================
// Floating particles
// =========================
const particleLayer = document.querySelector('.particle-layer');
if (particleLayer) {
  for (let i = 0; i < 30; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 180}px`);
    particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 180}px`);
    particleLayer.appendChild(particle);
  }
}

// =========================
// Back to top
// =========================
const backTop = document.querySelector('.back-top');
if (backTop) {
  backTop.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
