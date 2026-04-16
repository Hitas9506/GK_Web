import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--color-accent)",
        color: "rgba(255,255,255,0.8)",
        padding: "3rem 0 1.5rem",
        marginTop: "5rem",
      }}
    >
      <style>{`
        .footer-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;
          display: block;
          margin-bottom: 0.5rem;
        }
        .footer-link:hover { color: var(--color-primary); }
        .footer-social {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; transition: background 0.2s ease;
          cursor: pointer; text-decoration: none;
        }
        .footer-social:hover { background: rgba(200,169,110,0.3); }
      `}</style>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>👜</span>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "var(--color-primary)",
                }}
              >
                ShopNext
              </span>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
                marginBottom: "1rem",
              }}
            >
              Cửa hàng thời trang online – nơi phong cách gặp gỡ chất lượng.
              Hàng ngàn sản phẩm đa dạng, giao hàng toàn quốc.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {["📘", "📸", "🐦", "📺"].map((icon, i) => (
                <a key={i} href="#" className="footer-social">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: "1rem",
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Danh Mục
            </h4>
            <nav>
              {[
                { href: "/products?category=ao", label: "Áo" },
                { href: "/products?category=quan", label: "Quần" },
                { href: "/products?category=vay", label: "Váy & Đầm" },
                { href: "/products?category=phu-kien", label: "Phụ Kiện" },
                { href: "/products", label: "Xem Tất Cả" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  → {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: "1rem",
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Hỗ Trợ
            </h4>
            <nav>
              {[
                { href: "/about", label: "Về Chúng Tôi" },
                { href: "#", label: "Chính Sách Đổi Trả" },
                { href: "#", label: "Hướng Dẫn Size" },
                { href: "#", label: "Theo Dõi Đơn Hàng" },
                { href: "#", label: "Liên Hệ" },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="footer-link">
                  → {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: "1rem",
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Liên Hệ
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {[
                { icon: "📍", text: "123 Nguyễn Huệ, Q.1, TP.HCM" },
                { icon: "📞", text: "1800 1234 (Miễn phí)" },
                { icon: "✉️", text: "support@shopnext.vn" },
                { icon: "⏰", text: "Thứ 2 – CN: 8:00 – 22:00" },
              ].map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.4)",
              margin: 0,
            }}
          >
            © {currentYear} ShopNext. Được xây dựng bằng{" "}
            <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>
              Next.js
            </span>{" "}
            – Demo cho Tiểu Luận LTV & UD 503073.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <span>🔒 SSL Bảo mật</span>
            <span>🚀 Powered by Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
