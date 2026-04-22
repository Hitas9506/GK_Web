"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

/* ─── Mega-menu data ─────────────────────────────────────── */
interface MegaLink { label: string; href: string; featured?: boolean; desc?: string }
interface MegaColumn { heading: string; links: MegaLink[] }
interface MegaMenu { explore: MegaColumn; buy: MegaColumn; learn: MegaColumn }

/* ─── Brand mega-menu (Điện Thoại) ───────────────────────── */
interface PhoneProduct { name: string; badge?: string; href: string; desc?: string }
interface PhoneBrand {
  key: string; label: string;
  accent: string; logoText: string; logoBg: string;
  products: PhoneProduct[];
  allHref: string; allLabel: string;
}

const PHONE_BRANDS: PhoneBrand[] = [
  {
    key: "apple", label: "Apple",
    accent: "#1A1A1A", logoText: "🍎", logoBg: "#1A1A1A",
    products: [
      { name: "iPhone 17 Pro Max",  badge: "Mới",  href: "/products/5",  desc: "Titanium · A19 Pro" },
      { name: "iPhone 17 Pro",      badge: "Mới",  href: "/products/5",  desc: "Camera Tele 5× Mới" },
      { name: "iPhone 17",          badge: "Mới",  href: "/products/5",  desc: "Thiết kế mỏng nhất" },
      { name: "iPhone 16 Pro Max",  badge: "Hot",  href: "/products/5",  desc: "A18 Pro · 48MP" },
    ],
    allHref: "/products?category=dien-thoai", allLabel: "Tất cả iPhone",
  },
  {
    key: "xiaomi", label: "Xiaomi",
    accent: "#FF6900", logoText: "Mi", logoBg: "#FF6900",
    products: [
      { name: "Xiaomi 17 Ultra",    badge: "Mới",  href: "/products/1",  desc: "Leica UltraPure · SD 8 Elite" },
      { name: "Xiaomi 17",          badge: "Mới",  href: "/products/1",  desc: "Snapdragon 8 Gen 4" },
      { name: "Xiaomi 15T Pro",     badge: "Hot",  href: "/products/1",  desc: "Leica · 68W Charging" },
      { name: "Redmi Note 14 Pro+", badge: "",     href: "/products/7",  desc: "200MP · 90W Turbo" },
    ],
    allHref: "/products?category=dien-thoai", allLabel: "Tất cả Xiaomi",
  },
  {
    key: "samsung", label: "Samsung",
    accent: "#1428A0", logoText: "S", logoBg: "#1428A0",
    products: [
      { name: "Galaxy S25 Ultra",   badge: "Mới",  href: "/products/4",  desc: "Galaxy AI · 200MP" },
      { name: "Galaxy S25+",        badge: "Mới",  href: "/products/4",  desc: "Snapdragon 8 Elite" },
      { name: "Galaxy Z Fold 6",    badge: "Hot",  href: "/products/4",  desc: "Gập · S Pen tích hợp" },
      { name: "Galaxy A56",         badge: "",     href: "/products/4",  desc: "50MP · 5000mAh" },
    ],
    allHref: "/products?category=dien-thoai", allLabel: "Tất cả Samsung",
  },
];

const TABLET_BRANDS: PhoneBrand[] = [
  {
    key: "apple", label: "Apple",
    accent: "#1A1A1A", logoText: "🍎", logoBg: "#1A1A1A",
    products: [
      { name: "iPad Pro M5",         badge: "Mới",  href: "/products/16", desc: "M5 · OLED Ultra Retina XDR" },
      { name: "iPad Air M4",         badge: "Sale", href: "/products/17", desc: "M4 · Liquid Retina 11\"" },
      { name: "iPad Gen 11",         badge: "Sale", href: "/products/18", desc: "A16 · USB-C · 10.9\"" },
      { name: "iPad Mini A17 Pro",   badge: "Mới",  href: "/products/19", desc: "A17 Pro · 8.3\" ProMotion" },
    ],
    allHref: "/products?category=tablet", allLabel: "Tất cả iPad",
  },
  {
    key: "xiaomi", label: "Xiaomi",
    accent: "#FF6900", logoText: "Mi", logoBg: "#FF6900",
    products: [
      { name: "Xiaomi Pad 8 Pro",    badge: "Mới",  href: "/products/20", desc: "SD 8 Elite · 3K 144Hz" },
      { name: "Xiaomi Pad 8",        badge: "Mới",  href: "/products/21", desc: "Dimensity 9400 · 144Hz" },
      { name: "Xiaomi Pad 7 Pro",    badge: "Sale", href: "/products/22", desc: "SD 8s Gen 4 · 3K OLED" },
      { name: "Xiaomi Pad 7",        badge: "",     href: "/products/23", desc: "SD 7+ Gen 3 · 144Hz" },
    ],
    allHref: "/products?category=tablet", allLabel: "Tất cả Xiaomi Pad",
  },
  {
    key: "samsung", label: "Samsung",
    accent: "#1428A0", logoText: "S", logoBg: "#1428A0",
    products: [
      { name: "Tab S11 Ultra 5G",    badge: "Mới",  href: "/products/24", desc: "SD 8 Elite · 14.6\" AMOLED" },
      { name: "Tab S11 5G",          badge: "Mới",  href: "/products/25", desc: "SD 8 Elite · 11\" AMOLED" },
      { name: "Tab S10 Ultra 5G",    badge: "Sale", href: "/products/26", desc: "SD 8 Gen 3 · 14.6\" AMOLED" },
      { name: "Tab S10 Plus 5G",     badge: "Sale", href: "/products/27", desc: "SD 8 Gen 3 · 12.4\" AMOLED" },
    ],
    allHref: "/products?category=tablet", allLabel: "Tất cả Galaxy Tab",
  },
];

