import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Giới Thiệu | TechNext",
  description:
    "Khám phá câu chuyện của TechNext – từ một cửa hàng nhỏ đến đại lý công nghệ chính hãng hàng đầu Việt Nam.",
};

/* ─── Data ─────────────────────────────────────────────────── */
const STATS = [
  { val: "10K+",  label: "Khách Hàng Tin Tưởng" },
  { val: "100%",  label: "Hàng Chính Hãng" },
  { val: "5+",    label: "Năm Kinh Nghiệm" },
  { val: "24/7",  label: "Hỗ Trợ Kỹ Thuật" },
];

const VALUES = [
  { icon: "✅", title: "Chính Hãng Tuyệt Đối",  desc: "Mọi sản phẩm đều đến trực tiếp từ Apple, Samsung và Xiaomi. Kèm hóa đơn VAT, hộp nguyên seal." },
  { icon: "⚡", title: "Công Nghệ Tiên Phong",  desc: "Luôn cập nhật dòng máy mới nhất ngay khi ra mắt. Bạn không cần chờ đợi, chúng tôi đã có sẵn." },
  { icon: "🤝", title: "Tận Tâm Từng Bước",    desc: "Đội ngũ tư vấn kỹ thuật sẵn sàng 24/7. Hỗ trợ từ lúc chọn máy đến sau khi nhận hàng." },
  { icon: "🔒", title: "Bảo Hành Vững Chắc",   desc: "Bảo hành chính hãng 12–24 tháng. Đổi mới 1-1 trong 7 ngày. TechNext Care+ kéo dài 2 năm." },
];

const TIMELINE = [
  { year: "2020", title: "Khởi Đầu",          desc: "TechNext ra đời tại TP.HCM với 50 model điện thoại đầu tiên và một tầm nhìn: mang công nghệ chính hãng đến gần hơn với người Việt." },
  { year: "2021", title: "Mở Rộng Danh Mục",  desc: "Bổ sung tablet, tai nghe, phụ kiện. Đạt 10,000 đơn hàng đầu tiên. Mở chi nhánh Hà Nội." },
  { year: "2023", title: "Đại Lý Ủy Quyền",   desc: "Trở thành đại lý ủy quyền chính thức của Xiaomi, Samsung và Apple tại Việt Nam – một cột mốc lịch sử." },
  { year: "2024", title: "TechNext Care+",     desc: "Ra mắt chương trình bảo hành mở rộng độc quyền. Hơn 5,000 khách hàng đăng ký trong tháng đầu tiên." },
  { year: "2025", title: "100K+ Khách Hàng",   desc: "Cán mốc 100,000 khách hàng trung thành. 5 showroom trải dài từ Hà Nội đến Cần Thơ." },
];

const TEAM = [
  { name: "Hoàng Thái Đăng Khoa", role: "Founder & CEO",     bg: "linear-gradient(135deg,#1A1A1A,#3d3d3d)",   initial: "K" },
  { name: "Tạ Đình Quốc Thái",    role: "CTO & Tech Lead",   bg: "linear-gradient(135deg,#FF6700,#ff8c42)",   initial: "T" },
  { name: "Nguyễn Huy Hoàng",     role: "Head of Product",   bg: "linear-gradient(135deg,#1428A0,#2563EB)",   initial: "H" },
];

const BRANDS = [
  { name: "Apple",   logo: "/apple_logo.svg",   bg: "#1A1A1A", filter: "brightness(0) invert(1)" },
  { name: "Samsung", logo: "/samsung_logo.svg", bg: "#1428A0", filter: "brightness(0) invert(1)" },
  { name: "Xiaomi",  logo: "/xiaomi_logo.svg",  bg: "#FF6900", filter: "brightness(0) invert(1)" },
];

