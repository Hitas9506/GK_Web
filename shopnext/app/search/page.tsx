"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);

  const results = useMemo(
    () => (query.trim() ? searchProducts(query) : []),
    [query]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputValue);
    router.replace(`/search?q=${encodeURIComponent(inputValue)}`, {
      scroll: false,
    });
  };

  const popularTags = [
    "Áo thun", "Hoodie", "Jean", "Váy", "Túi tote", "Phụ kiện",
  ];

  return (
    <div style={{ paddingTop: "70px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          color: "white",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1.5rem" }}
        >
          🔍 Tìm Kiếm Sản Phẩm
        </h1>
        <form
          onSubmit={handleSearch}
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              // Real-time search
              setQuery(e.target.value);
            }}
            placeholder="Tìm kiếm áo, quần, váy, phụ kiện..."
            autoFocus
            style={{
              flex: 1,
              padding: "0.75rem 1.25rem",
              borderRadius: "0.6rem",
              border: "2px solid rgba(200,169,110,0.3)",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <button type="submit" className="btn-primary">
            Tìm
          </button>
        </form>

        {/* Popular tags */}
        <div
          style={{
            marginTop: "1.25rem",
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Phổ biến:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setInputValue(tag);
                setQuery(tag);
              }}
              style={{
                background: "rgba(200,169,110,0.15)",
                color: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(200,169,110,0.3)",
                padding: "0.2rem 0.8rem",
                borderRadius: "2rem",
                fontSize: "0.78rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "2rem 1.5rem 4rem",
        }}
      >
        {query.trim() ? (
          <>
            <p
              style={{
                color: "var(--color-text-muted)",
                marginBottom: "1.5rem",
                fontSize: "0.9rem",
              }}
            >
              {results.length > 0
                ? `Tìm thấy ${results.length} kết quả cho "${query}"`
                : `Không tìm thấy kết quả nào cho "${query}"`}
            </p>
            {results.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>😔</div>
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "1.05rem",
                    marginBottom: "1rem",
                  }}
                >
                  Thử tìm với từ khóa khác nhé!
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔎</div>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem" }}>
              Gõ từ khóa để tìm sản phẩm bạn muốn
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: "150px", textAlign: "center" }}>Đang tải...</div>}>
      <SearchContent />
    </Suspense>
  );
}