const HEADPHONE_BRANDS: PhoneBrand[] = [
  {
    key: "apple", label: "Apple",
    accent: "#1A1A1A", logoText: "🍎", logoBg: "#1A1A1A",
    products: [
      { name: "AirPods Pro 3",       badge: "Mới",  href: "/products?category=tai-nghe", desc: "ANC · H3 chip · Spatial Audio" },
      { name: "AirPods 4 (ANC)",     badge: "Mới",  href: "/products?category=tai-nghe", desc: "Chống ồn chủ động" },
      { name: "AirPods 4",           badge: "",     href: "/products?category=tai-nghe", desc: "H2 chip · Open-Ear" },
      { name: "AirPods Max 2024",    badge: "Hot",  href: "/products?category=tai-nghe", desc: "USB-C · Hi-Res Audio" },
    ],
    allHref: "/products?category=tai-nghe", allLabel: "Tất cả AirPods",
  },
  {
    key: "xiaomi", label: "Xiaomi",
    accent: "#FF6900", logoText: "Mi", logoBg: "#FF6900",
    products: [
      { name: "Xiaomi Buds 5 Pro",   badge: "Mới",  href: "/products?category=tai-nghe", desc: "ANC 55dB · LDAC · 36h" },
      { name: "Xiaomi Buds 5",       badge: "Mới",  href: "/products?category=tai-nghe", desc: "ANC · Spatial Audio · 42h" },
      { name: "Redmi Buds 6 Pro",    badge: "",     href: "/products?category=tai-nghe", desc: "ANC · Hi-Res · IP54" },
      { name: "Redmi Buds 6 Active", badge: "",     href: "/products?category=tai-nghe", desc: "IP54 · 32h tổng pin" },
    ],
    allHref: "/products?category=tai-nghe", allLabel: "Tất cả Xiaomi Buds",
  },
  {
    key: "samsung", label: "Samsung",
    accent: "#1428A0", logoText: "S", logoBg: "#1428A0",
    products: [
      { name: "Galaxy Buds 3 Pro",   badge: "Mới",  href: "/products?category=tai-nghe", desc: "ANC · Hi-Fi 24bit · IPX7" },
      { name: "Galaxy Buds 3",       badge: "Mới",  href: "/products?category=tai-nghe", desc: "Blade Antenna · ANC" },
      { name: "Galaxy Buds 2 Pro",   badge: "Sale", href: "/products?category=tai-nghe", desc: "Hi-Res · IPX7 · 29h" },
      { name: "Galaxy Buds FE",      badge: "Sale", href: "/products?category=tai-nghe", desc: "ANC · 30h · IP54" },
    ],
    allHref: "/products?category=tai-nghe", allLabel: "Tất cả Galaxy Buds",
  },
];

const ACCESSORY_BRANDS: PhoneBrand[] = [
  {
    key: "apple", label: "Apple",
    accent: "#1A1A1A", logoText: "🍎", logoBg: "#1A1A1A",
    products: [
      { name: "Apple Watch Series 10",  badge: "Mới",  href: "/products?category=phu-kien", desc: "Mỏng nhất · watchOS 11" },
      { name: "Apple Watch Ultra 2",    badge: "Hot",  href: "/products?category=phu-kien", desc: "Titanium · Pin 60h" },
      { name: "MagSafe Charger 25W",    badge: "Mới",  href: "/products?category=phu-kien", desc: "Sạc không dây 25W" },
      { name: "Apple Pencil Pro",       badge: "",     href: "/products?category=phu-kien", desc: "Find My · Haptic feedback" },
    ],
    allHref: "/products?category=phu-kien", allLabel: "Tất cả Phụ Kiện Apple",
  },
  {
    key: "xiaomi", label: "Xiaomi",
    accent: "#FF6900", logoText: "Mi", logoBg: "#FF6900",
    products: [
      { name: "Xiaomi Watch S4",         badge: "Mới",  href: "/products?category=phu-kien", desc: "AMOLED · GPS · 17 ngày pin" },
      { name: "Xiaomi Smart Band 9 Pro", badge: "Mới",  href: "/products?category=phu-kien", desc: "AMOLED · Sức khỏe 24/7" },
      { name: "Sạc GaN 120W",            badge: "Hot",  href: "/products?category=phu-kien", desc: "3 cổng · Nhỏ gọn 65g" },
      { name: "Pin Dự Phòng 20000mAh",   badge: "",     href: "/products?category=phu-kien", desc: "50W · 3 cổng sạc" },
    ],
    allHref: "/products?category=phu-kien", allLabel: "Tất cả Phụ Kiện Xiaomi",
  },
  {
    key: "samsung", label: "Samsung",
    accent: "#1428A0", logoText: "S", logoBg: "#1428A0",
    products: [
      { name: "Galaxy Watch 7",         badge: "Mới",  href: "/products?category=phu-kien", desc: "Exynos W1000 · BioActive 3" },
      { name: "Galaxy Ring",            badge: "Hot",  href: "/products?category=phu-kien", desc: "Theo dõi sức khỏe 24/7" },
      { name: "Galaxy Watch FE",        badge: "Sale", href: "/products?category=phu-kien", desc: "BioActive Sensor · 40mm" },
      { name: "S Pen Fold Edition",     badge: "",     href: "/products?category=phu-kien", desc: "Dành cho Galaxy Z Fold" },
    ],
    allHref: "/products?category=phu-kien", allLabel: "Tất cả Phụ Kiện Samsung",
  },
];

