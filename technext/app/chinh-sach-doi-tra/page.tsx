import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính Sách Đổi Trả & Bảo Hành",
  description: "Chính sách đổi trả 7 ngày, bảo hành 12 tháng chính hãng của TechNext.",
};

export default function ReturnPolicyPage() {
  return (
    <div style={{ paddingTop: "92px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1A1A1A, #2d2d2d)", color: "white", padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Chính Sách Đổi Trả & Bảo Hành</h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>Mua sắm an tâm với TechNext</p>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>
        {/* Intro */}
        <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2.5rem", textAlign: "center" }}>
          TechNext cam kết mang đến trải nghiệm mua sắm an tâm nhất – đổi trả dễ dàng trong <strong style={{ color: "var(--color-primary)" }}>7 ngày</strong>, bảo hành chính hãng <strong style={{ color: "var(--color-primary)" }}>12 tháng</strong>.
        </p>

        {/* Đổi trả */}
        <div style={{ background: "var(--color-muted)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>📦 Chính Sách Đổi Trả 7 Ngày</h2>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
            <li>✅ <strong>1 đổi 1</strong> trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất (DOA).</li>
            <li>✅ Hoàn tiền 100% nếu sản phẩm không đúng mô tả hoặc không đúng model.</li>
            <li>✅ Miễn phí vận chuyển 2 chiều khi đổi trả do lỗi nhà sản xuất.</li>
            <li>⚠️ Sản phẩm phải còn nguyên seal, phụ kiện đầy đủ, chưa active bảo hành.</li>
            <li>⚠️ Không áp dụng cho sản phẩm đã qua sử dụng, trầy xước do người dùng.</li>
          </ul>
        </div>

        {/* Bảo hành */}
        <div style={{ background: "var(--color-muted)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>🛡️ Bảo Hành Chính Hãng</h2>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
            <li>✅ Bảo hành chính hãng <strong>12 tháng</strong> cho điện thoại, tablet.</li>
            <li>✅ Bảo hành <strong>6 tháng</strong> cho tai nghe, phụ kiện.</li>
            <li>✅ Bảo hành tại trung tâm dịch vụ ủy quyền trên toàn quốc.</li>
            <li>✅ TechNext Care+: Mua thêm gói bảo hành mở rộng lên 24 tháng.</li>
            <li>⚠️ Không bảo hành: rơi vỡ, vào nước, tự ý tháo lắp, jailbreak/root.</li>
          </ul>
        </div>

        {/* Quy trình */}
        <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem" }}>📋 Quy Trình Đổi Trả / Bảo Hành</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
          {[
            { step: "1", title: "Liên hệ hỗ trợ", desc: "Gọi 1800 9999 hoặc email support@technext.vn, cung cấp mã đơn và mô tả lỗi." },
            { step: "2", title: "Gửi sản phẩm", desc: "Đóng gói sản phẩm cẩn thận kèm phụ kiện và gửi về kho TechNext. Phí ship TechNext hỗ trợ." },
            { step: "3", title: "Kiểm tra", desc: "Đội kỹ thuật kiểm tra sản phẩm trong 1-2 ngày làm việc." },
            { step: "4", title: "Hoàn tất", desc: "Đổi sản phẩm mới hoặc hoàn tiền qua phương thức thanh toán ban đầu trong 3-5 ngày." },
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
          <h3 style={{ fontWeight: 800, fontSize: "1.15rem", marginBottom: "0.5rem" }}>Cần hỗ trợ?</h3>
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
