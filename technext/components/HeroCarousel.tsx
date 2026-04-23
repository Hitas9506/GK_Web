"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   SLIDE DATA  –  6 slides, mỗi slide có video thật
   Video nằm trong /public/videos/ → serve qua URL /videos/...
───────────────────────────────────────────────────────────── */
interface Slide {
  id: number;
  badge?: string;
  headline: string;
  sub: string;
  cta:  { label: string; href: string };
  cta2?: { label: string; href: string };
  videoSrc: string;
  fallbackBg: string;
  fallbackEmoji: string;
  overlayFrom: string;
  overlayTo: string;
  ctaBg: string;
  ctaColor: string;
  /** Cách video scale vào khung: "cover" (crop) hoặc "contain" (thấy toàn bộ) */
  videoObjectFit?: "cover" | "contain";
  /** Vị trí điểm neo của video khi dùng contain hoặc cover */
  videoObjectPosition?: string;
}

const SLIDES: Slide[] = [
  /* 1 ── Xiaomi 17 Ultra */
  {
    id: 1,
    badge: "🔥 Flagship 2026",
    headline: "Xiaomi 17 Ultra",
    sub: "Camera Leica UltraPure · Snapdragon 8 Elite · Pin 6000mAh\nGiảm ngay 3.000.000₫ – Chỉ trong tháng này!",
    cta:  { label: "Tìm hiểu thêm", href: "/products/7" },
    cta2: { label: "Mua ngay →",    href: "/products/7" },
    videoSrc:     "/videos/mi17ultra.mp4",
    fallbackBg:   "linear-gradient(135deg,#3d2600,#7a5010)",
    fallbackEmoji:"📱",
    overlayFrom:  "rgba(28,14,0,0.82)",
    overlayTo:    "rgba(28,14,0,0.0)",
    ctaBg:   "#ffffff",
    ctaColor:"#1A1A1A",
  },

  /* 2 ── Samsung S25/S26 Ultra */
  {
    id: 2,
    badge: "✨ Galaxy AI",
    headline: "Samsung Galaxy\nS26 Ultra",
    sub: "Snapdragon 8 Elite · S Pen tích hợp · Camera 200MP\nGiảm 3.000.000₫ · Trả góp 0% lãi suất",
    cta:  { label: "Tìm hiểu thêm", href: "/products/10" },
    cta2: { label: "Mua ngay →",    href: "/products/10" },
    videoSrc:     "/videos/samsung-s26-ultra.webm",
    fallbackBg:   "linear-gradient(135deg,#0a1520,#152840)",
    fallbackEmoji:"📱",
    overlayFrom:  "rgba(6,12,20,0.85)",
    overlayTo:    "rgba(6,12,20,0.0)",
    ctaBg:   "#ffffff",
    ctaColor:"#0f2035",
  },

  /* 3 ── iPhone 17 Pro
     Video dọc/portrait → dùng "contain" + fullDarkOverlay để nền hoàn toàn đen */
  {
    id: 3,
    badge: "🍎 Apple Intelligence",
    headline: "iPhone 17 Pro",
    sub: "Chip A19 Pro · Camera 48MP 5x Tetraprism · Khung titan\nBảo hành chính hãng VN/A · Giao hàng toàn quốc",
    cta:  { label: "Tìm hiểu thêm", href: "/products/2" },
    cta2: { label: "Mua ngay →",    href: "/products/2" },
    videoSrc:         "/videos/iphone-17-pro.mp4",
    fallbackBg:       "#000000",
    fallbackEmoji:    "📱",
    overlayFrom:      "rgba(0,0,0,0.80)",
    overlayTo:        "rgba(0,0,0,0.0)",
    ctaBg:            "#ffffff",
    ctaColor:         "#1A1A1A",
    videoObjectFit:      "contain",
    videoObjectPosition: "center center",
  },

  /* 4 ── iPad Air
     Video cũng dạng landscape không khớp tỷ lệ → dùng "contain" */
  {
    id: 4,
    badge: "☁️ iPadOS 19",
    headline: "iPad Air M4",
    sub: "Chip Apple M4 · Màn hình Liquid Retina 11\" P3\nHỗ trợ Apple Pencil Pro · Magic Keyboard",
    cta:  { label: "Tìm hiểu thêm", href: "/products/17" },
    cta2: { label: "Xem Tablet →",   href: "/products?category=tablet" },
    videoSrc:         "/videos/ipad-air.webm",
    fallbackBg:       "linear-gradient(135deg,#0d1a2e,#1a2f4a)",
    fallbackEmoji:    "📲",
    overlayFrom:      "rgba(8,14,24,0.80)",
    overlayTo:        "rgba(8,14,24,0.0)",
    ctaBg:            "#ffffff",
    ctaColor:         "#0d1a2e",
    videoObjectFit:      "contain",
    videoObjectPosition: "center center",
  },

  /* 5 ── Xiaomi Pad 8 Pro */
  {
    id: 5,
    badge: "🎮 Snapdragon 8s Gen 3",
    headline: "Xiaomi Pad 8 Pro",
    sub: "Màn hình 12.1\" 3K IPS 144Hz · 4 loa Harman Kardon\nPin 10.000mAh sạc 67W · Hỗ trợ bút cảm ứng",
    cta:  { label: "Tìm hiểu thêm", href: "/products/20" },
    cta2: { label: "Mua ngay →",    href: "/products/20" },
    videoSrc:     "/videos/xiaomi-pad-8-pro.webm",
    fallbackBg:   "linear-gradient(135deg,#1A0A00,#401e00)",
    fallbackEmoji:"📲",
    overlayFrom:  "rgba(18,8,0,0.83)",
    overlayTo:    "rgba(18,8,0,0.0)",
    ctaBg:   "#FF6700",
    ctaColor:"#ffffff",
  },

  /* 6 ── iPad M5 / iPad Pro */
  {
    id: 6,
    badge: "💻 Chip M5 Ultra",
    headline: "iPad Pro M5",
    sub: "Màn hình OLED 13\" ProMotion 120Hz · Chip M5\nThiết kế mỏng nhất từ trước đến nay",
    cta:  { label: "Tìm hiểu thêm", href: "/products/16" },
    cta2: { label: "Xem Tablet →",   href: "/products?category=tablet" },
    videoSrc:     "/videos/ipad-m5.mp4",
    fallbackBg:   "linear-gradient(135deg,#0a0f1a,#1a2535)",
    fallbackEmoji:"📲",
    overlayFrom:  "rgba(6,8,16,0.82)",
    overlayTo:    "rgba(6,8,16,0.0)",
    ctaBg:   "#ffffff",
    ctaColor:"#0a0f1a",
  },
];

