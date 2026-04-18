"use client";

import { useState } from "react";

// Metadata is set via a separate file since this is a client component
// export const metadata = { title: "Liên Hệ" }; // Can't use in client component

const inputCls: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "10px",
  border: "2px solid var(--color-border)",
  fontSize: "0.9rem",
  outline: "none",
  fontFamily: "inherit",
  transition: "border 0.2s",
  boxSizing: "border-box",
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const withFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.border = "2px solid var(--color-primary)");
  const withBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.border = "2px solid var(--color-border)");

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "white", padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>💬</div>
        <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.8rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
          Liên Hệ Với Chúng Tôi
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
          Điền form bên dưới hoặc liên hệ trực tiếp – đội ngũ ShopNext sẽ phản hồi trong vòng 30 phút!
        </p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 1.5rem 5rem", display: "grid", gridTemplateColumns: "1fr 380px", gap: "3rem", alignItems: "start" }} className="contact-grid">

        {/* Form */}
        <div style={{ background: "white", borderRadius: "20px", padding: "2rem", boxShadow: "0 8px 32px rgba(0,0,0,0.07)", border: "1px solid var(--color-border)" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem" }}>Gửi Tin Nhắn</h2>

          {sent && (
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "10px", padding: "0.875rem 1rem", marginBottom: "1.25rem", color: "#15803d", fontWeight: 600, fontSize: "0.9rem" }}>
              ✅ Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất có thể.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Họ và tên *</label>
                <input value={form.name} onChange={set("name")} placeholder="Nguyễn Văn A" style={inputCls} onFocus={withFocus} onBlur={withBlur} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Email *</label>
                <input type="email" value={form.email} onChange={set("email")} placeholder="email@example.com" style={inputCls} onFocus={withFocus} onBlur={withBlur} required />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Chủ đề</label>
              <select value={form.subject} onChange={set("subject")} style={{ ...inputCls, cursor: "pointer" }} onFocus={withFocus} onBlur={withBlur}>
                <option value="">-- Chọn chủ đề --</option>
                <option value="order">Hỏi về đơn hàng</option>
                <option value="product">Tư vấn sản phẩm</option>
                <option value="return">Đổi trả hàng</option>
                <option value="payment">Thanh toán</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Nội dung *</label>
              <textarea
                value={form.message}
                onChange={set("message")}
                placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                rows={5}
                style={{ ...inputCls, resize: "vertical" }}
                onFocus={withFocus}
                onBlur={withBlur}
                required
              />
            </div>
            <button type="submit" className="btn-primary" style={{ justifyContent: "center", width: "100%" }}>
              📨 Gửi Tin Nhắn
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Contact info */}
          <div style={{ background: "white", borderRadius: "20px", padding: "1.75rem", boxShadow: "0 8px 32px rgba(0,0,0,0.07)", border: "1px solid var(--color-border)" }}>
            <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1.25rem" }}>📋 Thông Tin Liên Hệ</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {[
                { icon: "📍", label: "Địa chỉ", value: "123 Nguyễn Huệ, Q.1, TP.HCM" },
                { icon: "📞", label: "Hotline", value: "1800 1234 (Miễn phí)" },
                { icon: "✉️", label: "Email", value: "support@shopnext.vn" },
                { icon: "⏰", label: "Giờ làm việc", value: "Thứ 2 – CN: 8:00 – 22:00" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.1rem", marginTop: "1px" }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: "0 0 0.1rem" }}>{item.label}</p>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response time */}
          <div style={{ background: "linear-gradient(135deg,#c8a96e,#a8854a)", borderRadius: "20px", padding: "1.5rem", color: "white" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚡</div>
            <h3 style={{ fontWeight: 800, marginBottom: "0.5rem" }}>Phản Hồi Nhanh</h3>
            <p style={{ fontSize: "0.875rem", opacity: 0.85, lineHeight: 1.6, margin: 0 }}>
              Thường phản hồi trong <strong>30 phút</strong> trong giờ làm việc. Ngoài giờ sẽ phản hồi vào sáng hôm sau.
            </p>
          </div>

          {/* Social */}
          <div style={{ background: "white", borderRadius: "20px", padding: "1.5rem", boxShadow: "0 8px 32px rgba(0,0,0,0.07)", border: "1px solid var(--color-border)" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem" }}>🌐 Mạng Xã Hội</h3>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { icon: "📘", label: "Facebook" },
                { icon: "📸", label: "Instagram" },
                { icon: "🐦", label: "Twitter/X" },
                { icon: "📺", label: "YouTube" },
              ].map((s) => (
                <a key={s.label} href="#" title={s.label} style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--color-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", textDecoration: "none", transition: "transform 0.15s" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
