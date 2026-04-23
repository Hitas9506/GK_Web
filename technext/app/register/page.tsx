"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

/* ── Field component defined outside render to avoid re-creation ── */
interface FieldProps {
  label: string; field: string; type?: string; placeholder: string;
  extra?: React.ReactNode;
  form: Record<string, string>;
  errors: Record<string, string>;
  showPw: boolean;
  set: (field: string, value: string) => void;
  inputStyle: (hasErr: boolean) => React.CSSProperties;
}
function Field({ label, field, type = "text", placeholder, extra, form, errors, showPw, set, inputStyle }: FieldProps) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={field === "password" || field === "confirm" ? (showPw ? "text" : "password") : type}
          value={form[field] ?? ""}
          onChange={(e) => set(field, e.target.value)}
          placeholder={placeholder}
          style={{ ...inputStyle(!!errors[field]), paddingRight: extra ? "2.8rem" : "1rem" }}
          onFocus={(e) => { if (!errors[field]) e.target.style.border = "2px solid var(--color-primary)"; }}
          onBlur={(e)  => { if (!errors[field]) e.target.style.border = "2px solid var(--color-border)"; }}
        />
        {extra}
      </div>
      {errors[field] && <p style={{ fontSize: "0.75rem", color: "#dc2626", marginTop: "0.25rem" }}>⚠️ {errors[field]}</p>}
    </div>
  );
}

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim())    errs.name    = "Vui lòng nhập họ tên";
    if (!form.email.includes("@")) errs.email = "Email không hợp lệ";
    if (form.password.length < 6)  errs.password = "Mật khẩu tối thiểu 6 ký tự";
    if (form.password !== form.confirm) errs.confirm = "Mật khẩu xác nhận không khớp";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    const result = await register(form.name.trim(), form.email.trim(), form.password);
    setLoading(false);

    if (result.ok) {
      router.push("/profile");
    } else {
      setErrors({ email: result.error ?? "Đăng ký thất bại" });
    }
  };

  const inputStyle = (hasErr: boolean): React.CSSProperties => ({
    width: "100%", padding: "0.72rem 1rem", borderRadius: "10px",
    border: `2px solid ${hasErr ? "#fca5a5" : "var(--color-border)"}`,
    fontSize: "0.9rem", outline: "none", boxSizing: "border-box",
    fontFamily: "inherit", transition: "border 0.2s",
    background: hasErr ? "#fff5f5" : "white",
  });

  const fieldProps = { form, errors, showPw, set, inputStyle };


  return (
    <div style={{ paddingTop: "92px", minHeight: "100vh", background: "linear-gradient(135deg,#F5F5F5,#E8E8E8)", display: "flex", alignItems: "center", justifyContent: "center", padding: "90px 1.5rem 3rem" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "42px", height: "42px", background: "var(--color-primary)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>📱</div>
            <span style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--color-accent)" }}>Tech<span style={{ color: "var(--color-primary)" }}>Next</span></span>
          </Link>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.88rem", marginTop: "0.4rem" }}>Tạo tài khoản miễn phí 🎉</p>
        </div>

        {/* Card */}
        <div style={{ background: "white", borderRadius: "24px", padding: "2.25rem", boxShadow: "0 20px 60px rgba(0,0,0,0.09)", border: "1px solid var(--color-border)" }}>
          <h1 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "1.5rem" }}>Đăng Ký</h1>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Field {...fieldProps} label="Họ và tên" field="name" placeholder="Nguyễn Văn A" />
            <Field {...fieldProps} label="Email" field="email" type="email" placeholder="email@example.com" />
            <Field {...fieldProps} label="Mật khẩu" field="password" placeholder="Tối thiểu 6 ký tự"
              extra={
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", cursor: "pointer", fontSize: "1rem", color: "var(--color-text-muted)" }}>
                  {showPw ? "🙈" : "👁️"}
                </button>
              }
            />
            <Field {...fieldProps} label="Xác nhận mật khẩu" field="confirm" placeholder="Nhập lại mật khẩu" />

            {/* Password strength indicator */}
            {form.password.length > 0 && (
              <div style={{ marginTop: "-0.5rem" }}>
                <div style={{ height: "4px", borderRadius: "2px", background: "var(--color-muted)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: form.password.length >= 10 ? "100%" : form.password.length >= 6 ? "60%" : "30%", background: form.password.length >= 10 ? "#27ae60" : form.password.length >= 6 ? "#f39c12" : "#e74c3c", transition: "all 0.3s", borderRadius: "2px" }} />
                </div>
                <p style={{ fontSize: "0.7rem", color: form.password.length >= 10 ? "#27ae60" : form.password.length >= 6 ? "#f39c12" : "#e74c3c", marginTop: "0.2rem" }}>
                  {form.password.length >= 10 ? "Mạnh 💪" : form.password.length >= 6 ? "Trung bình" : "Yếu"}
                </p>
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ marginTop: "0.25rem", padding: "0.82rem", borderRadius: "12px", border: "none", background: loading ? "#999" : "var(--color-accent)", color: "white", fontWeight: 700, fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.15)", fontFamily: "inherit" }}>
              {loading ? "Đang tạo tài khoản..." : "Tạo Tài Khoản →"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
          Đã có tài khoản?{" "}
          <Link href="/login" style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>Đăng nhập →</Link>
        </p>
      </div>
    </div>
  );
}
