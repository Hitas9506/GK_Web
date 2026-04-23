"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

// ── Lightning bolt background shapes ─────────────────────────
const BG_BOLTS = [
  { size: 210, rot: -14, x:  10, y: -50, op: 0.10, blur: 4 },
  { size: 145, rot:  28, x: 260, y:  90, op: 0.07, blur: 3 },
  { size: 290, rot:  -7, x: 470, y: -80, op: 0.09, blur: 6 },
  { size: 125, rot:  32, x: 660, y: 140, op: 0.07, blur: 2 },
  { size: 250, rot: -20, x: 820, y: -65, op: 0.08, blur: 5 },
  { size: 170, rot:  12, x:1010, y:  80, op: 0.09, blur: 3 },
  { size: 230, rot: -28, x:1200, y: -45, op: 0.11, blur: 4 },
  { size: 100, rot:  20, x: 370, y: -10, op: 0.06, blur: 2 },
  { size: 180, rot: -10, x:1350, y: 100, op: 0.08, blur: 3 },
];

// ── Scattered gold star positions ─────────────────────────────
const GOLD_STARS = [
  { x:  42, y:  20, s: 14, rot:  15, op: 0.90, dur: 2.1 },
  { x: 175, y:  14, s:  9, rot: -10, op: 0.70, dur: 2.8 },
  { x: 385, y:  25, s: 18, rot:  22, op: 0.85, dur: 1.9 },
  { x: 540, y:  12, s: 11, rot: -18, op: 0.72, dur: 2.4 },
  { x: 715, y:  20, s: 16, rot:   8, op: 0.80, dur: 2.2 },
  { x: 870, y:  14, s: 10, rot: -14, op: 0.68, dur: 3.0 },
  { x: 975, y:  22, s: 13, rot:  20, op: 0.82, dur: 1.8 },
  { x:1085, y:  16, s: 10, rot:  -8, op: 0.73, dur: 2.6 },
  { x:  95, y: 300, s: 12, rot:  12, op: 0.72, dur: 2.3 },
  { x: 285, y: 296, s: 15, rot: -20, op: 0.80, dur: 2.0 },
  { x: 455, y: 312, s:  8, rot:  30, op: 0.62, dur: 2.7 },
  { x: 625, y: 302, s: 13, rot:  -5, op: 0.75, dur: 1.9 },
  { x: 785, y: 294, s: 11, rot:  24, op: 0.70, dur: 2.5 },
  { x: 940, y: 308, s: 16, rot: -14, op: 0.84, dur: 2.1 },
  { x:  50, y: 155, s:  8, rot:  10, op: 0.60, dur: 3.1 },
  { x:1410, y:  38, s: 14, rot: -20, op: 0.78, dur: 2.2 },
  { x:1395, y: 290, s: 11, rot:  15, op: 0.70, dur: 2.8 },
  { x:1240, y:  24, s:  9, rot: -12, op: 0.65, dur: 2.4 },
  { x: 160, y: 170, s:  7, rot:  18, op: 0.55, dur: 3.3 },
  { x:1060, y: 150, s:  9, rot: -22, op: 0.60, dur: 2.9 },
];

// ── Sub-components ────────────────────────────────────────────

function LightningBg({ size, rot, x, y, op, blur }: {
  size: number; rot: number; x: number; y: number; op: number; blur: number;
}) {
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      transform: `rotate(${rot}deg)`,
      opacity: op,
      filter: `blur(${blur}px) drop-shadow(0 0 8px rgba(255,220,60,0.8))`,
      pointerEvents: "none", zIndex: 1,
    }}>
      <svg width={size} height={Math.round(size * 1.35)} viewBox="0 0 60 80" fill="none">
        <path d="M38 0 L14 44 L26 44 L6 80 L54 36 L36 36 Z" fill="rgba(255,235,80,0.95)" />
      </svg>
    </div>
  );
}

