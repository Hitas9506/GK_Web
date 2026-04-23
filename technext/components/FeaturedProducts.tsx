import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";

/* ─── Brand config ───────────────────────────────────────── */
const BRANDS = [
  {
    id: "apple",
    label: "Apple",
    color: "#0071E3",
    logo: "/APPLE.svg",
    logoFilter: "brightness(0)",
    productIds: [1, 4, 3, 5],
    taglines: {
      1: "Thiết kế sáng tạo cho hiệu năng\nvà thời lượng pin vượt trội.",
      4: "iPhone mỏng nhất từng có.\nVới sức mạnh pro bên trong.",
      3: "Thú vị hơn hẳn.\nBền bỉ hơn hẳn.",
      5: "Đủ tính năng.\nĐẹp giá trị.",
    } as Record<number, string>,
    badges: { 5: "Mới" } as Record<number, string>,
  },
  {
    id: "xiaomi",
    label: "Xiaomi",
    color: "#FF6700",
    logo: "/XIAOMI.png",
    logoFilter: "none",
    productIds: [7, 6, 9, 8],
    taglines: {
      7: "Camera Leica đỉnh cao.\nSnapdragon 8 Elite Gen 5.",
      6: "Flagship gọn nhẹ.\nSnapdragon 8 Elite Gen 5.",
      9: "Cảm biến Leica 1 inch.\nHyperOS 2.",
      8: "Snapdragon 8 Elite.\nCamera Leica 50MP.",
    } as Record<number, string>,
    badges: { 7: "Hot", 6: "Mới" } as Record<number, string>,
  },
  {
    id: "samsung",
    label: "Samsung",
    color: "#1428A0",
    logo: "/SAMSUNG.svg",
    logoFilter: "brightness(0)",
    productIds: [10, 11, 13, 24],
    taglines: {
      10: "Galaxy AI thế hệ mới.\nS Pen tích hợp.",
      11: "Màn hình 6.3\" AMOLED.\nHiệu năng vượt trội.",
      13: "200MP ProVisual Engine.\nSnapdragon 8 Elite.",
      24: "Màn 14.6\" AMOLED.\nS Pen & 4 loa AKG.",
    } as Record<number, string>,
    badges: { 10: "Mới", 11: "Mới", 24: "Mới" } as Record<number, string>,
  },
];

function fmt(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

function ProductCard({
  product,
  tagline,
  badge,
  brandColor,
}: {
  product: Product;
  tagline: string;
  badge?: string;
  brandColor: string;
}) {
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
        background: "var(--color-muted)",
        aspectRatio: "4/3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 900px) 50vw, 25vw"
          style={{ objectFit: "contain", padding: "1rem" }}
        />
        {badge && (
          <span style={{
            position: "absolute", top: "14px", left: "14px",
            background: brandColor,
            color: "white", fontSize: "0.7rem", fontWeight: 700,
            padding: "0.22rem 0.65rem", borderRadius: "20px",
            zIndex: 2,
          }}>{badge}</span>
        )}
      </div>

      {/* Color swatches */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", paddingTop: "10px", flexWrap: "wrap", padding: "10px 12px 0" }}>
        {product.colors.map((c) => (
          <span key={c} title={c} style={{
            fontSize: "0.6rem", fontWeight: 600,
            padding: "0.1rem 0.4rem", borderRadius: "10px",
            background: "var(--color-muted)",
            color: "var(--color-text-muted)",
            whiteSpace: "nowrap",
          }}>{c}</span>
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
        }}>{product.name}</h3>

        <p style={{
          fontSize: "0.78rem", color: "#6E6E73",
          lineHeight: 1.55, margin: 0, whiteSpace: "pre-line",
        }}>{tagline}</p>

        <p style={{
          fontSize: "0.85rem", fontWeight: 600,
          color: "#1D1D1F", margin: "0.2rem 0 0",
        }}>
          Từ {fmt(product.price)}
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: "1.2rem", marginTop: "0.6rem",
          flexWrap: "wrap", justifyContent: "center",
        }}>
          <Link href={`/products/${product.id}`} className="feat-cta-primary" style={{
            background: brandColor, color: "white",
            fontSize: "0.8rem", fontWeight: 600,
            padding: "0.48rem 1.2rem", borderRadius: "30px",
            textDecoration: "none", whiteSpace: "nowrap",
          }}>
            Tìm hiểu thêm
          </Link>
          <Link href={`/products/${product.id}`} style={{
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

export default function FeaturedProducts() {
  const productMap = new Map(products.map(p => [p.id, p]));

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
              {brand.productIds.map(pid => {
                const p = productMap.get(pid);
                if (!p) return null;
                return (
                  <ProductCard
                    key={pid}
                    product={p}
                    tagline={brand.taglines[pid] ?? ""}
                    badge={brand.badges[pid]}
                    brandColor={brand.color}
                  />
                );
              })}
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
