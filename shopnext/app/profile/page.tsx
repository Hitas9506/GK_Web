"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import type { ShippingInfo } from "@/context/AuthContext";

const CITIES = ["Hà Nội","TP. Hồ Chí Minh","Đà Nẵng","Cần Thơ","Hải Phòng","Biên Hòa","Nha Trang","Huế","Buôn Ma Thuột","Vũng Tàu"];

const inputCls: React.CSSProperties = {
  width: "100%", padding: "0.68rem 0.9rem", borderRadius: "9px",
  border: "2px solid var(--color-border)", fontSize: "0.88rem",
  outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  transition: "border 0.2s",
};

export default function ProfilePage() {
  const { user, isLoading, updateProfile, updateShipping } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState<"info" | "shipping" | "password">("info");

  // Profile info
  const [name,  setName]  = useState("");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  // Shipping
  const [ship, setShip] = useState<ShippingInfo>({ fullName: "", phone: "", address: "", ward: "", district: "", city: "" });
  const [shipSaved, setShipSaved] = useState(false);

  // Password
  const [pw, setPw] = useState({ old: "", newPw: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [pwOk, setPwOk] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      if (user.shippingInfo) setShip(user.shippingInfo);
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: name.trim(), phone: phone.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSaveShipping = (e: React.FormEvent) => {
    e.preventDefault();
    updateShipping(ship);
    setShipSaved(true);
    setTimeout(() => setShipSaved(false), 2500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    if (pw.newPw.length < 6) { setPwError("Mật khẩu mới tối thiểu 6 ký tự"); return; }
    if (pw.newPw !== pw.confirm) { setPwError("Mật khẩu xác nhận không khớp"); return; }
    setPwOk(true);
    setPw({ old: "", newPw: "", confirm: "" });
    setTimeout(() => setPwOk(false), 2500);
  };

  const TABS = [
    { id: "info",     label: "👤 Thông tin cơ bản" },
    { id: "shipping", label: "📦 Địa chỉ giao hàng" },
    { id: "password", label: "🔑 Đổi mật khẩu" },
  ] as const;

  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh", background: "linear-gradient(135deg,#f7f4f0,#ede8e0)" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "white", padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>{user.avatar}</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>{user.name}</h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
          {user.email} {user.role === "admin" && <span style={{ background: "var(--color-primary)", color: "white", padding: "0.1rem 0.5rem", borderRadius: "1rem", fontSize: "0.7rem", fontWeight: 700, marginLeft: "0.4rem" }}>ADMIN</span>}
        </p>
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ padding: "0.55rem 1.1rem", borderRadius: "2rem", border: tab === t.id ? "none" : "2px solid var(--color-border)", background: tab === t.id ? "var(--color-primary)" : "white", color: tab === t.id ? "white" : "var(--color-text)", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Card */}
        <div style={{ background: "white", borderRadius: "20px", padding: "2rem", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: "1px solid var(--color-border)" }}>

          {/* ── Tab: Thông tin cơ bản ── */}
          {tab === "info" && (
            <form onSubmit={handleSaveInfo}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem" }}>Thông tin cơ bản</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="profile-grid">
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Họ và tên *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A" style={inputCls}
                    onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")}
                    onBlur={(e)  => (e.target.style.border = "2px solid var(--color-border)")} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Email</label>
                  <input value={user.email} readOnly style={{ ...inputCls, background: "var(--color-muted)", color: "var(--color-text-muted)", cursor: "not-allowed" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Số điện thoại</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0901234567" style={inputCls}
                    onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")}
                    onBlur={(e)  => (e.target.style.border = "2px solid var(--color-border)")} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.5rem" }}>
                <button type="submit" style={{ padding: "0.72rem 1.75rem", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#c8a96e,#a8854a)", color: "white", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Lưu thay đổi
                </button>
                {saved && <span style={{ color: "#27ae60", fontSize: "0.88rem", fontWeight: 600 }}>✓ Đã lưu!</span>}
              </div>
            </form>
          )}

          {/* ── Tab: Địa chỉ giao hàng ── */}
          {tab === "shipping" && (
            <form onSubmit={handleSaveShipping}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>Địa chỉ giao hàng</h2>
              <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>Thông tin này sẽ tự điền vào khi bạn thanh toán</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="profile-grid">
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Họ tên người nhận *</label>
                  <input value={ship.fullName} onChange={(e) => setShip({ ...ship, fullName: e.target.value })} placeholder="Nguyễn Văn A" style={inputCls}
                    onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")}
                    onBlur={(e)  => (e.target.style.border = "2px solid var(--color-border)")} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Số điện thoại *</label>
                  <input value={ship.phone} onChange={(e) => setShip({ ...ship, phone: e.target.value })} placeholder="0901234567" style={inputCls}
                    onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")}
                    onBlur={(e)  => (e.target.style.border = "2px solid var(--color-border)")} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Địa chỉ (số nhà, đường) *</label>
                  <input value={ship.address} onChange={(e) => setShip({ ...ship, address: e.target.value })} placeholder="123 Đường Lê Lợi" style={inputCls}
                    onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")}
                    onBlur={(e)  => (e.target.style.border = "2px solid var(--color-border)")} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Phường/Xã</label>
                  <input value={ship.ward} onChange={(e) => setShip({ ...ship, ward: e.target.value })} placeholder="Phường Bến Nghé" style={inputCls}
                    onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")}
                    onBlur={(e)  => (e.target.style.border = "2px solid var(--color-border)")} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Quận/Huyện</label>
                  <input value={ship.district} onChange={(e) => setShip({ ...ship, district: e.target.value })} placeholder="Quận 1" style={inputCls}
                    onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")}
                    onBlur={(e)  => (e.target.style.border = "2px solid var(--color-border)")} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>Tỉnh/Thành phố *</label>
                  <select value={ship.city} onChange={(e) => setShip({ ...ship, city: e.target.value })} style={{ ...inputCls, cursor: "pointer" }}>
                    <option value="">-- Chọn tỉnh/thành --</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.5rem" }}>
                <button type="submit" style={{ padding: "0.72rem 1.75rem", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#c8a96e,#a8854a)", color: "white", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Lưu địa chỉ
                </button>
                {shipSaved && <span style={{ color: "#27ae60", fontSize: "0.88rem", fontWeight: 600 }}>✓ Đã lưu địa chỉ!</span>}
              </div>
            </form>
          )}

          {/* ── Tab: Đổi mật khẩu ── */}
          {tab === "password" && (
            <form onSubmit={handleChangePassword}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem" }}>Đổi mật khẩu</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "360px" }}>
                {[
                  { label: "Mật khẩu hiện tại", key: "old" },
                  { label: "Mật khẩu mới",      key: "newPw" },
                  { label: "Xác nhận mật khẩu", key: "confirm" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>{label}</label>
                    <input type="password" value={pw[key as keyof typeof pw]} onChange={(e) => setPw({ ...pw, [key]: e.target.value })}
                      placeholder="••••••••" style={inputCls}
                      onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")}
                      onBlur={(e)  => (e.target.style.border = "2px solid var(--color-border)")} />
                  </div>
                ))}
                {pwError && <p style={{ fontSize: "0.82rem", color: "#dc2626" }}>⚠️ {pwError}</p>}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <button type="submit" style={{ padding: "0.72rem 1.75rem", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#c8a96e,#a8854a)", color: "white", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    Đổi mật khẩu
                  </button>
                  {pwOk && <span style={{ color: "#27ae60", fontSize: "0.88rem", fontWeight: 600 }}>✓ Đã đổi!</span>}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Quick links */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
          <Link href="/orders" style={{ fontSize: "0.85rem", color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>📦 Đơn hàng của tôi →</Link>
          <Link href="/products" style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textDecoration: "none" }}>← Tiếp tục mua sắm</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .profile-grid { grid-template-columns: 1fr !important; }
          .profile-grid > div { grid-column: auto !important; }
        }
      `}</style>
    </div>
  );
}
