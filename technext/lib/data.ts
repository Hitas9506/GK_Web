import type { Product, Category } from "./types";

/* ── helpers ── */
const DS = (...rows: [string, string][]) => rows.map(([label, value]) => ({ label, value }));

/* ═══════════════════════════════════════════════════════════
   TechNext – Dữ liệu từ Device.pdf (25 sản phẩm)
   📱 Điện Thoại: Apple(5) Xiaomi(4) Samsung(6) = 15
   📲 Tablet:     Apple(4) Xiaomi(4) Samsung(2) = 10
═══════════════════════════════════════════════════════════ */

export const products: Product[] = [

  /* ── ĐIỆN THOẠI – APPLE (id 1–5) ── */
  {
    id: 1, name: "iPhone 17 Pro Max", slug: "iphone-17-pro-max",
    price: 36_990_000, originalPrice: 40_990_000,
    category: "dien-thoai", brand: "apple",
    description: "iPhone 17 Pro Max – đỉnh cao Apple với chip A19 Pro, OLED 120Hz, camera 48MP+48MP+48MP, quay 8K, khung titan, iOS 26. Có bản 1TB và 2TB.",
    image: "/images/products/iphone-17-pro-max/cam_vu_tru.jpg",
    rating: 4.9, reviewCount: 4120, badge: "hot",
    variants: ["256GB", "512GB", "1TB", "2TB"],
    variantPrices: {
      "256GB": 36_990_000,
      "512GB": 43_090_000,
      "1TB":   50_090_000,
      "2TB":   63_090_000,
    },
    colors: ["Cam Vũ Trụ", "Xanh Đậm", "Bạc"],
    colorImages: {
      "Cam Vũ Trụ": "/images/products/iphone-17-pro-max/cam_vu_tru.jpg",
      "Xanh Đậm":   "/images/products/iphone-17-pro-max/xanh_dam.jpg",
      "Bạc":         "/images/products/iphone-17-pro-max/bac.jpg",
    },
    inStock: true, featured: true,
    specs: "A19 Pro | OLED 120Hz | 48MP×3 | iOS 26 | Titan",
    detailedSpecs: DS(
      ["Chip xử lý", "Apple A19 Pro (3nm) – 6 nhân CPU, 6 nhân GPU"],
      ["Màn hình", "6.9\" Super Retina XDR OLED ProMotion 120Hz, 2868×1320, 460ppi, Peak Brightness 2000nit, Always-On Display"],
      ["RAM", "12GB"],
      ["Camera sau", "3 camera: Wide 48MP f/1.6 | Ultra Wide 48MP f/2.2 | Tele 5x 48MP f/2.8 | Quay 8K@30fps, 4K@120fps"],
      ["Camera trước", "24MP f/1.9, tự động lấy nét, quay 4K@60fps"],
      ["Pin", "4685mAh – 33h video, sạc 30W, sạc MagSafe 25W, sạc không dây 15W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3 (10Gbps), 5G mmWave"],
      ["Hệ điều hành", "iOS 26"],
      ["Kích thước", "163×77.6×8.25mm | 227g"],
      ["Màu sắc", "Cam Vũ Trụ, Xanh Đậm, Bạc"]
    ),
    features: ["face-id", "ip68", "5g", "nfc", "ai", "magsafe"],
    videos: [
      "/videos/iphone-17-pro-max/video1.mp4",
      "/videos/iphone-17-pro-max/video2.mp4",
      "/videos/iphone-17-pro-max/video3.mp4",
    ],
  },
  {
    id: 2, name: "iPhone 17 Pro", slug: "iphone-17-pro",
    price: 34_790_000, originalPrice: 38_790_000,
    category: "dien-thoai", brand: "apple",
    description: "iPhone 17 Pro với chip A19 Pro, màn hình OLED ProMotion 120Hz, camera 48MP ba ống kính, quay ProRes 4K@120fps, iOS 26. Nhỏ gọn hơn Pro Max.",
    image: "/images/products/iphone-17-pro/cam_vu_tru.jpg",
    rating: 4.9, reviewCount: 2870, badge: "new",
    variants: ["256GB", "512GB", "1TB"],
    variantPrices: {
      "256GB": 34_790_000,
      "512GB": 41_090_000,
      "1TB":   47_990_000,
    },
    colors: ["Cam Vũ Trụ", "Bạc", "Xanh Đậm"],
    colorImages: {
      "Cam Vũ Trụ": "/images/products/iphone-17-pro/cam_vu_tru.jpg",
      "Bạc":         "/images/products/iphone-17-pro/bac.jpg",
      "Xanh Đậm":   "/images/products/iphone-17-pro/xanh_dam.jpg",
    },
    inStock: true, featured: true,
    specs: "A19 Pro | OLED 120Hz | 48MP×3 | iOS 26 | Camera Control",
    detailedSpecs: DS(
      ["Chip xử lý", "Apple A19 Pro (3nm) – 6 nhân CPU, 6 nhân GPU"],
      ["Màn hình", "6.3\" Super Retina XDR OLED ProMotion 120Hz, 2622×1206, 460ppi, Peak Brightness 2000nit"],
      ["RAM", "12GB"],
      ["Camera sau", "3 camera: Wide 48MP f/1.6 | Ultra Wide 48MP f/2.2 | Tele 5x 48MP f/2.8 | Quay 4K@120fps"],
      ["Camera trước", "24MP f/1.9, tự động lấy nét, quay 4K@60fps"],
      ["Pin", "3274mAh – 27h video, sạc 30W, MagSafe 25W, sạc không dây 15W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3 (10Gbps), 5G"],
      ["Hệ điều hành", "iOS 26"],
      ["Kích thước", "149.6×71.5×8.25mm | 199g"],
      ["Màu sắc", "Cam Vũ Trụ, Bạc, Xanh Đậm"]
    ),
    features: ["face-id", "ip68", "5g", "nfc", "ai", "magsafe"],
  },
  {
    id: 3, name: "iPhone 17", slug: "iphone-17",
    price: 24_490_000, originalPrice: 27_490_000,
    category: "dien-thoai", brand: "apple",
    description: "iPhone 17 tiêu chuẩn với chip A19, OLED, camera 48MP+48MP, selfie 18MP, iOS 26. Màu sắc: Xanh Lam Khói, Xanh Lá Xô Thơm, Tím Oải Hương, Trắng, Đen.",
    image: "/images/products/iphone-17/xanh_lam_khoi.jpg",
    rating: 4.7, reviewCount: 1950, badge: "new",
    variants: ["256GB", "512GB"],
    variantPrices: {
      "256GB": 24_490_000,
      "512GB": 30_790_000,
    },
    colors: ["Xanh Lam Khói", "Xanh Lá Xô Thơm", "Tím Oải Hương", "Trắng", "Đen"],
    colorImages: {
      "Xanh Lam Khói":    "/images/products/iphone-17/xanh_lam_khoi.jpg",
      "Xanh Lá Xô Thơm": "/images/products/iphone-17/xanh_la_xo_thom.jpg",
      "Tím Oải Hương":    "/images/products/iphone-17/tim_oai_huong.jpg",
      "Trắng":            "/images/products/iphone-17/trang.jpg",
      "Đen":              "/images/products/iphone-17/den.jpg",
    },
    inStock: true, featured: false,
    specs: "A19 | OLED | 48MP+48MP | Selfie 18MP | iOS 26",
    detailedSpecs: DS(
      ["Chip xử lý", "Apple A19 (3nm) – 6 nhân CPU, 5 nhân GPU"],
      ["Màn hình", "6.3\" Super Retina XDR OLED 60Hz, 2532×1170, 460ppi, Ceramic Shield"],
      ["RAM", "8GB"],
      ["Camera sau", "2 camera: Wide 48MP f/1.6 | Ultra Wide 48MP f/2.2 | Quay 4K@60fps"],
      ["Camera trước", "18MP f/2.2, quay 4K@60fps"],
      ["Pin", "3279mAh – 26h video, sạc 20W, MagSafe 15W"],
      ["Kết nối", "Wi-Fi 6E, Bluetooth 5.3, NFC, USB-C 2 (480Mbps), 5G"],
      ["Hệ điều hành", "iOS 26"],
      ["Kích thước", "150.9×72.9×7.8mm | 170g"],
      ["Màu sắc", "Xanh Lam Khói, Xanh Lá Xô Thơm, Tím Oải Hương, Trắng, Đen"]
    ),
    features: ["face-id", "ip68", "5g", "nfc", "ai", "magsafe"],
  },
  {
    id: 4, name: "iPhone Air", slug: "iphone-air",
    price: 22_990_000, originalPrice: 25_990_000,
    category: "dien-thoai", brand: "apple",
    description: "iPhone Air – siêu mỏng nhẹ của Apple, chip A19 Pro, OLED, camera 48MP, selfie 18MP, iOS 26. Màu: Trắng Mây, Xanh Da Trời, Đen Không Gian, Vàng Nhạt.",
    image: "/images/products/iphone-air/trang_may.jpg",
    rating: 4.8, reviewCount: 1320, badge: "new",
    variants: ["256GB", "512GB", "1TB"],
    variantPrices: {
      "256GB": 22_990_000,
      "512GB": 28_990_000,
      "1TB":   34_990_000,
    },
    colors: ["Trắng Mây", "Xanh Da Trời", "Đen Không Gian", "Vàng Nhạt"],
    colorImages: {
      "Trắng Mây":     "/images/products/iphone-air/trang_may.jpg",
      "Xanh Da Trời":  "/images/products/iphone-air/xanh_da_troi.jpg",
      "Đen Không Gian":"/images/products/iphone-air/den_khong_gian.jpg",
      "Vàng Nhạt":     "/images/products/iphone-air/vang_nhat.jpg",
    },
    inStock: true, featured: true,
    specs: "A19 Pro | OLED | 48MP | Selfie 18MP | Siêu mỏng nhẹ",
    detailedSpecs: DS(
      ["Chip xử lý", "Apple A19 Pro (3nm) – 6 nhân CPU, 6 nhân GPU"],
      ["Màn hình", "6.6\" Super Retina XDR OLED 60Hz, 2796×1290, 460ppi – siêu mỏng 5.65mm"],
      ["RAM", "8GB"],
      ["Camera sau", "Wide 48MP f/1.6 | Ultra Wide 12MP f/2.2 | Quay 4K@60fps"],
      ["Camera trước", "18MP f/2.2, quay 4K@60fps"],
      ["Pin", "2868mAh – 22h video, sạc 25W, MagSafe 25W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3 (10Gbps), 5G"],
      ["Hệ điều hành", "iOS 26"],
      ["Kích thước", "160.9×76.4×5.65mm | 145g"],
      ["Màu sắc", "Trắng Mây, Xanh Da Trời, Đen Không Gian, Vàng Nhạt"]
    ),
    features: ["face-id", "ip68", "5g", "nfc", "ai", "magsafe"],
  },
  {
    id: 5, name: "iPhone 17e", slug: "iphone-17e",
    price: 23_690_000, originalPrice: 26_690_000,
    category: "dien-thoai", brand: "apple",
    description: "iPhone 17e – flagship tầm trung Apple, chip A19, 6.1\" Super Retina XDR 2532×1170, camera 48MP f/1.6 + Tele 2x 12MP, selfie 12MP, pin 26h video, iOS 26.",
    image: "/images/products/iphone-17e/trang.jpg",
    rating: 4.6, reviewCount: 2450, badge: "sale",
    variants: ["256GB", "512GB"],
    variantPrices: {
      "256GB": 23_690_000,
      "512GB": 29_690_000,
    },
    colors: ["Trắng", "Đen", "Hồng"],
    colorImages: {
      "Trắng": "/images/products/iphone-17e/trang.jpg",
      "Đen":   "/images/products/iphone-17e/den.jpg",
      "Hồng":  "/images/products/iphone-17e/hong.jpg",
    },
    inStock: true, featured: false,
    specs: "A19 | 6.1\" Super Retina XDR | 48MP+12MP | iOS 26",
    detailedSpecs: DS(
      ["Chip xử lý", "Apple A19 (3nm) – 6 nhân CPU, 5 nhân GPU"],
      ["Màn hình", "6.1\" Super Retina XDR OLED 60Hz, 2532×1170, 460ppi, Ceramic Shield"],
      ["RAM", "8GB"],
      ["Camera sau", "Wide 48MP f/1.6 | Tele 2x 12MP f/2.4 | Quay 4K@60fps"],
      ["Camera trước", "12MP f/1.9, TrueDepth, Face ID, quay 4K@60fps"],
      ["Pin", "3279mAh – 26h video, sạc 20W, MagSafe 15W"],
      ["Kết nối", "Wi-Fi 6E, Bluetooth 5.3, NFC, USB-C 2, 5G"],
      ["Hệ điều hành", "iOS 26"],
      ["Kích thước", "138.7×67.1×7.8mm | 165g"],
      ["Màu sắc", "Trắng, Đen, Hồng"]
    ),
    features: ["face-id", "ip68", "5g", "nfc", "ai", "magsafe"],
  },

  /* ── ĐIỆN THOẠI – XIAOMI (id 6–9) ── */
  {
    id: 6, name: "Xiaomi 17", slug: "xiaomi-17",
    price: 21_190_000, originalPrice: 24_190_000,
    category: "dien-thoai", brand: "xiaomi",
    description: "Xiaomi 17 với Snapdragon 8 Elite Gen 5 (4.6GHz), LTPO AMOLED, camera Leica 50MP×3, selfie 50MP, quay 8K, RAM 12GB, Android 16.",
    image: "/images/products/xiaomi-17/xanh_la.png",
    rating: 4.7, reviewCount: 980, badge: "new",
    variants: ["256GB", "512GB"],
    variantPrices: {
      "256GB": 21_190_000,
      "512GB": 22_690_000,
    },
    colors: ["Xanh Lá", "Đen", "Xanh Dương"],
    colorImages: {
      "Xanh Lá":   "/images/products/xiaomi-17/xanh_la.png",
      "Đen":       "/images/products/xiaomi-17/den.png",
      "Xanh Dương":"/images/products/xiaomi-17/xanh_duong.png",
    },
    inStock: true, featured: false,
    specs: "Snapdragon 8 Elite Gen 5 | LTPO AMOLED | Leica 50MP×3 | 8K",
    detailedSpecs: DS(
      ["Chip xử lý", "Snapdragon 8 Elite Gen 5 (3nm), CPU 9 nhân – tốc độ 4.6GHz"],
      ["Màn hình", "6.36\" LTPO AMOLED 120Hz (1-120Hz) 2K 3200×1440, 522ppi, 3200nit Peak"],
      ["RAM / ROM", "12GB LPDDR5X / 256 hoặc 512GB UFS 4.1"],
      ["Camera sau", "Leica 50MP Wide f/1.6 OIS | 50MP Tele 5x f/1.85 OIS | 50MP Ultra Wide f/2.2 | Quay 8K@30fps"],
      ["Camera trước", "50MP f/2.0, quay 4K@30fps"],
      ["Pin", "5400mAh, sạc nhanh 90W HyperCharge, sạc không dây 50W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 2.0, 5G"],
      ["Hệ điều hành", "Android 16 | HyperOS 3"],
      ["Kích thước", "152.6×73.6×7.97mm | 192g"]
    ),
    features: ["5g", "nfc", "ai"],
  },
  {
    id: 7, name: "Xiaomi 17 Ultra", slug: "xiaomi-17-ultra",
    price: 31_190_000, originalPrice: 35_190_000,
    category: "dien-thoai", brand: "xiaomi",
    description: "Xiaomi 17 Ultra – flagship đỉnh Leica, camera chính 200MP, Snapdragon 8 Elite Gen 5, LTPO AMOLED, selfie 50MP, quay 8K, RAM 16GB, Android 16.",
    image: "/images/products/xiaomi-17-ultra/den.png",
    rating: 4.9, reviewCount: 1870, badge: "hot",
    variants: ["512GB", "1TB"],
    variantPrices: {
      "512GB": 31_190_000,
      "1TB":   34_190_000,
    },
    colors: ["Đen", "Trắng", "Xanh Lá"],
    colorImages: {
      "Đen":    "/images/products/xiaomi-17-ultra/den.png",
      "Trắng":  "/images/products/xiaomi-17-ultra/trang.png",
      "Xanh Lá":"/images/products/xiaomi-17-ultra/xanh_la.png",
    },
    inStock: true, featured: true,
    specs: "Snapdragon 8 Elite Gen 5 | LTPO AMOLED | Leica 200MP | 8K | 16GB RAM",
    detailedSpecs: DS(
      ["Chip xử lý", "Snapdragon 8 Elite Gen 5 (3nm), CPU 9 nhân – 4.6GHz"],
      ["Màn hình", "6.73\" LTPO AMOLED 120Hz 2K 3200×1440, 522ppi, 3200nit Peak, Always-On"],
      ["RAM / ROM", "16GB LPDDR5X / 512GB hoặc 1TB UFS 4.1"],
      ["Camera sau", "Leica 200MP Wide f/1.63 OIS 1\" | 50MP Tele 10x f/1.8 OIS | 50MP Ultra Wide | 50MP Tele 3x | Quay 8K@30fps"],
      ["Camera trước", "50MP f/2.0, quay 4K@30fps"],
      ["Pin", "6000mAh, sạc 90W HyperCharge, sạc không dây 80W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 2.0, 5G"],
      ["Hệ điều hành", "Android 16 | HyperOS 3"],
      ["Kích thước", "161.4×75.9×8.4mm | 224g"]
    ),
    features: ["5g", "nfc", "ai", "ip68"],
    videos: [
      "/videos/xiaomi-17-ultra/video1.mp4",
      "/videos/xiaomi-17-ultra/video2.mp4",
      "/videos/xiaomi-17-ultra/video3.mp4",
    ],
  },
  {
    id: 8, name: "Xiaomi 15", slug: "xiaomi-15",
    price: 18_490_000, originalPrice: 21_490_000,
    category: "dien-thoai", brand: "xiaomi",
    description: "Xiaomi 15 với Snapdragon 8 Elite, AMOLED, camera Leica 50MP×3, selfie 32MP, quay 8K, RAM 12GB, HyperOS 2. Màu: Xanh Lá, Đen, Trắng.",
    image: "/images/products/xiaomi-15/xanh_la.png",
    rating: 4.7, reviewCount: 1120, badge: "sale",
    variants: ["256GB", "512GB"],
    variantPrices: {
      "256GB": 18_490_000,
      "512GB": 19_990_000,
    },
    colors: ["Xanh Lá", "Đen", "Trắng"],
    colorImages: {
      "Xanh Lá": "/images/products/xiaomi-15/xanh_la.png",
      "Đen":     "/images/products/xiaomi-15/den.png",
      "Trắng":   "/images/products/xiaomi-15/trang.jpg",
    },
    inStock: true, featured: false,
    specs: "Snapdragon 8 Elite | AMOLED | Leica 50MP×3 | 8K | HyperOS 2",
    detailedSpecs: DS(
      ["Chip xử lý", "Snapdragon 8 Elite (3nm), tốc độ 4.32GHz"],
      ["Màn hình", "6.36\" AMOLED 120Hz FHD+ 2670×1200, 460ppi, 3000nit Peak"],
      ["RAM / ROM", "12GB / 256 hoặc 512GB UFS 4.0"],
      ["Camera sau", "Leica 50MP Wide f/1.62 OIS | 50MP Tele 5x f/2.0 OIS | 50MP Ultra Wide | Quay 8K@30fps"],
      ["Camera trước", "32MP f/2.0, quay 4K@30fps"],
      ["Pin", "5240mAh, sạc 90W Turbo HyperCharge, sạc không dây 50W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 2.0, 5G"],
      ["Hệ điều hành", "Android 15 | HyperOS 2"],
      ["Kích thước", "152.9×73.5×8.35mm | 189g"]
    ),
    features: ["5g", "nfc", "ai"],
  },
  {
    id: 9, name: "Xiaomi 15 Ultra", slug: "xiaomi-15-ultra",
    price: 27_490_000, originalPrice: 31_490_000,
    category: "dien-thoai", brand: "xiaomi",
    description: "Xiaomi 15 Ultra – Leica 4 camera (50MP+200MP+50MP+50MP), Snapdragon 8 Elite, AMOLED, selfie 32MP, quay 8K@30fps, RAM 16GB, HyperOS 2.",
    image: "/images/products/xiaomi-15-ultra/bac.jpg",
    rating: 4.8, reviewCount: 1540, badge: "sale",
    variants: ["16GB/512GB", "16GB/1TB"],
    variantPrices: {
      "16GB/512GB": 27_490_000,
      "16GB/1TB":   29_490_000,
    },
    colors: ["Bạc", "Đen"],
    colorImages: {
      "Bạc": "/images/products/xiaomi-15-ultra/bac.jpg",
      "Đen": "/images/products/xiaomi-15-ultra/den.jpg",
    },
    inStock: true, featured: true,
    specs: "Snapdragon 8 Elite | AMOLED | Leica 200MP | 8K | 16GB RAM",
    detailedSpecs: DS(
      ["Chip xử lý", "Snapdragon 8 Elite (3nm), tốc độ 4.32GHz"],
      ["Màn hình", "6.73\" LTPO AMOLED 120Hz 2K 3200×1440, 522ppi, 3000nit Peak"],
      ["RAM / ROM", "16GB LPDDR5X / 512GB hoặc 1TB UFS 4.0"],
      ["Camera sau", "Leica 50MP Wide f/1.7 OIS 1\" | 200MP Tele 5x f/2.5 OIS | 50MP Tele 3x | 50MP Ultra Wide | Quay 8K@30fps"],
      ["Camera trước", "32MP f/2.0, quay 4K@30fps"],
      ["Pin", "5300mAh, sạc 90W HyperCharge, sạc không dây 80W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3.2, 5G"],
      ["Hệ điều hành", "Android 15 | HyperOS 2"],
      ["Kích thước", "163.2×75.3×8.35mm | 224g"]
    ),
    features: ["5g", "nfc", "ai", "ip68"],
  },

  /* ── ĐIỆN THOẠI – SAMSUNG (id 10–15) ── */
  {
    id: 10, name: "Samsung Galaxy S26 Ultra", slug: "samsung-galaxy-s26-ultra",
    price: 30_690_000, originalPrice: 35_690_000,
    category: "dien-thoai", brand: "samsung",
    description: "Galaxy S26 Ultra – Snapdragon 8 Elite Gen 5, màn 6.9\" Dynamic AMOLED 2X QHD+ 120Hz, camera 200MP+50MP+50MP+10MP, S Pen, pin 5000mAh, Android 16.",
    image: "/images/products/samsung-galaxy-s26-ultra/default_1_1.jpg",
    rating: 4.9, reviewCount: 2340, badge: "new",
    variants: ["12GB/256GB", "12GB/512GB", "16GB/1TB"],
    variantPrices: {
      "12GB/256GB": 30_690_000,
      "12GB/512GB": 35_990_000,
      "16GB/1TB":   42_990_000,
    },
    colors: ["Tím Cobalt", "Trắng Classic", "Xanh Sky Blue", "Đen Classic", "Vàng Hồng"],
    colorImages: {
      "Tím Cobalt":    "/images/products/samsung-galaxy-s26-ultra/default_1_1.jpg",
      "Trắng Classic": "/images/products/samsung-galaxy-s26-ultra/default_2_1.jpg",
      "Xanh Sky Blue": "/images/products/samsung-galaxy-s26-ultra/default_3_1.jpg",
      "Đen Classic":   "/images/products/samsung-galaxy-s26-ultra/default_4_1.jpg",
      "Vàng Hồng":     "/images/products/samsung-galaxy-s26-ultra/default_5.jpg",
    },
    inStock: true, featured: true,
    specs: "Snapdragon 8 Elite Gen 5 | 6.9\" QHD+ 120Hz | 200MP | S Pen | 5000mAh",
    detailedSpecs: DS(
      ["Chip xử lý", "Snapdragon 8 Elite Gen 5 (3nm), CPU 10 nhân 4.6GHz"],
      ["Màn hình", "6.9\" Dynamic AMOLED 2X QHD+ 3088×1440 120Hz, 2600nit Peak, Always-On"],
      ["RAM / ROM", "12GB (256/512GB) hoặc 16GB (1TB) LPDDR5X"],
      ["Camera sau", "200MP Wide f/1.7 OIS | 50MP Tele 5x f/3.4 OIS | 50MP Tele 3x f/2.6 OIS | 10MP Ultra Wide f/2.2 | Quay 8K@30fps"],
      ["Camera trước", "12MP f/2.2, quay 4K@60fps"],
      ["S Pen", "S Pen tích hợp, độ trễ 2.8ms, nhận dạng chữ viết AI"],
      ["Pin", "5000mAh, sạc 45W, sạc không dây 15W, sạc ngược 4.5W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3.2, 5G"],
      ["Hệ điều hành", "Android 16 | One UI 8"],
      ["Kích thước", "162.8×78.9×8.2mm | 218g"]
    ),
    features: ["5g", "nfc", "ai", "ip68", "s-pen"],
    videos: [
      "/videos/samsung-galaxy-s26-ultra/video1.mp4",
      "/videos/samsung-galaxy-s26-ultra/video2.mp4",
      "/videos/samsung-galaxy-s26-ultra/video3.mp4",
    ],
  },
  {
    id: 11, name: "Samsung Galaxy S26+", slug: "samsung-galaxy-s26-plus",
    price: 29_990_000, originalPrice: 33_990_000,
    category: "dien-thoai", brand: "samsung",
    description: "Galaxy S26+ với Exynos 2600, 6.3\" Dynamic AMOLED 2X Full HD+, camera 50MP+12MP+10MP, selfie 12MP, pin 4300mAh sạc 25W, Android 16.",
    image: "/images/products/samsung-galaxy-s26-plus/den_classic.jpg",
    rating: 4.8, reviewCount: 1230, badge: "new",
    variants: ["256GB", "512GB"],
    variantPrices: {
      "256GB": 29_990_000,
      "512GB": 35_990_000,
    },
    colors: ["Đen Classic", "Tím Cobalt", "Trắng Classic", "Xanh Sky Blue"],
    colorImages: {
      "Đen Classic":   "/images/products/samsung-galaxy-s26-plus/den_classic.jpg",
      "Tím Cobalt":    "/images/products/samsung-galaxy-s26-plus/tim_cobalt.jpg",
      "Trắng Classic": "/images/products/samsung-galaxy-s26-plus/trang_classic.jpg",
      "Xanh Sky Blue": "/images/products/samsung-galaxy-s26-plus/xanh_sky_blue.jpg",
    },
    inStock: true, featured: false,
    specs: "Exynos 2600 | 6.3\" AMOLED | 50MP+12MP+10MP | 12GB RAM",
    detailedSpecs: DS(
      ["Chip xử lý", "Exynos 2600 (2nm), tốc độ 3.5GHz"],
      ["Màn hình", "6.3\" Dynamic AMOLED 2X FHD+ 2340×1080 120Hz, 2600nit Peak"],
      ["RAM / ROM", "12GB / 256 hoặc 512GB UFS 4.0"],
      ["Camera sau", "50MP Wide f/1.8 OIS | 12MP Ultra Wide f/2.2 | 10MP Tele 3x f/2.4 | Quay 8K@30fps"],
      ["Camera trước", "12MP f/2.2, quay 4K@60fps"],
      ["Pin", "4300mAh, sạc 25W, sạc không dây 15W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3.2, 5G"],
      ["Hệ điều hành", "Android 16 | One UI 8"],
      ["Kích thước", "158.4×75.8×7.3mm | 190g"]
    ),
    features: ["5g", "nfc", "ai", "ip67"],
  },
  {
    id: 12, name: "Samsung Galaxy S26", slug: "samsung-galaxy-s26",
    price: 19_990_000, originalPrice: 23_990_000,
    category: "dien-thoai", brand: "samsung",
    description: "Galaxy S26 – 10 nhân 3.8GHz, 6.3\" Dynamic AMOLED 2X 120Hz FHD+, camera 50MP+10MP+12MP, NFC, Wi-Fi 7, Bluetooth 5.4, pin 4300mAh 30h, Android 16.",
    image: "/images/products/samsung-galaxy-s26/tim_cobalt.jpg",
    rating: 4.7, reviewCount: 870, badge: "new",
    variants: ["12GB/256GB", "12GB/512GB"],
    variantPrices: {
      "12GB/256GB": 19_990_000,
      "12GB/512GB": 25_990_000,
    },
    colors: ["Tím Cobalt", "Xanh Sky Blue", "Đen Classic", "Trắng Classic", "Bạc Shadow", "Vàng Hồng"],
    colorImages: {
      "Tím Cobalt":    "/images/products/samsung-galaxy-s26/tim_cobalt.jpg",
      "Xanh Sky Blue": "/images/products/samsung-galaxy-s26/xanh_sky_blue.jpg",
      "Đen Classic":   "/images/products/samsung-galaxy-s26/den_classic.jpg",
      "Trắng Classic": "/images/products/samsung-galaxy-s26/trang_classic.jpg",
      "Bạc Shadow":    "/images/products/samsung-galaxy-s26/bac_shadow.jpg",
      "Vàng Hồng":     "/images/products/samsung-galaxy-s26/vang_hong.jpg",
    },
    inStock: true, featured: false,
    specs: "10-core 3.8GHz | 6.3\" AMOLED 120Hz | 50MP | 12GB RAM | Wi-Fi 7",
    detailedSpecs: DS(
      ["Chip xử lý", "Exynos 2600 (2nm), 10 nhân tốc độ 3.8GHz"],
      ["Màn hình", "6.3\" Dynamic AMOLED 2X FHD+ 2340×1080 120Hz, 2600nit Peak"],
      ["RAM / ROM", "12GB / 256 hoặc 512GB UFS 4.0"],
      ["Camera sau", "50MP Wide f/1.8 | 50MP Tele 2x | 12MP Ultra Wide | Quay 8K@30fps"],
      ["Camera trước", "12MP f/2.2, quay 4K@60fps"],
      ["Pin", "4300mAh, sạc 30W, sạc không dây 15W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3.2, 5G"],
      ["Hệ điều hành", "Android 16 | One UI 8"],
      ["Kích thước", "150.4×73.0×7.2mm | 163g"]
    ),
    features: ["5g", "nfc", "ai", "ip67"],
  },
  {
    id: 13, name: "Samsung Galaxy S25 Ultra", slug: "samsung-galaxy-s25-ultra",
    price: 25_490_000, originalPrice: 30_490_000,
    category: "dien-thoai", brand: "samsung",
    description: "Galaxy S25 Ultra – Snapdragon 8 Elite For Galaxy, Dynamic AMOLED 2X, camera 200MP+50MP+50MP+10MP, S Pen, Android 15, RAM 12GB.",
    image: "/images/products/samsung-galaxy-s25-ultra/xanh_titan.jpg",
    rating: 4.8, reviewCount: 3120, badge: "sale",
    variants: ["12GB/256GB", "12GB/512GB"],
    variantPrices: {
      "12GB/256GB": 25_490_000,
      "12GB/512GB": 30_490_000,
    },
    colors: ["Xanh Titan", "Đen Titan", "Xám Titan", "Bạc Titan"],
    colorImages: {
      "Xanh Titan": "/images/products/samsung-galaxy-s25-ultra/xanh_titan.jpg",
      "Đen Titan":  "/images/products/samsung-galaxy-s25-ultra/den_titan.jpg",
      "Xám Titan":  "/images/products/samsung-galaxy-s25-ultra/xam_titan.jpg",
      "Bạc Titan":  "/images/products/samsung-galaxy-s25-ultra/bac_titan.jpg",
    },
    inStock: true, featured: true,
    specs: "Snapdragon 8 Elite | Dynamic AMOLED 2X | 200MP | S Pen | Android 15",
    detailedSpecs: DS(
      ["Chip xử lý", "Snapdragon 8 Elite For Galaxy (3nm), tốc độ 4.47GHz"],
      ["Màn hình", "6.9\" Dynamic AMOLED 2X QHD+ 3088×1440 120Hz, 2600nit Peak, Always-On"],
      ["RAM / ROM", "12GB / 256 hoặc 512GB"],
      ["Camera sau", "200MP Wide f/1.7 OIS | 50MP Tele 5x f/3.4 OIS | 50MP Tele 3x f/2.6 | 10MP Ultra Wide | Quay 8K@30fps"],
      ["Camera trước", "12MP f/2.2, quay 4K@60fps"],
      ["S Pen", "S Pen tích hợp, độ trễ 2.8ms"],
      ["Pin", "5000mAh, sạc 45W, không dây 15W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3.2, 5G"],
      ["Hệ điều hành", "Android 15 | One UI 7"],
      ["Kích thước", "162.8×78.9×8.2mm | 218g"]
    ),
    features: ["5g", "nfc", "ai", "ip68", "s-pen"],
  },
  {
    id: 14, name: "Samsung Galaxy S25+", slug: "samsung-galaxy-s25-plus",
    price: 21_700_000, originalPrice: 25_700_000,
    category: "dien-thoai", brand: "samsung",
    description: "Galaxy S25+ với Snapdragon 8 Elite For Galaxy, Dynamic AMOLED 2X, camera 50MP+12MP+10MP, selfie 12MP, quay 8K, RAM 12GB, Android 15.",
    image: "/images/products/samsung-galaxy-s25-plus/xanh_navy.webp",
    rating: 4.7, reviewCount: 1650, badge: "sale",
    variants: ["12GB/256GB", "12GB/512GB"],
    variantPrices: {
      "12GB/256GB": 21_700_000,
      "12GB/512GB": 24_490_000,
    },
    colors: ["Xanh Navy", "Xanh Icy", "Bạc Shadow", "Xanh Mint", "Đen Ocean", "Đỏ Coral", "Vàng Rose"],
    colorImages: {
      "Xanh Navy":  "/images/products/samsung-galaxy-s25-plus/xanh_navy.webp",
      "Xanh Icy":   "/images/products/samsung-galaxy-s25-plus/xanh_icy.webp",
      "Bạc Shadow": "/images/products/samsung-galaxy-s25-plus/bac_shadow.webp",
      "Xanh Mint":  "/images/products/samsung-galaxy-s25-plus/xanh_mint.webp",
      "Đen Ocean":  "/images/products/samsung-galaxy-s25-plus/den_ocean.webp",
      "Đỏ Coral":   "/images/products/samsung-galaxy-s25-plus/do_coral.webp",
      "Vàng Rose":  "/images/products/samsung-galaxy-s25-plus/vang_rose.webp",
    },
    inStock: true, featured: false,
    specs: "Snapdragon 8 Elite | AMOLED 2X | 50MP+12MP+10MP | 8K | 12GB RAM",
    detailedSpecs: DS(
      ["Chip xử lý", "Snapdragon 8 Elite For Galaxy (3nm), tốc độ 4.47GHz"],
      ["Màn hình", "6.7\" Dynamic AMOLED 2X FHD+ 2340×1080 120Hz, 2600nit Peak"],
      ["RAM / ROM", "12GB / 256 hoặc 512GB"],
      ["Camera sau", "50MP Wide f/1.7 OIS | 12MP Ultra Wide f/2.2 | 10MP Tele 3x f/2.4 | Quay 8K@30fps"],
      ["Camera trước", "12MP f/2.2, quay 4K@60fps"],
      ["Pin", "4900mAh, sạc 45W, không dây 15W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3.2, 5G"],
      ["Hệ điều hành", "Android 15 | One UI 7"],
      ["Kích thước", "158.5×75.8×7.3mm | 196g"]
    ),
    features: ["5g", "nfc", "ai", "ip67"],
  },
  {
    id: 15, name: "Samsung Galaxy S25", slug: "samsung-galaxy-s25",
    price: 16_690_000, originalPrice: 20_690_000,
    category: "dien-thoai", brand: "samsung",
    description: "Galaxy S25 – 6.2\" Dynamic AMOLED 2X 120Hz, Snapdragon 8 Elite 4.47GHz, camera 50MP+10MP+12MP, selfie 12MP, NFC, pin 4000mAh, Android 15.",
    image: "/images/products/samsung-galaxy-s25/xanh_navy.webp",
    rating: 4.7, reviewCount: 2890, badge: "sale",
    variants: ["12GB/256GB", "12GB/512GB"],
    variantPrices: {
      "12GB/256GB": 16_690_000,
      "12GB/512GB": 22_580_000,
    },
    colors: ["Xanh Navy", "Xanh Icy", "Bạc Shadow", "Xanh Mint", "Đen Ocean", "Đỏ Coral", "Vàng Rose"],
    colorImages: {
      "Xanh Navy":  "/images/products/samsung-galaxy-s25/xanh_navy.webp",
      "Xanh Icy":   "/images/products/samsung-galaxy-s25/xanh_icy.webp",
      "Bạc Shadow": "/images/products/samsung-galaxy-s25/bac_shadow.webp",
      "Xanh Mint":  "/images/products/samsung-galaxy-s25/xanh_mint.webp",
      "Đen Ocean":  "/images/products/samsung-galaxy-s25/den_ocean.webp",
      "Đỏ Coral":   "/images/products/samsung-galaxy-s25/do_coral.webp",
      "Vàng Rose":  "/images/products/samsung-galaxy-s25/vang_rose.webp",
    },
    inStock: true, featured: false,
    specs: "Snapdragon 8 Elite | 6.2\" AMOLED 120Hz | 50MP | 4000mAh | 12GB RAM",
    detailedSpecs: DS(
      ["Chip xử lý", "Snapdragon 8 Elite For Galaxy (3nm), tốc độ 4.47GHz"],
      ["Màn hình", "6.2\" Dynamic AMOLED 2X FHD+ 2340×1080 120Hz, 2600nit Peak"],
      ["RAM / ROM", "12GB / 256 hoặc 512GB"],
      ["Camera sau", "50MP Wide f/1.8 OIS | 10MP Tele 3x f/2.4 | 12MP Ultra Wide f/2.2 | Quay 8K@30fps"],
      ["Camera trước", "12MP f/2.2, quay 4K@60fps"],
      ["Pin", "4000mAh, sạc 25W, không dây 15W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3.2, 5G"],
      ["Hệ điều hành", "Android 15 | One UI 7"],
      ["Kích thước", "146.9×70.5×7.2mm | 162g"]
    ),
    features: ["5g", "nfc", "ai", "ip67"],
  },

  /* ── TABLET – APPLE (id 16–19) ── */
  {
    id: 16, name: "iPad Pro M5", slug: "ipad-pro-m5",
    price: 28_190_000, originalPrice: 31_190_000,
    category: "tablet", brand: "apple",
    description: "iPad Pro M5 – chip M5 mạnh nhất Apple, Ultra Retina XDR OLED 13\" 120Hz, Wi-Fi 7, Bluetooth 6.0, USB-C 4 Thunderbolt, 5G, hỗ trợ Apple Pencil Pro & Magic Keyboard.",
    image: "/images/products/ipad-pro-m5/bac.jpg",
    rating: 4.9, reviewCount: 1340, badge: "new",
    variants: ["Wi-Fi 256GB", "Wi-Fi 512GB", "Wi-Fi 1TB", "Wi-Fi 2TB", "5G 256GB", "5G 512GB", "5G 1TB", "5G 2TB"],
    variantPrices: {
      "Wi-Fi 256GB": 28_190_000,
      "Wi-Fi 512GB": 34_190_000,
      "Wi-Fi 1TB":   45_390_000,
      "Wi-Fi 2TB":   57_790_000,
      "5G 256GB":    34_590_000,
      "5G 512GB":    41_190_000,
      "5G 1TB":      52_390_000,
      "5G 2TB":      63_590_000,
    },
    colors: ["Bạc", "Đen Không Gian"],
    colorImages: {
      "Bạc":          "/images/products/ipad-pro-m5/bac.jpg",
      "Đen Không Gian":"/images/products/ipad-pro-m5/den_khong_gian.jpg",
    },
    inStock: true, featured: true,
    specs: "Apple M5 | 11\"-13\" OLED 120Hz | Wi-Fi 7 | USB-C 4 | Apple Pencil Pro",
    detailedSpecs: DS(
      ["Chip xử lý", "Apple M5 (3nm) – 10 nhân CPU, 10 nhân GPU, 16GB/32GB RAM"],
      ["Màn hình", "11\" Ultra Retina XDR OLED Tandem 2420×1668 120Hz ProMotion, 1000nit SDR, 1600nit HDR"],
      ["Camera sau", "12MP Wide f/1.8 Center Stage, 10MP Ultra Wide"],
      ["Camera trước", "12MP Ultra Wide f/2.4 Center Stage, Landscape"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 6.0, USB-C 4 (Thunderbolt 4), 5G (bản 5G)"],
      ["Hệ điều hành", "iPadOS 18"],
      ["Bút", "Apple Pencil Pro (hỗ trợ), Apple Pencil USB-C"],
      ["Bàn phím", "Magic Keyboard cho iPad Pro M5, Smart Keyboard Folio"],
      ["Kích thước", "247.6×179.5×5.1mm | 444g (Wi-Fi)"],
      ["Màu sắc", "Bạc, Đen Không Gian"]
    ),
    variantSpecs: {
      /* ── 11\" variants ─────────────────────────── */
      "Wi-Fi 256GB": DS(
        ["Màn hình", "11\" Ultra Retina XDR OLED Tandem 2420×1668 264ppi 120Hz ProMotion, 1000nit SDR, 1600nit HDR"],
        ["Chip xử lý", "Apple M5 (3nm) – 10 nhân CPU, 10 nhân GPU, 16GB RAM"],
        ["Kích thước", "247.6×179.5×5.1mm | 444g (Wi-Fi)"]
      ),
      "Wi-Fi 512GB": DS(
        ["Màn hình", "11\" Ultra Retina XDR OLED Tandem 2420×1668 264ppi 120Hz ProMotion, 1000nit SDR, 1600nit HDR"],
        ["Chip xử lý", "Apple M5 (3nm) – 10 nhân CPU, 10 nhân GPU, 16GB RAM"],
        ["Kích thước", "247.6×179.5×5.1mm | 444g (Wi-Fi)"]
      ),
      "Wi-Fi 1TB": DS(
        ["Màn hình", "11\" Ultra Retina XDR OLED Tandem 2420×1668 264ppi 120Hz ProMotion, 1000nit SDR, 1600nit HDR"],
        ["Chip xử lý", "Apple M5 (3nm) – 10 nhân CPU, 10 nhân GPU, 32GB RAM"],
        ["Kích thước", "247.6×179.5×5.1mm | 444g (Wi-Fi)"]
      ),
      "Wi-Fi 2TB": DS(
        ["Màn hình", "11\" Ultra Retina XDR OLED Tandem 2420×1668 264ppi 120Hz ProMotion, 1000nit SDR, 1600nit HDR"],
        ["Chip xử lý", "Apple M5 (3nm) – 10 nhân CPU, 10 nhân GPU, 32GB RAM"],
        ["Kích thước", "247.6×179.5×5.1mm | 444g (Wi-Fi)"]
      ),
      "5G 256GB": DS(
        ["Màn hình", "11\" Ultra Retina XDR OLED Tandem 2420×1668 264ppi 120Hz ProMotion, 1000nit SDR, 1600nit HDR"],
        ["Chip xử lý", "Apple M5 (3nm) – 10 nhân CPU, 10 nhân GPU, 16GB RAM"],
        ["Kích thước", "247.6×179.5×5.1mm | 460g (5G)"]
      ),
      "5G 512GB": DS(
        ["Màn hình", "11\" Ultra Retina XDR OLED Tandem 2420×1668 264ppi 120Hz ProMotion, 1000nit SDR, 1600nit HDR"],
        ["Chip xử lý", "Apple M5 (3nm) – 10 nhân CPU, 10 nhân GPU, 16GB RAM"],
        ["Kích thước", "247.6×179.5×5.1mm | 460g (5G)"]
      ),
      "5G 1TB": DS(
        ["Màn hình", "11\" Ultra Retina XDR OLED Tandem 2420×1668 264ppi 120Hz ProMotion, 1000nit SDR, 1600nit HDR"],
        ["Chip xử lý", "Apple M5 (3nm) – 10 nhân CPU, 10 nhân GPU, 32GB RAM"],
        ["Kích thước", "247.6×179.5×5.1mm | 460g (5G)"]
      ),
      "5G 2TB": DS(
        ["Màn hình", "11\" Ultra Retina XDR OLED Tandem 2420×1668 264ppi 120Hz ProMotion, 1000nit SDR, 1600nit HDR"],
        ["Chip xử lý", "Apple M5 (3nm) – 10 nhân CPU, 10 nhân GPU, 32GB RAM"],
        ["Kích thước", "247.6×179.5×5.1mm | 460g (5G)"]
      ),
    },
    videos: [
      "/videos/ipad-pro-m5/video1.mp4",
      "/videos/ipad-pro-m5/video2.mp4",
      "/videos/ipad-pro-m5/video3.mp4",
    ],
  },
  {
    id: 17, name: "iPad Air M4", slug: "ipad-air-m4",
    price: 16_689_000, originalPrice: 19_689_000,
    category: "tablet", brand: "apple",
    description: "iPad Air M4 – chip M4 8 lõi, Liquid Retina 11\" 2360×1640, camera 12MP+12MP Center Stage, RAM 12GB, iPadOS 26, hỗ trợ Apple Pencil Pro.",
    image: "/images/products/ipad-air-m4/anh_sao.jpg",
    rating: 4.8, reviewCount: 2110, badge: "sale",
    variants: ["11\" Wi-Fi 128GB", "11\" Wi-Fi 256GB", "11\" Wi-Fi 512GB", "11\" Wi-Fi 1TB", "13\" Wi-Fi 128GB", "13\" Wi-Fi 256GB", "13\" Wi-Fi 512GB", "13\" Wi-Fi 1TB"],
    variantPrices: {
      "11\" Wi-Fi 128GB": 16_689_000,
      "11\" Wi-Fi 256GB": 19_489_000,
      "11\" Wi-Fi 512GB": 25_089_000,
      "11\" Wi-Fi 1TB":   30_689_000,
      "13\" Wi-Fi 128GB": 22_089_000,
      "13\" Wi-Fi 256GB": 24_889_000,
      "13\" Wi-Fi 512GB": 30_489_000,
      "13\" Wi-Fi 1TB":   36_089_000,
    },
    colors: ["Ánh Sao", "Tím", "Xanh Dương", "Xanh Không Gian"],
    colorImages: {
      "Ánh Sao":       "/images/products/ipad-air-m4/anh_sao.jpg",
      "Tím":           "/images/products/ipad-air-m4/tim.jpg",
      "Xanh Dương":    "/images/products/ipad-air-m4/xanh_duong.jpg",
      "Xanh Không Gian":"/images/products/ipad-air-m4/xanh_khong_gian.jpg",
    },
    inStock: true, featured: true,
    specs: "Apple M4 | 11\"-13\" Liquid Retina | 8GB/16GB RAM | Apple Pencil Pro | iPadOS 26",
    detailedSpecs: DS(
      ["Chip xử lý", "Apple M4 (3nm) – 10 nhân CPU, 10 nhân GPU, 8GB RAM"],
      ["Màn hình", "11\" Liquid Retina 2360×1640 264ppi 60Hz True Tone P3"],
      ["Camera sau", "12MP Wide f/1.8 Center Stage"],
      ["Camera trước", "12MP Ultra Wide f/2.4 Center Stage, Landscape"],
      ["Kết nối", "Wi-Fi 6E, Bluetooth 5.3, USB-C 3 (10Gbps), 5G (bản 5G)"],
      ["Hệ điều hành", "iPadOS 26"],
      ["Bút", "Apple Pencil Pro, Apple Pencil USB-C"],
      ["Kích thước", "247.6×178.5×6.1mm | 461g (Wi-Fi)"],
      ["Màu sắc", "Ánh Sao, Tím, Xanh Dương, Xanh Không Gian"]
    ),
    variantSpecs: {
      /* ── 11\" variants ─────────────────────────── */
      "11\" Wi-Fi 128GB": DS(
        ["Chip xử lý", "Apple M4 (3nm) – 10 nhân CPU, 10 nhân GPU, 8GB RAM"],
        ["Màn hình", "11\" Liquid Retina 2360×1640 264ppi 60Hz True Tone P3"],
        ["Kích thước", "247.6×178.5×6.1mm | 461g (Wi-Fi)"]
      ),
      "11\" Wi-Fi 256GB": DS(
        ["Chip xử lý", "Apple M4 (3nm) – 10 nhân CPU, 10 nhân GPU, 8GB RAM"],
        ["Màn hình", "11\" Liquid Retina 2360×1640 264ppi 60Hz True Tone P3"],
        ["Kích thước", "247.6×178.5×6.1mm | 461g (Wi-Fi)"]
      ),
      "11\" Wi-Fi 512GB": DS(
        ["Chip xử lý", "Apple M4 (3nm) – 10 nhân CPU, 10 nhân GPU, 8GB RAM"],
        ["Màn hình", "11\" Liquid Retina 2360×1640 264ppi 60Hz True Tone P3"],
        ["Kích thước", "247.6×178.5×6.1mm | 461g (Wi-Fi)"]
      ),
      "11\" Wi-Fi 1TB": DS(
        ["Chip xử lý", "Apple M4 (3nm) – 10 nhân CPU, 10 nhân GPU, 8GB RAM"],
        ["Màn hình", "11\" Liquid Retina 2360×1640 264ppi 60Hz True Tone P3"],
        ["Kích thước", "247.6×178.5×6.1mm | 461g (Wi-Fi)"]
      ),
      /* ── 13\" variants ─────────────────────────── */
      "13\" Wi-Fi 128GB": DS(
        ["Chip xử lý", "Apple M4 (3nm) – 10 nhân CPU, 10 nhân GPU, 16GB RAM"],
        ["Màn hình", "13\" Liquid Retina 2732×2048 264ppi 60Hz True Tone P3"],
        ["Kích thước", "281.6×214.9×6.1mm | 617g (Wi-Fi)"]
      ),
      "13\" Wi-Fi 256GB": DS(
        ["Chip xử lý", "Apple M4 (3nm) – 10 nhân CPU, 10 nhân GPU, 16GB RAM"],
        ["Màn hình", "13\" Liquid Retina 2732×2048 264ppi 60Hz True Tone P3"],
        ["Kích thước", "281.6×214.9×6.1mm | 617g (Wi-Fi)"]
      ),
      "13\" Wi-Fi 512GB": DS(
        ["Chip xử lý", "Apple M4 (3nm) – 10 nhân CPU, 10 nhân GPU, 16GB RAM"],
        ["Màn hình", "13\" Liquid Retina 2732×2048 264ppi 60Hz True Tone P3"],
        ["Kích thước", "281.6×214.9×6.1mm | 617g (Wi-Fi)"]
      ),
      "13\" Wi-Fi 1TB": DS(
        ["Chip xử lý", "Apple M4 (3nm) – 10 nhân CPU, 10 nhân GPU, 16GB RAM"],
        ["Màn hình", "13\" Liquid Retina 2732×2048 264ppi 60Hz True Tone P3"],
        ["Kích thước", "281.6×214.9×6.1mm | 617g (Wi-Fi)"]
      ),
    },
    variantDescriptions: {
      "11\" Wi-Fi 128GB": "iPad Air M4 11\" – chip M4 10 nhân, Liquid Retina 11\" 2360×1640 264ppi, 8GB RAM, 128GB, camera 12MP+12MP Center Stage, Apple Pencil Pro, iPadOS 26. Nhỏ gọn, siêu mỏng 6.1mm, nặng chỉ 461g.",
      "11\" Wi-Fi 256GB": "iPad Air M4 11\" – chip M4 10 nhân, Liquid Retina 11\" 2360×1640 264ppi, 8GB RAM, 256GB, camera 12MP+12MP Center Stage, Apple Pencil Pro, iPadOS 26. Nhỏ gọn, siêu mỏng 6.1mm, nặng chỉ 461g.",
      "11\" Wi-Fi 512GB": "iPad Air M4 11\" – chip M4 10 nhân, Liquid Retina 11\" 2360×1640 264ppi, 8GB RAM, 512GB, camera 12MP+12MP Center Stage, Apple Pencil Pro, iPadOS 26. Nhỏ gọn, siêu mỏng 6.1mm, nặng chỉ 461g.",
      "11\" Wi-Fi 1TB":   "iPad Air M4 11\" – chip M4 10 nhân, Liquid Retina 11\" 2360×1640 264ppi, 8GB RAM, 1TB, camera 12MP+12MP Center Stage, Apple Pencil Pro, iPadOS 26. Nhỏ gọn, siêu mỏng 6.1mm, nặng chỉ 461g.",
      "13\" Wi-Fi 128GB": "iPad Air M4 13\" – chip M4 10 nhân, Liquid Retina 13\" 2732×2048 264ppi rộng hơn, 16GB RAM, 128GB, camera 12MP+12MP Center Stage, Apple Pencil Pro, iPadOS 26. Màn hình lớn cho công việc, nặng 617g.",
      "13\" Wi-Fi 256GB": "iPad Air M4 13\" – chip M4 10 nhân, Liquid Retina 13\" 2732×2048 264ppi rộng hơn, 16GB RAM, 256GB, camera 12MP+12MP Center Stage, Apple Pencil Pro, iPadOS 26. Màn hình lớn cho công việc, nặng 617g.",
      "13\" Wi-Fi 512GB": "iPad Air M4 13\" – chip M4 10 nhân, Liquid Retina 13\" 2732×2048 264ppi rộng hơn, 16GB RAM, 512GB, camera 12MP+12MP Center Stage, Apple Pencil Pro, iPadOS 26. Màn hình lớn cho công việc, nặng 617g.",
      "13\" Wi-Fi 1TB":   "iPad Air M4 13\" – chip M4 10 nhân, Liquid Retina 13\" 2732×2048 264ppi rộng hơn, 16GB RAM, 1TB, camera 12MP+12MP Center Stage, Apple Pencil Pro, iPadOS 26. Màn hình lớn cho công việc, nặng 617g.",
    },
  },
  {
    id: 18, name: "iPad Gen 11 (2025)", slug: "ipad-gen-11",
    price: 9_290_000, originalPrice: 11_290_000,
    category: "tablet", brand: "apple",
    description: "iPad Gen 11 (2025) – chip A16 Bionic, Liquid Retina 11\" 2360×1640 264ppi True Tone, RAM 6GB, camera 12MP+12MP Center Stage, Wi-Fi 6, USB-C, iPadOS 26.",
    image: "/images/products/ipad-gen-11/trang.png",
    rating: 4.7, reviewCount: 4320, badge: "sale",
    variants: ["Wi-Fi 128GB", "Wi-Fi 256GB", "5G 128GB", "5G 256GB", "5G 512GB"],
    variantPrices: {
      "Wi-Fi 128GB": 9_290_000,
      "Wi-Fi 256GB": 12_390_000,
      "5G 128GB":    13_490_000,
      "5G 256GB":    16_490_000,
      "5G 512GB":    21_390_000,
    },
    colors: ["Tím", "Trắng", "Vàng", "Xanh"],
    colorImages: {
      "Tím":   "/images/products/ipad-gen-11/tim.png",
      "Trắng": "/images/products/ipad-gen-11/trang.png",
      "Vàng":  "/images/products/ipad-gen-11/vang.png",
      "Xanh":  "/images/products/ipad-gen-11/xanh.png",
    },
    inStock: true, featured: false,
    specs: "A16 Bionic | 11\" Liquid Retina 264ppi | 6GB RAM | Wi-Fi 6 | USB-C",
    detailedSpecs: DS(
      ["Chip xử lý", "Apple A16 Bionic (4nm) – 6 nhân CPU, 5 nhân GPU, 6GB RAM"],
      ["Màn hình", "11\" Liquid Retina 2360×1640 264ppi 60Hz True Tone P3"],
      ["Camera sau", "12MP Wide f/1.8 Center Stage"],
      ["Camera trước", "12MP Ultra Wide f/2.4 Center Stage, Landscape"],
      ["Kết nối", "Wi-Fi 6, Bluetooth 5.3, USB-C 2 (480Mbps), 5G (bản 5G)"],
      ["Hệ điều hành", "iPadOS 26"],
      ["Bú t", "Apple Pencil USB-C"],
      ["Kích thước", "248.6×179.5×6.9mm | 477g (Wi-Fi)"],
      ["Màu sắc", "Tím, Trắng, Vàng, Xanh"]
    ),
  },
  {
    id: 19, name: "iPad mini A17 Pro", slug: "ipad-mini-a17-pro",
    price: 13_090_000, originalPrice: 15_090_000,
    category: "tablet", brand: "apple",
    description: "iPad mini A17 Pro – chip A17 Pro 6 lõi, Liquid Retina 8.3\" 2266×1488 True Tone, camera 12MP Wide+12MP UW, Apple Pencil Pro, 5G, iPadOS 18.",
    image: "/images/products/ipad-mini-a17-pro/bac.webp",
    rating: 4.8, reviewCount: 1560, badge: "new",
    variants: ["Wi-Fi 128GB", "Wi-Fi 256GB", "Wi-Fi 512GB"],
    variantPrices: {
      "Wi-Fi 128GB": 13_090_000,
      "Wi-Fi 256GB": 16_290_000,
      "Wi-Fi 512GB": 20_490_000,
    },
    colors: ["Bạc", "Tím", "Vàng Gold", "Xanh"],
    colorImages: {
      "Bạc":      "/images/products/ipad-mini-a17-pro/bac.webp",
      "Tím":      "/images/products/ipad-mini-a17-pro/tim.webp",
      "Vàng Gold":"/images/products/ipad-mini-a17-pro/vang_gold.webp",
      "Xanh":     "/images/products/ipad-mini-a17-pro/xanh.webp",
    },
    inStock: true, featured: false,
    specs: "A17 Pro | 8.3\" Liquid Retina | Apple Pencil Pro | 5G | iPadOS 18",
    detailedSpecs: DS(
      ["Chip xử lý", "Apple A17 Pro (3nm) – 6 nhân CPU, 6 nhân GPU, 8GB RAM"],
      ["Màn hình", "8.3\" Liquid Retina 2266×1488 326ppi 60Hz True Tone P3"],
      ["Camera sau", "12MP Wide f/1.8 Center Stage"],
      ["Camera trước", "12MP Ultra Wide f/2.4, Landscape"],
      ["Kết nối", "Wi-Fi 6E, Bluetooth 5.3, USB-C 3 (10Gbps), 5G (bản 5G)"],
      ["Hệ điều hành", "iPadOS 18"],
      ["Bú t", "Apple Pencil Pro, Apple Pencil USB-C"],
      ["Kích thước", "195.4×134.8×6.3mm | 293g (Wi-Fi)"],
      ["Màu sắc", "Bạc, Tím, Vàng Gold, Xanh"]
    ),
  },

  /* ── TABLET – XIAOMI (id 20–23) ── */
  {
    id: 20, name: "Xiaomi Pad 8 Pro", slug: "xiaomi-pad-8-pro",
    price: 15_190_000, originalPrice: 17_190_000,
    category: "tablet", brand: "xiaomi",
    description: "Xiaomi Pad 8 Pro – Snapdragon 8 Elite, IPS LCD 11.2\" 3200×2136 144Hz 12-bit HDR10, RAM 8GB, camera 50MP+32MP, NFC, pin 9200mAh, Android 16.",
    image: "/images/products/xiaomi-pad-8-pro/den.png",
    rating: 4.8, reviewCount: 870, badge: "new",
    variants: ["8GB/128GB"],
    variantPrices: {
      "8GB/128GB": 15_190_000,
    },
    colors: ["Đen", "Xanh Biển", "Xanh Lá"],
    colorImages: {
      "Đen":      "/images/products/xiaomi-pad-8-pro/den.png",
      "Xanh Biển":"/images/products/xiaomi-pad-8-pro/xanh_bien.png",
      "Xanh Lá":  "/images/products/xiaomi-pad-8-pro/xanh_la.png",
    },
    inStock: true, featured: true,
    specs: "Snapdragon 8 Elite | 11.2\" 144Hz 12-bit | 50MP+32MP | NFC | 9200mAh",
    detailedSpecs: DS(
      ["Chip xử lý", "Snapdragon 8 Elite (3nm), 8 nhân, tốc độ 4.32GHz"],
      ["Màn hình", "11.2\" IPS LCD 3200×2136 144Hz 12-bit HDR10, Delta E≤1, 550nit"],
      ["RAM / ROM", "8GB LPDDR5X / 128GB UFS 4.0"],
      ["Camera sau", "50MP Wide f/1.8 | 32MP Ultra Wide f/2.2"],
      ["Camera trước", "32MP f/2.0, 4K@30fps"],
      ["Pin", "9200mAh, sạc 67W"],
      ["Kết nối", "Wi-Fi 7 (2x2 MIMO), Bluetooth 5.4, NFC, USB-C 3.2, 5G"],
      ["Hệ điều hành", "Android 16 | HyperOS 3"],
      ["Bú t / Bàn phím", "Xiaomi Focus Pen 3 (hỗ trợ)"],
      ["Kích thước", "254.8×165.3×6.8mm | 520g"]
    ),
  },
  {
    id: 21, name: "Xiaomi Pad 8", slug: "xiaomi-pad-8",
    price: 10_690_000, originalPrice: 12_690_000,
    category: "tablet", brand: "xiaomi",
    description: "Xiaomi Pad 8 – Snapdragon 8s Gen 4, LCD 11.2\" 144Hz HDR10 Dolby Vision, RAM 8GB, camera 13MP+8MP, NFC, pin 9200mAh, Android 16.",
    image: "/images/products/xiaomi-pad-8/xam.png",
    rating: 4.7, reviewCount: 630, badge: "sale",
    variants: ["8GB/128GB"],
    variantPrices: {
      "8GB/128GB": 10_690_000,
    },
    colors: ["Xám", "Xanh Dương", "Xanh Lá"],
    colorImages: {
      "Xám":       "/images/products/xiaomi-pad-8/xam.png",
      "Xanh Dương":"/images/products/xiaomi-pad-8/xanh_duong.png",
      "Xanh Lá":   "/images/products/xiaomi-pad-8/xanh_la.png",
    },
    inStock: true, featured: false,
    specs: "Snapdragon 8s Gen 4 | 11.2\" 144Hz | 13MP | NFC | 9200mAh",
    detailedSpecs: DS(
      ["Chip xử lý", "Snapdragon 8s Gen 4 (4nm), tốc độ 3.2GHz"],
      ["Màn hình", "11.2\" IPS LCD 3200×2136 144Hz HDR10 Dolby Vision, 500nit"],
      ["RAM / ROM", "8GB / 128GB UFS 3.1"],
      ["Camera sau", "13MP Wide f/2.0 | 8MP Ultra Wide f/2.2"],
      ["Camera trước", "8MP f/2.0, 1080p"],
      ["Pin", "9200mAh, sạc 45W"],
      ["Kết nối", "Wi-Fi 6E (2x2 MIMO), Bluetooth 5.3, NFC, USB-C 2.0, 5G"],
      ["Hệ điều hành", "Android 16 | HyperOS 3"],
      ["Kích thước", "253.95×165.3×6.8mm | 519g"]
    ),
  },
  {
    id: 22, name: "Xiaomi Pad 7 Pro", slug: "xiaomi-pad-7-pro",
    price: 12_990_000, originalPrice: 14_990_000,
    category: "tablet", brand: "xiaomi",
    description: "Xiaomi Pad 7 Pro – Snapdragon 8s Gen 3 3GHz, IPS LCD 11.2\" 144Hz, RAM 8GB, camera 50MP+32MP, Wi-Fi 7, HyperOS 2. Màu: Xanh Dương, Xám, Xanh Lá.",
    image: "/images/products/xiaomi-pad-7-pro/xanh_duong.png",
    rating: 4.7, reviewCount: 980, badge: "sale",
    variants: ["256GB"],
    variantPrices: {
      "256GB": 12_990_000,
    },
    colors: ["Xanh Dương", "Xám", "Xanh Lá"],
    colorImages: {
      "Xanh Dương": "/images/products/xiaomi-pad-7-pro/xanh_duong.png",
      "Xám":        "/images/products/xiaomi-pad-7-pro/xam.png",
      "Xanh Lá":    "/images/products/xiaomi-pad-7-pro/xanh_la.png",
    },
    inStock: true, featured: false,
    specs: "Snapdragon 8s Gen 3 | 11.2\" IPS 144Hz | 50MP+32MP | Wi-Fi 7",
    detailedSpecs: DS(
      ["Chip xử lý", "Snapdragon 8s Gen 3 (4nm), tốc độ 3GHz"],
      ["Màn hình", "11.2\" IPS LCD 3200×2136 144Hz HDR10+, 900nit Peak"],
      ["RAM / ROM", "8GB / 256GB UFS 3.1"],
      ["Camera sau", "50MP Wide f/1.8 | 32MP Ultra Wide f/2.2"],
      ["Camera trước", "32MP f/2.0, 4K@30fps"],
      ["Pin", "8840mAh, sạc 67W"],
      ["Kết nối", "Wi-Fi 7 (2x2), Bluetooth 5.4, NFC, USB-C 3.2"],
      ["Hệ điều hành", "Android 15 | HyperOS 2"],
      ["Kích thước", "254.7×165.3×6.9mm | 515g"]
    ),
  },
  {
    id: 23, name: "Xiaomi Pad 7", slug: "xiaomi-pad-7",
    price: 8_600_000, originalPrice: 10_600_000,
    category: "tablet", brand: "xiaomi",
    description: "Xiaomi Pad 7 – Snapdragon 7+ Gen 3 2.8GHz, IPS LCD 11.2\" 144Hz, RAM 8GB, camera 13MP+8MP, Wi-Fi 6E, HyperOS 2. Lý tưởng học sinh sinh viên.",
    image: "/images/products/xiaomi-pad-7/den.jpg",
    rating: 4.6, reviewCount: 1450, badge: "sale",
    variants: ["128GB", "256GB"],
    variantPrices: {
      "128GB": 8_600_000,
      "256GB": 9_290_000,
    },
    colors: ["Đen", "Xanh Biển", "Xanh Lá"],
    colorImages: {
      "Đen":      "/images/products/xiaomi-pad-7/den.jpg",
      "Xanh Biển":"/images/products/xiaomi-pad-7/xanh_bien.jpg",
      "Xanh Lá":  "/images/products/xiaomi-pad-7/xanh_la.jpg",
    },
    inStock: true, featured: false,
    specs: "Snapdragon 7+ Gen 3 | 11.2\" 144Hz | 13MP | Wi-Fi 6E | HyperOS 2",
    detailedSpecs: DS(
      ["Chip xử lý", "Snapdragon 7+ Gen 3 (4nm), tốc độ 2.8GHz"],
      ["Màn hình", "11.2\" IPS LCD 3200×2136 144Hz HDR10+"],
      ["RAM / ROM", "8GB / 128 hoặc 256GB UFS 2.2"],
      ["Camera sau", "13MP Wide f/2.0 | 8MP Ultra Wide"],
      ["Camera trước", "8MP f/2.0, 1080p"],
      ["Pin", "8850mAh, sạc 45W"],
      ["Kết nối", "Wi-Fi 6E (2x2), Bluetooth 5.3, NFC, USB-C 2.0"],
      ["Hệ điều hành", "Android 15 | HyperOS 2"],
      ["Kích thước", "253.95×165.3×6.8mm | 525g"]
    ),
  },

  /* ── TABLET – SAMSUNG (id 24–25) ── */
  {
    id: 24, name: "Samsung Galaxy Tab S11 Ultra 5G", slug: "samsung-tab-s11-ultra-5g",
    price: 32_490_000, originalPrice: 37_490_000,
    category: "tablet", brand: "samsung",
    description: "Galaxy Tab S11 Ultra 5G – Dimensity 9400+, Dynamic AMOLED 2X 14.6\" 120Hz 1848×2960, RAM 12GB, camera 13MP+8MP+12MP, S Pen, pin 11600mAh, Android 16.",
    image: "/images/products/samsung-tab-s11-ultra-5g/bac.png",
    rating: 4.9, reviewCount: 760, badge: "new",
    variants: ["256GB", "1TB"],
    variantPrices: {
      "256GB": 32_490_000,
      "1TB":   44_990_000,
    },
    colors: ["Bạc", "Xám"],
    colorImages: {
      "Bạc": "/images/products/samsung-tab-s11-ultra-5g/bac.png",
      "Xám": "/images/products/samsung-tab-s11-ultra-5g/xam.jpg",
    },
    inStock: true, featured: true,
    specs: "Dimensity 9400+ | 14.6\" AMOLED 120Hz | S Pen | 5G | 11600mAh",
    detailedSpecs: DS(
      ["Chip xử lý", "Dimensity 9400+ (3nm), 12 nhân"],
      ["Màn hình", "14.6\" Dynamic AMOLED 2X 1848×2960 120Hz, 930nit, HDR10+"],
      ["RAM / ROM", "12GB / 256 hoặc 1TB UFS 4.0"],
      ["Camera sau", "13MP Wide f/2.0 | 8MP Ultra Wide f/2.4 | 12MP Tele 3x f/2.4"],
      ["Camera trước", "12MP f/2.4 Ultra Wide Center Stage"],
      ["S Pen", "S Pen trong hộp, độ trễ 2.8ms"],
      ["Pin", "11200mAh, sạc 45W, không dây 15W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3.2, 5G"],
      ["Hệ điều hành", "Android 16 | One UI 8"],
      ["Kích thước", "326.4×208.6×5.4mm | 732g (Wi-Fi)"]
    ),
  },
  {
    id: 25, name: "Samsung Galaxy Tab S11 5G", slug: "samsung-tab-s11-5g",
    price: 19_990_000, originalPrice: 23_990_000,
    category: "tablet", brand: "samsung",
    description: "Galaxy Tab S11 5G – Dimensity 9400+, Dynamic AMOLED 2X 11\" 120Hz WQXGA, RAM 12GB, camera 13MP+12MP, S Pen, pin 8400mAh, 5G, Android 16.",
    image: "/images/products/samsung-tab-s11-5g/bac.png",
    rating: 4.8, reviewCount: 1120, badge: "new",
    variants: ["128GB", "256GB"],
    variantPrices: {
      "128GB": 19_990_000,
      "256GB": 23_490_000,
    },
    colors: ["Bạc", "Xám"],
    colorImages: {
      "Bạc": "/images/products/samsung-tab-s11-5g/bac.png",
      "Xám": "/images/products/samsung-tab-s11-5g/xam.png",
    },
    inStock: true, featured: false,
    specs: "Dimensity 9400+ | 11\" AMOLED 120Hz | S Pen | 5G | 8400mAh",
    detailedSpecs: DS(
      ["Chip xử lý", "Dimensity 9400+ (3nm), 12 nhân"],
      ["Màn hình", "11\" Dynamic AMOLED 2X WQXGA 2000×2560 120Hz, 930nit, HDR10+"],
      ["RAM / ROM", "12GB / 128 hoặc 256GB UFS 4.0"],
      ["Camera sau", "13MP Wide f/2.0 | 12MP Ultra Wide f/2.4"],
      ["Camera trước", "12MP f/2.4 Ultra Wide Center Stage"],
      ["S Pen", "S Pen trong hộp, độ trễ 2.8ms"],
      ["Pin", "8400mAh, sạc 45W, không dây 15W"],
      ["Kết nối", "Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3.2, 5G"],
      ["Hệ điều hành", "Android 16 | One UI 8"],
      ["Kích thước", "267.0×172.0×5.8mm | 540g (Wi-Fi)"]
    ),
  },
];

/* ── Auto-normalize RAM specs ────────────────────────────
   Products using "RAM / ROM" combined label get a synthetic
   standalone "RAM" row (first) so the compare page and specs
   tab show RAM for ALL devices (Apple already has "RAM").
────────────────────────────────────────────────────────── */
products.forEach(p => {
  if (!p.detailedSpecs) return;
  const hasRAM    = p.detailedSpecs.some(s => s.label === "RAM");
  const ramRomRow = p.detailedSpecs.find(s => s.label === "RAM / ROM");
  if (!hasRAM && ramRomRow) {
    // Extract RAM: match "16GB LPDDR5X" or "12GB" at start, before any " /"
    const match = ramRomRow.value.match(/^(\d+GB(?:\s+\w+)*?)(?:\s*(?:\/|LPDDR\w*\s*\/|UFS))/);
    const ramPart = match ? match[1].trim() :
      // Fallback: just grab everything before the first " /" separator
      ramRomRow.value.replace(/\s*\/.*/, "").trim();
    p.detailedSpecs.unshift({ label: "RAM", value: ramPart });
  }
});


/* ── Danh mục ───────────────────────────────────────────── */
export const categories: Category[] = [
  { id: "all",        name: "Tất Cả",        icon: "🏪", count: products.length },
  { id: "dien-thoai", name: "Điện Thoại",    icon: "📱", count: products.filter(p => p.category === "dien-thoai").length },
  { id: "tablet",     name: "Máy Tính Bảng", icon: "📲", count: products.filter(p => p.category === "tablet").length },
];

/* ── Helper functions ────────────────────────────────────── */
export const getProductById = (id: number) => products.find(p => p.id === id);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductsByCategory = (category: string) =>
  category === "all" ? products : products.filter(p => p.category === category);
export const getFeaturedProducts = () => products.filter(p => p.featured);
export const searchProducts = (query: string) => {
  const q = query.toLowerCase();
  const matched = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.brand ?? "").toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.specs && p.specs.toLowerCase().includes(q))
  );
  // Sort by relevance: name/brand prefix match → name contains → rest
  return matched.sort((a, b) => {
    const aNameStart = a.name.toLowerCase().startsWith(q) ? 0 : a.name.toLowerCase().includes(q) ? 1 : 2;
    const bNameStart = b.name.toLowerCase().startsWith(q) ? 0 : b.name.toLowerCase().includes(q) ? 1 : 2;
    const aBrand = (a.brand ?? "").toLowerCase().startsWith(q) ? -1 : 0;
    const bBrand = (b.brand ?? "").toLowerCase().startsWith(q) ? -1 : 0;
    const aScore = Math.min(aNameStart, aBrand === -1 ? 0 : 3);
    const bScore = Math.min(bNameStart, bBrand === -1 ? 0 : 3);
    return aScore - bScore;
  });
};
