import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

import avatarImg from "./IMG_20250407_114618.jpg";
import coverImg from "./IMG_20260312_165016.jpg";
// 1. Import file nhạc giống như import ảnh
import bgMusic from "./yiruma.mp3"; 

// 2. Gán trực tiếp biến bgMusic vào (KHÔNG dùng dấu ngoặc kép "")
const MUSIC_URL = bgMusic;
const PROFILE = {
  name: "Đỗ Xuân Tuyên", 
  shortName: "Tuyên",
  tagline: "Sinh viên ngành Mạng máy tính và Truyền thông dữ liệu",
  tagline2: "Đam mê dẫn lối. Bền bỉ thực thi.",
  avatar: avatarImg, 
  
 about: "Tôi là sinh viên ngành Mạng máy tính và Truyền thông dữ liệu tại Đại học Công nghệ (VNU-UET). Tôi có tính cách tò mò, luôn muốn tìm hiểu về mọi thứ chỉ vì niềm vui thuần túy của việc khám phá tri thức.",
  about2: "Ngoài việc học tập khoa học công nghệ, tôi dành thời gian tối ưu hóa không gian quản lý kiến thức cá nhân và trau dồi kỹ năng mềm. Tôi thích tư duy logic, tính kỷ luật và theo đuổi chủ nghĩa tối giản. Luôn tò mò và bị hấp dẫn bởi sự giao thoa giữa công nghệ và toán học",
  philosophy: "Mọi việc sẽ trở nên thích thú nhất khi ta thực hiện bằng sự chú tâm triệt để và tận hưởng giá trị tự thân của chính công việc đó.",
  
  currentWork: "Tập trung vào các môn khoa học cơ bản và lập trình tại trường, đồng thời xây dựng các dự án cá nhân.",
  dream: "Trở thành một chuyên gia trong lĩnh vực Điện toán Đám mây (Cloud Computing), dùng công nghệ để giải quyết các vấn đề xã hội và nâng cao đời sống con người.",
  futurePlan: "Vận dụng tư duy biện chứng vào cuộc sống và luôn trân trọng, gìn giữ sức khỏe thể chất lẫn tinh thần.",
  email: "tuyendoxuan05@gmail.com", 
  github: "https://github.com/dxtuyen", 
  linkedin: "https://www.linkedin.com/in/tuyen-xuan-do-514995383",
};

const DEFAULT_TIMELINE = [
  { year: "2005", title: "Sinh ra", desc: "Bắt đầu cuộc hành trình." },
  { year: "2023", title: "Tốt nghiệp THPT", desc: "Hoàn thành chương trình trung học phổ thông." },
  { year: "2025", title: "Vào VNU-UET", desc: "Bắt đầu hành trình tại Đại học Công nghệ — VNU." },
];

const DEFAULT_SKILLS = [
  { category: "Tư duy & Kỹ năng", items: ["Mô hình hóa toán học", "Tư duy hệ thống & logic", "Giải quyết vấn đề thực tế"] },
  { category: "Ngôn ngữ & Công cụ", items: ["Python", "Java", "Git & GitHub", "VS Code"] },
  { category: "Sở thích", items: ["Đọc sách triết học", "Tối ưu hoá năng suất (Productivity)", "Học hỏi tri thức mới"] },
];

const DEFAULT_LESSONS = [
  { icon: "▲", title: "Tư duy biện chứng", desc: "Nhìn nhận sự vật trong trạng thái vận động và mối liên hệ phổ biến để giải quyết vấn đề một cách toàn diện." },
  { icon: "◆", title: "Sự chú tâm triệt để", desc: "Mọi việc sẽ vui và đạt hiệu quả cao nhất khi ta làm nó bằng sự tập trung tuyệt đối và vì giá trị tự thân của nó." },
  { icon: "●", title: "Cân bằng & Tối giản", desc: "Chú trọng sức khỏe thể chất, tinh thần và duy trì một không gian làm việc, quản lý kiến thức tinh gọn." },
];

