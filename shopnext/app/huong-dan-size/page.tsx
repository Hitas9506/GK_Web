import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hướng Dẫn Chọn Size",
  description: "Bảng size chuẩn ShopNext – áo, quần, váy – giúp bạn chọn size vừa vặn nhất.",
};

const TABLE_HEADERS = ["Size", "Chiều cao", "Cân nặng", "Vòng ngực", "Vòng eo", "Vòng mông"];
const SIZE_ROWS = [
  ["XS",  "148–153 cm", "40–45 kg", "76–80 cm", "58–62 cm", "82–86 cm"],
  ["S",   "153–158 cm", "45–50 kg", "80–84 cm", "62–66 cm", "86–90 cm"],
  ["M",   "158–163 cm", "50–55 kg", "84–88 cm", "66–70 cm", "90–94 cm"],
  ["L",   "163–168 cm", "55–60 kg", "88–92 cm", "70–74 cm", "94–98 cm"],
  ["XL",  "168–173 cm", "60–66 kg", "92–96 cm", "74–78 cm", "98–102 cm"],
  ["XXL", "173–178 cm", "66–73 kg", "96–100 cm","78–84 cm", "102–108 cm"],
];

const PANT_HEADERS = ["Size", "Chiều cao", "Cân nặng", "Vòng eo", "Vòng mông", "Dài quần"];
const PANT_ROWS = [
  ["XS",  "148–153 cm", "40–45 kg", "58–62 cm", "82–86 cm",  "90–92 cm"],
  ["S",   "153–158 cm", "45–50 kg", "62–66 cm", "86–90 cm",  "92–94 cm"],
  ["M",   "158–163 cm", "50–55 kg", "66–70 cm", "90–94 cm",  "94–96 cm"],
  ["L",   "163–168 cm", "55–60 kg", "70–74 cm", "94–98 cm",  "96–98 cm"],
  ["XL",  "168–173 cm", "60–66 kg", "74–78 cm", "98–102 cm", "98–100 cm"],
  ["XXL", "173–178 cm", "66–73 kg", "78–84 cm", "102–108 cm","100–102 cm"],
];

function SizeTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "540px", fontSize: "0.875rem" }}>
        <thead>
          <tr style={{ background: "linear-gradient(135deg,#c8a96e,#a8854a)" }}>
            {headers.map((h) => (
              <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "center", color: "white", fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row[0]} style={{ background: i % 2 === 0 ? "white" : "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "0.65rem 1rem", textAlign: "center", color: j === 0 ? "var(--color-primary)" : "var(--color-text-muted)", fontWeight: j === 0 ? 800 : 400 }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuidePage() {
  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "white", padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>📏</div>
        <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.8rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
          Hướng Dẫn Chọn Size
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
          Đọc bảng size chuẩn để chọn trang phục vừa vặn nhất. Nếu còn phân vân, hãy liên hệ đội ngũ tư vấn!
        </p>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* How to measure */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.25rem" }}>📐 Cách Đo Số Đo</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "👕", title: "Vòng ngực", desc: "Đo vòng tròn lớn nhất của ngực, giữ thước ngang." },
              { icon: "⭕", title: "Vòng eo", desc: "Đo vòng nhỏ nhất của eo, thường trên rốn 2–3 cm." },
              { icon: "🔵", title: "Vòng mông", desc: "Đo vòng lớn nhất của mông, đứng thẳng tự nhiên." },
              { icon: "📏", title: "Chiều dài quần", desc: "Đo từ đỉnh cạp đến gấu, theo đường dọc." },
            ].map((item) => (
              <div key={item.title} style={{ background: "var(--color-muted)", borderRadius: "14px", padding: "1.25rem" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                <p style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.35rem" }}>{item.title}</p>
                <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tops */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>👕 Bảng Size Áo / Váy Đầm</h2>
          <SizeTable headers={TABLE_HEADERS} rows={SIZE_ROWS} />
        </div>

        {/* Pants */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>👖 Bảng Size Quần</h2>
          <SizeTable headers={PANT_HEADERS} rows={PANT_ROWS} />
        </div>

        {/* Tips */}
        <div style={{ background: "#fef9e7", border: "1px solid #f0d060", borderRadius: "14px", padding: "1.5rem", marginBottom: "2.5rem" }}>
          <h3 style={{ fontWeight: 700, marginBottom: "0.75rem", color: "#a07020" }}>💡 Mẹo Chọn Size</h3>
          <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem", color: "#6b5020", fontSize: "0.9rem", lineHeight: 1.7 }}>
            <li>Nếu số đo nằm giữa 2 size, hãy chọn size <strong>lớn hơn</strong> để thoải mái hơn.</li>
            <li>Chất liệu thun co giãn (spandex, lycra) thường fit ngót hơn, nên chọn đúng size.</li>
            <li>Với vải dệt (cotton 100%), có thể co nhẹ sau lần giặt đầu, lưu ý khi chọn size.</li>
            <li>Tham khảo phần <strong>mô tả sản phẩm</strong> – nhân viên thường ghi rõ "size chuẩn" hay "oversized".</li>
          </ul>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>Vẫn chưa chắc chắn về size? Hỗ trợ viên ShopNext luôn sẵn sàng!</p>
          <Link href="/lien-he" className="btn-primary">💬 Tư Vấn Miễn Phí</Link>
        </div>
      </div>
    </div>
  );
}
