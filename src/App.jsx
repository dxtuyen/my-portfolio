import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data placeholder (Thay thế bằng thông tin của bạn) ───
const PROFILE = {
  name: "Nguyễn Văn A",
  tagline: "Developer · Dreamer · Lifelong Learner",
  avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Felix&backgroundColor=e8e0d4",
  about: "Tôi là một sinh viên ngành Công nghệ thông tin, đam mê lập trình và luôn tìm kiếm cơ hội để học hỏi, sáng tạo. Tôi tin rằng công nghệ có thể thay đổi cuộc sống mọi người theo hướng tốt đẹp hơn.",
  personality: "Hướng nội nhưng cởi mở với những ý tưởng mới. Kiên nhẫn, tỉ mỉ, và luôn cố gắng hoàn thiện bản thân mỗi ngày.",
  philosophy: "\"Học không chỉ để biết, mà để trở thành phiên bản tốt hơn của chính mình mỗi ngày.\"",
  currentWork: "Hiện đang là sinh viên năm 3 ngành CNTT, đồng thời nhận freelance thiết kế web cho các doanh nghiệp nhỏ.",
  dream: "Xây dựng những sản phẩm công nghệ giải quyết vấn đề thực tế. Hiện đang phát triển web quản lý phòng trọ — ứng dụng đầu tiên giúp cô chủ trọ số hóa việc quản lý, từ đăng phòng đến thu tiền.",
  futurePlan: "Trở thành Full-stack Developer, xây dựng startup công nghệ giải quyết bài toán nhà ở cho sinh viên và người lao động trẻ.",
  email: "your.email@gmail.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
};

const TIMELINE = [
  { year: "2003", title: "Sinh ra", desc: "Bắt đầu hành trình cuộc đời tại một vùng quê yên bình.", side: "left" },
  { year: "2018", title: "Đam mê máy tính", desc: "Lần đầu tiên viết dòng code Hello World và biết rằng đây là con đường mình muốn đi.", side: "right" },
  { year: "2021", title: "Vào đại học", desc: "Trở thành sinh viên ngành Công nghệ Thông tin, mở ra cánh cửa tri thức mới.", side: "left" },
  { year: "2024", title: "Dự án đầu tiên", desc: "Hoàn thành dự án thực tế đầu tiên — website cho một quán cà phê địa phương.", side: "right" },
  { year: "2026", title: "Web phòng trọ", desc: "Đang phát triển hệ thống quản lý phòng trọ — giải pháp thực tế cho cô chủ trọ.", side: "left" },
];

const SKILLS = [
  { category: "Ngôn ngữ", items: ["JavaScript", "Python", "HTML/CSS", "SQL", "TypeScript"] },
  { category: "Framework", items: ["React", "Node.js", "Express", "Tailwind CSS", "Flask"] },
  { category: "Công cụ", items: ["Git & GitHub", "VS Code", "Figma", "Docker", "Postman"] },
  { category: "Sở thích", items: ["Đọc sách", "Nghe nhạc", "Du lịch", "Viết blog", "Chạy bộ"] },
];

const LESSONS = [
  { title: "Kiên trì là chìa khóa", desc: "Không có con đường tắt cho thành công. Mỗi dòng code sai đều dạy mình điều gì đó." },
  { title: "Học từ thất bại", desc: "Bug không phải là kẻ thù — nó là người thầy tốt nhất trên hành trình lập trình." },
  { title: "Chia sẻ là nhận lại", desc: "Viết blog, giúp bạn bè debug — càng chia sẻ, kiến thức càng sâu hơn." },
];

const BLOGS = [
  { id: 1, title: "Hành trình học React từ zero", desc: "Chia sẻ những bước đầu tiên khi tiếp cận React, từ JSX đến hooks, và những sai lầm mình đã mắc phải.", date: "15/03/2026", readTime: "5 phút", likes: 12, content: "Nội dung chi tiết bài viết sẽ được thêm vào đây..." },
  { id: 2, title: "Tại sao tôi chọn ngành IT", desc: "Câu chuyện từ một cậu bé thích vọc máy tính đến quyết định theo đuổi ngành Công nghệ thông tin.", date: "01/02/2026", readTime: "7 phút", likes: 24, content: "Nội dung chi tiết bài viết sẽ được thêm vào đây..." },
  { id: 3, title: "Tips quản lý thời gian cho sinh viên IT", desc: "Làm sao để cân bằng giữa học, code, freelance và cuộc sống cá nhân?", date: "20/01/2026", readTime: "4 phút", likes: 18, content: "Nội dung chi tiết bài viết sẽ được thêm vào đây..." },
];

