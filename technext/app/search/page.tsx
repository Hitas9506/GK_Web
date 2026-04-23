"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const results = query.trim() ? searchProducts(query) : [];
  const hasQuery = query.trim().length > 0;

  const popularTags = ["iPhone", "Samsung", "Xiaomi", "Tai nghe", "Tablet", "Sạc nhanh"];

  return (
    <div style={{ paddingTop: "92px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1A1A1A, #2d2d2d)", color: "white", padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>🔍 Tìm Kiếm Sản Phẩm</h1>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm điện thoại, tablet, tai nghe..."
            style={{
              width: "100%",
              padding: "0.9rem 1.25rem",
              borderRadius: "12px",
              border: "2px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              fontSize: "1rem",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        {/* Popular tags */}
        {!hasQuery && (
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.9rem" }}>🔥 Tìm kiếm phổ biến:</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  style={{
                    padding: "0.45rem 1rem",
                    borderRadius: "2rem",
                    border: "2px solid var(--color-border)",
                    background: "white",
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: "0.84rem",
                    color: "var(--color-text)",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {hasQuery && (
          <p style={{ marginBottom: "1.25rem", color: "var(--color-text-muted)" }}>
            Tìm thấy <strong style={{ color: "var(--color-text)" }}>{results.length}</strong> kết quả cho &ldquo;<strong>{query}</strong>&rdquo;
          </p>
        )}

        {hasQuery && results.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {hasQuery && results.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📱</div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>Không tìm thấy sản phẩm</h2>
            <p style={{ color: "var(--color-text-muted)" }}>Thử từ khóa khác nhé! Ví dụ: &ldquo;Xiaomi 17&rdquo;, &ldquo;AirPods&rdquo;...</p>
          </div>
        )}

        {!hasQuery && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>Bạn muốn tìm gì?</h2>
            <p style={{ color: "var(--color-text-muted)" }}>Nhập tên sản phẩm, thương hiệu hoặc thông số kỹ thuật</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: "92px", textAlign: "center", padding: "4rem" }}>Đang tải...</div>}>
      <SearchContent />
    </Suspense>
  );
}
