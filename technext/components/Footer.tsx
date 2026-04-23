"use client";

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
            {([
              {
                href: "https://facebook.com/technext.vn",
                label: "Facebook",
                hoverBg: "#1877F2",
                svg: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                ),
              },
              {
                href: "https://tiktok.com/@technext.vn",
                label: "TikTok",
                hoverBg: "#010101",
                svg: (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                ),
              },
              {
                href: "https://zalo.me/technext",
                label: "Zalo",
                hoverBg: "#0068FF",
                bg: "white",
                svg: (
                  <img src="/zalo.png" alt="Zalo" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
                ),
              },
              {
                href: "mailto:support@technext.vn",
                label: "Gmail",
                hoverBg: "#EA4335",
                bg: "white",
                svg: (
                  <img src="/gmail.webp" alt="Gmail" style={{ width: "22px", height: "22px", objectFit: "contain" }} />
                ),
              },
            ] as { href: string; label: string; hoverBg: string; bg?: string; svg: React.ReactNode }[]).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-social"
                data-hover-bg={s.hoverBg}
                style={{
                  width: "36px", height: "36px",
                  borderRadius: "8px",
                  background: s.bg ?? s.hoverBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none",
                  transition: "filter 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.filter = "brightness(1.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.filter = "brightness(1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {s.svg}
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
