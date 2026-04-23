import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 – Không Tìm Thấy",
  description: "Trang bạn tìm không tồn tại trên TechNext.",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1A1A1A, #2d2d2d)",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div>
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>📱</div>
        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 800,
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #FF6700, #FF9A3C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "2rem",
            maxWidth: "400px",
          }}
        >
          Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" className="btn-primary" style={{ background: "#FF6700" }}>
            🏠 Trang Chủ
          </Link>
          <Link href="/products" className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}>
            📱 Sản Phẩm
          </Link>
          <Link href="/search" className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}>
            🔍 Tìm Kiếm
          </Link>
        </div>
      </div>
    </div>
  );
}
