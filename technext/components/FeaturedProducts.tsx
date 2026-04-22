import Link from "next/link";

/* ─── Brand + product data ───────────────────────────────── */
const BRANDS = [
  {
    id: "apple",
    label: "Apple",
    color: "#0071E3",
    logo: "/APPLE.svg",
    logoFilter: "brightness(0)",
    items: [
      {
        id: 1, name: "iPhone 17 Pro Max",
        tagline: "Thiết kế sáng tạo cho hiệu năng\nvà thời lượng pin vượt trội.",
        price: 34_990_000,
        colors: ["#C0A882", "#2C2C2E", "#A8B5C8", "#FAFAFA"],
        bg: "linear-gradient(160deg, #3D2B1F 0%, #8B6914 60%, #C4942A 100%)",
        icon: "📱",
      },
      {
        id: 4, name: "iPhone Air",
        tagline: "iPhone mỏng nhất từng có.\nVới sức mạnh pro bên trong.",
        price: 23_990_000,
        colors: ["#2C2C2E", "#FAFAFA", "#F4A5B0", "#87CEEB"],
        bg: "linear-gradient(160deg, #D0E8F8 0%, #A0C8E8 60%, #78B0D8 100%)",
        icon: "📱",
      },
      {
        id: 3, name: "iPhone 17",
        tagline: "Thú vị hơn hẳn.\nBền bỉ hơn hẳn.",
        price: 22_990_000,
        colors: ["#2C2C2E", "#FAFAFA", "#C8B0D8", "#90C090", "#87CEEB"],
        bg: "linear-gradient(160deg, #EAE0F5 0%, #C8B0E0 60%, #B098CC 100%)",
        icon: "📱",
      },
      {
        id: 5, name: "iPhone 17e",
        tagline: "Đủ tính năng.\nĐẹp giá trị.",
        price: 17_990_000,
        badge: "Mới", badgeColor: "#FF6700",
        colors: ["#2C2C2E", "#FAFAFA", "#87CEEB", "#FF6347"],
        bg: "linear-gradient(160deg, #FDE8F0 0%, #F0C0D4 60%, #E8A8C0 100%)",
        icon: "📱",
      },
    ],
  },
  {
    id: "xiaomi",
    label: "Xiaomi",
    color: "#FF6700",
    logo: "/XIAOMI.png",
    logoFilter: "none",
    items: [
      {
        id: 6, name: "Xiaomi 17 Ultra",
        tagline: "Camera Leica đỉnh cao.\nSnapdragon 8 Elite Gen 2.",
        price: 29_990_000,
        badge: "Hot", badgeColor: "#CC0000",
        colors: ["#2C2C2E", "#FAFAFA", "#2F4F2F"],
        bg: "linear-gradient(160deg, #1A1A1A 0%, #3D2010 60%, #5A3018 100%)",
        icon: "📱",
      },
      {
        id: 7, name: "Xiaomi 17",
        tagline: "Flagship gọn nhẹ.\nMỏng nhất 7.8mm.",
        price: 22_990_000,
        badge: "Mới", badgeColor: "#FF6700",
        colors: ["#2C2C2E", "#FAFAFA", "#1E3A5F"],
        bg: "linear-gradient(160deg, #1A2232 0%, #2A3A52 60%, #1E3060 100%)",
        icon: "📱",
      },
      {
        id: 8, name: "Xiaomi 15 Ultra",
        tagline: "Cảm biến Leica 1 inch.\nCeramic cao cấp.",
        price: 24_990_000,
        colors: ["#2C2C2E", "#FAFAFA", "#2F4F4F"],
        bg: "linear-gradient(160deg, #282828 0%, #404040 60%, #525252 100%)",
        icon: "📱",
      },
      {
        id: 9, name: "Xiaomi 15",
        tagline: "Snapdragon 8 Elite.\nCamera Leica 50MP.",
        price: 18_990_000,
        colors: ["#2C2C2E", "#FAFAFA", "#FFB6C1"],
        bg: "linear-gradient(160deg, #1A2A1A 0%, #2A4030 60%, #1E3820 100%)",
        icon: "📱",
      },
    ],
  },
  {
    id: "samsung",
    label: "Samsung",
    color: "#1428A0",
    logo: "/SAMSUNG.svg",
    logoFilter: "brightness(0)",
    items: [
      {
        id: 10, name: "Galaxy S26 Ultra",
        tagline: "Galaxy AI thế hệ mới.\nS Pen tích hợp.",
        price: 36_990_000,
        badge: "Mới", badgeColor: "#1428A0",
        colors: ["#2C2C2E", "#8A9BA8", "#1428A0", "#FAFAFA"],
        bg: "linear-gradient(160deg, #0A0A1A 0%, #0D1870 60%, #1428A0 100%)",
        icon: "📱",
      },
      {
        id: 11, name: "Galaxy S26+",
        tagline: "Màn hình 6.7\" AMOLED.\nHiệu năng vượt trội.",
        price: 29_990_000,
        badge: "Mới", badgeColor: "#1428A0",
        colors: ["#2C2C2E", "#FAFAFA", "#87CEEB", "#F4A5B0"],
        bg: "linear-gradient(160deg, #181828 0%, #24244A 60%, #1E2040 100%)",
        icon: "📱",
      },
      {
        id: 13, name: "Galaxy S25 Ultra",
        tagline: "200MP ProVisual Engine.\nSnapdragon 8 Elite.",
        price: 31_990_000,
        colors: ["#2C2C2E", "#8A9BA8", "#1428A0", "#FAFAFA"],
        bg: "linear-gradient(160deg, #1A1A2A 0%, #1428A0 60%, #1E38C0 100%)",
        icon: "📱",
      },
      {
        id: 24, name: "Tab S11 Ultra 5G",
        tagline: "Màn 14.6\" AMOLED.\nS Pen & 4 loa AKG.",
        price: 30_990_000,
        badge: "Mới", badgeColor: "#1428A0",
        colors: ["#5A5A5A", "#FAFAFA"],
        bg: "linear-gradient(160deg, #1A1A1A 0%, #2E2E2E 60%, #3A3A3A 100%)",
        icon: "📲",
      },
    ],
  },
];

