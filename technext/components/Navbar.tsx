"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { searchProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

/* ─── Mega-menu data ─────────────────────────────────────── */
interface MegaLink { label: string; href: string; featured?: boolean; desc?: string; external?: boolean; isPhone?: boolean; brandIcon?: React.ReactNode; socialRow?: boolean; }
interface PhoneProduct { name: string; badge?: string; href: string; desc?: string; image?: string; }
interface MegaColumn { heading: string; links: MegaLink[] }
interface MegaMenu { explore: MegaColumn; buy: MegaColumn; learn: MegaColumn }

/* ─── Brand mega-menu (Điện Thoại) ───────────────────────── */
interface PhoneBrand {
  key: string; label: string;
  accent: string; logoText: string; logoBg: string;
  logoImg?: string;
  products: PhoneProduct[];
  allHref: string; allLabel: string;
}

const PHONE_BRANDS: PhoneBrand[] = [
  {
    key: "apple", label: "Apple",
    accent: "#1A1A1A", logoText: "🍎", logoBg: "#1A1A1A", logoImg: "/APPLE.svg",
    products: [
      { name: "iPhone 17 Pro Max", badge: "Mới", href: "/products/1",  desc: "Titanium · A19 Pro",   image: "/images/products/iphone-17-pro-max/cam_vu_tru.jpg" },
      { name: "iPhone 17 Pro",     badge: "Mới", href: "/products/2",  desc: "Camera Tele 5× Mới",  image: "/images/products/iphone-17-pro/cam_vu_tru.jpg" },
      { name: "iPhone 17",         badge: "Mới", href: "/products/3",  desc: "Thiết kế mỏng nhất", image: "/images/products/iphone-17/xanh_lam_khoi.jpg" },
      { name: "iPhone Air",        badge: "Mới", href: "/products/4",  desc: "Siêu mỏng 5.65mm",    image: "/images/products/iphone-air/trang_may.jpg" },
    ],
    allHref: "/products?category=dien-thoai&brand=apple", allLabel: "Tất cả iPhone",
  },
  {
    key: "xiaomi", label: "Xiaomi",
    accent: "#FF6900", logoText: "Mi", logoBg: "white", logoImg: "/XIAOMI.png",
    products: [
      { name: "Xiaomi 17",       badge: "Mới", href: "/products/6",  desc: "SD 8 Elite Gen 5 · Leica",  image: "/images/products/xiaomi-17/den.png" },
      { name: "Xiaomi 17 Ultra", badge: "Mới", href: "/products/7",  desc: "Leica 200MP · Pin 6000mAh", image: "/images/products/xiaomi-17-ultra/den.png" },
      { name: "Xiaomi 15",       badge: "",     href: "/products/8",  desc: "Leica · SD 8 Elite",         image: "/images/products/xiaomi-15/den.png" },
      { name: "Xiaomi 15 Ultra", badge: "",     href: "/products/9",  desc: "Leica 200MP · 16GB RAM",    image: "/images/products/xiaomi-15-ultra/bac.jpg" },
    ],
    allHref: "/products?category=dien-thoai&brand=xiaomi", allLabel: "Tất cả Xiaomi",
  },
  {
    key: "samsung", label: "Samsung",
    accent: "#1428A0", logoText: "S", logoBg: "#1428A0", logoImg: "/SAMSUNG.svg",
    products: [
      { name: "Galaxy S26 Ultra", badge: "Mới", href: "/products/10", desc: "SD Elite Gen 5 · 200MP",    image: "/images/products/samsung-galaxy-s26-ultra/default_1_1.jpg" },
      { name: "Galaxy S26+",      badge: "Mới", href: "/products/11", desc: "Exynos 2600 · 6.7\"",        image: "/images/products/samsung-galaxy-s26-plus/den_classic.jpg" },
      { name: "Galaxy S26",       badge: "Mới", href: "/products/12", desc: "Exynos 2600 · 6.3\"",        image: "/images/products/samsung-galaxy-s26/bac_shadow.jpg" },
      { name: "Galaxy S25 Ultra", badge: "",     href: "/products/13", desc: "SD 8 Elite · 200MP · S Pen", image: "/images/products/samsung-galaxy-s25-ultra/den_titan.jpg" },
    ],
    allHref: "/products?category=dien-thoai&brand=samsung", allLabel: "Tất cả Samsung",
  },
];

