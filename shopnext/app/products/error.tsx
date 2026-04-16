"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Products page error:", error);
  }, [error]);

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
      }}
    >
      <div style={{ fontSize: "4rem" }}>⚠️</div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)" }}>
        Đã xảy ra lỗi
      </h2>
      <p style={{ color: "var(--color-text-muted)" }}>
        Không thể tải danh sách sản phẩm. Vui lòng thử lại.
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={reset} className="btn-primary">
          Thử lại
        </button>
        <Link href="/" className="btn-outline">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
