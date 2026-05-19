// NAVBAR SCROLL + ACTIVE NAV
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) current = s.id; });
  navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// SCROLL REVEAL
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .about-content, .about-image-wrap, .contact-item, .section-title'
);
revealEls.forEach(el => el.classList.add('reveal'));

document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach((el, i) => el.dataset.delay = i);

const revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    setTimeout(() => e.target.classList.add('visible'), 80 * (e.target.dataset.delay || 0));
    obs.unobserve(e.target);
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// SKILL BAR ANIMATION
document.querySelectorAll('.skill-fill').forEach(bar => {
  bar.style.animationPlayState = 'paused';
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    bar.style.animationPlayState = 'running';
    obs.unobserve(bar);
  }, { threshold: 0.3 }).observe(bar);
});

// TOAST
function showToast(msg, type = 'success') {
  document.querySelector('.toast')?.remove();
  const t = Object.assign(document.createElement('div'), { className: 'toast', textContent: msg });
  t.style.cssText = `position:fixed;bottom:2rem;right:2rem;padding:.9rem 1.6rem;
    background:${type === 'success' ? '#00e5ff' : '#ffb300'};color:#0a0f2c;
    font-family:'Outfit',sans-serif;font-weight:700;font-size:.9rem;border-radius:8px;
    z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.25);
    transform:translateY(20px);opacity:0;transition:all .3s ease`;
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateY(0)'; });
  setTimeout(() => {
    t.style.opacity = '0'; t.style.transform = 'translateY(20px)';
    setTimeout(() => t.remove(), 300);
  }, 3000);
}

// CONTACT FORM
const sendBtn = document.querySelector('.btn-send');
const textarea = document.querySelector('.contact-right textarea');
sendBtn?.addEventListener('click', () => {
  if (!textarea.value.trim()) return showToast('Please write a message first!', 'warn');
  showToast('Message sent successfully! ✓');
  textarea.value = '';
});


// TYPING EFFECT
const typingTarget = document.querySelector('.highlight-text');
if (typingTarget) {
  const text = typingTarget.textContent;
  typingTarget.textContent = '';
  typingTarget.style.borderRight = '2px solid #00e5ff';
  let i = 0;
  const timer = setInterval(() => {
    typingTarget.textContent += text[i++];
    if (i >= text.length) { clearInterval(timer); setTimeout(() => typingTarget.style.borderRight = 'none', 600); }
  }, 55);
}