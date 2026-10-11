// Main Interactive Application Logic for InternNova 3D

// Roadmap Data for all 6 internship domains (cloned from original site)
const ROADMAP_DATA = {
  'web-dev': {
    title: 'Web Development Internship',
    code: 'D-01',
    duration: '6 Weeks',
    weeks: [
      { week: 'Week 1-2: Fundamentals', items: ['HTML5 & Modern Semantic Elements', 'CSS3 Styling & Responsive Design with Flexbox / Grid', 'Git & GitHub Version Control Workflow'] },
      { week: 'Week 3: Interactivity', items: ['JavaScript Core Syntax & DOM Manipulation', 'Event Handling & Dynamic Web Interactions', 'Form Validation & LocalStorage'] },
      { week: 'Week 4-5: Advanced Frontend', items: ['Modern JavaScript ES6+ Features & Promises', 'REST API Fetch & Asynchronous Operations', 'Interactive Responsive UI Components'] },
      { week: 'Week 6: Final Project', items: ['Capstone Portfolio Web Application Development', 'Live Cloud Deployment on Vercel / Netlify', 'Project Review & Verified Certificate Issuance'] }
    ]
  },
  'data': {
    title: 'Data Analytics Internship',
    code: 'D-02',
    duration: '6 Weeks',
    weeks: [
      { week: 'Week 1-2: Excel & Data Handling', items: ['Advanced Excel Formulas (VLOOKUP, INDEX-MATCH)', 'Data Cleaning, Pivot Tables & Conditional Formatting', 'Exploratory Data Analysis (EDA)'] },
      { week: 'Week 3: SQL Fundamentals', items: ['Relational Database Basics & Schema Architecture', 'SQL Query Writing: SELECT, WHERE, GROUP BY, HAVING', 'Multi-table Joins & Subqueries'] },
      { week: 'Week 4-5: Power BI & Dashboards', items: ['Power Query Data Transformation', 'DAX Measures & Calculated Columns', 'Interactive Executive Dashboard Creation'] },
      { week: 'Week 6: Final Project', items: ['End-to-End Business Intelligence Report', 'Insight Storytelling & Dashboard Publishing', 'Project Review & Verified Certificate Issuance'] }
    ]
  },
  'cyber': {
    title: 'Cyber Security Internship',
    code: 'D-03',
    duration: '6 Weeks',
    weeks: [
      { week: 'Week 1-2: Security Fundamentals', items: ['Introduction to Cyber Security & CIA Triad', 'Networking Protocols (TCP/IP, DNS, HTTP/S)', 'Linux Command Line Essentials'] },
      { week: 'Week 3: Threats & Attacks', items: ['Common Malware & Ransomware Vectors', 'Phishing & Social Engineering Mitigation', 'OWASP Top 10 Web Vulnerabilities'] },
      { week: 'Week 4-5: Ethical Hacking Basics', items: ['Vulnerability Scanning with Nmap & Wireshark', 'Basic Penetration Testing Concepts', 'Cryptography, Hashing & SSL/TLS Standards'] },
      { week: 'Week 6: Final Project', items: ['Enterprise Security Vulnerability Audit Report', 'Remediation Strategy & Best Practices', 'Project Review & Verified Certificate Issuance'] }
    ]
  },
  'ai': {
    title: 'Artificial Intelligence & ML Internship',
    code: 'D-04',
    duration: '6 Weeks',
    weeks: [
      { week: 'Week 1-2: Python & Data Science', items: ['Python Programming for AI & Data Structures', 'NumPy & Pandas for Numerical Computing', 'Data Visualization with Matplotlib & Seaborn'] },
      { week: 'Week 3: Machine Learning Concepts', items: ['Supervised Learning: Regression & Classification', 'Model Evaluation Metrics (Accuracy, Precision, Recall)', 'Scikit-Learn Implementation'] },
      { week: 'Week 4-5: Modern AI Tools & LLMs', items: ['Deep Learning & Neural Network Foundations', 'ChatGPT & OpenAI APIs Integration', 'Prompt Engineering & Autonomous Agents'] },
      { week: 'Week 6: Final Project', items: ['AI-Powered Web Application / Predictor', 'Model Deployment & Interactive UI', 'Project Review & Verified Certificate Issuance'] }
    ]
  },
  'python': {
    title: 'Python Programming Internship',
    code: 'D-05',
    duration: '6 Weeks',
    weeks: [
      { week: 'Week 1-2: Python Fundamentals', items: ['Variables, Data Types, Control Flow & Loops', 'Functions, Scope & Recursion', 'List Comprehensions & Dictionaries'] },
      { week: 'Week 3: Object-Oriented Programming', items: ['Classes, Objects, Inheritance & Polymorphism', 'Encapsulation & Magic Methods', 'Modular Code & Package Management'] },
      { week: 'Week 4-5: Automation & APIs', items: ['File I/O, CSV & JSON Parsing', 'Web Scraping with BeautifulSoup', 'REST API Requests & Task Automation Scripts'] },
      { week: 'Week 6: Final Project', items: ['Complete Modular Python Application', 'Unit Testing & Documentation', 'Project Review & Verified Certificate Issuance'] }
    ]
  },
  'java': {
    title: 'Java Software Development Internship',
    code: 'D-06',
    duration: '6 Weeks',
    weeks: [
      { week: 'Week 1-2: Core Java', items: ['Java Syntax, JVM, JDK & Memory Management', 'Variables, Operators, Control Statements & Arrays', 'Methods & Recursion'] },
      { week: 'Week 3: OOP Principles', items: ['Class Design & Object Lifecycle', 'Inheritance, Interfaces & Abstract Classes', 'Exception Handling & Custom Exceptions'] },
      { week: 'Week 4-5: Advanced Java & Databases', items: ['Java Collections Framework (List, Set, Map)', 'JDBC Database Connectivity', 'Multithreading & Concurrency Basics'] },
      { week: 'Week 6: Final Project', items: ['Java Database Application / Management System', 'Clean Architecture & Testing', 'Project Review & Verified Certificate Issuance'] }
    ]
  }
};

