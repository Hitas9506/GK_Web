"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

/** Height of this banner. Keep in sync with:
 *  - Navbar.tsx  → top: "BANNER_H"
 *  - All pages   → paddingTop starts at BANNER_H + 44 (navbar)
 */
export const BANNER_H = 48;

/* ── USP items for marquee ──────────────────────────────────── */
const USPs = [
  { icon: "✅", text: "Hàng Chính Hãng · Hóa Đơn VAT" },
  { icon: "🚚", text: "Giao Nhanh · Miễn Phí trên 300k" },
  { icon: "🎧", text: "Hỗ Trợ Kỹ Thuật 24/7" },
  { icon: "🏆", text: "Bảo Hành 12 Tháng Chính Hãng" },
];

/* Timing (ms) */
const MARQUEE_HOLD  = 18_000; // marquee scroll duration
const FADE_DURATION =    500; // cross-fade duration
const PROMO_HOLD    =  7_000; // promo banner display time

type Mode = "marquee" | "promo";

export default function PromoBanner() {
  const [mode,   setMode]   = useState<Mode>("marquee");
  const [fading, setFading] = useState(false);

  /* Infinite alternating cycle */
  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];

    function cycle() {
      /* ① show marquee */
      setMode("marquee");
      setFading(false);

      /* ② fade out marquee */
      ids.push(setTimeout(() => setFading(true), MARQUEE_HOLD));

      /* ③ switch to promo + fade in */
      ids.push(setTimeout(() => {
        setMode("promo");
        setFading(false);
      }, MARQUEE_HOLD + FADE_DURATION));

      /* ④ fade out promo */
      ids.push(setTimeout(() => setFading(true),
        MARQUEE_HOLD + FADE_DURATION + PROMO_HOLD));

      /* ⑤ restart */
      ids.push(setTimeout(cycle,
        MARQUEE_HOLD + FADE_DURATION + PROMO_HOLD + FADE_DURATION));
    }

    cycle();
    return () => ids.forEach(clearTimeout);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 101,
        height: `${BANNER_H}px`,
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ── Background gradient ── */}
      <div style={{
        position: "absolute", inset: 0,
        background:
          "linear-gradient(90deg, #c80000 0%, #e80000 20%, #ff2200 50%, #e80000 80%, #c80000 100%)",
      }} />

      {/* ── Shine sweep ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          "linear-gradient(108deg, transparent 25%, rgba(255,255,255,0.10) 48%, transparent 70%)",
      }} />

      {/* ── Bottom inner glow ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "3px",
        background: "linear-gradient(90deg, transparent, rgba(255,90,0,0.6), transparent)",
        pointerEvents: "none",
      }} />

      {/* ── Content layer — fades in/out during transitions ── */}
      <div style={{
        position: "relative", zIndex: 1,
        height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_DURATION}ms ease`,
      }}>

        {/* ═══ STATE 1 — MARQUEE ═══ */}
        {mode === "marquee" && (
          <div style={{
            position: "absolute",
            left: "8%", right: "8%",   /* ← 8 % gap on each side */
            top: 0, bottom: 0,
            overflow: "hidden",
            display: "flex", alignItems: "center",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              animation: `promoMarquee ${MARQUEE_HOLD}ms linear both`,
              whiteSpace: "nowrap",
              willChange: "transform",
              flexShrink: 0,
            }}>
              {/* Duplicate the list so it feels continuous */}
              {USPs.map((usp, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex", alignItems: "center",
                    gap: "0.5rem",
                    color: "white",
                    fontSize: "0.85rem", fontWeight: 600,
                    padding: "0 2.5rem",
                    flexShrink: 0,
                    letterSpacing: "0.015em",
                  }}
                >
                  <span style={{
                    fontSize: "1rem",
                    filter: "drop-shadow(0 0 4px rgba(255,255,150,0.5))",
                  }}>{usp.icon}</span>
                  {usp.text}

                  {/* Divider dot */}
                  <span style={{
                    display: "inline-block",
                    width: "4px", height: "4px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.45)",
                    marginLeft: "1.5rem",
                    flexShrink: 0,
                  }} />
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ═══ STATE 2 — PROMO BANNER ═══ */}
        {mode === "promo" && (
          <div style={{
            display: "flex", alignItems: "center",
            gap: "0.55rem",
          }}>
            {/* ⭐ Star mascot */}
            <span style={{
              fontSize: "1.6rem", lineHeight: 1,
              filter: "drop-shadow(0 0 8px rgba(255,230,0,0.9))",
              flexShrink: 0,
              animation: "bannerStar 2s ease-in-out infinite",
            }}>⭐</span>

            {/* Day pill */}
            <span style={{
              background: "white", color: "#cc0000",
              fontWeight: 900, fontSize: "0.82rem",
              padding: "0.25rem 0.85rem", borderRadius: "30px",
              letterSpacing: "0.06em", flexShrink: 0, whiteSpace: "nowrap",
              boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
            }}>THỨ TƯ</span>

            {/* Main text */}
            <span style={{
              color: "white", fontWeight: 900, fontSize: "1.05rem",
              letterSpacing: "0.02em",
              textShadow: "0 2px 8px rgba(0,0,0,0.35)",
              flexShrink: 0, whiteSpace: "nowrap",
            }}>SALE SẬP SÀN</span>

            <span style={{
              color: "#FFE000", fontSize: "1.15rem", flexShrink: 0,
              filter: "drop-shadow(0 0 5px rgba(255,220,0,0.8))",
            }}>⚡</span>

            {/* Discount */}
            <span style={{
              color: "#FFE000", fontWeight: 900, fontSize: "0.9rem",
              textShadow: "0 0 12px rgba(255,220,0,0.55)",
              flexShrink: 0, whiteSpace: "nowrap",
            }}>
              GIẢM ĐẾN&nbsp;
              <span style={{ fontSize: "1.2rem", letterSpacing: "-0.01em" }}>50%</span>
              <sup style={{ fontSize: "0.65rem", verticalAlign: "super", fontWeight: 900 }}>++</sup>
            </span>

            <span style={{
              color: "#FFE000", fontSize: "1.15rem", flexShrink: 0,
              filter: "drop-shadow(0 0 5px rgba(255,220,0,0.8))",
            }}>⚡</span>

            {/* CTA */}
            <Link
              href="/products"
              style={{
                background: "linear-gradient(135deg, #FFE600 0%, #FFB800 100%)",
                color: "#aa0000", fontWeight: 900, fontSize: "0.8rem",
                padding: "0.3rem 1.1rem", borderRadius: "30px",
                textDecoration: "none", letterSpacing: "0.04em",
                flexShrink: 0, whiteSpace: "nowrap",
                boxShadow:
                  "0 3px 10px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.06)";
                e.currentTarget.style.boxShadow =
                  "0 5px 16px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 3px 10px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)";
              }}
            >
              MUA NGAY
            </Link>
          </div>
        )}
      </div>

      <style>{`
        /*
         * Marquee: starts at right edge of the 84 vw clip container
         * (translateX(84vw) = clip width, so content enters from clip's right).
         * Ends at -100% (own width) = exits through clip's left edge.
         * The 8% gaps on each side always show the red background.
         */
        @keyframes promoMarquee {
          0%   { transform: translateX(84vw); }
          100% { transform: translateX(-100%); }
        }

        /* Star bounce on promo banner */
        @keyframes bannerStar {
          0%, 100% { transform: scale(1)    rotate(-5deg); }
          50%       { transform: scale(1.15) rotate(8deg);  }
        }
      `}</style>
    </div>
  );
}
