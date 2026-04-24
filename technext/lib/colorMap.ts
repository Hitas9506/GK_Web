/**
 * Maps Vietnamese product color names → CSS color values.
 * Used to render color swatch dots on product cards.
 */
export const COLOR_MAP: Record<string, string> = {
  // ── Trắng / Bạc / Xám ──────────────────────────────────────
  "Trắng":              "#FFFFFF",
  "Trắng Mây":         "#F0F0F0",
  "Trắng Classic":     "#F5F5F0",
  "Trắng Cổ Điển":     "#F5F5F0",
  "Titanium Trắng":    "#E8E8E0",
  "Trắng Ánh Sao":     "#F5F3EE",
  "Bạc":               "#C0C0C8",
  "Bạc Shadow":        "#9090A0",
  "Bạc Titan":         "#C8C8CC",
  "Xám":               "#8E8E93",
  "Xám Titan":         "#9A9A9E",
  "Titan Tự Nhiên":    "#B5A99A",
  "Titan Bạc":         "#D4D0C8",
  "Ánh Sao":           "#F2EEEA",

  // ── Đen ────────────────────────────────────────────────────
  "Đen":               "#1C1C1E",
  "Đen Không Gian":    "#1C1C1E",
  "Đen Classic":       "#1C1C1E",
  "Đen Midnight":      "#1B2235",
  "Đen Onyx":          "#353839",
  "Đen Titan":         "#2C2C2E",
  "Đen Ocean":         "#1B2A3B",

  // ── Cam / Đỏ ───────────────────────────────────────────────
  "Cam Vũ Trụ":        "#E8602C",
  "Cam":               "#FF6700",
  "Đỏ":                "#E3001C",
  "Đỏ Coral":          "#FF6B6B",

  // ── Hồng ───────────────────────────────────────────────────
  "Hồng":              "#FF9BAA",
  "Hồng Cát":          "#E8C4B8",
  "Hồng Ánh Sao":      "#F4C2C2",
  "Vàng Rose":         "#E8B4A0",

  // ── Xanh lam / dương / biển ────────────────────────────────
  "Xanh":              "#4A90D9",
  "Xanh Dương":        "#3A7BD5",
  "Xanh Đậm":          "#1B3A6B",
  "Xanh Da Trời":      "#5B92D8",
  "Xanh Lam":          "#4A90D9",
  "Xanh Lam Khói":     "#8BA7C7",
  "Xanh Cobalt":       "#0047AB",
  "Xanh Sky Blue":     "#87CEEB",
  "Xanh Navy":         "#002B80",
  "Xanh Icy":          "#B8D4E8",
  "Xanh Titan":        "#6A97B0",
  "Xanh Không Gian":   "#1E3A5F",
  "Xanh Biển":         "#1E90FF",
  "Tím Cobalt":        "#6A5ACD",

  // ── Xanh lá / mint ─────────────────────────────────────────
  "Xanh Lá":           "#34C759",
  "Xanh Lá Xô Thơm":  "#6B8F71",
  "Xanh Ngọc":         "#1ABC9C",
  "Xanh Bạc Hà":       "#98D8C8",
  "Xanh Mint":         "#9DD9CC",

  // ── Tím / Tía ──────────────────────────────────────────────
  "Tím":               "#9B59B6",
  "Tím Oải Hương":     "#B39DDB",
  "Tím Lavender":      "#9B8DBF",

  // ── Vàng / Be ──────────────────────────────────────────────
  "Vàng":              "#FFD700",
  "Vàng Nhạt":         "#F5E6A3",
  "Vàng Hồng":         "#E8C0A8",
  "Vàng Cát":          "#D4B896",
  "Vàng Hành Tinh":    "#D4A043",
  "Vàng Gold":         "#C9A84C",
  "Kem":               "#FFF8DC",
};

/**
 * Returns a CSS color for a given color name.
 * Falls back to a neutral gray if no match found.
 */
export function getColorHex(name: string): string {
  return COLOR_MAP[name] ?? "#A0A0A8";
}

/**
 * Returns true if the color is light (white-ish), so a border can be added.
 */
export function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Perceived luminance
  return (r * 299 + g * 587 + b * 114) / 1000 > 200;
}