// Web Audio Sound Synthesizer
class SoundController {
  constructor() {
    this.enabled = false;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  toggle() {
    this.init();
    this.enabled = !this.enabled;
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
      btn.classList.toggle('is-active', this.enabled);
      btn.setAttribute('aria-label', this.enabled ? 'Mute Sound' : 'Enable Sound');
      btn.innerHTML = this.enabled ? 
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>' : 
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
    }
    if (this.enabled) this.playSuccess();
  }

  playClick() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playRobotClick() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.16);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playSuccess() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.06, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.15);
    });
  }
}

window.InternNovaSound = new SoundController();

// Global Toast Notification Helper
window.InternNovaToast = function(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// Setup dynamic time greeting badge
function setupGreeting() {
  const badgeEl = document.getElementById('hero-greeting-text');
  if (!badgeEl) return;
  const hour = new Date().getHours();
  let greeting = 'Good Evening 🌙';
  if (hour >= 5 && hour < 12) greeting = 'Good Morning ☀️';
  else if (hour >= 12 && hour < 17) greeting = 'Good Afternoon ⛅';
  else if (hour >= 17 && hour < 21) greeting = 'Good Evening 🌙';
  else greeting = 'Good Night ✨';

  badgeEl.textContent = greeting;
}

// Dark / Light Theme Toggle
function setupTheme() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      if (window.InternNovaSound) window.InternNovaSound.playClick();
      window.InternNovaToast(`Switched to ${isLight ? 'Light' : 'Dark'} mode`);
    });
  }
}

// 3D Card Tilt Effect
function setup3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// Counter animation for stats section
function setupStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        stats.forEach(stat => {
          const text = stat.textContent.trim();
          const target = parseInt(text, 10);
          if (isNaN(target)) return;
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
              stat.textContent = text; // preserve suffix like '+' or '%'
            } else {
              stat.textContent = current + (text.includes('+') ? '+' : text.includes('%') ? '%' : '');
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

// Navbar Dropdown Toggle on Click & Outside Click
function setupDropdowns() {
  const wrappers = document.querySelectorAll('.nav-dropdown-wrapper');
  
  wrappers.forEach(wrapper => {
    const btn = wrapper.querySelector('.nav-dropdown-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = wrapper.classList.contains('is-open');

      // Close all other dropdowns
      wrappers.forEach(w => {
        w.classList.remove('is-open');
        const b = w.querySelector('.nav-dropdown-btn');
        if (b) b.classList.remove('is-active');
      });

      if (!isOpen) {
        wrapper.classList.add('is-open');
        btn.classList.add('is-active');
      }

      if (window.InternNovaSound) window.InternNovaSound.playClick();
    });

    // Close when clicking dropdown items
    const links = wrapper.querySelectorAll('.dropdown-item');
    links.forEach(link => {
      link.addEventListener('click', () => {
        wrapper.classList.remove('is-open');
        btn.classList.remove('is-active');
      });
    });
  });

  // Close when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown-wrapper')) {
      wrappers.forEach(w => {
        w.classList.remove('is-open');
        const b = w.querySelector('.nav-dropdown-btn');
        if (b) b.classList.remove('is-active');
      });
    }
  });
}