const BRAND_MENUS: Record<string, PhoneBrand[]> = {
  "dien-thoai": PHONE_BRANDS,
  "tablet":     TABLET_BRANDS,
  "tai-nghe":   HEADPHONE_BRANDS,
  "phu-kien":   ACCESSORY_BRANDS,
};

/* Categories whose right panel shows text links instead of image cards */
const TEXT_MODE_MENUS = new Set(["phu-kien"]);

const SIMPLE_MENUS: Record<string, { icon: string; label: string; desc: string; href: string }[]> = {
  "ho-tro": [
    { icon: "✅", label: "Hàng Chính Hãng & Hóa Đơn VAT", desc: "Cam kết 100% hàng chính hãng",      href: "/products" },
    { icon: "🚚", label: "Giao Nhanh · Miễn Phí trên 300k",    desc: "Giao trong 2h tại TP.HCM & Hà Nội", href: "/products" },
    { icon: "🎧", label: "Hỗ Trợ Kỹ Thuật 24/7",             desc: "Liên hệ tư vấn viên ngay lập tức",  href: "/lien-he" },
    { icon: "🏆", label: "Bảo Hành 12 Tháng Chính Hãng",     desc: "Bảo hành toàn quốc, đổi mới dễ dàng",href: "/chinh-sach-doi-tra" },
    { icon: "📦", label: "Theo Dõi Đơn Hàng",               desc: "Kiểm tra trạng thái giao hàng",      href: "/orders" },
  ],
  // Reserved for future lightweight dropdowns
};

const MEGA: Record<string, MegaMenu> = {
  tablet: {
    explore: {
      heading: "Khám Phá Máy Tính Bảng",
      links: [
        { label: "Tất Cả Tablet",              href: "/products?category=tablet", featured: true },
        { label: "Xiaomi Pad 8 Pro",           href: "/products/11" },
        { label: "iPad Air M3",                href: "/products/12" },
        { label: "Samsung Galaxy Tab S10 FE",  href: "/products/13" },
        { label: "Redmi Pad SE 8.7",           href: "/products/14" },
      ],
    },
    buy: {
      heading: "Mua Tablet",
      links: [
        { label: "Cửa Hàng Online",      href: "/products?category=tablet" },
        { label: "Trả Góp 0% Lãi Suất", href: "/products?category=tablet" },
      ],
    },
    learn: {
      heading: "Tìm Hiểu Thêm",
      links: [
        { label: "So Sánh Tablet",        href: "/products?category=tablet" },
        { label: "Bút Cảm Ứng & Bàn Phím", href: "/products?category=phu-kien" },
        { label: "Tư Vấn Chọn Máy",       href: "/lien-he" },
      ],
    },
  },
  "tai-nghe": {
    explore: {
      heading: "Khám Phá Tai Nghe",
      links: [
        { label: "Tất Cả Tai Nghe",        href: "/products?category=tai-nghe", featured: true },
        { label: "AirPods Pro 3",           href: "/products/16" },
        { label: "Xiaomi Buds 5 Pro",       href: "/products/17" },
        { label: "Samsung Galaxy Buds 3 Pro", href: "/products/18" },
        { label: "Redmi Buds 8 Active",     href: "/products/15" },
      ],
    },
    buy: {
      heading: "Mua Tai Nghe",
      links: [
        { label: "Cửa Hàng Online", href: "/products?category=tai-nghe" },
        { label: "Trả Góp 0%",      href: "/products?category=tai-nghe" },
      ],
    },
    learn: {
      heading: "Tìm Hiểu Thêm",
      links: [
        { label: "Chống Ồn Chủ Động (ANC)", href: "/products?category=tai-nghe" },
        { label: "Hi-Res Audio",             href: "/products?category=tai-nghe" },
        { label: "Bảo Hành Tai Nghe",        href: "/chinh-sach-doi-tra" },
      ],
    },
  },
  "phu-kien": {
    explore: {
      heading: "Khám Phá Phụ Kiện",
      links: [
        { label: "Tất Cả Phụ Kiện",          href: "/products?category=phu-kien", featured: true },
        { label: "Xiaomi Smart Band 9 Pro",   href: "/products/19" },
        { label: "Xiaomi Watch S4",           href: "/products/20" },
        { label: "Sạc Nhanh 120W GaN",        href: "/products/21" },
        { label: "Pin Dự Phòng 20000mAh",    href: "/products/24" },
      ],
    },
    buy: {
      heading: "Mua Phụ Kiện",
      links: [
        { label: "Cửa Hàng Online", href: "/products?category=phu-kien" },
        { label: "Combo Tiết Kiệm", href: "/products?category=phu-kien" },
      ],
    },
    learn: {
      heading: "Tìm Hiểu Thêm",
      links: [
        { label: "Đồng Hồ Thông Minh",  href: "/products?category=phu-kien" },
        { label: "Sạc Nhanh GaN",        href: "/products?category=phu-kien" },
        { label: "Bảo Hành Phụ Kiện",    href: "/chinh-sach-doi-tra" },
      ],
    },
  },
  "cua-hang": {
    explore: {
      heading: "Mua Sắm",
      links: [
        { label: "Khám Phá Sản Phẩm Mới Nhất", href: "/products",                        featured: true },
        { label: "Điện Thoại",                  href: "/products?category=dien-thoai" },
        { label: "Máy Tính Bảng",               href: "/products?category=tablet" },
        { label: "Phụ Kiện Công Nghệ",          href: "/products?category=phu-kien" },
        { label: "Hàng Cũ / Like New",          href: "/products" },
      ],
    },
    buy: {
      heading: "Thông Tin & Dịch Vụ",
      links: [
        { label: "Giới Thiệu TechNext",    href: "/about", featured: true,
          desc: "Thành lập 2020 tại TP.HCM · Đại lý chính hãng Apple, Samsung, Xiaomi · Hơn 10,000 khách hàng tin tưởng." },
        { label: "Theo Dõi Đơn Hàng",     href: "/orders" },
        { label: "Chính Sách Bảo Hành",   href: "/chinh-sach-doi-tra" },
        { label: "Chương Trình Thu Cũ",   href: "/products" },
        { label: "Hướng Dẫn Trả Góp",    href: "/products" },
      ],
    },
    learn: {
      heading: "Ưu Đãi & Cộng Đồng",
      links: [
        { label: "Ưu Đãi Sinh Viên",       href: "/products" },
        { label: "Flash Sale 🔥",          href: "/products" },
        { label: "Tin Công Nghệ / Blog",  href: "/about" },
      ],
    },
  },
};