const BOOKS = [
  { id: 1, title: "Atomic Habits", author: "James Clear", rating: 5, cover: "📗", review: "Cuốn sách thay đổi cách tôi xây dựng thói quen hàng ngày. Mỗi 1% cải thiện mỗi ngày sẽ tạo nên sự khác biệt lớn." },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", rating: 4, cover: "📘", review: "Bắt buộc đọc cho mọi developer. Dạy cách viết code sạch, dễ đọc và dễ bảo trì." },
  { id: 3, title: "Nhà Giả Kim", author: "Paulo Coelho", rating: 5, cover: "📙", review: "Hành trình theo đuổi ước mơ của Santiago đã truyền cảm hứng cho tôi dám bước ra khỏi vùng an toàn." },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari", rating: 4, cover: "📕", review: "Hiểu về lịch sử loài người giúp tôi nhìn nhận công nghệ và tương lai với góc nhìn rộng hơn." },
];

const PROJECTS = [
  { id: 1, name: "Portfolio Website", desc: "Website portfolio cá nhân với thiết kế Hybrid — scrollytelling + multi-page transitions.", tech: ["React", "Tailwind", "CSS Animations"], github: "https://github.com/yourusername/portfolio", demo: "#", status: "Hoàn thành" },
  { id: 2, name: "Web Quản lý Phòng trọ", desc: "Hệ thống giúp chủ trọ quản lý phòng, khách thuê, hóa đơn và thông báo. Dự án thực tế đang phát triển.", tech: ["React", "Node.js", "MongoDB", "Express"], github: "https://github.com/yourusername/room-management", demo: "#", status: "Đang phát triển" },
  { id: 3, name: "Todo App", desc: "Ứng dụng quản lý công việc với tính năng drag & drop, filter và dark mode.", tech: ["React", "LocalStorage", "CSS"], github: "https://github.com/yourusername/todo-app", demo: "#", status: "Hoàn thành" },
];

const ASSIGNMENTS = [
  { id: 1, title: "Bài 1 — Thao tác với tệp tin và thư mục", subject: "Mục 1.4", desc: "Trình bày cấu trúc thư mục tối ưu và quy tắc đặt tên tệp đã thiết lập, kèm ảnh chụp minh họa.", file: null, note: "" },
  { id: 2, title: "Bài 2 — Tìm kiếm và đánh giá thông tin học thuật", subject: "Mục 2.4", desc: "Trình bày kết quả tìm kiếm học thuật bằng các toán tử nâng cao và bảng đánh giá nguồn tin.", file: null, note: "" },
  { id: 3, title: "Bài 3 — Viết Prompt hiệu quả cho AI", subject: "Mục 2 - 3.4", desc: "Trình bày sự so sánh giữa Prompt ban đầu và Prompt cải tiến cùng kết quả đầu ra từ AI.", file: null, note: "" },
  { id: 4, title: "Bài 4 — Sử dụng công cụ hợp tác trực tuyến", subject: "Bài 3 - Mục 4.4", desc: "Trình bày minh chứng về việc sử dụng công cụ quản lý dự án nhóm và cách thức phối hợp.", file: null, note: "" },
  { id: 5, title: "Bài 5 — Sử dụng AI hỗ trợ sáng tạo nội dung", subject: "Bài 2 - Mục 5.4", desc: "Trưng bày sản phẩm nội dung số hoàn thiện (hình ảnh, video hoặc bài viết) được hỗ trợ bởi AI.", file: null, note: "" },
  { id: 6, title: "Bài 6 — Sử dụng AI có trách nhiệm", subject: "Bài 4 - Mục 6.4", desc: "Trình bày bộ nguyên tắc cá nhân về sử dụng AI có trách nhiệm dựa trên các nghiên cứu.", file: null, note: "" },
];

