// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Astro configuration.
 * Đổi `site` thành domain thật của bạn sau khi mua tên miền hoặc deploy chính thức.
 * Vercel sẽ dùng giá trị này để sinh sitemap.xml và RSS feed.
 */
export default defineConfig({
  // Domain công khai của site (dùng cho sitemap, RSS, og:image absolute URLs).
  // Đang deploy trên Vercel; đổi sang tên miền riêng sau khi gắn domain.
  site: 'https://my-portfolio-opal-two-46.vercel.app',

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