const DEFAULT_BLOGS = [
  { id: 1, title: "Quản lý cảm xúc qua lăng kính siêu nhận thức", desc: "Thay vì kìm nén, tôi chọn cách quan sát cảm xúc của mình như một hệ thống logic độc lập và gỡ rối chúng trên những trang giấy.", date: "18.05.2026", readTime: "4 phút đọc", content: "Hành trình quản lý cảm xúc của tôi không bắt đầu bằng việc cố gắng triệt tiêu những suy nghĩ tiêu cực, mà bằng việc tĩnh tâm quan sát chúng.\n\nGần đây, tôi đã quyết định rời xa bàn phím đôi chút để chuyển sang viết nhật ký trên giấy. Việc nắn nót từng nét chữ trên trang giấy trắng tạo ra một nhịp điệu chậm rãi, buộc tâm trí tôi phải hạ nhiệt. Đây chính là lúc tôi thực hành 'siêu nhận thức' (metacognition) — tư duy về chính tư duy của mình.\n\nKhi một cảm xúc mạnh trỗi dậy, thay vì phản ứng ngay lập tức hay bị cuốn theo nó, tôi đặt bút xuống và viết nó ra. Bằng góc nhìn biện chứng và triết lý Khắc kỷ (Stoicism), tôi bóc tách vấn đề: Đâu là thứ mình có thể kiểm soát? Đâu là biến số nằm ngoài tầm tay? Cảm xúc này bắt nguồn từ bản chất sự việc hay từ góc nhìn chủ quan của tôi?\n\nGiấy và bút trở thành công cụ để tôi 'debug' chính tâm trí mình. Bằng cách tách rời bản ngã khỏi cảm xúc nhất thời, tôi biến những mớ bòng bong trong lòng thành các chuỗi logic mạch lạc. Cảm xúc không còn là kẻ thù cần loại bỏ, mà trở thành một tín hiệu dữ liệu cần được phân tích và thấu hiểu." },
  { id: 2, title: "Ứng dụng AI: Trợ lý tư duy trong kỷ nguyên số", desc: "Cách tôi không để AI nghĩ thay mình, mà dùng nó để mở rộng không gian quản lý tri thức và đối thoại phản biện.", date: "10.05.2026", readTime: "5 phút đọc", content: "Sự bùng nổ của Trí tuệ Nhân tạo (AI) khiến nhiều người lo sợ về việc mất đi khả năng tư duy độc lập. Tuy nhiên, với phương pháp tiếp cận top-down, tôi nhìn nhận AI không phải là một cỗ máy đẻ ra đáp án, mà là một 'bộ vi xử lý phụ' đắc lực cho hệ thống quản lý kiến thức cá nhân (PKM) của mình.\n\nTôi hiếm khi dùng AI để viết hộ một đoạn mã hoàn chỉnh hay giải quyết trọn vẹn một bài toán khó. Thay vào đó, tôi đưa cho nó cấu trúc tổng thể và yêu cầu nó phản biện các lỗ hổng logic trong suy nghĩ của mình. Trong không gian của Obsidian, khi tôi kết nối các ghi chú rời rạc, tôi thường dùng AI để gợi ý những góc nhìn đối lập mà bản thân có thể đã bỏ qua.\n\nAI giúp tôi tra cứu các định lý toán học phức tạp, giải thích các khái niệm triết học trừu tượng một cách trực quan, và tự động hóa những khâu tìm kiếm thông tin lặp đi lặp lại. Nhờ đó, tôi có thể dành 100% sự chú tâm cho việc kiến giải bản chất vấn đề.\n\nSử dụng AI đúng cách cũng giống như việc bạn có một người cộng sự không biết mệt mỏi. Nó không thay thế tư duy, mà đóng vai trò như một bức tường để tôi đập những ý tưởng của mình vào, nghe âm thanh dội lại để gọt giũa chúng sắc bén hơn, thỏa mãn niềm vui thuần túy của việc thấu hiểu thế giới." },
  { id: 3, title: "Xây dựng hệ thống Digital Garden", desc: "Cách tôi sử dụng Markdown và liên kết hai chiều để quản lý hàng tá môn học và ý tưởng cá nhân.", date: "01.04.2026", readTime: "5 phút đọc", content: "Việc học không bao giờ là một đường thẳng. Nó là một mạng lưới chằng chịt của các khái niệm, định lý và sự liên tưởng. Đó là lý do tôi xây dựng Digital Garden (Khu vườn kỹ thuật số) của riêng mình.\n\nThay vì ghi chép theo cấu trúc thư mục truyền thống, cứng nhắc, tôi sử dụng các công cụ hỗ trợ liên kết hai chiều (bidirectional linking). Khi tôi học về một thuật toán mạng máy tính, tôi có thể dễ dàng liên kết nó với một khái niệm toán rời rạc mà tôi đã ghi chú từ tháng trước. Sự kết nối này giúp tôi nhìn thấy bức tranh tổng thể (big picture) rõ ràng hơn bao giờ hết.\n\nDigital Garden không chỉ là nơi lưu trữ, nó là 'bộ não thứ hai' (second brain). Nơi đây, các ý tưởng được gieo mầm, chăm sóc và tự do phát triển, giúp tôi duy trì tính kỷ luật trong học tập nhưng vẫn giữ được sự phóng khoáng trong tư duy." }
];

