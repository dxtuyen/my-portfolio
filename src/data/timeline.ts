/**
 * Timeline — các cột mốc trong hành trình cá nhân.
 * Mỗi entry là một thời điểm có ý nghĩa (sinh ra, tốt nghiệp, vào ĐH…).
 * Thứ tự trong mảng = thứ tự hiển thị từ trên xuống.
 */

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: '2005',
    title: 'Sinh ra',
    description: 'Bắt đầu cuộc hành trình.',
  },
  {
    year: '2023',
    title: 'Tốt nghiệp THPT',
    description: 'Hoàn thành chương trình trung học phổ thông.',
  },
  {
    year: '2025',
    title: 'Vào VNU-UET',
    description: 'Bắt đầu hành trình tại Đại học Công nghệ — VNU.',
  },
];