/* ─── Nav items ──────────────────────────────────────────── */
const NAV_ITEMS = [
  { href: "/",                              label: "Trang Chủ" },
  { href: "/products",                      label: "Cửa Hàng", menuKey: "cua-hang" },
  { href: "/products?category=dien-thoai", label: "Điện Thoại", menuKey: "dien-thoai" },
  { href: "/products?category=tablet",     label: "Tablet",     menuKey: "tablet" },
  { href: "/products?category=tai-nghe",   label: "Tai Nghe",   menuKey: "tai-nghe" },
  { href: "/products?category=phu-kien",   label: "Phụ Kiện",   menuKey: "phu-kien" },
  { href: "/orders",                        label: "Đơn Hàng" },
  { href: "/about",                         label: "Giới Thiệu" },
  { href: "/lien-he",                       label: "Hỗ Trợ",     menuKey: "ho-tro" },
];

/* ─── Component ──────────────────────────────────────────── */
export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const router = useRouter();

  const [scrolled,      setScrolled]      = useState(false);
  const [mounted,       setMounted]       = useState(false);
  const [openMenu,      setOpenMenu]      = useState<string | null>(null);
  const [activeBrand,   setActiveBrand]   = useState<string>("apple");
  const [userMenuOpen,  setUserMenuOpen]  = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) { router.push(`/search?q=${encodeURIComponent(q)}`); setSearchQuery(""); }
  };

  const navRef     = useRef<HTMLElement>(null);
  const userRef    = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close user dropdown on outside click */
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  /* Close mega menu on outside click */
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setOpenMenu(null);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const openMega  = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
    if (BRAND_MENUS[key]) setActiveBrand("apple");
  };
  const delayClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  /* hasMega = true for brand-tab menus AND 3-col mega menus */
  const hasMega = !!openMenu && (!!BRAND_MENUS[openMenu] || !!MEGA[openMenu]);

  return (
    <header
      ref={navRef}
      style={{ position: "fixed", top: "48px", left: 0, right: 0, zIndex: 100 }}
    >
      {/* ── TOP BAR ── */}
      <div
        style={{
          background: hasMega
            ? "rgba(251,251,253,0.97)"
            : scrolled
            ? "rgba(255,255,255,0.95)"
            : "rgba(255,255,255,0.82)",
          backdropFilter:       "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: hasMega
            ? "1px solid rgba(0,0,0,0.08)"
            : scrolled
            ? "1px solid rgba(0,0,0,0.10)"
            : "1px solid transparent",
          boxShadow: scrolled && !hasMega ? "0 1px 0 rgba(0,0,0,0.05)" : "none",
          transition: "background 0.25s, box-shadow 0.25s",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 1.25rem",
            height: "44px",
            display: "flex",
            alignItems: "center",
            gap: "0.1rem",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ textDecoration: "none", flexShrink: 0, marginRight: "1.25rem" }}
          >
            <span
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#1A1A1A",
                letterSpacing: "-0.03em",
              }}
            >
              Tech<span style={{ color: "#FF6700" }}>Next</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="tn-nav"
            style={{ display: "flex", alignItems: "center", flex: 1 }}
          >
            {NAV_ITEMS.map((item) => {
              const dimmed = hasMega && openMenu !== item.menuKey;
              return (
                <div
                  key={item.href + item.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() =>
                    item.menuKey ? openMega(item.menuKey) : setOpenMenu(null)
                  }
                  onMouseLeave={item.menuKey ? delayClose : undefined}
                >
                  <Link
                    href={item.href}
                    style={{
                      display: "block",
                      padding: "0 0.72rem",
                      height: "44px",
                      lineHeight: "44px",
                      textDecoration: "none",
                      color: dimmed ? "rgba(0,0,0,0.35)" : "#1A1A1A",
                      fontSize: "0.8rem",
                      fontWeight: 400,
                      letterSpacing: "0.005em",
                      whiteSpace: "nowrap",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!item.menuKey)
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "#FF6700";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        dimmed ? "rgba(0,0,0,0.35)" : "#1A1A1A";
                    }}
                  >
                    {item.label}
                  </Link>

                  {/* Simple dropdown for Hỗ Trợ */}
                  {item.menuKey && SIMPLE_MENUS[item.menuKey] && openMenu === item.menuKey && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 2px)", left: "50%",
                      transform: "translateX(-50%)",
                      background: "white",
                      border: "1px solid rgba(0,0,0,0.09)",
                      borderRadius: "14px",
                      boxShadow: "0 12px 36px rgba(0,0,0,0.12)",
                      minWidth: "300px",
                      zIndex: 200,
                      overflow: "hidden",
                      animation: "megaSlideDown 0.18s ease both",
                    }}>
                      {SIMPLE_MENUS[item.menuKey].map(link => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          onClick={() => setOpenMenu(null)}
                          style={{
                            display: "flex", alignItems: "center", gap: "0.75rem",
                            padding: "0.7rem 1.1rem",
                            textDecoration: "none",
                            transition: "background 0.13s",
                            borderBottom: "1px solid rgba(0,0,0,0.04)",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f7")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                        >
                          {link.icon && (
                            <span style={{ fontSize: "1.1rem", flexShrink: 0, width: "22px", textAlign: "center" }}>
                              {link.icon}
                            </span>
                          )}
                          <div>
                            <p style={{ margin: 0, fontSize: "0.83rem", fontWeight: 600, color: "#1A1A1A", lineHeight: 1.3 }}>
                              {link.label}
                            </p>
                            {link.desc && (
                              <p style={{ margin: "0.1rem 0 0", fontSize: "0.7rem", color: "#999", lineHeight: 1.3 }}>
                                {link.desc}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right icons */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.1rem", marginLeft: "auto" }}
          >
            {/* ── Inline Search Bar ── */}
            <form
              onSubmit={handleSearch}
              style={{
                display: "flex",
                alignItems: "center",
                background: searchFocused ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.05)",
                borderRadius: "20px",
                border: `1.5px solid ${searchFocused ? "rgba(0,0,0,0.22)" : "transparent"}`,
                padding: "0 0.5rem 0 0.85rem",
                height: "32px",
                width: searchFocused ? "220px" : "170px",
                transition: "width 0.25s ease, border-color 0.2s, background 0.2s",
                marginRight: "0.35rem",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "0.8rem", color: "#888", flexShrink: 0, lineHeight: 1 }}>🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Tìm kiếm sản phẩm..."
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  fontSize: "0.78rem",
                  color: "#1A1A1A",
                  flex: 1,
                  padding: "0 0.4rem",
                  fontFamily: "inherit",
                  minWidth: 0,
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    border: "none", background: "transparent", cursor: "pointer",
                    color: "#aaa", fontSize: "0.75rem", padding: "0 0.2rem",
                    lineHeight: 1, flexShrink: 0,
                  }}
                  aria-label="Xóa"
                >✕</button>
              )}
            </form>

            {/* Cart */}
            <Link
              href="/cart"
              title="Giỏ hàng"
              style={{
                position: "relative",
                width: "34px", height: "34px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none", color: "#1A1A1A", fontSize: "0.95rem",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              🛒
              {mounted && totalItems > 0 && (
                <span
                  style={{
                    position: "absolute", top: "-1px", right: "-1px",
                    background: "#FF6700", color: "white",
                    borderRadius: "50%", width: "15px", height: "15px",
                    fontSize: "0.58rem", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* ── User icon (hover dropdown) ── */}
            <div
              ref={userRef}
              style={{ position: "relative" }}
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              {/* Person icon button — always the same shape */}
              <button
                title={user ? user.name : "Tài khoản"}
                style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  border: user ? "2px solid #FF6700" : "1.5px solid rgba(0,0,0,0.25)",
                  background: user ? "rgba(255,103,0,0.08)" : "rgba(0,0,0,0.04)",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: user ? "1rem" : "1.05rem",
                  transition: "border-color 0.2s, background 0.2s",
                }}
              >
                {user ? user.avatar : (
                  /* SVG person silhouette */
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ color: "#1A1A1A" }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                )}
              </button>

              {/* Dropdown panel */}
              {userMenuOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 6px)",
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.09)",
                  borderRadius: "16px",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.13)",
                  minWidth: "210px", zIndex: 200, overflow: "hidden",
                  animation: "megaSlideDown 0.18s ease both",
                }}>

                  {user ? (
                    /* ── LOGGED IN ── */
                    <>
                      {/* Header: avatar + name + email */}
                      <div style={{
                        display: "flex", alignItems: "center", gap: "0.75rem",
                        padding: "1rem 1.1rem",
                        borderBottom: "1px solid rgba(0,0,0,0.07)",
                        background: "rgba(255,103,0,0.04)",
                      }}>
                        <div style={{
                          width: "38px", height: "38px", borderRadius: "50%",
                          border: "2px solid #FF6700",
                          background: "rgba(255,103,0,0.1)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "1.15rem", flexShrink: 0,
                        }}>
                          {user.avatar}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontWeight: 700, fontSize: "0.88rem", margin: 0,
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {user.name}
                          </p>
                          <p style={{ fontSize: "0.72rem", color: "#888",
                            margin: "0.12rem 0 0",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Menu items */}
                      {[
                        { href: "/profile", icon: "👤", label: "Thông tin cá nhân" },
                        { href: "/orders",  icon: "📦", label: "Đơn hàng của tôi"  },
                      ].map(l => (
                        <Link
                          key={l.href}
                          href={l.href}
                          onClick={() => setUserMenuOpen(false)}
                          style={{
                            display: "flex", alignItems: "center", gap: "0.65rem",
                            padding: "0.75rem 1.1rem",
                            textDecoration: "none", color: "#1A1A1A",
                            fontSize: "0.86rem", fontWeight: 500,
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f7")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                        >
                          <span style={{ fontSize: "1rem", width: "20px", textAlign: "center" }}>{l.icon}</span>
                          {l.label}
                        </Link>
                      ))}

                      {/* Logout */}
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        style={{
                          width: "100%", padding: "0.75rem 1.1rem",
                          border: "none", background: "transparent",
                          cursor: "pointer", textAlign: "left",
                          color: "#ff4757", fontSize: "0.86rem", fontWeight: 600,
                          borderTop: "1px solid rgba(0,0,0,0.07)",
                          fontFamily: "inherit",
                          display: "flex", alignItems: "center", gap: "0.65rem",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#fff5f5")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        <span style={{ fontSize: "1rem", width: "20px", textAlign: "center" }}>🚪</span>
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    /* ── NOT LOGGED IN ── */
                    <>
                      <div style={{ padding: "1rem 1.1rem 0.75rem",
                        borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                        <p style={{ fontSize: "0.78rem", color: "#888", margin: 0 }}>
                          Đăng nhập để xem đơn hàng & ưu đãi dành riêng cho bạn.
                        </p>
                      </div>

                      <Link
                        href="/login"
                        onClick={() => setUserMenuOpen(false)}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.65rem",
                          padding: "0.82rem 1.1rem",
                          textDecoration: "none", color: "#1A1A1A",
                          fontSize: "0.88rem", fontWeight: 600,
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f7")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        <span style={{ fontSize: "1rem", width: "20px", textAlign: "center" }}>🔑</span>
                        Đăng nhập
                      </Link>

                      <Link
                        href="/register"
                        onClick={() => setUserMenuOpen(false)}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.65rem",
                          padding: "0.82rem 1.1rem",
                          textDecoration: "none", color: "#FF6700",
                          fontSize: "0.88rem", fontWeight: 600,
                          borderTop: "1px solid rgba(0,0,0,0.07)",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#fff8f5")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        <span style={{ fontSize: "1rem", width: "20px", textAlign: "center" }}>✏️</span>
                        Đăng ký
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="tn-mobile-toggle"
              aria-label="Menu"
              style={{
                width: "34px", height: "34px", borderRadius: "8px",
                border: "none", background: "transparent",
                cursor: "pointer", fontSize: "1.1rem",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* ── MEGA MENU PANEL ── */}
      {hasMega && (
        <div
          onMouseEnter={() => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
          }}
          onMouseLeave={delayClose}
          style={{
            background: "rgba(251,251,253,0.97)",
            backdropFilter:       "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(0,0,0,0.10)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.07)",
            animation: "megaSlideDown 0.22s cubic-bezier(0.25,0.46,0.45,0.94) both",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.25rem" }}>

            {/* ── BRAND-TAB LAYOUT (Điện Thoại / Tablet / Tai Nghe / Phụ Kiện) ── */}
            {BRAND_MENUS[openMenu!] ? (() => {
              const brands = BRAND_MENUS[openMenu!];
              const brand = brands.find(b => b.key === activeBrand) ?? brands[0];
              const catIcon = openMenu === "tablet" ? "📲" : openMenu === "tai-nghe" ? "🎧" : openMenu === "phu-kien" ? "⌚" : "📱";
              const placeholderBg: Record<string, string> = {
                apple:   "linear-gradient(135deg,#2c2c2e 0%,#1c1c1e 100%)",
                xiaomi:  "linear-gradient(135deg,#1a0d00 0%,#3d1a00 100%)",
                samsung: "linear-gradient(135deg,#08122a 0%,#1428A0 100%)",
              };
              return (
                <div style={{ display: "flex", gap: 0 }}>

                  {/* Left: brand tabs */}
                  <div style={{
                    width: "160px",
                    flexShrink: 0,
                    borderRight: "1px solid rgba(0,0,0,0.07)",
                    padding: "1.5rem 0",
                  }}>
                    <p style={{
                      fontSize: "0.62rem", fontWeight: 700,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: "#aaa", padding: "0 1.2rem", marginBottom: "0.9rem",
                    }}>Thương hiệu</p>

                    {brands.map(b => (
                      <div
                        key={b.key}
                        onMouseEnter={() => setActiveBrand(b.key)}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.75rem",
                          padding: "0.7rem 1.2rem",
                          cursor: "pointer",
                          background: activeBrand === b.key ? "rgba(0,0,0,0.04)" : "transparent",
                          borderLeft: activeBrand === b.key ? `3px solid ${b.accent}` : "3px solid transparent",
                          transition: "background 0.15s, border-color 0.15s",
                        }}
                      >
                        {/* Logo pill */}
                        <div style={{
                          width: "34px", height: "34px",
                          background: b.logoBg,
                          borderRadius: "8px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                          fontSize: b.key === "apple" ? "1.1rem" : "0.72rem",
                          fontWeight: 900,
                          color: "white",
                          letterSpacing: b.key === "samsung" ? "0.02em" : undefined,
                          boxShadow: activeBrand === b.key ? `0 3px 12px ${b.accent}55` : "none",
                          transition: "box-shadow 0.2s",
                        }}>
                          {b.logoText}
                        </div>
                        <span style={{
                          fontSize: "0.88rem",
                          fontWeight: activeBrand === b.key ? 700 : 500,
                          color: activeBrand === b.key ? b.accent : "#1A1A1A",
                          transition: "color 0.15s, font-weight 0.15s",
                        }}>{b.label}</span>
                      </div>
                    ))}

                    {/* Browse all link */}
                    <div style={{ padding: "1rem 1.2rem 0" }}>
                      <Link
                        href={brand.allHref}
                        onClick={() => setOpenMenu(null)}
                        style={{
                          fontSize: "0.76rem", color: brand.accent,
                          textDecoration: "none", fontWeight: 600,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                        onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                      >
                        {brand.allLabel} →
                      </Link>
                    </div>
                  </div>

                  {/* Right: text list or image cards depending on mode */}
                  {TEXT_MODE_MENUS.has(openMenu!) ? (

                    /* ── TEXT LIST MODE (Phụ Kiện) ── */
                    <div style={{
                      flex: 1,
                      padding: "1.5rem 1.5rem 1.5rem 2rem",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.25rem 1.5rem",
                      alignContent: "start",
                    }}>
                      {brand.products.map(p => (
                        <Link
                          key={p.name}
                          href={p.href}
                          onClick={() => setOpenMenu(null)}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <div
                            style={{
                              display: "flex", alignItems: "center", gap: "0.55rem",
                              padding: "0.55rem 0.75rem",
                              borderRadius: "10px",
                              cursor: "pointer",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
                            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                          >
                            {p.badge && (
                              <span style={{
                                flexShrink: 0,
                                background: brand.accent, color: "white",
                                fontSize: "0.58rem", fontWeight: 700,
                                padding: "0.12rem 0.42rem", borderRadius: "20px",
                              }}>{p.badge}</span>
                            )}
                            <div>
                              <p style={{
                                fontSize: "0.84rem", fontWeight: 600,
                                color: "#1A1A1A", margin: 0, lineHeight: 1.3,
                              }}>{p.name}</p>
                              {p.desc && (
                                <p style={{
                                  fontSize: "0.68rem", color: "#999",
                                  margin: "0.08rem 0 0", lineHeight: 1.3,
                                }}>{p.desc}</p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div style={{
                        gridColumn: "1 / -1",
                        marginTop: "0.75rem", paddingTop: "0.75rem",
                        borderTop: "1px solid rgba(0,0,0,0.06)",
                      }}>
                        <Link
                          href={brand.allHref}
                          onClick={() => setOpenMenu(null)}
                          style={{ fontSize: "0.76rem", color: brand.accent, textDecoration: "none", fontWeight: 600 }}
                          onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                          onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                        >{brand.allLabel} →</Link>
                      </div>
                    </div>

                  ) : (

                    /* ── IMAGE CARD MODE (Điện Thoại / Tablet / Tai Nghe) ── */
                    <div style={{
                      flex: 1,
                      padding: "1.5rem 1.5rem 1.5rem 2rem",
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "1rem",
                    }}>
                      {brand.products.map(p => (
                        <Link
                          key={p.name}
                          href={p.href}
                          onClick={() => setOpenMenu(null)}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <div
                            style={{
                              borderRadius: "14px",
                              border: "1px solid rgba(0,0,0,0.07)",
                              overflow: "hidden",
                              background: "white",
                              transition: "box-shadow 0.2s, transform 0.2s",
                              cursor: "pointer",
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.12)";
                              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                            }}
                          >
                            <div style={{
                              position: "relative",
                              width: "100%",
                              aspectRatio: "1 / 1",
                              background: placeholderBg[brand.key],
                              display: "flex", flexDirection: "column",
                              alignItems: "center", justifyContent: "center",
                              gap: "0.4rem",
                            }}>
                              {/* Badge */}
                              {p.badge && (
                                <span style={{
                                  position: "absolute", top: "8px", left: "8px",
                                  background: brand.accent, color: "white",
                                  fontSize: "0.6rem", fontWeight: 700,
                                  padding: "0.18rem 0.5rem",
                                  borderRadius: "30px",
                                }}>{p.badge}</span>
                              )}
                              <span style={{ fontSize: "2rem" }}>{catIcon}</span>
                              <span style={{
                                color: "rgba(255,255,255,0.4)",
                                fontSize: "0.62rem",
                                textAlign: "center",
                                padding: "0 0.5rem",
                                lineHeight: 1.3,
                              }}>[Ảnh sản phẩm]</span>
                            </div>
                            <div style={{ padding: "0.7rem 0.75rem 0.85rem" }}>
                              <p style={{
                                fontSize: "0.8rem", fontWeight: 600,
                                color: "#1A1A1A", margin: 0, lineHeight: 1.3,
                              }}>{p.name}</p>
                              {p.desc && (
                                <p style={{
                                  fontSize: "0.68rem", color: "#888",
                                  margin: "0.2rem 0 0", lineHeight: 1.3,
                                }}>{p.desc}</p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                </div>
              );
            })() : (

              /* ── 3-COL MEGA LAYOUT (Cửa Hàng) ── */
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "3rem",
                padding: "2rem 0 2.75rem",
              }}>

                {/* ── About TechNext banner (spans full width) ── */}
                <Link
                  href="/about"
                  onClick={() => setOpenMenu(null)}
                  style={{
                    gridColumn: "1 / -1",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "linear-gradient(135deg, #1A1A1A 0%, #2d2d2d 100%)",
                    borderRadius: "16px",
                    padding: "1.1rem 1.6rem",
                    marginBottom: "0.5rem",
                    gap: "2rem",
                    textDecoration: "none",
                  }}
                >
                  {/* Left: brand + tagline */}
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 0.2rem", fontWeight: 900, fontSize: "1.05rem", color: "white", letterSpacing: "-0.02em" }}>
                      Tech<span style={{ color: "#FF6700" }}>Next</span>
                    </p>
                    <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", fontWeight: 400, lineHeight: 1.4 }}>
                      Địa chỉ tin cậy mua sắm công nghệ chính hãng tại Việt Nam
                    </p>
                  </div>
                  {/* Right: 3 trust stats */}
                  <div style={{ display: "flex", gap: "2rem", flexShrink: 0 }}>
                    {[
                      { val: "100%", label: "Hàng Chính Hãng" },
                      { val: "10K+", label: "Khách Hàng" },
                      { val: "24/7", label: "Hỗ Trợ" },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign: "center" }}>
                        <p style={{ margin: "0 0 0.1rem", fontWeight: 800, fontSize: "1rem", color: "#FF6700" }}>{s.val}</p>
                        <p style={{ margin: 0, fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                  {/* Về Chúng Tôi pill */}
                  <span style={{
                    flexShrink: 0,
                    display: "inline-flex", alignItems: "center",
                    padding: "0.45rem 1rem",
                    background: "rgba(255,103,0,0.18)",
                    border: "1px solid rgba(255,103,0,0.45)",
                    borderRadius: "999px",
                    color: "#FF6700",
                    fontSize: "0.76rem", fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}>
                    Về Chúng Tôi →
                  </span>
                </Link>
                {(["explore", "buy", "learn"] as const).map(col => {
                  const data = MEGA[openMenu!][col];
                  return (
                    <div key={col}>
                      <p style={{
                        fontSize: "0.62rem", color: "#FF6700", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        margin: "0 0 1rem",
                      }}>{data.heading}</p>
                      {data.links.map(link => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          onClick={() => setOpenMenu(null)}
                          style={{
                            display: "block", textDecoration: "none",
                            color: "#1A1A1A",
                            fontSize: link.featured ? "1.1rem" : "0.88rem",
                            fontWeight: link.featured ? 800 : 400,
                            lineHeight: 1.6,
                            padding: link.featured ? "0.1rem 0 0.6rem" : "0.28rem 0",
                            borderBottom: link.featured ? "1px solid rgba(0,0,0,0.07)" : "none",
                            marginBottom: link.featured ? "0.5rem" : "0",
                            transition: "color 0.15s",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#FF6700")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#1A1A1A")}
                        >
                          {link.label}
                          {link.featured && link.desc && (
                            <p style={{
                              margin: "0.3rem 0 0",
                              fontSize: "0.78rem",
                              color: "#888",
                              fontWeight: 400,
                              lineHeight: 1.6,
                            }}>{link.desc}</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div
          style={{
            background: "white",
            borderTop: "1px solid var(--color-border)",
            padding: "1rem 1.25rem",
            animation: "megaSlideDown 0.2s ease both",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href + item.label + "-mob"}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "0.72rem 0",
                textDecoration: "none",
                color: "var(--color-text)",
                fontWeight: 500,
                borderBottom: "1px solid var(--color-border)",
                fontSize: "0.92rem",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        /* Desktop nav visible, mobile toggle hidden */
        @media (min-width: 768px) {
          .tn-nav { display: flex !important; }
          .tn-mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .tn-nav { display: none !important; }
          .tn-mobile-toggle { display: flex !important; }
        }
        @keyframes megaSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
