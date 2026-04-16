"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } =
    useCart();

  if (items.length === 0) {
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
          padding: "100px 1.5rem 3rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "5rem" }}>🛒</div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Giỏ hàng của bạn đang trống
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          Hãy thêm một vài sản phẩm bạn thích vào giỏ nhé!
        </p>
        <Link href="/products" className="btn-primary">
          Tiếp Tục Mua Sắm →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "70px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          color: "white",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.25rem" }}>
          Giỏ Hàng Của Bạn
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>
          {totalItems} sản phẩm
        </p>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "2rem 1.5rem 4rem",
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: "2rem",
          alignItems: "start",
        }}
        className="cart-grid"
      >
        {/* Cart items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}-${item.color}`}
              style={{
                background: "white",
                borderRadius: "16px",
                border: "1px solid var(--color-border)",
                padding: "1.25rem",
                display: "flex",
                gap: "1.25rem",
                alignItems: "center",
                transition: "box-shadow 0.2s ease",
              }}
            >
              {/* Product image */}
              <div
                style={{
                  position: "relative",
                  width: "90px",
                  height: "110px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "var(--color-muted)",
                }}
              >
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  sizes="90px"
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    const t = e.currentTarget as HTMLImageElement;
                    t.style.display = "none";
                    const p = t.parentElement;
                    if (p) p.innerHTML += `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:2.5rem">👗</div>`;
                  }}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <Link
                  href={`/products/${item.product.id}`}
                  style={{
                    textDecoration: "none",
                    color: "var(--color-text)",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    display: "block",
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.product.name}
                </Link>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-text-muted)",
                    margin: "0 0 0.75rem",
                  }}
                >
                  Size: {item.size} • Màu: {item.color}
                </p>

                {/* Quantity controls */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                >
                  <div
                    style={{
                      display: "flex",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.size,
                          item.color,
                          item.quantity - 1
                        )
                      }
                      style={{
                        width: "32px",
                        height: "32px",
                        border: "none",
                        background: "var(--color-muted)",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "1rem",
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        width: "40px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.size,
                          item.color,
                          item.quantity + 1
                        )
                      }
                      style={{
                        width: "32px",
                        height: "32px",
                        border: "none",
                        background: "var(--color-muted)",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "1rem",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      removeItem(item.product.id, item.size, item.color)
                    }
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "#ff4757",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      padding: "0.25rem 0.5rem",
                      borderRadius: "6px",
                      transition: "background 0.2s ease",
                    }}
                  >
                    🗑 Xóa
                  </button>
                </div>
              </div>

              {/* Price */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--color-primary)",
                  }}
                >
                  {formatPrice(item.product.price * item.quantity)}
                </p>
                {item.quantity > 1 && (
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {formatPrice(item.product.price)} / cái
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Clear cart */}
          <button
            onClick={clearCart}
            style={{
              alignSelf: "flex-start",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#ff4757",
              fontWeight: 600,
              fontSize: "0.85rem",
              padding: "0.4rem 0",
            }}
          >
            🗑 Xóa toàn bộ giỏ hàng
          </button>
        </div>

        {/* Order summary */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            border: "1px solid var(--color-border)",
            padding: "1.5rem",
            position: "sticky",
            top: "90px",
          }}
        >
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: "1.25rem",
            }}
          >
            Tóm Tắt Đơn Hàng
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
              <span style={{ color: "var(--color-text-muted)" }}>
                Tạm tính ({totalItems} SP)
              </span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
              <span style={{ color: "var(--color-text-muted)" }}>
                Phí vận chuyển
              </span>
              <span style={{ color: "#27ae60", fontWeight: 600 }}>
                {totalPrice >= 500000 ? "Miễn phí" : formatPrice(30000)}
              </span>
            </div>
            <div
              style={{
                borderTop: "1px dashed var(--color-border)",
                paddingTop: "0.75rem",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.05rem",
                fontWeight: 700,
              }}
            >
              <span>Tổng cộng</span>
              <span style={{ color: "var(--color-primary)" }}>
                {formatPrice(
                  totalPrice + (totalPrice >= 500000 ? 0 : 30000)
                )}
              </span>
            </div>
          </div>

          {totalPrice < 500000 && (
            <p
              style={{
                fontSize: "0.78rem",
                color: "#e67e22",
                background: "#fef9e7",
                padding: "0.5rem 0.75rem",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            >
              🚚 Mua thêm{" "}
              <strong>{formatPrice(500000 - totalPrice)}</strong> để được
              miễn phí vận chuyển!
            </p>
          )}

          <button
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", marginBottom: "0.75rem" }}
          >
            Tiến Hành Thanh Toán →
          </button>
          <Link
            href="/products"
            style={{
              display: "block",
              textAlign: "center",
              color: "var(--color-text-muted)",
              textDecoration: "none",
              fontSize: "0.85rem",
            }}
          >
            ← Tiếp tục mua sắm
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
