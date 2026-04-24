# TechNext – Hệ Thống Bán Điện Thoại & Máy Tính Bảng

> **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4**  
> Demo project cho môn Lập Trình Web và Ứng Dụng – 503073

---

## 🚀 Cài Đặt & Chạy Nhanh

### Yêu Cầu Hệ Thống

| Công cụ | Phiên bản tối thiểu |
|---|---|
| [Node.js](https://nodejs.org) | **≥ 18.17.0** |
| npm | **≥ 9.0** (đi kèm Node.js) |
| Git | Bất kỳ |
| Hệ điều hành | Windows 10/11, macOS, Linux |

### Bước 1 – Clone hoặc Giải Nén Source

```bash
# Nếu clone từ git:
git clone <repo-url>
cd GK_Web/technext

# Nếu giải nén từ file .zip:
cd <thư-mục-giải-nén>/source/technext
```

### Bước 2 – Cài Đặt Dependencies

```bash
npm install
```

> ⏳ Lần đầu mất 1–3 phút tùy tốc độ mạng.

### Bước 3 – Chạy Development Server

```bash
npm run dev
```

Mở trình duyệt → **http://localhost:3000**

### Lệnh Khác

```bash
npm run build   # Build production (kiểm tra lỗi compile)
npm run start   # Chạy production build (cần build trước)
npm run lint    # Kiểm tra ESLint
```

---

## 📁 Cấu Trúc Thư Mục

```
technext/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (providers + Navbar + Footer)
│   ├── page.tsx                  # Trang chủ (SSG)
│   ├── not-found.tsx             # Custom 404
│   ├── products/
│   │   ├── page.tsx              # Danh sách sản phẩm (ISR 60s)
│   │   ├── loading.tsx           # Skeleton loading UI
│   │   ├── error.tsx             # Error boundary
│   │   └── [id]/
│   │       ├── page.tsx          # Chi tiết sản phẩm (SSR + generateStaticParams)
│   │       └── ProductDetailClient.tsx  # Client Component chi tiết
│   ├── cart/page.tsx             # Giỏ hàng (CSR)
│   ├── search/page.tsx           # Tìm kiếm (CSR + Suspense)
│   ├── compare/page.tsx          # So sánh sản phẩm (CSR)
│   ├── about/page.tsx            # Giới thiệu (Static)
│   ├── login/page.tsx            # Đăng nhập (CSR)
│   ├── register/page.tsx         # Đăng ký (CSR)
│   ├── profile/page.tsx          # Hồ sơ (CSR)
│   ├── orders/page.tsx           # Đơn hàng (CSR)
│   ├── chinh-sach-doi-tra/       # Chính sách đổi trả (Static)
│   └── lien-he/                  # Liên hệ (Static)
│
├── components/
│   ├── Navbar.tsx                # Thanh điều hướng (mega-menu, search autocomplete)
│   ├── Footer.tsx                # Chân trang
│   ├── ProductCard.tsx           # Card sản phẩm (dùng trong products page)
│   ├── FeaturedProducts.tsx      # Sản phẩm nổi bật trang chủ
│   ├── QuickBuyModal.tsx         # Modal Mua Ngay (chọn variant/màu/số lượng)
│   ├── HeroCarousel.tsx          # Carousel video hero
│   ├── FlashSaleBannerHero.tsx   # Banner flash sale
│   ├── FlashSaleCountdown.tsx    # Đồng hồ đếm ngược
│   ├── ProductsClient.tsx        # Danh sách + bộ lọc sản phẩm
│   ├── PromoBanner.tsx           # Banner USP trên cùng
│   └── ShippingForm.tsx          # Form địa chỉ giao hàng
│
├── context/
│   ├── CartContext.tsx            # Quản lý giỏ hàng (toàn cục)
│   ├── AuthContext.tsx            # Quản lý đăng nhập
│   └── CompareContext.tsx         # Quản lý so sánh sản phẩm + compare bar
│
├── lib/
│   ├── data.ts                   # 25 sản phẩm mock + helper functions
│   ├── types.ts                  # TypeScript interfaces (Product, CartItem...)
│   ├── utils.ts                  # formatPrice, calculateDiscount, slugify
│   ├── colorMap.ts               # Bản đồ màu sắc → hex code
│   └── vietnam-divisions.ts      # Dữ liệu tỉnh/huyện/xã Việt Nam
│
├── public/
│   ├── apple_logo.svg            # Logo Apple (chính thức)
│   ├── samsung_logo.svg          # Logo Samsung (chính thức)
│   ├── xiaomi_logo.svg           # Logo Xiaomi (chính thức)
│   ├── gmail.webp                # Icon Gmail cho footer
│   ├── zalo.png                  # Icon Zalo cho footer
│   ├── images/products/          # Ảnh sản phẩm theo brand/model/màu
│   └── videos/                   # Video showcase sản phẩm
│
├── PLAN.md                       # Kế hoạch tiểu luận + nhật ký phát triển
├── Readme.txt                    # Thông tin nhóm & hướng dẫn nộp bài
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## ✨ Tính Năng Chính

### 🛍️ Shopping
- **25 sản phẩm** thực tế: iPhone 17 Series (5), Xiaomi 17/15 Series (4), Samsung S25/S26 Series (6), iPad Air M4, iPad Pro M5, iPad Gen 11, Samsung Tab S10 Series, Xiaomi Pad 7 Series
- **Variant-aware**: chọn phiên bản (ROM/RAM/kích thước) → giá, mô tả, thông số kỹ thuật **tự động cập nhật**
- **Màu sắc thực tế**: chọn màu → ảnh sản phẩm thay đổi theo
- **⚡ Mua Ngay** trên mọi card: mở popup chọn phiên bản → màu → số lượng → thẳng giỏ hàng
- **Giỏ hàng thông minh**: hình ảnh + giá đồng bộ đúng theo variant/màu đang chọn
- Form giao hàng cascading (tỉnh → huyện → xã)

### 🔍 Tìm Kiếm & Lọc
- **Autocomplete realtime** khi gõ trong thanh tìm kiếm (hiện ảnh + giá)
- **10 chiều lọc**: thương hiệu, mức giá, đánh giá, RAM, ROM, OS, tần số quét, sạc nhanh, nhu cầu, tính năng đặc biệt
- **Popup lọc** gọn gàng – bấm nút mở, bấm ngoài đóng
- **Sort**: Mới nhất / Bán chạy / Giá tăng / Giá giảm / Đánh giá

### ⚖️ So Sánh
- Nút **⚖️** trên mọi product card (tối đa 3 sản phẩm)
- **Compare bar** cố định dưới trang, hiện ở mọi trang
- Trang `/compare` bảng side-by-side với highlight giá thấp nhất

### 🎨 UI/UX
- **Glassmorphism navbar** sticky với scroll effect
- **Hero carousel** với video nền tự động
- **Flash sale countdown** realtime
- **Mega-menu hover** với delay mượt (không đóng khi di chuột vào panel)
- **Responsive** mobile-first: stack layout trên mobile, 4-col desktop

### 🔧 Kỹ Thuật Next.js
- **SSG** – Trang chủ (build time)
- **ISR** – Danh sách sản phẩm (revalidate 60s)
- **SSR + generateStaticParams** – Chi tiết sản phẩm (pre-render 25 URL)
- **CSR** – Giỏ hàng, tìm kiếm, so sánh, auth
- **generateMetadata** – SEO động với OpenGraph

---

## 🗂️ Dữ liệu Sản Phẩm

Xem và chỉnh sửa tại `lib/data.ts`:

```typescript
// Mỗi sản phẩm có cấu trúc:
{
  id, name, slug, price, originalPrice,
  category, brand, description,
  variants: ["256GB", "512GB"],          // Các phiên bản
  variantPrices: { "256GB": 24_490_000 }, // Giá theo phiên bản
  variantSpecs: { "13\" Wi-Fi": [...] },  // Thông số riêng từng phiên bản
  variantDescriptions: { ... },           // Mô tả riêng từng phiên bản
  colors, colorImages,                    // Màu → đường dẫn ảnh
  detailedSpecs,                          // Thông số kỹ thuật chi tiết
  features: ["5g", "nfc", "face-id"],    // Tags cho bộ lọc
  videos: ["/videos/...mp4"],            // Video showcase
}
```

---

## 🛠️ Tech Stack

| Layer | Công nghệ |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| UI Library | React 19.2.4 |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 4 + Inline styles |
| Animation | Framer Motion 12.x |
| State | React Context API |
| Package Manager | npm |

---

## 🐛 Lỗi Thường Gặp

### Port 3000 đã bị dùng
```bash
npx kill-port 3000
npm run dev
```

### Lỗi `Module not found`
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Ảnh/video không hiển thị
- Kiểm tra thư mục `public/images/products/` và `public/videos/` có đủ file chưa
- File ảnh phải đúng tên (phân biệt chữ hoa/thường) theo `colorImages` trong `lib/data.ts`

### TypeScript error khi build
```bash
# Linux / macOS:
npm run build 2>&1 | head -30

# Windows PowerShell:
npm run build 2>&1 | Select-Object -First 30
```

---

## 👥 Thông Tin Nhóm

Xem chi tiết tại `Readme.txt`

---

## 📝 Giấy Phép

Dự án học thuật – không sử dụng cho mục đích thương mại.