// FAQ Accordion - Toggle on Click
function setupFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const wasActive = item.classList.contains('active');
      
      // Close all
      faqItems.forEach(i => i.classList.remove('active'));
      
      // If was not active, open it
      if (!wasActive) {
        item.classList.add('active');
      }

      if (window.InternNovaSound) window.InternNovaSound.playClick();
    });
  });
}

// Modal System
function setupModals() {
  const overlay = document.getElementById('universal-modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');

  window.openModal = function(contentHtml) {
    const body = document.getElementById('modal-body-content');
    if (body) body.innerHTML = contentHtml;
    if (overlay) overlay.classList.add('is-open');
    if (window.InternNovaSound) window.InternNovaSound.playClick();
    lucide.createIcons();
  };

  window.closeModal = function() {
    if (overlay) overlay.classList.remove('is-open');
  };

  if (closeBtn) closeBtn.addEventListener('click', window.closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) window.closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeModal();
  });
}

// Interactive Roadmap Viewer
window.showRoadmap = function(domainId) {
  const data = ROADMAP_DATA[domainId] || ROADMAP_DATA['web-dev'];
  const html = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
      <span class="program-code">${data.code}</span>
      <span style="font-size:0.85rem; color:var(--accent); font-weight:600;">${data.duration} Track</span>
    </div>
    <h2 style="font-size:1.5rem; margin-bottom:8px;">${data.title}</h2>
    <p style="color:var(--text-muted); font-size:0.9rem;">Comprehensive 6-week curriculum designed for industry mastery.</p>
    
    <div class="roadmap-timeline">
      ${data.weeks.map(w => `
        <div class="roadmap-step">
          <h4>${w.week}</h4>
          <ul>
            ${w.items.map(it => `<li>${it}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>

    <div style="margin-top:24px; display:flex; gap:12px; justify-content:flex-end;">
      <button class="btn btn-outline btn-sm" onclick="closeModal()">Close</button>
      <button class="btn btn-primary btn-sm" onclick="openApplyModal('${data.title}')">Enroll In This Track</button>
    </div>
  `;
  window.openModal(html);
};

// Interactive Program Application Modal
window.openApplyModal = function(programName) {
  const html = `
    <h2 style="font-size:1.5rem; margin-bottom:8px;">Apply For Internship</h2>
    <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:20px;">Complete your details to secure your spot in the upcoming cohort.</p>
    <form onsubmit="handleApplySubmit(event)">
      <div class="form-group">
        <label class="form-label">Preferred Program</label>
        <select class="form-select" id="apply-program-name" required>
          <option value="${programName || 'Full Stack Web Development'}" selected>${programName || 'Full Stack Web Development'}</option>
          <option value="Data Analytics & Business Intelligence">Data Analytics & Business Intelligence</option>
          <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
          <option value="Java Software Development">Java Software Development</option>
          <option value="Cyber Security & Ethical Hacking">Cyber Security & Ethical Hacking</option>
          <option value="Python Programming & Automation">Python Programming & Automation</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Full Name</label>
        <input type="text" class="form-input" placeholder="e.g. Rahul Sharma" required />
      </div>
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <input type="email" class="form-input" placeholder="e.g. rahul@example.com" required />
      </div>
      <div class="form-group">
        <label class="form-label">WhatsApp Number</label>
        <input type="tel" class="form-input" placeholder="+91 9876543210" required />
      </div>
      <div class="form-group">
        <label class="form-label">College / University</label>
        <input type="text" class="form-input" placeholder="e.g. IIT Bombay / Delhi University" required />
      </div>
      <button type="submit" class="btn btn-primary btn-block" style="margin-top:10px;">Submit Application</button>
    </form>
  `;
  window.openModal(html);
};

window.handleApplySubmit = function(e) {
  e.preventDefault();
  window.closeModal();
  if (window.InternNovaSound) window.InternNovaSound.playSuccess();
  window.InternNovaToast('🎉 Application submitted successfully! Our team will contact you shortly.');
};

// Certificate Verification Modal
window.openVerifyModal = function() {
  const html = `
    <h2 style="font-size:1.5rem; margin-bottom:8px;">Verify Certificate</h2>
    <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:20px;">Enter your unique Verification ID to view credentials and status.</p>
    <form onsubmit="handleVerifySubmit(event)">
      <div class="form-group">
        <label class="form-label">Verification ID</label>
        <input type="text" id="verify-id-input" class="form-input" placeholder="e.g. IN-2024-8841" value="IN-2024-8841" required />
      </div>
      <button type="submit" class="btn btn-primary btn-block">Verify Authenticity</button>
    </form>
    <div id="verify-result-box" style="margin-top:20px; display:none;"></div>
  `;
  window.openModal(html);
};

window.handleVerifySubmit = function(e) {
  e.preventDefault();
  const input = document.getElementById('verify-id-input');
  const resultBox = document.getElementById('verify-result-box');
  const certId = input ? input.value.trim().toUpperCase() : 'IN-2024-8841';

  resultBox.style.display = 'block';
  resultBox.innerHTML = `
    <div style="background:var(--surface-2); border:1px solid rgba(34, 197, 94, 0.4); border-radius:12px; padding:20px; text-align:left;">
      <div style="display:flex; align-items:center; gap:8px; color:#22c55e; font-weight:600; margin-bottom:12px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span>VERIFIED OFFICIAL CERTIFICATE</span>
      </div>
      <div style="font-size:0.9rem; color:var(--text); line-height:1.6;">
        <div><strong>Certificate ID:</strong> ${certId}</div>
        <div><strong>Recipient:</strong> Aman Verma</div>
        <div><strong>Domain:</strong> Full Stack Web Development</div>
        <div><strong>Status:</strong> Completed with Distinction</div>
        <div><strong>Issued On:</strong> October 2026</div>
        <div><strong>Issuer:</strong> InternNova Learning Platforms (MSME Registered)</div>
      </div>
    </div>
  `;
  if (window.InternNovaSound) window.InternNovaSound.playSuccess();
};

// Login Modals
window.openLoginModal = function(role) {
  const isStaff = role === 'staff';
  const html = `
    <h2 style="font-size:1.5rem; margin-bottom:8px;">${isStaff ? 'Staff Portal Login' : 'Student Portal Login'}</h2>
    <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:20px;">${isStaff ? 'Enter your staff credentials to access admin operations.' : 'Access your dashboard, weekly tasks, and offer letter.'}</p>
    <form onsubmit="handleLoginSubmit(event, '${role}')">
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <input type="email" class="form-input" placeholder="user@internnova.co.in" required />
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input type="password" class="form-input" placeholder="••••••••" required />
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; font-size:0.85rem;">
        <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
          <input type="checkbox" /> Remember me
        </label>
        <a href="#" style="color:var(--accent); text-decoration:none;" onclick="alert('Password reset link sent to registered email.')">Forgot password?</a>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Sign In</button>
    </form>
  `;
  window.openModal(html);
};

window.handleLoginSubmit = function(e, role) {
  e.preventDefault();
  window.closeModal();
  if (window.InternNovaSound) window.InternNovaSound.playSuccess();
  window.InternNovaToast(`Welcome! Logged in as ${role === 'staff' ? 'Staff Member' : 'Student'}.`);
};

// Newsletter Form Handler
window.handleNewsletterSubmit = function(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  if (!emailInput) return;
  const email = emailInput.value.trim().toLowerCase();

  // Validate disposable emails (same rule as original site)
  const banned = ['mailinator.com', '10minutemail.com', 'tempmail.com', 'guerrillamail.com', 'trashmail.com'];
  const domain = email.split('@')[1];
  if (banned.includes(domain)) {
    window.InternNovaToast('❌ Temporary email addresses are not allowed.');
    return;
  }

  emailInput.value = '';
  if (window.InternNovaSound) window.InternNovaSound.playSuccess();
  window.InternNovaToast('✨ Thank you for subscribing to InternNova updates!');
};

// Mobile Nav Drawer Toggle
function setupMobileDrawer() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawer = document.querySelector('.mobile-drawer');

  if (toggleBtn && drawerOverlay) {
    toggleBtn.addEventListener('click', () => {
      drawerOverlay.style.display = 'block';
    });

    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay || e.target.closest('.mobile-close-btn')) {
        drawerOverlay.style.display = 'none';
      }
    });
  }
}

// Category filter for Internship Programs
function setupProgramFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const programCards = document.querySelectorAll('.program-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');

      programCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      if (window.InternNovaSound) window.InternNovaSound.playClick();
    });
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setupGreeting();
  setupTheme();
  setupDropdowns();
  setup3DTilt();
  setupStatsCounter();
  setupFAQ();
  setupModals();
  setupMobileDrawer();
  setupProgramFilters();

  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      window.InternNovaSound.toggle();
    });
  }

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
