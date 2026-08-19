// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Astro configuration.
 * `site` đọc từ biến môi trường `SITE_URL` (đặt trên Vercel/Netlify),
 * fallback về domain mặc định khi chạy local.
 *
 * Lưu ý: File config chạy ở môi trường Node → dùng `process.env`.
 */
export default defineConfig({
  site: process.env.SITE_URL || 'https://my-portfolio-opal-two-46.vercel.app',

  integrations: [
    // Cho phép viết file .mdx (markdown + JSX) khi cần component bên trong bài viết.
    mdx(),
    // Tự sinh sitemap.xml ở thời điểm build → giúp Google index nhanh hơn.
    sitemap(),
  ],

  // Tối ưu build: tách CSS thành file riêng, không inline để có thể cache lâu hơn.
  build: {
    inlineStylesheets: 'auto',
  },
});
