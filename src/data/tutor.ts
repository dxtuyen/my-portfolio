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
  subtitle: 'Học chắc bản chất, luyện bài có hệ thống và tiến bộ theo từng giai đoạn.',
  intro:
    'Tôi là Đỗ Xuân Tuyên, sinh viên VNU-UET. Nền tảng học thuật của tôi nằm ở các môn tự nhiên: giải Nhì HSG Toán cấp tỉnh lớp 12, điểm thi THPT 2023 Toán 9.4 và Vật lí 9.75. Khi dạy, tôi ưu tiên giúp học sinh hiểu bản chất, biết trình bày lời giải và sửa lỗi sai một cách có hệ thống.',
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
    { value: 'Giải Nhì', label: 'HSG Toán cấp tỉnh lớp 12' },
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
        'Gia sư Toán - Vật lí cho học sinh THPT, từ củng cố nền tảng đến luyện đề.',
    },
    {
      title: 'Chuyên ôn thi đại học',
      description:
        'Tập trung hệ thống chuyên đề, nhận diện dạng bài và sửa lỗi trình bày.',
    },
    {
      title: 'Kết quả học sinh',
      description:
        'Có học sinh trúng tuyển Đại học Bách khoa Hà Nội.',
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
        'Hướng dẫn phương pháp tự học, tư duy phân tích, cách nhận diện dạng bài và tối ưu trình bày.',
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
      title: 'Giải Nhì HSG Toán cấp tỉnh lớp 12',
      type: 'Thành tích',
      description:
        'Chứng nhận của Sở Giáo dục và Đào tạo Thái Bình, năm học 2022 - 2023.',
      image: '/images/tutor/hsg-toan-tinh-2023.png',
    },
    {
      title: 'Điểm thi tốt nghiệp THPT 2023',
      type: 'Hồ sơ học tập',
      description:
        'Toán 9.4, Vật lí 9.75, Hóa học 8.0, Tiếng Anh 8.8.',
      image: '/images/tutor/diem-thpt-2023.jpg',
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
      title: '1. Chẩn đoán nền tảng',
      description:
        'Xem bài cũ, trao đổi mục tiêu và làm bài ngắn để biết học sinh đang hổng ở đâu.',
    },
    {
      title: '2. Học theo chuyên đề',
      description:
        'Mỗi chuyên đề đi từ bản chất, ví dụ mẫu, dạng bài thường gặp đến lỗi sai cần tránh.',
    },
    {
      title: '3. Luyện tập có phản hồi',
      description:
        'Sau mỗi buổi có phần bài tập, nhận xét lỗi sai và việc cần ôn trước buổi tiếp theo.',
    },
  ],
  studentResults: [],
  parentFeedback: [],
  gallery: [],
  process: [
    {
      title: 'Trao đổi mục tiêu',
      description:
        'Phụ huynh gửi lớp học, môn cần học, tình trạng hiện tại và mục tiêu mong muốn qua Zalo hoặc email.',
    },
    {
      title: 'Học thử / đánh giá',
      description:
        'Một buổi ngắn để kiểm tra nền tảng, cách học và mức độ phù hợp giữa gia sư và học sinh.',
    },
    {
      title: 'Chốt lịch học',
      description:
        'Thống nhất lịch, hình thức học, học phí và cách báo cáo tiến độ.',
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
