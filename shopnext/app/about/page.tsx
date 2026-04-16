import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới Thiệu",
  description:
    "Tìm hiểu về ShopNext – câu chuyện thương hiệu, sứ mệnh và đội ngũ của chúng tôi.",
};

export default function AboutPage() {
  const team = [
    { name: "Hoàng Thái Đăng Khoa", emoji: "👨‍💻" },
    { name: "Tạ Đình Quốc Thái", emoji: "👨‍💻" },
    { name: "Nguyễn Huy Hoàng", emoji: "👨‍💻" },
  ];

  const milestones = [
    { year: "2018", event: "Thành lập ShopNext tại TP.HCM với 500 sản phẩm đầu tiên." },
    { year: "2019", event: "Ra mắt app mobile, đạt 50,000 khách hàng đầu tiên." },
    { year: "2021", event: "Mở rộng ra Hà Nội, Đà Nẵng. Tổng doanh số vượt 100 tỷ đồng." },
    { year: "2023", event: "Ra mắt chương trình thành viên ShopNext Plus và kho lạnh 24h." },
    { year: "2025", event: "Nâng cấp nền tảng với Next.js 16, phục vụ 500,000+ khách hàng." },
  ];

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          color: "white",
          padding: "5rem 1.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(200,169,110,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(200,169,110,0.08) 0%, transparent 50%)",
          }}
        />
        <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(200,169,110,0.15)",
              color: "var(--color-primary)",
              padding: "0.35rem 1rem",
              borderRadius: "2rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
              border: "1px solid rgba(200,169,110,0.3)",
            }}
          >
            Về Chúng Tôi
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              marginBottom: "1.25rem",
              lineHeight: 1.2,
            }}
          >
            Chúng Tôi Tin Rằng{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #c8a96e, #f0d080)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Thời Trang Là Ngôn Ngữ
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
            }}
          >
            ShopNext ra đời từ tình yêu với thời trang và khát vọng mang đến những
            sản phẩm chất lượng nhất với giá thành hợp lý nhất cho người Việt.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
            className="about-grid"
          >
            <div>
              <h2 className="section-heading">Sứ Mệnh Của Chúng Tôi</h2>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                  fontSize: "0.95rem",
                }}
              >
                Chúng tôi tin rằng mọi người đều xứng đáng có được những bộ
                trang phục thể hiện cá tính của mình mà không phải bỏ ra quá
                nhiều tiền.
              </p>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                }}
              >
                ShopNext cam kết mang đến trải nghiệm mua sắm online tốt nhất:
                từ giao diện thân thiện, thanh toán an toàn, đến dịch vụ hậu
                mãi tận tâm.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {[
                {
                  icon: "🌿",
                  title: "Bền Vững",
                  desc: "Hướng tới thời trang bền vững, thân thiện môi trường.",
                },
                {
                  icon: "💎",
                  title: "Chất Lượng",
                  desc: "Tuyển chọn kỹ càng từng sản phẩm trước khi đến tay khách.",
                },
                {
                  icon: "❤️",
                  title: "Tận Tâm",
                  desc: "Đội ngũ hỗ trợ 24/7, luôn sẵn sàng lắng nghe.",
                },
                {
                  icon: "🚀",
                  title: "Đổi Mới",
                  desc: "Liên tục cập nhật xu hướng, ra mắt bộ sưu tập mới mỗi tuần.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "var(--color-muted)",
                    borderRadius: "16px",
                    padding: "1.25rem",
                  }}
                >
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
                    {item.icon}
                  </div>
                  <h4
                    style={{
                      fontWeight: 700,
                      marginBottom: "0.35rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        style={{
          background: "var(--color-muted)",
          padding: "4rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 className="section-heading" style={{ display: "inline-block" }}>
              Hành Trình Phát Triển
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {milestones.map((m, i) => (
              <div
                key={m.year}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    background:
                      i === milestones.length - 1
                        ? "linear-gradient(135deg, #c8a96e, #a8854a)"
                        : "var(--color-accent)",
                    color: "white",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "8px",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    flexShrink: 0,
                    minWidth: "56px",
                    textAlign: "center",
                  }}
                >
                  {m.year}
                </div>
                <div
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "1rem 1.25rem",
                    flex: 1,
                    fontSize: "0.9rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {m.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 className="section-heading" style={{ display: "inline-block" }}>
              Đội Ngũ Của Chúng Tôi
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="team-card"
                style={{
                  background: "var(--color-muted)",
                  borderRadius: "20px",
                  padding: "2rem 1rem",
                  textAlign: "center",
                  transition: "transform 0.25s ease",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    fontSize: "3.5rem",
                    marginBottom: "1rem",
                    width: "70px",
                    height: "70px",
                    background: "linear-gradient(135deg, rgba(200,169,110,0.2), rgba(200,169,110,0.05))",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                  }}
                >
                  {member.emoji}
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {member.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next.js note */}
      <section
        style={{
          padding: "0 1.5rem 4rem",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            borderRadius: "24px",
            padding: "2.5rem",
            color: "white",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>⚡</div>
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              marginBottom: "0.75rem",
            }}
          >
            Được Xây Dựng Bằng Next.js 16
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "0 auto 1.5rem",
            }}
          >
            ShopNext sử dụng Next.js App Router với các kỹ thuật hiện đại: SSG
            cho trang chủ, ISR cho danh sách sản phẩm, SSR cho chi tiết sản phẩm
            và CSR cho giỏ hàng và tìm kiếm – đảm bảo hiệu năng và SEO tối ưu.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {["Next.js 16", "App Router", "TypeScript", "Tailwind CSS", "Vercel"].map(
              (tech) => (
                <span
                  key={tech}
                  style={{
                    background: "rgba(200,169,110,0.15)",
                    color: "var(--color-primary)",
                    padding: "0.35rem 0.9rem",
                    borderRadius: "2rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    border: "1px solid rgba(200,169,110,0.3)",
                  }}
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
        .team-card:hover { transform: translateY(-5px); }
      `}</style>
    </div>
  );
}
