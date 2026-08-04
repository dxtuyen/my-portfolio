type Theme = 'dark' | 'light';
const STORAGE_KEY = 'theme';

class ThemeToggle extends HTMLElement {
  connectedCallback() {
    this.btn = this.querySelector('button');
    if (!this.btn) return;

    this.updateToggleButton(this.currentTheme());
    
    // Gắn sự kiện an toàn tuyệt đối
    this.btn.addEventListener('click', () => {
      const next: Theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
      this.applyTheme(next);
    });

    window.addEventListener('system-theme-changed', (e: any) => {
      this.updateToggleButton(e.detail);
    });
  }

  currentTheme(): Theme {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
    this.updateToggleButton(theme);
  }

  updateToggleButton(theme: Theme): void {
    this.btn.textContent = theme === 'dark' ? '☀' : '☾';
    this.btn.setAttribute('aria-label', theme === 'dark' ? 'Chuyển sáng' : 'Chuyển tối');
  }
}

customElements.define('theme-toggle', ThemeToggle);

// Áp dụng theme lên document MỚI trước khi Astro swap (không có flash)
document.addEventListener('astro:before-swap', (ev) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let theme: Theme = 'dark';
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else {
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    (ev as any).newDocument.documentElement.setAttribute('data-theme', theme);
  } catch {}
});

// Backup: đồng bộ lại sau swap phòng trường hợp before-swap không đủ
document.addEventListener('astro:after-swap', () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let theme: Theme = 'dark';
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else {
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch {}
});

// Lắng nghe thay đổi theme từ hệ thống (nếu người dùng chưa chọn thủ công)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const theme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    window.dispatchEvent(new CustomEvent('system-theme-changed', { detail: theme }));
  }
});
