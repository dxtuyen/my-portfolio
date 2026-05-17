import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

const PROFILE = {
  name: "Đỗ Xuân Tuyên", shortName: "Tuyên",
  tagline: "Sinh viên ngành Mạng máy tính và Truyền thông dữ liệu",
  avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Tuyen&backgroundColor=transparent",
  about: "Tôi là sinh viên năm nhất tại trường Đại học Công nghệ (VNU-UET). Tôi có niềm yêu thích đặc biệt với phương pháp tiếp cận top-down: luôn tìm hiểu bức tranh tổng thể và kiến trúc hệ thống trước khi đi sâu vào chi tiết kỹ thuật.",
  about2: "Ngoài việc code, tôi dành nhiều thời gian để tối ưu hóa không gian quản lý kiến thức cá nhân và viết blog. Đề cao tính tổ chức, kỷ luật logic và yêu thích sự tối giản.",
  philosophy: "Nắm vững bức tranh tổng thể trước khi đắm chìm vào các chi tiết kỹ thuật.",
  currentWork: "Đang tập trung vào các môn khoa học cơ bản ở trường đại học, đồng thời tự phát triển các dự án phần mềm cá nhân và xây dựng hệ thống digital garden để viết blog.",
  dream: "Hướng tới mục tiêu du học và xa hơn là theo đuổi chương trình Tiến sĩ (PhD) trong lĩnh vực Điện toán Đám mây hoặc Điện toán Lượng tử.",
  futurePlan: "Đạt mục tiêu IELTS 8.0, rèn luyện kỹ năng nghiên cứu học thuật và xây dựng các phần mềm có kiến trúc vững chắc.",
  email: "your.email@gmail.com", github: "https://github.com/yourusername", linkedin: "https://linkedin.com/in/yourusername",
};
const DEFAULT_TIMELINE = [
  { year: "2005", title: "Sinh ra", desc: "Bắt đầu cuộc hành trình." },
  { year: "2023", title: "Tốt nghiệp THPT", desc: "Hoàn thành chương trình trung học phổ thông." },
  { year: "2025", title: "Vào VNU-UET", desc: "Bắt đầu hành trình tại Đại học Công nghệ — VNU." },
];
const DEFAULT_SKILLS = [
  { category: "Ngôn ngữ & Nền tảng", items: ["Java", "JavaScript", "HTML / CSS"] },
  { category: "Hệ điều hành & Công cụ", items: ["Linux (Ubuntu)", "Git & GitHub", "Obsidian", "VS Code"] },
  { category: "Kiến thức", items: ["Mạng máy tính", "Toán rời rạc", "Vật lý đại cương", "Cấu trúc dữ liệu"] },
  { category: "Sở thích", items: ["Đọc sách triết học", "Viết blog", "Tối ưu hoá quy trình", "Nghiên cứu kiến trúc"] },
];
const DEFAULT_LESSONS = [
  { icon: "▲", title: "Tư duy Top-down", desc: "Hiểu rõ kiến trúc tổng thể giúp quá trình học các ngôn ngữ hay công cụ mới trở nên có hệ thống hơn." },
  { icon: "◆", title: "Quản lý kiến thức (PKM)", desc: "Obsidian không chỉ để ghi chép, mà là để kết nối các luồng tư duy và hình thành một bộ não thứ hai." },
  { icon: "●", title: "Sức mạnh của nền tảng", desc: "Logic, toán học và phương pháp luận là gốc rễ để giải quyết những bài toán phức tạp." },
];
const DEFAULT_GALLERY = [
  { id: 1, src: "https://picsum.photos/seed/uet-campus/600/400", caption: "Khuôn viên VNU-UET" },
  { id: 2, src: "https://picsum.photos/seed/workspace/600/600", caption: "Không gian làm việc" },
  { id: 3, src: "https://picsum.photos/seed/coding-night/600/400", caption: "Những đêm code" },
  { id: 4, src: "https://picsum.photos/seed/team-project/600/400", caption: "Dự án nhóm" },
  { id: 5, src: "https://picsum.photos/seed/books-shelf/600/600", caption: "Tủ sách yêu thích" },
  { id: 6, src: "https://picsum.photos/seed/hanoi-life/600/400", caption: "Cuộc sống Hà Nội" },
];
const DEFAULT_BLOGS = [
  { id: 1, title: "Xây dựng hệ thống quản lý kiến thức", desc: "Cách tôi sử dụng Markdown và liên kết hai chiều để quản lý hàng tá môn học.", date: "15.05.2026", readTime: "5 phút đọc", content: "Nội dung bài viết sẽ ở đây..." },
  { id: 2, title: "Tại sao nên dùng Linux để học code?", desc: "Trải nghiệm cá nhân khi chuyển sang Ubuntu.", date: "01.04.2026", readTime: "7 phút đọc", content: "Nội dung bài viết sẽ ở đây..." },
];
const DEFAULT_BOOKS = [
  { id: 1, title: "Toán học rời rạc", author: "Kenneth H. Rosen", rating: 5, cover: "📘", review: "Cuốn sách gối đầu giường giúp rèn luyện tư duy logic toán học." },
  { id: 2, title: "Calculus", author: "James Stewart", rating: 4, cover: "📙", review: "Góc nhìn trực quan về giải tích đa biến." },
];
const DEFAULT_PROJECTS = [
  { id: 1, name: "Phần mềm Đấu giá Trực tuyến", desc: "Dự án Java áp dụng kiến trúc phân tầng.", tech: ["Java", "Git", "OOP"], github: "#", demo: "#", status: "Đang phát triển" },
  { id: 2, name: "Portfolio & Digital Garden", desc: "Website cá nhân lưu trữ blog và kết quả học tập.", tech: ["React", "Vite", "Markdown"], github: "#", demo: "#", status: "Đang phát triển" },
];
const DEFAULT_ASSIGNMENTS = [
  { id: 1, title: "Bài 1 — Thao tác với tệp tin và thư mục", subject: "Mục 1.4", desc: "Trình bày cấu trúc thư mục tối ưu." },
  { id: 2, title: "Bài 2 — Tìm kiếm thông tin học thuật", subject: "Mục 2.4", desc: "Kết quả tìm kiếm bằng toán tử nâng cao." },
  { id: 3, title: "Bài 3 — Viết Prompt hiệu quả cho AI", subject: "Mục 2 - 3.4", desc: "So sánh Prompt ban đầu và Prompt cải tiến." },
  { id: 4, title: "Bài 4 — Công cụ hợp tác trực tuyến", subject: "Bài 3 - Mục 4.4", desc: "Minh chứng sử dụng công cụ quản lý dự án nhóm." },
  { id: 5, title: "Bài 5 — AI hỗ trợ sáng tạo nội dung", subject: "Bài 2 - Mục 5.4", desc: "Sản phẩm nội dung số được hỗ trợ bởi AI." },
  { id: 6, title: "Bài 6 — Sử dụng AI có trách nhiệm", subject: "Bài 4 - Mục 6.4", desc: "Bộ nguyên tắc cá nhân về sử dụng AI." },
];