const TABLET_BRANDS: PhoneBrand[] = [
  {
    key: "apple", label: "Apple",
    accent: "#1A1A1A", logoText: "🍎", logoBg: "#1A1A1A", logoImg: "/APPLE.svg",
    products: [
      { name: "iPad Pro M5",       badge: "Mới",  href: "/products/16", desc: "M5 · OLED Ultra Retina XDR",  image: "/images/products/ipad-pro-m5/bac.jpg" },
      { name: "iPad Air M4",       badge: "Mới",  href: "/products/17", desc: "M4 · Liquid Retina 11\"",      image: "/images/products/ipad-air-m4/anh_sao.jpg" },
      { name: "iPad Gen 11",       badge: "",     href: "/products/18", desc: "A16 · USB-C · 11\"",           image: "/images/products/ipad-gen-11/tim.png" },
      { name: "iPad Mini A17 Pro", badge: "Mới",  href: "/products/19", desc: "A17 Pro · 8.3\" ProMotion",    image: "/images/products/ipad-mini-a17-pro/bac.webp" },
    ],
    allHref: "/products?category=tablet&brand=apple", allLabel: "Tất cả iPad",
  },
  {
    key: "xiaomi", label: "Xiaomi",
    accent: "#FF6900", logoText: "Mi", logoBg: "#FF6900", logoImg: "/XIAOMI.png",
    products: [
      { name: "Xiaomi Pad 8 Pro", badge: "Mới",  href: "/products/20", desc: "SD 8 Elite · 3K 144Hz",    image: "/images/products/xiaomi-pad-8-pro/xanh_bien.png" },
      { name: "Xiaomi Pad 8",     badge: "Mới",  href: "/products/21", desc: "SD 8s Gen 4 · 144Hz",       image: "/images/products/xiaomi-pad-8/xanh_duong.png" },
      { name: "Xiaomi Pad 7 Pro", badge: "Sale", href: "/products/22", desc: "SD 8s Gen 3 · 144Hz",       image: "/images/products/xiaomi-pad-7-pro/xanh_duong.png" },
      { name: "Xiaomi Pad 7",     badge: "",     href: "/products/23", desc: "SD 7+ Gen 3 · 144Hz",       image: "/images/products/xiaomi-pad-7/xanh_bien.jpg" },
    ],
    allHref: "/products?category=tablet&brand=xiaomi", allLabel: "Tất cả Xiaomi Pad",
  },
  {
    key: "samsung", label: "Samsung",
    accent: "#1428A0", logoText: "S", logoBg: "#1428A0", logoImg: "/SAMSUNG.svg",
    products: [
      { name: "Tab S11 Ultra 5G", badge: "Mới",  href: "/products/24", desc: "Dimensity 9400+ · 14.6\" AMOLED", image: "/images/products/samsung-tab-s11-ultra-5g/bac.png" },
      { name: "Tab S11 5G",       badge: "Mới",  href: "/products/25", desc: "Dimensity 9400+ · 11\" AMOLED",   image: "/images/products/samsung-tab-s11-5g/bac.png" },
      { name: "Tab S11 Ultra",    badge: "",     href: "/products/24", desc: "S Pen tích hợp · Wi-Fi 7",       image: "/images/products/samsung-tab-s11-ultra-5g/xam.jpg" },
      { name: "Tab S11",          badge: "",     href: "/products/25", desc: "120Hz · 11\" · 8400mAh",        image: "/images/products/samsung-tab-s11-5g/xam.png" },
    ],
    allHref: "/products?category=tablet&brand=samsung", allLabel: "Tất cả Galaxy Tab",
  },
];

