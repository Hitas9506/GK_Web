import type { Metadata } from "next";
import { getProductsByCategory, categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tất Cả Sản Phẩm",
  description:
    "Khám phá điện thoại, tablet, tai nghe và phụ kiện chính hãng tại TechNext. Giá tốt nhất, bảo hành chính hãng.",
};

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await props.searchParams;
  const activeCategory = category ?? "all";
  const products = getProductsByCategory(activeCategory);

  return (
    <div style={{ paddingTop: "92px" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1A1A1A, #2d2d2d)",
          color: "white",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            marginBottom: "0.5rem",
          }}
        >
          {activeCategory === "all"
            ? "Tất Cả Sản Phẩm"
            : categories.find((c) => c.id === activeCategory)?.name ??
              "Sản Phẩm"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>
          {products.length} sản phẩm
          {activeCategory !== "all" &&
            ` trong ${
              categories.find((c) => c.id === activeCategory)?.name ?? ""
            }`}
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "2rem 1.5rem 4rem",
        }}
      >
        {/* Category filter */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <Link
                key={cat.id}
                href={
                  cat.id === "all"
                    ? "/products"
                    : `/products?category=${cat.id}`
                }
                style={{
                  padding: "0.5rem 1.15rem",
                  borderRadius: "2rem",
                  border: isActive
                    ? "none"
                    : "2px solid var(--color-border)",
                  background: isActive
                    ? "var(--color-accent)"
                    : "white",
                  color: isActive ? "white" : "var(--color-text)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <span>{cat.icon}</span>
                {cat.name}
                <span
                  style={{
                    fontSize: "0.72rem",
                    opacity: 0.7,
                  }}
                >
                  ({cat.count})
                </span>
              </Link>
            );
          })}
        </div>

        {/* Products grid */}
        {products.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📱</div>
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              Không tìm thấy sản phẩm
            </h2>
            <p
              style={{
                color: "var(--color-text-muted)",
                marginBottom: "1.5rem",
              }}
            >
              Thử chọn danh mục khác nhé!
            </p>
            <Link href="/products" className="btn-primary">
              Xem tất cả →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