function GoldStar({ x, y, s, rot, op, dur }: {
  x: number; y: number; s: number; rot: number; op: number; dur: number;
}) {
  return (
    <motion.div
      style={{ position: "absolute", left: x, top: y, zIndex: 3 }}
      animate={{ opacity: [op * 0.6, op, op * 0.6], scale: [0.88, 1.1, 0.88] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: (x * 0.003) % 2 }}
    >
      <svg width={s} height={s} viewBox="0 0 50 50">
        <defs>
          <linearGradient id={`starGold-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#FFF176" />
            <stop offset="50%"  stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FF9800" />
          </linearGradient>
        </defs>
        <polygon
          points="25,3 30.9,18.6 47.6,18.6 34.4,29 39.5,45 25,35 10.5,45 15.6,29 2.4,18.6 19.1,18.6"
          fill={`url(#starGold-${x}-${y})`}
        />
      </svg>
    </motion.div>
  );
}

function ZapIcon({ size = 28, color = "#FFE000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={Math.round(size * 80 / 60)} viewBox="0 0 60 80" fill="none">
      <path
        d="M38 0 L14 44 L26 44 L6 80 L54 36 L36 36 Z"
        fill={color}
        style={{ filter: "drop-shadow(0 0 4px rgba(255,230,0,0.7))" }}
      />
    </svg>
  );
}

// ── Main banner ───────────────────────────────────────────────
export default function FlashSaleBannerHero() {
  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left:  ((i * 8.1  + 4)  % 100),
      top:   ((i * 14.3 + 8)  % 100),
      dur:   1.8 + (i % 5) * 0.4,
      delay: (i * 0.22) % 2.4,
    })),
  []);

  return (
    <div style={{
      width: "100%",
      height: "340px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* ── BACKGROUND ──────────────────────────────────────────── */}

      {/* Base red gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background:
          "linear-gradient(90deg, #A80000 0%, #C40000 18%, #DE0000 42%, #E8000A 50%, #DE0000 58%, #C40000 82%, #A80000 100%)",
      }} />

      {/* Warm orange glow from bottom-centre */}
      <div style={{
        position: "absolute", zIndex: 1,
        bottom: "-120px", left: "20%", right: "20%", height: "300px",
        background: "radial-gradient(ellipse, rgba(255,145,0,0.42) 0%, rgba(255,60,0,0.18) 50%, transparent 74%)",
      }} />

      {/* Centre brightening */}
      <div style={{
        position: "absolute", zIndex: 1,
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "800px", height: "420px",
        background: "radial-gradient(ellipse, rgba(255,50,0,0.16) 0%, transparent 70%)",
      }} />

      {/* Vignette corners */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background:
          "radial-gradient(ellipse at top left,  rgba(60,0,0,0.55) 0%, transparent 44%)," +
          "radial-gradient(ellipse at top right, rgba(60,0,0,0.55) 0%, transparent 44%)",
      }} />

      {/* Diagonal sheen */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background:
          "linear-gradient(128deg, transparent 0%, rgba(255,255,255,0.055) 44%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.055) 56%, transparent 100%)",
      }} />

      {/* Background lightning bolts */}
      {BG_BOLTS.map((b, i) => <LightningBg key={i} {...b} />)}

      {/* ── GOLD STARS ──────────────────────────────────────────── */}
      {GOLD_STARS.map((st, i) => <GoldStar key={i} {...st} />)}

      {/* ── SHIMMER PARTICLES ───────────────────────────────────── */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            width: 2, height: 2,
            borderRadius: "50%",
            background: "#FFE060",
            left: `${p.left}%`, top: `${p.top}%`,
            zIndex: 3,
          }}
          animate={{ opacity: [0.15, 0.75, 0.15], scale: [1, 2.2, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }}
        />
      ))}

      {/* Golden bottom border */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "3px", zIndex: 10,
        background:
          "linear-gradient(90deg, transparent 0%, #FFB800 8%, #FFE800 30%, #FFE800 70%, #FFB800 92%, transparent 100%)",
        boxShadow: "0 0 16px rgba(255,232,0,0.8)",
      }} />

      {/* ══════════════════════════════════════════════════════════
          MAIN TEXT BLOCK — left side
      ══════════════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        left: 70, right: 320,
        top: 0, bottom: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        zIndex: 6, gap: "10px",
      }}>

        {/* FLASH SALE pill badge */}
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55 }}
        >
          <span style={{
            display: "inline-block",
            background: "white",
            color: "#CC0000",
            fontWeight: "900",
            fontSize: "13px",
            padding: "4px 24px",
            borderRadius: "999px",
            letterSpacing: "0.14em",
            boxShadow: "0 3px 14px rgba(0,0,0,0.28)",
            textTransform: "uppercase",
          }}>
            FLASH SALE
          </span>
        </motion.div>

        {/* SALE SẬP SÀN — golden serif headline */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          style={{ filter: "drop-shadow(0 6px 22px rgba(200,80,0,0.55)) drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
        >
          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
            fontSize: "96px",
            fontWeight: "900",
            fontStyle: "italic",
            lineHeight: "1",
            letterSpacing: "-1px",
            margin: 0,
            background: "linear-gradient(180deg, #FFF5A0 0%, #FFE000 25%, #FFD000 55%, #FFA500 85%, #FF8C00 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            SALE SẬP SÀN
          </h2>
        </motion.div>

        {/* GIẢM ĐẾN 70%++ — red badge flanked by lightning */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          style={{ display: "flex", alignItems: "center", gap: "14px" }}
        >
          <motion.div
            animate={{ scale: [1, 1.28, 1], rotate: [0, -14, 14, 0] }}
            transition={{ duration: 0.85, repeat: Infinity }}
          >
            <ZapIcon size={36} />
          </motion.div>

          <div style={{
            background: "linear-gradient(138deg, #940000, #B80000, #940000)",
            borderRadius: "14px",
            padding: "9px 28px 11px",
            display: "flex", alignItems: "baseline", gap: "8px",
            boxShadow:
              "0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.2)",
            border: "1.5px solid rgba(255,90,90,0.2)",
          }}>
            <span style={{
              color: "rgba(255,255,255,0.92)", fontWeight: "800",
              fontSize: "18px", letterSpacing: "0.04em", alignSelf: "center",
            }}>GIẢM ĐẾN</span>
            <span style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: "#FFE000", fontWeight: "900",
              fontSize: "62px", lineHeight: "0.9",
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            }}>70%</span>
            <span style={{
              color: "white", fontWeight: "900",
              fontSize: "26px", lineHeight: "1",
              alignSelf: "flex-start", marginTop: "6px",
            }}>++</span>
          </div>

          <motion.div
            animate={{ scale: [1, 1.28, 1], rotate: [0, 14, -14, 0] }}
            transition={{ duration: 0.85, repeat: Infinity, delay: 0.42 }}
          >
            <ZapIcon size={36} />
          </motion.div>
        </motion.div>

        {/* Vietnamese disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.72)",
            fontSize: "12px",
            lineHeight: "1.65",
            letterSpacing: "0.01em",
          }}
        >
          <div>Flash sale bắt đầu từ 9:00 mỗi ngày (số lượng có hạn)</div>
          <div style={{ fontStyle: "italic" }}>
            *Mua sắm thông minh, tiết kiệm thời gian cùng TechNext*
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          RIGHT — Yellow promo box
      ══════════════════════════════════════════════════════════ */}
      <div style={{
        position: "absolute", right: 58,
        top: "50%", transform: "translateY(-50%)",
        zIndex: 6,
      }}>
        {/* Glow halo */}
        <div style={{
          position: "absolute", inset: "-20px",
          background: "radial-gradient(ellipse, rgba(255,225,0,0.24) 0%, transparent 72%)",
          borderRadius: "30px",
        }} />

        <div style={{ transform: "rotate(2.5deg)" }}>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(145deg, #FFE900 0%, #FFD600 55%, #FFC700 100%)",
              borderRadius: "16px",
              padding: "20px 26px 18px",
              width: "218px",
              textAlign: "center",
              boxShadow:
                "0 18px 50px rgba(0,0,0,0.48), 0 6px 16px rgba(200,160,0,0.3), inset 0 1.5px 0 rgba(255,255,255,0.6)",
            }}
          >
            <div style={{
              color: "#1C0000", fontWeight: "900",
              fontSize: "20px", letterSpacing: "0.07em",
              lineHeight: 1, marginBottom: "5px",
              textShadow: "0 1px 3px rgba(0,0,0,0.1)",
              fontFamily: '"Playfair Display", Georgia, serif',
            }}>KỶ NGUYÊN</div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                color: "#CC0000", fontWeight: "900",
                fontStyle: "italic", fontSize: "66px",
                lineHeight: "0.92",
                textShadow:
                  "-1.5px -1.5px 0 rgba(0,0,0,0.1), 1.5px 1.5px 0 rgba(0,0,0,0.07), 0 4px 14px rgba(180,0,0,0.28)",
                letterSpacing: "2px",
              }}>MỚI</div>
            </motion.div>

            <div style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.14), transparent)",
              margin: "6px 0 5px",
            }} />

            <div style={{
              color: "#2C0000", fontWeight: "700",
              fontSize: "11px", letterSpacing: "0.08em", lineHeight: 1.3,
            }}>VƯỢT CHUẨN • NÂNG TẦM</div>
          </motion.div>
        </div>
      </div>

      {/* ── GIFT BOX — bottom right ───────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 20, right: 275,
          zIndex: 7,
          filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.45))",
        }}
        animate={{ y: [0, -8, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span style={{ fontSize: "36px" }}>🎁</span>
      </motion.div>
    </div>
  );
}
