"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Trang Chủ" },
    { href: "/products", label: "Sản Phẩm" },
    { href: "/products?category=ao", label: "Áo" },
    { href: "/products?category=quan", label: "Quần" },
    { href: "/products?category=vay", label: "Váy & Đầm" },
    { href: "/about", label: "Giới Thiệu" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(200,169,110,0.2)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #c8a96e, #a8854a)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              👜
            </div>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #c8a96e, #1a1a2e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              ShopNext
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              style={{
                padding: "0.5rem 0.9rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                color: "var(--color-text)",
                fontSize: "0.88rem",
                fontWeight: 500,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color =
                  "var(--color-primary)";
                (e.target as HTMLAnchorElement).style.background =
                  "rgba(200,169,110,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color =
                  "var(--color-text)";
                (e.target as HTMLAnchorElement).style.background =
                  "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Search */}
          <Link
            href="/search"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: "var(--color-text)",
              background: "var(--color-muted)",
              transition: "all 0.2s ease",
              fontSize: "1.1rem",
            }}
            title="Tìm kiếm"
          >
            🔍
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            style={{
              position: "relative",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: "var(--color-text)",
              background: "var(--color-muted)",
              transition: "all 0.2s ease",
              fontSize: "1.1rem",
            }}
            title="Giỏ hàng"
          >
            🛒
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  background: "linear-gradient(135deg, #c8a96e, #a8854a)",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "pulse-dot 2s infinite",
                }}
              >
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              border: "none",
              background: "var(--color-muted)",
              cursor: "pointer",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "white",
            borderTop: "1px solid var(--color-border)",
            padding: "1rem 1.5rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label + "-mobile"}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "0.75rem 0",
                textDecoration: "none",
                color: "var(--color-text)",
                fontWeight: 500,
                borderBottom: "1px solid var(--color-border)",
                fontSize: "0.95rem",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
