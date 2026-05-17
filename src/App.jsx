import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

/*
╔══════════════════════════════════════════════════════════════╗
║  PORTFOLIO + ADMIN PANEL — Firebase-ready                    ║
║                                                              ║
║  Hiện tại: dùng React State (demo/preview)                   ║
║  Khi deploy: kết nối Firebase để lưu dữ liệu thật          ║
║                                                              ║
║  Trang admin: click "Admin" ở footer hoặc vào /admin         ║
║  Mật khẩu demo: admin123                                     ║
╚══════════════════════════════════════════════════════════════╝
*/

// ─── Default Data (sẽ được thay thế bởi Firebase khi deploy) ───
const DEFAULT_DATA = {
  profile: {
    name: "Đỗ Xuân Tuyên",
    tagline: "Developer · Dreamer · Lifelong Learner",
    avatar: "https://photos.google.com/archive/photo/AF1QipOMUh_6npsshXdBG3EMXgmnbW-XLSFiZ68nOSpf",
    about: "Tôi là sinh viên ngành Mạng Máy Tính & Dữ liệu, đam mê lập trình và luôn tìm kiếm cơ hội để học hỏi, sáng tạo.",
    personality: "Hướng nội nhưng cởi mở. Kiên nhẫn, tỉ mỉ, luôn cố gắng hoàn thiện bản thân.",
    philosophy: "Học không chỉ để biết, mà để trở thành phiên bản tốt hơn của chính mình.",
    currentWork: "Sinh viên năm 3 ngành CNTT, nhận freelance thiết kế web.",
    dream: "Xây dựng sản phẩm công nghệ giải quyết vấn đề thực tế. Đang phát triển web quản lý phòng trọ.",
    futurePlan: "Trở thành Full-stack Developer, xây dựng startup công nghệ.",
    email: "your.email@gmail.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
  timeline: [
    { year: "2003", title: "Sinh ra", desc: "Bắt đầu hành trình cuộc đời.", color: "#5b9ea6" },
    { year: "2018", title: "Đam mê lập trình", desc: "Viết dòng code Hello World đầu tiên.", color: "#c8956c" },
    { year: "2021", title: "Vào đại học", desc: "Trở thành sinh viên ngành CNTT.", color: "#9b8ec4" },
    { year: "2024", title: "Dự án đầu tiên", desc: "Hoàn thành website cho quán cà phê.", color: "#6cb88c" },
    { year: "2026", title: "Web phòng trọ", desc: "Đang phát triển hệ thống quản lý phòng trọ.", color: "#c87272" },
  ],
  skills: [
    { category: "Ngôn ngữ", items: ["JavaScript", "Python", "HTML/CSS", "SQL"] },
    { category: "Framework", items: ["React", "Node.js", "Tailwind CSS", "Express"] },
    { category: "Công cụ", items: ["Git", "VS Code", "Figma", "Docker"] },
    { category: "Sở thích", items: ["Đọc sách", "Nghe nhạc", "Du lịch", "Viết blog"] },
  ],
  lessons: [
    { title: "Kiên trì là chìa khóa", desc: "Mỗi dòng code sai đều dạy mình điều gì đó.", icon: "💡" },
    { title: "Học từ thất bại", desc: "Bug là người thầy tốt nhất trên hành trình lập trình.", icon: "🔥" },
    { title: "Chia sẻ là nhận lại", desc: "Càng chia sẻ, kiến thức càng sâu hơn.", icon: "🤝" },
  ],
  blogs: [
    { id: "1", title: "Hành trình học React từ zero", desc: "Những bước đầu tiên khi tiếp cận React.", content: "Nội dung bài viết chi tiết...", date: "2026-03-15", readTime: "5 phút", likes: 12, image: "" },
    { id: "2", title: "Tại sao tôi chọn ngành IT", desc: "Từ cậu bé thích vọc máy tính đến sinh viên CNTT.", content: "Nội dung bài viết chi tiết...", date: "2026-02-01", readTime: "7 phút", likes: 24, image: "" },
  ],
  books: [
    { id: "1", title: "Atomic Habits", author: "James Clear", rating: 5, review: "Cuốn sách thay đổi cách tôi xây dựng thói quen.", cover: "" },
    { id: "2", title: "Clean Code", author: "Robert C. Martin", rating: 4, review: "Bắt buộc đọc cho mọi developer.", cover: "" },
    { id: "3", title: "Nhà Giả Kim", author: "Paulo Coelho", rating: 5, review: "Truyền cảm hứng theo đuổi ước mơ.", cover: "" },
  ],
  projects: [
    { id: "1", name: "Portfolio Website", desc: "Website portfolio cá nhân hybrid — scrollytelling + multi-page.", tech: ["React", "Tailwind", "Firebase"], github: "#", demo: "#", status: "done", image: "" },
    { id: "2", name: "Web Quản lý Phòng trọ", desc: "Hệ thống giúp chủ trọ quản lý phòng, khách thuê, hóa đơn.", tech: ["React", "Node.js", "MongoDB"], github: "#", demo: "", status: "wip", image: "" },
    { id: "3", name: "Todo App", desc: "Ứng dụng quản lý công việc với drag & drop.", tech: ["React", "CSS"], github: "#", demo: "#", status: "done", image: "" },
  ],
  assignments: [
    { id: "1", title: "Bài 1 — Thao tác tệp tin & thư mục", subject: "Mục 1.4", desc: "Cấu trúc thư mục tối ưu và quy tắc đặt tên tệp.", status: "todo", fileUrl: "", note: "", link: "" },
    { id: "2", title: "Bài 2 — Tìm kiếm & đánh giá thông tin", subject: "Mục 2.4", desc: "Tìm kiếm học thuật bằng toán tử nâng cao.", status: "todo", fileUrl: "", note: "", link: "" },
    { id: "3", title: "Bài 3 — Viết Prompt hiệu quả cho AI", subject: "Mục 3.4", desc: "So sánh Prompt ban đầu và Prompt cải tiến.", status: "todo", fileUrl: "", note: "", link: "" },
    { id: "4", title: "Bài 4 — Công cụ hợp tác trực tuyến", subject: "Mục 4.4", desc: "Minh chứng sử dụng công cụ quản lý dự án nhóm.", status: "todo", fileUrl: "", note: "", link: "" },
    { id: "5", title: "Bài 5 — AI hỗ trợ sáng tạo nội dung", subject: "Mục 5.4", desc: "Sản phẩm nội dung số được hỗ trợ bởi AI.", status: "todo", fileUrl: "", note: "", link: "" },
    { id: "6", title: "Bài 6 — Sử dụng AI có trách nhiệm", subject: "Mục 6.4", desc: "Bộ nguyên tắc cá nhân về sử dụng AI có trách nhiệm.", status: "todo", fileUrl: "", note: "", link: "" },
  ],
  music: { url: "", title: "Chưa có nhạc" },
};

// ─── Data Context ───
const DataContext = createContext();
function DataProvider({ children }) {
  const [data, setData] = useState(DEFAULT_DATA);
  const update = (section, value) => setData(prev => ({ ...prev, [section]: value }));
  const updateItem = (section, id, updates) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, ...updates } : item),
    }));
  };
  const addItem = (section, item) => {
    setData(prev => ({ ...prev, [section]: [...prev[section], { ...item, id: Date.now().toString() }] }));
  };
  const removeItem = (section, id) => {
    setData(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) }));
  };
  return (
    <DataContext.Provider value={{ data, update, updateItem, addItem, removeItem }}>
      {children}
    </DataContext.Provider>
  );
}
const useData = () => useContext(DataContext);

