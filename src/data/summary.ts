/**
 * Dữ liệu trang "Tổng kết" (Retrospective Page).
 * Bạn nói trang này sẽ xoá sau — dữ liệu được tách hẳn ra đây để
 * khi cần xoá chỉ cần: (1) xoá file này, (2) xoá `src/pages/summary.astro`,
 * (3) xoá entry `Tổng kết` trong `data/navigation.ts`. Không động vào
 * bất kỳ component nào khác.
 */

export interface SummaryItem {
  title: string;
  description: string;
}

export interface SummaryData {
  learned: SummaryItem[];
  challenges: SummaryItem[];
  takeaway: string;
}

export const summaryData: SummaryData = {
  learned: [
    {
      title: 'Triển khai & Công cụ',
      description:
        'Học được cách tự triển khai hoàn chỉnh một trang web và làm chủ các công cụ lập trình cần thiết.',
    },
    {
      title: 'Thương hiệu cá nhân',
      description:
        'Biết cách tổ chức, sắp xếp thông tin bài viết và dự án để xây dựng hình ảnh chuyên nghiệp trên không gian số.',
    },
    {
      title: 'Tối ưu hóa cùng AI',
      description:
        'Biết cách phối hợp và sử dụng các công cụ AI một cách hiệu quả để hỗ trợ giải quyết các bài toán kỹ thuật.',
    },
  ],
  challenges: [
    {
      title: 'Khối lượng công việc',
      description:
        'Quá trình xây dựng một portfolio cá nhân có rất nhiều công đoạn, đòi hỏi nhiều kỹ thuật đan xen và tiêu tốn khá nhiều thời gian thực hiện. Và khối lượng môn học lớn khiến tôi nhiều lúc burnout.',
    },
    {
      title: 'Áp lực ý tưởng',
      description:
        'Gặp phải những thời điểm bị bí ý tưởng trong việc sắp xếp bố cục giao diện cũng như cô đọng nội dung hiển thị.',
    },
  ],
  takeaway:
    'Dù việc tự tay xây dựng mọi công đoạn tốn nhiều thời gian và công sức, nhưng việc kiên trì giải quyết từng lỗi giao diện, cấu trúc dữ liệu đã giúp tôi hiểu sâu sắc hơn về quy trình phát triển sản phẩm thực tế.',
};
