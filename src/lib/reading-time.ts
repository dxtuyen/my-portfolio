/**
 * Estimate reading time from raw text.
 * Tốc độ đọc trung bình tiếng Việt: ~200 từ/phút.
 *
 * Dùng khi frontmatter `readTime` không được khai báo —
 * component sẽ tự tính từ body của bài.
 */

const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(text: string): string {
  // Đếm "từ" thô bằng cách split theo whitespace
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return `${minutes} phút đọc`;
}
