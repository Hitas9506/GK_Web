import type { Product, Category } from "./types";

/* ═══════════════════════════════════════════════════════════
   TechNext – Danh sách sản phẩm chính hãng
   
   📱 Điện Thoại:  Apple (5) | Xiaomi (4) | Samsung (6) = 15
   📲 Máy Tính Bảng: Apple (4) | Xiaomi (4) | Samsung (4) = 12
   🎧 Tai Nghe & Phụ Kiện: Sẽ bổ sung sau

   📁 Ảnh: /images/products/<slug>.jpg
═══════════════════════════════════════════════════════════ */

export const products: Product[] = [

  /* ══════════════════════════════════════════════════
     ĐIỆN THOẠI – APPLE  (id 1 – 5)
  ══════════════════════════════════════════════════ */
  {
    id: 1,
    name: "iPhone 17 Pro Max",
    slug: "iphone-17-pro-max",
    price: 34_990_000,
    originalPrice: 37_990_000,
    category: "dien-thoai",
    description:
      "iPhone 17 Pro Max – đỉnh cao công nghệ Apple với chip A19 Pro thế hệ mới, hệ thống camera 5-lens chuyên nghiệp 48MP 5x Tetraprism, màn hình Super Retina XDR 6.9\" ProMotion 120Hz, khung titan cao cấp và pin vượt trội 24h.",
    image: "/images/products/iphone-17-pro-max.jpg",
    rating: 4.9,
    reviewCount: 4120,
    badge: "hot",
    variants: ["256GB", "512GB", "1TB"],
    colors: ["Titan Sa Mạc", "Titan Tự Nhiên", "Titan Đen", "Titan Trắng"],
    inStock: true,
    featured: true,
    specs: "A19 Pro | 6.9\" Super Retina XDR | 48MP 5x | Titan | Pin 24h",
  },
  {
    id: 2,
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    price: 28_990_000,
    originalPrice: 31_990_000,
    category: "dien-thoai",
    description:
      "iPhone 17 Pro với chip A19 Pro, camera chính 48MP khẩu độ f/1.6, màn hình Super Retina XDR 6.3\" ProMotion 120Hz, khung titan siêu nhẹ. Apple Intelligence AI tích hợp toàn diện.",
    image: "/images/products/iphone-17-pro.jpg",
    rating: 4.9,
    reviewCount: 2870,
    badge: "new",
    variants: ["256GB", "512GB", "1TB"],
    colors: ["Titan Sa Mạc", "Titan Tự Nhiên", "Titan Đen", "Titan Trắng"],
    inStock: true,
    featured: true,
    specs: "A19 Pro | 6.3\" ProMotion | 48MP | Titan",
  },
  {
    id: 3,
    name: "iPhone 17",
    slug: "iphone-17",
    price: 22_990_000,
    originalPrice: 25_990_000,
    category: "dien-thoai",
    description:
      "iPhone 17 tiêu chuẩn với chip A19, camera chính 48MP được nâng cấp đáng kể, màn hình 6.1\" OLED 60Hz. Dynamic Island và Apple Intelligence. Thiết kế nhôm cao cấp mỏng nhất từ trước đến nay.",
    image: "/images/products/iphone-17.jpg",
    rating: 4.7,
    reviewCount: 1950,
    badge: "new",
    variants: ["128GB", "256GB", "512GB"],
    colors: ["Đen", "Trắng", "Hồng", "Xanh Lam", "Xanh Lục"],
    inStock: true,
    featured: false,
    specs: "A19 | 6.1\" OLED | 48MP | Dynamic Island",
  },
  {
    id: 4,
    name: "iPhone Air",
    slug: "iphone-air",
    price: 23_990_000,
    originalPrice: 26_990_000,
    category: "dien-thoai",
    description:
      "iPhone Air – mỏng nhất lịch sử Apple, chỉ 5.5mm. Chip A18, màn hình 6.6\" OLED, camera 48MP. Thiết kế nhôm hàng không vũ trụ siêu nhẹ chỉ 145g. Hoàn hảo cho ai yêu thích sự thanh lịch.",
    image: "/images/products/iphone-air.jpg",
    rating: 4.8,
    reviewCount: 1320,
    badge: "new",
    variants: ["128GB", "256GB", "512GB"],
    colors: ["Đen", "Trắng", "Hồng Gold", "Xanh Sky"],
    inStock: true,
    featured: true,
    specs: "A18 | 6.6\" OLED | 48MP | 5.5mm siêu mỏng | 145g",
  },
  {
    id: 5,
    name: "iPhone 17e",
    slug: "iphone-17e",
    price: 17_990_000,
    originalPrice: 19_990_000,
    category: "dien-thoai",
    description:
      "iPhone 17e – flagship tầm trung của Apple, chip A18, màn hình OLED 6.1\" 60Hz, camera 48MP OIS. Dynamic Island, USB-C, Apple Intelligence. Lựa chọn tốt nhất cho ngân sách hợp lý muốn trải nghiệm iOS.",
    image: "/images/products/iphone-17e.jpg",
    rating: 4.6,
    reviewCount: 2450,
    badge: "sale",
    variants: ["128GB", "256GB"],
    colors: ["Đen", "Trắng", "Xanh", "Đỏ (PRODUCT RED)"],
    inStock: true,
    featured: false,
    specs: "A18 | 6.1\" OLED | 48MP | Dynamic Island | USB-C",
  },

  /* ══════════════════════════════════════════════════
     ĐIỆN THOẠI – XIAOMI  (id 6 – 9)
  ══════════════════════════════════════════════════ */
  {
    id: 6,
    name: "Xiaomi 17 Ultra",
    slug: "xiaomi-17-ultra",
    price: 29_990_000,
    originalPrice: 32_990_000,
    category: "dien-thoai",
    description:
      "Xiaomi 17 Ultra – flagship đỉnh cao với camera Leica UltraPure, cảm biến 1 inch LYT-T, Snapdragon 8 Elite Gen 2, màn hình 2K AMOLED 144Hz, pin 6200mAh sạc nhanh 120W không dây 80W.",
    image: "/images/products/xiaomi-17-ultra.jpg",
    rating: 4.9,
    reviewCount: 1870,
    badge: "hot",
    variants: ["256GB", "512GB", "1TB"],
    colors: ["Đen Titan", "Trắng Ngọc", "Xanh Lục Rừng"],
    inStock: true,
    featured: true,
    specs: "Snapdragon 8 Elite Gen 2 | 6.8\" 2K AMOLED 144Hz | Leica 1\" | 6200mAh",
  },
  {
    id: 7,
    name: "Xiaomi 17",
    slug: "xiaomi-17",
    price: 22_990_000,
    originalPrice: 24_990_000,
    category: "dien-thoai",
    description:
      "Xiaomi 17 tiêu chuẩn với Snapdragon 8 Elite, màn AMOLED 6.3\" 120Hz, camera Leica 50MP OIS, pin 5200mAh sạc nhanh 90W. Thiết kế siêu mỏng 7.8mm, cân nặng 192g.",
    image: "/images/products/xiaomi-17.jpg",
    rating: 4.7,
    reviewCount: 980,
    badge: "new",
    variants: ["256GB", "512GB"],
    colors: ["Đen", "Trắng", "Xanh Biển"],
    inStock: true,
    featured: false,
    specs: "Snapdragon 8 Elite | 6.3\" AMOLED | Leica 50MP | 5200mAh | 7.8mm",
  },
  {
    id: 8,
    name: "Xiaomi 15 Ultra",
    slug: "xiaomi-15-ultra",
    price: 24_990_000,
    originalPrice: 27_990_000,
    category: "dien-thoai",
    description:
      "Xiaomi 15 Ultra với camera Leica đỉnh cao, cảm biến chính 50MP 1-inch Summilux, Snapdragon 8 Elite, màn hình 2K 120Hz, pin 6000mAh sạc 90W. Thiết kế ceramic cao cấp.",
    image: "/images/products/xiaomi-15-ultra.jpg",
    rating: 4.8,
    reviewCount: 1540,
    badge: "sale",
    variants: ["256GB", "512GB", "1TB"],
    colors: ["Đen Ceramic", "Trắng Ceramic", "Xanh Titan"],
    inStock: true,
    featured: true,
    specs: "Snapdragon 8 Elite | 6.7\" 2K AMOLED | Leica 50MP 1\" | 6000mAh",
  },
  {
    id: 9,
    name: "Xiaomi 15",
    slug: "xiaomi-15",
    price: 18_990_000,
    originalPrice: 21_990_000,
    category: "dien-thoai",
    description:
      "Xiaomi 15 – flagship gọn nhẹ với Snapdragon 8 Elite, camera Leica 50MP, màn hình AMOLED 6.36\" 120Hz. Pin 5400mAh sạc nhanh 90W. Thiết kế nhỏ gọn nhất dòng Xiaomi 15.",
    image: "/images/products/xiaomi-15.jpg",
    rating: 4.7,
    reviewCount: 1120,
    badge: "sale",
    variants: ["256GB", "512GB"],
    colors: ["Đen", "Trắng", "Hồng Bích Ngọc"],
    inStock: true,
    featured: false,
    specs: "Snapdragon 8 Elite | 6.36\" AMOLED | Leica 50MP | 5400mAh",
  },

  /* ══════════════════════════════════════════════════
     ĐIỆN THOẠI – SAMSUNG  (id 10 – 15)
  ══════════════════════════════════════════════════ */
  {
    id: 10,
    name: "Samsung Galaxy S26 Ultra",
    slug: "samsung-galaxy-s26-ultra",
    price: 36_990_000,
    originalPrice: 39_990_000,
    category: "dien-thoai",
    description:
      "Galaxy S26 Ultra – king of all với Galaxy AI nâng cấp, Snapdragon 8 Elite for Galaxy thế hệ 2, camera 200MP ProVisual Engine, S Pen tích hợp mới. Màn hình Dynamic AMOLED 2X QHD+ 144Hz, khung Armor Titanium.",
    image: "/images/products/samsung-galaxy-s26-ultra.jpg",
    rating: 4.9,
    reviewCount: 2340,
    badge: "new",
    variants: ["256GB", "512GB", "1TB"],
    colors: ["Titan Đen", "Titan Xám", "Titan Xanh Navy", "Titan Bạc"],
    inStock: true,
    featured: true,
    specs: "Snapdragon 8 Elite Gen 2 | 6.9\" QHD+ AMOLED 144Hz | 200MP | S Pen",
  },
  {
    id: 11,
    name: "Samsung Galaxy S26+",
    slug: "samsung-galaxy-s26-plus",
    price: 29_990_000,
    originalPrice: 32_990_000,
    category: "dien-thoai",
    description:
      "Galaxy S26+ với chip Snapdragon 8 Elite for Galaxy, màn hình Dynamic AMOLED 2X 6.7\" 120Hz, hệ thống camera 50MP triple OIS, pin 4900mAh sạc nhanh 45W, Galaxy AI toàn diện.",
    image: "/images/products/samsung-galaxy-s26-plus.jpg",
    rating: 4.8,
    reviewCount: 1230,
    badge: "new",
    variants: ["256GB", "512GB"],
    colors: ["Đen Bóng", "Bạc Ánh", "Xanh Băng", "Hồng Vàng"],
    inStock: true,
    featured: false,
    specs: "Snapdragon 8 Elite | 6.7\" AMOLED 120Hz | 50MP Triple | 4900mAh",
  },
  {
    id: 12,
    name: "Samsung Galaxy S26",
    slug: "samsung-galaxy-s26",
    price: 24_990_000,
    originalPrice: 26_990_000,
    category: "dien-thoai",
    description:
      "Galaxy S26 tiêu chuẩn, chip Snapdragon 8 Elite, màn AMOLED 6.1\" FHD+ 120Hz, camera 50MP chính với Galaxy AI. Pin 4000mAh sạc 25W. Thiết kế compact hoàn hảo.",
    image: "/images/products/samsung-galaxy-s26.jpg",
    rating: 4.7,
    reviewCount: 870,
    badge: "new",
    variants: ["128GB", "256GB"],
    colors: ["Đen", "Trắng", "Xanh Mint", "Lavender"],
    inStock: true,
    featured: false,
    specs: "Snapdragon 8 Elite | 6.1\" AMOLED | 50MP | 4000mAh",
  },
  {
    id: 13,
    name: "Samsung Galaxy S25 Ultra",
    slug: "samsung-galaxy-s25-ultra",
    price: 31_990_000,
    originalPrice: 36_990_000,
    category: "dien-thoai",
    description:
      "Galaxy S25 Ultra flagship cũ với Snapdragon 8 Elite for Galaxy, camera 200MP, S Pen tích hợp. Màn hình Dynamic AMOLED 2X QHD+ 120Hz, khung titan. Galaxy AI thế hệ đầu tiên.",
    image: "/images/products/samsung-galaxy-s25-ultra.jpg",
    rating: 4.8,
    reviewCount: 3120,
    badge: "sale",
    variants: ["256GB", "512GB", "1TB"],
    colors: ["Titan Đen", "Titan Xám", "Titan Xanh", "Titan Bạc"],
    inStock: true,
    featured: true,
    specs: "Snapdragon 8 Elite | 6.9\" QHD+ AMOLED | 200MP | S Pen | Titan",
  },
  {
    id: 14,
    name: "Samsung Galaxy S25+",
    slug: "samsung-galaxy-s25-plus",
    price: 25_990_000,
    originalPrice: 30_990_000,
    category: "dien-thoai",
    description:
      "Galaxy S25+ với màn hình Dynamic AMOLED 2X 6.7\" 120Hz, Snapdragon 8 Elite, camera 50MP triple lens OIS. Pin 4900mAh sạc 45W, thiết kế mỏng nhẹ cao cấp.",
    image: "/images/products/samsung-galaxy-s25-plus.jpg",
    rating: 4.7,
    reviewCount: 1650,
    badge: "sale",
    variants: ["256GB", "512GB"],
    colors: ["Đen Bóng", "Bạc Băng", "Xanh Biển", "Hồng Vàng"],
    inStock: true,
    featured: false,
    specs: "Snapdragon 8 Elite | 6.7\" AMOLED | 50MP Triple | 4900mAh",
  },
  {
    id: 15,
    name: "Samsung Galaxy S25",
    slug: "samsung-galaxy-s25",
    price: 20_990_000,
    originalPrice: 24_990_000,
    category: "dien-thoai",
    description:
      "Galaxy S25 tiêu chuẩn với Snapdragon 8 Elite, màn AMOLED 6.2\" FHD+ 120Hz, camera 50MP ProVisual. Galaxy AI tích hợp đầy đủ. Thiết kế nhỏ gọn nhất dòng S25.",
    image: "/images/products/samsung-galaxy-s25.jpg",
    rating: 4.7,
    reviewCount: 2890,
    badge: "sale",
    variants: ["128GB", "256GB"],
    colors: ["Đen", "Trắng Bạc", "Xanh Navy", "Vàng Nhạt"],
    inStock: true,
    featured: false,
    specs: "Snapdragon 8 Elite | 6.2\" AMOLED | 50MP | 4000mAh | Galaxy AI",
  },

  /* ══════════════════════════════════════════════════
     MÁY TÍNH BẢNG – APPLE  (id 16 – 19)
  ══════════════════════════════════════════════════ */
  {
    id: 16,
    name: "iPad Pro M5",
    slug: "ipad-pro-m5",
    price: 26_990_000,
    originalPrice: 29_990_000,
    category: "tablet",
    description:
      "iPad Pro M5 – máy tính bảng mạnh nhất Apple với chip M5 vượt trội, màn hình OLED Ultra Retina XDR 11\" 120Hz. Hỗ trợ Apple Pencil Pro và Magic Keyboard. Thay thế laptop hoàn toàn.",
    image: "/images/products/ipad-pro-m5.jpg",
    rating: 4.9,
    reviewCount: 1340,
    badge: "new",
    variants: ["256GB", "512GB", "1TB", "2TB"],
    colors: ["Đen Vũ Trụ", "Bạc"],
    inStock: true,
    featured: true,
    specs: "Apple M5 | 11\" OLED Ultra Retina XDR 120Hz | Wi-Fi 6E / 5G | Apple Pencil Pro",
  },
  {
    id: 17,
    name: "iPad Air M4",
    slug: "ipad-air-m4",
    price: 18_990_000,
    originalPrice: 21_990_000,
    category: "tablet",
    description:
      "iPad Air M4 với chip M4 hiệu năng mạnh, màn hình Liquid Retina 11\" 60Hz, hỗ trợ Apple Pencil Pro, Smart Folio. Đẹp, nhẹ, pin 10h thực tế. Lựa chọn tối ưu cho sinh viên và dân văn phòng.",
    image: "/images/products/ipad-air-m4.jpg",
    rating: 4.8,
    reviewCount: 2110,
    badge: "sale",
    variants: ["128GB", "256GB", "512GB"],
    colors: ["Xanh Dương", "Tím", "Vàng Ánh", "Bạc"],
    inStock: true,
    featured: true,
    specs: "Apple M4 | 11\" Liquid Retina 60Hz | Wi-Fi 6E / 5G | Apple Pencil Pro",
  },
  {
    id: 18,
    name: "iPad Gen 11",
    slug: "ipad-gen-11",
    price: 9_990_000,
    originalPrice: 11_990_000,
    category: "tablet",
    description:
      "iPad Gen 11 với chip A16 Bionic, màn hình Liquid Retina 10.9\" True Tone. USB-C, hỗ trợ Apple Pencil USB-C và Magic Keyboard Folio. Lựa chọn phổ biến nhất để học tập và giải trí.",
    image: "/images/products/ipad-gen-11.jpg",
    rating: 4.7,
    reviewCount: 4320,
    badge: "sale",
    variants: ["64GB", "128GB", "256GB"],
    colors: ["Xanh", "Hồng", "Vàng", "Bạc"],
    inStock: true,
    featured: false,
    specs: "A16 Bionic | 10.9\" Liquid Retina | USB-C | Wi-Fi / 5G",
  },
  {
    id: 19,
    name: "iPad Mini A17 Pro",
    slug: "ipad-mini-a17-pro",
    price: 14_990_000,
    originalPrice: 16_990_000,
    category: "tablet",
    description:
      "iPad Mini A17 Pro – máy tính bảng nhỏ gọn nhất Apple với chip A17 Pro game-changing. Màn hình Liquid Retina 8.3\" ProMotion 120Hz, hỗ trợ Apple Pencil Pro. Hoàn hảo để mang theo mọi nơi.",
    image: "/images/products/ipad-mini-a17-pro.jpg",
    rating: 4.8,
    reviewCount: 1560,
    badge: "new",
    variants: ["128GB", "256GB", "512GB"],
    colors: ["Đen Vũ Trụ", "Tím Nhạt", "Bạc", "Hồng Cam"],
    inStock: true,
    featured: false,
    specs: "A17 Pro | 8.3\" Liquid Retina 120Hz | Wi-Fi 6E / 5G | Apple Pencil Pro",
  },

  /* ══════════════════════════════════════════════════
     MÁY TÍNH BẢNG – XIAOMI  (id 20 – 23)
  ══════════════════════════════════════════════════ */
  {
    id: 20,
    name: "Xiaomi Pad 8 Pro",
    slug: "xiaomi-pad-8-pro",
    price: 14_990_000,
    originalPrice: 16_990_000,
    category: "tablet",
    description:
      "Xiaomi Pad 8 Pro, chip Snapdragon 8 Elite, màn hình 3K AMOLED 12.1\" 144Hz, 4 loa Dolby Atmos, hỗ trợ bút cảm ứng Xiaomi Smart Pen 3, pin 10000mAh sạc nhanh 67W.",
    image: "/images/products/xiaomi-pad-8-pro.jpg",
    rating: 4.8,
    reviewCount: 870,
    badge: "new",
    variants: ["256GB", "512GB"],
    colors: ["Đen", "Bạc"],
    inStock: true,
    featured: true,
    specs: "Snapdragon 8 Elite | 12.1\" 3K AMOLED 144Hz | 10000mAh | Dolby Atmos",
  },
  {
    id: 21,
    name: "Xiaomi Pad 8",
    slug: "xiaomi-pad-8",
    price: 10_990_000,
    originalPrice: 12_990_000,
    category: "tablet",
    description:
      "Xiaomi Pad 8 với chip Dimensity 9400, màn hình LCD 2.8K 12\" 144Hz, 6 loa, pin 9880mAh sạc nhanh 45W. Hỗ trợ bút cảm ứng và bàn phím Xiaomi. Hiệu năng tốt, giá hợp lý.",
    image: "/images/products/xiaomi-pad-8.jpg",
    rating: 4.7,
    reviewCount: 630,
    badge: "sale",
    variants: ["128GB", "256GB"],
    colors: ["Đen", "Bạc", "Xanh"],
    inStock: true,
    featured: false,
    specs: "Dimensity 9400 | 12\" 2.8K LCD 144Hz | 9880mAh 45W | 6 loa",
  },
  {
    id: 22,
    name: "Xiaomi Pad 7 Pro",
    slug: "xiaomi-pad-7-pro",
    price: 9_990_000,
    originalPrice: 11_490_000,
    category: "tablet",
    description:
      "Xiaomi Pad 7 Pro với Snapdragon 8s Gen 4, màn hình 3K LCD 11.2\" 144Hz, 6 loa Dolby Atmos, pin 8850mAh sạc 45W. Hiệu năng mạnh mẽ cho tầm giá tốt nhất phân khúc.",
    image: "/images/products/xiaomi-pad-7-pro.jpg",
    rating: 4.7,
    reviewCount: 980,
    badge: "sale",
    variants: ["128GB", "256GB"],
    colors: ["Đen", "Bạc", "Xanh Lam"],
    inStock: true,
    featured: false,
    specs: "Snapdragon 8s Gen 4 | 11.2\" 3K 144Hz | 8850mAh 45W | 6 loa",
  },
  {
    id: 23,
    name: "Xiaomi Pad 7",
    slug: "xiaomi-pad-7",
    price: 7_990_000,
    originalPrice: 9_490_000,
    category: "tablet",
    description:
      "Xiaomi Pad 7 với Snapdragon 7+ Gen 3, màn hình 2.8K LCD 11\" 144Hz, 4 loa, pin 8850mAh. Lựa chọn tối ưu cho học sinh – sinh viên cần tablet hiệu năng tốt, giá phải chăng.",
    image: "/images/products/xiaomi-pad-7.jpg",
    rating: 4.6,
    reviewCount: 1450,
    badge: "sale",
    variants: ["128GB", "256GB"],
    colors: ["Đen", "Bạc", "Xanh Mint"],
    inStock: true,
    featured: false,
    specs: "Snapdragon 7+ Gen 3 | 11\" 2.8K 144Hz | 8850mAh | 4 loa",
  },

  /* ══════════════════════════════════════════════════
     MÁY TÍNH BẢNG – SAMSUNG  (id 24 – 27)
  ══════════════════════════════════════════════════ */
  {
    id: 24,
    name: "Samsung Galaxy Tab S11 Ultra 5G",
    slug: "samsung-galaxy-tab-s11-ultra-5g",
    price: 30_990_000,
    originalPrice: 34_990_000,
    category: "tablet",
    description:
      "Galaxy Tab S11 Ultra 5G – flagship tablet Samsung với màn hình AMOLED 14.6\" 2960×1848 120Hz, chip Snapdragon 8 Elite, S Pen tích hợp, 4 loa AKG Dolby Atmos, pin 11200mAh sạc 65W.",
    image: "/images/products/samsung-tab-s11-ultra-5g.jpg",
    rating: 4.9,
    reviewCount: 760,
    badge: "new",
    variants: ["256GB", "512GB", "1TB"],
    colors: ["Graphite", "Bạc"],
    inStock: true,
    featured: true,
    specs: "Snapdragon 8 Elite | 14.6\" AMOLED 120Hz | S Pen | 5G | 11200mAh",
  },
  {
    id: 25,
    name: "Samsung Galaxy Tab S11 5G",
    slug: "samsung-galaxy-tab-s11-5g",
    price: 22_990_000,
    originalPrice: 25_990_000,
    category: "tablet",
    description:
      "Galaxy Tab S11 5G với màn hình AMOLED 11\" 120Hz, Snapdragon 8 Elite, Galaxy AI, hỗ trợ S Pen và Book Cover Keyboard. Pin 8400mAh sạc 45W. Hoàn hảo cho năng suất và giải trí.",
    image: "/images/products/samsung-tab-s11-5g.jpg",
    rating: 4.8,
    reviewCount: 1120,
    badge: "new",
    variants: ["128GB", "256GB", "512GB"],
    colors: ["Graphite", "Bạc", "Xanh Dương"],
    inStock: true,
    featured: false,
    specs: "Snapdragon 8 Elite | 11\" AMOLED 120Hz | 5G | S Pen | 8400mAh",
  },
  {
    id: 26,
    name: "Samsung Galaxy Tab S10 Ultra 5G",
    slug: "samsung-galaxy-tab-s10-ultra-5g",
    price: 23_990_000,
    originalPrice: 29_990_000,
    category: "tablet",
    description:
      "Galaxy Tab S10 Ultra 5G với màn hình Dynamic AMOLED 2X 14.6\" 120Hz, Snapdragon 8 Gen 3, S Pen tích hợp, 4 loa AKG. Hiệu năng đỉnh cao với giá được tối ưu sau ra mắt S11.",
    image: "/images/products/samsung-tab-s10-ultra-5g.jpg",
    rating: 4.8,
    reviewCount: 1890,
    badge: "sale",
    variants: ["256GB", "512GB"],
    colors: ["Graphite", "Bạc"],
    inStock: true,
    featured: false,
    specs: "Snapdragon 8 Gen 3 | 14.6\" AMOLED 120Hz | S Pen | 5G | 11200mAh",
  },
  {
    id: 27,
    name: "Samsung Galaxy Tab S10 Plus 5G",
    slug: "samsung-galaxy-tab-s10-plus-5g",
    price: 18_990_000,
    originalPrice: 23_990_000,
    category: "tablet",
    description:
      "Galaxy Tab S10+ 5G màn hình Dynamic AMOLED 2X 12.4\" 120Hz, Snapdragon 8 Gen 3, hỗ trợ S Pen, pin 10090mAh sạc 45W. Giá tốt nhất hiện tại sau khi Galaxy Tab S11 ra mắt.",
    image: "/images/products/samsung-tab-s10-plus-5g.jpg",
    rating: 4.7,
    reviewCount: 2340,
    badge: "sale",
    variants: ["128GB", "256GB", "512GB"],
    colors: ["Graphite", "Bạc", "Hồng Gold"],
    inStock: true,
    featured: false,
    specs: "Snapdragon 8 Gen 3 | 12.4\" AMOLED 120Hz | S Pen | 5G | 10090mAh",
  },
];

/* ── Danh mục (count tính tự động) ────────────────────────── */
export const categories: Category[] = [
  { id: "all",        name: "Tất Cả",        icon: "🏪", count: products.length },
  { id: "dien-thoai", name: "Điện Thoại",    icon: "📱", count: products.filter(p => p.category === "dien-thoai").length },
  { id: "tablet",     name: "Máy Tính Bảng", icon: "📲", count: products.filter(p => p.category === "tablet").length },
  { id: "tai-nghe",   name: "Tai Nghe",      icon: "🎧", count: products.filter(p => p.category === "tai-nghe").length },
  { id: "phu-kien",   name: "Phụ Kiện",      icon: "⌚", count: products.filter(p => p.category === "phu-kien").length },
];

/* ── Helper functions ──────────────────────────────────────── */
export const getProductById = (id: number) =>
  products.find((p) => p.id === id);

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: string) =>
  category === "all"
    ? products
    : products.filter((p) => p.category === category);

export const getFeaturedProducts = () =>
  products.filter((p) => p.featured);

export const searchProducts = (query: string) => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.specs && p.specs.toLowerCase().includes(q))
  );
};
