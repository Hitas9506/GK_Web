import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "So Sánh Điện Thoại",
  description: "So sánh thông số kỹ thuật các mẫu điện thoại hot nhất 2025–2026 tại TechNext.",
};

export default function ComparePhonePage() {
  const phones = [
    {
      name: "Xiaomi 17 Ultra",
      price: "36.990.000₫",
      chip: "Snapdragon 8 Elite",
      screen: "6.7\" 2K AMOLED 120Hz",
      camera: "Leica 50MP + 50MP + 50MP",
      battery: "6000mAh, 90W",
      storage: "256GB / 512GB / 1TB",
      special: "Camera Leica UltraPure",
    },
    {
      name: "Samsung Galaxy S25 Ultra",
      price: "33.990.000₫",
      chip: "Snapdragon 8 Elite for Galaxy",
      screen: "6.9\" QHD+ Dynamic AMOLED 2X 120Hz",
      camera: "200MP + 50MP + 10MP + 12MP",
      battery: "5000mAh, 45W",
      storage: "256GB / 512GB / 1TB",
      special: "S Pen + Galaxy AI",
    },
    {
      name: "iPhone 16 Pro Max",
      price: "34.990.000₫",
      chip: "Apple A18 Pro",
      screen: "6.9\" Super Retina XDR 120Hz",
      camera: "48MP + 12MP + 48MP (5x)",
      battery: "4685mAh, 40W MagSafe",
      storage: "256GB / 512GB / 1TB",
      special: "Apple Intelligence AI",
    },
    {
      name: "OPPO Find X8 Ultra",
      price: "29.990.000₫",
      chip: "Dimensity 9400",
      screen: "6.8\" 2K LTPO AMOLED 120Hz",
      camera: "Hasselblad 50MP (1\") + 50MP + 50MP",
      battery: "6000mAh, 80W",
      storage: "256GB / 512GB",
      special: "Cảm biến 1 inch Hasselblad",
    },
  ];

  const midRange = [
    {
      name: "Redmi Note 14 Pro+",
      price: "8.990.000₫",
      chip: "Dimensity 7300 Ultra",
      screen: "6.67\" 1.5K AMOLED 120Hz",
      camera: "200MP OIS + 8MP + 2MP",
      battery: "5500mAh, 67W",
      storage: "128GB / 256GB",
      special: "IP68 chống nước, 200MP",
    },
    {
      name: "POCO X7 Pro",
      price: "9.490.000₫",
      chip: "Dimensity 8400 Ultra",
      screen: "6.67\" 1.5K Flow AMOLED 120Hz",
      camera: "50MP OIS + 8MP",
      battery: "6000mAh, 90W",
      storage: "256GB / 512GB",
      special: "LiquidCool, hiệu năng gaming",
    },
    {
      name: "Samsung Galaxy A56",
      price: "10.490.000₫",
      chip: "Exynos 1580",
      screen: "6.7\" Super AMOLED 120Hz",
      camera: "50MP OIS + 12MP + 5MP",
      battery: "5000mAh, 45W",
      storage: "128GB / 256GB",
      special: "IP67, 6 năm cập nhật",
    },
  ];

  const specs = ["Chip xử lý", "Màn hình", "Camera", "Pin & Sạc", "Bộ nhớ", "Điểm nổi bật"];

  const renderTable = (data: typeof phones, title: string) => (
    <div style={{ marginBottom: "3rem" }}>
      <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.25rem" }}>{title}</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", minWidth: "600px" }}>
          <thead>
            <tr>
              <th style={{ padding: "0.75rem", textAlign: "left", borderBottom: "2px solid var(--color-border)", fontWeight: 700, fontSize: "0.82rem", color: "var(--color-text-muted)", width: "120px" }}>Thông số</th>
              {data.map((p) => (
                <th key={p.name} style={{ padding: "0.75rem", textAlign: "center", borderBottom: "2px solid var(--color-border)", fontWeight: 800, color: "var(--color-primary)", fontSize: "0.88rem" }}>
                  {p.name}<br />
                  <span style={{ fontWeight: 600, color: "var(--color-text)", fontSize: "0.82rem" }}>{p.price}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, i) => (
              <tr key={spec} style={{ background: i % 2 === 0 ? "var(--color-muted)" : "white" }}>
                <td style={{ padding: "0.7rem", fontWeight: 600, borderBottom: "1px solid var(--color-border)", fontSize: "0.82rem" }}>{spec}</td>
                {data.map((p) => {
                  const values = [p.chip, p.screen, p.camera, p.battery, p.storage, p.special];
                  return (
                    <td key={p.name + spec} style={{ padding: "0.7rem", textAlign: "center", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)", fontSize: "0.82rem" }}>
                      {values[i]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: "92px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1A1A1A, #2d2d2d)", color: "white", padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>📊 So Sánh Điện Thoại</h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>So sánh thông số để chọn smartphone phù hợp nhất</p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>
        {/* Guide */}
        <div style={{ background: "var(--color-primary-light)", borderRadius: "16px", padding: "1.5rem 2rem", marginBottom: "2.5rem", border: "1px solid rgba(255,103,0,0.2)" }}>
          <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.5rem" }}>💡 Hướng dẫn chọn điện thoại</h3>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
            <li>📸 <strong>Chụp ảnh đẹp</strong>: Chọn camera có OIS, cảm biến lớn (Xiaomi 17 Ultra, iPhone 16 Pro Max)</li>
            <li>🎮 <strong>Chơi game</strong>: Ưu tiên chip mạnh + tản nhiệt tốt (POCO X7 Pro, Samsung S25 Ultra)</li>
            <li>🔋 <strong>Pin trâu</strong>: Chọn pin ≥5000mAh + sạc nhanh ≥67W (Xiaomi 17 Ultra, Redmi Note 14 Pro+)</li>
            <li>💰 <strong>Tầm trung tốt nhất</strong>: Redmi Note 14 Pro+ hoặc Samsung Galaxy A56</li>
          </ul>
        </div>

        {renderTable(phones, "🏆 Flagship Cao Cấp (Trên 25 triệu)")}
        {renderTable(midRange, "⭐ Tầm Trung Nổi Bật (Dưới 11 triệu)")}

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>Đã chọn được điện thoại ưng ý?</p>
          <Link href="/products?category=dien-thoai" className="btn-primary" style={{ background: "var(--color-primary)" }}>
            Xem Tất Cả Điện Thoại →
          </Link>
        </div>
      </div>
    </div>
  );
}
