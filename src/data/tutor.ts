import { profile } from './profile';

/**
 * Tutor page data.
 *
 * Cách sửa nhanh:
 * - Đổi chữ trực tiếp trong file này.
 * - Ảnh minh chứng nên đặt trong `public/images/tutor/`, rồi điền path
 *   dạng `/images/tutor/ten-file.jpg`.
 * - Với ảnh có thông tin cá nhân, cân nhắc trước khi đưa lên website công khai.
 */

export interface TutorStat {
  value: string;
  label: string;
  items?: {
    value: string;
    label: string;
  }[];
}

export interface TutorCard {
  title: string;
  description: string;
}

export interface TutorResult {
  student: string;
  context: string;
  result: string;
}

export interface TutorFeedback {
  parent: string;
  student: string;
  quote: string;
  image?: string;
}

export interface TutorEvidence {
  title: string;
  type: string;
  description: string;
  image?: string;
  fileUrl?: string;
}

export interface TutorFaq {
  question: string;
  answer: string;
}

export interface TutorData {
  title: string;
  subtitle: string;
  intro: string;
  portrait: string;
  contactNote: string;
  contactLinks: {
    label: string;
    href: string;
    primary?: boolean;
  }[];
  stats: TutorStat[];
  experience: TutorCard[];
  teachingStyle: TutorCard[];
  subjects: TutorCard[];
  strengths: TutorCard[];
  achievements: TutorEvidence[];
  method: TutorCard[];
  studentResults: TutorResult[];
  parentFeedback: TutorFeedback[];
  gallery: TutorEvidence[];
  process: TutorCard[];
  faq: TutorFaq[];
}

