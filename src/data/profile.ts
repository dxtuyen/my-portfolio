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
  tagline: 'Sinh viên ngành Mạng máy tính và Truyền thông dữ liệu ( Computer Networking & Data Communication )',
  tagline2: 'Đam mê dẫn lối. Bền bỉ thực thi.',
  avatar: '/images/avatar.png',
  cover: '/images/cover.jpg',
  about:
    'Tôi là sinh viên ngành Mạng máy tính và Truyền thông dữ liệu tại Đại học Công nghệ (VNU-UET). Nơi mà người ta thường nói về code và robot, và tôi cũng không ngoại lệ, nhưng có lẽ pha vào đó một chút lãng mạn hơn.😄✨',
  about2:
    'Ngoài việc học tập khoa học công nghệ, tôi dành thời gian tối ưu hóa không gian quản lý kiến thức cá nhân và trau dồi kỹ năng mềm để hoàn thiện bản thân mỗi ngày. Tôi thích tư duy logic kết hợp với thực tế, theo đuổi chủ nghĩa tối giản. Luôn tò mò và bị hấp dẫn bởi sự giao thoa giữa công nghệ và và các lĩnh vực khoa học tự nhiên.',
  philosophy:
    'Tôi muốn ngày càng học cách nhìn nhận sự tất yếu của vạn vật như một cái đẹp; rồi tôi sẽ trở thành một trong những người làm cho vạn vật trở nên đẹp đẽ. Amor fati: từ nay trở đi, mong sao điều đó sẽ là tình yêu của tôi! — Friedrich Nietzsche',
  currentWork:
    'Tập trung vào các môn khoa học cơ bản và lập trình tại trường, đồng thời xây dựng các dự án cá nhân và nhóm.',
  dream:
    'Trở thành một chuyên gia trong lĩnh vực Điện toán Đám mây (Cloud Computing), dùng công nghệ để giải quyết các vấn đề xã hội và nâng cao đời sống con người.',
  futurePlan:
    'Trong tương lai có thể học thêm một số chứng chỉ cần thiết phục vụ công việc sau này.',
  email: 'tuyendoxuan05@gmail.com',
  github: 'https://github.com/dxtuyen',
  linkedin: 'https://www.linkedin.com/in/tuyen-xuan-do-514995383',
  schoolUrl: 'https://uet.vnu.edu.vn',
  schoolName: 'VNU-UET',
};
