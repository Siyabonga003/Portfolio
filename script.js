/* ==========================================================
   script.js — Siyabonga Phiri Portfolio
   ========================================================== */

// ─── 1. ANIMATED PARTICLE NETWORK BACKGROUND ──────────────

(function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');

  const PARTICLE_COUNT  = 80;
  const CONNECTION_DIST = 140;
  const SPEED_RANGE     = 0.35;

  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkParticle() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED_RANGE,
      vy: (Math.random() - 0.5) * SPEED_RANGE,
      r:  Math.random() * 1.5 + 0.5,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, mkParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(30,144,255,${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }

    // Draw dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30,144,255,0.55)';
      ctx.fill();
    });
  }

  function update() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => {
      if (p.x > W) p.x = W;
      if (p.y > H) p.y = H;
    });
  });

  init();
  loop();
})();


// ─── 2. CUSTOM CURSOR ─────────────────────────────────────

(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animate() {
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animate);
  }
  animate();

  document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(1.8)';
      ring.style.opacity = '1';
      ring.style.borderColor = 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.opacity = '0.5';
    });
  });
})();


// ─── 3. TYPED ROLE ANIMATION ──────────────────────────────

(function initTyped() {
  const roles = [
    'Software Engineer',
    'Full-Stack Developer',
    'ML Engineer',
    'DevOps Enthusiast',
    'Open Source Builder',
  ];

  let ri = 0, ci = 0, deleting = false;
  const el = document.getElementById('typed-role');

  function typeLoop() {
    const current = roles[ri];
    if (!deleting) {
      el.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 85);
  }

  typeLoop();
})();


// ─── 4. SCROLL REVEAL ─────────────────────────────────────

(function initReveal() {
  const reveals  = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
})();