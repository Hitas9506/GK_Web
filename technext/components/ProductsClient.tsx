"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

/* ── Brand config ─────────────────────────── */
const BRANDS = [
  { key: "apple",   label: "Apple",   logo: "/APPLE.svg",   bg: "#1A1A1A" },
  { key: "samsung", label: "Samsung", logo: "/SAMSUNG.svg", bg: "#1428A0" },
  { key: "xiaomi",  label: "Xiaomi",  logo: "/XIAOMI.png",  bg: "#FF6900" },
];

/* ── Price presets ────────────────────────── */
const PRICE_PRESETS = [
  { label: "Dưới 10 triệu",   min: 0,           max: 10_000_000  },
  { label: "10 – 20 triệu",   min: 10_000_000,  max: 20_000_000  },
  { label: "20 – 30 triệu",   min: 20_000_000,  max: 30_000_000  },
  { label: "Trên 30 triệu",   min: 30_000_000,  max: Infinity    },
];

const STORAGE_OPTIONS  = ["128GB", "256GB", "512GB", "1TB", "2TB"];
const RAM_OPTIONS      = ["6GB", "8GB", "12GB", "16GB"];
const OS_OPTIONS       = [
  { label: "iOS / iPadOS", key: "ios"     },
  { label: "Android",      key: "android" },
];
const REFRESH_OPTIONS  = ["60Hz", "90Hz", "120Hz", "144Hz"];
const CHARGE_OPTIONS   = [
  { label: "≥ 25W",  minW: 25  },
  { label: "≥ 45W",  minW: 45  },
  { label: "≥ 67W",  minW: 67  },
  { label: "≥ 90W",  minW: 90  },
];
const NEED_OPTIONS = [
  { label: "⚡ Cấu hình cao",        key: "performance",  match: ["Snapdragon 8 Elite", "A19 Pro", "Dimensity 9400"] },
  { label: "🔋 Pin khủng (≥5000mAh)",key: "battery",      match: ["5000mAh", "5240mAh", "5300mAh", "5400mAh", "6000mAh", "8400mAh", "8840mAh", "9200mAh", "11200mAh"] },
  { label: "📷 Chụp ảnh, quay phim", key: "camera",       match: ["Leica", "200MP"] },
  { label: "🪶 Mỏng nhẹ",            key: "slim",         match: ["5.65mm", "145g", "6.1mm", "163g"] },
];
/* Features use p.features[] for exact matching */
const FEATURE_OPTIONS = [
  { label: "5G",              key: "5g"       },
  { label: "NFC",             key: "nfc"      },
  { label: "Face ID",         key: "face-id"  },
  { label: "Kháng nước IP68+",key: "ip68"     },
  { label: "Hỗ trợ AI",       key: "ai"       },
  { label: "S Pen",           key: "s-pen"    },
];

const SORT_OPTIONS = [
  { key: "newest",    label: "Mới nhất"  },
  { key: "popular",   label: "Bán chạy" },
  { key: "price_asc", label: "Giá tăng" },
  { key: "price_desc",label: "Giá giảm" },
  { key: "rating",    label: "Đánh giá" },
];

/* ── Helpers ─────────────────────────────── */
const hasKeyword = (p: Product, ...words: string[]) => {
  const hay = `${p.description} ${p.specs ?? ""} ${(p.detailedSpecs ?? []).map(s => s.value).join(" ")}`.toLowerCase();
  return words.some(w => hay.includes(w.toLowerCase()));
};
const hasFeature = (p: Product, key: string) => (p.features ?? []).includes(key);

const getOS = (p: Product) => hasKeyword(p, "iOS", "iPadOS") ? "ios" : "android";
const getRefresh = (p: Product) => {
  const h = `${p.specs ?? ""} ${(p.detailedSpecs ?? []).map(s => s.value).join(" ")}`;
  for (const r of ["144Hz", "120Hz", "90Hz", "60Hz"]) if (h.includes(r)) return r;
  return "";
};
const getRAM = (p: Product) => {
  const row = (p.detailedSpecs ?? []).find(s => s.label.toLowerCase().includes("ram"));
  if (!row) return "";
  const m = row.value.match(/(\d+)GB/);
  return m ? `${m[1]}GB` : "";
};
const getChargeW = (p: Product): number => {
  const rows = (p.detailedSpecs ?? []).filter(s => s.label.toLowerCase().includes("pin"));
  for (const row of rows) {
    const m = row.value.match(/sạc[^,]*?(\d+)W/i);
    if (m) return parseInt(m[1]);
  }
  return 0;
};

