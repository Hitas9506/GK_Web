# TECH.md – Công Nghệ & Thiết Kế TechNext

---

## ⚙️ Tech Stack

### Core Framework
| Công nghệ | Phiên bản | Vai trò |
|---|---|---|
| **Next.js** | 16.2.4 | Framework chính – App Router, SSG/ISR/SSR/CSR |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Motion** | ^12.38.0 | Animation library (carousel, transitions) |

### Styling
| Công nghệ | Phiên bản | Vai trò |
|---|---|---|
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **@tailwindcss/postcss** | ^4 | PostCSS plugin cho Tailwind v4 |
| **Be Vietnam Pro** | — | Font chữ chính (Google Fonts) |

### Công cụ phát triển
| Công nghệ | Phiên bản | Vai trò |
|---|---|---|
| **ESLint** | ^9 | Linting & code quality |
| **eslint-config-next** | 16.2.4 | Next.js lint rules |
| **Turbopack** | built-in | Dev bundler (thay Webpack) |

### Rendering Modes (App Router)
| Mode | Trang áp dụng |
|---|---|
| **SSG** – Static Site Generation | Trang chủ `/` |
| **ISR** – Incremental Static Regen | Danh sách sản phẩm `/products` (revalidate: 60s) |
| **SSR** – Server-Side Rendering | Chi tiết sản phẩm `/products/[id]` |
| **CSR** – Client-Side Rendering | Giỏ hàng `/cart`, Tìm kiếm `/search` |

---

## 🎨 Bảng Màu (Color Palette) – TechNext Xiaomi-Inspired

### Brand Colors

| Tên biến | Hex | Mô tả | Preview |
|---|---|---|---|
| `--color-primary` | `#FF6700` | Cam Xiaomi – màu nhấn chính | 🟠 |
| `--color-primary-dark` | `#E55A00` | Cam đậm – hover/active | 🔴 |
| `--color-primary-light` | `#FFF0E6` | Cam nhạt – nền badge, highlight | 🟧 |
| `--color-accent` | `#1A1A1A` | Đen tuyệt đối – nút CTA, footer | ⬛ |

### Neutral Colors

| Tên biến | Hex | Mô tả |
|---|---|---|
| `--color-surface` | `#FFFFFF` | Nền trang chính – trắng sạch |
| `--color-muted` | `#F5F5F5` | Nền card, section phụ – xám rất nhạt |
| `--color-text` | `#1A1A1A` | Màu chữ chính |
| `--color-text-muted` | `#666666` | Màu chữ phụ, mô tả |
| `--color-border` | `#E0E0E0` | Màu viền, đường phân cách |

### Màu đặc biệt (UI Elements)

| Element | Hex | Dùng ở đâu |
|---|---|---|
| Badge HOT | `#FF4757` | Badge sản phẩm nổi bật |
| Badge SALE | `#FF6700` | Badge sản phẩm giảm giá (cam Xiaomi) |
| Badge NEW | `#2196F3` | Badge sản phẩm mới (xanh dương) |
| Discount tag | `#FF4757` | Tag % giảm giá trên trang chi tiết |
| Rating stars | `#F39C12` | Ngôi sao đánh giá |
| Nút CTA chính | `#1A1A1A` | Nền đen, chữ trắng (phong cách Xiaomi) |
| Nút CTA phụ | `border: #1A1A1A` | Viền đen, nền trắng |

---

## 🔤 Typography

| Thuộc tính | Giá trị |
|---|---|
| Font family | **Be Vietnam Pro** (Google Fonts) |
| Weights dùng | 300, 400, 500, 600, 700, 800 |
| Fallback | `system-ui, sans-serif` |
| Rendering | `-webkit-font-smoothing: antialiased` |

---

## 📁 Cấu trúc chính

```
technext/
├── app/                       # Next.js App Router (14 trang)
│   ├── page.tsx               # Trang chủ – SSG
│   ├── products/              # Danh sách + Chi tiết SP (ISR/SSR)
│   ├── cart/                  # Giỏ hàng – CSR
│   ├── search/                # Tìm kiếm – CSR
│   ├── about/                 # Giới thiệu – Static
│   ├── login/ & register/     # Auth – CSR
│   ├── profile/ & orders/     # Tài khoản – CSR
│   ├── chinh-sach-doi-tra/    # Chính sách – Static
│   ├── lien-he/               # Liên hệ – Static
│   └── so-sanh-dien-thoai/   # So sánh SP – CSR
├── components/                # 9 components
│   ├── Navbar.tsx             # Mega menu, auth badge, cart
│   ├── Footer.tsx             # 4-cột footer
│   ├── ProductCard.tsx        # Card với next/image
│   ├── HeroCarousel.tsx       # Carousel full-width (video)
│   ├── PromoBanner.tsx        # Banner USP trên cùng
│   ├── FeaturedProducts.tsx   # Grid sản phẩm nổi bật
│   ├── FlashSaleBannerHero.tsx # Banner Flash Sale
│   ├── FlashSaleCountdown.tsx # Đồng hồ đếm ngược
│   └── ShippingForm.tsx       # Form địa chỉ (tỉnh/huyện/xã)
├── context/                   # React Context providers
│   ├── CartContext.tsx        # Giỏ hàng state
│   └── AuthContext.tsx        # Auth state (localStorage)
├── lib/                       # Data & utilities
│   ├── types.ts               # Interfaces: Product, CartItem, Order, ...
│   ├── data.ts                # 24 sản phẩm mock + 5 danh mục
│   ├── utils.ts               # formatPrice, calculateDiscount, ...
│   └── vietnam-divisions.ts   # Dữ liệu tỉnh/huyện/xã
└── public/                    # Static assets
    ├── APPLE.svg / SAMSUNG.svg / XIAOMI.png
    └── videos/                # 6 video sản phẩm (Hero Carousel)
```

---

> Được xây dựng bởi nhóm sinh viên – Môn Lập Trình Web & Ứng Dụng (503073)  
> Hoàng Thái Đăng Khoa · Tạ Đình Quốc Thái · Nguyễn Huy Hoàng