/* ─── Helpers ────────────────────────────────────────────── */
function fmt(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

/* ─── Single product card (Server-safe, no handlers) ─────── */
type Item = typeof BRANDS[number]["items"][number];

function ProductCard({ item, brandColor }: { item: Item; brandColor: string }) {
  return (
    <div className="feat-card" style={{
      background: "white",
      borderRadius: "22px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
      border: "1px solid rgba(0,0,0,0.06)",
      transition: "transform 0.22s ease, box-shadow 0.22s ease",
    }}>
      {/* Image area */}
      <div style={{
        background: item.bg,
        aspectRatio: "4/3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <span style={{ fontSize: "5rem", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))" }}>
          {item.icon}
        </span>
        {"badge" in item && item.badge && (
          <span style={{
            position: "absolute", top: "14px", left: "14px",
            background: ("badgeColor" in item ? item.badgeColor : "#FF6700") as string,
            color: "white", fontSize: "0.7rem", fontWeight: 700,
            padding: "0.22rem 0.65rem", borderRadius: "20px",
          }}>{item.badge}</span>
        )}
      </div>

      {/* Color swatches */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", paddingTop: "10px" }}>
        {item.colors.map((c, i) => (
          <div key={i} style={{
            width: "10px", height: "10px", borderRadius: "50%",
            background: c, border: "1.5px solid rgba(0,0,0,0.12)", flexShrink: 0,
          }} />
        ))}
      </div>

      {/* Text */}
      <div style={{
        padding: "0.85rem 1.25rem 1.4rem",
        textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "0.45rem", flex: 1,
      }}>
        <h3 style={{
          fontSize: "1rem", fontWeight: 700,
          color: "#1D1D1F", margin: 0, letterSpacing: "-0.01em",
        }}>{item.name}</h3>

        <p style={{
          fontSize: "0.78rem", color: "#6E6E73",
          lineHeight: 1.55, margin: 0, whiteSpace: "pre-line",
        }}>{item.tagline}</p>

        <p style={{
          fontSize: "0.85rem", fontWeight: 600,
          color: "#1D1D1F", margin: "0.2rem 0 0",
        }}>
          Từ {fmt(item.price)}
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: "1.2rem", marginTop: "0.6rem",
          flexWrap: "wrap", justifyContent: "center",
        }}>
          <Link href={`/products/${item.id}`} className="feat-cta-primary" style={{
            background: brandColor, color: "white",
            fontSize: "0.8rem", fontWeight: 600,
            padding: "0.48rem 1.2rem", borderRadius: "30px",
            textDecoration: "none", whiteSpace: "nowrap",
          }}>
            Tìm hiểu thêm
          </Link>
          <Link href={`/products/${item.id}`} style={{
            color: brandColor, fontSize: "0.8rem",
            fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap",
          }}>
            Mua &rsaquo;
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main section (Server Component — no client needed) ─── */
export default function FeaturedProducts() {
  return (
    <section style={{ padding: "4rem 1.5rem", background: "#F5F5F7" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#FF6700", marginBottom: "0.4rem",
          }}>Bán Chạy Nhất</p>
          <h2 style={{
            fontSize: "1.7rem", fontWeight: 800,
            color: "#1D1D1F", margin: 0, letterSpacing: "-0.02em",
          }}>Sản Phẩm Nổi Bật</h2>
        </div>

        {/* One block per brand */}
        {BRANDS.map((brand, bi) => (
          <div key={brand.id} style={{ marginBottom: bi < BRANDS.length - 1 ? "3.5rem" : 0 }}>

            {/* Brand row header */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "4px", height: "22px",
                  background: brand.color, borderRadius: "4px",
                }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo}
                  alt={brand.label}
                  style={{
                    height: "22px", width: "auto",
                    objectFit: "contain",
                    filter: brand.logoFilter,
                  }}
                />
                <span style={{
                  fontSize: "1.15rem", fontWeight: 800,
                  color: "#1D1D1F", letterSpacing: "-0.01em",
                }}>{brand.label}</span>
              </div>
              <Link href={`/products?brand=${brand.id}`} style={{
                fontSize: "0.82rem", fontWeight: 600,
                color: brand.color, textDecoration: "none",
              }}>
                Xem tất cả →
              </Link>
            </div>

            {/* 4-column product grid */}
            <div className="feat-brand-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.25rem",
            }}>
              {brand.items.map(item => (
                <ProductCard key={item.id} item={item} brandColor={brand.color} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .feat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.13) !important;
        }
        .feat-cta-primary:hover { opacity: 0.82; }
        @media (max-width: 900px) {
          .feat-brand-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .feat-brand-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
