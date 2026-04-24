import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import HeroCarousel from "@/components/HeroCarousel";
import FlashSaleCountdown from "@/components/FlashSaleCountdown";
import FlashSaleBannerHero from "@/components/FlashSaleBannerHero";
import FeaturedProducts from "@/components/FeaturedProducts";

/* ─── Category tiles ─────────────────────────────────────── */
const CAT_TILES = [
  { id: "dien-thoai", href: "/products?category=dien-thoai", label: "Điện Thoại",  icon: "📱", color: "#4F8EF7", bg: "#EEF4FF", count: "50+" },
  { id: "tablet",     href: "/products?category=tablet",     label: "Tablet",       icon: "📟", color: "#8B5CF6", bg: "#F3F0FF", count: "20+" },
];

/* ─── Flash sale items (static data so no "products" export needed) ─ */
const FLASH_ITEMS = [
  { id: "f1", name: "iPhone 17 Pro Max 256GB",    href: "/products/1",  originalPrice: 40_990_000, salePrice: 36_990_000, discount: 10, brand: "Apple",   bg: "linear-gradient(135deg,#2c2c2e,#1c1c1e)", image: "/images/products/iphone-17-pro-max/cam_vu_tru.jpg" },
  { id: "f2", name: "Xiaomi 17 Ultra 512GB",      href: "/products/7",  originalPrice: 35_190_000, salePrice: 31_190_000, discount: 11, brand: "Xiaomi",  bg: "linear-gradient(135deg,#1a0d00,#3d1a00)", image: "/images/products/xiaomi-17-ultra/den.png" },
  { id: "f3", name: "Galaxy S26 Ultra 256GB",     href: "/products/10", originalPrice: 35_690_000, salePrice: 30_690_000, discount: 14, brand: "Samsung", bg: "linear-gradient(135deg,#08122a,#1428A0)", image: "/images/products/samsung-galaxy-s26-ultra/default_1_1.jpg" },
  { id: "f4", name: "iPad Pro M5 Wi-Fi 256GB",    href: "/products/16", originalPrice: 31_190_000, salePrice: 28_190_000, discount: 10, brand: "Apple",   bg: "linear-gradient(135deg,#1a1a2e,#0f3460)",   image: "/images/products/ipad-pro-m5/bac.jpg" },
];

/* ─── Partner brands ─────────────────────────────────────── */
const BRANDS = [
  { name: "Apple",   bgColor: "#1A1A1A", textColor: "white",   shadow: "rgba(0,0,0,0.3)",     logo: "/apple_logo.svg",   logoFilter: "brightness(0) invert(1)", pillBg: "#1A1A1A", showName: true,  logoH: "32px" },
  { name: "Samsung", bgColor: "#1428A0", textColor: "white",   shadow: "rgba(20,40,160,0.3)", logo: "/samsung_logo.svg", logoFilter: "brightness(0) invert(1)", pillBg: "#1428A0", showName: false, logoH: "22px" },
  { name: "Xiaomi",  bgColor: "#FF6900", textColor: "#FF6900", shadow: "rgba(255,105,0,0.25)", logo: "/xiaomi_logo.svg",  logoFilter: "none",                   pillBg: "white",   showName: true,  logoH: "46px" },
];

/* ─── Testimonials ───────────────────────────────────────── */
const REVIEWS = [
  {
    name: "Nguyễn Văn Minh", avatar: "👨", stars: 5,
    product: "iPhone 16 Pro Max",
    text: "Máy đẹp, giao hàng nhanh trong ngày, đóng gói cẩn thận. Nhân viên tư vấn nhiệt tình, bảo hành rõ ràng. Sẽ tiếp tục ủng hộ TechNext!",
  },
  {
    name: "Trần Thị Lan", avatar: "👩", stars: 5,
    product: "Xiaomi 17 Ultra",
    text: "Mua hàng chính hãng, giá tốt hơn nhiều nơi khác. Camera siêu đỉnh, pin trâu. Shop phản hồi nhanh, hỗ trợ 24/7 rất uy tín.",
  },
  {
    name: "Phạm Quốc Hùng", avatar: "🧑", stars: 5,
    product: "Galaxy S25 Ultra",
    text: "Mua trả góp 0% rất tiện lợi. Máy zin nguyên seal, kèm đầy đủ phụ kiện. TechNext xứng đáng là địa chỉ mua điện thoại đáng tin cậy nhất.",
  },
];

