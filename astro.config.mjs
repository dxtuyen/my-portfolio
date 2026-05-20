// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Astro configuration.
 * Đổi `site` thành domain thật của bạn sau khi mua tên miền hoặc deploy chính thức.
 * Netlify sẽ dùng giá trị này để sinh sitemap.xml và RSS feed.
 */
export default defineConfig({
  // Domain công khai của site (dùng cho sitemap, RSS, og:image absolute URLs).
  // Hiện tại để placeholder; sau khi deploy, đổi sang URL Netlify hoặc tên miền riêng.
  site: 'https://example.netlify.app',

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