const HEADPHONE_BRANDS: PhoneBrand[] = [
  {
    key: "apple", label: "Apple",
    accent: "#1A1A1A", logoText: "🍎", logoBg: "#1A1A1A", logoImg: "/APPLE.svg",
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
    accent: "#FF6900", logoText: "Mi", logoBg: "#FF6900", logoImg: "/XIAOMI.png",
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
    accent: "#1428A0", logoText: "S", logoBg: "#1428A0", logoImg: "/SAMSUNG.svg",
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
    accent: "#1A1A1A", logoText: "🍎", logoBg: "#1A1A1A", logoImg: "/APPLE.svg",
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
    accent: "#FF6900", logoText: "Mi", logoBg: "#FF6900", logoImg: "/XIAOMI.png",
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
    accent: "#1428A0", logoText: "S", logoBg: "#1428A0", logoImg: "/SAMSUNG.svg",
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
};

/* Categories whose right panel shows text links instead of image cards */
const TEXT_MODE_MENUS = new Set<string>([]);

interface SimpleMenuItem {
  icon: string | React.ReactNode;
  label: string;
  desc: string;
  href: string;
  /** Opens in a new browser tab (Zalo, Messenger, Facebook) */
  external?: boolean;
  /** Uses tel: scheme — triggers the call dialer */
  isPhone?: boolean;
  /** Accent colour for the icon pill */
  accent?: string;
}

const SIMPLE_MENUS: Record<string, SimpleMenuItem[]> = {
  // ho-tro is now handled by the MEGA panel (see below)
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
  "ho-tro": {
    explore: {
      heading: "🔧 Hỗ Trợ Kỹ Thuật",
      links: [
        { label: "📞 Hotline Kỹ Thuật: 1900 1234", href: "tel:19001234",   featured: true, isPhone: true, desc: "Hỗ trợ 8:00–22:00 · Sự cố thiết bị, lỗi phần mềm" },
        { label: "📖 Hướng Dẫn & Tài Liệu",         href: "/about",                                        desc: "Hướng dẫn sử dụng, cài đặt và khắc phục sự cố" },
        { label: "📝 Tạo Phiếu Yêu Cầu Kỹ Thuật",  href: "/lien-he",                                      desc: "Gửi mô tả lỗi · Nhận phản hồi trong 24h" },
      ],
    },
    buy: {
      heading: "🛍️ Tư Vấn Bán Hàng",
      links: [
        {
          label: "📞 Hotline Tư Vấn: 1900 5678",
          href: "tel:19005678",
          featured: true, isPhone: true,
          desc: "Hỗ trợ 8:00–22:00 · Tư vấn chọn sản phẩm phù hợp",
        },
        {
          label: "Hướng Dẫn Chọn Sản Phẩm",
          href: "/products",
          desc: "So sánh cấu hình, giá cả và tính năng chi tiết",
        },
        {
          label: "Facebook",
          href: "https://facebook.com/technext.vn",
          external: true, socialRow: true,
          desc: "Nhắn tin tư vấn qua trang Facebook chính thức",
          brandIcon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
          ),
        },
        {
          label: "TikTok",
          href: "https://tiktok.com/@technext.vn",
          external: true, socialRow: true,
          desc: "Xem video tư vấn sản phẩm mới nhất",
          brandIcon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#010101">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          ),
        },
        {
          label: "Zalo",
          href: "https://zalo.me/technext",
          external: true, socialRow: true,
          desc: "Gửi tin, ảnh thiết bị · Nhận tư vấn nhanh",
          brandIcon: (
            <img src="/zalo.png" alt="Zalo" style={{ width: "20px", height: "20px", objectFit: "contain", borderRadius: "2px" }} />
          ),
        },
        {
          label: "Gmail",
          href: "mailto:support@technext.vn",
          socialRow: true,
          desc: "Gửi email tư vấn · Phản hồi trong 24h",
          brandIcon: (
            <img src="/gmail.webp" alt="Gmail" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
          ),
        },
      ],
    },
    learn: {
      heading: "Tiện Ích",
      links: [
        { label: "Theo Dõi Đơn Hàng",    href: "/orders",               featured: true },
        { label: "Chính Sách Đổi Trả",   href: "/chinh-sach-doi-tra" },
        { label: "Chính Sách Bảo Hành",  href: "/chinh-sach-doi-tra" },
        { label: "So Sánh Điện Thoại",   href: "/so-sanh-dien-thoai" },
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
    if (q) { router.push(`/search?q=${encodeURIComponent(q)}`); setSearchQuery(""); setSearchFocused(false); }
  };

  /* ── Search suggestions (sorted by relevance) ── */
  const suggestions = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return [];
    return searchProducts(q).slice(0, 6);
  }, [searchQuery]);

  const navRef      = useRef<HTMLElement>(null);
  const userRef     = useRef<HTMLDivElement>(null);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    closeTimer.current = setTimeout(() => setOpenMenu(null), 350);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const openUserMenu = () => {
    if (userTimer.current) clearTimeout(userTimer.current);
    setUserMenuOpen(true);
  };
  const delayCloseUser = () => {
    userTimer.current = setTimeout(() => setUserMenuOpen(false), 350);
  };
  const cancelCloseUser = () => {
    if (userTimer.current) clearTimeout(userTimer.current);
  };

  /* hasMega = true for brand-tab menus AND 3-col mega menus */
  const hasMega = !!openMenu && (!!BRAND_MENUS[openMenu] || !!MEGA[openMenu]);

  return (
    <header
      ref={navRef}
      style={{ position: "fixed", top: "48px", left: 0, right: 0, zIndex: 1000 }}
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
            style={{
              textDecoration: "none",
              flexShrink: 0,
              marginRight: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              cursor: "pointer",
            }}
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

                  {/* Support Hub dropdown for Hỗ Trợ */}
                  {item.menuKey && SIMPLE_MENUS[item.menuKey] && openMenu === item.menuKey && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 2px)", left: "50%",
                      transform: "translateX(-50%)",
                      background: "white",
                      border: "1px solid rgba(0,0,0,0.09)",
                      borderRadius: "16px",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.13)",
                      minWidth: "320px",
                      zIndex: 1001,
                      overflow: "hidden",
                      animation: "megaSlideDown 0.18s ease both",
                    }}>
                      {/* Header */}
                      <div style={{
                        padding: "0.75rem 1.1rem 0.5rem",
                        borderBottom: "1px solid rgba(0,0,0,0.06)",
                        background: "rgba(0,0,0,0.015)",
                      }}>
                        <p style={{ margin: 0, fontSize: "0.65rem", fontWeight: 700,
                          letterSpacing: "0.08em", textTransform: "uppercase", color: "#FF6700" }}>
                          Kênh Hỗ Trợ
                        </p>
                      </div>

                      {/* Channel rows */}
                      {SIMPLE_MENUS[item.menuKey].map((link, idx, arr) => {
                        const isLast = idx === arr.length - 1;
                        const rowStyle: React.CSSProperties = {
                          display: "flex", alignItems: "center", gap: "0.85rem",
                          padding: "0.72rem 1.1rem",
                          textDecoration: "none", color: "#1A1A1A",
                          transition: "background 0.13s",
                          borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,0.04)",
                          cursor: "pointer",
                        };
                        const iconPill = (
                          <span style={{
                            flexShrink: 0,
                            width: "34px", height: "34px",
                            borderRadius: "10px",
                            background: link.accent ? `${link.accent}18` : "rgba(0,0,0,0.05)",
                            border: `1px solid ${link.accent ? `${link.accent}30` : "rgba(0,0,0,0.08)"}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "1rem",
                          }}>
                            {link.icon}
                          </span>
                        );
                        const textBlock = (
                          <div style={{ minWidth: 0 }}>
                            <p style={{
                              margin: 0, fontSize: "0.84rem", fontWeight: 600,
                              color: "#1A1A1A", lineHeight: 1.3,
                            }}>
                              {link.label}
                            </p>
                            {link.desc && (
                              <p style={{
                                margin: "0.12rem 0 0", fontSize: "0.69rem",
                                color: "#999", lineHeight: 1.35,
                                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                              }}>
                                {link.desc}
                              </p>
                            )}
                          </div>
                        );
                        const arrowIcon = (
                          <span style={{
                            marginLeft: "auto", flexShrink: 0,
                            fontSize: "0.7rem", color: "#ccc",
                          }}>›</span>
                        );

                        if (link.isPhone || link.external) {
                          return (
                            <a
                              key={link.href + link.label}
                              href={link.href}
                              target={link.external ? "_blank" : undefined}
                              rel={link.external ? "noopener noreferrer" : undefined}
                              onClick={() => setOpenMenu(null)}
                              style={rowStyle}
                              onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f7")}
                              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                            >
                              {iconPill}{textBlock}{arrowIcon}
                            </a>
                          );
                        }
                        return (
                          <Link
                            key={link.href + link.label}
                            href={link.href}
                            onClick={() => setOpenMenu(null)}
                            style={rowStyle}
                            onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f7")}
                            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                          >
                            {iconPill}{textBlock}{arrowIcon}
                          </Link>
                        );
                      })}

                      {/* Footer CTA */}
                      <div style={{
                        padding: "0.6rem 1.1rem",
                        borderTop: "1px solid rgba(0,0,0,0.06)",
                        background: "rgba(0,0,0,0.015)",
                      }}>
                        <Link
                          href="/lien-he"
                          onClick={() => setOpenMenu(null)}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "center",
                            gap: "0.35rem",
                            padding: "0.45rem 0",
                            textDecoration: "none",
                            fontSize: "0.75rem", fontWeight: 600,
                            color: "#FF6700",
                            transition: "opacity 0.15s",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                        >
                          Xem tất cả kênh hỗ trợ →
                        </Link>
                      </div>
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
            {/* ── Inline Search Bar + Suggestions ── */}
            <div style={{ position: "relative", flexShrink: 0 }}>
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
              }}
            >
              <span style={{ fontSize: "0.8rem", color: "#888", flexShrink: 0, lineHeight: 1 }}>🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
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

            {/* Search suggestions dropdown */}
            {searchFocused && suggestions.length > 0 && (
              <div style={{
                position: "absolute", top: "calc(100% + 6px)", left: 0,
                width: "280px",
                background: "white", borderRadius: "14px",
                border: "1px solid rgba(0,0,0,0.09)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                zIndex: 2000, overflow: "hidden",
                animation: "megaSlideDown 0.16s ease both",
              }}>
                {suggestions.map(p => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => { setSearchQuery(""); setSearchFocused(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.65rem",
                      padding: "0.55rem 0.85rem",
                      textDecoration: "none", color: "#1A1A1A",
                      borderBottom: "1px solid rgba(0,0,0,0.04)",
                      transition: "background 0.12s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f7")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "8px",
                      background: "var(--color-muted)",
                      overflow: "hidden", flexShrink: 0, position: "relative",
                    }}>
                      <Image src={p.image} alt={p.name} fill sizes="36px"
                        style={{ objectFit: "contain", padding: "3px" }} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ margin: 0, fontSize: "0.79rem", fontWeight: 600,
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {p.name}
                      </p>
                      <p style={{ margin: 0, fontSize: "0.72rem", color: "#FF6700", fontWeight: 700 }}>
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </Link>
                ))}
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery.trim())}`}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => { setSearchFocused(false); }}
                  style={{
                    display: "block", padding: "0.55rem 0.85rem",
                    textDecoration: "none", fontSize: "0.75rem",
                    color: "#FF6700", fontWeight: 600, textAlign: "center",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fff8f5")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  Xem tất cả kết quả →
                </Link>
              </div>
            )}
            </div>


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
              onMouseEnter={openUserMenu}
              onMouseLeave={delayCloseUser}
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
                <div
                  onMouseEnter={cancelCloseUser}
                  onMouseLeave={delayCloseUser}
                  style={{
                  position: "absolute", right: 0, top: "calc(100% + 6px)",
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.09)",
                  borderRadius: "16px",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.13)",
                  minWidth: "210px", zIndex: 1001, overflow: "hidden",
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

                      {/* Kiểm Tra Phiếu Kỹ Thuật */}
                      <Link
                        href="/lien-he"
                        onClick={() => setUserMenuOpen(false)}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.65rem",
                          padding: "0.75rem 1.1rem",
                          textDecoration: "none", color: "#1A1A1A",
                          fontSize: "0.86rem", fontWeight: 500,
                          transition: "background 0.15s",
                          borderTop: "1px solid rgba(0,0,0,0.06)",
                          background: "rgba(255,103,0,0.03)",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#fff5f0")}
                        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,103,0,0.03)")}
                      >
                        <span style={{ fontSize: "1rem", width: "20px", textAlign: "center", flexShrink: 0 }}>🔧</span>
                        <span style={{ flex: 1, lineHeight: 1.3 }}>
                          <span style={{ display: "block" }}>Kiểm Tra Phiếu Kỹ Thuật</span>
                          <span style={{ display: "block", fontSize: "0.7rem", color: "#FF6700", fontWeight: 400, marginTop: "0.1rem" }}>
                            Xem trạng thái duyệt sửa chữa
                          </span>
                        </span>
                        {/* Status dot */}
                        <span style={{
                          flexShrink: 0,
                          width: "8px", height: "8px", borderRadius: "50%",
                          background: "#FF6700",
                          boxShadow: "0 0 0 2px rgba(255,103,0,0.25)",
                          animation: "techPulse 2s ease-in-out infinite",
                        }} />
                      </Link>

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
                          overflow: "hidden",
                          boxShadow: activeBrand === b.key ? `0 3px 12px ${b.accent}55` : "none",
                          transition: "box-shadow 0.2s",
                        }}>
                          {b.key === "apple" ? (
                            <svg width="18" height="18" viewBox="0 0 814 1000" fill="white">
                              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                            </svg>
                          ) : b.key === "xiaomi" ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src="/XIAOMI.png" alt="Xiaomi" style={{ width: "26px", height: "26px", objectFit: "contain" }} />
                          ) : b.key === "samsung" ? (
                            <Image src="/SAMSUNG.svg" alt="Samsung" width={52} height={16} style={{ filter: "brightness(0) invert(1)", objectFit: "contain" }} />
                          ) : (
                            <span style={{ fontSize: "0.72rem", fontWeight: 900, color: "white" }}>{b.logoText}</span>
                          )}
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
                                  zIndex: 2,
                                }}>{p.badge}</span>
                              )}
                              {p.image ? (
                                <Image
                                  src={p.image}
                                  alt={p.name}
                                  fill
                                  sizes="160px"
                                  style={{ objectFit: "contain", padding: "0.5rem" }}
                                />
                              ) : (
                                <span style={{ fontSize: "2rem" }}>{catIcon}</span>
                              )}
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

              /* ── 3-COL MEGA LAYOUT (Cửa Hàng / Hỗ Trợ) ── */
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "3rem",
                padding: "2rem 0 2.75rem",
              }}>

                {/* ── Banner: switches content per menu ── */}
                {openMenu === "ho-tro" ? (
                  /* Support Hub banner */
                  <Link
                    href="/lien-he"
                    onClick={() => setOpenMenu(null)}
                    style={{
                      gridColumn: "1 / -1",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: "linear-gradient(135deg, #0a1628 0%, #1a2e4a 100%)",
                      borderRadius: "16px",
                      padding: "1.1rem 1.6rem",
                      marginBottom: "0.5rem",
                      gap: "2rem",
                      textDecoration: "none",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: "0 0 0.2rem", fontWeight: 900, fontSize: "1.05rem", color: "white", letterSpacing: "-0.02em" }}>
                        Tech<span style={{ color: "#FF6700" }}>Next</span>{" "}
                        <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, fontSize: "0.88rem" }}>Hỗ Trợ</span>
                      </p>
                      <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 400, lineHeight: 1.4 }}>
                        Luôn sẵn sàng hỗ trợ bạn — qua điện thoại, chat hay email
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "2rem", flexShrink: 0 }}>
                      {[
                        { val: "24/7",  label: "Hỗ Trợ" },
                        { val: "< 2'"  , label: "Phản Hồi" },
                        { val: "5★",   label: "Đánh Giá" },
                      ].map(s => (
                        <div key={s.label} style={{ textAlign: "center" }}>
                          <p style={{ margin: "0 0 0.1rem", fontWeight: 800, fontSize: "1rem", color: "#FF6700" }}>{s.val}</p>
                          <p style={{ margin: 0, fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{s.label}</p>
                        </div>
                      ))}
                    </div>
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
                      Liên Hệ Ngay →
                    </span>
                  </Link>
                ) : (
                  /* Cửa Hàng — About TechNext banner */
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
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: "0 0 0.2rem", fontWeight: 900, fontSize: "1.05rem", color: "white", letterSpacing: "-0.02em" }}>
                        Tech<span style={{ color: "#FF6700" }}>Next</span>
                      </p>
                      <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", fontWeight: 400, lineHeight: 1.4 }}>
                        Địa chỉ tin cậy mua sắm công nghệ chính hãng tại Việt Nam
                      </p>
                    </div>
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
                )}

                {/* ── 3 columns ── */}
                {(["explore", "buy", "learn"] as const).map(col => {
                  const data = MEGA[openMenu!][col];
                  return (
                    <div key={col}>
                      <p style={{
                        fontSize: "0.62rem", color: "#FF6700", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        margin: "0 0 1rem",
                      }}>{data.heading}</p>
                      {(() => {
                        let socialGroupDone = false;
                        return data.links.map(link => {
                          /* ── socialRow: render all 4 as a horizontal icon strip ── */
                          if (link.socialRow) {
                            if (socialGroupDone) return null;
                            socialGroupDone = true;
                            const socials = data.links.filter(l => l.socialRow);
                            return (
                              <div key="social-row" style={{
                                display: "flex", gap: "0.5rem",
                                padding: "0.5rem 0 0.2rem",
                                borderTop: "1px solid rgba(0,0,0,0.06)",
                                marginTop: "0.3rem",
                              }}>
                                <p style={{ width: "100%", margin: "0 0 0.5rem", fontSize: "0.7rem", color: "#aaa", fontWeight: 500 }}>
                                  Chat / Mạng xã hội
                                </p>
                                {socials.map(s => (
                                  <a
                                    key={s.href + s.label}
                                    href={s.href}
                                    target={s.external ? "_blank" : undefined}
                                    rel={s.external ? "noopener noreferrer" : undefined}
                                    title={s.label}
                                    onClick={() => setOpenMenu(null)}
                                    style={{
                                      width: "34px", height: "34px", borderRadius: "8px",
                                      border: "1px solid rgba(0,0,0,0.09)",
                                      background: "rgba(0,0,0,0.03)",
                                      display: "flex", alignItems: "center", justifyContent: "center",
                                      textDecoration: "none",
                                      transition: "background 0.15s, transform 0.15s",
                                      flexShrink: 0,
                                    }}
                                    onMouseEnter={e => {
                                      e.currentTarget.style.background = "rgba(0,0,0,0.09)";
                                      e.currentTarget.style.transform = "translateY(-2px)";
                                    }}
                                    onMouseLeave={e => {
                                      e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                                      e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                  >
                                    {s.brandIcon}
                                  </a>
                                ))}
                              </div>
                            );
                          }

                          /* ── Regular link ── */
                          const linkStyle: React.CSSProperties = {
                            display: "block", textDecoration: "none",
                            color: "#1A1A1A",
                            fontSize: link.featured ? "1.1rem" : "0.88rem",
                            fontWeight: link.featured ? 800 : 400,
                            lineHeight: 1.6,
                            padding: link.featured ? "0.1rem 0 0.6rem" : "0.28rem 0",
                            borderBottom: link.featured ? "1px solid rgba(0,0,0,0.07)" : "none",
                            marginBottom: link.featured ? "0.5rem" : "0",
                            transition: "color 0.15s",
                          };
                          const inner = (
                            <>
                              {link.brandIcon ? (
                                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                                  {link.brandIcon}{link.label}
                                </span>
                              ) : link.label}
                              {link.featured && link.desc && (
                                <p style={{ margin: "0.3rem 0 0", fontSize: "0.78rem", color: "#888", fontWeight: 400, lineHeight: 1.6 }}>
                                  {link.desc}
                                </p>
                              )}
                            </>
                          );
                          if (link.isPhone || link.external) {
                            return (
                              <a
                                key={link.href + link.label}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                onClick={() => setOpenMenu(null)}
                                style={linkStyle}
                                onMouseEnter={e => (e.currentTarget.style.color = "#FF6700")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#1A1A1A")}
                              >{inner}</a>
                            );
                          }
                          return (
                            <Link
                              key={link.href + link.label}
                              href={link.href}
                              onClick={() => setOpenMenu(null)}
                              style={linkStyle}
                              onMouseEnter={e => (e.currentTarget.style.color = "#FF6700")}
                              onMouseLeave={e => (e.currentTarget.style.color = "#1A1A1A")}
                            >{inner}</Link>
                          );
                        });
                      })()}

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
        @keyframes techPulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(255,103,0,0.25); }
          50%       { box-shadow: 0 0 0 5px rgba(255,103,0,0.0);  }
        }
      `}</style>
    </header>
  );
}
