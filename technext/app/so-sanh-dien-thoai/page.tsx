"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

/* ── Chỉ lấy điện thoại ────────────────────────────────────── */
const phones = products.filter((p) => p.category === "dien-thoai");

/* ── Nhãn thương hiệu ──────────────────────────────────────── */
const BRANDS = [
  { key: "all",    label: "Tất cả",  color: "#1A1A1A" },
  { key: "apple",  label: "Apple",   color: "#1A1A1A" },
  { key: "samsung",label: "Samsung", color: "#1428A0" },
  { key: "xiaomi", label: "Xiaomi",  color: "#FF6900" },
];

/* ── Badge ─────────────────────────────────────────────────── */
const BADGE_LABEL: Record<string, string> = {
  hot:  "🔥 HOT",
  new:  "✨ MỚI",
  sale: "🏷️ SALE",
};
const BADGE_BG: Record<string, string> = {
  hot:  "#FF3B30",
  new:  "#34C759",
  sale: "#FF9500",
};

/* ── Các hàng thông số cần hiển thị ──────────────────────── */
const SPEC_ROWS = [
  "Chip xử lý",
  "Màn hình",
  "RAM",
  "Camera sau",
  "Camera trước",
  "Pin",
  "Kết nối",
  "Hệ điều hành",
  "Kích thước",
];

function getSpec(p: Product, label: string): string {
  const row = (p.detailedSpecs ?? []).find((s) =>
    s.label.toLowerCase().includes(label.toLowerCase())
  );
  return row?.value ?? "—";
}