/* ── Filter state ───────────────────────── */
interface FilterState {
  brand:       string;
  pricePreset: number | null;
  storage:     string;
  ram:         string;
  os:          string;
  refresh:     string;
  chargeIdx:   number | null;
  needs:       string[];
  features:    string[];
  rating:      number | null;
}
const defaultFilter = (): FilterState => ({
  brand:"", pricePreset:null, storage:"", ram:"", os:"", refresh:"",
  chargeIdx:null, needs:[], features:[], rating:null,
});
const countActive = (f: FilterState) =>
  [f.brand, f.pricePreset!==null, f.storage, f.ram, f.os, f.refresh,
   f.chargeIdx!==null, f.needs.length>0, f.features.length>0, f.rating!==null]
  .filter(Boolean).length;

interface Props { allProducts: Product[]; defaultCategory?: string; defaultBrand?: string; }

/* ── Chip ─────────────────────────────────── */
function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: "0.32rem 0.7rem", borderRadius: "20px",
      border: active ? "2px solid #FF6700" : "2px solid rgba(0,0,0,0.10)",
      background: active ? "#FF670012" : "white",
      cursor: "pointer", fontWeight: 600, fontSize: "0.77rem",
      color: active ? "#FF6700" : "#444",
      transition: "all 0.15s", whiteSpace: "nowrap",
      boxShadow: active ? "0 0 0 2px rgba(255,103,0,0.12)" : "none",
    }}>{children}</button>
  );
}
function SLabel({ children }: { children: React.ReactNode }) {
  return <p style={{ fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase",
    letterSpacing: "0.08em", color: "#bbb", marginBottom: "0.5rem", marginTop: "0" }}>{children}</p>;
}

