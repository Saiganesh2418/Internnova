// 3D Cosmic Nebula & Starfield Engine (Image 3 reference)
// Embedded in the Newsletter & Stay Connected section

(function() {
  let canvas, ctx;
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000, active: false };

  function init() {
    canvas = document.getElementById('nebula-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize);

    // Initialize 160 cosmic particles
    createParticles();

    const section = document.querySelector('.nebula-section');
    if (section) {
      section.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      });

      section.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.x = -1000;
        mouse.y = -1000;
      });
    }

    animate();
  }

  function resize() {
    if (!canvas) return;
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }

  function createParticles() {
    particles = [];
    const count = 150;
    const colors = ['#c084fc', '#f472b6', '#38bdf8', '#ffffff', '#e879f9'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * (width || 800),
        y: Math.random() * (height || 400),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseVal: Math.random() * Math.PI
      });
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.pulseVal += p.pulseSpeed;

      // Wrap around bounds
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse interactive deflection / pull
      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }
      }

      const alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.pulseVal));

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Connect close particles with faint cosmic threads
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist2 < 70) {
          ctx.save();
          ctx.globalAlpha = (1 - dist2 / 70) * 0.15;
          ctx.strokeStyle = '#c084fc';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
