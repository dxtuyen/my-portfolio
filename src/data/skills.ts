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
      'Mô hình hóa toán học',
      'Tư duy hệ thống & logic',
      'Giải quyết vấn đề thực tế',
    ],
  },
  {
    category: 'Ngôn ngữ & Công cụ',
    items: ['Python', 'Java', 'Git & GitHub', 'VS Code'],
  },
  {
    category: 'Sở thích',
    items: [
      'Đọc sách',
      'Tối ưu hoá năng suất (Productivity)',
      'Học hỏi tri thức mới',
    ],
  },
];
