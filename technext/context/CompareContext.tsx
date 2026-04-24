"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "@/lib/types";
import Link from "next/link";

interface CompareCtx {
  items: Product[];
  add: (p: Product) => void;
  remove: (id: number) => void;
  clear: () => void;
  has: (id: number) => boolean;
}

const CompareContext = createContext<CompareCtx | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const add = useCallback((p: Product) => {
    setItems(prev => prev.some(x => x.id === p.id) || prev.length >= 3
      ? prev
      : [...prev, p]);
  }, []);

  const remove = useCallback((id: number) => {
    setItems(prev => prev.filter(x => x.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const has = useCallback((id: number) => items.some(x => x.id === id), [items]);

  return (
    <CompareContext.Provider value={{ items, add, remove, clear, has }}>
      {children}
      {/* Global compare bar */}
      {items.length > 0 && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
          background: "linear-gradient(135deg,#1A1A2E,#16213E)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.35)",
          padding: "0.75rem 1.5rem",
          display: "flex", alignItems: "center", gap: "1rem",
          flexWrap: "wrap",
        }}>
          <span style={{ fontWeight:700, color:"rgba(255,255,255,0.75)", fontSize:"0.82rem", flexShrink:0 }}>
            ⚖️ So sánh ({items.length}/3):
          </span>
          <div style={{ display:"flex", gap:"0.65rem", flex:1, overflow:"auto" }}>
            {items.map(p => (
              <div key={p.id} style={{
                display:"flex", alignItems:"center", gap:"0.4rem",
                background:"rgba(255,255,255,0.1)", borderRadius:"10px",
                padding:"0.3rem 0.7rem", flexShrink:0,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} width={26} height={26} style={{ objectFit:"contain" }} />
                <span style={{ color:"white", fontSize:"0.76rem", fontWeight:600,
                  maxWidth:"120px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {p.name}
                </span>
                <button onClick={() => remove(p.id)} style={{
                  border:"none", background:"rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.7)",
                  borderRadius:"50%", width:"17px", height:"17px", cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.6rem", padding:0,
                }}>✕</button>
              </div>
            ))}
            {Array.from({ length: 3 - items.length }).map((_, i) => (
              <div key={i} style={{
                width:"110px", height:"36px",
                border:"1.5px dashed rgba(255,255,255,0.2)", borderRadius:"10px",
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
              }}>
                <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.7rem" }}>+ Thêm SP</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:"0.5rem", flexShrink:0 }}>
            {items.length >= 2 && (
              <Link href={`/compare?ids=${items.map(p => p.id).join(",")}`}
                style={{ padding:"0.48rem 1rem", borderRadius:"9px", background:"#FF6700",
                  color:"white", fontWeight:700, fontSize:"0.8rem", textDecoration:"none",
                  display:"flex", alignItems:"center", gap:"0.35rem" }}>
                So sánh ngay →
              </Link>
            )}
            <button onClick={clear} style={{
              padding:"0.48rem 0.8rem", borderRadius:"9px",
              background:"rgba(255,255,255,0.1)", border:"none", color:"rgba(255,255,255,0.6)",
              fontSize:"0.78rem", cursor:"pointer",
            }}>Xóa</button>
          </div>
        </div>
      )}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used inside CompareProvider");
  return ctx;
}