/* ── COMPARE BAR ────────────────────────── */
function CompareBar({ items, onRemove, onClear }: { items: Product[]; onRemove: (id: number) => void; onClear: () => void }) {
  if (items.length === 0) return null;
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 800,
      background: "rgba(26,26,26,0.97)", backdropFilter: "blur(16px)",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      padding: "0.75rem 1.5rem",
      display: "flex", alignItems: "center", gap: "1rem",
      boxShadow: "0 -8px 32px rgba(0,0,0,0.3)",
    }}>
      <span style={{ color: "white", fontWeight: 700, fontSize: "0.82rem", flexShrink: 0 }}>
        ⚖️ So sánh ({items.length}/3):
      </span>
      <div style={{ display: "flex", gap: "0.65rem", flex: 1, overflow: "auto" }}>
        {items.map(p => (
          <div key={p.id} style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(255,255,255,0.1)", borderRadius: "10px",
            padding: "0.3rem 0.7rem", flexShrink: 0,
          }}>
            <Image src={p.image} alt={p.name} width={26} height={26} style={{ objectFit: "contain" }} />
            <span style={{ color: "white", fontSize: "0.76rem", fontWeight: 600,
              maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {p.name}
            </span>
            <button onClick={() => onRemove(p.id)} style={{
              border: "none", background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)",
              borderRadius: "50%", width: "17px", height: "17px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", padding: 0,
            }}>✕</button>
          </div>
        ))}
        {Array.from({ length: 3 - items.length }).map((_, i) => (
          <div key={i} style={{
            width: "110px", height: "36px",
            border: "1.5px dashed rgba(255,255,255,0.2)", borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>+ Thêm SP</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
        {items.length >= 2 && (
          <Link href={`/compare?ids=${items.map(p => p.id).join(",")}`}
            style={{ padding: "0.48rem 1rem", borderRadius: "9px", background: "#FF6700",
              color: "white", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none",
              display: "flex", alignItems: "center", gap: "0.35rem" }}>
            So sánh ngay →
          </Link>
        )}
        <button onClick={onClear} style={{
          padding: "0.48rem 0.85rem", borderRadius: "9px",
          border: "1.5px solid rgba(255,255,255,0.25)", background: "transparent",
          color: "rgba(255,255,255,0.7)", fontSize: "0.76rem", fontWeight: 600, cursor: "pointer",
        }}>Xoá tất cả</button>
      </div>
    </div>
  );
}

/* ── FILTER PANEL (popup content) ─────────── */
function FilterPanel({ f, set, clearAll, activeCount }: {
  f: FilterState; set: (p: Partial<FilterState>) => void;
  clearAll: () => void; activeCount: number;
}) {
  const toggle = <T,>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  const sec = { paddingBottom: "1rem", borderBottom: "1px solid rgba(0,0,0,0.06)", marginBottom: "0.15rem" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto", flex: 1 }}>

      {/* BRAND */}
      <div style={sec}>
        <SLabel>Thương Hiệu</SLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {BRANDS.map(b => {
            const active = f.brand === b.key;
            return (
              <button key={b.key} onClick={() => set({ brand: active ? "" : b.key })}
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.4rem 0.75rem", borderRadius: "10px",
                  border: active ? `2px solid ${b.bg}` : "2px solid rgba(0,0,0,0.10)",
                  background: active ? `${b.bg}12` : "white",
                  cursor: "pointer", fontWeight: 600, fontSize: "0.79rem",
                  color: active ? b.bg : "#444", transition: "all 0.15s",
                }}>
                <Image src={b.logo} alt={b.label} width={14} height={14} style={{ objectFit: "contain" }} />
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRICE */}
      <div style={sec}>
        <SLabel>Mức Giá</SLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {PRICE_PRESETS.map((p, i) => (
            <Chip key={i} active={f.pricePreset===i} onClick={() => set({ pricePreset: f.pricePreset===i ? null : i })}>
              {p.label}
            </Chip>
          ))}
        </div>
      </div>

      {/* RATING */}
      <div style={sec}>
        <SLabel>Đánh Giá Tối Thiểu</SLabel>
        <div style={{ display: "flex", gap: "0.35rem" }}>
          {[5, 4, 3].map(star => (
            <button key={star} onClick={() => set({ rating: f.rating===star ? null : star })}
              style={{
                display: "flex", alignItems: "center", gap: "0.3rem",
                padding: "0.38rem 0.7rem", borderRadius: "9px",
                border: f.rating===star ? "2px solid #FF6700" : "2px solid rgba(0,0,0,0.10)",
                background: f.rating===star ? "#FF670010" : "white",
                cursor: "pointer", fontSize: "0.77rem", fontWeight: 600,
                color: f.rating===star ? "#FF6700" : "#555", transition: "all 0.15s",
              }}>
              <span style={{ color: "#FFB300" }}>{"★".repeat(star)}</span>+
            </button>
          ))}
        </div>
      </div>

      {/* RAM */}
      <div style={sec}>
        <SLabel>RAM</SLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {RAM_OPTIONS.map(r => (
            <Chip key={r} active={f.ram===r} onClick={() => set({ ram: f.ram===r ? "" : r })}>{r}</Chip>
          ))}
        </div>
      </div>

      {/* STORAGE */}
      <div style={sec}>
        <SLabel>Dung Lượng ROM</SLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {STORAGE_OPTIONS.map(s => (
            <Chip key={s} active={f.storage===s} onClick={() => set({ storage: f.storage===s ? "" : s })}>{s}</Chip>
          ))}
        </div>
      </div>

      {/* OS */}
      <div style={sec}>
        <SLabel>Hệ Điều Hành</SLabel>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {OS_OPTIONS.map(o => (
            <Chip key={o.key} active={f.os===o.key} onClick={() => set({ os: f.os===o.key ? "" : o.key })}>{o.label}</Chip>
          ))}
        </div>
      </div>

      {/* REFRESH */}
      <div style={sec}>
        <SLabel>Tần Số Quét</SLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {REFRESH_OPTIONS.map(r => (
            <Chip key={r} active={f.refresh===r} onClick={() => set({ refresh: f.refresh===r ? "" : r })}>{r}</Chip>
          ))}
        </div>
      </div>

      {/* CHARGE */}
      <div style={sec}>
        <SLabel>Sạc Nhanh Tối Thiểu</SLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {CHARGE_OPTIONS.map((c, i) => (
            <Chip key={i} active={f.chargeIdx===i} onClick={() => set({ chargeIdx: f.chargeIdx===i ? null : i })}>
              {c.label}
            </Chip>
          ))}
        </div>
      </div>

      {/* NEEDS */}
      <div style={sec}>
        <SLabel>Nhu Cầu Sử Dụng</SLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {NEED_OPTIONS.map(n => {
            const active = f.needs.includes(n.key);
            return (
              <Chip key={n.key} active={active} onClick={() => set({ needs: toggle(f.needs, n.key) })}>
                {n.label}
              </Chip>
            );
          })}
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <SLabel>Tính Năng Đặc Biệt</SLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {FEATURE_OPTIONS.map(ft => {
            const active = f.features.includes(ft.key);
            return (
              <Chip key={ft.key} active={active} onClick={() => set({ features: toggle(f.features, ft.key) })}>
                {ft.label}
              </Chip>
            );
          })}
        </div>
      </div>

      {/* Clear */}
      {activeCount > 0 && (
        <button onClick={clearAll} style={{
          padding: "0.55rem 1rem", borderRadius: "10px",
          border: "2px solid #ff4757", background: "transparent",
          color: "#ff4757", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer",
          marginTop: "0.25rem",
        }}>
          ✕ Xoá {activeCount} bộ lọc
        </button>
      )}
    </div>
  );
}

/* ── POPUP FILTER BOX ───────────────────── */
function FilterPopup({ f, set, clearAll, activeCount, triggerRef }: {
  f: FilterState; set: (p: Partial<FilterState>) => void;
  clearAll: () => void; activeCount: number;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        // Handled by parent
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [triggerRef]);

  return (
    <div ref={ref} style={{
      position: "absolute", top: "calc(100% + 8px)", left: 0,
      width: "680px", maxWidth: "95vw",
      background: "white", borderRadius: "18px",
      border: "1px solid rgba(0,0,0,0.09)",
      boxShadow: "0 16px 56px rgba(0,0,0,0.15)",
      zIndex: 500, padding: "1.25rem",
      maxHeight: "78vh",
      display: "flex", flexDirection: "column",
      animation: "filterPopIn 0.18s cubic-bezier(0.25,0.46,0.45,0.94) both",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: "1rem", flexShrink: 0 }}>
        <span style={{ fontWeight: 800, fontSize: "1rem" }}>🔽 Bộ Lọc Nâng Cao</span>
        {activeCount > 0 && (
          <button onClick={clearAll}
            style={{ fontSize: "0.75rem", color: "#ff4757", fontWeight: 700,
              border: "none", background: "none", cursor: "pointer" }}>
            Xoá tất cả ({activeCount})
          </button>
        )}
      </div>
      {/* 2-column grid for filter sections */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "0 2rem", overflowY: "auto", flex: 1,
      }}>
        <FilterPanel f={f} set={set} clearAll={clearAll} activeCount={activeCount} />
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ─────────────────────── */
export default function ProductsClient({ allProducts, defaultCategory, defaultBrand }: Props) {
  const [category, setCategory] = useState(defaultCategory ?? "all");
  const [f, setF]               = useState<FilterState>({ ...defaultFilter(), brand: defaultBrand ?? "" });
  const [sortBy, setSortBy]     = useState("newest");
  const [filterOpen, setFilterOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const filterBtnRef = useRef<HTMLButtonElement>(null);

  const set = (patch: Partial<FilterState>) => setF(prev => ({ ...prev, ...patch }));
  const activeCount = useMemo(() => countActive(f), [f]);
  const clearAll = () => setF(defaultFilter());

  /* Close popup when clicking outside */
  useEffect(() => {
    if (!filterOpen) return;
    const handler = (e: MouseEvent) => {
      const popup = document.getElementById("tn-filter-popup");
      if (popup && !popup.contains(e.target as Node) &&
          filterBtnRef.current && !filterBtnRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [filterOpen]);

  /* ─── Filtering ────────────────────────── */
  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (category !== "all") list = list.filter(p => p.category === category);
    if (f.brand)            list = list.filter(p => p.brand === f.brand);

    if (f.pricePreset !== null) {
      const { min, max } = PRICE_PRESETS[f.pricePreset];
      list = list.filter(p => p.price >= min && p.price <= max);
    }
    if (f.rating !== null)  list = list.filter(p => p.rating >= f.rating!);
    if (f.storage)          list = list.filter(p => p.variants.some(v => v.includes(f.storage)));
    if (f.ram)              list = list.filter(p => getRAM(p) === f.ram);
    if (f.os)               list = list.filter(p => getOS(p) === f.os);
    if (f.refresh)          list = list.filter(p => getRefresh(p) === f.refresh);
    if (f.chargeIdx !== null) {
      const minW = CHARGE_OPTIONS[f.chargeIdx].minW;
      list = list.filter(p => getChargeW(p) >= minW);
    }
    for (const needKey of f.needs) {
      const need = NEED_OPTIONS.find(n => n.key === needKey);
      if (need) list = list.filter(p => hasKeyword(p, ...need.match));
    }
    /* Feature filter uses tag array — reliable */
    for (const ftKey of f.features) {
      list = list.filter(p => hasFeature(p, ftKey));
    }

    switch (sortBy) {
      case "price_asc":  list.sort((a, b) => a.price - b.price); break;
      case "price_desc": list.sort((a, b) => b.price - a.price); break;
      case "popular":    list.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case "rating":     list.sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [allProducts, category, f, sortBy]);

  /* ─── Compare ──────────────────────────── */
  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      if (prev.some(p => p.id === product.id)) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 3) return prev;
      return [...prev, product];
    });
  };

  const categories = [
    { id: "all",        label: "Tất Cả",        icon: "🏪" },
    { id: "dien-thoai", label: "Điện Thoại",    icon: "📱" },
    { id: "tablet",     label: "Máy Tính Bảng", icon: "📲" },
  ];

  /* ─── Render ────────────────────────────── */
  return (
    <div style={{ paddingBottom: compareList.length > 0 ? "76px" : "0" }}>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg,#1A1A1A 0%,#2d2d2d 60%,#3a3a3a 100%)",
        color: "white", padding: "2rem 1.5rem 1.5rem", textAlign: "center",
      }}>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "0.3rem" }}>
          {category === "all" ? "Tất Cả Sản Phẩm" :
           category === "dien-thoai" ? "Điện Thoại" : "Máy Tính Bảng"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem" }}>
          {filtered.length} sản phẩm
          {f.brand ? ` · ${BRANDS.find(b => b.key === f.brand)?.label}` : ""}
          {activeCount > 0 ? ` · ${activeCount} bộ lọc đang bật` : ""}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.1rem", flexWrap: "wrap" }}>
          {categories.map(cat => {
            const active = cat.id === category;
            return (
              <button key={cat.id}
                onClick={() => { setCategory(cat.id); setF(defaultFilter()); }}
                style={{
                  padding: "0.48rem 1.1rem", borderRadius: "2rem",
                  border: active ? "none" : "2px solid rgba(255,255,255,0.22)",
                  background: active ? "#FF6700" : "rgba(255,255,255,0.09)",
                  color: "white", fontWeight: 600, fontSize: "0.83rem",
                  cursor: "pointer", transition: "all 0.2s",
                }}>
                {cat.icon} {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* STICKY TOOLBAR */}
      <div style={{
        position: "sticky", top: "92px", zIndex: 100,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0.6rem 1.5rem",
          display: "flex", alignItems: "center", gap: "0.65rem", flexWrap: "wrap", position: "relative" }}>

          {/* ── Brand pills ── */}
          <div className="tn-brand-pills" style={{ display: "flex", gap: "0.38rem" }}>
            {BRANDS.map(b => {
              const active = f.brand === b.key;
              return (
                <button key={b.key} onClick={() => set({ brand: active ? "" : b.key })}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.3rem",
                    padding: "0.32rem 0.65rem", borderRadius: "8px",
                    border: active ? `2px solid ${b.bg}` : "2px solid rgba(0,0,0,0.09)",
                    background: active ? `${b.bg}12` : "white",
                    cursor: "pointer", fontWeight: 600, fontSize: "0.74rem",
                    color: active ? b.bg : "#555", transition: "all 0.15s",
                  }}>
                  <Image src={b.logo} alt={b.label} width={12} height={12} style={{ objectFit: "contain" }} />
                  {b.label}
                </button>
              );
            })}
          </div>

          {/* Separator */}
          <div className="tn-brand-pills" style={{ width: "1px", height: "18px", background: "rgba(0,0,0,0.1)" }} />

          {/* Price pills */}
          <div className="tn-brand-pills" style={{ display: "flex", gap: "0.32rem", flexWrap: "wrap" }}>
            {PRICE_PRESETS.map((p, i) => {
              const active = f.pricePreset === i;
              return (
                <button key={i} onClick={() => set({ pricePreset: active ? null : i })}
                  style={{
                    padding: "0.32rem 0.6rem", borderRadius: "8px",
                    border: active ? "2px solid #FF6700" : "2px solid rgba(0,0,0,0.09)",
                    background: active ? "#FF67000F" : "white",
                    cursor: "pointer", fontSize: "0.72rem", fontWeight: 600,
                    color: active ? "#FF6700" : "#555", transition: "all 0.15s", whiteSpace: "nowrap",
                  }}>
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* ── 🔽 BỘ LỌC (collapsible popup trigger) ── */}
          <button
            ref={filterBtnRef}
            onClick={() => setFilterOpen(v => !v)}
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              padding: "0.35rem 0.8rem", borderRadius: "9px",
              border: filterOpen || activeCount > 0 ? "2px solid #FF6700" : "2px solid rgba(0,0,0,0.12)",
              background: filterOpen ? "#FF670012" : activeCount > 0 ? "#FF670008" : "white",
              cursor: "pointer", fontWeight: 700, fontSize: "0.78rem",
              color: filterOpen || activeCount > 0 ? "#FF6700" : "#333",
              transition: "all 0.15s",
            }}>
            <span style={{ fontSize: "0.85rem" }}>⚙️</span>
            Bộ lọc{activeCount > 0 ? ` (${activeCount})` : ""}
            <span style={{
              fontSize: "0.65rem",
              transform: filterOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
              display: "inline-block",
            }}>▼</span>
          </button>

          {/* ── FILTER POPUP ── */}
          {filterOpen && (
            <div id="tn-filter-popup" style={{
              position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
              display: "flex", justifyContent: "flex-start",
              zIndex: 500, padding: "0 1.5rem",
            }}>
              <div style={{
                background: "white", borderRadius: "18px",
                border: "1px solid rgba(0,0,0,0.09)",
                boxShadow: "0 16px 56px rgba(0,0,0,0.15)",
                padding: "1.25rem",
                width: "100%", maxWidth: "820px",
                maxHeight: "75vh",
                overflow: "hidden",
                display: "flex", flexDirection: "column",
                animation: "filterPopIn 0.18s cubic-bezier(0.25,0.46,0.45,0.94) both",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginBottom: "1rem", flexShrink: 0 }}>
                  <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>⚙️ Bộ Lọc Nâng Cao</span>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    {activeCount > 0 && (
                      <button onClick={clearAll}
                        style={{ fontSize: "0.73rem", color: "#ff4757", fontWeight: 700,
                          border: "1.5px solid #ff4757", background: "none",
                          padding: "0.25rem 0.55rem", borderRadius: "7px", cursor: "pointer" }}>
                        Xoá tất cả ({activeCount})
                      </button>
                    )}
                    <button onClick={() => setFilterOpen(false)}
                      style={{ fontSize: "0.78rem", color: "#666", fontWeight: 600,
                        border: "1.5px solid rgba(0,0,0,0.12)", background: "white",
                        padding: "0.25rem 0.65rem", borderRadius: "7px", cursor: "pointer" }}>
                      Xong ✓
                    </button>
                  </div>
                </div>
                {/* 2-column filter grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 2.5rem",
                  overflowY: "auto", flex: 1, alignContent: "start" }}>
                  <FilterPanel f={f} set={set} clearAll={clearAll} activeCount={activeCount} />
                </div>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: "0.85rem",
                  marginTop: "0.5rem", flexShrink: 0, textAlign: "right" }}>
                  <button onClick={() => setFilterOpen(false)} style={{
                    padding: "0.55rem 1.5rem", borderRadius: "11px",
                    background: "#FF6700", color: "white",
                    border: "none", fontWeight: 700, fontSize: "0.87rem", cursor: "pointer",
                  }}>
                    Xem {filtered.length} kết quả →
                  </button>
                </div>
              </div>
            </div>
          )}

          <div style={{ flex: 1 }} />

          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{
              padding: "0.35rem 0.5rem", border: "2px solid rgba(0,0,0,0.09)",
              borderRadius: "8px", fontSize: "0.76rem", fontWeight: 600,
              color: "#1A1A1A", background: "white", cursor: "pointer",
              outline: "none", fontFamily: "inherit",
            }}>
            {SORT_OPTIONS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>

          {activeCount > 0 && (
            <button onClick={clearAll}
              style={{
                padding: "0.32rem 0.65rem", borderRadius: "8px",
                border: "2px solid #ff4757", background: "transparent",
                color: "#ff4757", fontWeight: 700, fontSize: "0.72rem",
                cursor: "pointer", whiteSpace: "nowrap",
              }}>✕ Xoá lọc</button>
          )}

          {/* Mobile filter btn */}
          <button onClick={() => setMobileOpen(true)} className="tn-mobile-filter-btn"
            style={{
              display: "none", alignItems: "center", gap: "0.4rem",
              padding: "0.5rem 1rem", borderRadius: "10px",
              border: activeCount > 0 ? "2px solid #FF6700" : "2px solid rgba(0,0,0,0.12)",
              background: activeCount > 0 ? "#FF670010" : "white",
              color: activeCount > 0 ? "#FF6700" : "#1A1A1A",
              fontWeight: 700, fontSize: "0.82rem", cursor: "pointer",
            }}>
            ⚙️ Bộ lọc{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 1.5rem 4rem" }}>
        {filtered.length > 0 ? (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(218px, 1fr))",
              gap: "1.1rem",
            }}>
              {filtered.map(p => {
                const inCompare = compareList.some(c => c.id === p.id);
                const compareDisabled = !inCompare && compareList.length >= 3;
                return (
                  <div key={p.id} style={{ position: "relative" }}>
                    <ProductCard product={p} />
                    <button
                      onClick={() => !compareDisabled && toggleCompare(p)}
                      title={compareDisabled ? "Chỉ so sánh tối đa 3 sản phẩm" : inCompare ? "Bỏ so sánh" : "So sánh"}
                      style={{
                        position: "absolute", top: "10px", left: "10px",
                        padding: "0.28rem 0.5rem", borderRadius: "8px",
                        border: inCompare ? "1.5px solid #FF6700" : "1.5px solid rgba(0,0,0,0.15)",
                        background: inCompare ? "#FF6700" : "rgba(255,255,255,0.92)",
                        color: inCompare ? "white" : "#666",
                        fontSize: "0.63rem", fontWeight: 700,
                        cursor: compareDisabled ? "not-allowed" : "pointer",
                        opacity: compareDisabled ? 0.4 : 1,
                        backdropFilter: "blur(4px)", transition: "all 0.15s", zIndex: 5,
                        display: "flex", alignItems: "center", gap: "0.2rem",
                      }}>
                      ⚖️ {inCompare ? "✓" : "So sánh"}
                    </button>
                  </div>
                );
              })}
            </div>
            <p style={{ textAlign: "center", marginTop: "2rem", color: "#bbb", fontSize: "0.8rem" }}>
              Hiển thị {filtered.length} sản phẩm
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🔍</div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Không tìm thấy sản phẩm phù hợp
            </h2>
            <p style={{ color: "#888", marginBottom: "1.5rem" }}>Thử thay đổi bộ lọc để xem thêm kết quả</p>
            <button onClick={clearAll} style={{
              padding: "0.65rem 1.5rem", borderRadius: "12px",
              background: "#FF6700", color: "white",
              border: "none", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
            }}>Xoá toàn bộ bộ lọc</button>
          </div>
        )}
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 900,
          background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end",
        }} onClick={e => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
          <div style={{
            width: "100%", background: "white", borderRadius: "20px 20px 0 0",
            maxHeight: "88vh", overflow: "auto", padding: "1.5rem",
            animation: "slideUp 0.25s ease",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <span style={{ fontWeight: 800, fontSize: "1.05rem" }}>⚙️ Bộ Lọc Sản Phẩm</span>
              <button onClick={() => setMobileOpen(false)}
                style={{ border: "none", background: "rgba(0,0,0,0.07)", padding: "0.35rem 0.7rem",
                  borderRadius: "8px", cursor: "pointer", fontWeight: 700 }}>✕ Đóng</button>
            </div>
            <FilterPanel f={f} set={set} clearAll={clearAll} activeCount={activeCount} />
            <button onClick={() => setMobileOpen(false)} style={{
              width: "100%", marginTop: "1.5rem", padding: "0.85rem",
              borderRadius: "12px", background: "#FF6700", color: "white",
              border: "none", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
            }}>
              Xem {filtered.length} kết quả
            </button>
          </div>
        </div>
      )}

      {/* COMPARE BAR */}
      <CompareBar
        items={compareList}
        onRemove={id => setCompareList(prev => prev.filter(p => p.id !== id))}
        onClear={() => setCompareList([])}
      />

      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes filterPopIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 820px) {
          .tn-brand-pills { display: none !important; }
          .tn-mobile-filter-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