const DEFAULT_BOOKS = [
  // ─── Công nghệ & Khoa học Máy tính ───
  { id: 1, title: "Just for Fun", author: "Linus Torvalds & David Diamond", rating: 4, cover: "🐧", review: "Hành trình tạo ra hạt nhân Linux thay đổi thế giới từ một dự án cá nhân. Cuốn sách truyền cảm hứng mãnh liệt về tinh thần tự do nguồn mở, sự tò mò vô tận và niềm vui thuần túy khi tự tay xây dựng một hệ thống từ con số không." },

  // ─── Triết học & Tư tưởng ───
  { id: 2, title: "Zarathustra đã nói như thế", author: "Friedrich Nietzsche", rating: 4, cover: "📓", review: "Tác phẩm triết học mang đậm tính văn chương với tuyên ngôn 'Thượng đế đã chết'. Sách thách thức các giá trị đạo đức truyền thống và đề cao ý chí vươn tới hình mẫu 'Siêu nhân' (Übermensch)." },
  { id: 3, title: "Suy tưởng (Meditations)", author: "Marcus Aurelius", rating: 5, cover: "🏛️", review: "Những ghi chép cá nhân của vị Hoàng đế La Mã quyền lực nhất thế giới, chứa đựng cốt lõi của Chủ nghĩa Khắc kỷ: tập trung vào những gì ta có thể kiểm soát và bình thản trước mọi biến động." },
  { id: 4, title: "Những bức thư của Seneca", author: "Seneca", rating: 4, cover: "📜", review: "Tập hợp những lá thư gửi người bạn Lucilius, bàn về cách sử dụng thời gian, đối mặt với cái chết và cách giữ tâm trí tĩnh lặng giữa một xã hội đầy nhiễu nhương." },
  { id: 5, title: "Hữu thể và Hư vô", author: "Jean-Paul Sartre", rating: 4, cover: "🌌", review: "Tác phẩm đồ sộ đặt nền móng cho Chủ nghĩa Hiện sinh. Phân tích sâu sắc về sự tự do tuyệt đối của con người và trách nhiệm nặng nề đi kèm với sự tự do đó." },
  { id: 6, title: "Thế giới của Sophie", author: "Jostein Gaarder", rating: 4, cover: "🔍", review: "Một cuốn bách khoa toàn thư về lịch sử triết học phương Tây được khéo léo lồng ghép vào một cốt truyện tiểu thuyết đầy bí ẩn, dẫn dắt tư duy từ Socrates đến Karl Marx." },
  { id: 7, title: "Đạo Đức Kinh", author: "Lão Tử", rating: 5, cover: "🎋", review: "Triết lý phương Đông sâu sắc về 'Đạo' và sự 'Vô vi'. Dạy con người cách thuận theo tự nhiên, buông bỏ sự gượng ép để đạt được sự hài hòa toàn diện." },
  { id: 8, title: "Cộng hòa", author: "Plato", rating: 4, cover: "🏛️", review: "Cuộc đối thoại nền tảng của triết học phương Tây. Qua lời của Socrates, Plato định nghĩa về công lý, linh hồn và phác thảo mô hình nhà nước lý tưởng." },

  // ─── Tâm lý học & Phát triển bản thân ───
  { id: 9, title: "Flow (Dòng chảy)", author: "Mihaly Csikszentmihalyi", rating: 4, cover: "🌊", review: "Nghiên cứu về trạng thái trải nghiệm tối ưu khi con người hoàn toàn chìm đắm vào công việc. Nó minh chứng rằng hạnh phúc đến từ sự chú tâm triệt để vì giá trị tự thân của hành động." },
  { id: 10, title: "Tư duy Nhanh và Chậm", author: "Daniel Kahneman", rating: 4, cover: "🧠", review: "Hành trình mổ xẻ tâm trí con người qua Hệ thống 1 (trực giác, cảm tính) và Hệ thống 2 (logic, phân tích). Giúp nhận diện những sai lệch nhận thức trong việc ra quyết định." },
  { id: 11, title: "Man and His Symbols", author: "Carl Jung", rating: 4, cover: "👁️", review: "Cánh cửa bước vào thế giới vô thức tập thể. Cuốn sách giải mã vai trò của những giấc mơ và các nguyên mẫu tâm lý (archetypes) ảnh hưởng đến hành vi con người." },
  { id: 12, title: "Motivation and Personality", author: "Abraham Maslow", rating: 4, cover: "🔺", review: "Nền tảng của tâm lý học nhân văn, nơi Maslow giới thiệu Tháp Nhu Cầu nổi tiếng, lý giải động lực sâu xa thúc đẩy con người hướng tới sự tự khẳng định bản thân." },

  // ─── Khoa học & Logic học ───
  { id: 13, title: "Lược sử loài người (Sapiens)", author: "Yuval Noah Harari", rating: 5, cover: "🌍", review: "Bức tranh toàn cảnh về sự tiến hóa của Homo Sapiens. Giải thích cách khả năng tạo ra các 'niềm tin hư cấu' như tôn giáo, tiền tệ và luật pháp đã giúp loài người thống trị Trái Đất." },
  { id: 14, title: "Logicomix", author: "Apostolos Doxiadis & Christos Papadimitriou", rating: 4, cover: "📐", review: "Một cuốn tiểu thuyết đồ họa độc đáo kể về hành trình vĩ đại và đầy đau thương của Bertrand Russell trong việc tìm kiếm một nền tảng chân lý vững chắc cho logic học và toán học." },
  { id: 15, title: "Định lý cuối cùng của Fermat", author: "Simon Singh", rating: 4, cover: "∞", review: "Hành trình lịch sử kéo dài hơn 300 năm của những bộ óc toán học vĩ đại nhất nhằm giải một bài toán tưởng chừng đơn giản nhưng lại chứa đựng vẻ đẹp thuần túy của logic." },
  { id: 16, title: "Sao chúng ta lại ngủ", author: "Matthew Walker", rating: 5, cover: "🛏️", review: "Cuốn sách khoa học giải mã chi tiết cơ chế sinh học của giấc ngủ. Một minh chứng rõ ràng về việc ưu tiên sức khỏe và sự phục hồi là chìa khóa tối thượng cho trí tuệ và tuổi thọ." },

  // ─── Tiểu thuyết Kinh điển Thế giới ───
  { id: 17, title: "Hai số phận (Kane and Abel)", author: "Jeffrey Archer", rating: 5, cover: "🦅", review: "Bản anh hùng ca tuyệt đẹp về hai người đàn ông sinh ra cùng ngày, cùng năm ở hai thế giới hoàn toàn đối lập. Cuộc chiến, tham vọng và sự gắn kết định mệnh tạo nên một cốt truyện lôi cuốn tột độ." },
  { id: 18, title: "Bố già (The Godfather)", author: "Mario Puzo", rating: 5, cover: "🕴️", review: "Không chỉ là bức tranh về thế giới ngầm mafia tàn khốc, đây là tác phẩm xuất sắc mổ xẻ về quyền lực, triết lý gia đình, lòng trung thành và nghệ thuật đàm phán." },
  { id: 19, title: "Giết con chim nhại", author: "Harper Lee", rating: 5, cover: "🐦", review: "Tác phẩm kinh điển về sự thấu cảm, lòng dũng cảm bảo vệ công lý và nạn phân biệt chủng tộc qua góc nhìn ngây thơ nhưng sâu sắc của một đứa trẻ." },
  { id: 20, title: "1984", author: "George Orwell", rating: 5, cover: "👁️‍🗨️", review: "Tiểu thuyết phản địa đàng (dystopia) rùng rợn nhất thế kỷ 20. Bóc tách cách các hệ thống toàn trị vận hành, thao túng ngôn ngữ và định hình lại bản chất của sự thật." },
  { id: 21, title: "Những người khốn khổ", author: "Victor Hugo", rating: 4, cover: "🥖", review: "Bản anh hùng ca về tình người, lòng vị tha và cuộc đấu tranh không ngừng nghỉ giữa cái thiện và cái ác trong bối cảnh xã hội Pháp đầy biến động." },
  { id: 22, title: "Trăm năm cô đơn", author: "Gabriel García Márquez", rating: 4, cover: "🕰️", review: "Đỉnh cao của chủ nghĩa hiện thực huyền ảo. Cuốn sách tái hiện lịch sử Mỹ Latinh qua chu kỳ vinh quang và suy tàn không thể tránh khỏi của gia tộc Buendía." },
  { id: 23, title: "Anh em nhà Karamazov", author: "Fyodor Dostoevsky", rating: 5, cover: "⚖️", review: "Tác phẩm đào sâu tận cùng vào những giằng xé đạo đức, bản tính thiện ác và cuộc tranh luận triết học về sự tồn tại của Chúa." },
  { id: 24, title: "Tội ác và hình phạt", author: "Fyodor Dostoevsky", rating: 5, cover: "🪓", review: "Kiệt tác mổ xẻ tâm lý tội phạm vô song. Sự xung đột tàn khốc giữa lý trí điên rồ, ngạo mạn của Raskolnikov và tiếng gọi của lương tri, dẫn đến sự cứu rỗi qua đau khổ." },
  { id: 25, title: "Tiếng chim hót trong bụi mận gai", author: "Colleen McCullough", rating: 4, cover: "🌹", review: "Câu chuyện tình yêu đầy bi kịch và những lựa chọn đánh đổi cả cuộc đời. Triết lý về nỗi đau và cái đẹp hòa quyện vào nhau tựa như tiếng hót duy nhất của loài chim huyền thoại." },
  { id: 26, title: "Ruồi trâu", author: "Ethel Lilian Voynich", rating: 4, cover: "🪰", review: "Khúc tráng ca về lý tưởng cách mạng, tình yêu và sự hy sinh. Một cuốn sách hun đúc ý chí kiên cường và tinh thần cống hiến mãnh liệt." },
  { id: 27, title: "Đại gia Gatsby", author: "F. Scott Fitzgerald", rating: 4, cover: "🍸", review: "Bức tranh lộng lẫy nhưng phù phiếm của 'Thời đại Jazz'. Mổ xẻ giấc mơ Mỹ, sự ảo tưởng và nỗi cô đơn tột cùng của con người trong xã hội vật chất." },
  { id: 28, title: "Nhà giả kim", author: "Paulo Coelho", rating: 4, cover: "🐪", review: "Hành trình theo đuổi 'Định mệnh' của cậu bé chăn cừu. Một câu chuyện ngụ ngôn triết học mang thông điệp mạnh mẽ về việc lắng nghe tiếng gọi của vũ trụ." },
  { id: 29, title: "Siddhartha (Câu chuyện dòng sông)", author: "Hermann Hesse", rating: 4, cover: "🧘", review: "Hành trình đi tìm chân ngã và ý nghĩa cuộc đời. Một tác phẩm thi vị, thấm đẫm triết lý về sự tỉnh thức và giác ngộ thông qua những trải nghiệm thực chứng thay vì giáo điều." },
  { id: 30, title: "Ông lão đánh cá và con cá kiếm", author: "Ernest Hemingway", rating: 4, cover: "⛵", review: "Khúc tráng ca về ý chí kiên cường và nỗ lực bền bỉ của con người trước thiên nhiên bao la: 'Con người có thể bị hủy diệt nhưng không thể bị đánh bại'." },
  { id: 31, title: "Người đàn ông mang tên Ove", author: "Fredrik Backman", rating: 4, cover: "🐈", review: "Đằng sau vẻ ngoài gắt gỏng, nguyên tắc and khó gần của Ove là một trái tim mang đầy tổn thương nhưng vô cùng ấm áp. Một câu chuyện chữa lành về sự kết nối." },
  { id: 32, title: "Hoàng tử bé", author: "Antoine de Saint-Exupéry", rating: 5, cover: "⭐", review: "Dưới hình thức một câu chuyện thiếu nhi, tác phẩm ẩn chứa những triết lý nhân sinh sâu sắc về sự trưởng thành và việc 'những thứ quan trọng nhất đều vô hình trước mắt'." },
  { id: 33, title: "Suối nguồn", author: "Ayn Rand", rating: 4, cover: "🏢", review: "Tuyên ngôn mạnh mẽ về chủ nghĩa khách quan. Tôn vinh sức mạnh của trí tuệ độc lập, tính sáng tạo cá nhân trước những áp lực thỏa hiệp của đám đông." },

  // ─── Văn học Việt Nam ───
  { id: 34, title: "Dế mèn phiêu lưu ký", author: "Tô Hoài", rating: 4, cover: "🦗", review: "Hành trình trưởng thành của Dế Mèn là bài học sâu sắc về sự tự cao, tình anh em và khát vọng khám phá thế giới rộng lớn." },
  { id: 35, title: "Truyện Kiều", author: "Nguyễn Du", rating: 5, cover: "🪕", review: "Kiệt tác thơ Nôm của dân tộc. Bức tranh hiện thực xã hội tàn nhẫn và triết lý 'Tài mệnh tương đố' được thể hiện qua ngôn từ nghệ thuật đạt đến đỉnh cao." },
  { id: 36, title: "Số đỏ", author: "Vũ Trọng Phụng", rating: 4, cover: "🎩", review: "Tuyệt tác trào phúng sắc lẹm, châm biếm sâu cay sự kệch cỡm, lố lăng của tầng lớp thượng lưu rởm đời trong xã hội thực dân nửa phong kiến." },
  { id: 37, title: "Mắt biếc", author: "Nguyễn Nhật Ánh", rating: 4, cover: "🚂", review: "Ký ức tuổi thơ êm đềm và mối tình đơn phương trong trẻo nhưng đầy day dứt. Một nỗi buồn man mác về những điều tuyệt đẹp không thể níu giữ." }
];

