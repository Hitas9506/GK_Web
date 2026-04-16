"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; icon: string; step: number }> = {
  pending:   { label: "Chờ xác nhận", color: "#e67e22", bg: "#fef9e7", icon: "🕐", step: 1 },
  confirmed: { label: "Đã xác nhận",  color: "#2980b9", bg: "#eaf4fd", icon: "✅", step: 2 },
  shipping:  { label: "Đang giao",    color: "#8e44ad", bg: "#f5eef8", icon: "🚚", step: 3 },
  delivered: { label: "Đã giao",      color: "#27ae60", bg: "#eafaf1", icon: "🎉", step: 4 },
  cancelled: { label: "Đã hủy",       color: "#7f8c8d", bg: "#f2f3f4", icon: "❌", step: 0 },
} as Record<OrderStatus, { label: string; color: string; bg: string; icon: string; step: number }>;

const PAYMENT_ICONS: Record<string, string> = {
  "Tiền mặt khi giao hàng": "💵",
  "Ví MoMo": "🟣",
  "ZaloPay": "🔵",
  "Cổng thanh toán VNPay": "🏦",
};

const CATEGORY_LABELS: Record<string, string> = {
  ao: "Áo", quan: "Quần", vay: "Váy & Đầm", "phu-kien": "Phụ Kiện",
};

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [orders,   setOrders]   = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [user, isLoading, router]);

  useEffect(() => {
    const raw: Order[] = JSON.parse(localStorage.getItem("shopnext_orders") ?? "[]");
    // Admin sees all, others see own
    if (user?.role === "admin") {
      setOrders(raw);
    } else if (user) {
      setOrders(raw.filter((o) => (o as Order & { userId?: string }).userId === user.id || !(o as Order & { userId?: string }).userId));
    }
    setMounted(true);
  }, [user]);

  if (!mounted || isLoading || !user) return null;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const cancelOrder = (id: string) => {
    const raw: Order[] = JSON.parse(localStorage.getItem("shopnext_orders") ?? "[]");
    const updated = raw.map((o) => o.id === id ? { ...o, status: "cancelled" as OrderStatus } : o);
    localStorage.setItem("shopnext_orders", JSON.stringify(updated));
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "cancelled" as OrderStatus } : o));
  };

  const clearOrders = () => {
    if (user.role === "admin") {
      localStorage.removeItem("shopnext_orders");
      setOrders([]);
    } else {
      const raw: Order[] = JSON.parse(localStorage.getItem("shopnext_orders") ?? "[]");
      const kept = raw.filter((o) => (o as Order & { userId?: string }).userId !== user.id);
      localStorage.setItem("shopnext_orders", JSON.stringify(kept));
      setOrders([]);
    }
  };

  return (
    <div style={{ paddingTop: "70px" }}>
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "white", padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.25rem" }}>
          {user.role === "admin" ? "📋 Quản Lý Đơn Hàng" : "Đơn Hàng Của Bạn"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>
          {user.role === "admin" ? `Tất cả đơn: ${orders.length}` : `${orders.length} đơn hàng`}
        </p>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        {orders.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>📦</div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem" }}>Chưa có đơn hàng</h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>Đặt hàng ngay để xem đơn ở đây nhé!</p>
            <Link href="/products" className="btn-primary">Mua sắm ngay →</Link>
          </div>
        )}

        {orders.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <p style={{ fontSize: "0.83rem", color: "var(--color-text-muted)" }}>Nhấn vào đơn để xem chi tiết</p>
              <button onClick={clearOrders} style={{ border: "none", background: "transparent", color: "#ff4757", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>🗑 Xóa tất cả</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {orders.map((order) => {
                const st     = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.confirmed;
                const isOpen = expanded === order.id;
                const canCancel = order.status === "pending" || order.status === "confirmed";
                const shipInfo  = (order as Order & { shippingInfo?: { fullName: string; phone: string; address: string; ward: string; district: string; city: string } }).shippingInfo;

                return (
                  <div key={order.id} style={{ background: "white", borderRadius: "16px", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: isOpen ? "0 8px 24px rgba(0,0,0,0.08)" : "none", transition: "box-shadow 0.2s" }}>
                    {/* Header */}
                    <button onClick={() => setExpanded(isOpen ? null : order.id)} style={{ width: "100%", border: "none", background: "transparent", cursor: "pointer", padding: "1.1rem 1.4rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <p style={{ fontWeight: 700, fontSize: "0.9rem", margin: 0 }}>#{order.id}</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: "0.15rem 0 0" }}>{formatDate(order.date)}</p>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", margin: 0 }}>SP</p>
                        <p style={{ fontWeight: 700, fontSize: "0.9rem", margin: "0.1rem 0 0" }}>{order.items.reduce((s, i) => s + i.quantity, 0)}</p>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", margin: 0 }}>Tổng</p>
                        <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-primary)", margin: "0.1rem 0 0" }}>{formatPrice(order.total)}</p>
                      </div>
                      <span style={{ background: st.bg, color: st.color, padding: "0.28rem 0.8rem", borderRadius: "2rem", fontSize: "0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>
                        {st.icon} {st.label}
                      </span>
                      <span style={{ color: "var(--color-text-muted)", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none", display: "inline-block" }}>▾</span>
                    </button>

                    {/* Detail */}
                    {isOpen && (
                      <div style={{ borderTop: "1px solid var(--color-border)", padding: "1.25rem 1.4rem" }}>
                        {/* Progress */}
                        {order.status !== "cancelled" && (
                          <div style={{ marginBottom: "1.4rem" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              {["Đặt hàng","Xác nhận","Đang giao","Đã giao"].map((label, idx) => {
                                const s = idx + 1;
                                const active = st.step >= s;
                                return (
                                  <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                                    {idx > 0 && <div style={{ position: "absolute", top: "13px", left: "-50%", right: "50%", height: "3px", background: active ? "var(--color-primary)" : "var(--color-border)", zIndex: 0 }} />}
                                    <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: active ? "var(--color-primary)" : "var(--color-muted)", color: active ? "white" : "var(--color-text-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 700, zIndex: 1, position: "relative" }}>{active ? "✓" : s}</div>
                                    <p style={{ fontSize: "0.65rem", color: active ? "var(--color-primary)" : "var(--color-text-muted)", fontWeight: active ? 600 : 400, marginTop: "0.3rem", textAlign: "center" }}>{label}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Payment */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--color-muted)", borderRadius: "10px", padding: "0.55rem 0.85rem", marginBottom: "1rem", fontSize: "0.83rem" }}>
                          <span>{PAYMENT_ICONS[order.paymentMethod] ?? "💳"}</span>
                          <span style={{ fontWeight: 600 }}>{order.paymentMethod}</span>
                        </div>

                        {/* Shipping info */}
                        {shipInfo && (
                          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "0.85rem 1rem", marginBottom: "1rem", fontSize: "0.83rem" }}>
                            <p style={{ fontWeight: 700, marginBottom: "0.35rem", color: "#15803d" }}>📍 Địa chỉ giao hàng</p>
                            <p style={{ margin: "0.1rem 0" }}><strong>{shipInfo.fullName}</strong> · {shipInfo.phone}</p>
                            <p style={{ margin: "0.1rem 0", color: "var(--color-text-muted)" }}>
                              {[shipInfo.address, shipInfo.ward, shipInfo.district, shipInfo.city].filter(Boolean).join(", ")}
                            </p>
                          </div>
                        )}

                        {/* Items */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1rem" }}>
                          {order.items.map((item, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              <div style={{ width: "42px", height: "50px", background: "var(--color-muted)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>👗</div>
                              <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>{item.product.name}</p>
                                <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", margin: "0.1rem 0 0" }}>
                                  {CATEGORY_LABELS[item.product.category] ?? item.product.category} · Size {item.size} · {item.color} · x{item.quantity}
                                </p>
                              </div>
                              <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--color-primary)", flexShrink: 0 }}>{formatPrice(item.product.price * item.quantity)}</p>
                            </div>
                          ))}
                        </div>

                        {/* Price summary */}
                        <div style={{ borderTop: "1px dashed var(--color-border)", paddingTop: "0.65rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem" }}>
                            <span style={{ color: "var(--color-text-muted)" }}>Tạm tính</span>
                            <span>{formatPrice(order.subtotal)}</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem" }}>
                            <span style={{ color: "var(--color-text-muted)" }}>Vận chuyển</span>
                            <span style={{ color: "#27ae60", fontWeight: 600 }}>{order.shipping === 0 ? "Miễn phí" : formatPrice(order.shipping)}</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", fontWeight: 700 }}>
                            <span>Tổng cộng</span>
                            <span style={{ color: "var(--color-primary)" }}>{formatPrice(order.total)}</span>
                          </div>
                        </div>

                        {/* Cancel */}
                        {canCancel && (
                          <button onClick={() => { if (confirm("Bạn chắc chắn muốn hủy đơn hàng này?")) cancelOrder(order.id); }}
                            style={{ marginTop: "1rem", padding: "0.6rem 1.25rem", borderRadius: "8px", border: "2px solid #ff4757", background: "transparent", color: "#ff4757", cursor: "pointer", fontWeight: 600, fontSize: "0.83rem", fontFamily: "inherit", transition: "all 0.2s" }}>
                            Hủy đơn hàng
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Link href="/products" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "0.85rem" }}>← Tiếp tục mua sắm</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
