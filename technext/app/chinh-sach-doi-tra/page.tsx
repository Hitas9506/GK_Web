import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính Sách Đổi Trả – TechNext",
  description: "Chính sách đổi trả 7 ngày chính hãng tại TechNext. Đổi 1-1 lỗi nhà sản xuất, hoàn tiền 100% nếu sai model.",
};

export default function ReturnPolicyPage() {
  return (
    <div style={{ paddingTop: "92px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1A1A1A, #2d2d2d)", color: "white", padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📦</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Chính Sách Đổi Trả</h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>Đổi trả dễ dàng trong 7 ngày – Mua sắm an tâm cùng TechNext</p>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>

        {/* Quick nav to warranty */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(255,103,0,0.06)", border: "1px solid rgba(255,103,0,0.2)",
          borderRadius: "12px", padding: "0.85rem 1.25rem", marginBottom: "2rem",
          flexWrap: "wrap", gap: "0.5rem",
        }}>
          <span style={{ fontSize: "0.85rem", color: "#666" }}>
            🛡️ Tìm kiếm <strong>Chính Sách Bảo Hành</strong>?
          </span>
          <Link href="/chinh-sach-bao-hanh" style={{
            fontSize: "0.82rem", fontWeight: 700, color: "#FF6700",
            textDecoration: "none", whiteSpace: "nowrap",
          }}>
            Xem Bảo Hành →
          </Link>
        </div>

        {/* Intro */}
        <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2.5rem", textAlign: "center" }}>
          TechNext cam kết đổi trả trong <strong style={{ color: "var(--color-primary)" }}>7 ngày</strong> kể
          từ ngày nhận hàng nếu sản phẩm có lỗi do nhà sản xuất hoặc không đúng mô tả.
        </p>

        {/* Điều kiện */}
        <div style={{ background: "var(--color-muted)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "1rem" }}>✅ Điều Kiện Được Đổi Trả</h2>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
            <li>✅ <strong>1 đổi 1</strong> trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất (DOA).</li>
            <li>✅ <strong>Hoàn tiền 100%</strong> nếu sản phẩm không đúng mô tả hoặc không đúng model.</li>
            <li>✅ Miễn phí vận chuyển 2 chiều khi đổi trả do lỗi nhà sản xuất.</li>
            <li>✅ Áp dụng cho tất cả sản phẩm mua tại TechNext (online & showroom).</li>
          </ul>
        </div>

        {/* Không áp dụng */}
        <div style={{ background: "#fff5f5", border: "1px solid rgba(255,71,87,0.2)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "1rem", color: "#c0392b" }}>⚠️ Không Áp Dụng Đổi Trả</h2>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.9rem", color: "#666", lineHeight: 1.7 }}>
            <li>⚠️ Sản phẩm đã qua sử dụng, trầy xước, vỡ màn hình do người dùng.</li>
            <li>⚠️ Sản phẩm không còn nguyên seal, thiếu phụ kiện hoặc đã active bảo hành.</li>
            <li>⚠️ Yêu cầu đổi trả sau 7 ngày kể từ ngày nhận hàng.</li>
            <li>⚠️ Sản phẩm đã qua chỉnh sửa, tháo lắp, hoặc jailbreak/root.</li>
          </ul>
        </div>

        {/* Quy trình */}
        <h2 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "1.25rem" }}>📋 Quy Trình Đổi Trả</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
          {[
            { step: "1", title: "Liên hệ hỗ trợ", desc: "Gọi 1800 9999 hoặc email support@technext.vn, cung cấp mã đơn hàng và mô tả lỗi." },
            { step: "2", title: "Gửi sản phẩm về", desc: "Đóng gói sản phẩm cẩn thận kèm đầy đủ phụ kiện. TechNext hỗ trợ phí vận chuyển chiều về." },
            { step: "3", title: "Kiểm tra kỹ thuật", desc: "Đội kỹ thuật kiểm tra sản phẩm trong 1–2 ngày làm việc và xác nhận kết quả." },
            { step: "4", title: "Hoàn tất", desc: "Gửi sản phẩm mới hoặc hoàn tiền 100% qua phương thức thanh toán ban đầu trong 3–5 ngày." },
          ].map((s) => (
            <div key={s.step} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--color-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", flexShrink: 0 }}>{s.step}</div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.15rem" }}>{s.title}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg, #1A1A1A, #333)", borderRadius: "20px", padding: "2.5rem", textAlign: "center", color: "white" }}>
          <h3 style={{ fontWeight: 800, fontSize: "1.15rem", marginBottom: "0.5rem" }}>Cần hỗ trợ đổi trả?</h3>
          <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1.25rem", fontSize: "0.9rem" }}>Đội ngũ TechNext phục vụ Thứ 2 – CN: 8:00 – 22:00</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/lien-he" className="btn-primary" style={{ background: "var(--color-primary)" }}>✉️ Liên Hệ</Link>
            <a href="tel:18009999" className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}>📞 1800 9999</a>
          </div>
        </div>
      </div>
    </div>
  );
}