const AUTO_PLAY_MS = 6000;

export default function HeroCarousel() {
  const [current,  setCurrent]  = useState(0);
  const [paused,   setPaused]   = useState(false);
  const [animDir,  setAnimDir]  = useState<"left" | "right">("left");
  const [vidReady, setVidReady] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const goTo = useCallback((idx: number, dir: "left" | "right" = "left") => {
    setAnimDir(dir);
    setVidReady(false);
    setCurrent(idx);
  }, []);

  const prev = useCallback(() =>
    goTo((current - 1 + SLIDES.length) % SLIDES.length, "right"), [current, goTo]);
  const next = useCallback(() =>
    goTo((current + 1) % SLIDES.length, "left"), [current, goTo]);

  /* Auto-play */
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTO_PLAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, next]);

  /* Keyboard */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [prev, next]);

  /* Replay video on slide change */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {/* autoplay blocked – fine, loop will handle it */});
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section
      aria-label="Hero banner carousel"
      style={{ position: "relative", overflow: "hidden", userSelect: "none", width: "100%", display: "block" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* ════════════ SLIDE CONTAINER ════════════ */}
      <div
        key={slide.id}
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          minHeight: "clamp(360px, 46vw, 600px)",
          display: "flex",
          alignItems: "center",
          background: slide.fallbackBg,   /* luôn hiện dưới video */
          animation: `hero-${animDir}-in 0.55s cubic-bezier(0.25,0.46,0.45,0.94) both`,
        }}
      >
        {/* ── VIDEO ── */}
        <video
          ref={videoRef}
          key={slide.videoSrc}
          src={slide.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
          onCanPlay={() => setVidReady(true)}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: slide.videoObjectFit ?? "cover",
            objectPosition: slide.videoObjectPosition ?? "center center",
            backgroundColor: "#000000",
            opacity: vidReady ? 1 : 0,
            transition: "opacity 0.7s ease",
            zIndex: 0,
          }}
        />

        {/* Fallback emoji khi video chưa ready */}
        {!vidReady && (
          <div style={{
            position: "absolute",
            right: "8%", top: "50%",
            transform: "translateY(-50%)",
            fontSize: "clamp(8rem,16vw,14rem)",
            lineHeight: 1,
            filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.4))",
            zIndex: 1,
            animation: "hero-visual-in 0.6s 0.1s ease both",
          }} className="hero-visual">
            {slide.fallbackEmoji}
          </div>
        )}

        {/* ── GRADIENT OVERLAY: bên trái tối → bên phải trong suốt ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: `linear-gradient(to right,
            ${slide.overlayFrom} 0%,
            ${slide.overlayFrom} 28%,
            ${slide.overlayTo}   72%,
            transparent          100%)`,
          pointerEvents: "none",
        }} />

        {/* Viền tối dưới cùng để dot indicators dễ thấy */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "80px", zIndex: 2,
          background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
          pointerEvents: "none",
        }} />

        {/* ── TEXT CONTENT (zIndex 3 – trên cùng) ── */}
        <div style={{
          position: "relative", zIndex: 3,
          maxWidth: "1280px", margin: "0 auto", width: "100%",
          padding: "3.5rem 5%",
        }}>
          <div style={{ maxWidth: "500px" }}>

            {/* Badge */}
            {slide.badge && (
              <span style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: "#ffffff",
                padding: "0.28rem 0.9rem",
                borderRadius: "2rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                marginBottom: "1rem",
                border: "1px solid rgba(255,255,255,0.3)",
              }}>
                {slide.badge}
              </span>
            )}

            {/* Headline */}
            <h1 style={{
              fontSize: "clamp(2rem,4vw,3.2rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#ffffff",
              marginBottom: "1rem",
              whiteSpace: "pre-line",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}>
              {slide.headline}
            </h1>

            {/* Sub */}
            <p style={{
              fontSize: "clamp(0.82rem,1.2vw,0.97rem)",
              color: "rgba(255,255,255,0.80)",
              lineHeight: 1.78,
              marginBottom: "1.75rem",
              whiteSpace: "pre-line",
              textShadow: "0 1px 10px rgba(0,0,0,0.6)",
            }}>
              {slide.sub}
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link
                href={slide.cta.href}
                style={{
                  background: slide.ctaBg,
                  color: slide.ctaColor,
                  padding: "0.72rem 1.7rem",
                  borderRadius: "6px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "all 0.22s ease",
                  display: "inline-block",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 10px 28px rgba(0,0,0,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.35)";
                }}
              >
                {slide.cta.label}
              </Link>

              {slide.cta2 && (
                <Link
                  href={slide.cta2.href}
                  style={{
                    background: "transparent",
                    color: "rgba(255,255,255,0.92)",
                    padding: "0.72rem 1.4rem",
                    borderRadius: "6px",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "all 0.22s ease",
                    border: "2px solid rgba(255,255,255,0.45)",
                    display: "inline-block",
                    backdropFilter: "blur(4px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.18)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.75)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.45)";
                  }}
                >
                  {slide.cta2.label}
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
      {/* end slide */}


      {/* ── LEFT ARROW ── */}
      <button
        onClick={prev}
        aria-label="Slide trước"
        style={arrowStyle("left")}
        onMouseEnter={(e) => arrowHover(e, true)}
        onMouseLeave={(e) => arrowHover(e, false)}
      >‹</button>

      {/* ── RIGHT ARROW ── */}
      <button
        onClick={next}
        aria-label="Slide tiếp theo"
        style={arrowStyle("right")}
        onMouseEnter={(e) => arrowHover(e, true)}
        onMouseLeave={(e) => arrowHover(e, false)}
      >›</button>

      {/* ── DOTS ── */}
      <div style={{
        position: "absolute", bottom: "1.1rem", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: "0.45rem",
        zIndex: 10,
      }}>
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? "left" : "right")}
            aria-label={`Slide ${i + 1}`}
            style={{
              width:  i === current ? "26px" : "8px",
              height: "8px",
              borderRadius: "4px",
              border: "none",
              background: i === current
                ? "rgba(255,255,255,0.95)"
                : "rgba(255,255,255,0.40)",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: i === current ? "0 1px 8px rgba(0,0,0,0.3)" : "none",
            }}
          />
        ))}
      </div>

      {/* ── SLIDE COUNTER ── */}
      <div style={{
        position: "absolute", top: "1rem", right: "1.5rem",
        zIndex: 10,
        fontSize: "0.72rem",
        fontWeight: 700,
        color: "rgba(255,255,255,0.6)",
        letterSpacing: "0.1em",
        textShadow: "0 1px 6px rgba(0,0,0,0.5)",
      }}>
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>

      {/* ── PROGRESS BAR ── */}
      {!paused && (
        <div style={{
          position: "absolute", bottom: 0, left: 0,
          height: "3px", width: "100%",
          background: "rgba(255,255,255,0.12)",
          zIndex: 10,
        }}>
          <div
            key={`${current}-prog`}
            style={{
              height: "100%",
              background: "rgba(255,255,255,0.75)",
              animation: `progress-fill ${AUTO_PLAY_MS}ms linear forwards`,
            }}
          />
        </div>
      )}

      {/* ── ANIMATIONS ── */}
      <style>{`
        /* Stop globals.css height:auto from overriding the video's inline height:100% */
        .hero-video {
          max-width: none !important;
          height: 100% !important;
        }
        @keyframes hero-left-in {
          from { opacity: 0; transform: translateX(55px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes hero-right-in {
          from { opacity: 0; transform: translateX(-55px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes hero-visual-in {
          from { opacity: 0; transform: translateY(-50%) scale(0.84); }
          to   { opacity: 1; transform: translateY(-50%) scale(1);    }
        }
        @keyframes progress-fill {
          from { width: 0%;   }
          to   { width: 100%; }
        }
        @media (max-width: 767px) {
          .hero-visual { display: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Helper styles cho arrow buttons ── */
function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    [side]: "1.1rem",
    top: "50%",
    transform: "translateY(-50%)",
    width: "44px", height: "44px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.18)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "1.4rem", color: "#fff",
    boxShadow: "0 2px 14px rgba(0,0,0,0.35)",
    transition: "all 0.2s ease",
    zIndex: 10,
  };
}

function arrowHover(e: React.MouseEvent<HTMLButtonElement>, enter: boolean) {
  const b = e.currentTarget;
  b.style.background = enter ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)";
  b.style.transform  = enter
    ? "translateY(-50%) scale(1.1)"
    : "translateY(-50%) scale(1)";
}
