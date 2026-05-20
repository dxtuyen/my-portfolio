// reveal.ts
function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('.reveal');
  if (elements.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

// Gọi với độ trễ siêu nhỏ để Layout load xong
document.addEventListener('astro:page-load', () => {
  setTimeout(initReveal, 50);
});
document.addEventListener('astro:page-load', () => {
  // Ép hệ thống luôn mở khóa cuộn trang mỗi khi render xong DOM mới
  document.body.classList.remove('is-locked');
});
