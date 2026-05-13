
// CMS Data State
let cmsData = null;

async function fetchCMSData() {
  try {
    const res = await fetch('content/data.json');
    if (res.ok) {
      cmsData = await res.json();
      applyCMSData();
    }
  } catch (err) {
    console.error('Error fetching CMS data:', err);
  }
}

function applyCMSData() {
  if (!cmsData) return;
  const data = cmsData;

  // Hero
  const greeting = document.querySelector('.hero-greeting');
  if (greeting) greeting.textContent = data.hero.greeting;
  
  const title = document.querySelector('.hero-title');
  if (title) title.textContent = data.hero.title;
  
  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle) subtitle.textContent = data.hero.subtitle;
  
  const highlights = document.querySelector('.hero-highlights');
  if (highlights) highlights.innerHTML = data.hero.highlights.map(h => `<span class="hero-highlight">${h}</span>`).join('');

  // Typewriter
  roles.length = 0;
  roles.push(...data.hero.typed_text);

  // About
  const aboutIntro = document.querySelector('.about-intro');
  if (aboutIntro) aboutIntro.innerHTML = `<p class="about-lead">${data.about.lead_html}</p>`;
  
  const aboutCards = document.querySelector('.about-cards');
  if (aboutCards) aboutCards.innerHTML = data.about.cards.map(c => `
    <div class="about-card">
      <div class="about-card-icon"><i class="${c.icon}"></i></div>
      <h4>${c.title}</h4>
      <p>${c.description}</p>
    </div>`).join('');
    
  const aboutStats = document.querySelector('.about-stats');
  if (aboutStats) aboutStats.innerHTML = data.about.stats.map(s => `
    <div class="stat-item">
      <span class="stat-number">${s.number}</span>
      <span class="stat-label">${s.label}</span>
    </div>`).join('');

  // Experience
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    const timelineHTML = data.experience.map(e => `
    <div class="timeline-item reveal active">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-date">${e.date}</span>
        <h3 class="timeline-title">${e.title}</h3>
        <p class="timeline-subtitle">${e.subtitle}</p>
        ${e.projects.map(p => `
          <div class="experience-project">
            <h4>${p.title}</h4>
            <ul>
              ${p.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
    timeline.innerHTML = '<div class="timeline-progress" id="timelineProgress"></div>' + timelineHTML;
  }

  // Projects
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid) projectsGrid.innerHTML = data.projects.map(p => `
    <article class="project-card reveal active" ${p.hasDeepDive ? `style="cursor: pointer;" onclick="openDeepDive('${p.deepDiveId}')"` : ''}>
      <div class="project-image">
        <div class="project-image-placeholder">
          <i class="${p.icon}"></i>
        </div>
      </div>
      <div class="project-content">
        <span class="project-label">${p.label} ${p.hasDeepDive ? '&bull; <i class="fas fa-expand"></i> Deep Dive' : ''}</span>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-summary">${p.summary}</p>
        <div class="project-details">
          ${p.details.map(d => `
            <div class="project-detail">
              <h4>${d.heading}</h4>
              <p>${d.text}</p>
            </div>
          `).join('')}
        </div>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  // Edge
  const edgeContainer = document.getElementById('edgeContainer');
  if (edgeContainer && data.edge) {
    edgeContainer.innerHTML = `
      <div class="edge-content reveal active">
        <h3 style="margin-bottom: 1.5rem; color: var(--text-primary);">${data.edge.title}</h3>
        <div class="edge-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
          ${data.edge.items.map(i => `
            <div class="edge-card" style="background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: var(--border-radius); border: 1px solid rgba(255,255,255,0.05);">
              <h4 style="color: var(--accent-primary); margin-bottom: 0.5rem;">${i.heading}</h4>
              <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">${i.text}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Skills
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) skillsGrid.innerHTML = data.skills.map(s => `
    <div class="skill-category reveal active">
      <div class="skill-category-icon"><i class="${s.icon}"></i></div>
      <h3>${s.title}</h3>
      <div class="skills">
        ${s.skills_list.map(sk => `<span class="skill-tag">${sk}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // Education
  const educationGrid = document.querySelector('.education-grid');
  if (educationGrid) educationGrid.innerHTML = data.education.map(ed => `
    <div class="education-card reveal active">
      <div class="education-icon"><i class="${ed.icon}"></i></div>
      <h3>${ed.title}</h3>
      <p class="education-school">${ed.school}</p>
      <p class="education-meta">${ed.meta}</p>
      <div class="education-score">
        <span class="score-badge">${ed.score}</span>
      </div>
    </div>
  `).join('');

  // Contact
  const contactInfo = document.querySelector('.contact-info');
  if (contactInfo) contactInfo.innerHTML = `
    <p>I'm open to product management roles, fintech opportunities, and conversations where strong execution and structured product thinking matter.</p>
    <div class="contact-item">
      <div class="contact-icon"><i class="fas fa-envelope"></i></div>
      <div>
        <h4>Email</h4>
        <a href="mailto:${data.contact.email}">${data.contact.email}</a>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon"><i class="fas fa-phone"></i></div>
      <div>
        <h4>Phone</h4>
        <a href="tel:${data.contact.phone.replace(/\s+/g, '')}">${data.contact.phone}</a>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon"><i class="fas fa-location-dot"></i></div>
      <div>
        <h4>Location</h4>
        <p>${data.contact.location}</p>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon"><i class="fab fa-linkedin"></i></div>
      <div>
        <h4>LinkedIn</h4>
        <a href="${data.contact.linkedin_url}" target="_blank" rel="noopener noreferrer">${data.contact.linkedin}</a>
      </div>
    </div>
  `;

  // Re-query reveal elements
  window.revealElements = document.querySelectorAll('.reveal');
}

// Call fetch on load
fetchCMSData();

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
let roles = ['Technical Product Manager', 'FinTech & Platform Products', '0-to-1 + Scale-up Delivery'];
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
window.revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  window.revealElements.forEach(el => {
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
    formStatus.className = 'form-status error';
    formStatus.textContent = 'Form submission is currently unavailable. Please email me directly at tirthesh18@gmail.com.';
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

// Projects Carousel Navigation
const projectsGrid = document.getElementById('projectsGrid');
const scrollPrevBtn = document.getElementById('scrollPrev');
const scrollNextBtn = document.getElementById('scrollNext');

if (projectsGrid && scrollPrevBtn && scrollNextBtn) {
  const getScrollAmount = () => {
    const card = projectsGrid.querySelector('.project-card');
    return card ? card.offsetWidth + 32 : 400; // 32px is 2rem gap
  };

  scrollPrevBtn.addEventListener('click', () => {
    projectsGrid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  scrollNextBtn.addEventListener('click', () => {
    projectsGrid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });
}

// Timeline Scroll Progress
const experienceTimeline = document.getElementById('experienceTimeline');
const timelineProgress = document.getElementById('timelineProgress');

if (experienceTimeline && timelineProgress) {
  window.addEventListener('scroll', () => {
    const rect = experienceTimeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Start filling when the timeline's top reaches the middle of the viewport
    // End filling when the timeline's bottom reaches the middle of the viewport
    const scrolled = (windowHeight / 2) - rect.top;
    const timelineHeight = rect.height;
    
    let percentage = (scrolled / timelineHeight) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    timelineProgress.style.height = `${percentage}%`;
  });
}

// Deep Dive Modal Logic
const deepDiveModal = document.getElementById('deepDiveModal');
const deepDiveBody = document.getElementById('deepDiveBody');
const closeModalBtn = document.getElementById('closeModalBtn');

window.openDeepDive = function(id) {
  if (cmsData && cmsData.deepDives && cmsData.deepDives[id]) {
    deepDiveBody.innerHTML = cmsData.deepDives[id];
    deepDiveModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    deepDiveModal.classList.remove('active');
    document.body.style.overflow = '';
  });
}

if (deepDiveModal) {
  deepDiveModal.addEventListener('click', (e) => {
    if (e.target === deepDiveModal) {
      deepDiveModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}
