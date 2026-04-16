# TECH.md – Công Nghệ & Thiết Kế ShopNext

---

## ⚙️ Tech Stack

### Core Framework
| Công nghệ | Phiên bản | Vai trò |
|---|---|---|
| **Next.js** | 16.2.4 | Framework chính – App Router, SSG/ISR/SSR/CSR |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5.x | Type-safe JavaScript |

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

## 🎨 Bảng Màu (Color Palette)

### Brand Colors

| Tên biến | Hex | Mô tả | Preview |
|---|---|---|---|
| `--color-primary` | `#C8A96E` | Vàng champagne – màu chủ đạo | 🟡 |
| `--color-primary-dark` | `#A8854A` | Vàng nâu đậm – hover/active | 🟤 |
| `--color-primary-light` | `#E8D5B0` | Vàng nhạt – nền badge, highlight | 🟨 |
| `--color-accent` | `#1A1A2E` | Navy đen – footer, dark elements | 🔵 |

### Neutral Colors

| Tên biến | Hex | Mô tả |
|---|---|---|
| `--color-surface` | `#FFFFFF` | Nền trang chính |
| `--color-muted` | `#F7F4F0` | Nền card, section phụ – kem trắng ấm |
| `--color-text` | `#1A1A2E` | Màu chữ chính |
| `--color-text-muted` | `#6B6B7A` | Màu chữ phụ, mô tả |
| `--color-border` | `#E8E0D5` | Màu viền, đường phân cách |

### Màu đặc biệt (UI Elements)

| Element | Hex | Dùng ở đâu |
|---|---|---|
| Badge HOT | `#FF4757` | Badge sản phẩm nổi bật |
| Badge SALE | `#2ED573` | Badge sản phẩm giảm giá |
| Badge NEW | `#C8A96E` | Badge sản phẩm mới |
| Discount tag | `#FF4757` | Tag % giảm giá trên trang chi tiết |
| Rating stars | `#F39C12` | Ngôi sao đánh giá |
| Category badge bg | `#FEF3C7` | Nền badge danh mục (amber-100) |
| Category badge text | `#92400E` | Chữ badge danh mục (amber-800) |

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
shopnext/
├── app/              # Next.js App Router (pages)
├── components/       # Navbar, Footer, ProductCard
├── context/          # CartContext (React Context API)
├── lib/              # types.ts, data.ts, utils.ts
└── public/           # Static assets
```

---

> Được xây dựng bởi nhóm sinh viên – Môn Lập Trình Web & Ứng Dụng (503073)  
> Hoàng Thái Đăng Khoa · Tạ Đình Quốc Thái · Nguyễn Huy Hoàng