const DEFAULT_PROJECTS = [
  { id: 1, name: "Phần mềm Đấu giá Trực tuyến", desc: "Hệ thống áp dụng kiến trúc phân tầng, tích hợp hệ quản trị cơ sở dữ liệu để tối ưu hóa hiệu năng.", tech: ["Java", "OOP", "Git"], github: PROFILE.github, demo: "#", status: "Hoàn thành" },
  { id: 2, name: "Hệ thống Quản lý Web Phòng trọ", desc: "Nền tảng hỗ trợ tự động hóa quy trình quản lý thông tin khách thuê, hợp đồng điện tử.", tech: ["Python", "Database", "Web Development"], github: PROFILE.github, demo: "#", status: "Đang phát triển" },
];

const DEFAULT_ASSIGNMENTS = [
  { id: 1, title: "Bài 1 — Thao tác với tệp tin và thư mục", subject: "Mục 1.4", desc: "Trình bày cấu trúc thư mục tối ưu." },
  { id: 2, title: "Bài 2 — Tìm kiếm thông tin học thuật", subject: "Mục 2.4", desc: "Kết quả tìm kiếm bằng toán tử nâng cao." },
];

// ─── Scroll Reveal Hook ───
function useReveal() {
  const ref = useRef(null);
  useEffect(() => { 
    const el = ref.current; 
    if (!el) return; 
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } 
    }, { threshold: 0.1 }); 
    obs.observe(el); 
    return () => obs.disconnect(); 
  }, []);
  return ref;
}
function Reveal({ children, as: Tag = "div", className = "", ...rest }) {
  const ref = useReveal();
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

// ─── Component Trình phát nhạc nền & Lời chào ───
function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (showPrompt) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showPrompt]);

  const handleUserChoice = (wantsMusic) => {
    setShowPrompt(false);
    if (wantsMusic && audioRef.current) {
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(err => console.log("Không thể tự động phát nhạc:", err));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log(err));
    }
    setPlaying(!playing);
  };

  return (
    <>
      {showPrompt && (
        <div className="welcome-overlay">
          <div className="welcome-modal">
            <h2>Chào mừng bạn!</h2>
            <p>Bạn có muốn bật một chút nhạc nền để trải nghiệm không gian này trọn vẹn hơn không?</p>
            <div className="welcome-actions">
              <button className="btn-primary" onClick={() => handleUserChoice(true)}>🎵 Bật nhạc</button>
              <button className="btn-secondary" onClick={() => handleUserChoice(false)}>🔇 Không, cảm ơn</button>
            </div>
          </div>
        </div>
      )}

      <div className="audio-player">
        <audio ref={audioRef} src={MUSIC_URL} loop />
        <button 
          className={`audio-toggle-btn ${playing ? "playing" : ""}`} 
          onClick={togglePlay} 
          title={playing ? "Tạm dừng nhạc" : "Bật nhạc nền"}
        >
          {playing ? "🎵" : "🔇"}
        </button>
      </div>
    </>
  );
}

