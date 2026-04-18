import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính Sách Đổi Trả",
  description: "Chính sách đổi trả 30 ngày của ShopNext – miễn phí, không cần lý do.",
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: "2.5rem" }}>
    <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
      {title}
    </h2>
    <div style={{ color: "var(--color-text-muted)", lineHeight: 1.8, fontSize: "0.95rem" }}>
      {children}
    </div>
  </div>
);

export default function ReturnPolicyPage() {
  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "white", padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🔄</div>
        <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.8rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
          Chính Sách Đổi Trả
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
          ShopNext cam kết mang đến trải nghiệm mua sắm an tâm nhất – đổi trả dễ dàng trong <strong style={{ color: "#c8a96e" }}>30 ngày</strong>.
        </p>
      </div>

      {/* Quick badges */}
      <div style={{ background: "var(--color-muted)", padding: "1.5rem", display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        {[
          { icon: "✅", label: "30 ngày đổi trả" },
          { icon: "🚚", label: "Miễn phí vận chuyển" },
          { icon: "💰", label: "Hoàn tiền 100%" },
          { icon: "⚡", label: "Xử lý trong 3–5 ngày" },
        ].map((b) => (
          <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", fontWeight: 600, color: "var(--color-text)" }}>
            <span>{b.icon}</span><span>{b.label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        <Section title="📋 Điều Kiện Đổi Trả">
          <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>Sản phẩm còn nguyên tem, nhãn, chưa qua sử dụng, chưa giặt.</li>
            <li>Có hóa đơn mua hàng hoặc mã đơn hàng từ ShopNext.</li>
            <li>Thời gian yêu cầu đổi/trả trong vòng <strong>30 ngày</strong> kể từ ngày nhận hàng.</li>
            <li>Sản phẩm lỗi do nhà sản xuất: đổi trả miễn phí, không giới hạn thời gian bảo hành.</li>
          </ul>
        </Section>

        <Section title="🚫 Trường Hợp Không Được Đổi Trả">
          <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>Sản phẩm đã qua sử dụng, có dấu hiệu giặt giũ hoặc biến dạng.</li>
            <li>Sản phẩm khuyến mãi, sale trên 50% (trừ lỗi nhà sản xuất).</li>
            <li>Đồ lót, bộ đồ bơi vì lý do vệ sinh.</li>
            <li>Quá 30 ngày kể từ ngày nhận hàng.</li>
          </ul>
        </Section>

        <Section title="🔄 Quy Trình Đổi Trả">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { step: "1", title: "Liên hệ hỗ trợ", desc: "Gọi 1800 1234 hoặc email support@shopnext.vn, cung cấp mã đơn và lý do đổi trả." },
              { step: "2", title: "Gửi hàng", desc: "Đóng gói sản phẩm cẩn thận và gửi về địa chỉ kho hàng ShopNext. Phí ship 2 chiều ShopNext hỗ trợ." },
              { step: "3", title: "Kiểm tra", desc: "Đội ngũ kiểm tra sản phẩm trong 1–2 ngày làm việc sau khi nhận hàng." },
              { step: "4", title: "Hoàn tiền / Gửi hàng mới", desc: "Hoàn tiền qua tài khoản gốc trong 3–5 ngày, hoặc gửi sản phẩm mới trong 24h." },
            ].map((s) => (
              <div key={s.step} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#c8a96e,#a8854a)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>{s.step}</div>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: "0.25rem", color: "var(--color-text)" }}>{s.title}</p>
                  <p style={{ margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="💳 Phương Thức Hoàn Tiền">
          <p>Hoàn tiền được thực hiện qua phương thức thanh toán ban đầu:</p>
          <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <li>Thanh toán COD → chuyển khoản ngân hàng (1–3 ngày làm việc)</li>
            <li>Ví MoMo / ZaloPay → hoàn về ví (trong 24h)</li>
            <li>VNPay / Thẻ → hoàn về tài khoản gốc (3–7 ngày)</li>
          </ul>
        </Section>

        <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", borderRadius: "16px", padding: "2rem", textAlign: "center", color: "white" }}>
          <p style={{ fontWeight: 700, marginBottom: "0.75rem", fontSize: "1.05rem" }}>Cần hỗ trợ thêm?</p>
          <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1.25rem", fontSize: "0.9rem" }}>Đội ngũ ShopNext phục vụ Thứ 2 – CN: 8:00 – 22:00</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/lien-he" className="btn-primary">📞 Liên Hệ Ngay</Link>
            <Link href="/orders" className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}>📦 Theo Dõi Đơn Hàng</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
