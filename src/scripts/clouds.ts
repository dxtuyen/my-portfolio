let cloudsInitialized = false;

/**
 * Canvas mây trôi cho LIGHT theme — đối cực của starfield (dark).
 * Bầu trời xanh–trắng (do CSS .space-nebula vẽ), mây trắng mềm trôi nhẹ
 * phía trên cho cảm giác chill, thư thái.
 */
function initClouds(): void {
  if (cloudsInitialized) return;
  // Tôn trọng người dùng tắt chuyển động — để nguyên bầu trời tĩnh (CSS gradient).
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('cloud-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  cloudsInitialized = true;
  const ctx = canvas.getContext('2d')!;

  let W = 0, H = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* ─── Tạo "sprite" mây mềm (vẽ sẵn 1 lần để chạy mượt) ─── */
  function makeCloudSprite(w: number, h: number): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = Math.ceil(w);
    c.height = Math.ceil(h);
    const g = c.getContext('2d')!;
    const blobs = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < blobs; i++) {
      const bx = w * (0.18 + Math.random() * 0.64);
      const by = h * (0.48 + Math.random() * 0.22);
      const br = h * (0.26 + Math.random() * 0.22);
      const rg = g.createRadialGradient(bx, by, 0, bx, by, br);
      rg.addColorStop(0, 'rgba(255, 255, 255, 0.96)');
      rg.addColorStop(0.45, 'rgba(255, 255, 255, 0.6)');
      rg.addColorStop(1, 'rgba(255, 255, 255, 0)');
      g.fillStyle = rg;
      g.beginPath();
      g.arc(bx, by, br, 0, Math.PI * 2);
      g.fill();
    }
    return c;
  }

  /* ─── Đám mây ─── */
  type Cloud = {
    sprite: HTMLCanvasElement;
    x: number; y: number;
    w: number; h: number;
    spd: number;   // px/giây, trôi sang phải
    alpha: number;
    bob: number;   // biên độ nhấp nhô dọc
    ph: number;    // pha nhấp nhô
  };

  let clouds: Cloud[] = [];
  const COUNT = 6;

  function seed() {
    clouds = [];
    for (let i = 0; i < COUNT; i++) {
      // 3 lớp: xa (nhỏ, chậm, mờ) → gần (to, nhanh hơn, rõ hơn)
      const roll = Math.random();
      const depth = roll < 0.45 ? 0 : roll < 0.78 ? 1 : 2;
      const w =
        depth === 0 ? 140 + Math.random() * 90
        : depth === 1 ? 220 + Math.random() * 140
        : 340 + Math.random() * 200;
      const h = w * (0.42 + Math.random() * 0.12);
      clouds.push({
        sprite: makeCloudSprite(w, h),
        x: Math.random() * (W + w) - w,
        y: Math.random() * H * 0.72,
        w, h,
        spd:
          depth === 0 ? 5 + Math.random() * 4
          : depth === 1 ? 9 + Math.random() * 6
          : 14 + Math.random() * 8,
        alpha:
          depth === 0 ? 0.4 + Math.random() * 0.18
          : depth === 1 ? 0.58 + Math.random() * 0.2
          : 0.78 + Math.random() * 0.18,
        bob: 10 + Math.random() * 14,
        ph: Math.random() * Math.PI * 2,
      });
    }
  }

  /* ─── Mặt trời: trắng dịu, ấm rất nhẹ (không vàng gắt), "thở" chậm ─── */
  function drawSun(t: number) {
    const cx = W * 0.16;   // góc TRÁI – trên
    const cy = H * 0.18;
    const breathe = 0.94 + 0.06 * Math.sin(t * 0.35);

    // Hào quang CỤC BỘ quanh mặt trời — nhẹ vàng, gói gọn quanh mặt trời,
    // KHÔNG phủ tông vàng ra cả trang (chỉ tô trong bán kính R).
    const R = Math.min(W, H) * 0.34 * breathe; // vừa phải, không tỏa quá rộng
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    glow.addColorStop(0, 'rgba(255, 250, 232, 0.6)');    // đậm ở giữa
    glow.addColorStop(0.22, 'rgba(255, 231, 168, 0.32)'); // vòng hoàng quang vàng ấm
    glow.addColorStop(0.5, 'rgba(255, 226, 160, 0.12)');
    glow.addColorStop(0.78, 'rgba(255, 224, 156, 0.035)'); // nhạt dần tự nhiên ra rìa
    glow.addColorStop(1, 'rgba(255, 224, 156, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    // Lõi mặt trời — trắng ấm
    const cr = 44 * breathe;
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
    core.addColorStop(0, 'rgba(255, 255, 253, 0.97)');
    core.addColorStop(0.5, 'rgba(255, 251, 240, 0.78)');
    core.addColorStop(1, 'rgba(255, 248, 230, 0)');
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ─── Vòng lặp ─── */
  let last = performance.now();

  function frame(ts: number) {
    const dt = Math.min((ts - last) / 1000, 0.05); // chặn nhảy lớn khi tab nền
    last = ts;
    const t = ts * 0.001;

    ctx.clearRect(0, 0, W, H);
    drawSun(t); // mặt trời phía sau, mây trôi qua phía trước
    for (const c of clouds) {
      c.x += c.spd * dt;
      if (c.x > W + c.w * 0.5) c.x = -c.w; // ra khỏi mép phải → vòng lại trái
      const y = c.y + Math.sin(t * 0.25 + c.ph) * c.bob;
      ctx.globalAlpha = c.alpha;
      ctx.drawImage(c.sprite, c.x, y, c.w, c.h);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', () => { resize(); seed(); });

  resize();
  seed();
  requestAnimationFrame(frame);
}

document.addEventListener('astro:page-load', initClouds);