// ─── Styles ───
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@300;400;500;600&display=swap');

  :root {
    --font-heading: 'Playfair Display', Georgia, serif;
    --font-body: 'Source Sans 3', -apple-system, sans-serif;
    --bg: #0f0f0f;
    --bg2: #1a1a1a;
    --bg3: #242424;
    --text: #e8e0d4;
    --text2: #a09890;
    --accent: #c8956c;
    --accent2: #e8b88a;
    --border: rgba(200,149,108,0.15);
    --card: rgba(26,26,26,0.8);
  }

  [data-theme="light"] {
    --bg: #f5f0eb;
    --bg2: #ebe4dc;
    --bg3: #ddd5cb;
    --text: #2c2420;
    --text2: #6b5e54;
    --accent: #a06b3c;
    --accent2: #7a4f28;
    --border: rgba(160,107,60,0.2);
    --card: rgba(235,228,220,0.9);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body, #root {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
    overflow-x: hidden;
    transition: background .5s, color .5s;
  }

  ::selection { background: var(--accent); color: var(--bg); }

  .fade-section { opacity: 0; transform: translateY(40px); transition: opacity .8s ease, transform .8s ease; }
  .fade-section.visible { opacity: 1; transform: translateY(0); }

  .slide-left { opacity: 0; transform: translateX(-60px); transition: all .7s ease; }
  .slide-right { opacity: 0; transform: translateX(60px); transition: all .7s ease; }
  .slide-left.visible, .slide-right.visible { opacity: 1; transform: translateX(0); }

  @keyframes typing { from { width: 0 } to { width: 100% } }
  @keyframes blink { 50% { border-color: transparent } }
  @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
  @keyframes fadeInUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
  @keyframes pageIn { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
  @keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
  @keyframes scaleIn { from { opacity:0; transform:scale(.95) } to { opacity:1; transform:scale(1) } }
  @keyframes slideDown { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:translateY(0) } }

  .page-enter { animation: pageIn .5s ease forwards; }

  .hero-name { font-family: var(--font-heading); font-size: clamp(2rem,6vw,4rem); font-weight: 600; color: var(--text); letter-spacing: -0.02em; }
  .hero-tagline { font-size: clamp(.9rem,2.5vw,1.15rem); color: var(--text2); font-weight: 300; letter-spacing: 0.08em; }

  .section-title { font-family: var(--font-heading); font-size: clamp(1.5rem,4vw,2.2rem); font-weight: 600; color: var(--text); margin-bottom: 0.3em; }
  .section-subtitle { font-size: .95rem; color: var(--accent); letter-spacing: 0.12em; text-transform: uppercase; font-weight: 500; margin-bottom: 0.5em; }

  .card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; backdrop-filter: blur(10px); transition: transform .3s, border-color .3s, box-shadow .3s; }
  .card:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: 0 8px 32px rgba(0,0,0,.15); }

  nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: .8rem 2rem; display: flex; align-items: center; justify-content: space-between; backdrop-filter: blur(16px); background: color-mix(in srgb, var(--bg) 80%, transparent); border-bottom: 1px solid var(--border); transition: all .3s; }
  .nav-links { display: flex; align-items: center; gap: .2rem; }
  nav a, nav button { background: none; border: none; color: var(--text2); cursor: pointer; font-family: var(--font-body); font-size: .85rem; padding: .4rem .8rem; border-radius: 6px; transition: color .2s, background .2s; text-decoration: none; }
  nav a:hover, nav button:hover { color: var(--accent); background: var(--bg2); }
  nav a.active { color: var(--accent); }

  .nav-logo { font-family: var(--font-heading); font-size: 1.2rem; font-weight: 600; color: var(--text); cursor: pointer; }

  .music-player { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 99; background: var(--card); border: 1px solid var(--border); border-radius: 50px; padding: .5rem 1rem; display: flex; align-items: center; gap: .6rem; backdrop-filter: blur(16px); box-shadow: 0 4px 24px rgba(0,0,0,.2); cursor: pointer; transition: all .3s; font-size: .8rem; color: var(--text2); }
  .music-player:hover { border-color: var(--accent); transform: scale(1.05); }
  .music-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
  .music-dot.playing { animation: pulse 1.2s infinite; }

  .timeline-container { position: relative; padding: 1rem 0; }
  .timeline-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: var(--border); transform: translateX(-50%); }
  .timeline-item { position: relative; display: flex; align-items: flex-start; margin-bottom: 2.5rem; }
  .timeline-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--accent); border: 3px solid var(--bg); position: absolute; left: 50%; transform: translateX(-50%); z-index: 2; }
  .timeline-content { width: 42%; padding: 1rem 1.25rem; background: var(--card); border: 1px solid var(--border); border-radius: 10px; }
  .timeline-content.left { margin-right: auto; text-align: right; }
  .timeline-content.right { margin-left: auto; }
  .timeline-year { font-family: var(--font-heading); font-size: 1.3rem; color: var(--accent); font-weight: 600; }

  .skill-tag { display: inline-block; padding: .35rem .9rem; margin: .25rem; border-radius: 20px; font-size: .82rem; border: 1px solid var(--border); color: var(--text2); background: var(--bg2); transition: all .3s; }
  .skill-tag:hover { border-color: var(--accent); color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); }

  .blog-card { cursor: pointer; }
  .like-btn { display: inline-flex; align-items: center; gap: .3rem; padding: .3rem .7rem; border-radius: 20px; border: 1px solid var(--border); background: transparent; color: var(--text2); cursor: pointer; font-size: .8rem; transition: all .2s; }
  .like-btn:hover, .like-btn.liked { border-color: #e74c5e; color: #e74c5e; background: rgba(231,76,94,.08); }

  .star { color: var(--bg3); cursor: pointer; font-size: 1rem; transition: color .2s; }
  .star.filled { color: #e8a840; }

  .status-badge { display: inline-block; padding: .2rem .6rem; border-radius: 12px; font-size: .7rem; font-weight: 500; }
  .status-done { background: rgba(76,175,80,.12); color: #66bb6a; border: 1px solid rgba(76,175,80,.25); }
  .status-wip { background: rgba(255,183,77,.12); color: #ffb74d; border: 1px solid rgba(255,183,77,.25); }
  .status-todo { background: rgba(158,158,158,.12); color: #9e9e9e; border: 1px solid rgba(158,158,158,.25); }

  .quote-block { font-family: var(--font-heading); font-size: clamp(1.2rem,3vw,1.8rem); font-style: italic; color: var(--text); text-align: center; padding: 2rem 1rem; position: relative; line-height: 1.6; }
  .quote-block::before { content: '"'; font-size: 4rem; color: var(--accent); position: absolute; top: -.5rem; left: 50%; transform: translateX(-50%); opacity: .3; }

  .scroll-indicator { animation: float 2.5s ease-in-out infinite; color: var(--text2); font-size: .8rem; letter-spacing: .1em; }

  .container { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; }

  .hamburger { display: none; }

  @media (max-width: 768px) {
    nav { padding: .6rem 1rem; }
    .nav-links { display: none; position: fixed; top: 56px; left: 0; right: 0; background: var(--bg); border-bottom: 1px solid var(--border); padding: 1rem; flex-direction: column; gap: .5rem; }
    .nav-links.open { display: flex !important; animation: slideDown .3s ease; }
    .hamburger { display: block !important; }
    .timeline-line { left: 20px; }
    .timeline-dot { left: 20px; }
    .timeline-content { width: calc(100% - 50px) !important; margin-left: 44px !important; text-align: left !important; }
    .music-player { bottom: 1rem; right: 1rem; }
  }
`;

// ─── Scroll Observer Hook ───
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = "", direction = "" }) {
  const ref = useScrollReveal();
  const cls = direction === "left" ? "slide-left" : direction === "right" ? "slide-right" : "fade-section";
  return <div ref={ref} className={`${cls} ${className}`}>{children}</div>;
}

// ─── Hero Section ───
function Hero({ onNavigate }) {
  const [typed, setTyped] = useState("");
  const text = PROFILE.tagline;
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => { if (i <= text.length) { setTyped(text.slice(0, i)); i++; } else clearInterval(iv); }, 55);
    return () => clearInterval(iv);
  }, []);
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem 1rem", position: "relative" }}>
      <div style={{ animation: "scaleIn .8s ease" }}>
        <img src={PROFILE.avatar} alt="avatar" style={{ width: 120, height: 120, borderRadius: "50%", border: `3px solid var(--accent)`, marginBottom: "1.5rem", background: "var(--bg2)" }} />
        <p style={{ fontSize: ".8rem", color: "var(--accent)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem", fontWeight: 500 }}>Xin chào, tôi là</p>
        <h1 className="hero-name">{PROFILE.name}</h1>
        <p className="hero-tagline" style={{ minHeight: "1.5em", marginTop: ".5rem" }}>
          {typed}<span style={{ borderRight: "2px solid var(--accent)", animation: "blink 1s infinite", marginLeft: 2 }}>&nbsp;</span>
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" style={{ color: "var(--text2)", fontSize: ".85rem", textDecoration: "none", padding: ".5rem 1.2rem", border: "1px solid var(--border)", borderRadius: 8, transition: "all .2s" }} onMouseEnter={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.color = "var(--accent)"; }} onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text2)"; }}>GitHub</a>
          <button onClick={() => onNavigate("blog")} style={{ color: "var(--bg)", background: "var(--accent)", fontSize: ".85rem", padding: ".5rem 1.2rem", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "var(--font-body)", transition: "opacity .2s" }} onMouseEnter={e => e.target.style.opacity = ".85"} onMouseLeave={e => e.target.style.opacity = "1"}>Đọc Blog</button>
        </div>
      </div>
      <div className="scroll-indicator" style={{ position: "absolute", bottom: "2rem" }}>
        ↓ cuộn xuống
      </div>
    </section>
  );
}

// ─── About ───
function About() {
  return (
    <section style={{ padding: "5rem 0" }} className="container">
      <FadeSection>
        <p className="section-subtitle">Về tôi</p>
        <h2 className="section-title">Câu chuyện của tôi</h2>
      </FadeSection>
      <FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", marginTop: "1.5rem" }}>
          <div className="quote-block">{PROFILE.philosophy}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            <div className="card">
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", marginBottom: ".5rem", color: "var(--accent)" }}>Giới thiệu</h3>
              <p style={{ color: "var(--text2)", fontSize: ".9rem" }}>{PROFILE.about}</p>
            </div>
            <div className="card">
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", marginBottom: ".5rem", color: "var(--accent)" }}>Tính cách</h3>
              <p style={{ color: "var(--text2)", fontSize: ".9rem" }}>{PROFILE.personality}</p>
            </div>
          </div>
        </div>
      </FadeSection>
    </section>
  );
}

// ─── Timeline ───
function Timeline() {
  return (
    <section style={{ padding: "5rem 0" }} className="container">
      <FadeSection>
        <p className="section-subtitle">Hồi kí</p>
        <h2 className="section-title">Dòng thời gian cuộc đời</h2>
      </FadeSection>
      <div className="timeline-container" style={{ marginTop: "2rem" }}>
        <div className="timeline-line" />
        {TIMELINE.map((item, i) => (
          <FadeSection key={i} direction={item.side}>
            <div className="timeline-item">
              <div className="timeline-dot" style={{ top: "1rem" }} />
              <div className={`timeline-content ${item.side}`}>
                <span className="timeline-year">{item.year}</span>
                <h4 style={{ fontFamily: "var(--font-heading)", margin: ".3rem 0", fontSize: "1.05rem" }}>{item.title}</h4>
                <p style={{ color: "var(--text2)", fontSize: ".85rem" }}>{item.desc}</p>
              </div>
            </div>
          </FadeSection>
        ))}
      </div>
    </section>
  );
}

// ─── Skills ───
function SkillsSection() {
  return (
    <section style={{ padding: "5rem 0" }} className="container">
      <FadeSection>
        <p className="section-subtitle">Năng lực</p>
        <h2 className="section-title">Kỹ năng & Sở thích</h2>
      </FadeSection>
      <div style={{ marginTop: "1.5rem" }}>
        {SKILLS.map((group, i) => (
          <FadeSection key={i}>
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", color: "var(--accent)", marginBottom: ".5rem" }}>{group.category}</h3>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {group.items.map((s, j) => <span key={j} className="skill-tag" style={{ animationDelay: `${j * 80}ms` }}>{s}</span>)}
              </div>
            </div>
          </FadeSection>
        ))}
      </div>
    </section>
  );
}

// ─── Dreams & Lessons ───
function Dreams() {
  return (
    <section style={{ padding: "5rem 0" }} className="container">
      <FadeSection>
        <p className="section-subtitle">Tương lai</p>
        <h2 className="section-title">Ước mơ & Bài học tâm đắc</h2>
      </FadeSection>
      <FadeSection>
        <div className="card" style={{ marginTop: "1.5rem", borderLeft: "3px solid var(--accent)" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", marginBottom: ".5rem" }}>Ước mơ & Dự định</h3>
          <p style={{ color: "var(--text2)", fontSize: ".9rem", marginBottom: ".8rem" }}>{PROFILE.dream}</p>
          <p style={{ color: "var(--text2)", fontSize: ".9rem" }}>{PROFILE.futurePlan}</p>
        </div>
      </FadeSection>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
        {LESSONS.map((l, i) => (
          <FadeSection key={i}>
            <div className="card" style={{ height: "100%" }}>
              <span style={{ fontSize: "1.5rem", display: "block", marginBottom: ".5rem" }}>{["💡", "🔥", "🤝"][i]}</span>
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: ".3rem" }}>{l.title}</h4>
              <p style={{ color: "var(--text2)", fontSize: ".85rem" }}>{l.desc}</p>
            </div>
          </FadeSection>
        ))}
      </div>
    </section>
  );
}

// ─── Current Work ───
function CurrentWork() {
  return (
    <section style={{ padding: "5rem 0" }} className="container">
      <FadeSection>
        <p className="section-subtitle">Hiện tại</p>
        <h2 className="section-title">Công việc đang làm</h2>
        <div className="card" style={{ marginTop: "1.5rem" }}>
          <p style={{ color: "var(--text2)", fontSize: ".95rem" }}>{PROFILE.currentWork}</p>
        </div>
      </FadeSection>
    </section>
  );
}

// ─── Contact ───
function Contact() {
  return (
    <section style={{ padding: "5rem 0 3rem" }} className="container">
      <FadeSection>
        <div style={{ textAlign: "center" }}>
          <p className="section-subtitle">Liên hệ</p>
          <h2 className="section-title">Kết nối với tôi</h2>
          <p style={{ color: "var(--text2)", margin: "1rem 0 2rem", fontSize: ".95rem" }}>Bạn có ý tưởng muốn hợp tác? Hãy liên hệ với tôi!</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Email", href: `mailto:${PROFILE.email}`, icon: "✉" },
              { label: "GitHub", href: PROFILE.github, icon: "⌨" },
              { label: "LinkedIn", href: PROFILE.linkedin, icon: "💼" },
            ].map((l, i) => (
              <a key={i} href={l.href} target="_blank" rel="noreferrer" className="card" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: ".6rem", padding: ".8rem 1.5rem" }}>
                <span>{l.icon}</span>
                <span style={{ color: "var(--text)", fontSize: ".9rem" }}>{l.label}</span>
              </a>
            ))}
          </div>
        </div>
      </FadeSection>
    </section>
  );
}

// ─── Blog Page ───
function BlogPage() {
  const [likes, setLikes] = useState(() => BLOGS.reduce((acc, b) => ({ ...acc, [b.id]: b.likes }), {}));
  const [liked, setLiked] = useState({});
  const [openId, setOpenId] = useState(null);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLiked(p => ({ ...p, [id]: !p[id] }));
    setLikes(p => ({ ...p, [id]: p[id] + (liked[id] ? -1 : 1) }));
  };

  if (openId) {
    const blog = BLOGS.find(b => b.id === openId);
    return (
      <div className="container page-enter" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
        <button onClick={() => setOpenId(null)} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: ".9rem", fontFamily: "var(--font-body)", marginBottom: "1.5rem" }}>← Quay lại</button>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", marginBottom: ".5rem" }}>{blog.title}</h1>
        <div style={{ color: "var(--text2)", fontSize: ".85rem", marginBottom: "2rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <span>{blog.date}</span>
          <span>·</span>
          <span>{blog.readTime}</span>
          <button className={`like-btn ${liked[blog.id] ? "liked" : ""}`} onClick={(e) => toggleLike(blog.id, e)}>♥ {likes[blog.id]}</button>
        </div>
        <div style={{ color: "var(--text2)", fontSize: ".95rem", lineHeight: 1.8 }}>
          <p>{blog.desc}</p>
          <br />
          <p style={{ color: "var(--text2)", fontStyle: "italic" }}>[ Nội dung bài viết chi tiết — bạn hãy thay thế đoạn này bằng bài viết thật của mình ]</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-enter" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
      <p className="section-subtitle">Blog</p>
      <h2 className="section-title">Bài viết của tôi</h2>
      <div style={{ display: "grid", gap: "1.2rem", marginTop: "1.5rem" }}>
        {BLOGS.map(b => (
          <div key={b.id} className="card blog-card" onClick={() => setOpenId(b.id)}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", marginBottom: ".4rem" }}>{b.title}</h3>
            <p style={{ color: "var(--text2)", fontSize: ".88rem", marginBottom: ".8rem" }}>{b.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: ".8rem", color: "var(--text2)" }}>
              <div style={{ display: "flex", gap: ".8rem" }}>
                <span>{b.date}</span>
                <span>· {b.readTime}</span>
              </div>
              <button className={`like-btn ${liked[b.id] ? "liked" : ""}`} onClick={(e) => toggleLike(b.id, e)}>♥ {likes[b.id]}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Books Page ───
function BooksPage() {
  const [openId, setOpenId] = useState(null);

  if (openId) {
    const book = BOOKS.find(b => b.id === openId);
    return (
      <div className="container page-enter" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
        <button onClick={() => setOpenId(null)} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: ".9rem", fontFamily: "var(--font-body)", marginBottom: "1.5rem" }}>← Quay lại</button>
        <div style={{ textAlign: "center", margin: "1rem 0 2rem" }}>
          <span style={{ fontSize: "4rem" }}>{book.cover}</span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", marginTop: ".5rem" }}>{book.title}</h1>
          <p style={{ color: "var(--text2)", fontStyle: "italic" }}>{book.author}</p>
          <div style={{ margin: ".5rem 0" }}>{[1,2,3,4,5].map(s => <span key={s} className={`star ${s <= book.rating ? "filled" : ""}`}>★</span>)}</div>
        </div>
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-heading)", marginBottom: ".5rem" }}>Review của tôi</h3>
          <p style={{ color: "var(--text2)", fontSize: ".95rem", lineHeight: 1.8 }}>{book.review}</p>
          <br />
          <p style={{ color: "var(--text2)", fontStyle: "italic", fontSize: ".85rem" }}>[ Thêm blog review chi tiết tại đây ]</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-enter" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
      <p className="section-subtitle">Tủ sách</p>
      <h2 className="section-title">Những cuốn sách đã đọc</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.2rem", marginTop: "1.5rem" }}>
        {BOOKS.map(b => (
          <div key={b.id} className="card blog-card" onClick={() => setOpenId(b.id)} style={{ textAlign: "center" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: ".5rem" }}>{b.cover}</span>
            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: ".2rem" }}>{b.title}</h4>
            <p style={{ color: "var(--text2)", fontSize: ".8rem", fontStyle: "italic" }}>{b.author}</p>
            <div style={{ margin: ".4rem 0" }}>{[1,2,3,4,5].map(s => <span key={s} className={`star ${s <= b.rating ? "filled" : ""}`}>★</span>)}</div>
            <p style={{ color: "var(--text2)", fontSize: ".8rem", marginTop: ".3rem" }}>Đọc review →</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Projects Page ───
function ProjectsPage() {
  return (
    <div className="container page-enter" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
      <p className="section-subtitle">Dự án</p>
      <h2 className="section-title">Các dự án của tôi</h2>
      <div style={{ display: "grid", gap: "1.2rem", marginTop: "1.5rem" }}>
        {PROJECTS.map(p => (
          <div key={p.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: ".5rem" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem" }}>{p.name}</h3>
              <span className={`status-badge ${p.status === "Hoàn thành" ? "status-done" : p.status === "Đang phát triển" ? "status-wip" : "status-todo"}`}>{p.status}</span>
            </div>
            <p style={{ color: "var(--text2)", fontSize: ".88rem", margin: ".5rem 0 .8rem" }}>{p.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: ".8rem" }}>
              {p.tech.map((t, i) => <span key={i} className="skill-tag" style={{ fontSize: ".75rem", padding: ".2rem .6rem" }}>{t}</span>)}
            </div>
            <div style={{ display: "flex", gap: "1rem", fontSize: ".85rem" }}>
              <a href={p.github} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>⌨ GitHub</a>
              {p.demo !== "#" && <a href={p.demo} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>🌐 Demo</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Assignments Page ───
function AssignmentsPage() {
  const [notes, setNotes] = useState({});
  return (
    <div className="container page-enter" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
      <p className="section-subtitle">Bài tập</p>
      <h2 className="section-title">Kết quả bài tập (6 bài)</h2>
      <p style={{ color: "var(--text2)", fontSize: ".9rem", marginBottom: "1.5rem" }}>Tập hợp và trình bày các bài tập đã hoàn thành trong môn "Nhập môn Công nghệ số và Ứng dụng Trí tuệ nhân tạo".</p>
      <div style={{ display: "grid", gap: "1rem" }}>
        {ASSIGNMENTS.map(a => (
          <div key={a.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: ".5rem" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem" }}>{a.title}</h3>
              <span className="status-badge status-todo">Chưa nộp</span>
            </div>
            <p style={{ color: "var(--text2)", fontSize: ".8rem", fontStyle: "italic", margin: ".2rem 0 .5rem" }}>{a.subject}</p>
            <p style={{ color: "var(--text2)", fontSize: ".85rem", marginBottom: ".8rem" }}>{a.desc}</p>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: ".8rem", color: "var(--text2)", padding: ".3rem .8rem", border: "1px dashed var(--border)", borderRadius: 6 }}>📎 Upload file tại đây</span>
              <span style={{ fontSize: ".8rem", color: "var(--text2)", padding: ".3rem .8rem", border: "1px dashed var(--border)", borderRadius: 6 }}>🔗 Thêm link</span>
            </div>
            <textarea
              placeholder="Ghi chú cho bài tập này..."
              value={notes[a.id] || ""}
              onChange={e => setNotes(p => ({ ...p, [a.id]: e.target.value }))}
              style={{ width: "100%", marginTop: ".8rem", padding: ".6rem .8rem", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontFamily: "var(--font-body)", fontSize: ".85rem", resize: "vertical", minHeight: 60 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Homepage ───
function HomePage({ onNavigate }) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <About />
      <Timeline />
      <SkillsSection />
      <Dreams />
      <CurrentWork />
      <Contact />
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useCallback((p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navItems = [
    { id: "home", label: "Trang chủ" },
    { id: "blog", label: "Blog" },
    { id: "books", label: "Tủ sách" },
    { id: "projects", label: "Dự án" },
    { id: "assignments", label: "Bài tập" },
  ];

  return (
    <div data-theme={theme}>
      <style>{styles}</style>

      {/* Navigation */}
      <nav>
        <span className="nav-logo" onClick={() => navigate("home")}>{PROFILE.name.split(" ").pop()}</span>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map(n => (
            <a key={n.id} href="#" className={page === n.id ? "active" : ""} onClick={e => { e.preventDefault(); navigate(n.id); }}>{n.label}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} title="Toggle theme" style={{ fontSize: "1rem" }}>
            {theme === "dark" ? "☀" : "🌙"}
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(p => !p)} style={{ fontSize: "1.2rem" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Pages */}
      {page === "home" && <HomePage onNavigate={navigate} />}
      {page === "blog" && <BlogPage />}
      {page === "books" && <BooksPage />}
      {page === "projects" && <ProjectsPage />}
      {page === "assignments" && <AssignmentsPage />}

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "2rem 1rem", borderTop: "1px solid var(--border)", color: "var(--text2)", fontSize: ".8rem" }}>
        <p>Thiết kế & phát triển bởi {PROFILE.name}</p>
        <p style={{ marginTop: ".3rem", fontSize: ".75rem" }}>Portfolio © 2026 · Built with React</p>
      </footer>

      {/* Music Player */}
      <div className="music-player" onClick={() => setMusicPlaying(p => !p)}>
        <div className={`music-dot ${musicPlaying ? "playing" : ""}`} />
        <span>{musicPlaying ? "Đang phát nhạc" : "Bật nhạc"}</span>
        <span style={{ fontSize: "1rem" }}>{musicPlaying ? "⏸" : "▶"}</span>
      </div>
    </div>
  );
}