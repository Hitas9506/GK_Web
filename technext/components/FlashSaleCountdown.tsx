"use client";

import { useState, useEffect } from "react";

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function Block({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          background: "#FF6700",
          color: "white",
          fontWeight: 900,
          fontSize: "1.25rem",
          padding: "0.3rem 0.7rem",
          borderRadius: "8px",
          minWidth: "46px",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.02em",
          boxShadow: "0 4px 14px rgba(255,103,0,0.35)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.58rem",
          color: "#bbb",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginTop: "0.3rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function FlashSaleCountdown() {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const end = (() => {
      const d = new Date();
      d.setHours(23, 59, 59, 999);
      return d.getTime();
    })();

    const tick = () => setMs(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (ms === null) return null;

  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1_000);

  const colon = (
    <span
      style={{
        color: "#FF6700",
        fontWeight: 900,
        fontSize: "1.4rem",
        alignSelf: "flex-start",
        paddingTop: "0.25rem",
        lineHeight: 1,
      }}
    >
      :
    </span>
  );

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.35rem" }}>
      <Block value={pad(h)} label="Giờ" />
      {colon}
      <Block value={pad(m)} label="Phút" />
      {colon}
      <Block value={pad(s)} label="Giây" />
    </div>
  );
}
