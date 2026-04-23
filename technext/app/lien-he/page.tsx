"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [subject,   setSubject]   = useState("Hỗ trợ kỹ thuật");
  const [submitted, setSubmitted] = useState(false);
  const isTechRequest = subject === "Hỗ trợ kỹ thuật";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Simulate form submission (no backend)
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div style={{ paddingTop: "92px" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1A1A1A, #2d2d2d)",
        color: "white", padding: "2.5rem 1.5rem", textAlign: "center",
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Liên Hệ Với Chúng Tôi
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>
          Điền form bên dưới hoặc liên hệ trực tiếp – đội ngũ TechNext sẽ phản hồi trong vòng 30 phút!
        </p>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>

        {/* ── SUCCESS STATE ── */}
        {submitted ? (
          <div style={{ textAlign: "center", padding: "1rem 0 3rem" }}>

            {/* Checkmark circle */}
            <div style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: "linear-gradient(135deg, #FF6700, #ff8c3a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1.5rem",
              boxShadow: "0 8px 24px rgba(255,103,0,0.35)",
              fontSize: "2rem",
            }}>
              ✅
            </div>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem", color: "#1A1A1A" }}>
              Gửi Yêu Cầu Thành Công!
            </h2>
            <p style={{ color: "#666", fontSize: "0.95rem", marginBottom: "2rem" }}>
              Chúng tôi đã nhận được yêu cầu của bạn.
            </p>

            {/* ── Tech-request specific notice ── */}
            {isTechRequest && (
              <div style={{
                maxWidth: "560px", margin: "0 auto 2rem",
                background: "linear-gradient(135deg, #fff8f0, #fff3e6)",
                border: "1.5px solid rgba(255,103,0,0.3)",
                borderRadius: "18px",
                padding: "1.5rem 1.75rem",
                textAlign: "left",
                boxShadow: "0 4px 20px rgba(255,103,0,0.1)",
              }}>
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.75rem" }}>🔧</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: "#1A1A1A" }}>
                      Phiếu Yêu Cầu Kỹ Thuật
                    </p>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "#FF6700", fontWeight: 600 }}>
                      Đang chờ duyệt
                    </p>
                  </div>
                  {/* Pulsing status badge */}
                  <span style={{
                    marginLeft: "auto",
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    background: "rgba(255,103,0,0.12)",
                    border: "1px solid rgba(255,103,0,0.3)",
                    borderRadius: "999px",
                    padding: "0.3rem 0.75rem",
                    fontSize: "0.72rem", fontWeight: 700, color: "#FF6700",
                    whiteSpace: "nowrap",
                  }}>
                    <span style={{
                      width: "7px", height: "7px", borderRadius: "50%",
                      background: "#FF6700",
                      display: "inline-block",
                      animation: "techPulse 1.8s ease-in-out infinite",
                    }} />
                    Chờ Xét Duyệt
                  </span>
                </div>

                {/* Steps */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {[
                    {
                      step: "1",
                      icon: "📋",
                      title: "Phiếu đã được ghi nhận",
                      desc: "Mã phiếu của bạn đã được tạo trong hệ thống.",
                      done: true,
                    },
                    {
                      step: "2",
                      icon: "🔍",
                      title: "Kỹ thuật viên xét duyệt",
                      desc: "Chúng tôi sẽ xem xét và phê duyệt yêu cầu trong vòng 24 giờ làm việc.",
                      done: false,
                    },
                    {
                      step: "3",
                      icon: "📲",
                      title: "Nhận thông báo phê duyệt",
                      desc: "Bạn sẽ nhận được email / SMS xác nhận khi phiếu được duyệt.",
                      done: false,
                    },
                    {
                      step: "4",
                      icon: "🏪",
                      title: "Mang thiết bị đến cửa hàng",
                      desc: "Sau khi nhận thông báo duyệt, vui lòng mang thiết bị đến showroom TechNext gần nhất để được sửa chữa.",
                      done: false,
                      highlight: true,
                    },
                  ].map((s) => (
                    <div key={s.step} style={{
                      display: "flex", gap: "0.85rem", alignItems: "flex-start",
                    }}>
                      {/* Step icon */}
                      <div style={{
                        width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
                        background: s.done
                          ? "linear-gradient(135deg, #FF6700, #ff8c3a)"
                          : s.highlight
                          ? "rgba(255,103,0,0.15)"
                          : "rgba(0,0,0,0.06)",
                        border: s.highlight ? "1.5px solid rgba(255,103,0,0.4)" : "none",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.85rem",
                        boxShadow: s.done ? "0 3px 10px rgba(255,103,0,0.3)" : "none",
                      }}>
                        {s.done ? "✓" : s.icon}
                      </div>
                      <div style={{ flex: 1, paddingTop: "0.15rem" }}>
                        <p style={{
                          margin: "0 0 0.1rem",
                          fontWeight: s.highlight ? 700 : 600,
                          fontSize: "0.85rem",
                          color: s.highlight ? "#FF6700" : "#1A1A1A",
                        }}>
                          {s.title}
                        </p>
                        <p style={{ margin: 0, fontSize: "0.76rem", color: "#777", lineHeight: 1.5 }}>
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Showroom quick-links */}
                <div style={{
                  marginTop: "1.25rem", paddingTop: "1rem",
                  borderTop: "1px solid rgba(255,103,0,0.15)",
                }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#999",
                    letterSpacing: "0.07em", textTransform: "uppercase", margin: "0 0 0.6rem" }}>
                    Hệ thống showroom
                  </p>
                  {[
                    { city: "TP.HCM",   addr: "123 Nguyễn Huệ, Quận 1" },
                    { city: "Hà Nội",   addr: "45 Tràng Tiền, Hoàn Kiếm" },
                    { city: "Đà Nẵng",  addr: "78 Bạch Đằng, Hải Châu" },
                  ].map((sr) => (
                    <p key={sr.city} style={{ margin: "0.2rem 0", fontSize: "0.78rem", color: "#555" }}>
                      📍 <strong>{sr.city}:</strong> {sr.addr}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Generic success notice (non-tech) */}
            {!isTechRequest && (
              <div style={{
                maxWidth: "480px", margin: "0 auto 2rem",
                background: "#f0fdf4",
                border: "1.5px solid rgba(34,197,94,0.3)",
                borderRadius: "16px",
                padding: "1.25rem 1.5rem",
                textAlign: "left",
              }}>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#166534", lineHeight: 1.6 }}>
                  🎉 Cảm ơn bạn đã liên hệ! Đội ngũ TechNext sẽ phản hồi qua email hoặc điện thoại
                  trong vòng <strong>30 phút</strong> trong giờ làm việc (8:00–22:00).
                </p>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  padding: "0.7rem 1.5rem", borderRadius: "30px",
                  border: "1.5px solid rgba(0,0,0,0.15)", background: "white",
                  fontSize: "0.88rem", fontWeight: 600, cursor: "pointer",
                  color: "#1A1A1A", transition: "border-color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#FF6700")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)")}
              >
                ← Gửi yêu cầu khác
              </button>
              <Link
                href="/"
                style={{
                  padding: "0.7rem 1.5rem", borderRadius: "30px",
                  background: "#1A1A1A", color: "white",
                  fontSize: "0.88rem", fontWeight: 600,
                  textDecoration: "none", transition: "background 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#FF6700")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1A1A1A")}
              >
                Về trang chủ
              </Link>
            </div>
          </div>

        ) : (

          /* ── FORM STATE ── */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }} className="contact-grid">
            {/* Form */}
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem" }}>📝 Gửi Tin Nhắn</h2>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Họ tên</label>
                  <input required type="text" name="name" placeholder="Nguyễn Văn A"
                    style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "10px", border: "2px solid var(--color-border)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Email</label>
                  <input required type="email" name="email" placeholder="email@example.com"
                    style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "10px", border: "2px solid var(--color-border)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Chủ đề</label>
                  <select
                    name="subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "10px", border: "2px solid var(--color-border)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: "white" }}
                  >
                    <option>Tư vấn chọn điện thoại</option>
                    <option>Hỏi về bảo hành</option>
                    <option>Đổi trả sản phẩm</option>
                    <option>Hỗ trợ kỹ thuật</option>
                    <option>Hợp tác kinh doanh</option>
                    <option>Khác</option>
                  </select>
                </div>

                {/* Inline hint for tech subject */}
                {isTechRequest && (
                  <div style={{
                    display: "flex", gap: "0.6rem", alignItems: "flex-start",
                    padding: "0.75rem 1rem", borderRadius: "10px",
                    background: "rgba(255,103,0,0.06)",
                    border: "1px solid rgba(255,103,0,0.2)",
                    fontSize: "0.78rem", color: "#c25200", lineHeight: 1.5,
                  }}>
                    <span style={{ flexShrink: 0, marginTop: "0.05rem" }}>ℹ️</span>
                    <span>
                      Sau khi gửi, phiếu kỹ thuật sẽ được xét duyệt.
                      Vui lòng <strong>chờ thông báo phê duyệt</strong> trước khi mang thiết bị đến cửa hàng sửa chữa.
                    </span>
                  </div>
                )}

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Nội dung</label>
                  <textarea required name="message" placeholder="Mô tả chi tiết câu hỏi hoặc yêu cầu của bạn..." rows={5}
                    style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "10px", border: "2px solid var(--color-border)", fontSize: "0.9rem", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: "center" }}>
                  Gửi Tin Nhắn →
                </button>
              </form>
            </div>

            {/* Info */}
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem" }}>📞 Thông Tin Liên Hệ</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { icon: "📍", label: "Địa chỉ",       value: "123 Nguyễn Huệ, Quận 1, TP.HCM" },
                  { icon: "📞", label: "Hotline",        value: "1800 9999 (Miễn phí)" },
                  { icon: "✉️", label: "Email",          value: "support@technext.vn" },
                  { icon: "⏰", label: "Giờ làm việc",  value: "T2 – CN: 8:00 – 22:00" },
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
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes techPulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(255,103,0,0.25); }
          50%       { box-shadow: 0 0 0 6px rgba(255,103,0,0.0);  }
        }
      `}</style>
    </div>
  );
}
