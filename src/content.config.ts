/**
 * Content Collections schema.
 *
 * Astro Content Collections cho phép định nghĩa "kiểu dữ liệu" cho
 * tập hợp file markdown. Mỗi `defineCollection` mô tả một thư mục
 * trong `src/content/`, và `zod` validate frontmatter của mỗi file
 * khi build. Sai 1 trường là build fail → catch lỗi sớm trước khi
 * deploy.
 *
 * Khi thêm bài/ sách/ project mới: chỉ tạo file `.md` mới trong thư
 * mục tương ứng và đảm bảo frontmatter khớp schema dưới đây. KHÔNG
 * cần sửa code component nào cả — đây là cốt lõi của "data-driven".
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // <-- Imported the required loader

/* ─── Blog posts ─── */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // tóm tắt ngắn — hiển thị ở list & meta tag
    date: z.coerce.date(), // YYYY-MM-DD trong frontmatter → tự parse
    readTime: z.string().optional(), // VD: "5 phút đọc". Có thể auto-tính sau.
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false), // true → ẩn khỏi production
  }),
});

/* ─── Books ─── */
const books = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    rating: z.number().int().min(1).max(5),
    cover: z.string(), // emoji hoặc URL ảnh bìa
    category: z.enum([
      'tech',
      'philosophy',
      'psychology',
      'science',
      'fiction-world',
      'fiction-vietnam',
      'other',
    ]),
    order: z.number().optional(), // sắp xếp tuỳ ý trong category
  }),
});

/* ─── Projects ─── */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    status: z.enum(['Hoàn thành', 'Đang phát triển', 'Ý tưởng']),
    description: z.string(),
    tech: z.array(z.string()),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

/* ─── Lessons (small cards on homepage) ─── */
const lessons = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/lessons" }),
  schema: z.object({
    icon: z.string(), // unicode/emoji
    title: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { blog, books, projects, lessons };
