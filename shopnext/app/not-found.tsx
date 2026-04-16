import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 – Không Tìm Thấy Trang",
};

export default function NotFound() {
  return (
    <div
      style={{
        paddingTop: "70px",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        textAlign: "center",
        padding: "100px 1.5rem 3rem",
        background: "var(--color-muted)",
      }}
    >
      <div
        style={{
          fontSize: "7rem",
          lineHeight: 1,
          filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.1))",
        }}
      >
        😕
      </div>
      <div>
        <h1
          style={{
            fontSize: "5rem",
            fontWeight: 900,
            background: "linear-gradient(135deg, #c8a96e, #a8854a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            marginBottom: "0.5rem",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "0.75rem",
          }}
        >
          Trang này không tồn tại
        </h2>
        <p style={{ color: "var(--color-text-muted)", maxWidth: "420px" }}>
          Xin lỗi, trang bạn đang tìm kiếm đã bị xóa, đổi tên hoặc chưa bao
          giờ tồn tại.
        </p>
      </div>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn-primary">
          🏠 Về Trang Chủ
        </Link>
        <Link href="/products" className="btn-outline">
          🛍️ Xem Sản Phẩm
        </Link>
        <Link href="/search" className="btn-outline">
          🔍 Tìm Kiếm
        </Link>
      </div>
    </div>
  );
}
