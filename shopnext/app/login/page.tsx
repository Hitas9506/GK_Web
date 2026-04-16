"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, loginWithSocial } = useAuth();
  const router = useRouter();

  const [emailOrUser, setEmailOrUser] = useState("");
  const [password,    setPassword]    = useState("");
  const [error,       setError]       = useState("");
  const [loading,     setLoading]     = useState(false);
  const [socialLoad,  setSocialLoad]  = useState<"google" | "facebook" | null>(null);
  const [showPw,      setShowPw]      = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!emailOrUser || !password) { setError("Vui lòng nhập đầy đủ thông tin"); return; }
    setLoading(true);
    const result = await login(emailOrUser, password);
    setLoading(false);
    if (result.ok) router.push("/orders");
    else setError(result.error ?? "Đăng nhập thất bại");
  };

  const handleSocial = async (provider: "google" | "facebook") => {
    setSocialLoad(provider);
    await new Promise((r) => setTimeout(r, 900));
    loginWithSocial(provider);
    setSocialLoad(null);
    router.push("/");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.72rem 1rem", borderRadius: "10px",
    border: "2px solid var(--color-border)", fontSize: "0.9rem",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit",
    transition: "border 0.2s",
  };

  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh", background: "linear-gradient(135deg, #f7f4f0, #ede8e0)", display: "flex", alignItems: "center", justifyContent: "center", padding: "90px 1.5rem 3rem" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "42px", height: "42px", background: "linear-gradient(135deg,#c8a96e,#a8854a)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>👜</div>
            <span style={{ fontSize: "1.7rem", fontWeight: 800, background: "linear-gradient(135deg,#c8a96e,#1a1a2e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ShopNext</span>
          </Link>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.88rem", marginTop: "0.4rem" }}>Chào mừng trở lại 👋</p>
        </div>

        {/* Card */}
        <div style={{ background: "white", borderRadius: "24px", padding: "2.25rem", boxShadow: "0 20px 60px rgba(0,0,0,0.09)", border: "1px solid var(--color-border)" }}>
          <h1 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "1.5rem" }}>Đăng Nhập</h1>

          {/* Social buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.5rem" }}>
            {/* Google */}
            <button onClick={() => handleSocial("google")} disabled={!!socialLoad || loading}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", padding: "0.7rem 1rem", borderRadius: "10px", border: "2px solid #e8e0d5", background: socialLoad === "google" ? "#f5f5f5" : "white", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, transition: "all 0.2s", fontFamily: "inherit" }}>
              {socialLoad === "google" ? "⏳" : (
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.56 1.23 9.04 3.26l6.74-6.74C35.64 2.38 30.2 0 24 0 14.62 0 6.51 5.48 2.54 13.44l7.87 6.11C12.36 13.28 17.72 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.41 28.09A14.61 14.61 0 019.5 24c0-1.41.25-2.79.6-4.09l-7.87-6.1A23.932 23.932 0 000 24c0 3.77.85 7.34 2.35 10.52l8.06-6.43z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-8.1 6.27C6.55 42.68 14.62 48 24 48z"/>
                </svg>
              )}
              {socialLoad === "google" ? "Đang xử lý..." : "Tiếp tục với Google"}
            </button>

            {/* Facebook */}
            <button onClick={() => handleSocial("facebook")} disabled={!!socialLoad || loading}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", padding: "0.7rem 1rem", borderRadius: "10px", border: "2px solid #1877f2", background: socialLoad === "facebook" ? "#1565c0" : "#1877f2", color: "white", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, transition: "all 0.2s", fontFamily: "inherit" }}>
              {socialLoad === "facebook" ? "⏳" : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              )}
              {socialLoad === "facebook" ? "Đang xử lý..." : "Tiếp tục với Facebook"}
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>hoặc đăng nhập bằng email</span>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Email hoặc tên đăng nhập</label>
              <input type="text" value={emailOrUser} onChange={(e) => setEmailOrUser(e.target.value)}
                placeholder="email@shopnext.vn hoặc admin"
                style={inputStyle}
                onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")}
                onBlur={(e)  => (e.target.style.border = "2px solid var(--color-border)")}
                autoComplete="username" />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Mật khẩu</label>
              <div style={{ position: "relative" }}>
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: "2.8rem" }}
                  onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")}
                  onBlur={(e)  => (e.target.style.border = "2px solid var(--color-border)")}
                  autoComplete="current-password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", cursor: "pointer", fontSize: "1rem", color: "var(--color-text-muted)" }}>
                  {showPw ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "0.6rem 0.85rem", fontSize: "0.82rem", color: "#dc2626" }}>
                ⚠️ {error}
              </div>
            )}

            <button type="submit" disabled={loading || !!socialLoad}
              style={{ padding: "0.82rem", borderRadius: "12px", border: "none", background: loading ? "#d4b896" : "linear-gradient(135deg,#c8a96e,#a8854a)", color: "white", fontWeight: 700, fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 14px rgba(200,169,110,0.35)", fontFamily: "inherit" }}>
              {loading ? "Đang đăng nhập..." : "Đăng Nhập →"}
            </button>
          </form>

          {/* Demo hint */}
          <div style={{ marginTop: "1.25rem", padding: "0.85rem", background: "var(--color-muted)", borderRadius: "10px", fontSize: "0.76rem", color: "var(--color-text-muted)", lineHeight: 1.8 }}>
            <p style={{ fontWeight: 600, marginBottom: "0.2rem", color: "var(--color-text)" }}>💡 Tài khoản demo nhanh:</p>
            <p>👤 <strong>admin</strong> / <strong>admin</strong> &nbsp;|&nbsp; 🛍️ <strong>demo@shopnext.vn</strong> / <strong>demo123</strong></p>
          </div>
        </div>

        {/* Register link */}
        <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
          Chưa có tài khoản?{" "}
          <Link href="/register" style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>Đăng ký ngay →</Link>
        </p>
        <p style={{ textAlign: "center", marginTop: "0.5rem", fontSize: "0.82rem" }}>
          <Link href="/" style={{ color: "var(--color-text-muted)", textDecoration: "none" }}>← Về trang chủ</Link>
        </p>
      </div>
    </div>
  );
}