// ─── Navbar ───
function Navbar({ page, onNavigate, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { 
    const f = () => setScrolled(window.scrollY > 50); 
    window.addEventListener("scroll", f); 
    return () => window.removeEventListener("scroll", f); 
  }, []);
  const items = [
    { id: "home", label: "Trang chủ" }, 
    { id: "blog", label: "Blog" }, 
    { id: "books", label: "Tủ sách" }, 
    { id: "projects", label: "Dự án" }, 
    { id: "assignments", label: "Bài tập" }
  ];
  const go = (id) => { onNavigate(id); setMenuOpen(false); };
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => go("home")}><span className="bracket">&lt;</span><span>{PROFILE.shortName}</span><span className="bracket">/&gt;</span></div>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {items.map((item, i) => (<button key={item.id} className={`nav-link ${page === item.id ? "active" : ""}`} onClick={() => go(item.id)}><span className="num">0{i + 1}.</span>{item.label}</button>))}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button className="theme-toggle" onClick={toggleTheme} title="Đổi giao diện">{theme === "dark" ? "☀" : "☾"}</button>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>{menuOpen ? "✕" : "☰"}</button>
      </div>
    </nav>
  );
}

// ─── Hero ───
function Hero({ onNavigate }) {
  return (
    <section className="hero container">
      <Reveal><p className="hero-greeting">Xin chào, tôi là</p></Reveal>
      <Reveal><h1 className="hero-name">{PROFILE.name}.</h1></Reveal>
      <Reveal><h2 className="hero-tagline-special">{PROFILE.tagline2}</h2></Reveal>
      <Reveal>
        <p className="hero-blurb">
          {PROFILE.tagline}. Hiện đang theo học tại <a href="https://uet.vnu.edu.vn" target="_blank" rel="noreferrer">VNU-UET</a>. Một người có chiều sâu nội tâm, yêu thích sự tối giản và luôn tò mò về thế giới xung quanh.
        </p>
      </Reveal>
      <Reveal><div className="hero-actions"><button className="btn-primary" onClick={() => onNavigate("projects")}>Xem các dự án →</button><button className="btn-secondary" onClick={() => onNavigate("blog")}>Đọc Blog</button></div></Reveal>
    </section>
  );
}

