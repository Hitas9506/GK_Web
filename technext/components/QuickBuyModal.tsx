"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { getColorHex, isLightColor } from "@/lib/colorMap";

interface Props {
  product: Product;
  onClose: () => void;
}

export default function QuickBuyModal({ product, onClose }: Props) {
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedColor, setSelectedColor]     = useState(product.colors[0]);
  const [quantity, setQuantity]               = useState(1);
  const [imgErr, setImgErr]                   = useState(false);
  /* Portal mount guard — avoids SSR mismatch */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const displayPrice = product.variantPrices?.[selectedVariant] ?? product.price;
  const img = !imgErr
    ? (product.colorImages?.[selectedColor] ?? product.image)
    : product.image;

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant, selectedColor);
    }
    onClose();
    router.push("/cart");
  };

  const modalContent = (
    /* Backdrop — click outside to close */
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 10000,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(3px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        animation: "qb-fadeIn 0.18s ease",
      }}
    >
      {/* Card — stop click propagation so clicking inside doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "22px",
          width: "100%",
          maxWidth: "460px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.22)",
          overflow: "hidden",
          animation: "qb-slideUp 0.22s ease",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 1.25rem",
          borderBottom: "1px solid var(--color-border)",
        }}>
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>⚡ Mua Ngay</span>
          <button
            onClick={onClose}
            style={{
              width: "28px", height: "28px", borderRadius: "50%",
              border: "none", background: "var(--color-muted)",
              cursor: "pointer", fontWeight: 700, fontSize: "0.85rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--color-text-muted)",
            }}
          >✕</button>
        </div>

        <div style={{ padding: "1.25rem" }}>
          {/* Product row */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
            <div style={{
              position: "relative", width: "80px", height: "80px", flexShrink: 0,
              background: "var(--color-muted)", borderRadius: "14px", overflow: "hidden",
            }}>
              <Image
                src={img}
                alt={product.name}
                fill
                sizes="80px"
                style={{ objectFit: "contain", padding: "6px" }}
                onError={() => setImgErr(true)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem", lineHeight: 1.35 }}>
                {product.name}
              </p>
              <p style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "1.1rem", margin: 0 }}>
                {formatPrice(displayPrice)}
              </p>
            </div>
          </div>

          {/* Variant */}
          {product.variants.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
                Phiên bản: <span style={{ color: "var(--color-text)", fontWeight: 700 }}>{selectedVariant}</span>
              </p>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    style={{
                      padding: "0.38rem 0.85rem",
                      borderRadius: "8px",
                      border: selectedVariant === v
                        ? "2px solid var(--color-primary)"
                        : "1.5px solid var(--color-border)",
                      background: selectedVariant === v ? "var(--color-primary-light)" : "white",
                      color: selectedVariant === v ? "var(--color-primary-dark)" : "var(--color-text)",
                      fontWeight: 600, fontSize: "0.78rem",
                      cursor: "pointer", fontFamily: "inherit",
                      transition: "all 0.12s",
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color */}
          {product.colors.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
                Màu sắc: <span style={{ color: "var(--color-text)", fontWeight: 700 }}>{selectedColor}</span>
              </p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {product.colors.map((c) => {
                  const hex = getColorHex(c);
                  const light = isLightColor(hex);
                  const sel = selectedColor === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      title={c}
                      style={{
                        padding: "0.35rem 0.8rem",
                        borderRadius: "8px",
                        border: sel
                          ? "2px solid var(--color-primary)"
                          : "1.5px solid var(--color-border)",
                        background: sel ? "var(--color-primary-light)" : "white",
                        cursor: "pointer", fontFamily: "inherit",
                        display: "flex", alignItems: "center", gap: "5px",
                        fontWeight: sel ? 700 : 500, fontSize: "0.78rem",
                        transition: "all 0.12s",
                      }}
                    >
                      <span style={{
                        display: "inline-block",
                        width: "11px", height: "11px", borderRadius: "50%",
                        background: hex,
                        border: light ? "1.5px solid rgba(0,0,0,0.2)" : "1.5px solid transparent",
                        flexShrink: 0,
                      }} />
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
              Số lượng:
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                display: "flex",
                border: "1.5px solid var(--color-border)", borderRadius: "10px",
                overflow: "hidden",
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: "36px", height: "36px", border: "none", background: "var(--color-muted)", cursor: "pointer", fontWeight: 700, fontSize: "1rem" }}
                >−</button>
                <span style={{ width: "46px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: "36px", height: "36px", border: "none", background: "var(--color-muted)", cursor: "pointer", fontWeight: 700, fontSize: "1rem" }}
                >+</button>
              </div>
              <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                Tổng: <strong style={{ color: "var(--color-primary)" }}>{formatPrice(displayPrice * quantity)}</strong>
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleBuyNow}
            style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "12px",
              border: "none",
              background: "var(--color-accent)",
              color: "white",
              fontWeight: 700, fontSize: "1rem",
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            ⚡ Mua Ngay – {formatPrice(displayPrice * quantity)}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes qb-fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes qb-slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: none } }
      `}</style>
    </div>
  );

  // Render into document.body via portal — escapes any parent transform/overflow
  if (!mounted) return null;
  return createPortal(modalContent, document.body);
}
