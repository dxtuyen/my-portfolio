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

// --- NGĂN ASTRO RESET MÀU KHI CHUYỂN TRANG ---
document.addEventListener('astro:after-swap', () => {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch {}
});