// ─── About ───
function About() {
  return (
    <section className="container">
      <Reveal as="h2" className="section-title"><span className="section-num">01.</span>Về tôi</Reveal>
      <div className="about-grid">
        <Reveal className="about-text">
          <p>{PROFILE.about}</p>
          <p>{PROFILE.about2}</p>
          <div className="philosophy-quote">"{PROFILE.philosophy}"</div>
        </Reveal>
        <Reveal><div className="avatar-wrap"><img src={PROFILE.avatar} alt="avatar" className="avatar-img" /></div></Reveal>
      </div>
    </section>
  );
}

// ─── Timeline ───
function TimelineSection() {
  return (<section className="container"><Reveal as="h2" className="section-title"><span className="section-num">02.</span>Hành trình</Reveal><div className="timeline">{DEFAULT_TIMELINE.map((item, i) => (<Reveal key={i} className="timeline-item"><div className="timeline-year">{item.year}</div><h4 className="timeline-title">{item.title}</h4><p className="timeline-desc">{item.desc}</p></Reveal>))}</div></section>);
}

// ─── Skills ───
function SkillsSection() {
  return (<section className="container"><Reveal as="h2" className="section-title"><span className="section-num">03.</span>Năng lực & Sở thích</Reveal><div className="skills-grid">{DEFAULT_SKILLS.map((g, i) => (<Reveal key={i} className="skill-group"><h4>{g.category}</h4><ul className="skill-list">{g.items.map((s, j) => <li key={j}>{s}</li>)}</ul></Reveal>))}</div></section>);
}

