// menu.ts
document.addEventListener('astro:page-load', () => {
  const nav = document.querySelector<HTMLElement>('[data-navbar]');
  if (!nav) return;

  const updateScroll = () => {
    if (window.scrollY > 50) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  
  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });
});

// Quản lý click đóng/mở menu bằng Event Delegation (không bao giờ bị liệt)
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const toggle = target.closest<HTMLButtonElement>('[data-menu-toggle]');
  const link = target.closest<HTMLAnchorElement>('[data-menu] a');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const mainToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  
  if (toggle && menu) {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '✕' : '☰';
    document.body.classList.toggle('is-locked', isOpen);
  } else if (link && menu && mainToggle) {
    menu.classList.remove('is-open');
    mainToggle.setAttribute('aria-expanded', 'false');
    mainToggle.textContent = '☰';
    document.body.classList.remove('is-locked');
  }
});
