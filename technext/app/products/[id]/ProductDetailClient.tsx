"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { getProductsByCategory } from "@/lib/data";

const CATEGORY_LABELS: Record<string, string> = {
  "dien-thoai": "Điện Thoại",
  tablet: "Máy Tính Bảng",
  "tai-nghe": "Tai Nghe",
  "phu-kien": "Phụ Kiện",
};

export default function ProductDetailClient({
  product,
}: {
  product: Product;
}) {
  const { addItem } = useCart();

  /* ── Gallery setup ─────────────────────────────────────────
     Build a unified media list: images first, then videos.
     type: "image" | "video"
  ─────────────────────────────────────────────────────────── */
  type GalleryItem =
    | { type: "image"; label: string; src: string }
    | { type: "video"; label: string; src: string };

  const galleryItems: GalleryItem[] = [
    // Videos FIRST — showcase videos appear before color images
    ...(product.videos ?? []).map(
      (src, i): GalleryItem => ({ type: "video", label: `Video ${i + 1}`, src })
    ),
    // Then color images
    ...Object.entries(product.colorImages ?? {}).map(
      ([label, src]): GalleryItem => ({ type: "image", label, src })
    ),
  ];

  // Fallback
  if (galleryItems.length === 0) {
    galleryItems.push({ type: "image", label: product.colors[0] ?? "", src: product.image });
  }

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">(
    "desc"
  );
  const [addedMsg, setAddedMsg] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  /* Switch gallery item — direct index set, no unmount */
  const switchImage = (idx: number) => {
    if (idx === activeGalleryIdx) return;
    setActiveGalleryIdx(idx);
    setImgErr(false);
    // Only sync color for image items
    const item = galleryItems[idx];
    if (item?.type === "image" && product.colors.includes(item.label)) {
      setSelectedColor(item.label);
    }
  };

  const prevImage = () =>
    switchImage((activeGalleryIdx - 1 + galleryItems.length) % galleryItems.length);
  const nextImage = () =>
    switchImage((activeGalleryIdx + 1) % galleryItems.length);

  /* ── Auto-advance slideshow ──────────────────────────────────
     Images: advance after IMAGE_DURATION ms (fixed display time).
     Videos: advance via onEnded on the <video> element.
     Timer resets automatically when activeGalleryIdx changes
     (user clicks thumbnail / arrow / color → new effect cycle).
  ─────────────────────────────────────────────────────────── */
  const IMAGE_DURATION = 4000; // 4 seconds per image

  useEffect(() => {
    const current = galleryItems[activeGalleryIdx];
    // Videos are handled by onEnded — skip timer for them
    if (!current || current.type === "video") return;

    const timer = setTimeout(() => {
      const nextIdx = (activeGalleryIdx + 1) % galleryItems.length;
      setActiveGalleryIdx(nextIdx);
      setImgErr(false);
      // Sync color selector when advancing to an image
      const nextItem = galleryItems[nextIdx];
      if (nextItem?.type === "image" && product.colors.includes(nextItem.label)) {
        setSelectedColor(nextItem.label);
      }
    }, IMAGE_DURATION);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGalleryIdx]);

  // Dynamic price based on selected variant
  const displayPrice = product.variantPrices?.[selectedVariant] ?? product.price;

  const discount = calculateDiscount(displayPrice, product.originalPrice);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant, selectedColor);
    }
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2500);
  };

  return (
    <div style={{ paddingTop: "92px" }}>
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.25rem 1.5rem 0",
          fontSize: "0.82rem",
          color: "var(--color-text-muted)",
          display: "flex",
          gap: "0.4rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "var(--color-text-muted)",
          }}
        >
          Trang chủ
        </Link>
        <span>›</span>
        <Link
          href={`/products?category=${product.category}`}
          style={{
            textDecoration: "none",
            color: "var(--color-text-muted)",
          }}
        >
          {CATEGORY_LABELS[product.category] ?? product.category}
        </Link>
        <span>›</span>
        <span style={{ color: "var(--color-text)", fontWeight: 600 }}>
          {product.name}
        </span>
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1.5rem 3rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "start",
        }}
        className="detail-grid"
      >
        {/* ── IMAGE GALLERY ─────────────────────────── */}
        <div>
          {/* Main image */}
          <div
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: "20px",
              overflow: "hidden",
              background: "var(--color-muted)",
            }}
          >
            {/* Badge */}
            {product.badge && (
              <span
                className={`badge badge-${product.badge}`}
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  zIndex: 2,
                  fontSize: "0.8rem",
                  padding: "0.3rem 0.8rem",
                }}
              >
                {product.badge === "hot"
                  ? "🔥 HOT"
                  : product.badge === "sale"
                  ? `−${discount}%`
                  : "✨ MỚI"}
              </span>
            )}

            {/* Item counter pill */}
            {galleryItems.length > 1 && (
              <div style={{
                position: "absolute", top: "1rem", right: "1rem", zIndex: 2,
                background: "rgba(0,0,0,0.48)", backdropFilter: "blur(6px)",
                borderRadius: "999px", padding: "0.2rem 0.6rem",
                fontSize: "0.72rem", fontWeight: 700, color: "white",
              }}>
                {activeGalleryIdx + 1} / {galleryItems.length}
              </div>
            )}

            {/* Main media — images stacked (CSS opacity crossfade), video shown individually */}
            {galleryItems.map((item, idx) => {
              const isActive = idx === activeGalleryIdx;
              if (item.type === "video") {
                return (
                  <div
                    key={item.src}
                    style={{
                      position: "absolute", inset: 0,
                      opacity: isActive ? 1 : 0,
                      zIndex: isActive ? 1 : 0,
                      transition: "opacity 0.25s ease",
                      /* Parent container already has overflow:hidden + borderRadius
                         — no need to repeat here; extra borderRadius caused visual glitch */
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {isActive && (
                      <video
                        key={item.src}
                        src={item.src}
                        autoPlay
                        muted
                        playsInline
                        onEnded={nextImage}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "contain",
                          background: "#000",
                        }}
                      />
                    )}
                  </div>
                );
              }
              // Image item — wrap in a div so zIndex + opacity work reliably
              const showFallback = imgErr && isActive;
              return (
                <div
                  key={item.src}
                  style={{
                    position: "absolute", inset: 0,
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 1 : 0,
                    transition: "opacity 0.25s ease",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {showFallback ? (
                    <div style={{
                      width: "100%", height: "100%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "8rem",
                    }}>
                      {product.category === "tablet" ? "📲" : product.category === "tai-nghe" ? "🎧" : "📱"}
                    </div>
                  ) : (
                    <Image
                      src={item.src}
                      alt={`${product.name} – ${item.label}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "contain", padding: "2rem" }}
                      priority={idx === 0}
                      onError={() => { if (isActive) setImgErr(true); }}
                    />
                  )}
                </div>
              );
            })}

            {/* Prev / Next arrows – only if > 1 item */}
            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Ảnh trước"
                  style={{
                    position: "absolute", left: "0.75rem", top: "50%",
                    transform: "translateY(-50%)", zIndex: 3,
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "none", background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                    cursor: "pointer", fontSize: "1rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s, transform 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.88)";
                    e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                  }}
                >‹</button>
                <button
                  onClick={nextImage}
                  aria-label="Ảnh tiếp theo"
                  style={{
                    position: "absolute", right: "0.75rem", top: "50%",
                    transform: "translateY(-50%)", zIndex: 3,
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "none", background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                    cursor: "pointer", fontSize: "1rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s, transform 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.88)";
                    e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                  }}
                >›</button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {galleryItems.length > 1 && (
            <div style={{
              display: "flex", gap: "0.5rem", marginTop: "0.75rem",
              overflowX: "auto", paddingBottom: "4px",
              scrollbarWidth: "none",
              /* Fade edges to hint at scroll */
              maskImage: "linear-gradient(to right, transparent 0, black 8px, black calc(100% - 8px), transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0, black 8px, black calc(100% - 8px), transparent 100%)",
            }}>
              {galleryItems.map((item, idx) => {
                const isActive = idx === activeGalleryIdx;
                const isVideo = item.type === "video";
                return (
                  <button
                    key={idx}
                    onClick={() => switchImage(idx)}
                    title={item.label}
                    style={{
                      flexShrink: 0,
                      width: "56px", height: "56px",
                      borderRadius: "10px", overflow: "hidden",
                      border: isActive ? "2px solid #FF6700" : "2px solid rgba(0,0,0,0.08)",
                      background: isVideo ? "transparent" : "var(--color-muted)",
                      cursor: "pointer", padding: 0,
                      boxShadow: isActive ? "0 0 0 3px rgba(255,103,0,0.18)" : "none",
                      transition: "border 0.15s, box-shadow 0.15s, transform 0.15s",
                      transform: isActive ? "scale(1.08)" : "scale(1)",
                      position: "relative",
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    {isVideo ? (
                      /* Video thumbnail: product image bg + dark overlay + play icon */
                      <div style={{
                        width: "100%", height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}>
                        {/* Product image as background */}
                        <Image
                          src={product.image}
                          alt={item.label}
                          fill
                          sizes="68px"
                          style={{ objectFit: "cover" }}
                        />
                        {/* Dark overlay */}
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "rgba(0,0,0,0.45)",
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center",
                          gap: "2px",
                        }}>
                          {/* Play circle */}
                          <div style={{
                            width: "26px", height: "26px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.92)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <span style={{ fontSize: "0.7rem", color: "#FF6700", marginLeft: "2px" }}>▶</span>
                          </div>
                          <span style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.9)", fontWeight: 700 }}>
                            {item.label}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        sizes="68px"
                        style={{ objectFit: "contain", padding: "6px" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Dot indicators — compact progress style, hidden when too many items */}
          {galleryItems.length > 1 && galleryItems.length <= 10 && (
            <div style={{
              display: "flex", justifyContent: "center",
              gap: "0.3rem", marginTop: "0.6rem",
            }}>
              {galleryItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => switchImage(idx)}
                  title={item.label}
                  style={{
                    width: idx === activeGalleryIdx ? "18px" : "6px",
                    height: "6px",
                    borderRadius: "999px",
                    background: idx === activeGalleryIdx
                      ? "#FF6700"
                      : item.type === "video"
                      ? "rgba(0,0,0,0.3)"
                      : "rgba(0,0,0,0.15)",
                    border: "none", padding: 0, cursor: "pointer",
                    transition: "width 0.25s ease, background 0.2s",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h1>

          {/* Specs summary */}
          {product.specs && (
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "0.75rem", lineHeight: 1.6 }}>
              {product.specs}
            </p>
          )}

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
            }}
          >
            <span className="stars" style={{ fontSize: "0.9rem" }}>
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>
              {product.rating}
            </span>
            <span
              style={{
                fontSize: "0.82rem",
                color: "var(--color-text-muted)",
              }}
            >
              ({product.reviewCount.toLocaleString("vi-VN")} đánh giá)
            </span>
          </div>

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "var(--color-primary)",
              }}
            >
              {formatPrice(displayPrice)}
            </span>
            {product.originalPrice && displayPrice < product.originalPrice && (
              <>
                <span
                  style={{
                    fontSize: "1rem",
                    textDecoration: "line-through",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
                <span
                  style={{
                    background: "#ff4757",
                    color: "white",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                  }}
                >
                  −{discount}%
                </span>
              </>
            )}
          </div>

          {/* Variant selection */}
          <div style={{ marginBottom: "1.25rem" }}>
            <p
              style={{
                fontWeight: 600,
                fontSize: "0.88rem",
                marginBottom: "0.5rem",
              }}
            >
              Phiên bản:{" "}
              <span style={{ color: "var(--color-primary)" }}>
                {selectedVariant}
              </span>
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {product.variants.map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  style={{
                    padding: "0.5rem 1.2rem",
                    borderRadius: "8px",
                    border:
                      selectedVariant === v
                        ? "2px solid var(--color-primary)"
                        : "2px solid var(--color-border)",
                    background:
                      selectedVariant === v
                        ? "var(--color-primary-light)"
                        : "white",
                    color:
                      selectedVariant === v
                        ? "var(--color-primary-dark)"
                        : "var(--color-text)",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  {v}
                  {product.variantPrices?.[v] && v !== selectedVariant && (
                    <span style={{ display: "block", fontSize: "0.72rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
                      {formatPrice(product.variantPrices[v])}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Color selection */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                fontWeight: 600,
                fontSize: "0.88rem",
                marginBottom: "0.5rem",
              }}
            >
              Màu sắc:{" "}
              <span style={{ color: "var(--color-primary)" }}>
                {selectedColor}
              </span>
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {product.colors.map((c) => {
                const colorImgIdx = galleryItems.findIndex(g => g.label === c && g.type === "image");
                return (
                <button
                  key={c}
                  onClick={() => {
                    setSelectedColor(c);
                    if (colorImgIdx >= 0) switchImage(colorImgIdx);
                  }}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    border:
                      selectedColor === c
                        ? "2px solid var(--color-primary)"
                        : "2px solid var(--color-border)",
                    background:
                      selectedColor === c
                        ? "var(--color-primary-light)"
                        : "white",
                    color:
                      selectedColor === c
                        ? "var(--color-primary-dark)"
                        : "var(--color-text)",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  {c}
                </button>
                );
              })}
            </div>
          </div>

          {/* Quantity + Add to cart */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                border: "2px solid var(--color-border)",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: "40px",
                  height: "40px",
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
                  width: "50px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: "40px",
                  height: "40px",
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
              onClick={handleAddToCart}
              className="btn-primary"
              style={{
                flex: 1,
                justifyContent: "center",
                padding: "0.85rem",
                fontSize: "0.95rem",
                background: "var(--color-primary)",
              }}
            >
              🛒 Thêm vào giỏ hàng
            </button>
          </div>

          {/* Success message */}
          {addedMsg && (
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #86efac",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
                marginBottom: "1rem",
                fontSize: "0.88rem",
                color: "#15803d",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              ✓ Đã thêm {product.name} vào giỏ hàng!
              <Link
                href="/cart"
                style={{
                  color: "#15803d",
                  fontWeight: 700,
                  textDecoration: "underline",
                  marginLeft: "auto",
                }}
              >
                Xem giỏ →
              </Link>
            </div>
          )}

          {/* Trust badges */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            {[
              { icon: "✅", text: "Chính hãng 100%" },
              { icon: "🚚", text: "Giao hàng toàn quốc" },
              { icon: "🔄", text: "Đổi trả 7 ngày" },
              { icon: "🛡️", text: "Bảo hành 12 tháng" },
            ].map((b) => (
              <div
                key={b.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.78rem",
                  color: "var(--color-text-muted)",
                }}
              >
                <span>{b.icon}</span> {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem 4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0",
            borderBottom: "2px solid var(--color-border)",
            marginBottom: "1.5rem",
          }}
        >
          {(
            [
              { id: "desc", label: "Mô Tả" },
              { id: "specs", label: "Thông Số Kỹ Thuật" },
              { id: "reviews", label: "Đánh Giá" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                borderBottom:
                  activeTab === tab.id
                    ? "2px solid var(--color-primary)"
                    : "2px solid transparent",
                background: "transparent",
                color:
                  activeTab === tab.id
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: "pointer",
                fontSize: "0.9rem",
                fontFamily: "inherit",
                transition: "all 0.2s",
                marginBottom: "-2px",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "desc" && (
          <div
            style={{
              color: "var(--color-text-muted)",
              lineHeight: 1.8,
              fontSize: "0.95rem",
              maxWidth: "800px",
            }}
          >
            <p>{product.description}</p>
          </div>
        )}

        {activeTab === "specs" && (
          <div style={{ maxWidth: "700px" }}>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
              Thông số kỹ thuật chi tiết của {product.name}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {(product.detailedSpecs ?? (product.specs ? product.specs.split(" | ").map((v, i) => ({
                label: i === 0 ? "Chip xử lý" : i === 1 ? "Màn hình" : i === 2 ? "Camera sau" : i === 3 ? "Camera trước" : "Hệ điều hành",
                value: v.trim()
              })) : [])).map((row, i) => (
                <div key={i} style={{ display: "flex", padding: "0.65rem 0", borderBottom: "1px solid var(--color-border)", gap: "1rem" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.85rem", minWidth: "160px", flexShrink: 0, color: "var(--color-text)" }}>
                    {row.label}
                  </span>
                  <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: "flex", padding: "0.65rem 0", borderBottom: "1px solid var(--color-border)", gap: "1rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.85rem", minWidth: "160px", flexShrink: 0, color: "var(--color-text)" }}>Phiên bản</span>
                <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>{product.variants.join(" / ")}</span>
              </div>
              <div style={{ display: "flex", padding: "0.65rem 0", borderBottom: "1px solid var(--color-border)", gap: "1rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.85rem", minWidth: "160px", flexShrink: 0, color: "var(--color-text)" }}>Màu sắc</span>
                <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>{product.colors.join(", ")}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "var(--color-primary)",
                }}
              >
                {product.rating}
              </div>
              <div>
                <div className="stars" style={{ fontSize: "1.1rem" }}>
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-text-muted)",
                    marginTop: "0.2rem",
                  }}
                >
                  {product.reviewCount.toLocaleString("vi-VN")} đánh giá
                </p>
              </div>
            </div>
            <div
              style={{
                background: "var(--color-muted)",
                borderRadius: "12px",
                padding: "1.25rem",
                color: "var(--color-text-muted)",
                fontSize: "0.9rem",
              }}
            >
              <p style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem" }}>
                💬 Đánh giá từ người dùng
              </p>
              <p>Tính năng đánh giá đang được phát triển. Hãy quay lại sau nhé!</p>
            </div>
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem 4rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 800,
              marginBottom: "1.25rem",
            }}
          >
            Sản phẩm liên quan
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                style={{
                  background: "var(--color-muted)",
                  borderRadius: "14px",
                  padding: "1.25rem",
                  textDecoration: "none",
                  color: "var(--color-text)",
                  transition: "transform 0.2s",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1/1",
                    marginBottom: "0.75rem",
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: "white",
                  }}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="220px"
                    style={{ objectFit: "contain", padding: "0.5rem" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <h4
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                  }}
                >
                  {p.name}
                </h4>
                <p
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                  }}
                >
                  {formatPrice(p.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
