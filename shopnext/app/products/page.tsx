import type { Metadata } from "next";
import { products, categories, getProductsByCategory } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Sản Phẩm",
  description:
    "Khám phá tất cả sản phẩm thời trang tại ShopNext – áo, quần, váy đầm và phụ kiện chất lượng cao.",
};

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const activeCategory = searchParams.category || "all";
  const filtered = getProductsByCategory(activeCategory);

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          color: "white",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.8rem)",
            fontWeight: 800,
            marginBottom: "0.5rem",
          }}
        >
          Tất Cả Sản Phẩm
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>
          {filtered.length} sản phẩm{" "}
          {activeCategory !== "all"
            ? `trong danh mục "${activeCategory}"`
            : ""}
        </p>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Category filters */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/products${cat.id === "all" ? "" : `?category=${cat.id}`}`}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "2rem",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                transition: "all 0.2s ease",
                background:
                  activeCategory === cat.id
                    ? "linear-gradient(135deg, #c8a96e, #a8854a)"
                    : "var(--color-muted)",
                color:
                  activeCategory === cat.id
                    ? "white"
                    : "var(--color-text)",
                border:
                  activeCategory === cat.id
                    ? "2px solid transparent"
                    : "2px solid var(--color-border)",
              }}
            >
              {cat.icon} {cat.name}{" "}
              <span
                style={{
                  opacity: 0.7,
                  fontSize: "0.75rem",
                }}
              >
                ({cat.id === "all" ? products.length : cat.count})
              </span>
            </a>
          ))}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem" }}>
              Không tìm thấy sản phẩm nào.
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
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
