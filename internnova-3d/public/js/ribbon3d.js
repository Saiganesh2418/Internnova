// 3D Flowing Gradient Wave Ribbon Engine (Image 2 reference)
// "We turn complex ideas into effortless experiences"

(function() {
  let canvas, ctx;
  let width, height;
  let mouse = { x: 0, y: 0, hover: false };
  let time = 0;
  let sparks = [];

  function init() {
    canvas = document.getElementById('ribbon-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize);

    const section = document.querySelector('.ribbon-showcase-section');
    if (section) {
      section.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.hover = true;

        // Spawn interactive sparks on hover
        if (Math.random() > 0.4) {
          sparks.push({
            x: mouse.x,
            y: mouse.y + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2 - 1,
            size: Math.random() * 2.5 + 1,
            alpha: 1,
            color: Math.random() > 0.5 ? '#f472b6' : '#c084fc'
          });
        }
      });

      section.addEventListener('mouseleave', () => {
        mouse.hover = false;
      });
    }

    animate();
  }

  function resize() {
    if (!canvas) return;
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }

  function drawWave(frequency, amplitude, speed, offset, strokeStyle, lineWidth) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;

    const midY = height * 0.5;
    for (let x = 0; x <= width; x += 4) {
      // Dynamic mouse disturbance
      let mouseDist = 0;
      if (mouse.hover) {
        const dx = x - mouse.x;
        mouseDist = Math.exp(-(dx * dx) / (180 * 180)) * (mouse.y - midY) * 0.45;
      }

      const y = midY + 
        Math.sin(x * frequency + time * speed + offset) * amplitude +
        Math.cos(x * (frequency * 0.6) - time * (speed * 0.8)) * (amplitude * 0.3) +
        mouseDist;

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!ctx) return;

    time += 0.02;
    ctx.clearRect(0, 0, width, height);

    // Render multi-layered glowing ribbons matching Image 2
    // Layer 1: Soft Ambient Background Violet Wave
    const grad1 = ctx.createLinearGradient(0, 0, width, 0);
    grad1.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
    grad1.addColorStop(0.3, 'rgba(236, 72, 153, 0.4)');
    grad1.addColorStop(0.7, 'rgba(249, 115, 22, 0.4)');
    grad1.addColorStop(1, 'rgba(139, 92, 246, 0.15)');
    drawWave(0.003, 75, 1.2, 0, grad1, 14);

    // Layer 2: Main Sleek Ribbon (Purple to Magenta to Coral)
    const grad2 = ctx.createLinearGradient(0, 0, width, 0);
    grad2.addColorStop(0, 'rgba(99, 102, 241, 0.7)');
    grad2.addColorStop(0.35, 'rgba(217, 70, 239, 0.9)');
    grad2.addColorStop(0.75, 'rgba(251, 146, 60, 0.9)');
    grad2.addColorStop(1, 'rgba(168, 85, 247, 0.7)');
    drawWave(0.0035, 60, 1.4, 0.4, grad2, 4);

    // Layer 3: Sharp Highlighting White Neon Core Ribbon
    const grad3 = ctx.createLinearGradient(0, 0, width, 0);
    grad3.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    grad3.addColorStop(0.4, 'rgba(255, 255, 255, 0.95)');
    grad3.addColorStop(0.7, 'rgba(254, 215, 170, 0.8)');
    grad3.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
    drawWave(0.0035, 58, 1.4, 0.42, grad3, 1.8);

    // Layer 4: Secondary Subtle Counter-Wave
    const grad4 = ctx.createLinearGradient(0, 0, width, 0);
    grad4.addColorStop(0, 'rgba(147, 51, 234, 0.3)');
    grad4.addColorStop(0.5, 'rgba(244, 63, 94, 0.5)');
    grad4.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
    drawWave(0.0045, 45, -1.0, 1.2, grad4, 2.5);

    // Update and draw interactive sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= 0.02;

      if (s.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = s.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