/* ─── Page ─────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes slideR   { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes float    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
        @keyframes pulse    { 0%,100%{opacity:.6;} 50%{opacity:1;} }
        @keyframes gradShift{ 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
        .tn-card-hover { transition: transform .25s, box-shadow .25s; }
        .tn-card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.14) !important; }
        .tn-val-card:hover { border-color: #FF6700 !important; }
        .tn-btn-primary { transition: transform .2s, box-shadow .2s; }
        .tn-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(255,103,0,0.55) !important; }
        .tn-btn-ghost:hover { background: rgba(255,255,255,0.15) !important; }
        .tn-btn-white { transition: transform .2s; }
        .tn-btn-white:hover { transform: translateY(-2px); }
        .tn-btn-outline-white:hover { border-color: white !important; background: rgba(255,255,255,0.12) !important; }
      `}</style>

      <div style={{ paddingTop: "92px", fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* ══════════════════════════════════════════════════════ */}
        {/* HERO                                                   */}
        {/* ══════════════════════════════════════════════════════ */}
        <section style={{
          position: "relative", overflow: "hidden",
          background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0f1627 100%)",
          color: "white",
          padding: "6rem 1.5rem 5rem",
          textAlign: "center",
          minHeight: "480px",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          {/* Glow orbs */}
          <div style={{ position:"absolute", top:"-80px", left:"-80px", width:"420px", height:"420px", borderRadius:"50%", background:"radial-gradient(circle,rgba(255,103,0,0.18),transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-100px", right:"-60px", width:"380px", height:"380px", borderRadius:"50%", background:"radial-gradient(circle,rgba(20,40,160,0.22),transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle,rgba(255,103,0,0.06),transparent 65%)", pointerEvents:"none" }} />

          {/* Badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"0.5rem",
            background:"rgba(255,103,0,0.15)", border:"1px solid rgba(255,103,0,0.35)",
            borderRadius:"999px", padding:"0.35rem 1rem",
            fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.08em", color:"#FF6700",
            marginBottom:"1.5rem",
            animation:"fadeUp 0.5s ease both",
          }}>
            <span style={{ animation:"pulse 2s infinite" }}>●</span>
            Đại Lý Ủy Quyền Chính Hãng
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize:"clamp(2.4rem, 6vw, 4rem)", fontWeight:900,
            lineHeight:1.1, letterSpacing:"-0.04em",
            marginBottom:"1.25rem",
            animation:"fadeUp 0.6s .1s ease both",
          }}>
            Chúng Tôi Là<br />
            <span style={{
              background:"linear-gradient(90deg,#FF6700,#ff9f5b,#FF6700)",
              backgroundSize:"200% auto",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text",
              animation:"gradShift 3s ease infinite",
            }}>TechNext</span>
          </h1>

          {/* Subline */}
          <p style={{
            fontSize:"clamp(1rem,2.5vw,1.2rem)",
            color:"rgba(255,255,255,0.62)",
            maxWidth:"560px", lineHeight:1.8, margin:"0 auto 2.5rem",
            animation:"fadeUp 0.6s .2s ease both",
          }}>
            Từ một cửa hàng nhỏ năm 2020, chúng tôi đã trở thành địa chỉ tin cậy
            của hơn <strong style={{ color:"white" }}>10,000 khách hàng</strong> trên khắp Việt Nam.
          </p>

          {/* CTA buttons */}
          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap", animation:"fadeUp 0.6s .3s ease both" }}>
            <Link href="/products" className="tn-btn-primary" style={{
              display:"inline-block", padding:"0.85rem 2.2rem",
              background:"#FF6700", color:"white",
              borderRadius:"999px", textDecoration:"none",
              fontWeight:700, fontSize:"0.92rem",
              boxShadow:"0 8px 28px rgba(255,103,0,0.45)",
            }}>
              Khám Phá Sản Phẩm →
            </Link>
            <Link href="/lien-he" className="tn-btn-ghost" style={{
              display:"inline-block", padding:"0.85rem 2.2rem",
              background:"rgba(255,255,255,0.08)", color:"white",
              borderRadius:"999px", textDecoration:"none",
              fontWeight:600, fontSize:"0.92rem",
              border:"1px solid rgba(255,255,255,0.18)",
              transition:"background .2s",
            }}>
              Liên Hệ
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* STATS BAR                                              */}
        {/* ══════════════════════════════════════════════════════ */}
        <section style={{ background:"white", borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
          <div style={{
            maxWidth:"900px", margin:"0 auto",
            display:"grid", gridTemplateColumns:"repeat(4,1fr)",
            textAlign:"center",
          }}>
            {STATS.map((s,i) => (
              <div key={s.label} style={{
                padding:"2.5rem 1rem",
                borderRight: i < 3 ? "1px solid rgba(0,0,0,0.07)" : "none",
                animation:`fadeUp 0.5s ${i*0.08}s ease both`,
              }}>
                <p style={{ margin:"0 0 0.25rem", fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:900, color:"#FF6700", letterSpacing:"-0.04em" }}>{s.val}</p>
                <p style={{ margin:0, fontSize:"0.8rem", color:"#888", fontWeight:500, letterSpacing:"0.02em" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* OUR STORY                                              */}
        {/* ══════════════════════════════════════════════════════ */}
        <section style={{ padding:"6rem 1.5rem", background:"#fafafa" }}>
          <div style={{
            maxWidth:"1100px", margin:"0 auto",
            display:"grid", gridTemplateColumns:"1fr 1fr",
            gap:"5rem", alignItems:"center",
          }}>
            {/* Left text */}
            <div style={{ animation:"slideR 0.6s ease both" }}>
              <p style={{ margin:"0 0 0.75rem", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.12em", color:"#FF6700", textTransform:"uppercase" }}>Câu Chuyện Của Chúng Tôi</p>
              <h2 style={{ margin:"0 0 1.5rem", fontSize:"clamp(1.6rem,3.5vw,2.4rem)", fontWeight:900, lineHeight:1.2, letterSpacing:"-0.03em", color:"#1A1A1A" }}>
                Bắt Đầu Từ Một<br />Niềm Đam Mê Công Nghệ
              </h2>
              <p style={{ margin:"0 0 1.2rem", fontSize:"0.98rem", color:"#555", lineHeight:1.85 }}>
                Năm 2020, TechNext ra đời với một sứ mệnh đơn giản: giúp người Việt
                tiếp cận công nghệ chính hãng dễ dàng và minh bạch hơn. Không còn
                nỗi lo hàng fake, hàng refurbished hay bảo hành mờ ám.
              </p>
              <p style={{ margin:"0 0 2rem", fontSize:"0.98rem", color:"#555", lineHeight:1.85 }}>
                Từ văn phòng 30m² tại Quận 3, chúng tôi đã phát triển thành hệ thống
                5 showroom trải dài từ Hà Nội đến Cần Thơ, với đội ngũ hơn 50 chuyên
                viên kỹ thuật tận tâm.
              </p>
              <div style={{ display:"flex", gap:"1.5rem" }}>
                {["✅ Hàng Chính Hãng","🏆 Bảo Hành 12–24T","🚚 Giao 2h Nội Thành"].map(t => (
                  <div key={t} style={{ fontSize:"0.78rem", fontWeight:600, color:"#1A1A1A" }}>{t}</div>
                ))}
              </div>
            </div>

            {/* Right visual card */}
            <div style={{
              background:"linear-gradient(135deg,#1A1A1A 0%,#2d2d2d 60%,#1428A0 100%)",
              borderRadius:"28px",
              padding:"3rem 2.5rem",
              color:"white",
              position:"relative",
              overflow:"hidden",
              boxShadow:"0 32px 72px rgba(0,0,0,0.22)",
              animation:"fadeIn 0.7s .2s ease both",
            }}>
              <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"240px", height:"240px", borderRadius:"50%", background:"radial-gradient(circle,rgba(255,103,0,0.25),transparent 70%)" }} />
              <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"180px", height:"180px", borderRadius:"50%", background:"radial-gradient(circle,rgba(20,40,160,0.4),transparent 70%)" }} />
              <p style={{ fontWeight:900, fontSize:"0.7rem", letterSpacing:"0.12em", color:"rgba(255,255,255,0.5)", textTransform:"uppercase", margin:"0 0 2rem" }}>Đối Tác Chính Hãng</p>
              {BRANDS.map(b => (
                <div key={b.name} style={{
                  display:"flex", alignItems:"center", gap:"1rem",
                  padding:"0.9rem 1rem",
                  marginBottom:"0.75rem",
                  background:"rgba(255,255,255,0.06)",
                  borderRadius:"12px",
                  border:"1px solid rgba(255,255,255,0.08)",
                }}>
                  <div style={{
                    width:"42px", height:"42px", borderRadius:"10px",
                    background:b.bg, display:"flex", alignItems:"center", justifyContent:"center",
                    flexShrink:0,
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.logo} alt={b.name} style={{ height:"22px", width:"auto", filter:b.filter, objectFit:"contain" }} />
                  </div>
                  <div>
                    <p style={{ margin:0, fontWeight:700, fontSize:"0.9rem" }}>{b.name}</p>
                    <p style={{ margin:0, fontSize:"0.7rem", color:"rgba(255,255,255,0.5)" }}>Đại lý ủy quyền chính thức</p>
                  </div>
                  <span style={{ marginLeft:"auto", fontSize:"0.65rem", background:"rgba(255,103,0,0.25)", color:"#FF6700", padding:"0.18rem 0.55rem", borderRadius:"999px", fontWeight:700 }}>✓ Official</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* VALUES                                                 */}
        {/* ══════════════════════════════════════════════════════ */}
        <section style={{ padding:"6rem 1.5rem", background:"#1A1A1A" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
              <p style={{ margin:"0 0 0.6rem", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.12em", color:"#FF6700", textTransform:"uppercase" }}>Giá Trị Cốt Lõi</p>
              <h2 style={{ margin:0, fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:900, color:"white", letterSpacing:"-0.03em" }}>
                Điều Làm Nên TechNext
              </h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.25rem" }}>
              {VALUES.map((v,i) => (
                <div key={v.title} className="tn-card-hover tn-val-card" style={{
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  borderRadius:"20px",
                  padding:"2rem 1.75rem",
                  transition:"border-color .2s",
                  animation:`fadeUp 0.5s ${i*0.1}s ease both`,
                }}>
                  <div style={{ fontSize:"2rem", marginBottom:"1rem" }}>{v.icon}</div>
                  <h3 style={{ margin:"0 0 0.75rem", fontSize:"1rem", fontWeight:800, color:"white" }}>{v.title}</h3>
                  <p style={{ margin:0, fontSize:"0.85rem", color:"rgba(255,255,255,0.55)", lineHeight:1.75 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* TIMELINE                                               */}
        {/* ══════════════════════════════════════════════════════ */}
        <section style={{ padding:"6rem 1.5rem", background:"white" }}>
          <div style={{ maxWidth:"760px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
              <p style={{ margin:"0 0 0.6rem", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.12em", color:"#FF6700", textTransform:"uppercase" }}>Hành Trình</p>
              <h2 style={{ margin:0, fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:900, color:"#1A1A1A", letterSpacing:"-0.03em" }}>Từng Bước Phát Triển</h2>
            </div>
            <div style={{ position:"relative" }}>
              {/* Vertical line */}
              <div style={{
                position:"absolute", left:"77px", top:"16px", bottom:"16px",
                width:"2px",
                background:"linear-gradient(to bottom, #FF6700, #1428A0)",
                borderRadius:"2px",
              }} />
              {TIMELINE.map((t,i) => (
                <div key={t.year} className="tn-card-hover" style={{
                  display:"flex", gap:"1.5rem", alignItems:"flex-start",
                  marginBottom: i < TIMELINE.length - 1 ? "2rem" : 0,
                  background:"white",
                  borderRadius:"16px",
                  padding:"1.5rem",
                  border:"1px solid rgba(0,0,0,0.07)",
                  boxShadow:"0 2px 12px rgba(0,0,0,0.04)",
                  animation:`fadeUp 0.5s ${i*0.1}s ease both`,
                  zIndex:1, position:"relative",
                }}>
                  {/* Year badge */}
                  <div style={{
                    flexShrink:0, width:"60px", height:"60px",
                    borderRadius:"14px",
                    background:"linear-gradient(135deg,#FF6700,#ff9f5b)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    boxShadow:"0 6px 20px rgba(255,103,0,0.35)",
                  }}>
                    <span style={{ fontWeight:900, fontSize:"0.9rem", color:"white" }}>{t.year}</span>
                  </div>
                  <div>
                    <h3 style={{ margin:"0 0 0.4rem", fontSize:"1rem", fontWeight:800, color:"#1A1A1A" }}>{t.title}</h3>
                    <p style={{ margin:0, fontSize:"0.85rem", color:"#666", lineHeight:1.75 }}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* TEAM                                                   */}
        {/* ══════════════════════════════════════════════════════ */}
        <section style={{ padding:"6rem 1.5rem", background:"#f5f5f7" }}>
          <div style={{ maxWidth:"900px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
              <p style={{ margin:"0 0 0.6rem", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.12em", color:"#FF6700", textTransform:"uppercase" }}>Đội Ngũ</p>
              <h2 style={{ margin:0, fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:900, color:"#1A1A1A", letterSpacing:"-0.03em" }}>Những Người Đứng Sau TechNext</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:"1.5rem" }}>
              {TEAM.map((m,i) => (
                <div key={m.name} className="tn-card-hover" style={{
                  background:"white", borderRadius:"24px",
                  padding:"2.5rem 1.5rem", textAlign:"center",
                  boxShadow:"0 4px 20px rgba(0,0,0,0.07)",
                  animation:`fadeUp 0.5s ${i*0.12}s ease both`,
                }}>
                  <div style={{
                    width:"80px", height:"80px", borderRadius:"50%",
                    background:m.bg,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    margin:"0 auto 1.25rem",
                    fontSize:"1.8rem", fontWeight:900, color:"white",
                    boxShadow:"0 8px 24px rgba(0,0,0,0.2)",
                  }}>
                    {m.initial}
                  </div>
                  <h3 style={{ margin:"0 0 0.3rem", fontSize:"1rem", fontWeight:800, color:"#1A1A1A" }}>{m.name}</h3>
                  <p style={{ margin:"0 0 1.25rem", fontSize:"0.8rem", color:"#FF6700", fontWeight:600 }}>{m.role}</p>
                  <div style={{
                    display:"inline-block",
                    background:"rgba(255,103,0,0.08)",
                    borderRadius:"999px",
                    padding:"0.3rem 0.85rem",
                    fontSize:"0.72rem", color:"#FF6700", fontWeight:700,
                  }}>TechNext Team</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* COMMITMENTS                                            */}
        {/* ══════════════════════════════════════════════════════ */}
        <section style={{ padding:"5rem 1.5rem", background:"white" }}>
          <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"3rem" }}>
              <p style={{ margin:"0 0 0.6rem", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.12em", color:"#FF6700", textTransform:"uppercase" }}>Cam Kết</p>
              <h2 style={{ margin:0, fontSize:"clamp(1.8rem,4vw,2.4rem)", fontWeight:900, color:"#1A1A1A", letterSpacing:"-0.03em" }}>Chúng Tôi Hứa Với Bạn</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"1rem" }}>
              {[
                { icon:"🛡️", text:"Bảo hành 12–24 tháng chính hãng" },
                { icon:"🔄", text:"1 đổi 1 trong 7 ngày nếu lỗi" },
                { icon:"🚚", text:"Giao hàng miễn phí từ 300k" },
                { icon:"💳", text:"Trả góp 0% qua thẻ tín dụng" },
                { icon:"📞", text:"Hỗ trợ kỹ thuật 24/7" },
                { icon:"📦", text:"Kho hàng TP.HCM, HN, ĐN" },
              ].map((c,i) => (
                <div key={c.text} className="tn-card-hover" style={{
                  display:"flex", flexDirection:"column", alignItems:"center", gap:"0.6rem",
                  padding:"1.5rem 1rem",
                  background:"#fafafa",
                  borderRadius:"16px",
                  border:"1px solid rgba(0,0,0,0.06)",
                  textAlign:"center",
                  animation:`fadeUp 0.5s ${i*0.08}s ease both`,
                }}>
                  <span style={{ fontSize:"1.8rem" }}>{c.icon}</span>
                  <span style={{ fontSize:"0.82rem", fontWeight:600, color:"#1A1A1A", lineHeight:1.5 }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* CTA                                                    */}
        {/* ══════════════════════════════════════════════════════ */}
        <section style={{
          padding:"5rem 1.5rem",
          background:"linear-gradient(135deg,#FF6700 0%,#e55b00 60%,#cc4e00 100%)",
          textAlign:"center", color:"white",
          position:"relative", overflow:"hidden",
        }}>
          <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"360px", height:"360px", borderRadius:"50%", background:"rgba(255,255,255,0.08)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-60px", left:"-60px", width:"280px", height:"280px", borderRadius:"50%", background:"rgba(0,0,0,0.1)", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <h2 style={{ margin:"0 0 0.75rem", fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, letterSpacing:"-0.03em" }}>
              Sẵn Sàng Nâng Cấp Công Nghệ?
            </h2>
            <p style={{ margin:"0 auto 2.5rem", maxWidth:"480px", fontSize:"1.05rem", color:"rgba(255,255,255,0.82)", lineHeight:1.7 }}>
              Khám phá hàng trăm sản phẩm chính hãng từ Apple, Samsung và Xiaomi.
              Bảo hành rõ ràng, giá minh bạch.
            </p>
            <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/products" className="tn-btn-white" style={{
                display:"inline-block", padding:"1rem 2.4rem",
                background:"white", color:"#FF6700",
                borderRadius:"999px", textDecoration:"none",
                fontWeight:800, fontSize:"0.95rem",
                boxShadow:"0 8px 28px rgba(0,0,0,0.2)",
              }}>
                Mua Sắm Ngay →
              </Link>
              <Link href="/lien-he" className="tn-btn-outline-white" style={{
                display:"inline-block", padding:"1rem 2.4rem",
                background:"transparent", color:"white",
                borderRadius:"999px", textDecoration:"none",
                fontWeight:700, fontSize:"0.95rem",
                border:"2px solid rgba(255,255,255,0.55)",
                transition:"border-color .2s, background .2s",
              }}>
                Liên Hệ Tư Vấn
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