// ─── Styles ───
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@300;400;500;600&display=swap');
:root{--hf:'Playfair Display',Georgia,serif;--bf:'Source Sans 3',-apple-system,sans-serif;--bg:#0c0c0c;--bg2:#161616;--bg3:#222;--tx:#e8e0d4;--tx2:#a09890;--ac:#c8956c;--ac2:#e8b88a;--bd:rgba(200,149,108,.15);--cd:rgba(22,22,22,.85)}
[data-theme="light"]{--bg:#f5f0eb;--bg2:#ebe4dc;--bg3:#ddd5cb;--tx:#2c2420;--tx2:#6b5e54;--ac:#a06b3c;--ac2:#7a4f28;--bd:rgba(160,107,60,.2);--cd:rgba(235,228,220,.9)}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body,#root{font-family:var(--bf);background:var(--bg);color:var(--tx);line-height:1.7;overflow-x:hidden;transition:background .4s,color .4s}
::selection{background:var(--ac);color:var(--bg)}

.fade-in{opacity:0;transform:translateY(30px);transition:opacity .7s,transform .7s}
.fade-in.vis{opacity:1;transform:translateY(0)}
.sl{opacity:0;transform:translateX(-50px);transition:all .6s}.sr{opacity:0;transform:translateX(50px);transition:all .6s}
.sl.vis,.sr.vis{opacity:1;transform:translateX(0)}

@keyframes typing{from{width:0}to{width:100%}}
@keyframes blink{50%{border-color:transparent}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes pageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}

.page-in{animation:pageIn .45s ease both}
.cnt{max-width:860px;margin:0 auto;padding:0 1.5rem}

nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:.7rem 2rem;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(14px);background:color-mix(in srgb,var(--bg) 80%,transparent);border-bottom:1px solid var(--bd);transition:all .3s}
.logo{font-family:var(--hf);font-size:1.15rem;font-weight:600;color:var(--tx);cursor:pointer}
.nav-links{display:flex;gap:.15rem;align-items:center}
.nav-links a,.nav-links button{background:none;border:none;color:var(--tx2);cursor:pointer;font-family:var(--bf);font-size:.82rem;padding:.35rem .7rem;border-radius:6px;transition:all .2s;text-decoration:none}
.nav-links a:hover,.nav-links button:hover{color:var(--ac);background:var(--bg2)}
.nav-links a.act{color:var(--ac)}
.nav-r{display:flex;align-items:center;gap:.4rem}

.card{background:var(--cd);border:1px solid var(--bd);border-radius:12px;padding:1.4rem;backdrop-filter:blur(8px);transition:transform .3s,border-color .3s,box-shadow .3s}
.card:hover{transform:translateY(-3px);border-color:var(--ac);box-shadow:0 6px 24px rgba(0,0,0,.12)}
.card-s{background:var(--cd);border:1px solid var(--bd);border-radius:10px;padding:1rem;transition:all .2s}

.stit{font-size:.8rem;color:var(--ac);letter-spacing:.12em;text-transform:uppercase;font-weight:500;margin-bottom:.3em}
.htit{font-family:var(--hf);font-size:clamp(1.4rem,3.5vw,2rem);font-weight:600;margin-bottom:.3em}
.quote{font-family:var(--hf);font-size:clamp(1.1rem,2.5vw,1.6rem);font-style:italic;text-align:center;padding:1.5rem;position:relative;line-height:1.6;color:var(--tx)}
.quote::before{content:'"';font-size:3.5rem;color:var(--ac);position:absolute;top:-.8rem;left:50%;transform:translateX(-50%);opacity:.25}

.tl-wrap{position:relative;padding:1rem 0}
.tl-line{position:absolute;left:50%;top:0;bottom:0;width:2px;background:var(--bd);transform:translateX(-50%)}
.tl-item{position:relative;display:flex;margin-bottom:2.2rem}
.tl-dot{width:12px;height:12px;border-radius:50%;border:3px solid var(--bg);position:absolute;left:50%;transform:translateX(-50%);z-index:2}
.tl-card{width:42%;padding:.9rem 1.1rem;background:var(--cd);border:1px solid var(--bd);border-radius:10px}
.tl-card.l{margin-right:auto;text-align:right}.tl-card.r{margin-left:auto}
.tl-year{font-family:var(--hf);font-size:1.2rem;font-weight:600}

.tag{display:inline-block;padding:.25rem .7rem;margin:.2rem;border-radius:16px;font-size:.78rem;border:1px solid var(--bd);color:var(--tx2);background:var(--bg2);transition:all .25s}
.tag:hover{border-color:var(--ac);color:var(--ac)}

.like-btn{display:inline-flex;align-items:center;gap:.25rem;padding:.25rem .6rem;border-radius:16px;border:1px solid var(--bd);background:transparent;color:var(--tx2);cursor:pointer;font-size:.78rem;transition:all .2s}
.like-btn:hover,.like-btn.liked{border-color:#e74c5e;color:#e74c5e;background:rgba(231,76,94,.06)}

.badge{display:inline-block;padding:.15rem .5rem;border-radius:10px;font-size:.68rem;font-weight:500}
.badge-done{background:rgba(76,175,80,.1);color:#66bb6a;border:1px solid rgba(76,175,80,.2)}
.badge-wip{background:rgba(255,183,77,.1);color:#ffb74d;border:1px solid rgba(255,183,77,.2)}
.badge-todo{background:rgba(158,158,158,.1);color:#9e9e9e;border:1px solid rgba(158,158,158,.2)}

.star{color:var(--bg3);font-size:.95rem;cursor:default}.star.on{color:#e8a840}

.music-pl{position:fixed;bottom:1.2rem;right:1.2rem;z-index:99;background:var(--cd);border:1px solid var(--bd);border-radius:40px;padding:.4rem .9rem;display:flex;align-items:center;gap:.5rem;backdrop-filter:blur(14px);box-shadow:0 4px 20px rgba(0,0,0,.15);cursor:pointer;transition:all .3s;font-size:.78rem;color:var(--tx2)}
.music-pl:hover{border-color:var(--ac);transform:scale(1.04)}
.m-dot{width:7px;height:7px;border-radius:50%;background:var(--ac)}.m-dot.on{animation:pulse 1.2s infinite}

.scroll-ind{animation:float 2.5s ease-in-out infinite;color:var(--tx2);font-size:.78rem;letter-spacing:.1em}

/* Admin styles */
.admin-wrap{display:flex;min-height:100vh;padding-top:52px}
.admin-side{width:220px;background:var(--bg2);border-right:1px solid var(--bd);padding:1rem 0;position:fixed;top:52px;bottom:0;overflow-y:auto}
.admin-side a{display:flex;align-items:center;gap:.6rem;padding:.6rem 1.2rem;color:var(--tx2);text-decoration:none;font-size:.85rem;transition:all .15s;cursor:pointer;border:none;background:none;width:100%;text-align:left;font-family:var(--bf)}
.admin-side a:hover{background:var(--bg3);color:var(--tx)}
.admin-side a.act{color:var(--ac);background:color-mix(in srgb,var(--ac) 8%,transparent);border-right:2px solid var(--ac)}
.admin-main{flex:1;margin-left:220px;padding:1.5rem 2rem}
.admin-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem}

.input{width:100%;padding:.55rem .8rem;background:var(--bg2);border:1px solid var(--bd);border-radius:8px;color:var(--tx);font-family:var(--bf);font-size:.88rem;transition:border-color .2s;outline:none}
.input:focus{border-color:var(--ac)}
.textarea{resize:vertical;min-height:80px}
.label{display:block;font-size:.8rem;color:var(--tx2);margin-bottom:.3rem;font-weight:500}
.btn{padding:.5rem 1.2rem;border:none;border-radius:8px;cursor:pointer;font-family:var(--bf);font-size:.85rem;transition:all .2s}
.btn-primary{background:var(--ac);color:#fff}.btn-primary:hover{opacity:.88}
.btn-outline{background:transparent;border:1px solid var(--bd);color:var(--tx2)}.btn-outline:hover{border-color:var(--ac);color:var(--ac)}
.btn-danger{background:transparent;border:1px solid rgba(231,76,94,.3);color:#e74c5e}.btn-danger:hover{background:rgba(231,76,94,.08)}
.btn-sm{padding:.3rem .8rem;font-size:.78rem}
.field{margin-bottom:1rem}

.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem}
.login-box{background:var(--cd);border:1px solid var(--bd);border-radius:16px;padding:2.5rem;width:100%;max-width:380px;backdrop-filter:blur(10px)}

.file-upload{border:2px dashed var(--bd);border-radius:10px;padding:1.5rem;text-align:center;cursor:pointer;transition:all .2s;color:var(--tx2);font-size:.85rem}
.file-upload:hover{border-color:var(--ac);color:var(--ac)}

.hamburger{display:none}

@media(max-width:768px){
  .nav-links{display:none;position:fixed;top:50px;left:0;right:0;background:var(--bg);border-bottom:1px solid var(--bd);padding:.8rem;flex-direction:column}
  .nav-links.open{display:flex!important;animation:pageIn .25s ease}
  .hamburger{display:block!important}
  .tl-line{left:16px}.tl-dot{left:16px}
  .tl-card{width:calc(100% - 44px)!important;margin-left:38px!important;text-align:left!important}
  .admin-side{display:none}
  .admin-main{margin-left:0}
}
`;

// ─── Scroll Hook ───
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("vis"); obs.unobserve(el); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Fade({ children, className = "", dir = "" }) {
  const ref = useReveal();
  return <div ref={ref} className={`${dir === "l" ? "sl" : dir === "r" ? "sr" : "fade-in"} ${className}`}>{children}</div>;
}

// ═══════════════════════════════════════
//  PORTFOLIO — Front-end sections
// ═══════════════════════════════════════

function Hero({ profile, onNav }) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => { if (i <= profile.tagline.length) { setTyped(profile.tagline.slice(0, i)); i++; } else clearInterval(iv); }, 50);
    return () => clearInterval(iv);
  }, [profile.tagline]);
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem 1rem", position: "relative" }}>
      <div style={{ animation: "pageIn .7s ease" }}>
        <div style={{ width: 110, height: 110, borderRadius: "50%", border: "2px solid var(--ac)", margin: "0 auto 1.2rem", overflow: "hidden", background: "var(--bg2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>
          {profile.avatar ? <img src={profile.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "👤"}
        </div>
        <p style={{ fontSize: ".78rem", color: "var(--ac)", letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 500, marginBottom: ".4rem" }}>Xin chào, tôi là</p>
        <h1 style={{ fontFamily: "var(--hf)", fontSize: "clamp(1.8rem,5.5vw,3.5rem)", fontWeight: 600, letterSpacing: "-.02em" }}>{profile.name}</h1>
        <p style={{ fontSize: "clamp(.85rem,2.2vw,1.05rem)", color: "var(--tx2)", fontWeight: 300, letterSpacing: ".06em", minHeight: "1.4em", marginTop: ".4rem" }}>
          {typed}<span style={{ borderRight: "2px solid var(--ac)", animation: "blink 1s infinite", marginLeft: 1 }}>&nbsp;</span>
        </p>
        <div style={{ display: "flex", gap: ".8rem", justifyContent: "center", marginTop: "1.8rem", flexWrap: "wrap" }}>
          <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: "var(--tx2)", fontSize: ".82rem", textDecoration: "none", padding: ".45rem 1rem", border: "1px solid var(--bd)", borderRadius: 8, transition: "all .2s" }}>GitHub</a>
          <button onClick={() => onNav("blog")} className="btn btn-primary" style={{ fontSize: ".82rem" }}>Đọc Blog</button>
        </div>
      </div>
      <div className="scroll-ind" style={{ position: "absolute", bottom: "2rem" }}>↓ cuộn xuống</div>
    </section>
  );
}

function AboutSection({ profile }) {
  return (
    <section style={{ padding: "4rem 0" }} className="cnt">
      <Fade><p className="stit">Về tôi</p><h2 className="htit">Câu chuyện của tôi</h2></Fade>
      <Fade><div className="quote" style={{ margin: "1.5rem 0" }}>{profile.philosophy}</div></Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.2rem" }}>
        <Fade><div className="card"><h3 style={{ fontFamily: "var(--hf)", fontSize: "1.05rem", marginBottom: ".4rem", color: "var(--ac)" }}>Giới thiệu</h3><p style={{ color: "var(--tx2)", fontSize: ".88rem" }}>{profile.about}</p></div></Fade>
        <Fade><div className="card"><h3 style={{ fontFamily: "var(--hf)", fontSize: "1.05rem", marginBottom: ".4rem", color: "var(--ac)" }}>Tính cách</h3><p style={{ color: "var(--tx2)", fontSize: ".88rem" }}>{profile.personality}</p></div></Fade>
      </div>
    </section>
  );
}

function TimelineSection({ timeline }) {
  return (
    <section style={{ padding: "4rem 0" }} className="cnt">
      <Fade><p className="stit">Hồi kí</p><h2 className="htit">Dòng thời gian</h2></Fade>
      <div className="tl-wrap" style={{ marginTop: "1.5rem" }}>
        <div className="tl-line" />
        {timeline.map((item, i) => (
          <Fade key={i} dir={i % 2 === 0 ? "l" : "r"}>
            <div className="tl-item">
              <div className="tl-dot" style={{ top: "1rem", background: item.color || "var(--ac)" }} />
              <div className={`tl-card ${i % 2 === 0 ? "l" : "r"}`}>
                <span className="tl-year" style={{ color: item.color || "var(--ac)" }}>{item.year}</span>
                <h4 style={{ fontFamily: "var(--hf)", margin: ".2rem 0", fontSize: "1rem" }}>{item.title}</h4>
                <p style={{ color: "var(--tx2)", fontSize: ".82rem" }}>{item.desc}</p>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

function SkillsSection({ skills }) {
  return (
    <section style={{ padding: "4rem 0" }} className="cnt">
      <Fade><p className="stit">Năng lực</p><h2 className="htit">Kỹ năng & Sở thích</h2></Fade>
      {skills.map((g, i) => (
        <Fade key={i}><div style={{ marginTop: "1.2rem" }}>
          <h3 style={{ fontFamily: "var(--hf)", fontSize: ".95rem", color: "var(--ac)", marginBottom: ".4rem" }}>{g.category}</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>{g.items.map((s, j) => <span key={j} className="tag">{s}</span>)}</div>
        </div></Fade>
      ))}
    </section>
  );
}

function DreamsSection({ profile, lessons }) {
  return (
    <section style={{ padding: "4rem 0" }} className="cnt">
      <Fade><p className="stit">Tương lai</p><h2 className="htit">Ước mơ & Bài học</h2></Fade>
      <Fade><div className="card" style={{ marginTop: "1.2rem", borderLeft: "3px solid var(--ac)" }}>
        <h3 style={{ fontFamily: "var(--hf)", fontSize: "1.05rem", marginBottom: ".4rem" }}>Ước mơ & Dự định</h3>
        <p style={{ color: "var(--tx2)", fontSize: ".88rem", marginBottom: ".6rem" }}>{profile.dream}</p>
        <p style={{ color: "var(--tx2)", fontSize: ".88rem" }}>{profile.futurePlan}</p>
      </div></Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1.2rem" }}>
        {lessons.map((l, i) => <Fade key={i}><div className="card" style={{ height: "100%" }}>
          <span style={{ fontSize: "1.4rem", display: "block", marginBottom: ".4rem" }}>{l.icon}</span>
          <h4 style={{ fontFamily: "var(--hf)", fontSize: ".95rem", marginBottom: ".2rem" }}>{l.title}</h4>
          <p style={{ color: "var(--tx2)", fontSize: ".82rem" }}>{l.desc}</p>
        </div></Fade>)}
      </div>
    </section>
  );
}

function WorkSection({ profile }) {
  return (
    <section style={{ padding: "4rem 0" }} className="cnt">
      <Fade><p className="stit">Hiện tại</p><h2 className="htit">Công việc</h2>
        <div className="card" style={{ marginTop: "1rem" }}><p style={{ color: "var(--tx2)", fontSize: ".9rem" }}>{profile.currentWork}</p></div>
      </Fade>
    </section>
  );
}

function ContactSection({ profile }) {
  return (
    <section style={{ padding: "4rem 0 2rem" }} className="cnt">
      <Fade><div style={{ textAlign: "center" }}>
        <p className="stit">Liên hệ</p><h2 className="htit">Kết nối</h2>
        <p style={{ color: "var(--tx2)", margin: ".8rem 0 1.5rem", fontSize: ".9rem" }}>Bạn có ý tưởng? Hãy liên hệ!</p>
        <div style={{ display: "flex", gap: ".8rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[{ l: "Email", h: `mailto:${profile.email}`, i: "✉" }, { l: "GitHub", h: profile.github, i: "⌨" }, { l: "LinkedIn", h: profile.linkedin, i: "💼" }].map((x, i) =>
            <a key={i} href={x.h} target="_blank" rel="noreferrer" className="card-s" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: ".5rem", padding: ".6rem 1.2rem" }}>
              <span>{x.i}</span><span style={{ color: "var(--tx)", fontSize: ".85rem" }}>{x.l}</span>
            </a>
          )}
        </div>
      </div></Fade>
    </section>
  );
}

// ─── Blog Page ───
function BlogPage() {
  const { data, updateItem } = useData();
  const [liked, setLiked] = useState({});
  const [openId, setOpenId] = useState(null);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    const blog = data.blogs.find(b => b.id === id);
    const isLiked = !liked[id];
    setLiked(p => ({ ...p, [id]: isLiked }));
    updateItem("blogs", id, { likes: blog.likes + (isLiked ? 1 : -1) });
  };

  if (openId) {
    const b = data.blogs.find(x => x.id === openId);
    if (!b) return null;
    return (
      <div className="cnt page-in" style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
        <button onClick={() => setOpenId(null)} style={{ background: "none", border: "none", color: "var(--ac)", cursor: "pointer", fontSize: ".88rem", fontFamily: "var(--bf)", marginBottom: "1.2rem" }}>← Quay lại</button>
        {b.image && <img src={b.image} alt="" style={{ width: "100%", borderRadius: 12, marginBottom: "1.5rem", maxHeight: 350, objectFit: "cover" }} />}
        <h1 style={{ fontFamily: "var(--hf)", fontSize: "1.8rem", marginBottom: ".4rem" }}>{b.title}</h1>
        <div style={{ color: "var(--tx2)", fontSize: ".82rem", marginBottom: "1.5rem", display: "flex", gap: ".8rem", alignItems: "center", flexWrap: "wrap" }}>
          <span>{b.date}</span><span>·</span><span>{b.readTime}</span>
          <button className={`like-btn ${liked[b.id] ? "liked" : ""}`} onClick={e => toggleLike(b.id, e)}>♥ {b.likes}</button>
        </div>
        <div style={{ color: "var(--tx2)", fontSize: ".92rem", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{b.content}</div>
      </div>
    );
  }

  return (
    <div className="cnt page-in" style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
      <p className="stit">Blog</p><h2 className="htit">Bài viết</h2>
      <div style={{ display: "grid", gap: "1rem", marginTop: "1.2rem" }}>
        {data.blogs.map(b => (
          <div key={b.id} className="card" style={{ cursor: "pointer" }} onClick={() => setOpenId(b.id)}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              {b.image && <img src={b.image} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "var(--hf)", fontSize: "1.05rem", marginBottom: ".3rem" }}>{b.title}</h3>
                <p style={{ color: "var(--tx2)", fontSize: ".84rem", marginBottom: ".6rem" }}>{b.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: ".78rem", color: "var(--tx2)" }}>
                  <div><span>{b.date}</span><span> · {b.readTime}</span></div>
                  <button className={`like-btn ${liked[b.id] ? "liked" : ""}`} onClick={e => toggleLike(b.id, e)}>♥ {b.likes}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {data.blogs.length === 0 && <p style={{ color: "var(--tx2)", textAlign: "center", padding: "2rem" }}>Chưa có bài viết nào. Hãy thêm qua trang Admin!</p>}
      </div>
    </div>
  );
}

// ─── Books Page ───
function BooksPage() {
  const { data } = useData();
  const [openId, setOpenId] = useState(null);
  if (openId) {
    const b = data.books.find(x => x.id === openId);
    if (!b) return null;
    return (
      <div className="cnt page-in" style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
        <button onClick={() => setOpenId(null)} style={{ background: "none", border: "none", color: "var(--ac)", cursor: "pointer", fontSize: ".88rem", fontFamily: "var(--bf)", marginBottom: "1.2rem" }}>← Quay lại</button>
        <div style={{ textAlign: "center", margin: "1rem 0 1.5rem" }}>
          {b.cover ? <img src={b.cover} alt="" style={{ height: 180, borderRadius: 8, marginBottom: ".8rem" }} /> : <span style={{ fontSize: "4rem" }}>📘</span>}
          <h1 style={{ fontFamily: "var(--hf)", fontSize: "1.6rem", marginTop: ".5rem" }}>{b.title}</h1>
          <p style={{ color: "var(--tx2)", fontStyle: "italic" }}>{b.author}</p>
          <div style={{ margin: ".4rem 0" }}>{[1,2,3,4,5].map(s => <span key={s} className={`star ${s <= b.rating ? "on" : ""}`}>★</span>)}</div>
        </div>
        <div className="card"><h3 style={{ fontFamily: "var(--hf)", marginBottom: ".4rem" }}>Review</h3><p style={{ color: "var(--tx2)", fontSize: ".92rem", lineHeight: 1.8 }}>{b.review}</p></div>
      </div>
    );
  }
  return (
    <div className="cnt page-in" style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
      <p className="stit">Tủ sách</p><h2 className="htit">Sách đã đọc</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginTop: "1.2rem" }}>
        {data.books.map(b => (
          <div key={b.id} className="card" style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setOpenId(b.id)}>
            {b.cover ? <img src={b.cover} alt="" style={{ height: 100, borderRadius: 6, marginBottom: ".4rem" }} /> : <span style={{ fontSize: "2.5rem", display: "block", marginBottom: ".4rem" }}>📘</span>}
            <h4 style={{ fontFamily: "var(--hf)", fontSize: ".92rem" }}>{b.title}</h4>
            <p style={{ color: "var(--tx2)", fontSize: ".75rem", fontStyle: "italic" }}>{b.author}</p>
            <div style={{ margin: ".3rem 0" }}>{[1,2,3,4,5].map(s => <span key={s} className={`star ${s <= b.rating ? "on" : ""}`} style={{ fontSize: ".8rem" }}>★</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Projects Page ───
function ProjectsPage() {
  const { data } = useData();
  const sBadge = { done: "badge-done", wip: "badge-wip", todo: "badge-todo" };
  const sLabel = { done: "Hoàn thành", wip: "Đang phát triển", todo: "Sắp làm" };
  return (
    <div className="cnt page-in" style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
      <p className="stit">Dự án</p><h2 className="htit">Các dự án</h2>
      <div style={{ display: "grid", gap: "1rem", marginTop: "1.2rem" }}>
        {data.projects.map(p => (
          <div key={p.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: ".4rem" }}>
              <h3 style={{ fontFamily: "var(--hf)", fontSize: "1.05rem" }}>{p.name}</h3>
              <span className={`badge ${sBadge[p.status]}`}>{sLabel[p.status]}</span>
            </div>
            <p style={{ color: "var(--tx2)", fontSize: ".85rem", margin: ".4rem 0 .7rem" }}>{p.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem", marginBottom: ".7rem" }}>
              {p.tech.map((t, i) => <span key={i} className="tag" style={{ fontSize: ".72rem", padding: ".15rem .5rem" }}>{t}</span>)}
            </div>
            <div style={{ display: "flex", gap: ".8rem", fontSize: ".82rem" }}>
              {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ color: "var(--ac)", textDecoration: "none" }}>⌨ GitHub</a>}
              {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" style={{ color: "var(--ac)", textDecoration: "none" }}>🌐 Demo</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Assignments Page ───
function AssignmentsPage() {
  const { data } = useData();
  const sBadge = { done: "badge-done", wip: "badge-wip", todo: "badge-todo" };
  const sLabel = { done: "Đã nộp", wip: "Đang làm", todo: "Chưa nộp" };
  return (
    <div className="cnt page-in" style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
      <p className="stit">Bài tập</p><h2 className="htit">Kết quả 6 bài tập</h2>
      <div style={{ display: "grid", gap: "1rem", marginTop: "1.2rem" }}>
        {data.assignments.map(a => (
          <div key={a.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: ".4rem" }}>
              <h3 style={{ fontFamily: "var(--hf)", fontSize: "1rem" }}>{a.title}</h3>
              <span className={`badge ${sBadge[a.status]}`}>{sLabel[a.status]}</span>
            </div>
            <p style={{ color: "var(--tx2)", fontSize: ".78rem", fontStyle: "italic", margin: ".2rem 0" }}>{a.subject}</p>
            <p style={{ color: "var(--tx2)", fontSize: ".84rem", marginBottom: ".6rem" }}>{a.desc}</p>
            {a.note && <p style={{ color: "var(--tx2)", fontSize: ".84rem", padding: ".5rem .8rem", background: "var(--bg2)", borderRadius: 6, marginBottom: ".5rem" }}>{a.note}</p>}
            <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
              {a.fileUrl && <a href={a.fileUrl} target="_blank" rel="noreferrer" style={{ fontSize: ".8rem", color: "var(--ac)", textDecoration: "none" }}>📎 Xem file</a>}
              {a.link && <a href={a.link} target="_blank" rel="noreferrer" style={{ fontSize: ".8rem", color: "var(--ac)", textDecoration: "none" }}>🔗 Link bài</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
//  ADMIN PANEL
// ═══════════════════════════════════════
const ADMIN_PW = "admin123"; // Khi deploy Firebase, thay bằng Firebase Auth

function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const handleLogin = () => {
    if (pw === ADMIN_PW) onLogin();
    else setErr("Sai mật khẩu!");
  };
  return (
    <div className="login-wrap">
      <div className="login-box">
        <h2 style={{ fontFamily: "var(--hf)", textAlign: "center", marginBottom: ".3rem" }}>Quản trị viên</h2>
        <p style={{ textAlign: "center", color: "var(--tx2)", fontSize: ".85rem", marginBottom: "1.5rem" }}>Đăng nhập để quản lý nội dung</p>
        {err && <p style={{ color: "#e74c5e", fontSize: ".82rem", textAlign: "center", marginBottom: ".8rem" }}>{err}</p>}
        <div className="field">
          <label className="label">Mật khẩu</label>
          <input type="password" className="input" value={pw} onChange={e => { setPw(e.target.value); setErr(""); }} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="Nhập mật khẩu..." />
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleLogin}>Đăng nhập</button>
        <p style={{ textAlign: "center", color: "var(--tx2)", fontSize: ".75rem", marginTop: "1rem" }}>Demo: admin123</p>
      </div>
    </div>
  );
}

function AdminPanel({ onBack }) {
  const { data, update, updateItem, addItem, removeItem } = useData();
  const [tab, setTab] = useState("profile");
  const [editing, setEditing] = useState(null);

  const tabs = [
    { id: "profile", label: "Hồ sơ", icon: "👤" },
    { id: "blogs", label: "Blog", icon: "📝" },
    { id: "books", label: "Tủ sách", icon: "📚" },
    { id: "projects", label: "Dự án", icon: "💻" },
    { id: "timeline", label: "Timeline", icon: "⏳" },
    { id: "skills", label: "Kỹ năng", icon: "🎯" },
    { id: "lessons", label: "Bài học", icon: "💡" },
    { id: "assignments", label: "Bài tập", icon: "📋" },
    { id: "music", label: "Nhạc", icon: "🎵" },
  ];

  const Field = ({ label, value, onChange, textarea, type = "text" }) => (
    <div className="field">
      <label className="label">{label}</label>
      {textarea
        ? <textarea className="input textarea" value={value || ""} onChange={e => onChange(e.target.value)} />
        : <input type={type} className="input" value={value || ""} onChange={e => onChange(e.target.value)} />
      }
    </div>
  );

  const renderProfile = () => {
    const p = data.profile;
    const set = (k, v) => update("profile", { ...p, [k]: v });
    return (
      <div>
        <h3 style={{ fontFamily: "var(--hf)", marginBottom: "1rem" }}>Chỉnh sửa hồ sơ</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <Field label="Tên" value={p.name} onChange={v => set("name", v)} />
          <Field label="Tagline" value={p.tagline} onChange={v => set("tagline", v)} />
          <Field label="Email" value={p.email} onChange={v => set("email", v)} />
          <Field label="GitHub URL" value={p.github} onChange={v => set("github", v)} />
          <Field label="LinkedIn URL" value={p.linkedin} onChange={v => set("linkedin", v)} />
          <Field label="Avatar URL" value={p.avatar} onChange={v => set("avatar", v)} />
        </div>
        <Field label="Giới thiệu" value={p.about} onChange={v => set("about", v)} textarea />
        <Field label="Tính cách" value={p.personality} onChange={v => set("personality", v)} textarea />
        <Field label="Quan điểm sống (quote)" value={p.philosophy} onChange={v => set("philosophy", v)} />
        <Field label="Công việc hiện tại" value={p.currentWork} onChange={v => set("currentWork", v)} textarea />
        <Field label="Ước mơ & Dự định" value={p.dream} onChange={v => set("dream", v)} textarea />
        <Field label="Kế hoạch tương lai" value={p.futurePlan} onChange={v => set("futurePlan", v)} textarea />
        <p style={{ color: "var(--ac)", fontSize: ".82rem", marginTop: ".5rem" }}>✓ Thay đổi được lưu tự động</p>
      </div>
    );
  };

  const renderListEditor = (section, fields, emptyItem) => {
    const items = data[section];
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ fontFamily: "var(--hf)" }}>Quản lý {tabs.find(t => t.id === section)?.label}</h3>
          <button className="btn btn-primary btn-sm" onClick={() => addItem(section, emptyItem)}>+ Thêm mới</button>
        </div>
        {items.map((item, idx) => (
          <div key={item.id} className="card-s" style={{ marginBottom: ".8rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".6rem" }}>
              <span style={{ fontWeight: 500, fontSize: ".9rem" }}>{item.title || item.name || `#${idx + 1}`}</span>
              <div style={{ display: "flex", gap: ".3rem" }}>
                <button className="btn btn-outline btn-sm" onClick={() => setEditing(editing === item.id ? null : item.id)}>
                  {editing === item.id ? "Thu gọn" : "Sửa"}
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => { if (confirm("Xóa mục này?")) removeItem(section, item.id); }}>Xóa</button>
              </div>
            </div>
            {editing === item.id && (
              <div style={{ paddingTop: ".5rem", borderTop: "1px solid var(--bd)" }}>
                {fields.map(f => (
                  <Field key={f.key} label={f.label} value={item[f.key]} textarea={f.textarea}
                    onChange={v => updateItem(section, item.id, { [f.key]: f.type === "number" ? Number(v) : v })}
                    type={f.type || "text"} />
                ))}
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && <p style={{ color: "var(--tx2)", textAlign: "center", padding: "2rem" }}>Chưa có mục nào. Nhấn "+ Thêm mới"!</p>}
      </div>
    );
  };

  const renderSkills = () => {
    const skills = data.skills;
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ fontFamily: "var(--hf)" }}>Quản lý kỹ năng</h3>
          <button className="btn btn-primary btn-sm" onClick={() => update("skills", [...skills, { category: "Nhóm mới", items: [] }])}>+ Thêm nhóm</button>
        </div>
        {skills.map((g, gi) => (
          <div key={gi} className="card-s" style={{ marginBottom: ".8rem" }}>
            <div className="field">
              <label className="label">Tên nhóm</label>
              <div style={{ display: "flex", gap: ".5rem" }}>
                <input className="input" value={g.category} onChange={e => { const s = [...skills]; s[gi].category = e.target.value; update("skills", s); }} />
                <button className="btn btn-danger btn-sm" onClick={() => update("skills", skills.filter((_, i) => i !== gi))}>Xóa</button>
              </div>
            </div>
            <div className="field">
              <label className="label">Kỹ năng (phân cách bằng dấu phẩy)</label>
              <input className="input" value={g.items.join(", ")} onChange={e => { const s = [...skills]; s[gi].items = e.target.value.split(",").map(x => x.trim()).filter(Boolean); update("skills", s); }} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMusic = () => (
    <div>
      <h3 style={{ fontFamily: "var(--hf)", marginBottom: "1rem" }}>Nhạc nền</h3>
      <Field label="Tên bài nhạc" value={data.music.title} onChange={v => update("music", { ...data.music, title: v })} />
      <Field label="URL nhạc (link MP3)" value={data.music.url} onChange={v => update("music", { ...data.music, url: v })} />
      <div className="file-upload" style={{ marginTop: ".5rem" }}>
        <p>📁 Khi deploy Firebase, bạn sẽ upload file nhạc trực tiếp tại đây</p>
        <p style={{ fontSize: ".75rem", marginTop: ".3rem" }}>Hỗ trợ: MP3, WAV, OGG</p>
      </div>
      <p style={{ color: "var(--tx2)", fontSize: ".82rem", marginTop: "1rem" }}>💡 Tạm thời: paste link MP3 trực tiếp. Khi kết nối Firebase Storage, bạn sẽ upload file từ máy.</p>
    </div>
  );

  const content = {
    profile: renderProfile,
    blogs: () => renderListEditor("blogs",
      [{ key: "title", label: "Tiêu đề" }, { key: "desc", label: "Mô tả ngắn" }, { key: "content", label: "Nội dung", textarea: true }, { key: "date", label: "Ngày (YYYY-MM-DD)" }, { key: "readTime", label: "Thời gian đọc" }, { key: "image", label: "URL ảnh bìa" }],
      { title: "Bài viết mới", desc: "", content: "", date: new Date().toISOString().slice(0, 10), readTime: "3 phút", likes: 0, image: "" }
    ),
    books: () => renderListEditor("books",
      [{ key: "title", label: "Tên sách" }, { key: "author", label: "Tác giả" }, { key: "rating", label: "Rating (1-5)", type: "number" }, { key: "review", label: "Review", textarea: true }, { key: "cover", label: "URL ảnh bìa" }],
      { title: "Sách mới", author: "", rating: 5, review: "", cover: "" }
    ),
    projects: () => renderListEditor("projects",
      [{ key: "name", label: "Tên dự án" }, { key: "desc", label: "Mô tả" }, { key: "github", label: "GitHub URL" }, { key: "demo", label: "Demo URL" }, { key: "status", label: "Trạng thái (done/wip/todo)" }, { key: "image", label: "URL ảnh" }],
      { name: "Dự án mới", desc: "", tech: [], github: "", demo: "", status: "wip", image: "" }
    ),
    timeline: () => renderListEditor("timeline",
      [{ key: "year", label: "Năm" }, { key: "title", label: "Tiêu đề" }, { key: "desc", label: "Mô tả" }, { key: "color", label: "Màu (hex, vd: #c8956c)" }],
      { year: "2026", title: "Sự kiện mới", desc: "", color: "#c8956c" }
    ),
    skills: renderSkills,
    lessons: () => renderListEditor("lessons",
      [{ key: "title", label: "Tiêu đề" }, { key: "desc", label: "Mô tả" }, { key: "icon", label: "Icon (emoji)" }],
      { title: "Bài học mới", desc: "", icon: "✨" }
    ),
    assignments: () => renderListEditor("assignments",
      [{ key: "title", label: "Tiêu đề" }, { key: "subject", label: "Thuộc mục" }, { key: "desc", label: "Mô tả" }, { key: "status", label: "Trạng thái (done/wip/todo)" }, { key: "fileUrl", label: "URL file nộp" }, { key: "link", label: "Link bài" }, { key: "note", label: "Ghi chú", textarea: true }],
      { title: "Bài tập mới", subject: "", desc: "", status: "todo", fileUrl: "", link: "", note: "" }
    ),
    music: renderMusic,
  };

  return (
    <div className="admin-wrap">
      <div className="admin-side">
        <div style={{ padding: ".5rem 1.2rem .8rem", borderBottom: "1px solid var(--bd)", marginBottom: ".5rem" }}>
          <span style={{ fontFamily: "var(--hf)", fontSize: ".95rem", fontWeight: 600 }}>Admin Panel</span>
        </div>
        {tabs.map(t => (
          <a key={t.id} className={tab === t.id ? "act" : ""} onClick={() => { setTab(t.id); setEditing(null); }}>
            <span>{t.icon}</span> {t.label}
          </a>
        ))}
        <div style={{ borderTop: "1px solid var(--bd)", marginTop: ".5rem", paddingTop: ".5rem" }}>
          <a onClick={onBack}><span>🌐</span> Xem website</a>
        </div>
      </div>
      <div className="admin-main page-in">
        {content[tab] ? content[tab]() : null}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const audioRef = useRef(null);

  const nav = useCallback((p) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const navItems = [
    { id: "home", label: "Trang chủ" },
    { id: "blog", label: "Blog" },
    { id: "books", label: "Tủ sách" },
    { id: "projects", label: "Dự án" },
    { id: "assignments", label: "Bài tập" },
  ];

  return (
    <DataProvider>
      <AppInner page={page} theme={theme} setTheme={setTheme} musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying}
        menuOpen={menuOpen} setMenuOpen={setMenuOpen} isAdmin={isAdmin} setIsAdmin={setIsAdmin}
        nav={nav} navItems={navItems} audioRef={audioRef} />
    </DataProvider>
  );
}

function AppInner({ page, theme, setTheme, musicPlaying, setMusicPlaying, menuOpen, setMenuOpen, isAdmin, setIsAdmin, nav, navItems, audioRef }) {
  const { data } = useData();

  const toggleMusic = () => {
    if (!data.music.url) return;
    if (!audioRef.current) { audioRef.current = new Audio(data.music.url); audioRef.current.loop = true; audioRef.current.volume = 0.3; }
    if (musicPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setMusicPlaying(!musicPlaying);
  };

  // Admin pages
  if (page === "admin") {
    if (!isAdmin) return <div data-theme={theme}><style>{CSS}</style><AdminLogin onLogin={() => setIsAdmin(true)} /></div>;
    return (
      <div data-theme={theme}>
        <style>{CSS}</style>
        <nav>
          <span className="logo" onClick={() => nav("home")}>← {data.profile.name.split(" ").pop()}</span>
          <div className="nav-r">
            <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}>{theme === "dark" ? "☀" : "🌙"}</button>
            <button onClick={() => { setIsAdmin(false); nav("home"); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--tx2)", fontSize: ".82rem", fontFamily: "var(--bf)" }}>Đăng xuất</button>
          </div>
        </nav>
        <AdminPanel onBack={() => nav("home")} />
      </div>
    );
  }

  // Public pages
  return (
    <div data-theme={theme}>
      <style>{CSS}</style>
      <nav>
        <span className="logo" onClick={() => nav("home")}>{data.profile.name.split(" ").pop()}</span>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map(n => <a key={n.id} href="#" className={page === n.id ? "act" : ""} onClick={e => { e.preventDefault(); nav(n.id); }}>{n.label}</a>)}
        </div>
        <div className="nav-r">
          <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}>{theme === "dark" ? "☀" : "🌙"}</button>
          <button className="hamburger" onClick={() => setMenuOpen(p => !p)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "var(--tx)" }}>{menuOpen ? "✕" : "☰"}</button>
        </div>
      </nav>

      {page === "home" && <div>
        <Hero profile={data.profile} onNav={nav} />
        <AboutSection profile={data.profile} />
        <TimelineSection timeline={data.timeline} />
        <SkillsSection skills={data.skills} />
        <DreamsSection profile={data.profile} lessons={data.lessons} />
        <WorkSection profile={data.profile} />
        <ContactSection profile={data.profile} />
      </div>}
      {page === "blog" && <BlogPage />}
      {page === "books" && <BooksPage />}
      {page === "projects" && <ProjectsPage />}
      {page === "assignments" && <AssignmentsPage />}

      <footer style={{ textAlign: "center", padding: "1.5rem 1rem", borderTop: "1px solid var(--bd)", color: "var(--tx2)", fontSize: ".78rem" }}>
        <p>Thiết kế bởi {data.profile.name} · 2026</p>
        <button onClick={() => nav("admin")} style={{ background: "none", border: "none", color: "var(--tx2)", cursor: "pointer", fontSize: ".7rem", marginTop: ".3rem", fontFamily: "var(--bf)", opacity: .5 }}>Admin</button>
      </footer>

      <div className="music-pl" onClick={toggleMusic}>
        <div className={`m-dot ${musicPlaying ? "on" : ""}`} />
        <span>{musicPlaying ? (data.music.title || "Đang phát") : "Bật nhạc"}</span>
        <span>{musicPlaying ? "⏸" : "▶"}</span>
      </div>
    </div>
  );
}