// ─── localStorage Hook ───
function useLocalData(key, defaultValue) {
  const [data, setData] = useState(() => {
    try { const s = localStorage.getItem("portfolio_" + key); return s ? JSON.parse(s) : defaultValue; } catch { return defaultValue; }
  });
  useEffect(() => { localStorage.setItem("portfolio_" + key, JSON.stringify(data)); }, [key, data]);
  const add = (item) => { const n = { ...item, id: Date.now() }; setData(p => [n, ...p]); };
  const remove = (id) => setData(p => p.filter(i => i.id !== id));
  return { data, add, remove };
}

// ─── Scroll Reveal ───
function useReveal() {
  const ref = useRef(null);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } }, { threshold: 0.1 }); obs.observe(el); return () => obs.disconnect(); }, []);
  return ref;
}
function Reveal({ children, as: Tag = "div", className = "", ...rest }) {
  const ref = useReveal();
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

// ─── Navbar ───
function Navbar({ page, onNavigate, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const items = [{ id: "home", label: "Trang chủ" }, { id: "blog", label: "Blog" }, { id: "books", label: "Tủ sách" }, { id: "projects", label: "Dự án" }, { id: "assignments", label: "Bài tập" }];
  const go = (id) => { onNavigate(id); setMenuOpen(false); };
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => go("home")}><span className="bracket">&lt;</span><span>{PROFILE.shortName}</span><span className="bracket">/&gt;</span></div>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {items.map((item, i) => (<button key={item.id} className={`nav-link ${page === item.id ? "active" : ""}`} onClick={() => go(item.id)}><span className="num">0{i + 1}.</span>{item.label}</button>))}
        <button className={`nav-link ${page === "admin" ? "active" : ""}`} onClick={() => go("admin")} style={{ color: "var(--accent)" }}>⚙ Quản lý</button>
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
      <Reveal><h2 className="hero-subtitle">Tôi xây dựng và học hỏi.</h2></Reveal>
      <Reveal><p className="hero-blurb">{PROFILE.tagline}. Hiện đang là sinh viên năm nhất tại <a href="https://uet.vnu.edu.vn" target="_blank" rel="noreferrer">VNU-UET</a>, tập trung vào tư duy hệ thống, kiến trúc phần mềm và quản lý kiến thức cá nhân.</p></Reveal>
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
          <p>{PROFILE.about}</p><p>{PROFILE.about2}</p>
          <div className="philosophy-quote">"{PROFILE.philosophy}"</div>
          <p>Luôn tò mò về sự giao thoa giữa <span className="accent">công nghệ</span>, <span className="accent">toán học</span> và <span className="accent">tư duy triết học</span>.</p>
        </Reveal>
        <Reveal><div className="avatar-wrap"><img src={PROFILE.avatar} alt="avatar" className="avatar-img" /></div></Reveal>
      </div>
    </section>
  );
}

