import Link from "next/link";
import type { Metadata } from "next";
import { getFeaturedProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "ShopNext – Thời Trang Phong Cách",
  description:
    "Khám phá bộ sưu tập thời trang mới nhất tại ShopNext. Hàng ngàn sản phẩm chất lượng, giá tốt, giao hàng toàn quốc.",
};

// This page uses Static Site Generation (SSG)
// No revalidate = fully static at build time
export default function HomePage() {
  const featured = getFeaturedProducts();

  const heroStats = [
    { value: "10,000+", label: "Sản phẩm" },
    { value: "500K+", label: "Khách hàng" },
    { value: "98%", label: "Hài lòng" },
    { value: "24/7", label: "Hỗ trợ" },
  ];

  const categories = [
    { href: "/products?category=ao", icon: "👕", label: "Áo", bg: "#fef3e2" },
    {
      href: "/products?category=quan",
      icon: "👖",
      label: "Quần",
      bg: "#e8f4fd",
    },
    {
      href: "/products?category=vay",
      icon: "👗",
      label: "Váy & Đầm",
      bg: "#fce4ec",
    },
    {
      href: "/products?category=phu-kien",
      icon: "👜",
      label: "Phụ Kiện",
      bg: "#e8f5e9",
    },
  ];

  const features = [
    {
      icon: "🚚",
      title: "Miễn Phí Vận Chuyển",
      desc: "Đơn hàng từ 500K trở lên được miễn phí giao hàng toàn quốc.",
    },
    {
      icon: "🔄",
      title: "Đổi Trả 30 Ngày",
      desc: "Không hài lòng với sản phẩm? Đổi trả dễ dàng trong 30 ngày.",
    },
    {
      icon: "🔒",
      title: "Thanh Toán Bảo Mật",
      desc: "Thanh toán an toàn với SSL 256-bit, hỗ trợ nhiều phương thức.",
    },
    {
      icon: "✨",
      title: "Hàng Chính Hãng",
      desc: "100% sản phẩm chính hãng, cam kết chất lượng từ nhà sản xuất.",
    },
  ];

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "white",
          padding: "5rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,169,110,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,169,110,0.1) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
            position: "relative",
          }}
          className="hero-grid"
        >
          {/* Left side */}
          <div className="animate-fade-in-up">
            <span
              style={{
                display: "inline-block",
                background: "rgba(200,169,110,0.15)",
                color: "var(--color-primary)",
                padding: "0.35rem 1rem",
                borderRadius: "2rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                border: "1px solid rgba(200,169,110,0.3)",
              }}
            >
              ✨ Bộ sưu tập mới nhất 2025
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              Phong Cách{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #c8a96e, #f0d080)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Của Bạn
              </span>
              , <br />
              Xu Hướng Của Chúng Tôi
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7,
                marginBottom: "2rem",
                maxWidth: "480px",
              }}
            >
              Khám phá hàng ngàn sản phẩm thời trang được tuyển chọn kỹ lưỡng.
              Từ casual đến formal, chúng tôi có tất cả những gì bạn cần.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/products" className="btn-primary">
                Mua Sắm Ngay →
              </Link>
              <Link
                href="/about"
                style={{
                  padding: "0.75rem 1.75rem",
                  borderRadius: "0.5rem",
                  border: "2px solid rgba(255,255,255,0.3)",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  transition: "all 0.2s ease",
                }}
              >
                Tìm Hiểu Thêm
              </Link>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: "2rem",
                marginTop: "2.5rem",
                flexWrap: "wrap",
              }}
            >
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "var(--color-primary)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side – decorative image area */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="hero-image-col"
          >
            <div
              style={{
                position: "relative",
                width: "360px",
                height: "440px",
              }}
            >
              {/* Main card */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "24px",
                  background:
                    "linear-gradient(135deg, rgba(200,169,110,0.2), rgba(200,169,110,0.05))",
                  border: "1px solid rgba(200,169,110,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8rem",
                }}
              >
                👗
              </div>
              {/* Floating badge 1 */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "-20px",
                  background: "white",
                  color: "#1a1a2e",
                  padding: "0.6rem 1rem",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  animation: "fadeInUp 0.8s ease 0.3s both",
                }}
              >
                🔥 HOT SALE -30%
              </div>
              {/* Floating badge 2 */}
              <div
                style={{
                  position: "absolute",
                  bottom: "40px",
                  left: "-20px",
                  background: "var(--color-primary)",
                  color: "white",
                  padding: "0.6rem 1rem",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(200,169,110,0.4)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  animation: "fadeInUp 0.8s ease 0.6s both",
                }}
              >
                ✨ Hàng mới về mỗi tuần
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-image-col { display: none !important; }
          }
          .cat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.1);
          }
        `}</style>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section
        style={{
          padding: "4rem 1.5rem",
          background: "var(--color-muted)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 className="section-heading" style={{ display: "block" }}>
              Danh Mục Sản Phẩm
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1rem" }}>
              Tìm kiếm phong cách phù hợp với bạn
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                style={{ textDecoration: "none" }}
                className="cat-card-link"
              >
                <div
                  className="cat-card"
                  style={{
                    background: cat.bg,
                    borderRadius: "20px",
                    padding: "2rem 1rem",
                    textAlign: "center",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                    {cat.icon}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "var(--color-text)",
                    }}
                  >
                    {cat.label}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <h2 className="section-heading">Sản Phẩm Nổi Bật</h2>
              <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
                Tuyển chọn từ xu hướng mới nhất
              </p>
            </div>
            <Link href="/products" className="btn-outline">
              Xem Tất Cả →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== BANNER ===== */}
      <section
        style={{
          padding: "0 1.5rem",
          marginBottom: "4rem",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            background:
              "linear-gradient(135deg, #c8a96e 0%, #a8854a 50%, #8a6930 100%)",
            borderRadius: "24px",
            padding: "3rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.9rem",
                marginBottom: "0.25rem",
              }}
            >
              Ưu đãi đặc biệt
            </p>
            <h2
              style={{
                color: "white",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 800,
                marginBottom: "0.75rem",
              }}
            >
              Mua 2 Tặng 1 – Áo Hoodie & Áo Thun
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.95rem",
              }}
            >
              Áp dụng đến 30/04/2025 • Không giới hạn số lượng
            </p>
          </div>
          <Link
            href="/products?category=ao"
            style={{
              background: "white",
              color: "var(--color-primary-dark)",
              padding: "0.85rem 2rem",
              borderRadius: "0.6rem",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "0.95rem",
              whiteSpace: "nowrap",
              transition: "transform 0.2s ease",
            }}
          >
            Mua Ngay →
          </Link>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section
        style={{
          padding: "4rem 1.5rem",
          background: "var(--color-muted)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "1.75rem",
                  textAlign: "center",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                    color: "var(--color-text)",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
