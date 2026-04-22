import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên Hệ",
  description: "Liên hệ TechNext – hỗ trợ tư vấn chọn điện thoại, bảo hành, đổi trả.",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "92px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1A1A1A, #2d2d2d)", color: "white", padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Liên Hệ Với Chúng Tôi</h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>
          Điền form bên dưới hoặc liên hệ trực tiếp – đội ngũ TechNext sẽ phản hồi trong vòng 30 phút!
        </p>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }} className="contact-grid">
          {/* Form */}
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem" }}>📝 Gửi Tin Nhắn</h2>
            <form action="#" method="post" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Họ tên</label>
                <input type="text" name="name" placeholder="Nguyễn Văn A" style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "10px", border: "2px solid var(--color-border)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Email</label>
                <input type="email" name="email" placeholder="email@example.com" style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "10px", border: "2px solid var(--color-border)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Chủ đề</label>
                <select name="subject" style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "10px", border: "2px solid var(--color-border)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: "white" }}>
                  <option>Tư vấn chọn điện thoại</option>
                  <option>Hỏi về bảo hành</option>
                  <option>Đổi trả sản phẩm</option>
                  <option>Hỗ trợ kỹ thuật</option>
                  <option>Hợp tác kinh doanh</option>
                  <option>Khác</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Nội dung</label>
                <textarea name="message" placeholder="Mô tả chi tiết câu hỏi hoặc yêu cầu của bạn..." rows={5} style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "10px", border: "2px solid var(--color-border)", fontSize: "0.9rem", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
              <button type="submit" className="btn-primary" style={{ justifyContent: "center" }}>Gửi Tin Nhắn →</button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem" }}>📞 Thông Tin Liên Hệ</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "📍", label: "Địa chỉ", value: "123 Nguyễn Huệ, Quận 1, TP.HCM" },
                { icon: "📞", label: "Hotline", value: "1800 9999 (Miễn phí)" },
                { icon: "✉️", label: "Email", value: "support@technext.vn" },
                { icon: "⏰", label: "Giờ làm việc", value: "T2 – CN: 8:00 – 22:00" },
              ].map((info) => (
                <div key={info.label} style={{ display: "flex", gap: "0.75rem", padding: "1rem", background: "var(--color-muted)", borderRadius: "12px" }}>
                  <span style={{ fontSize: "1.25rem" }}>{info.icon}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.1rem" }}>{info.label}</p>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Showrooms */}
            <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--color-primary-light)", borderRadius: "12px", border: "1px solid rgba(255,103,0,0.2)" }}>
              <h3 style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.75rem" }}>🏪 Hệ Thống Showroom</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                <li>📍 <strong>TP.HCM:</strong> 123 Nguyễn Huệ, Q.1</li>
                <li>📍 <strong>Hà Nội:</strong> 45 Tràng Tiền, Hoàn Kiếm</li>
                <li>📍 <strong>Đà Nẵng:</strong> 78 Bạch Đằng, Hải Châu</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
