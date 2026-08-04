/**
 * Site navigation items.
 * Mỗi `NavItem` gồm `href` (URL) và `label` (text hiển thị).
 * Số thứ tự "01., 02., ..." được Navbar render tự động — không cần
 * hardcode vào label.
 *
 * Để thêm mục mới: thêm 1 object vào mảng. Đảm bảo có file
 * `src/pages/<route>.astro` tương ứng để URL hoạt động.
 */

export interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: '/', label: 'Trang chủ' },
  { href: '/blog', label: 'Blog' },
  { href: '/books', label: 'Tủ sách' },
  { href: '/projects', label: 'Dự án' },
  { href: '/tutor', label: 'Gia sư' },
  { href: '/cv', label: 'CV' },
];
