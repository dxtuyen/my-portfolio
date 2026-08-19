/**
 * Personal profile data.
 * Đây là "single source of truth" về thông tin cá nhân — mọi component
 * (Hero, About, Contact, Footer…) đều import từ đây.
 * Đổi tên / email / bio — chỉ sửa file này.
 */

export interface Profile {
  /** Full display name */
  name: string;
  /** Short name (used in nav logo) */
  shortName: string;
  /** Headline (chuyên ngành / công việc) */
  tagline: string;
  /** Catchphrase / motto */
  tagline2: string;
  /** Path tới ảnh đại diện trong /public/images/ */
  avatar: string;
  /** Path tới ảnh bìa */
  cover: string;
  /** Đoạn về tôi 1 */
  about: string;
  /** Đoạn về tôi 2 */
  about2: string;
  /** Quote triết lý */
  philosophy: string;
  /** Mô tả công việc hiện tại */
  currentWork: string;
  /** Ước mơ / sứ mệnh */
  dream: string;
  /** Kế hoạch tương lai */
  futurePlan: string;
  /** Email liên hệ */
  email: string;
  /** Link GitHub */
  github: string;
  /** Link LinkedIn */
  linkedin: string;
  /** URL trường đại học (hiển thị link trong Hero) */
  schoolUrl: string;
  /** Tên trường ngắn */
  schoolName: string;
}

export const profile: Profile = {
  name: 'Đỗ Xuân Tuyên',
  shortName: 'Tuyên',
  tagline: 'Sinh viên ngành Mạng máy tính và Truyền thông dữ liệu (Computer Networking & Data Communication)',
  tagline2: 'Đam mê dẫn lối. Bền bỉ thực thi.',
  avatar: '/images/avatar.png',
  cover: '/images/cover.jpg',
  about:
    'Tôi là sinh viên ngành Mạng máy tính và Truyền thông dữ liệu tại Đại học Công nghệ (VNU-UET). Nơi mọi người nói về code và robot — tôi cũng vậy, chỉ là có thêm chút lãng mạn.',
  about2:
    'Ngoài học tập, tôi dành thời gian tổ chức hệ thống kiến thức cá nhân và rèn kỹ năng mềm để hoàn thiện bản thân mỗi ngày. Tôi yêu thích sự tối giản, tư duy logic gắn với thực tế, và luôn tò mò về sự giao thoa giữa công nghệ với khoa học tự nhiên.',
  philosophy: 'Amor fati — hãy yêu lấy định mệnh của mình. — Friedrich Nietzsche',
  currentWork:
    'Tập trung vào các môn khoa học cơ bản và lập trình tại trường, đồng thời xây dựng các dự án cá nhân và nhóm.',
  dream:
    'Trở thành một chuyên gia trong lĩnh vực An ninh mạng (Cybersecurity) và Điện toán đám mây (Cloud Computing), dùng công nghệ để giải quyết các vấn đề xã hội và nâng cao đời sống con người.',
  futurePlan:
    'Trong tương lai có thể học thêm một số chứng chỉ cần thiết phục vụ công việc sau này.',
  email: 'tuyendoxuan05@gmail.com',
  github: 'https://github.com/dxtuyen',
  linkedin: 'https://www.linkedin.com/in/tuyen-xuan-do-514995383',
  schoolUrl: 'https://uet.vnu.edu.vn',
  schoolName: 'VNU-UET',
};