/* ── Phone card chọn ──────────────────────────────────────── */
function PhoneCard({
  phone,
  selected,
  disabled,
  onToggle,
}: {
  phone: Product;
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled && !selected}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.85rem 0.6rem 0.75rem",
        borderRadius: "14px",
        border: selected
          ? "2.5px solid #FF6700"
          : "2px solid rgba(0,0,0,0.1)",
        background: selected ? "rgba(255,103,0,0.07)" : "white",
        cursor: disabled && !selected ? "not-allowed" : "pointer",
        opacity: disabled && !selected ? 0.45 : 1,
        transition: "all 0.18s",
        position: "relative",
        textAlign: "center",
        boxShadow: selected
          ? "0 0 0 3px rgba(255,103,0,0.18)"
          : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* badge */}
      {phone.badge && (
        <span
          style={{
            position: "absolute",
            top: "6px",
            right: "6px",
            fontSize: "0.58rem",
            fontWeight: 800,
            padding: "0.15rem 0.4rem",
            borderRadius: "20px",
            background: BADGE_BG[phone.badge],
            color: "white",
            letterSpacing: "0.04em",
          }}
        >
          {BADGE_LABEL[phone.badge]}
        </span>
      )}

      {/* check tick */}
      {selected && (
        <span
          style={{
            position: "absolute",
            top: "6px",
            left: "6px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#FF6700",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.65rem",
            color: "white",
            fontWeight: 800,
          }}
        >
          ✓
        </span>
      )}

      {/* image */}
      <div
        style={{
          width: "68px",
          height: "68px",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <Image
          src={phone.image}
          alt={phone.name}
          fill
          sizes="68px"
          style={{ objectFit: "contain" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      <p
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: selected ? "#FF6700" : "#1A1A1A",
          lineHeight: 1.35,
          margin: 0,
          maxWidth: "110px",
        }}
      >
        {phone.name}
      </p>
      <p
        style={{
          fontSize: "0.68rem",
          fontWeight: 800,
          color: "#FF6700",
          margin: 0,
        }}
      >
        {formatPrice(phone.price)}
      </p>
      <span
        style={{
          fontSize: "0.62rem",
          color: "#888",
          display: "flex",
          alignItems: "center",
          gap: "0.2rem",
        }}
      >
        <span style={{ color: "#FFB300" }}>★</span>
        {phone.rating} ({phone.reviewCount.toLocaleString("vi-VN")})
      </span>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* MAIN PAGE                                                      */
/* ══════════════════════════════════════════════════════════════ */
export default function SoSanhDienThoaiPage() {
  const [brandFilter, setBrandFilter] = useState("all");
  const [selected, setSelected] = useState<Product[]>([]);

  const filtered = useMemo(
    () =>
      brandFilter === "all"
        ? phones
        : phones.filter((p) => p.brand === brandFilter),
    [brandFilter]
  );

  const toggle = (p: Product) => {
    setSelected((prev) => {
      if (prev.some((x) => x.id === p.id)) {
        return prev.filter((x) => x.id !== p.id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, p];
    });
  };

  /* cheapest price for highlight */
  const cheapestPrice =
    selected.length > 1 ? Math.min(...selected.map((p) => p.price)) : null;

  return (
    <div style={{ paddingTop: "92px", minHeight: "100vh", background: "#f5f5f7" }}>
      {/* ── HEADER ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #1A1A1A 0%, #2d2d2d 60%, #0f1627 100%)",
          color: "white",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.4rem" }}>
          📊 So Sánh Điện Thoại
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
          Chọn từ 2 đến 4 điện thoại để so sánh thông số thực tế
        </p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {/* ── STEP 1 CHỌN MÁY ── */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "1.75rem",
            marginBottom: "2rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
          }}
        >
          {/* Title row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div>
              <h2 style={{ fontWeight: 800, fontSize: "1.05rem", margin: 0 }}>
                Bước 1 — Chọn điện thoại cần so sánh
              </h2>
              <p style={{ fontSize: "0.78rem", color: "#888", margin: "0.2rem 0 0" }}>
                Đã chọn:{" "}
                <strong style={{ color: selected.length > 0 ? "#FF6700" : "#aaa" }}>
                  {selected.length}/3
                </strong>{" "}
                máy
              </p>
            </div>

            {selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                style={{
                  padding: "0.4rem 0.9rem",
                  borderRadius: "8px",
                  border: "1.5px solid #ff4757",
                  background: "transparent",
                  color: "#ff4757",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                ✕ Xoá tất cả
              </button>
            )}
          </div>

          {/* Brand filter */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            {BRANDS.map((b) => (
              <button
                key={b.key}
                onClick={() => setBrandFilter(b.key)}
                style={{
                  padding: "0.35rem 1rem",
                  borderRadius: "20px",
                  border:
                    brandFilter === b.key
                      ? `2px solid ${b.color}`
                      : "2px solid rgba(0,0,0,0.1)",
                  background: brandFilter === b.key ? `${b.color}14` : "white",
                  color: brandFilter === b.key ? b.color : "#555",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Phone grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(125px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {filtered.map((p) => (
              <PhoneCard
                key={p.id}
                phone={p}
                selected={selected.some((x) => x.id === p.id)}
                disabled={selected.length >= 3}
                onToggle={() => toggle(p)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "#aaa", padding: "2rem 0", fontSize: "0.88rem" }}>
              Không có điện thoại nào cho bộ lọc này.
            </p>
          )}
        </div>

        {/* ── STEP 2 SO SÁNH ── */}
        {selected.length < 2 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1rem",
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              color: "#aaa",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>⚖️</div>
            <p style={{ fontWeight: 600, fontSize: "1rem", color: "#999" }}>
              Hãy chọn ít nhất <strong style={{ color: "#FF6700" }}>2 điện thoại</strong> để xem bảng so sánh
            </p>
          </div>
        ) : (
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
            }}
          >
            {/* Section header */}
            <div
              style={{
                padding: "1.25rem 1.75rem",
                borderBottom: "1px solid rgba(0,0,0,0.07)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <h2 style={{ fontWeight: 800, fontSize: "1.05rem", margin: 0, flex: 1 }}>
                Bước 2 — Bảng so sánh chi tiết
              </h2>
              <Link
                href={`/compare?ids=${selected.map((p) => p.id).join(",")}`}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "9px",
                  background: "#FF6700",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  textDecoration: "none",
                }}
              >
                Mở so sánh đầy đủ →
              </Link>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.83rem",
                  minWidth: `${220 + selected.length * 200}px`,
                }}
              >
                {/* ── THEAD: Phone cards ── */}
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        fontWeight: 700,
                        fontSize: "0.72rem",
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        background: "#fafafa",
                        width: "180px",
                        borderBottom: "2px solid rgba(0,0,0,0.08)",
                        verticalAlign: "bottom",
                      }}
                    >
                      Thông số
                    </th>
                    {selected.map((p) => {
                      const isCheapest = cheapestPrice !== null && p.price === cheapestPrice;
                      return (
                        <th
                          key={p.id}
                          style={{
                            padding: "1rem",
                            textAlign: "center",
                            background: "#fafafa",
                            borderBottom: "2px solid rgba(0,0,0,0.08)",
                            verticalAlign: "bottom",
                            minWidth: "190px",
                          }}
                        >
                          {/* Remove button */}
                          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.5rem" }}>
                            <button
                              onClick={() => toggle(p)}
                              style={{
                                border: "none",
                                background: "rgba(0,0,0,0.06)",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                                fontSize: "0.6rem",
                                color: "#888",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 0,
                              }}
                              title="Bỏ chọn"
                            >
                              ✕
                            </button>
                          </div>

                          <div
                            style={{
                              width: "70px",
                              height: "70px",
                              position: "relative",
                              margin: "0 auto 0.6rem",
                            }}
                          >
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="70px"
                              style={{ objectFit: "contain" }}
                            />
                          </div>

                          <Link
                            href={`/products/${p.id}`}
                            style={{
                              fontWeight: 800,
                              fontSize: "0.82rem",
                              color: "#1A1A1A",
                              textDecoration: "none",
                              display: "block",
                              lineHeight: 1.3,
                              marginBottom: "0.35rem",
                            }}
                          >
                            {p.name}
                          </Link>

                          {/* Price */}
                          <span
                            style={{
                              display: "block",
                              fontWeight: 900,
                              fontSize: "0.92rem",
                              color: isCheapest ? "#34C759" : "#FF6700",
                              marginBottom: "0.2rem",
                            }}
                          >
                            {formatPrice(p.price)}
                          </span>
                          {isCheapest && selected.length > 1 && (
                            <span
                              style={{
                                display: "inline-block",
                                fontSize: "0.62rem",
                                color: "#34C759",
                                fontWeight: 700,
                                marginBottom: "0.3rem",
                              }}
                            >
                              💚 Giá tốt nhất
                            </span>
                          )}

                          {/* Rating */}
                          <div style={{ fontSize: "0.68rem", color: "#888" }}>
                            <span style={{ color: "#FFB300" }}>{"★".repeat(Math.round(p.rating))}</span>
                            {" "}{p.rating} ({p.reviewCount.toLocaleString("vi-VN")})
                          </div>

                          {/* Badge */}
                          {p.badge && (
                            <span
                              style={{
                                display: "inline-block",
                                marginTop: "0.35rem",
                                padding: "0.18rem 0.55rem",
                                borderRadius: "20px",
                                background: BADGE_BG[p.badge],
                                color: "white",
                                fontSize: "0.62rem",
                                fontWeight: 800,
                              }}
                            >
                              {BADGE_LABEL[p.badge]}
                            </span>
                          )}

                          {/* Variants */}
                          <div
                            style={{
                              marginTop: "0.5rem",
                              fontSize: "0.65rem",
                              color: "#aaa",
                              lineHeight: 1.4,
                            }}
                          >
                            {p.variants.join(" / ")}
                          </div>

                          {/* Buy btn */}
                          <Link
                            href={`/products/${p.id}`}
                            style={{
                              display: "inline-block",
                              marginTop: "0.65rem",
                              padding: "0.4rem 1.1rem",
                              borderRadius: "8px",
                              background: "#FF6700",
                              color: "white",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              textDecoration: "none",
                            }}
                          >
                            Mua ngay →
                          </Link>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                {/* ── TBODY: Spec rows ── */}
                <tbody>
                  {SPEC_ROWS.map((rowLabel, i) => (
                    <tr key={rowLabel} style={{ background: i % 2 === 0 ? "white" : "#fafafa" }}>
                      <td
                        style={{
                          padding: "0.8rem 1.25rem",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          color: "#555",
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                          verticalAlign: "top",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {rowLabel}
                      </td>
                      {selected.map((p) => {
                        const val = getSpec(p, rowLabel);
                        return (
                          <td
                            key={p.id}
                            style={{
                              padding: "0.8rem",
                              textAlign: "center",
                              fontSize: "0.8rem",
                              color: val === "—" ? "#ccc" : "#333",
                              borderBottom: "1px solid rgba(0,0,0,0.05)",
                              lineHeight: 1.55,
                              verticalAlign: "top",
                            }}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Colors row */}
                  <tr style={{ background: SPEC_ROWS.length % 2 === 0 ? "white" : "#fafafa" }}>
                    <td
                      style={{
                        padding: "0.8rem 1.25rem",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        color: "#555",
                        borderBottom: "1px solid rgba(0,0,0,0.05)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Màu sắc
                    </td>
                    {selected.map((p) => (
                      <td
                        key={p.id}
                        style={{
                          padding: "0.8rem",
                          textAlign: "center",
                          fontSize: "0.78rem",
                          color: "#555",
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                          lineHeight: 1.55,
                        }}
                      >
                        {p.colors.join(", ")}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer CTA */}
            <div
              style={{
                padding: "1.25rem 1.75rem",
                borderTop: "1px solid rgba(0,0,0,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.75rem",
                background: "#fafafa",
              }}
            >
              <p style={{ fontSize: "0.82rem", color: "#888", margin: 0 }}>
                💡 Nhấn <strong style={{ color: "#FF6700" }}>Mua ngay</strong> để xem đầy đủ thông số và thêm vào giỏ
              </p>
              <Link
                href="/products?category=dien-thoai"
                style={{
                  padding: "0.55rem 1.25rem",
                  borderRadius: "10px",
                  background: "#1A1A1A",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  textDecoration: "none",
                }}
              >
                Xem tất cả điện thoại →
              </Link>
            </div>
          </div>
        )}

        {/* ── TIP BOX ── */}
        <div
          style={{
            marginTop: "2rem",
            background: "rgba(255,103,0,0.06)",
            border: "1px solid rgba(255,103,0,0.2)",
            borderRadius: "16px",
            padding: "1.25rem 1.5rem",
          }}
        >
          <h3 style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.6rem" }}>
            💡 Gợi ý chọn điện thoại
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              fontSize: "0.82rem",
              color: "#666",
            }}
          >
            <li>📸 <strong>Chụp ảnh đẹp:</strong> Xiaomi 17 Ultra (Leica 200MP), iPhone 17 Pro Max (48MP×3)</li>
            <li>🎮 <strong>Chơi game:</strong> Samsung S26 Ultra (SD 8 Elite Gen 5), Xiaomi 17 Ultra (16GB RAM)</li>
            <li>🔋 <strong>Pin trâu + sạc nhanh:</strong> Xiaomi 17 Ultra (6000mAh 90W), Xiaomi 15 Ultra (5300mAh 90W)</li>
            <li>🪶 <strong>Mỏng nhẹ:</strong> iPhone Air (5.65mm, 145g)</li>
            <li>💰 <strong>Giá tốt nhất:</strong> Samsung Galaxy S25 (từ 16.690.000₫), Xiaomi 15 (18.490.000₫)</li>
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          table { font-size: 0.75rem !important; }
        }
      `}</style>
    </div>
  );
}
