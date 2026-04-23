import type { Metadata } from "next";
import { getProductById } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "So Sánh Sản Phẩm | TechNext",
  description: "So sánh thông số kỹ thuật các sản phẩm điện thoại, tablet tại TechNext.",
};

const fmt = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

export default async function ComparePage(props: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await props.searchParams;
  const idList = (ids ?? "").split(",").map(Number).filter(Boolean).slice(0, 3);
  const products = idList.map(id => getProductById(id)).filter(Boolean) as NonNullable<ReturnType<typeof getProductById>>[];

  if (products.length < 2) {
    return (
      <div style={{ paddingTop: "92px", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <div style={{ fontSize: "3rem" }}>⚖️</div>
        <h1 style={{ fontWeight: 800, fontSize: "1.4rem" }}>So Sánh Sản Phẩm</h1>
        <p style={{ color: "#888" }}>Chọn ít nhất 2 sản phẩm để so sánh từ trang danh sách.</p>
        <Link href="/products" style={{ padding: "0.65rem 1.5rem", borderRadius: "12px", background: "#FF6700", color: "white", textDecoration: "none", fontWeight: 700 }}>
          Chọn sản phẩm →
        </Link>
      </div>
    );
  }

  /* Collect all spec labels union */
  const allLabels = Array.from(
    new Set(products.flatMap(p => (p.detailedSpecs ?? []).map(s => s.label)))
  );

  return (
    <div style={{ paddingTop: "92px", minHeight: "100vh", background: "#f5f5f7" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <Link href="/products" style={{ color: "#FF6700", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>
            ← Quay lại
          </Link>
          <h1 style={{ fontWeight: 800, fontSize: "1.5rem", flex: 1 }}>So Sánh Sản Phẩm</h1>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <thead>
              <tr>
                <th style={{ padding: "1.25rem", textAlign: "left", fontWeight: 700, fontSize: "0.8rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.07em", background: "#fafafa", width: "180px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                  Thông Số
                </th>
                {products.map(p => (
                  <th key={p.id} style={{ padding: "1.25rem", textAlign: "center", borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#fafafa" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                      <Image src={p.image} alt={p.name} width={80} height={80} style={{ objectFit: "contain" }} />
                      <Link href={`/products/${p.id}`}
                        style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1A1A1A", textDecoration: "none" }}>
                        {p.name}
                      </Link>
                      <span style={{ fontWeight: 800, fontSize: "1rem", color: "#FF6700" }}>
                        {fmt(p.price)}
                      </span>
                      <Link href={`/products/${p.id}`}
                        style={{ padding: "0.45rem 1rem", borderRadius: "8px", background: "#FF6700", color: "white", textDecoration: "none", fontSize: "0.8rem", fontWeight: 700 }}>
                        Mua ngay →
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Badge row */}
              <tr>
                <td style={{ padding: "0.85rem 1.25rem", fontWeight: 700, fontSize: "0.82rem", color: "#555", borderBottom: "1px solid rgba(0,0,0,0.05)", background: "#fff" }}>
                  Nhãn
                </td>
                {products.map(p => (
                  <td key={p.id} style={{ padding: "0.85rem", textAlign: "center", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    {p.badge ? (
                      <span style={{
                        padding: "0.25rem 0.65rem", borderRadius: "20px",
                        background: p.badge === "hot" ? "#FF3B30" : p.badge === "new" ? "#34C759" : "#FF9500",
                        color: "white", fontSize: "0.72rem", fontWeight: 700,
                      }}>
                        {p.badge.toUpperCase()}
                      </span>
                    ) : "—"}
                  </td>
                ))}
              </tr>

              {/* Rating row */}
              <tr style={{ background: "#fafff8" }}>
                <td style={{ padding: "0.85rem 1.25rem", fontWeight: 700, fontSize: "0.82rem", color: "#555", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  Đánh Giá
                </td>
                {products.map(p => (
                  <td key={p.id} style={{ padding: "0.85rem", textAlign: "center", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    <span style={{ color: "#FFB300" }}>{"★".repeat(Math.round(p.rating))}</span>
                    {" "}<strong>{p.rating}</strong>
                    <span style={{ color: "#aaa", fontSize: "0.75rem" }}> ({p.reviewCount.toLocaleString()})</span>
                  </td>
                ))}
              </tr>

              {/* Price row */}
              <tr>
                <td style={{ padding: "0.85rem 1.25rem", fontWeight: 700, fontSize: "0.82rem", color: "#555", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  Giá Bán
                </td>
                {products.map((p, idx) => {
                  const cheapest = Math.min(...products.map(x => x.price));
                  const isBest = p.price === cheapest;
                  return (
                    <td key={p.id} style={{ padding: "0.85rem", textAlign: "center", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                      <span style={{ fontWeight: 800, color: isBest ? "#34C759" : "#FF6700", fontSize: "1rem" }}>
                        {fmt(p.price)}
                      </span>
                      {isBest && products.length > 1 && (
                        <span style={{ display: "block", fontSize: "0.7rem", color: "#34C759", fontWeight: 700, marginTop: "0.15rem" }}>
                          💚 Giá tốt nhất
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Spec rows */}
              {allLabels.map((label, i) => (
                <tr key={label} style={{ background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "0.85rem 1.25rem", fontWeight: 600, fontSize: "0.8rem", color: "#555", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    {label}
                  </td>
                  {products.map(p => {
                    const spec = (p.detailedSpecs ?? []).find(s => s.label === label);
                    return (
                      <td key={p.id} style={{ padding: "0.85rem", textAlign: "center", fontSize: "0.82rem", color: "#333", borderBottom: "1px solid rgba(0,0,0,0.05)", lineHeight: 1.5 }}>
                        {spec?.value ?? <span style={{ color: "#ccc" }}>—</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* Add more */}
        {products.length < 3 && (
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <Link href="/products"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.65rem 1.5rem", borderRadius: "12px",
                border: "2px dashed rgba(0,0,0,0.2)",
                color: "#666", textDecoration: "none", fontWeight: 600, fontSize: "0.88rem" }}>
              + Thêm sản phẩm để so sánh
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
