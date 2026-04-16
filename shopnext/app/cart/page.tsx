"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import type { Order } from "@/lib/types";
import type { ShippingInfo } from "@/context/AuthContext";

const PAYMENT_METHODS = [
  { id: "cod",   label: "Tiền mặt khi giao hàng", icon: "💵", desc: "Thanh toán khi nhận hàng" },
  { id: "momo",  label: "Ví MoMo",                icon: "🟣", desc: "Thanh toán qua ví MoMo" },
  { id: "zalo",  label: "ZaloPay",                icon: "🔵", desc: "Thanh toán qua ZaloPay" },
  { id: "vnpay", label: "Cổng thanh toán VNPay",  icon: "🏦", desc: "Thẻ ATM / Visa / MasterCard" },
];

const PAYMENT_LABELS: Record<string, string> = {
  cod: "Tiền mặt khi giao hàng", momo: "Ví MoMo", zalo: "ZaloPay", vnpay: "Cổng thanh toán VNPay",
};

const CITIES = ["Hà Nội","TP. Hồ Chí Minh","Đà Nẵng","Cần Thơ","Hải Phòng","Biên Hòa","Nha Trang","Huế","Buôn Ma Thuột","Vũng Tàu"];

const inputS: React.CSSProperties = {
  width: "100%", padding: "0.6rem 0.85rem", borderRadius: "9px",
  border: "2px solid var(--color-border)", fontSize: "0.85rem",
  outline: "none", boxSizing: "border-box", fontFamily: "inherit",
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { user } = useAuth();

  const [showModal, setShowModal]             = useState(false);
  const [step, setStep]                       = useState<1 | 2>(1);
  const [selectedMethod, setSelectedMethod]   = useState("cod");
  const [confirmed, setConfirmed]             = useState(false);

  const shipping = totalPrice >= 500000 ? 0 : 30000;
  const total    = totalPrice + shipping;

  // Shipping form — pre-fill from profile
  const [shipForm, setShipForm] = useState<ShippingInfo>(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("shopnext_user");
      if (raw) {
        const u = JSON.parse(raw);
        if (u.shippingInfo) return u.shippingInfo;
        return { fullName: u.name ?? "", phone: u.phone ?? "", address: "", ward: "", district: "", city: "" };
      }
    }
    return { fullName: "", phone: "", address: "", ward: "", district: "", city: "" };
  });

  const openModal = () => {
    // Re-read shipping from storage in case profile was updated
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("shopnext_user");
      if (raw) {
        const u = JSON.parse(raw);
        if (u.shippingInfo) setShipForm(u.shippingInfo);
        else setShipForm((s) => ({ ...s, fullName: u.name ?? s.fullName, phone: u.phone ?? s.phone }));
      }
    }
    setStep(1);
    setShowModal(true);
  };

  const handleConfirm = () => {
    const order: Order = {
      id: `SN${Date.now()}`,
      date: new Date().toISOString(),
      items: [...items],
      subtotal: totalPrice,
      shipping,
      total,
      paymentMethod: PAYMENT_LABELS[selectedMethod] ?? selectedMethod,
      status: "confirmed",
      shippingInfo: shipForm,
      userId: user?.id ?? "guest",
    } as Order & { shippingInfo: ShippingInfo; userId: string };

    const existing: Order[] = JSON.parse(localStorage.getItem("shopnext_orders") ?? "[]");
    localStorage.setItem("shopnext_orders", JSON.stringify([order, ...existing]));

    clearCart();
    setShowModal(false);
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 5000);
  };

  /* ─── Render ─────────────────────────────────────── */
  if (items.length === 0) {
    return (
      <div style={{ paddingTop: "70px", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", padding: "100px 1.5rem 3rem", textAlign: "center" }}>
        <div style={{ fontSize: "5rem" }}>🛒</div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Giỏ hàng của bạn đang trống</h2>
        <p style={{ color: "var(--color-text-muted)" }}>Hãy thêm một vài sản phẩm bạn thích vào giỏ nhé!</p>
        <Link href="/products" className="btn-primary">Tiếp Tục Mua Sắm →</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "70px" }}>
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "white", padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.25rem" }}>Giỏ Hàng Của Bạn</h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>{totalItems} sản phẩm</p>
      </div>

      {/* Toast */}
      {confirmed && (
        <div style={{ position: "fixed", top: "90px", left: "50%", transform: "translateX(-50%)", background: "#27ae60", color: "white", padding: "0.75rem 1.75rem", borderRadius: "2rem", fontWeight: 600, fontSize: "0.9rem", zIndex: 9999, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: "0.75rem", whiteSpace: "nowrap" }}>
          <span>✓ Đặt hàng thành công! 🎉</span>
          <Link href="/orders" style={{ color: "white", fontWeight: 700, textDecoration: "underline", fontSize: "0.85rem" }}>Xem đơn hàng →</Link>
        </div>
      )}

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem 4rem", display: "grid", gridTemplateColumns: "1fr 360px", gap: "2rem", alignItems: "start" }} className="cart-grid">
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size}-${item.color}`} style={{ background: "white", borderRadius: "16px", border: "1px solid var(--color-border)", padding: "1.25rem", display: "flex", gap: "1.25rem", alignItems: "center" }}>
              <div style={{ position: "relative", width: "90px", height: "110px", borderRadius: "12px", overflow: "hidden", flexShrink: 0, background: "var(--color-muted)" }}>
                <Image src={item.product.image} alt={item.product.name} fill sizes="90px" style={{ objectFit: "cover" }}
                  onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.display = "none"; const p = t.parentElement; if (p) p.innerHTML += `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:2.5rem">👗</div>`; }} />
              </div>
              <div style={{ flex: 1 }}>
                <Link href={`/products/${item.product.id}`} style={{ textDecoration: "none", color: "var(--color-text)", fontWeight: 600, fontSize: "0.95rem", display: "block", marginBottom: "0.25rem" }}>{item.product.name}</Link>
                <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", margin: "0 0 0.75rem" }}>Size: {item.size} • Màu: {item.color}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ display: "flex", border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden" }}>
                    <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)} style={{ width: "32px", height: "32px", border: "none", background: "var(--color-muted)", cursor: "pointer", fontWeight: 700 }}>−</button>
                    <span style={{ width: "40px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)} style={{ width: "32px", height: "32px", border: "none", background: "var(--color-muted)", cursor: "pointer", fontWeight: 700 }}>+</button>
                  </div>
                  <button onClick={() => removeItem(item.product.id, item.size, item.color)} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#ff4757", fontSize: "0.8rem", fontWeight: 600 }}>🗑 Xóa</button>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-primary)" }}>{formatPrice(item.product.price * item.quantity)}</p>
                {item.quantity > 1 && <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{formatPrice(item.product.price)} / cái</p>}
              </div>
            </div>
          ))}
          <button onClick={clearCart} style={{ alignSelf: "flex-start", border: "none", background: "transparent", cursor: "pointer", color: "#ff4757", fontWeight: 600, fontSize: "0.85rem" }}>🗑 Xóa toàn bộ giỏ hàng</button>
        </div>

        {/* Summary */}
        <div style={{ background: "white", borderRadius: "20px", border: "1px solid var(--color-border)", padding: "1.5rem", position: "sticky", top: "90px" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Tóm Tắt Đơn Hàng</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Tạm tính ({totalItems} SP)</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
              <span style={{ color: "var(--color-text-muted)" }}>Vận chuyển</span>
              <span style={{ color: "#27ae60", fontWeight: 600 }}>{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span>
            </div>
            <div style={{ borderTop: "1px dashed var(--color-border)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", fontSize: "1.05rem", fontWeight: 700 }}>
              <span>Tổng cộng</span>
              <span style={{ color: "var(--color-primary)" }}>{formatPrice(total)}</span>
            </div>
          </div>
          {totalPrice < 500000 && (
            <p style={{ fontSize: "0.78rem", color: "#e67e22", background: "#fef9e7", padding: "0.5rem 0.75rem", borderRadius: "8px", marginBottom: "1rem" }}>
              🚚 Mua thêm <strong>{formatPrice(500000 - totalPrice)}</strong> để miễn phí vận chuyển!
            </p>
          )}
          <button className="btn-primary" onClick={openModal} style={{ width: "100%", justifyContent: "center", marginBottom: "0.75rem" }}>Tiến Hành Thanh Toán →</button>
          <Link href="/products" style={{ display: "block", textAlign: "center", color: "var(--color-text-muted)", textDecoration: "none", fontSize: "0.85rem" }}>← Tiếp tục mua sắm</Link>
        </div>
      </div>

      {/* ══ MODAL ══ */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(2px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: "20px", boxShadow: "0 25px 60px rgba(0,0,0,0.2)", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", animation: "fadeInUp 0.25s ease" }}>

            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--color-border)", position: "sticky", top: 0, background: "white", zIndex: 1 }}>
              <div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.3rem" }}>
                  {[1, 2].map((s) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: step >= s ? "var(--color-primary)" : "var(--color-muted)", color: step >= s ? "white" : "var(--color-text-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700 }}>{s}</div>
                      <span style={{ fontSize: "0.75rem", color: step >= s ? "var(--color-primary)" : "var(--color-text-muted)", fontWeight: step === s ? 600 : 400 }}>{s === 1 ? "Thanh toán" : "Giao hàng"}</span>
                      {s < 2 && <span style={{ color: "var(--color-border)", margin: "0 0.2rem" }}>›</span>}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", margin: 0 }}>
                  Tổng: <strong style={{ color: "var(--color-primary)" }}>{formatPrice(total)}</strong>
                </p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "none", background: "var(--color-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--color-text-muted)" }}>✕</button>
            </div>

            {/* ── STEP 1: Phương thức thanh toán ── */}
            {step === 1 && (
              <>
                <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem" }}>Chọn phương thức thanh toán</p>
                  {PAYMENT_METHODS.map((method) => {
                    const sel = selectedMethod === method.id;
                    return (
                      <label key={method.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 1rem", borderRadius: "12px", border: sel ? "2px solid #a67c52" : "2px solid #e5e7eb", background: sel ? "#fef8f0" : "white", cursor: "pointer", transition: "all 0.18s" }}>
                        <input type="radio" name="payment" value={method.id} checked={sel} onChange={() => setSelectedMethod(method.id)} style={{ accentColor: "#a67c52", width: "17px", height: "17px" }} />
                        <span style={{ fontSize: "1.5rem" }}>{method.icon}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 600, fontSize: "0.88rem", margin: 0 }}>{method.label}</p>
                          <p style={{ fontSize: "0.73rem", color: "var(--color-text-muted)", margin: "0.1rem 0 0" }}>{method.desc}</p>
                        </div>
                        {sel && <span style={{ color: "#a67c52", fontWeight: 700 }}>✓</span>}
                      </label>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: "0.75rem", padding: "1rem 1.5rem 1.5rem", borderTop: "1px solid var(--color-border)" }}>
                  <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "0.72rem", borderRadius: "10px", border: "2px solid var(--color-border)", background: "white", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", color: "var(--color-text-muted)", fontFamily: "inherit" }}>Hủy</button>
                  <button onClick={() => setStep(2)} style={{ flex: 2, padding: "0.72rem", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#b0895c,#8a6537)", color: "white", cursor: "pointer", fontWeight: 700, fontSize: "0.9rem", fontFamily: "inherit" }}>
                    Tiếp theo: Giao hàng →
                  </button>
                </div>
              </>
            )}

            {/* ── STEP 2: Thông tin giao hàng ── */}
            {step === 2 && (
              <>
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.2rem" }}>Thông tin giao hàng</p>
                  {user?.shippingInfo && (
                    <p style={{ fontSize: "0.76rem", color: "#27ae60", marginBottom: "0.75rem" }}>✓ Đã tự điền từ hồ sơ của bạn</p>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      <div>
                        <label style={{ fontSize: "0.78rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Họ tên *</label>
                        <input value={shipForm.fullName} onChange={(e) => setShipForm({ ...shipForm, fullName: e.target.value })} placeholder="Nguyễn Văn A" style={inputS} onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")} onBlur={(e) => (e.target.style.border = "2px solid var(--color-border)")} />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.78rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>SĐT *</label>
                        <input value={shipForm.phone} onChange={(e) => setShipForm({ ...shipForm, phone: e.target.value })} placeholder="0901234567" style={inputS} onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")} onBlur={(e) => (e.target.style.border = "2px solid var(--color-border)")} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Địa chỉ *</label>
                      <input value={shipForm.address} onChange={(e) => setShipForm({ ...shipForm, address: e.target.value })} placeholder="123 Đường Lê Lợi" style={inputS} onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")} onBlur={(e) => (e.target.style.border = "2px solid var(--color-border)")} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      <div>
                        <label style={{ fontSize: "0.78rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Phường/Xã</label>
                        <input value={shipForm.ward} onChange={(e) => setShipForm({ ...shipForm, ward: e.target.value })} placeholder="Phường Bến Nghé" style={inputS} onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")} onBlur={(e) => (e.target.style.border = "2px solid var(--color-border)")} />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.78rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Quận/Huyện</label>
                        <input value={shipForm.district} onChange={(e) => setShipForm({ ...shipForm, district: e.target.value })} placeholder="Quận 1" style={inputS} onFocus={(e) => (e.target.style.border = "2px solid var(--color-primary)")} onBlur={(e) => (e.target.style.border = "2px solid var(--color-border)")} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Tỉnh/Thành phố *</label>
                      <select value={shipForm.city} onChange={(e) => setShipForm({ ...shipForm, city: e.target.value })} style={{ ...inputS, cursor: "pointer" }}>
                        <option value="">-- Chọn tỉnh/thành --</option>
                        {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", padding: "1rem 1.5rem 1.5rem", borderTop: "1px solid var(--color-border)" }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: "0.72rem", borderRadius: "10px", border: "2px solid var(--color-border)", background: "white", cursor: "pointer", fontWeight: 600, fontSize: "0.88rem", color: "var(--color-text-muted)", fontFamily: "inherit" }}>← Quay lại</button>
                  <button
                    onClick={() => { if (!shipForm.fullName || !shipForm.phone || !shipForm.address || !shipForm.city) { alert("Vui lòng điền đầy đủ thông tin giao hàng (*)"); return; } handleConfirm(); }}
                    style={{ flex: 2, padding: "0.72rem", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#b0895c,#8a6537)", color: "white", cursor: "pointer", fontWeight: 700, fontSize: "0.9rem", boxShadow: "0 4px 14px rgba(176,137,92,0.4)", fontFamily: "inherit" }}>
                    Xác Nhận Đặt Hàng ✓
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .cart-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
