export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function calculateDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

// Bug 9 fix: normalize Vietnamese Unicode before stripping non-ASCII chars
export function slugify(text: string): string {
  return text
    .normalize("NFD")                // decompose accented chars: á → a + ́
    .replace(/[\u0300-\u036f]/g, "") // strip combining diacritics
    .replace(/đ/gi, "d")            // handle Vietnamese đ separately
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
