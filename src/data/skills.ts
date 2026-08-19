/**
 * Skills grouped by category.
 * Mỗi `SkillGroup` là một cụm kỹ năng cùng chủ đề (ngôn ngữ, công cụ,
 * sở thích…). Hiển thị thành 1 cột riêng trong section "Năng lực".
 */

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Tư duy & Kỹ năng',
    items: [
      'Tư duy hệ thống & logic',
      'Lập trình cơ bản',
      'Sử dụng tiếng Anh ổn cho công việc và học thuật',
    ],
  },
  {
    category: 'Ngôn ngữ & Công cụ',
    items: ['Python', 'Java', 'JavaScript & TypeScript cơ bản', 'Git & GitHub', 'VS Code'],
  },
  {
    category: 'Sở thích',
    items: [
      'Đọc sách',
      'Tối ưu hoá năng suất (Productivity)',
      'Học hỏi tri thức mới',
      'Đi dạo ngắm hoàng hôn'
    ],
  },
];
