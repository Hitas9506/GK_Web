"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";
import type { Product } from "@/lib/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { getColorHex, isLightColor } from "@/lib/colorMap";
import QuickBuyModal from "@/components/QuickBuyModal";

const CATEGORY_LABELS: Record<string, string> = {
  "dien-thoai": "Điện Thoại",
  tablet: "Máy Tính Bảng",
  "tai-nghe": "Tai Nghe",
  "phu-kien": "Phụ Kiện",
};

const CATEGORY_EMOJI: Record<string, string> = {
  "dien-thoai": "📱",
  tablet: "📲",
  "tai-nghe": "🎧",
  "phu-kien": "⌚",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { add: addToCompare, remove: removeFromCompare, has: inCompare, items: compareItems } = useCompare();
  const [imgErr, setImgErr] = useState(false);
  const [showQuickBuy, setShowQuickBuy] = useState(false);
  const discount = calculateDiscount(product.price, product.originalPrice);
  const emoji = CATEGORY_EMOJI[product.category] ?? "📱";
  const comparing = inCompare(product.id);

  return (
    <div
      className="product-card"
      style={{
        background: "white",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        position: "relative",
      }}
    >
      {/* Compare button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          if (comparing) removeFromCompare(product.id);
          else if (compareItems.length < 3) addToCompare(product);
        }}
        title={comparing ? "Xóa khỏi so sánh" : compareItems.length >= 3 ? "Đã đủ 3 sản phẩm" : "Thêm vào so sánh"}
        style={{
          position: "absolute", top: "0.75rem", right: "0.75rem", zIndex: 2,
          width: "28px", height: "28px", borderRadius: "50%",
          border: comparing ? "2px solid #FF6700" : "2px solid rgba(0,0,0,0.12)",
          background: comparing ? "#FF6700" : "white",
          color: comparing ? "white" : "#555",
          cursor: compareItems.length >= 3 && !comparing ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.7rem", fontWeight: 700,
          opacity: compareItems.length >= 3 && !comparing ? 0.4 : 1,
          transition: "all 0.15s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >⚖️</button>

      {/* Badge */}
      {product.badge && (
        <span
          className={`badge badge-${product.badge}`}
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            zIndex: 2,
          }}
        >
          {product.badge === "hot"
            ? "🔥 HOT"
            : product.badge === "sale"
            ? `−${discount}%`
            : "✨ MỚI"}
        </span>
      )}

      {/* Image */}
      <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
        <div
          style={{
            position: "relative",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            background: "var(--color-muted)",
          }}
        >
          {!imgErr ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{ objectFit: "contain", padding: "1rem" }}
              onError={() => setImgErr(true)}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                fontSize: "4rem",
                background: "var(--color-muted)",
              }}
            >
              {emoji}
            </div>
          )}

          {/* Quick add overlay */}
          <div
            className="quick-add-overlay"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0.75rem",
              background:
                "linear-gradient(transparent, rgba(0,0,0,0.6))",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product, product.variants[0], product.colors[0]);
              }}
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "8px",
                border: "none",
                background: "white",
                color: "var(--color-accent)",
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              + Thêm vào giỏ
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: "1rem" }}>
        {/* Category */}
        <span
          style={{
            display: "inline-block",
            padding: "0.15rem 0.5rem",
            background: "var(--color-primary-light)",
            color: "var(--color-primary-dark)",
            borderRadius: "1rem",
            fontSize: "0.68rem",
            fontWeight: 600,
            marginBottom: "0.4rem",
          }}
        >
          {CATEGORY_LABELS[product.category] ?? product.category}
        </span>

        {/* Name */}
        <Link
          href={`/products/${product.id}`}
          style={{
            textDecoration: "none",
            display: "block",
            marginBottom: "0.25rem",
          }}
        >
          <h3
            className="line-clamp-2"
            style={{
              fontSize: "0.92rem",
              fontWeight: 700,
              color: "var(--color-text)",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Specs */}
        {product.specs && (
          <p
            className="line-clamp-2"
            style={{
              fontSize: "0.72rem",
              color: "var(--color-text-muted)",
              margin: "0.2rem 0 0.5rem",
              lineHeight: 1.4,
            }}
          >
            {product.specs}
          </p>
        )}

        {/* Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            marginBottom: "0.5rem",
          }}
        >
          <span className="stars" style={{ fontSize: "0.75rem" }}>
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--color-text-muted)",
            }}
          >
            ({product.reviewCount.toLocaleString("vi-VN")})
          </span>
        </div>

        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "0.5rem", flexWrap: "wrap" }}>
            {product.colors.map((c) => {
              const hex = getColorHex(c);
              const light = isLightColor(hex);
              return (
                <span
                  key={c}
                  title={c}
                  style={{
                    display: "inline-block",
                    width: "12px", height: "12px",
                    borderRadius: "50%",
                    background: hex,
                    border: light ? "1.5px solid rgba(0,0,0,0.18)" : "1.5px solid transparent",
                    flexShrink: 0,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
          <span
            style={{
              fontSize: "1.05rem",
              fontWeight: 800,
              color: "var(--color-primary)",
            }}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--color-text-muted)",
                textDecoration: "line-through",
              }}
            >
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Mua ngay button */}
      <div style={{ padding: "0 1rem 1rem" }}>
        <button
          id={`quick-buy-${product.id}`}
          onClick={(e) => { e.preventDefault(); setShowQuickBuy(true); }}
          style={{
            width: "100%",
            padding: "0.55rem",
            borderRadius: "10px",
            border: "none",
            background: "var(--color-accent)",
            color: "white",
            fontWeight: 700,
            fontSize: "0.82rem",
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.35rem",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          ⚡ Mua Ngay
        </button>
      </div>

      {/* Quick buy modal */}
      {showQuickBuy && (
        <QuickBuyModal product={product} onClose={() => setShowQuickBuy(false)} />
      )}

      <style>{`
        .product-card:hover .quick-add-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
