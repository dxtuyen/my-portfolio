// menu.ts — Toàn bộ logic menu mobile và navbar scroll.
// Gộp từ inline script cũ trong Navbar.astro + logic cũ tại đây
// để tránh hai nơi cùng thao tác trên một DOM node (xung đột).

function initNavbarScroll(): void {
  const nav = document.querySelector<HTMLElement>('[data-navbar]');
  if (!nav) return;

  const updateScroll = () => {
    if (window.scrollY > 50) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };

  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });
}

function initMobileMenu(): void {
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const hamburgerBtn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  if (!menu || !hamburgerBtn) return;

  // Guard: tránh gắn listener nhiều lần khi Astro swap trang
  if (hamburgerBtn.dataset.init === 'true') return;
  hamburgerBtn.dataset.init = 'true';

  const setOpen = (open: boolean) => {
    menu.classList.toggle('is-open', open);
    hamburgerBtn.setAttribute('aria-expanded', String(open));
    hamburgerBtn.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    document.body.classList.toggle('is-locked', open);
  };

  // 1. Click nút hamburger
  hamburgerBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    setOpen(!menu.classList.contains('is-open'));
  });

  // 2. Click ra ngoài để đóng (desktop thì bỏ qua)
  document.addEventListener('click', (event) => {
    if (window.innerWidth >= 768) return;
    if (!menu.classList.contains('is-open')) return;
    if (!menu.contains(event.target as Node) && !hamburgerBtn.contains(event.target as Node)) {
      setOpen(false);
    }
  });

  // 3. Phím ESC để đóng
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
    }
  });

  // 4. Click link trong menu → đóng menu
  menu.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement).closest('a');
    if (link) setOpen(false);
  });

  // 5. Vuốt chạm: vuốt phải từ mép → mở; vuốt trái khi đang mở → đóng
  let touchStartX = 0;
  const minSwipeThreshold = 60;

  document.addEventListener(
    'touchstart',
    (e) => {
      if (window.innerWidth >= 768) return;
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  document.addEventListener(
    'touchend',
    (e) => {
      if (window.innerWidth >= 768) return;
      const swipeDistance = e.changedTouches[0].screenX - touchStartX;
      const isOpen = menu.classList.contains('is-open');

      if (isOpen && swipeDistance > minSwipeThreshold) {
        setOpen(false);
      } else if (!isOpen && swipeDistance < -minSwipeThreshold && touchStartX > window.innerWidth * 0.8) {
        setOpen(true);
      }
    },
    { passive: true }
  );
}

document.addEventListener('astro:page-load', () => {
  initNavbarScroll();
  initMobileMenu();
});