/* ─── Blog articles ──────────────────────────────────────── */
const ARTICLES = [
  {
    tag: "Đánh Giá", tagColor: "#4F8EF7",
    title: "Xiaomi 17 Ultra vs iPhone 17 Pro: Camera nào ăn đứt?",
    desc: "Cuộc đối đầu giữa Leica UltraPure và hệ thống camera A19 Pro – kết quả bất ngờ.",
    date: "15/04/2025", readTime: "8 phút",
    iconBg: "linear-gradient(135deg,#1a0d00,#3d1a00)", icon: "📷",
  },
  {
    tag: "Top List", tagColor: "#22C55E",
    title: "Top 5 điện thoại Android tốt nhất 2025 dưới 15 triệu",
    desc: "Những chiếc điện thoại đáng mua nhất trong phân khúc tầm trung cao cấp năm 2025.",
    date: "10/04/2025", readTime: "6 phút",
    iconBg: "linear-gradient(135deg,#08122a,#1428A0)", icon: "🏆",
  },
  {
    tag: "Mẹo Hay", tagColor: "#F59E0B",
    title: "10 mẹo kéo dài tuổi thọ pin điện thoại của bạn",
    desc: "Những thói quen nhỏ mỗi ngày có thể giúp pin bền hơn tới 50%.",
    date: "05/04/2025", readTime: "5 phút",
    iconBg: "linear-gradient(135deg,#2c2c2e,#1c1c1e)", icon: "🔋",
  },
];

