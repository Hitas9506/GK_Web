import Link from "next/link";

export default function Footer() {
  const currentYear = 2026;

  const footerLinks = {
    "Sản Phẩm": [
      { label: "Điện Thoại", href: "/products?category=dien-thoai" },
      { label: "Máy Tính Bảng", href: "/products?category=tablet" },
      { label: "Tai Nghe", href: "/products?category=tai-nghe" },
      { label: "Phụ Kiện", href: "/products?category=phu-kien" },
      { label: "Tất Cả Sản Phẩm", href: "/products" },
    ],
    "Hỗ Trợ": [
      { label: "Chính Sách Đổi Trả", href: "/chinh-sach-doi-tra" },
      { label: "So Sánh Điện Thoại", href: "/so-sanh-dien-thoai" },
      { label: "Liên Hệ", href: "/lien-he" },
      { label: "Giới Thiệu", href: "/about" },
    ],
    "Liên Hệ": [
      { label: "📍 123 Nguyễn Huệ, Q.1, TP.HCM", href: "#" },
      { label: "📞 1800 9999 (Miễn phí)", href: "#" },
      { label: "✉️ support@technext.vn", href: "#" },
      { label: "⏰ T2 – CN: 8:00 – 22:00", href: "#" },
    ],
  };

  return (
    <footer
      style={{
        background: "var(--color-accent)",
        color: "rgba(255,255,255,0.7)",
        padding: "3.5rem 1.5rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr",
          gap: "2rem",
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "var(--color-primary)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              📱
            </div>
            <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "white" }}>
              Tech<span style={{ color: "var(--color-primary)" }}>Next</span>
            </span>
          </div>
          <p
            style={{
              fontSize: "0.88rem",
              lineHeight: 1.7,
              maxWidth: "300px",
              marginBottom: "1.25rem",
            }}
          >
            Công nghệ đỉnh cao, giá cả hợp lý. TechNext mang đến những sản phẩm
            chính hãng từ các thương hiệu hàng đầu thế giới.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {["📘", "📸", "🐦", "📺"].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="footer-social"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4
              style={{
                color: "white",
                fontSize: "0.9rem",
                fontWeight: 700,
                marginBottom: "1rem",
                letterSpacing: "0.02em",
              }}
            >
              {title}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer-link"
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider + Bottom */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "2.5rem auto 0",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
          © {currentYear} TechNext. All rights reserved. Made with Next.js 16 ⚡
        </p>
        <div style={{ display: "flex", gap: "1.25rem" }}>
          {["Điều khoản", "Bảo mật", "Cookies"].map((t) => (
            <a
              key={t}
              href="#"
              className="footer-link"
              style={{
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                fontSize: "0.78rem",
                transition: "color 0.2s ease",
              }}
            >
              {t}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: var(--color-primary) !important; }
        .footer-social:hover { background: var(--color-primary) !important; transform: translateY(-2px); }
        @media (max-width: 767px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
