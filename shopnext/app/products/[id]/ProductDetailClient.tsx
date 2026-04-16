"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/lib/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "size" | "review">(
    "desc"
  );
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1rem 1.5rem",
          display: "flex",
          gap: "0.5rem",
          fontSize: "0.85rem",
          color: "var(--color-text-muted)",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Trang chủ</Link>
        <span>/</span>
        <Link href="/products" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Sản phẩm</Link>
        <span>/</span>
        <span style={{ color: "var(--color-text)" }}>{product.name}</span>
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1rem 1.5rem 3rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "start",
        }}
        className="detail-grid"
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            aspectRatio: "4/5",
            borderRadius: "20px",
            overflow: "hidden",
            background: "var(--color-muted)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            onError={(e) => {
              const t = e.currentTarget as HTMLImageElement;
              t.style.display = "none";
              const parent = t.parentElement;
              if (parent) {
                parent.style.background =
                  "linear-gradient(135deg, #f7f4f0, #e8e0d5)";
                parent.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:8rem">👗</div>`;
              }
            }}
          />
          {product.badge && (
            <span
              className={`badge badge-${product.badge}`}
              style={{ position: "absolute", top: "20px", left: "20px", fontSize: "0.8rem", padding: "0.35rem 0.9rem" }}
            >
              {product.badge === "hot" ? "🔥 HOT" : product.badge === "sale" ? "💚 SALE" : "✨ NEW"}
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <p
            style={{
              color: "var(--color-primary)",
              fontWeight: 600,
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.5rem",
            }}
          >
            {product.category.replace("-", " ")}
          </p>
          <h1
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "var(--color-text)",
              lineHeight: 1.3,
              marginBottom: "1rem",
            }}
          >
            {product.name}
          </h1>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
            }}
          >
            <span className="stars">
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              {product.rating}/5 • {product.reviewCount} đánh giá
            </span>
          </div>

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: "var(--color-primary)",
              }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span
                  style={{
                    fontSize: "1.1rem",
                    color: "var(--color-text-muted)",
                    textDecoration: "line-through",
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
                {discount && (
                  <span
                    style={{
                      background: "#ff4757",
                      color: "white",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                    }}
                  >
                    -{discount}%
                  </span>
                )}
              </>
            )}
          </div>

          {/* Size */}
          <div style={{ marginBottom: "1.25rem" }}>
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "var(--color-text)",
              }}
            >
              Kích cỡ:{" "}
              <span style={{ color: "var(--color-primary)" }}>{selectedSize}</span>
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    minWidth: "48px",
                    padding: "0.4rem 0.75rem",
                    borderRadius: "8px",
                    border: selectedSize === size
                      ? "2px solid var(--color-primary)"
                      : "2px solid var(--color-border)",
                    background: selectedSize === size
                      ? "rgba(200,169,110,0.1)"
                      : "white",
                    color: selectedSize === size
                      ? "var(--color-primary)"
                      : "var(--color-text)",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div style={{ marginBottom: "1.25rem" }}>
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "var(--color-text)",
              }}
            >
              Màu sắc:{" "}
              <span style={{ color: "var(--color-primary)" }}>{selectedColor}</span>
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    padding: "0.4rem 0.9rem",
                    borderRadius: "2rem",
                    border: selectedColor === color
                      ? "2px solid var(--color-primary)"
                      : "2px solid var(--color-border)",
                    background: selectedColor === color
                      ? "rgba(200,169,110,0.1)"
                      : "white",
                    color: selectedColor === color
                      ? "var(--color-primary)"
                      : "var(--color-text)",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Số lượng:</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "2px solid var(--color-border)",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{
                  width: "36px",
                  height: "36px",
                  border: "none",
                  background: "var(--color-muted)",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  transition: "background 0.2s ease",
                }}
              >
                −
              </button>
              <span
                style={{
                  width: "48px",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                style={{
                  width: "36px",
                  height: "36px",
                  border: "none",
                  background: "var(--color-muted)",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  transition: "background 0.2s ease",
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <button
              onClick={handleAddToCart}
              className="btn-primary"
              style={{ flex: 1, justifyContent: "center", minWidth: "160px" }}
            >
              {added ? "✓ Đã thêm vào giỏ!" : "🛒 Thêm vào giỏ hàng"}
            </button>
            <Link
              href="/cart"
              className="btn-outline"
              style={{ flex: 1, justifyContent: "center", minWidth: "120px", textDecoration: "none" }}
            >
              Xem giỏ hàng →
            </Link>
          </div>

          {/* Highlights */}
          <div
            style={{
              background: "var(--color-muted)",
              borderRadius: "12px",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {[
              "✅ Hàng chính hãng, đảm bảo chất lượng",
              "🚚 Miễn phí giao hàng đơn từ 500K",
              "🔄 Đổi trả trong 30 ngày",
              "🔒 Thanh toán bảo mật 256-bit SSL",
            ].map((item) => (
              <p
                key={item}
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                  margin: 0,
                }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem 3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            borderBottom: "2px solid var(--color-border)",
            marginBottom: "1.5rem",
          }}
        >
          {(
            [
              { key: "desc", label: "Mô tả sản phẩm" },
              { key: "size", label: "Hướng dẫn size" },
              { key: "review", label: `Đánh giá (${product.reviewCount})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontWeight: activeTab === tab.key ? 700 : 500,
                color:
                  activeTab === tab.key
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
                borderBottom:
                  activeTab === tab.key
                    ? "2px solid var(--color-primary)"
                    : "2px solid transparent",
                marginBottom: "-2px",
                fontSize: "0.9rem",
                transition: "all 0.2s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "desc" && (
          <div
            style={{
              lineHeight: 1.8,
              color: "var(--color-text-muted)",
              maxWidth: "700px",
              fontSize: "0.95rem",
            }}
          >
            <p>{product.description}</p>
          </div>
        )}
        {activeTab === "size" && (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                borderCollapse: "collapse",
                minWidth: "400px",
                fontSize: "0.875rem",
              }}
            >
              <thead>
                <tr style={{ background: "var(--color-muted)" }}>
                  {["Size", "Chiều cao", "Cân nặng", "Số đo ngực", "Số đo eo"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "left",
                        fontWeight: 600,
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["XS", "150-155cm", "42-47kg", "78-82cm", "60-64cm"],
                  ["S", "155-160cm", "47-52kg", "82-86cm", "64-68cm"],
                  ["M", "160-165cm", "52-57kg", "86-90cm", "68-72cm"],
                  ["L", "165-170cm", "57-62kg", "90-94cm", "72-76cm"],
                  ["XL", "170-175cm", "62-67kg", "94-98cm", "76-80cm"],
                ].map((row) => (
                  <tr
                    key={row[0]}
                    style={{ borderBottom: "1px solid var(--color-border)" }}
                  >
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        style={{
                          padding: "0.65rem 1rem",
                          color: i === 0 ? "var(--color-primary)" : "var(--color-text-muted)",
                          fontWeight: i === 0 ? 700 : 400,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "review" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "600px" }}>
            {[
              { name: "Nguyễn Thị Lan", rating: 5, comment: "Sản phẩm rất đẹp, chất lượng tốt, giao hàng nhanh. Sẽ ủng hộ shop dài dài!" },
              { name: "Trần Minh Khoa", rating: 4, comment: "Chất liệu ổn, đúng với mô tả. Màu sắc đẹp hơn ảnh. Tuy nhiên size hơi nhỏ so với chuẩn." },
              { name: "Phạm Hồng Ngọc", rating: 5, comment: "Shop tư vấn nhiệt tình, đóng gói cẩn thận. Mặc vào rất vừa, sẽ tiếp tục mua." },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  background: "var(--color-muted)",
                  borderRadius: "12px",
                  padding: "1rem 1.25rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{r.name}</span>
                  <span className="stars" style={{ fontSize: "0.85rem" }}>
                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", margin: 0 }}>
                  {r.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div
          style={{
            background: "var(--color-muted)",
            padding: "3rem 1.5rem",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <h2 className="section-heading" style={{ marginBottom: "1.5rem" }}>
              Sản Phẩm Liên Quan
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