// ─── Dreams & Lessons ───
function Dreams() {
  return (<section className="container"><Reveal as="h2" className="section-title"><span className="section-num">04.</span>Ước mơ & Bài học</Reveal><Reveal><div className="card" style={{ borderLeft: "3px solid var(--accent)" }}><h3>Ước mơ và sư mệnh </h3><p>{PROFILE.dream}</p></div></Reveal><div className="lessons-grid">{DEFAULT_LESSONS.map((l, i) => (<Reveal key={i}><div className="card"><span className="card-icon">{l.icon}</span><h4>{l.title}</h4><p>{l.desc}</p></div></Reveal>))}</div></section>);
}

// ─── Current Work ───
function CurrentWork() {
  return (<section className="container"><Reveal as="h2" className="section-title"><span className="section-num">05.</span>Hiện tại đang làm</Reveal><Reveal><div className="card"><p style={{ color: "var(--text-2)", fontSize: "1.05rem", lineHeight: 1.7 }}>{PROFILE.currentWork}</p><p style={{ color: "var(--text-3)", fontSize: "0.95rem", marginTop: "0.5rem" }}>{PROFILE.futurePlan}</p></div></Reveal></section>);
}

// ─── Contact ───
function Contact() {
  const links = [
    { label: "Email", href: "mailto:" + PROFILE.email, value: PROFILE.email, icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
    { label: "GitHub", href: PROFILE.github, value: PROFILE.github.replace("https://github.com/", "@"), icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> },
    { label: "LinkedIn", href: PROFILE.linkedin, value: "Xuân Tuyên Do", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
  ];
  return (
    <section className="contact-section container">
      <Reveal><p className="contact-eyebrow">06. Liên hệ</p></Reveal>
      <Reveal><h2 className="contact-title">Hãy cùng kết nối</h2></Reveal>
      <Reveal><p className="contact-text">Hộp thư cá nhân của tôi luôn rộng mở. Cho dù là thảo luận học thuật, trao đổi ý tưởng nghiên cứu hay bài toán lập trình hệ thống — tôi luôn sẵn lòng phản hồi.</p></Reveal>
      <Reveal><div className="contact-links">{links.map((l, i) => (<a key={i} href={l.href} target="_blank" rel="noreferrer" className="contact-link-item"><span className="contact-icon">{l.icon}</span><span className="contact-link-label">{l.label}</span><span className="contact-link-value">{l.value}</span></a>))}</div></Reveal>
    </section>
  );
}

// ─── Pages ───
function HomePage({ onNavigate }) {
  return (
    <>
      <div 
        className="cover-banner" 
        style={{ 
          backgroundImage: `url(${coverImg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      ></div>
      <Hero onNavigate={onNavigate} />
      <About />
      <TimelineSection />
      <SkillsSection />
      <Dreams />
      <CurrentWork />
      <Contact />
    </>
  );
}

function BlogPage({ blogs }) {
  const [openId, setOpenId] = useState(null);
  const blog = openId ? blogs.find(b => b.id === openId) : null;
  if (blog) return (<div className="container page-header"><button className="back-link" onClick={() => setOpenId(null)}>← Quay lại</button><h1 className="blog-detail-title">{blog.title}</h1><div className="blog-meta"><span>{blog.date}</span><span className="dot">·</span><span>{blog.readTime}</span></div><div className="blog-detail-body" style={{ marginTop: "2rem" }}>{blog.content.split("\n").map((p, i) => <p key={i} style={{ marginBottom: "1rem" }}>{p}</p>)}</div></div>);
  return (<div className="container page-header"><p className="section-eyebrow">// Blog</p><h1 className="page-title">Những bài viết</h1><p className="page-subtitle">Suy nghĩ, ghi chép, và bài học rút ra.</p><div className="blog-list">{blogs.map(b => (<div key={b.id} className="blog-item" onClick={() => setOpenId(b.id)}><div className="blog-item-inner"><div className="blog-meta"><span>{b.date}</span><span className="dot">·</span><span>{b.readTime}</span></div><h3>{b.title}</h3><p>{b.desc}</p></div></div>))}</div></div>);
}

function BooksPage({ books }) {
  const [openId, setOpenId] = useState(null);
  const book = openId ? books.find(b => b.id === openId) : null;
  if (book) return (<div className="container page-header"><button className="back-link" onClick={() => setOpenId(null)}>← Quay lại</button><div className="book-detail-header"><span className="book-detail-cover">{book.cover}</span><div><h1 className="book-detail-title">{book.title}</h1><p className="book-detail-author">{book.author}</p><span className="book-stars">{"★".repeat(book.rating)}<span style={{ color: "var(--bg-3)" }}>{"★".repeat(5 - book.rating)}</span></span></div></div><p className="book-review">{book.review}</p></div>);
  return (
    <div className="container page-header">
      <p className="section-eyebrow">// Tủ sách</p>
      <h1 className="page-title">Tủ sách của tôi</h1>
      <p className="page-subtitle">Nơi lưu trữ những tư tưởng lớn, nghiên cứu khoa học và văn học kinh điển.</p>
      <div className="books-grid">
        {books.map(b => (
          <div key={b.id} className="book-card" onClick={() => setOpenId(b.id)}>
            <span className="book-cover-emoji">{b.cover}</span>
            <h4>{b.title}</h4>
            <p className="book-author">{b.author}</p>
            <span className="book-stars">{"★".repeat(b.rating)}<span style={{ color: "var(--bg-3)" }}>{"★".repeat(5 - b.rating)}</span></span>
            <p className="book-cta">Đọc review →</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsPage({ projects }) {
  return (<div className="container page-header"><p className="section-eyebrow">// Dự án</p><h1 className="page-title">Những thứ tôi đã xây dựng</h1><p className="page-subtitle">Các dự án cá nhân và nhóm áp dụng quy trình thực thi hệ thống và tối ưu cấu trúc dữ liệu.</p><div className="projects-list">{projects.map(p => (<div key={p.id} className="project-card"><div className="project-header"><h3 className="project-title">{p.name}</h3><span className={`badge ${p.status === "Hoàn thành" ? "badge-done" : p.status === "Đang phát triển" ? "badge-wip" : "badge-todo"}`}>{p.status}</span></div><p className="project-desc">{p.desc}</p><div className="tech-tags">{p.tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}</div><div className="project-links"><a href={p.github} target="_blank" rel="noreferrer">⌨ GitHub</a>{p.demo !== "#" && <a href={p.demo} target="_blank" rel="noreferrer">🌐 Demo</a>}</div></div>))}</div></div>);
}

function AssignmentsPage() {
  const [notes, setNotes] = useState({});
  return (<div className="container page-header"><p className="section-eyebrow">// Bài tập</p><h1 className="page-title">Kết quả bài tập</h1><p className="page-subtitle">Các bài tập thực hành môn Công nghệ thông tin và Trí tuệ nhân tạo.</p><div style={{ display: "grid", gap: "1.2rem" }}>{DEFAULT_ASSIGNMENTS.map(a => (<div key={a.id} className="assignment-card"><div className="project-header"><h3 className="project-title" style={{ fontSize: "1.15rem" }}>{a.title}</h3><span className="badge badge-todo">Chưa nộp</span></div><p className="assignment-subject">{a.subject}</p><p className="project-desc" style={{ marginBottom: "0.5rem" }}>{a.desc}</p><div className="assignment-actions"><span className="assignment-chip">📎 Upload file</span><span className="assignment-chip">🔗 Thêm link</span></div><textarea className="assignment-notes" placeholder="Ghi chú thuật toán..." value={notes[a.id] || ""} onChange={e => setNotes(p => ({ ...p, [a.id]: e.target.value }))} /></div>))}</div></div>);
}

// ─── Main App Structure ───
export default function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("dark");
  
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  const navigate = useCallback((p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  const toggleTheme = useCallback(() => { setTheme(t => t === "dark" ? "light" : "dark"); }, []);
  
  return (
    <>
      <Navbar page={page} onNavigate={navigate} theme={theme} toggleTheme={toggleTheme} />
      {page === "home" && <HomePage onNavigate={navigate} />}
      {page === "blog" && <BlogPage blogs={DEFAULT_BLOGS} />}
      {page === "books" && <BooksPage books={DEFAULT_BOOKS} />}
      {page === "projects" && <ProjectsPage projects={DEFAULT_PROJECTS} />}
      {page === "assignments" && <AssignmentsPage />}
      
      {/* Trình phát nhạc tự động chèn ở đây */}
      <AudioPlayer />
      
      <footer>
        <p>Thiết kế & phát triển bởi <span className="signature">{PROFILE.name}</span></p>
        <p>Portfolio © 2026 · Built with React & Vite</p>
      </footer>
    </>
  );
}