/* ─── Store policy cards ─────────────────────────────────── */
const POLICIES = [
  { title: "Giao Hàng Miễn Phí",  desc: "Miễn phí vận chuyển cho đơn từ 2 triệu đồng.",             color: "#4F8EF7", bg: "#EEF4FF",
    svg: <svg viewBox="0 0 48 48" width="36" height="36" fill="none"><rect x="2" y="16" width="30" height="20" rx="3" fill="#4F8EF7" opacity=".15"/><rect x="2" y="16" width="30" height="20" rx="3" stroke="#4F8EF7" strokeWidth="2"/><path d="M32 24h8l5 8v4h-13V24z" fill="#4F8EF7" opacity=".3"/><path d="M32 24h8l5 8v4h-13V24z" stroke="#4F8EF7" strokeWidth="2" strokeLinejoin="round"/><circle cx="13" cy="38" r="4" fill="#4F8EF7"/><circle cx="38" cy="38" r="4" fill="#4F8EF7"/><path d="M2 22h30" stroke="#4F8EF7" strokeWidth="2"/></svg> },
  { title: "Đổi Trả 7 Ngày",      desc: "1 đổi 1 nếu lỗi nhà sản xuất trong 7 ngày.",               color: "#22C55E", bg: "#EDFDF4",
    svg: <svg viewBox="0 0 48 48" width="36" height="36" fill="none"><path d="M8 24C8 15.16 15.16 8 24 8c5.2 0 9.8 2.44 12.8 6.24" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"/><path d="M40 24c0 8.84-7.16 16-16 16-5.2 0-9.8-2.44-12.8-6.24" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"/><path d="M34 6l4 8-8 1" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#22C55E" opacity=".4"/><path d="M14 42l-4-8 8-1" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#22C55E" opacity=".4"/></svg> },
  { title: "Bảo Hành 12 Tháng",   desc: "Bảo hành chính hãng 12 tháng toàn quốc.",                  color: "#F59E0B", bg: "#FFFBEB",
    svg: <svg viewBox="0 0 48 48" width="36" height="36" fill="none"><path d="M24 4L8 10v14c0 10.5 7.2 20.3 16 23 8.8-2.7 16-12.5 16-23V10L24 4z" fill="#F59E0B" opacity=".18" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round"/><path d="M16 24l5 5 10-10" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title: "Trả Góp 0%",          desc: "Hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng.",             color: "#EC4899", bg: "#FDF2F8",
    svg: <svg viewBox="0 0 48 48" width="36" height="36" fill="none"><rect x="4" y="10" width="40" height="28" rx="5" fill="#EC4899" opacity=".15" stroke="#EC4899" strokeWidth="2"/><rect x="4" y="18" width="40" height="7" fill="#EC4899" opacity=".25"/><rect x="10" y="30" width="10" height="3" rx="1.5" fill="#EC4899"/><rect x="24" y="30" width="6" height="3" rx="1.5" fill="#EC4899" opacity=".6"/></svg> },
];

/* ════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div style={{ paddingTop: "92px" }}>

      {/* ══════════════════════════════════════════════════════
          §1  HERO CAROUSEL
      ══════════════════════════════════════════════════════ */}
      <HeroCarousel />

      {/* ══════════════════════════════════════════════════════
          §2  CATEGORIES QUICK LINKS
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "2.5rem 1.5rem", background: "white" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FF6700", marginBottom: "0.4rem" }}>Khám Phá</p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1A1A1A", margin: 0, letterSpacing: "-0.02em" }}>Danh Mục Sản Phẩm</h2>
          </div>

          <div className="cat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1rem", maxWidth: "600px", margin: "0 auto" }}>
            {CAT_TILES.map(cat => (
              <Link
                key={cat.id}
                href={cat.href}
                className="cat-card"
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: "0.7rem", padding: "1.75rem 1rem",
                  borderRadius: "18px",
                  border: "1.5px solid rgba(0,0,0,0.07)",
                  textDecoration: "none",
                  background: "white",
                  transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
                }}
              >
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: cat.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "2rem",
                  border: `1.5px solid ${cat.color}22`,
                }}>{cat.icon}</div>
                <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1A1A1A" }}>{cat.label}</span>
                <span style={{
                  fontSize: "0.72rem", color: cat.color, fontWeight: 600,
                  background: cat.bg, padding: "0.2rem 0.65rem", borderRadius: "20px",
                }}>{cat.count} sản phẩm</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §3  FLASH SALE – BANNER HEADER STYLE
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181B" }}>

        {/* ── ANIMATED BANNER (ported from Figma) ── */}
        <FlashSaleBannerHero />

        {/* ── COUNTDOWN + "XEM TẤT CẢ" strip ── */}
        <div style={{
          background: "#111",
          padding: "0.85rem 2rem",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ color: "#aaa", fontSize: "0.8rem", fontWeight: 500 }}>⏰ Kết thúc sau:</span>
            <FlashSaleCountdown />
          </div>
          <Link href="/products" className="flash-all-link" style={{
            fontSize: "0.8rem", fontWeight: 600, color: "#FF6700",
            textDecoration: "none", border: "1.5px solid #FF6700",
            padding: "0.4rem 1rem", borderRadius: "8px",
            transition: "background 0.2s, color 0.2s",
          }}>Xem tất cả →</Link>
        </div>

        {/* ── PRODUCT CARDS GRID ── */}
        <div style={{ padding: "1.5rem 2rem 2.5rem", maxWidth: "1400px", margin: "0 auto" }}>
          <div className="flash-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem",
          }}>
            {FLASH_ITEMS.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className="flash-card"
                style={{
                  display: "block", textDecoration: "none",
                  borderRadius: "16px", overflow: "hidden",
                  background: "#27272A",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "transform 0.22s ease, box-shadow 0.22s ease",
                }}
              >
                {/* Product image */}
                <div style={{
                  position: "relative", aspectRatio: "1/1",
                  background: item.bg,
                  overflow: "hidden",
                }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: "contain", padding: "1rem" }}
                  />
                  <span style={{
                    position: "absolute", top: "10px", left: "10px",
                    background: "#FF6700", color: "white",
                    fontSize: "0.68rem", fontWeight: 900,
                    padding: "0.22rem 0.6rem", borderRadius: "20px",
                    zIndex: 2,
                  }}>-{item.discount}%</span>
                  <span style={{
                    position: "absolute", top: "10px", right: "10px",
                    background: "rgba(255,255,255,0.1)", color: "#ccc",
                    fontSize: "0.62rem", fontWeight: 600,
                    padding: "0.2rem 0.5rem", borderRadius: "6px",
                    zIndex: 2,
                  }}>{item.brand}</span>
                </div>
                {/* Info */}
                <div style={{ padding: "0.9rem 1rem 1.1rem" }}>
                  <p style={{ color: "white", fontWeight: 600, fontSize: "0.85rem", margin: "0 0 0.5rem", lineHeight: 1.3 }}>{item.name}</p>
                  <p style={{ color: "#FF6700", fontWeight: 900, fontSize: "1.05rem", margin: "0 0 0.2rem" }}>{formatPrice(item.salePrice)}</p>
                  <p style={{ color: "#666", fontSize: "0.76rem", margin: 0, textDecoration: "line-through" }}>{formatPrice(item.originalPrice)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes flashStar {
            0%, 100% { transform: scale(1) rotate(-5deg); }
            50% { transform: scale(1.18) rotate(8deg); }
          }
        `}</style>
      </section>


      {/* ══════════════════════════════════════════════════════
          §4  FEATURED PRODUCTS
      ══════════════════════════════════════════════════════ */}
      <FeaturedProducts />

      {/* ══════════════════════════════════════════════════════
          §5  PARTNER BRANDS
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "3.5rem 1.5rem", background: "white" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FF6700", marginBottom: "0.4rem" }}>
            Phân Phối Chính Hãng
          </p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1A1A1A", margin: "0 0 2.5rem", letterSpacing: "-0.02em" }}>
            Thương Hiệu Đối Tác
          </h2>

          {/* 3-column equal-width grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            maxWidth: "860px",
            margin: "0 auto",
          }}>
            {BRANDS.map(brand => (
              <Link
                key={brand.name}
                href={`/products?brand=${brand.name.toLowerCase()}`}
                className="brand-pill"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.55rem",
                  height: "110px",
                  background: brand.pillBg,
                  borderRadius: "20px",
                  textDecoration: "none",
                  boxShadow: `0 6px 24px ${brand.shadow}`,
                  border: brand.pillBg === "white" ? `2px solid ${brand.bgColor}22` : "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{
                    height: brand.logoH,
                    width: "auto",
                    maxWidth: "70%",
                    filter: brand.logoFilter,
                    objectFit: "contain",
                  }}
                />
                {brand.showName && (
                  <span style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "0.02em",
                    color: brand.textColor,
                  }}>{brand.name}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §6  CUSTOMER TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "4rem 1.5rem", background: "#f8f9fa" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FF6700", marginBottom: "0.4rem" }}>Khách Hàng Nói Gì</p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1A1A1A", margin: 0, letterSpacing: "-0.02em" }}>Đánh Giá Từ Khách Hàng</h2>
          </div>

          <div className="review-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
            {REVIEWS.map(r => (
              <div key={r.name} style={{
                background: "white", borderRadius: "18px",
                padding: "1.75rem",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.05)",
                display: "flex", flexDirection: "column", gap: "1rem",
              }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: "0.2rem" }}>
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <span key={i} style={{ color: "#FF6700", fontSize: "1rem" }}>★</span>
                  ))}
                </div>
                {/* Quote */}
                <p style={{
                  fontSize: "0.88rem", color: "#444", lineHeight: 1.65,
                  margin: 0, fontStyle: "italic",
                }}>&ldquo;{r.text}&rdquo;</p>
                {/* Customer */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "auto" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "linear-gradient(135deg,#FF6700,#FFB800)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.3rem", flexShrink: 0,
                  }}>{r.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1A1A1A", margin: 0 }}>{r.name}</p>
                    <p style={{ fontSize: "0.72rem", color: "#888", margin: "0.1rem 0 0" }}>Đã mua: {r.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §7  NEWS & TIPS
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "4rem 1.5rem", background: "white" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", marginBottom: "2rem",
            flexWrap: "wrap", gap: "1rem",
          }}>
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FF6700", marginBottom: "0.4rem" }}>Blog Công Nghệ</p>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1A1A1A", margin: 0, letterSpacing: "-0.02em" }}>Tin Tức &amp; Mẹo Hay</h2>
            </div>
            <Link href="/about" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#FF6700", textDecoration: "none" }}>
              Xem tất cả bài viết →
            </Link>
          </div>

          <div className="article-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
            {ARTICLES.map(a => (
              <Link
                key={a.title}
                href="/about"
                className="article-card"
                style={{
                  display: "block", textDecoration: "none",
                  borderRadius: "18px", overflow: "hidden",
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  transition: "transform 0.22s ease, box-shadow 0.22s ease",
                }}
              >
                {/* Image area */}
                <div style={{
                  height: "180px", background: a.iconBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "3.5rem",
                }}>{a.icon}</div>
                {/* Content */}
                <div style={{ padding: "1.25rem" }}>
                  <span style={{
                    background: a.tagColor + "18", color: a.tagColor,
                    fontSize: "0.68rem", fontWeight: 700,
                    padding: "0.22rem 0.65rem", borderRadius: "20px",
                    letterSpacing: "0.04em",
                  }}>{a.tag}</span>
                  <h3 style={{
                    fontSize: "0.95rem", fontWeight: 700, color: "#1A1A1A",
                    margin: "0.75rem 0 0.5rem", lineHeight: 1.4,
                    display: "-webkit-box", WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>{a.title}</h3>
                  <p style={{
                    fontSize: "0.8rem", color: "#666", lineHeight: 1.55,
                    margin: "0 0 1rem",
                    display: "-webkit-box", WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>{a.desc}</p>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.72rem", color: "#aaa" }}>
                    <span>📅 {a.date}</span>
                    <span>⏱ {a.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §8  ABOUT US
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: "5rem 1.5rem",
      }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "4rem", alignItems: "center",
        }} className="about-grid">

          {/* Image side */}
          <div style={{
            borderRadius: "24px", overflow: "hidden",
            background: "linear-gradient(135deg,#1e3a5f,#0f172a)",
            aspectRatio: "4/3",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
          }}>
            <div style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.6)",
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "0.75rem" }}>🏪</div>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" }}>[Ảnh cửa hàng TechNext]</p>
            </div>
            {/* Orange accent bar */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "4px",
              background: "linear-gradient(90deg,#FF6700,#FFB800)",
            }} />
          </div>

          {/* Text side */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FF6700", marginBottom: "0.6rem" }}>
              Về Chúng Tôi
            </p>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "white", margin: "0 0 1.25rem", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
              TechNext – Địa Chỉ Công Nghệ<br />Uy Tín Số 1
            </h2>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: "0 0 2rem" }}>
              Được thành lập từ năm 2015, TechNext tự hào là đơn vị phân phối điện thoại, tablet và phụ kiện công nghệ chính hãng hàng đầu Việt Nam.
              Chúng tôi cam kết mang đến sản phẩm 100% chính hãng, giá cạnh tranh và dịch vụ hậu mãi tận tâm.
            </p>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { value: "500+",  label: "Sản phẩm" },
                { value: "100K+", label: "Khách hàng" },
                { value: "50+",   label: "Thương hiệu" },
                { value: "9 năm", label: "Kinh nghiệm" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "1.4rem", fontWeight: 900, color: "#FF6700", margin: "0 0 0.2rem" }}>{s.value}</p>
                  <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/about" style={{
                padding: "0.75rem 1.75rem", borderRadius: "10px",
                background: "#FF6700", color: "white",
                fontWeight: 700, fontSize: "0.88rem",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}>
                Xem Thêm Về Chúng Tôi
              </Link>
              <Link href="/lien-he" style={{
                padding: "0.75rem 1.75rem", borderRadius: "10px",
                border: "1.5px solid rgba(255,255,255,0.25)", color: "white",
                fontWeight: 600, fontSize: "0.88rem",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}>
                Liên Hệ Ngay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §9  STORE POLICIES
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "4rem 1.5rem", background: "#f8f9fa" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FF6700", marginBottom: "0.4rem" }}>Cam Kết Của Chúng Tôi</p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1A1A1A", margin: 0, letterSpacing: "-0.02em" }}>Mua Sắm An Tâm – Hài Lòng Tuyệt Đối</h2>
          </div>

          <div className="policy-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem" }}>
            {POLICIES.map(p => (
              <div key={p.title} className="policy-card" style={{
                background: "white", borderRadius: "18px",
                padding: "2rem 1.5rem", textAlign: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.05)",
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
              }}>
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: p.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.2rem",
                  border: `1.5px solid ${p.color}22`,
                }}>{p.svg}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A1A", margin: "0 0 0.5rem" }}>{p.title}</h3>
                <p style={{ fontSize: "0.83rem", color: "#6B7280", lineHeight: 1.55, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          RESPONSIVE + HOVER STYLES
      ══════════════════════════════════════════════════════ */}
      <style>{`
        /* ── Hover effects (CSS only – server component safe) ── */
        .cat-card:hover    { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(0,0,0,0.10); border-color: #FF6700 !important; }
        .flash-card:hover  { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(0,0,0,0.25); }
        .prod-card:hover   { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(0,0,0,0.11); }
        .brand-pill:hover  { transform: translateY(-3px) scale(1.04); }
        .article-card:hover{ transform: translateY(-5px); box-shadow: 0 12px 32px rgba(0,0,0,0.10); }
        .policy-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.11); }
        .flash-all-link:hover { background: #FF6700 !important; color: white !important; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .feat-grid    { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 767px) {
          .cat-grid     { grid-template-columns: repeat(2,1fr) !important; }
          .flash-grid   { grid-template-columns: repeat(2,1fr) !important; }
          .feat-grid    { grid-template-columns: repeat(2,1fr) !important; }
          .review-grid  { grid-template-columns: 1fr !important; }
          .article-grid { grid-template-columns: 1fr !important; }
          .policy-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .about-grid   { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 480px) {
          .flash-grid   { grid-template-columns: 1fr !important; }
          .feat-grid    { grid-template-columns: 1fr !important; }
          .policy-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