// ─── Gallery ───
function GallerySection({ gallery }) {
  const [lightbox, setLightbox] = useState(null);
  if (!gallery.length) return null;
  return (
    <section className="container">
      <Reveal as="h2" className="section-title"><span className="section-num">02.</span>Khoảnh khắc</Reveal>
      <div className="gallery-grid">
        {gallery.map((img, i) => (
          <Reveal key={img.id}><div className={`gallery-item ${i === 1 || i === 4 ? "tall" : ""}`} onClick={() => setLightbox(img)}><img src={img.src} alt={img.caption} loading="lazy" /><div className="gallery-overlay"><span className="gallery-caption">{img.caption}</span></div></div></Reveal>
        ))}
      </div>
      {lightbox && (<div className="lightbox" onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button><img src={lightbox.src} alt={lightbox.caption} /><p className="lightbox-caption">{lightbox.caption}</p></div>)}
    </section>
  );
}

// ─── Timeline, Skills, Dreams, CurrentWork, Contact ───
function TimelineSection() {
  return (<section className="container"><Reveal as="h2" className="section-title"><span className="section-num">03.</span>Hành trình</Reveal><div className="timeline">{DEFAULT_TIMELINE.map((item, i) => (<Reveal key={i} className="timeline-item"><div className="timeline-year">{item.year}</div><h4 className="timeline-title">{item.title}</h4><p className="timeline-desc">{item.desc}</p></Reveal>))}</div></section>);
}
function SkillsSection() {
  return (<section className="container"><Reveal as="h2" className="section-title"><span className="section-num">04.</span>Năng lực & Sở thích</Reveal><div className="skills-grid">{DEFAULT_SKILLS.map((g, i) => (<Reveal key={i} className="skill-group"><h4>{g.category}</h4><ul className="skill-list">{g.items.map((s, j) => <li key={j}>{s}</li>)}</ul></Reveal>))}</div></section>);
}
function Dreams() {
  return (<section className="container"><Reveal as="h2" className="section-title"><span className="section-num">05.</span>Ước mơ & Bài học</Reveal><Reveal><div className="card" style={{ borderLeft: "3px solid var(--accent)" }}><h3>Ước mơ & Dự định</h3><p style={{ marginBottom: "0.8rem" }}>{PROFILE.dream}</p><p>{PROFILE.futurePlan}</p></div></Reveal><div className="lessons-grid">{DEFAULT_LESSONS.map((l, i) => (<Reveal key={i}><div className="card"><span className="card-icon">{l.icon}</span><h4>{l.title}</h4><p>{l.desc}</p></div></Reveal>))}</div></section>);
}
function CurrentWork() {
  return (<section className="container"><Reveal as="h2" className="section-title"><span className="section-num">06.</span>Hiện tại đang làm</Reveal><Reveal><div className="card"><p style={{ color: "var(--text-2)", fontSize: "1.05rem", lineHeight: 1.7 }}>{PROFILE.currentWork}</p></div></Reveal></section>);
}
function Contact() {
  const links = [
    { label: "Email", href: "mailto:" + PROFILE.email, value: PROFILE.email, icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
    { label: "GitHub", href: PROFILE.github, value: PROFILE.github.replace("https://github.com/", "@"), icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> },
    { label: "LinkedIn", href: PROFILE.linkedin, value: PROFILE.name, icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
  ];
  return (
    <section className="contact-section container">
      <Reveal><p className="contact-eyebrow">07. Liên hệ</p></Reveal>
      <Reveal><h2 className="contact-title">Hãy cùng kết nối</h2></Reveal>
      <Reveal><p className="contact-text">Hộp thư của tôi luôn rộng mở. Cho dù bạn có câu hỏi, ý tưởng hợp tác, hay chỉ muốn trò chuyện — tôi sẽ phản hồi sớm nhất có thể.</p></Reveal>
      <Reveal><div className="contact-links">{links.map((l, i) => (<a key={i} href={l.href} target="_blank" rel="noreferrer" className="contact-link-item"><span className="contact-icon">{l.icon}</span><span className="contact-link-label">{l.label}</span><span className="contact-link-value">{l.value}</span></a>))}</div></Reveal>
    </section>
  );
}

// ─── Pages ───
function HomePage({ onNavigate, gallery }) {
  return (<><Hero onNavigate={onNavigate} /><About /><GallerySection gallery={gallery} /><TimelineSection /><SkillsSection /><Dreams /><CurrentWork /><Contact /></>);
}
function BlogPage({ blogs }) {
  const [openId, setOpenId] = useState(null);
  const blog = openId ? blogs.find(b => b.id === openId) : null;
  if (blog) return (<div className="container page-header"><button className="back-link" onClick={() => setOpenId(null)}>← Quay lại</button><h1 className="blog-detail-title">{blog.title}</h1><div className="blog-meta"><span>{blog.date}</span><span className="dot">·</span><span>{blog.readTime}</span></div><div className="blog-detail-body" style={{ marginTop: "2rem" }}>{blog.content.split("\n").map((p, i) => <p key={i} style={{ marginBottom: "1rem" }}>{p}</p>)}</div></div>);
  return (<div className="container page-header"><p className="section-eyebrow">// Blog</p><h1 className="page-title">Những bài viết</h1><p className="page-subtitle">Suy nghĩ, ghi chép, và bài học rút ra.</p><div className="blog-list">{blogs.map(b => (<div key={b.id} className="blog-item" onClick={() => setOpenId(b.id)}><div className="blog-item-inner"><div className="blog-meta"><span>{b.date}</span><span className="dot">·</span><span>{b.readTime}</span></div><h3>{b.title}</h3><p>{b.desc}</p></div></div>))}{!blogs.length && <p style={{ color: "var(--text-2)" }}>Chưa có bài viết. Vào ⚙ Quản lý để thêm.</p>}</div></div>);
}
function BooksPage({ books }) {
  const [openId, setOpenId] = useState(null);
  const book = openId ? books.find(b => b.id === openId) : null;
  if (book) return (<div className="container page-header"><button className="back-link" onClick={() => setOpenId(null)}>← Quay lại</button><div className="book-detail-header"><span className="book-detail-cover">{book.cover}</span><div><h1 className="book-detail-title">{book.title}</h1><p className="book-detail-author">{book.author}</p><span className="book-stars">{"★".repeat(book.rating)}<span style={{ color: "var(--bg-3)" }}>{"★".repeat(5 - book.rating)}</span></span></div></div><p className="book-review">{book.review}</p></div>);
  return (<div className="container page-header"><p className="section-eyebrow">// Tủ sách</p><h1 className="page-title">Tủ sách của tôi</h1><p className="page-subtitle">Những cuốn sách đã đồng hành cùng tôi.</p><div className="books-grid">{books.map(b => (<div key={b.id} className="book-card" onClick={() => setOpenId(b.id)}><span className="book-cover-emoji">{b.cover}</span><h4>{b.title}</h4><p className="book-author">{b.author}</p><span className="book-stars">{"★".repeat(b.rating)}<span style={{ color: "var(--bg-3)" }}>{"★".repeat(5 - b.rating)}</span></span><p className="book-cta">Đọc review →</p></div>))}{!books.length && <p style={{ color: "var(--text-2)" }}>Chưa có sách. Vào ⚙ Quản lý để thêm.</p>}</div></div>);
}
function ProjectsPage({ projects }) {
  return (<div className="container page-header"><p className="section-eyebrow">// Dự án</p><h1 className="page-title">Những thứ tôi đã xây dựng</h1><p className="page-subtitle">Các dự án cá nhân và nhóm.</p><div className="projects-list">{projects.map(p => (<div key={p.id} className="project-card"><div className="project-header"><h3 className="project-title">{p.name}</h3><span className={`badge ${p.status === "Hoàn thành" ? "badge-done" : p.status === "Đang phát triển" ? "badge-wip" : "badge-todo"}`}>{p.status}</span></div><p className="project-desc">{p.desc}</p><div className="tech-tags">{p.tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}</div><div className="project-links"><a href={p.github} target="_blank" rel="noreferrer">⌨ GitHub</a>{p.demo !== "#" && <a href={p.demo} target="_blank" rel="noreferrer">🌐 Demo</a>}</div></div>))}</div></div>);
}
function AssignmentsPage() {
  const [notes, setNotes] = useState({});
  return (<div className="container page-header"><p className="section-eyebrow">// Bài tập</p><h1 className="page-title">Kết quả bài tập</h1><p className="page-subtitle">Các bài tập của môn CNTT & AI.</p><div style={{ display: "grid", gap: "1.2rem" }}>{DEFAULT_ASSIGNMENTS.map(a => (<div key={a.id} className="assignment-card"><div className="project-header"><h3 className="project-title" style={{ fontSize: "1.15rem" }}>{a.title}</h3><span className="badge badge-todo">Chưa nộp</span></div><p className="assignment-subject">{a.subject}</p><p className="project-desc" style={{ marginBottom: "0.5rem" }}>{a.desc}</p><div className="assignment-actions"><span className="assignment-chip">📎 Upload file</span><span className="assignment-chip">🔗 Thêm link</span></div><textarea className="assignment-notes" placeholder="Ghi chú..." value={notes[a.id] || ""} onChange={e => setNotes(p => ({ ...p, [a.id]: e.target.value }))} /></div>))}</div></div>);
}

// ─── Admin Page ───
function AdminPage({ galleryStore, blogStore, bookStore, projectStore }) {
  const [tab, setTab] = useState("gallery");
  const tabs = [{ id: "gallery", label: "🖼 Ảnh" }, { id: "blog", label: "✏️ Blog" }, { id: "books", label: "📚 Sách" }, { id: "projects", label: "🛠 Dự án" }];
  return (
    <div className="container page-header">
      <p className="section-eyebrow">// Quản lý nội dung</p>
      <h1 className="page-title">Bảng điều khiển</h1>
      <p className="page-subtitle">Thêm ảnh, viết blog, quản lý sách và dự án — không cần sửa code.</p>
      <div className="admin-tabs">{tabs.map(t => (<button key={t.id} className={`admin-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>))}</div>
      <div className="admin-panel">
        {tab === "gallery" && <GalleryAdmin store={galleryStore} />}
        {tab === "blog" && <BlogAdmin store={blogStore} />}
        {tab === "books" && <BooksAdmin store={bookStore} />}
        {tab === "projects" && <ProjectsAdmin store={projectStore} />}
      </div>
    </div>
  );
}
function GalleryAdmin({ store }) {
  const [url, setUrl] = useState(""); const [caption, setCaption] = useState("");
  const handleAdd = () => { if (!url.trim()) return; store.add({ src: url.trim(), caption: caption.trim() || "Ảnh mới" }); setUrl(""); setCaption(""); };
  return (<div><div className="admin-form"><h3 className="admin-form-title">Thêm ảnh mới</h3><input type="text" placeholder="URL ảnh (dán link ảnh vào đây)" value={url} onChange={e => setUrl(e.target.value)} className="admin-input" /><input type="text" placeholder="Chú thích ảnh" value={caption} onChange={e => setCaption(e.target.value)} className="admin-input" /><button onClick={handleAdd} className="btn-primary" style={{ width: "100%" }}>+ Thêm ảnh</button></div><h3 className="admin-form-title" style={{ marginTop: "2rem" }}>Ảnh hiện có ({store.data.length})</h3><div className="admin-list">{store.data.map(img => (<div key={img.id} className="admin-list-item"><img src={img.src} alt={img.caption} className="admin-thumb" /><div className="admin-list-info"><strong>{img.caption}</strong><span className="admin-list-meta">{img.src.substring(0, 50)}...</span></div><button className="admin-delete" onClick={() => store.remove(img.id)}>✕</button></div>))}</div></div>);
}
function BlogAdmin({ store }) {
  const [form, setForm] = useState({ title: "", desc: "", content: "", readTime: "5 phút đọc" });
  const handleAdd = () => { if (!form.title.trim()) return; const d = new Date(); const date = String(d.getDate()).padStart(2,"0") + "." + String(d.getMonth()+1).padStart(2,"0") + "." + d.getFullYear(); store.add({ ...form, date }); setForm({ title: "", desc: "", content: "", readTime: "5 phút đọc" }); };
  return (<div><div className="admin-form"><h3 className="admin-form-title">Viết bài mới</h3><input type="text" placeholder="Tiêu đề bài viết" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="admin-input" /><input type="text" placeholder="Mô tả ngắn" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} className="admin-input" /><input type="text" placeholder="Thời gian đọc (vd: 5 phút đọc)" value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))} className="admin-input" /><textarea placeholder="Nội dung bài viết... Xuống dòng bằng Enter để tạo đoạn mới." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="admin-textarea" rows={10} /><button onClick={handleAdd} className="btn-primary" style={{ width: "100%" }}>+ Đăng bài</button></div><h3 className="admin-form-title" style={{ marginTop: "2rem" }}>Bài viết ({store.data.length})</h3><div className="admin-list">{store.data.map(b => (<div key={b.id} className="admin-list-item"><div className="admin-list-info"><strong>{b.title}</strong><span className="admin-list-meta">{b.date} · {b.readTime}</span></div><button className="admin-delete" onClick={() => store.remove(b.id)}>✕</button></div>))}</div></div>);
}
function BooksAdmin({ store }) {
  const [form, setForm] = useState({ title: "", author: "", rating: 5, cover: "📘", review: "" });
  const emojis = ["📘", "📙", "📕", "📗", "📓", "📔", "📒"];
  const handleAdd = () => { if (!form.title.trim()) return; store.add(form); setForm({ title: "", author: "", rating: 5, cover: "📘", review: "" }); };
  return (<div><div className="admin-form"><h3 className="admin-form-title">Thêm sách mới</h3><input type="text" placeholder="Tên sách" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="admin-input" /><input type="text" placeholder="Tác giả" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} className="admin-input" /><div style={{ display: "flex", gap: "1rem", alignItems: "center" }}><label style={{ color: "var(--text-2)", fontSize: "0.95rem" }}>Bìa:</label><div style={{ display: "flex", gap: "0.4rem" }}>{emojis.map(e => (<button key={e} onClick={() => setForm(f => ({ ...f, cover: e }))} style={{ fontSize: "1.5rem", background: form.cover === e ? "var(--accent-tint)" : "transparent", border: form.cover === e ? "1px solid var(--accent)" : "1px solid var(--border)", borderRadius: 6, padding: "0.3rem 0.5rem", cursor: "pointer" }}>{e}</button>))}</div></div><div style={{ display: "flex", gap: "1rem", alignItems: "center" }}><label style={{ color: "var(--text-2)", fontSize: "0.95rem" }}>Đánh giá:</label><div style={{ display: "flex", gap: "0.2rem" }}>{[1,2,3,4,5].map(n => (<button key={n} onClick={() => setForm(f => ({ ...f, rating: n }))} style={{ fontSize: "1.3rem", background: "none", border: "none", cursor: "pointer", color: n <= form.rating ? "#e8a840" : "var(--bg-3)" }}>★</button>))}</div></div><textarea placeholder="Review / nhận xét" value={form.review} onChange={e => setForm(f => ({ ...f, review: e.target.value }))} className="admin-textarea" rows={5} /><button onClick={handleAdd} className="btn-primary" style={{ width: "100%" }}>+ Thêm sách</button></div><h3 className="admin-form-title" style={{ marginTop: "2rem" }}>Tủ sách ({store.data.length})</h3><div className="admin-list">{store.data.map(b => (<div key={b.id} className="admin-list-item"><span style={{ fontSize: "1.8rem" }}>{b.cover}</span><div className="admin-list-info"><strong>{b.title}</strong><span className="admin-list-meta">{b.author} · {"★".repeat(b.rating)}</span></div><button className="admin-delete" onClick={() => store.remove(b.id)}>✕</button></div>))}</div></div>);
}
function ProjectsAdmin({ store }) {
  const [form, setForm] = useState({ name: "", desc: "", tech: "", github: "#", demo: "#", status: "Đang phát triển" });
  const handleAdd = () => { if (!form.name.trim()) return; store.add({ ...form, tech: form.tech.split(",").map(t => t.trim()).filter(Boolean) }); setForm({ name: "", desc: "", tech: "", github: "#", demo: "#", status: "Đang phát triển" }); };
  return (<div><div className="admin-form"><h3 className="admin-form-title">Thêm dự án mới</h3><input type="text" placeholder="Tên dự án" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="admin-input" /><textarea placeholder="Mô tả dự án" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} className="admin-textarea" rows={3} /><input type="text" placeholder="Công nghệ (cách nhau bằng dấu phẩy)" value={form.tech} onChange={e => setForm(f => ({ ...f, tech: e.target.value }))} className="admin-input" /><input type="text" placeholder="GitHub link" value={form.github} onChange={e => setForm(f => ({ ...f, github: e.target.value }))} className="admin-input" /><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="admin-input"><option value="Đang phát triển">Đang phát triển</option><option value="Hoàn thành">Hoàn thành</option><option value="Tạm dừng">Tạm dừng</option></select><button onClick={handleAdd} className="btn-primary" style={{ width: "100%" }}>+ Thêm dự án</button></div><h3 className="admin-form-title" style={{ marginTop: "2rem" }}>Dự án ({store.data.length})</h3><div className="admin-list">{store.data.map(p => (<div key={p.id} className="admin-list-item"><div className="admin-list-info"><strong>{p.name}</strong><span className="admin-list-meta">{Array.isArray(p.tech) ? p.tech.join(", ") : p.tech} · {p.status}</span></div><button className="admin-delete" onClick={() => store.remove(p.id)}>✕</button></div>))}</div></div>);
}

// ─── Main App ───
export default function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("dark");
  const galleryStore = useLocalData("gallery", DEFAULT_GALLERY);
  const blogStore = useLocalData("blogs", DEFAULT_BLOGS);
  const bookStore = useLocalData("books", DEFAULT_BOOKS);
  const projectStore = useLocalData("projects", DEFAULT_PROJECTS);
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  const navigate = useCallback((p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  const toggleTheme = useCallback(() => { setTheme(t => t === "dark" ? "light" : "dark"); }, []);
  return (
    <>
      <Navbar page={page} onNavigate={navigate} theme={theme} toggleTheme={toggleTheme} />
      {page === "home" && <HomePage onNavigate={navigate} gallery={galleryStore.data} />}
      {page === "blog" && <BlogPage blogs={blogStore.data} />}
      {page === "books" && <BooksPage books={bookStore.data} />}
      {page === "projects" && <ProjectsPage projects={projectStore.data} />}
      {page === "assignments" && <AssignmentsPage />}
      {page === "admin" && <AdminPage galleryStore={galleryStore} blogStore={blogStore} bookStore={bookStore} projectStore={projectStore} />}
      <footer><p>Thiết kế & phát triển bởi <span className="signature">{PROFILE.name}</span></p><p>Portfolio © 2026 · Built with React & Vite</p></footer>
    </>
  );
}