export const tutorData: TutorData = {
  title: 'Gia sư Toán, Vật lí & Tin học',
  subtitle: 'Gia sư đồng hành: Thấu hiểu tâm lý học sinh, truyền tải kiến thức dễ hiểu và tạo động lực học tập.',
  intro:
    'Tôi là Đỗ Xuân Tuyên, sinh viên Đại học Công nghệ (VNU-UET) và từng theo học Khoa Toán tại Đại học Khoa học Tự nhiên (VNU-HUS). Tự mình trải qua 2 kỳ thi THPT Quốc gia (2023 và 2025) để định hướng lại đam mê, Tuyên thấu hiểu sâu sắc áp lực phòng thi, những sai lầm dễ mắc phải và tâm lý hoang mang của học sinh khi ôn tập. Chính kinh nghiệm thực chiến này giúp Tuyên biết cách đồng hành cùng các em không chỉ về mặt kiến thức cốt lõi, mà còn ở phương pháp học tối ưu và tâm lý vững vàng để bứt phá điểm số.',
  portrait: profile.avatar,
  contactNote:
    'Zalo: 0396505336 · Email: tuyen.doxuan.tech@gmail.com',
  contactLinks: [
    {
      label: 'Nhắn Zalo',
      href: 'https://zalo.me/0396505336',
      primary: true,
    },
    {
      label: 'Gửi email',
      href: `mailto:${profile.email}`,
    },
  ],
  stats: [
    {
      value: 'HSG Cấp Tỉnh',
      label: 'Thành tích nổi bật',
      items: [
        { value: 'Giải Nhất', label: 'môn Vật lí lớp 12' },
        { value: 'Giải Ba', label: 'môn Toán lớp 11' },
      ],
    },
    {
      value: 'THPT 2023',
      label: 'Điểm thi tốt nghiệp',
      items: [
        { value: '9.4', label: 'môn Toán' },
        { value: '9.75', label: 'môn Vật lí' },
      ],
    },
    {
      value: 'THPT 2025',
      label: 'Kết quả nổi bật',
      items: [
        { value: '10.00', label: 'môn Toán' },
        { value: '10.00', label: 'môn Vật lí' },
      ],
    },
  ],
  experience: [
    {
      title: '3 năm kinh nghiệm',
      description:
        'Gia sư Toán - Vật lí cho học sinh THPT, THCS và ôn thi vào lớp 10, từ củng cố nền tảng đến luyện đề.',
    },
    {
      title: 'Chuyên ôn thi đại học',
      description:
        'Tập trung hệ thống chuyên đề, nhận diện dạng bài và sửa lỗi trình bày.',
    },
    {
      title: 'Kết quả học sinh',
      description:
        '<ul style="list-style-type: disc; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.25rem;"><li>Trúng tuyển các đại học top như Đại học Bách khoa Hà Nội.</li><li>Đỗ vào các trường cấp 3 công lập top.</li><li>Từ mất gốc đến tự tin môn học.</li><li>Học sinh lười học tìm ra mục đích việc học và ham học.</li></ul>',
    },
  ],
  teachingStyle: [
    {
      title: 'Dạy kiến thức',
      description:
        'Truyền đạt kiến thức sát với chương trình, tập trung vào hiểu rõ bản chất cốt lõi thay vì học vẹt.',
    },
    {
      title: 'Dạy cách học hiệu quả',
      description:
        'Hiểu rõ cơ chế hoạt động của não bộ để giúp học sinh tìm ra phương pháp học thông minh, tiếp thu nhanh và ghi nhớ dài hạn.',
    },
    {
      title: 'Truyền đam mê',
      description:
        'Khơi gợi sự hứng thú, giảm áp lực điểm số, giúp học sinh yêu thích và chủ động hơn với môn học.',
    },
  ],
  subjects: [
    {
      title: 'Toán THCS / THPT',
      description:
        'Xây lại nền tảng, luyện tư duy biến đổi, trình bày lời giải và ôn theo chuyên đề cho kiểm tra hoặc kỳ thi.',
    },
    {
      title: 'Vật lí THPT',
      description:
        'Tập trung hiểu hiện tượng, công thức cốt lõi và cách chọn hướng giải thay vì học thuộc rời rạc.',
    },
    {
      title: 'Tin học / lập trình cơ bản',
      description:
        'Làm quen tư duy thuật toán, đọc đề, chia nhỏ bài toán và tự kiểm tra lỗi qua từng bài tập.',
    },
    {
      title: 'Ôn thi ĐGNL & ĐGTD',
      description:
        'Luyện tập tư duy phân tích, giải quyết vấn đề cho phần Khoa học Tự nhiên trong các kỳ thi Đánh giá năng lực và Đánh giá tư duy.',
    },
  ],
  strengths: [
    {
      title: 'Dạy chậm để hiểu sâu',
      description:
        'Không chạy theo số lượng bài. Mỗi buổi ưu tiên học sinh hiểu bản chất, biết vì sao làm như vậy.',
    },
    {
      title: 'Có đo tiến bộ',
      description:
        'Sau từng giai đoạn có bài kiểm tra ngắn, nhận xét điểm mạnh, điểm yếu và hướng luyện tiếp.',
    },
    {
      title: 'Trao đổi minh bạch',
      description:
        'Phụ huynh nắm được học sinh đang học gì, tiến bộ ở đâu và cần phối hợp điều gì.',
    },
  ],
  achievements: [
    {
      title: 'Giải Nhất HSG Vật lí cấp tỉnh lớp 12',
      type: 'Thành tích',
      description:
        'Chứng nhận của Sở Giáo dục và Đào tạo Thái Bình, năm học 2022 - 2023.',
      image: '/images/tutor/hsgly.png',
    },
    {
      title: 'Giải Ba HSG Toán cấp tỉnh lớp 11',
      type: 'Thành tích',
      description:
        'Chứng nhận của Sở Giáo dục và Đào tạo Thái Bình, năm học 2021 - 2022.',
      image: '/images/tutor/hsgtoan.png',
    },
    {
      title: 'Điểm thi tốt nghiệp THPT 2023',
      type: 'Hồ sơ học tập',
      description:
        'Toán 9.4, Vật lí 9.75, Hóa học 8.0, Tiếng Anh 8.8.',
      image: '/images/tutor/tnpt2023.png',
    },
    {
      title: 'Kết quả THPT 2025 nổi bật',
      type: 'Minh chứng điểm thi',
      description:
        'Điểm nổi bật: Toán 10.00, Vật lí 10.00, Ngữ văn 7.25 và Tiếng Anh 7.00.',
      image: '/images/tutor/diem-thpt-2025.png',
    },
  ],
  method: [
    {
      title: 'Tìm ra lỗ hổng',
      description:
        'Kiểm tra nhẹ nhàng để biết học sinh đang vướng mắc ở đâu trước khi bắt đầu.',
    },
    {
      title: 'Hiểu bản chất trước, luyện đề sau',
      description:
        'Đi từ bản chất lý thuyết đến bài tập, đảm bảo hiểu sâu chứ không nhảy cóc.',
    },
    {
      title: 'Sửa lỗi và rút kinh nghiệm',
      description:
        'Cùng xem lại các bài làm chưa đúng để hiểu lý do sai, đảm bảo không vấp lại lỗi tương tự.',
    },
  ],
  studentResults: [],
  parentFeedback: [],
  gallery: [],
  process: [
    {
      title: 'Nhắn tin trao đổi',
      description:
        'Phụ huynh chia sẻ ngắn gọn về tình hình học tập và mong muốn qua Zalo.',
    },
    {
      title: 'Sắp xếp học thử',
      description:
        'Một buổi học nhẹ nhàng để xem phong cách dạy có thực sự phù hợp hay không.',
    },
    {
      title: 'Bắt đầu đồng hành',
      description:
        'Thống nhất lịch học và cùng nhau hướng tới sự tiến bộ của học sinh.',
    },
  ],
  faq: [
    {
      question: 'Có dạy online không?',
      answer:
        'Có. Học online phù hợp với học sinh cần lịch linh hoạt; buổi học vẫn có lộ trình, bài tập và phần nhận xét sau buổi.',
    },
    {
      question: 'Có nhận học sinh mất gốc không?',
      answer:
        'Có, miễn là học sinh và phụ huynh thống nhất học theo lộ trình đủ đều để xây lại nền tảng.',
    },
    {
      question: 'Học phí như thế nào?',
      answer:
        'Học phí trao đổi theo lớp học, mục tiêu, hình thức học và số buổi mỗi tuần.',
    },
  ],
};
