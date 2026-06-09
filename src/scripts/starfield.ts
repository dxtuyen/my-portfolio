let sfInitialized = false;

function initStarfield(): void {
  if (sfInitialized) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('starfield-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  sfInitialized = true;

  const ctx = canvas.getContext('2d')!;

  /* ─── Stars ─── */
  type Star = {
    x: number; y: number; r: number; a: number;
    spd: number; ph: number; layer: 0 | 1 | 2;
  };

  let W = 0, H = 0;
  let scrollY = 0;
  const SPREAD = 4;
  const COUNT = 280;
  let stars: Star[] = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function seed() {
    stars = [];
    for (let i = 0; i < COUNT; i++) {
      const roll = Math.random();
      const layer: Star['layer'] = roll < 0.55 ? 0 : roll < 0.82 ? 1 : 2;
      stars.push({
        x: Math.random(),
        y: Math.random() * H * SPREAD,
        r: layer === 0 ? Math.random() * 0.6 + 0.15
           : layer === 1 ? Math.random() * 0.9 + 0.45
           : Math.random() * 1.5 + 1.0,
        a: layer === 0 ? Math.random() * 0.40 + 0.18
           : layer === 1 ? Math.random() * 0.45 + 0.38
           : Math.random() * 0.30 + 0.65,
        spd: Math.random() * 0.65 + 0.18,
        ph: Math.random() * Math.PI * 2,
        layer,
      });
    }
  }

  const PAR: [number, number, number] = [0.02, 0.10, 0.26];

  function drawStars(t: number) {
    const totalH = H * SPREAD;
    for (const s of stars) {
      const rawY = s.y - scrollY * PAR[s.layer];
      const sy = ((rawY % totalH) + totalH) % totalH - H * 0.35;
      if (sy < -s.r * 6 || sy > H + s.r * 6) continue;

      const sx = s.x * W;
      const tw = 0.70 + 0.30 * Math.sin(t * s.spd + s.ph);
      const alpha = s.a * tw;

      if (s.layer === 2) {
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 5);
        g.addColorStop(0,    `rgba(220, 248, 255, ${alpha * 0.85})`);
        g.addColorStop(0.35, `rgba(150, 210, 255, ${alpha * 0.35})`);
        g.addColorStop(1,   'rgba(80, 150, 240, 0)');
        ctx.beginPath();
        ctx.arc(sx, sy, s.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
      ctx.fillStyle =
        s.layer === 0 ? `rgba(180, 210, 255, ${alpha})`
        : s.layer === 1 ? `rgba(210, 232, 255, ${alpha})`
        : `rgba(255, 252, 245, ${alpha})`;
      ctx.fill();
    }
  }

  /* ─── Shooting stars (meteors) ─── */
  type Meteor = {
    x0: number; y0: number; // spawn position (px)
    vx: number; vy: number; // velocity (px/s)
    len: number;            // trail length (px)
    maxAlpha: number;
    t0: number;             // spawn time (s)
    dur: number;            // lifetime (s)
  };

  let meteors: Meteor[] = [];
  let nextMeteorAt = 5 + Math.random() * 8;

  function spawnMeteor(t: number): void {
    // Bay từ vùng trên xuống, hướng chéo về phía dưới-trái hoặc dưới-phải
    const goRight = Math.random() > 0.5;
    const angle = goRight
      ? (Math.PI / 5 + (Math.random() - 0.5) * Math.PI / 8)  // ~36° ± 11°
      : (Math.PI * 3/5 + (Math.random() - 0.5) * Math.PI / 8);

    const speed = W * (0.45 + Math.random() * 0.3); // 45-75% viewport width / giây
    meteors.push({
      x0: Math.random() * W * 0.8 + W * 0.1,
      y0: Math.random() * H * 0.4,
      vx: Math.cos(angle) * speed * (goRight ? 1 : -1),
      vy: Math.sin(angle) * speed,
      len: 90 + Math.random() * 110,
      maxAlpha: 0.22 + Math.random() * 0.22,
      t0: t,
      dur: 0.7 + Math.random() * 0.7,
    });
    nextMeteorAt = t + 7 + Math.random() * 11;
  }

  function drawMeteors(t: number): void {
    if (t >= nextMeteorAt) spawnMeteor(t);

    meteors = meteors.filter(m => (t - m.t0) < m.dur);

    for (const m of meteors) {
      const elapsed = t - m.t0;
      const progress = elapsed / m.dur;
      const fade = Math.sin(progress * Math.PI); // 0 → 1 → 0
      const alpha = m.maxAlpha * fade;

      const hx = m.x0 + m.vx * elapsed;
      const hy = m.y0 + m.vy * elapsed;

      const dist = Math.hypot(m.vx, m.vy);
      const nx = m.vx / dist;
      const ny = m.vy / dist;
      const tx = hx - nx * m.len * fade; // đuôi co lại khi mờ
      const ty = hy - ny * m.len * fade;

      const grad = ctx.createLinearGradient(hx, hy, tx, ty);
      grad.addColorStop(0,    `rgba(255, 255, 245, ${alpha})`);
      grad.addColorStop(0.12, `rgba(210, 238, 255, ${alpha * 0.75})`);
      grad.addColorStop(0.45, `rgba(160, 210, 255, ${alpha * 0.30})`);
      grad.addColorStop(1,    'rgba(100, 170, 255, 0)');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(hx, hy);
      ctx.lineTo(tx, ty);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();

      // Đầu sao sáng hơn
      const headGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, 3);
      headGrad.addColorStop(0, `rgba(255, 252, 240, ${alpha})`);
      headGrad.addColorStop(1, 'rgba(200, 230, 255, 0)');
      ctx.beginPath();
      ctx.arc(hx, hy, 3, 0, Math.PI * 2);
      ctx.fillStyle = headGrad;
      ctx.fill();
    }
  }

  /* ─── Render loop ─── */
  function frame(ts: number) {
    const t = ts * 0.001;
    ctx.clearRect(0, 0, W, H);
    drawStars(t);
    drawMeteors(t);
    requestAnimationFrame(frame);
  }

  /* ─── Theme sync ─── */
  function syncVisibility() {
    canvas.style.opacity = document.documentElement.getAttribute('data-theme') !== 'light' ? '1' : '0';
  }
  new MutationObserver(syncVisibility).observe(
    document.documentElement,
    { attributes: true, attributeFilter: ['data-theme'] }
  );
  syncVisibility();

  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
  window.addEventListener('resize', () => { resize(); seed(); });

  resize();
  seed();
  requestAnimationFrame(frame);
}

document.addEventListener('astro:page-load', initStarfield);
