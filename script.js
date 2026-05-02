// Preloader
const preloader = document.getElementById('preloader');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('loaded');
  }, prefersReducedMotion.matches ? 0 : 450);
});

// Typewriter effect
const typedElement = document.getElementById('typedText');
const roles = ['FinTech Product Manager', '0-to-1 Product Builder', 'Platform Product Thinker', 'Business-to-Tech Translator'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  if (prefersReducedMotion.matches) {
    typedElement.textContent = roles[0];
    return;
  }

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, prefersReducedMotion.matches ? 0 : 500);

// Ember particle system
const canvas = document.getElementById('emberCanvas');
const ctx = canvas.getContext('2d');
let embers = [];
let animationFrameId;

function resizeCanvas() {
  const hero = canvas.parentElement;
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}

class Ember {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 10;
    this.size = Math.random() * 3 + 1;
    this.speedY = Math.random() * 1.2 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.fadeRate = Math.random() * 0.003 + 0.001;
    this.hue = Math.random() * 40 + 15;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
    this.opacity -= this.fadeRate;

    if (this.opacity <= 0 || this.y < -10) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${this.hue}, 95%, 55%)`;
    ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
    ctx.shadowBlur = this.size * 4;
    ctx.fill();
    ctx.restore();
  }
}

function initEmbers() {
  resizeCanvas();
  const count = Math.min(Math.floor(canvas.width / 15), 80);
  embers = [];
  for (let i = 0; i < count; i++) {
    const ember = new Ember();
    ember.y = Math.random() * canvas.height;
    embers.push(ember);
  }
}

function animateEmbers() {
  if (prefersReducedMotion.matches) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  embers.forEach(e => {
    e.update();
    e.draw();
  });
  animationFrameId = requestAnimationFrame(animateEmbers);
}

window.addEventListener('resize', initEmbers);
initEmbers();
animateEmbers();

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  icon.className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.querySelector('i').className = 'fas fa-bars';
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink) {
      navLink.classList.toggle(
        'active',
        scrollY >= sectionTop && scrollY < sectionTop + sectionHeight
      );
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    if (el.getBoundingClientRect().top < windowHeight - 120) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  setTimeout(revealOnScroll, prefersReducedMotion.matches ? 0 : 500);
});

prefersReducedMotion.addEventListener('change', () => {
  if (prefersReducedMotion.matches) {
    cancelAnimationFrame(animationFrameId);
    typedElement.textContent = roles[0];
  } else {
    initEmbers();
    animateEmbers();
  }
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form — Web3Forms AJAX submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const accessKey = contactForm.querySelector('input[name="access_key"]').value;

  if (!accessKey || accessKey === 'YOUR_ACCESS_KEY') {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const mailto = `mailto:tirthesh18@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    return;
  }

  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  submitBtn.disabled = true;
  formStatus.className = 'form-status';
  formStatus.textContent = '';

  try {
    const formData = new FormData(contactForm);
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
      contactForm.reset();
    } else {
      throw new Error(data.message || 'Something went wrong');
    }
  } catch (err) {
    formStatus.className = 'form-status error';
    formStatus.textContent = 'Failed to send message. Please try again or email me directly.';
  } finally {
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;

    setTimeout(() => {
      formStatus.className = 'form-status';
      formStatus.textContent = '';
    }, 6000);
  }
});
