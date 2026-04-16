"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const categoryLabel: Record<string, string> = {
    ao: "Áo",
    quan: "Quần",
    vay: "Váy & Đầm",
    "phu-kien": "Phụ Kiện",
  };

  const handleAddToCart = (e: React.MouseEvent | React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : null;

  return (
    <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
      <div
        className="product-card"
        style={{
          background: "white",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid var(--color-border)",
          cursor: "pointer",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            aspectRatio: "4/5",
            background: "var(--color-muted)",
            overflow: "hidden",
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: "cover" }}
            onError={(e) => {
              // Fallback gradient if image not found
              const t = e.currentTarget as HTMLImageElement;
              t.style.display = "none";
              const parent = t.parentElement;
              if (parent) {
                parent.style.background =
                  "linear-gradient(135deg, #f7f4f0, #e8e0d5)";
                parent.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:4rem">👗</div>`;
              }
            }}
          />

          {/* Badge */}
          {product.badge && (
            <span
              className={`badge badge-${product.badge}`}
              style={{ position: "absolute", top: "12px", left: "12px" }}
            >
              {product.badge === "hot"
                ? "🔥 HOT"
                : product.badge === "sale"
                ? "💚 SALE"
                : "✨ NEW"}
            </span>
          )}

          {/* Discount badge */}
          {discount && (
            <span
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "rgba(26,26,46,0.85)",
                color: "white",
                padding: "0.2rem 0.5rem",
                borderRadius: "6px",
                fontSize: "0.72rem",
                fontWeight: 700,
              }}
            >
              -{discount}%
            </span>
          )}

          {/* Quick add button */}
          <button
            onPointerDown={handleAddToCart}
            style={{
              position: "absolute",
              bottom: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              background: added
                ? "linear-gradient(135deg,#27ae60,#229954)"
                : "linear-gradient(135deg, #c8a96e, #a8854a)",
              color: "white",
              border: "none",
              padding: "0.55rem 1.25rem",
              borderRadius: "2rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
              opacity: 0,
              pointerEvents: "none",
            }}
            className="quick-add-btn"
          >
            {added ? "✓ Đã thêm" : "+ Thêm vào giỏ"}
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              color: "var(--color-primary)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "0.25rem",
            }}
          >
            {categoryLabel[product.category] ?? product.category}
          </p>
          <h3
            className="line-clamp-2"
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--color-text)",
              marginBottom: "0.5rem",
              lineHeight: 1.4,
            }}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              marginBottom: "0.75rem",
            }}
          >
            <span className="stars" style={{ fontSize: "0.8rem" }}>
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-muted)",
              }}
            >
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--color-primary)",
              }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-text-muted)",
                  textDecoration: "line-through",
                }}
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .product-card:hover .quick-add-btn {
          opacity: 1 !important;
          pointer-events: auto !important;
        }
      `}</style>
    </Link>
  );
}
