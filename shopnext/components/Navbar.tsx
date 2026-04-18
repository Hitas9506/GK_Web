"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Hydration fix: only show client-side data (cart count) after mount
  useEffect(() => setMounted(true), []);

  // Bug 7 fix: close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    { href: "/orders", label: "Đơn Hàng" },
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
            style={{ width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "var(--color-text)", background: "var(--color-muted)", transition: "all 0.2s ease", fontSize: "1.1rem" }}
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
            {mounted && totalItems > 0 && (
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

          {/* User / Login */}
          {user ? (
            <div style={{ position: "relative" }} ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid var(--color-primary)", background: "rgba(200,169,110,0.12)", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                title={user.name}
              >
                {user.avatar}
              </button>
              {userMenuOpen && (
                <div style={{ position: "absolute", right: 0, top: "48px", background: "white", border: "1px solid var(--color-border)", borderRadius: "14px", boxShadow: "0 12px 36px rgba(0,0,0,0.12)", minWidth: "200px", zIndex: 100, overflow: "hidden" }}>
                  <div style={{ padding: "0.9rem 1rem", borderBottom: "1px solid var(--color-border)" }}>
                    <p style={{ fontWeight: 700, fontSize: "0.88rem", margin: 0, color: "var(--color-text)" }}>{user.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: "0.15rem 0 0" }}>{user.email}</p>
                  </div>
                  <Link href="/profile" onClick={() => setUserMenuOpen(false)} style={{ display: "block", padding: "0.75rem 1rem", textDecoration: "none", color: "var(--color-text)", fontSize: "0.88rem", fontWeight: 500, transition: "background 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-muted)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >👤 Thông tin cá nhân</Link>
                  <Link href="/orders" onClick={() => setUserMenuOpen(false)} style={{ display: "block", padding: "0.75rem 1rem", textDecoration: "none", color: "var(--color-text)", fontSize: "0.88rem", fontWeight: 500, transition: "background 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-muted)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >📦 Đơn hàng của tôi</Link>
                  <button onClick={() => { logout(); setUserMenuOpen(false); }} style={{ width: "100%", padding: "0.75rem 1rem", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", color: "#ff4757", fontSize: "0.88rem", fontWeight: 600, borderTop: "1px solid var(--color-border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f5")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >🚪 Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" style={{ padding: "0.45rem 1rem", borderRadius: "8px", border: "2px solid var(--color-primary)", color: "var(--color-primary)", fontSize: "0.82rem", fontWeight: 700, textDecoration: "none", transition: "all 0.2s ease", whiteSpace: "nowrap" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-primary)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-primary)"; }}
            >Đăng nhập</Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ width: "40px", height: "40px", borderRadius: "8px", border: "none", background: "var(--color-muted)", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}
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
