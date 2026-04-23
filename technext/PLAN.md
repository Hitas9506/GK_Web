# PLAN.md – Kế Hoạch Tiểu Luận Next.js (503073)

> **Môn học:** Lập Trình Web và Ứng Dụng – 503073
> **Học kỳ:** 2 – Năm học 2025–2026
> **Đề tài:** Next.js (Đề tài số 11) – Framework dựa trên React hỗ trợ SSR, routing và tối ưu hiệu năng
> **Demo App:** TechNext – Hệ thống bán điện thoại & phụ kiện công nghệ
> **Đường dẫn:** `e:\Web\GK\technext`
> **Framework:** Next.js 16.2.4 (App Router) + TypeScript + Tailwind CSS 4
> **Chạy:** `npm install` → `npm run dev` → http://localhost:3000

---

## YÊU CẦU ĐỀ BÀI (503073)

Đề bài yêu cầu:
1. Chọn 1 framework frontend → **Next.js** (đề 11)
2. Viết báo cáo trình bày tổng quan công nghệ, kiến trúc, đặc điểm chính, ưu và nhược điểm
3. Xây dựng ứng dụng demo minh họa việc sử dụng framework
4. Quay video demo (tối đa 20 phút, ≥ 720p)
5. Nộp bài gồm: baocao.pdf + demo.mp4 + Readme.txt + source code

---

## PHẦN 1: SOURCE CODE (ĐÃ HOÀN THÀNH 100%)

### 1.1 Cấu Hình Dự Án
- [x] `package.json` – Next.js 16.2.4, React 19.2.4, TypeScript 5, Tailwind CSS 4
- [x] `next.config.ts` – Image optimization (AVIF/WebP format, remotePatterns)
- [x] `tsconfig.json` – Path alias `@/` cho imports gọn
- [x] `postcss.config.mjs` – Tailwind CSS PostCSS plugin
- [x] `eslint.config.mjs` – ESLint với eslint-config-next

### 1.2 Dữ Liệu & Kiểu (lib/)
- [x] `lib/types.ts` – 3 interfaces: Product (16 trường), CartItem (4 trường), Category (4 trường)
- [x] `lib/data.ts` – 24 sản phẩm mock + 5 danh mục + 5 hàm helper:
  - `getProductById()`, `getProductBySlug()`, `getProductsByCategory()`, `getFeaturedProducts()`, `searchProducts()`
  - Phân bố: Điện thoại (10), Tablet (4), Tai nghe (4), Phụ kiện (6) = 24 tổng
  - 8 sản phẩm featured, 24 sản phẩm có đầy đủ: tên, slug, giá, giá gốc, mô tả, ảnh, rating, số đánh giá, badge, variants, colors, specs, tình trạng kho
- [x] `lib/utils.ts` – 3 hàm: `formatPrice()` (VND), `calculateDiscount()`, `slugify()`

### 1.3 Quản Lý Trạng Thái (context/)
- [x] `context/CartContext.tsx` – React Context API (Client Component)
  - Các hàm: addItem, removeItem, updateQuantity, clearCart
  - Tính toán: totalItems, totalPrice
  - Xử lý trùng lặp: cùng product + size + color → tăng quantity

### 1.4 Components (components/)
- [x] `components/Navbar.tsx` – Client Component ("use client")
  - Responsive: desktop nav + mobile hamburger menu
  - Mega menu cho danh mục "Cửa Hàng", dropdown "Hỗ Trợ"
  - Sticky header với glass morphism (backdrop-filter blur)
  - Scroll effect (shadow + border khi cuộn)
  - Cart badge với số lượng, pulse animation
  - Auth state: hiển thị tên user / nút Đăng nhập
  - 6 nav links: Trang Chủ, Cửa Hàng (mega), Điện Thoại, Tablet, Tai Nghe, Hỗ Trợ (dropdown)
- [x] `components/Footer.tsx` – Server Component
  - 4 cột: Thông tin, Danh mục, Hỗ trợ, Liên hệ
  - CSS hover (không dùng onMouseEnter – an toàn cho Server Component)
- [x] `components/ProductCard.tsx` – Client Component ("use client")
  - `next/image` với fill + sizes responsive
  - Badge (HOT/SALE/NEW) + phần trăm giảm giá
  - Nút thêm nhanh vào giỏ (CSS hover reveal)
  - Image onError fallback (emoji khi ảnh không tải được)
  - Rating stars + số đánh giá + hiển thị giá
- [x] `components/HeroCarousel.tsx` – Client Component ("use client")
  - Auto-sliding hero carousel full-width
  - Phát video nền cho từng slide (6 videos)
  - Navigation arrows + dot indicators
  - Touch/swipe support
- [x] `components/PromoBanner.tsx` – Server Component
  - Banner USP trên cùng: miễn ship / bảo hành / đổi trả / thanh toán
- [x] `components/FeaturedProducts.tsx` – Client Component
  - Grid sản phẩm nổi bật với filter theo danh mục
- [x] `components/FlashSaleBannerHero.tsx` – Client Component
  - Banner Flash Sale (link đến /products)
- [x] `components/FlashSaleCountdown.tsx` – Client Component
  - Đồng hồ đếm ngược real-time
- [x] `components/ShippingForm.tsx` – Client Component
  - Form nhập địa chỉ: tỉnh → huyện → xã (cascading dropdowns)
  - Dữ liệu từ `lib/vietnam-divisions.ts`

### 1.5 Các Trang (14/14 trang hoạt động)

| # | Trang | File | Kỹ Thuật Rendering | Tính Năng |
|---|---|---|---|---|
| 1 | Trang Chủ | `app/page.tsx` | **SSG** | Hero carousel (video), Flash sale countdown, 5 danh mục, sản phẩm nổi bật, CTA section |
| 2 | Danh Sách SP | `app/products/page.tsx` | **ISR** (revalidate=60s) | Header, 5 filter danh mục, grid 24 sản phẩm, empty state |
| 3 | Chi Tiết SP | `app/products/[id]/page.tsx` | **SSR** + generateStaticParams | generateMetadata (SEO động), pre-render 24 URL, notFound() |
| 4 | Client Detail | `app/products/[id]/ProductDetailClient.tsx` | **CSR** | Breadcrumb, ảnh lớn, chọn variant/màu/SL, thêm giỏ, 3 tabs, SP liên quan |
| 5 | Giỏ Hàng | `app/cart/page.tsx` | **CSR** | Danh sách item, +/- SL, ShippingForm, tóm tắt đơn, phí ship |
| 6 | Tìm Kiếm | `app/search/page.tsx` | **CSR** | Suspense, real-time filter, URL sync, popular tags |
| 7 | Giới Thiệu | `app/about/page.tsx` | **Static** | Hero, sứ mệnh (4 giá trị), timeline 5 mốc, đội ngũ 4 thành viên |
| 8 | Đăng Nhập | `app/login/page.tsx` | **CSR** | Form đăng nhập + mock Google/Facebook OAuth |
| 9 | Đăng Ký | `app/register/page.tsx` | **CSR** | Form tạo tài khoản mới |
| 10 | Hồ Sơ | `app/profile/page.tsx` | **CSR** | Thông tin cá nhân, địa chỉ giao hàng (localStorage) |
| 11 | Đơn Hàng | `app/orders/page.tsx` | **CSR** | Lịch sử đơn hàng, trạng thái, chi tiết từng đơn |
| 12 | Đổi Trả | `app/chinh-sach-doi-tra/page.tsx` | **Static** | Chính sách đổi trả chi tiết |
| 13 | Liên Hệ | `app/lien-he/page.tsx` | **Static** | Form liên hệ, thông tin cửa hàng |
| 14 | So Sánh | `app/so-sanh-dien-thoai/page.tsx` | **CSR** | So sánh thông số 2 điện thoại |
| 15 | 404 | `app/not-found.tsx` | **Static** | Custom 404 với emoji, 3 nút điều hướng |

### 1.6 Special Next.js Files
- [x] `app/products/loading.tsx` – Skeleton loading UI
  - Header skeleton + filter skeleton (5 pills) + 8 product card skeletons
  - Dùng CSS class `.skeleton` từ globals.css (shimmer animation)
- [x] `app/products/error.tsx` – Error Boundary
  - "use client", nhận error + reset props
  - Console.error trong useEffect, nút "Thử lại" gọi reset()
- [x] `app/layout.tsx` – Root Layout
  - AuthProvider + CartProvider bọc toàn bộ app
  - PromoBanner + Navbar + main + Footer
  - Metadata với template "%s | TechNext", keywords điện thoại, OpenGraph

### 1.7 SEO & Metadata
- [x] `generateMetadata()` – Trang chủ, products, product detail, about, 404
- [x] `generateStaticParams()` – Pre-build 24 URL sản phẩm
- [x] Async `params` / `searchParams` (Promise pattern – chuẩn Next.js 16)
- [x] OpenGraph tags (title, description, images, locale vi_VN)

### 1.8 Tài Liệu Dự Án
- [x] `Readme.txt` – Thông tin nhóm, mô tả, yêu cầu, hướng dẫn, cấu trúc đầy đủ
- [x] `README.md` – Danh sách tất cả trang + rendering mode
- [x] `PLAN.md` – Kế hoạch tiểu luận (source code, báo cáo, video, nộp bài)
- [x] `TECH.md` – Tech stack, bảng màu, typography, cấu trúc thư mục

### 1.9 Lỗi Đã Sửa Trong Quá Trình Phát Triển
| Lỗi | Nguyên nhân | Cách sửa |
|---|---|---|
| CSS parse error | `@import` font phải trước Tailwind | Đảo thứ tự trong globals.css |
| Server Component event handler | onMouseEnter trong Footer, Home, About (Server Components) | Thay bằng CSS class `:hover` |
| Product detail 404 | Next.js 16 yêu cầu params là `Promise<{id}>` | Chuyển sang `async`, `await props.params` |
| Products searchParams error | Next.js 16 yêu cầu searchParams là `Promise<{}>` | Chuyển sang `async`, `await props.searchParams` |
| Category count sai | Số lượng SP per category không khớp data | Sửa count trong `lib/data.ts` |
| Dead imports | Một số page import không dùng đến | Xóa import thừa |
| Version sai | Readme và About ghi Next.js 15 nhưng dùng 16.2.4 | Cập nhật thành "Next.js 16" |
| Hydration error | localStorage đọc trực tiếp trong SSR | Dùng useEffect + mounted state |

---

## PHẦN 2: BÁO CÁO (BẠN TỰ VIẾT)

> Viết theo mẫu Word của Khoa, xuất thành baocao.pdf

### Outline 8 Chương

- [ ] **Trang bìa** – Tên nhóm, MSSV, GVHD, môn học, ngày nộp
- [ ] **Mục lục** (tự động từ Word heading styles)
- [ ] **Chương 1: Giới thiệu Next.js**
  - [ ] 1.1 Lịch sử ra đời (Vercel, 2016, Guillermo Rauch)
  - [ ] 1.2 Vị trí trong hệ sinh thái React/JavaScript
  - [ ] 1.3 Các phiên bản: v1–v12 (Pages Router), v13 (App Router), v14–v16 (stable App Router)
- [ ] **Chương 2: Kiến trúc Next.js**
  - [ ] 2.1 App Router vs Pages Router (so sánh bảng)
  - [ ] 2.2 Server Components vs Client Components ("use client")
  - [ ] 2.3 File-based Routing: dynamic `[slug]`, catch-all `[...]`, route groups `(group)`
  - [ ] 2.4 Sơ đồ kiến trúc tổng quan (tự vẽ hoặc lấy từ nextjs.org)
- [ ] **Chương 3: Các chế độ Rendering** (TRỌNG TÂM)
  - [ ] 3.1 SSG – Static Site Generation (ví dụ: trang chủ ShopNext)
  - [ ] 3.2 SSR – Server-Side Rendering (ví dụ: chi tiết sản phẩm)
  - [ ] 3.3 ISR – Incremental Static Regeneration (ví dụ: danh sách SP, revalidate=60)
  - [ ] 3.4 CSR – Client-Side Rendering (ví dụ: giỏ hàng, tìm kiếm)
  - [ ] 3.5 Bảng so sánh 4 chế độ: thời điểm render, cache, SEO, use case
- [ ] **Chương 4: Tính năng nổi bật**
  - [ ] 4.1 next/image – Lazy loading, AVIF/WebP, responsive sizes
  - [ ] 4.2 generateMetadata() – SEO động, OpenGraph, template
  - [ ] 4.3 loading.tsx + error.tsx – Streaming UI, Suspense, Error Boundary
  - [ ] 4.4 generateStaticParams – Pre-render dynamic routes
  - [ ] 4.5 Middleware, Route Handlers (API Routes)
- [ ] **Chương 5: Ưu & Nhược điểm**
  - [ ] 5.1 Ưu điểm: SEO tốt, hiệu năng cao, DX tốt, Vercel deploy dễ
  - [ ] 5.2 Nhược điểm: learning curve, server cost, vendor lock-in (Vercel)
  - [ ] 5.3 So sánh với React (CRA/Vite), Vue/Nuxt.js, Angular
- [ ] **Chương 6: Cài đặt & Cấu hình**
  - [ ] 6.1 Yêu cầu: Node.js >= 18, npm
  - [ ] 6.2 `npx create-next-app@latest` (từng bước với screenshot)
  - [ ] 6.3 Cấu trúc file quan trọng: next.config.ts, tsconfig.json, app/layout.tsx
- [ ] **Chương 7: Demo App – TechNext** (TRỌNG TÂM)
  - [ ] 7.1 Mô tả hệ thống, cấu trúc thư mục
  - [ ] 7.2 Screenshot các màn hình (chụp từ localhost:3000)
  - [ ] 7.3 Phân tích kỹ thuật: render mode nào dùng ở trang nào và tại sao
  - [ ] 7.4 Code snippet minh họa: generateStaticParams, generateMetadata, revalidate, "use client"
- [ ] **Chương 8: Kết luận**
  - [ ] Tổng kết nội dung đã tìm hiểu
  - [ ] Bài học rút ra khi làm dự án
  - [ ] Hướng phát triển (thêm API, database, auth, deploy Vercel)
- [ ] **Tài liệu tham khảo** (APA/IEEE)
  - nextjs.org/docs, nextjs.org/blog, vercel.com, react.dev, github.com/vercel/next.js

### Tiêu Chí Chấm Điểm Báo Cáo

| Tiêu chí | Điểm | Cách đạt tối đa |
|---|---|---|
| Nội dung tìm hiểu | 2.0đ | Phân tích sâu 4 render mode với code snippet từ TechNext |
| Tính đúng đắn | 1.0đ | Viết lại bằng lời nhóm, trích dẫn nextjs.org/docs chính xác |
| Phong cách trình bày | 1.0đ | Đúng mẫu Khoa, font đồng bộ, không lỗi chính tả |
| Hình ảnh/bảng biểu | 0.5đ | Screenshot app thực, sơ đồ kiến trúc, bảng so sánh rendering |
| Bìa/mục lục/tham khảo | 0.5đ | Đúng thông tin MSSV, danh sách tài liệu chuẩn |

---

## PHẦN 3: VIDEO DEMO (BẠN TỰ QUAY)

> Tối đa 20 phút, ≥ 720p, file: demo.mp4

- [ ] Cài OBS Studio (hoặc phần mềm quay)
- [ ] Chuẩn bị slide lý thuyết (5–7 slides)
- [ ] Chạy `npm run dev` trước khi quay

| Phần | Nội dung cụ thể | Thời lượng |
|---|---|---|
| Mở đầu | Giới thiệu nhóm (tên, MSSV), đề tài Next.js | ~1 phút |
| Lý thuyết | Slide 1: Next.js là gì · Slide 2: Kiến trúc App Router · Slide 3: 4 rendering modes · Slide 4: Tính năng nổi bật · Slide 5: Ưu/nhược điểm | ~6–7 phút |
| Demo trực tiếp | Mở localhost:3000, đi qua 8 trang, giải thích kỹ thuật từng trang | ~8–9 phút |
| Code walkthrough | Mở VS Code, chỉ ra: revalidate=60, generateStaticParams, "use client", generateMetadata | ~2 phút |
| Kết luận | Tổng kết, cảm ơn | ~1 phút |

### Kịch Bản Demo (các trang chính)
1. `/` – Chỉ ra SSG: "trang này được generate static lúc build"; Hero carousel video
2. `/products` – Chỉ ra ISR: `export const revalidate = 60` → tự động cập nhật sau 60s
3. `/products/3` – Chỉ ra SSR: `generateStaticParams` pre-render 24 URL, `generateMetadata` cho SEO
4. Thêm vào giỏ → Chỉ ra CSR: "use client", useState, Context API
5. `/cart` – Chỉ ra CSR: quantity controls, ShippingForm, tính tiền ship, tổng cộng
6. `/search` – Chỉ ra CSR: Suspense boundary, real-time filter, searchParams
7. `/about` – Chỉ ra Static page, timeline, tech stack
8. `/login` + `/register` – Chỉ ra Auth flow: AuthContext, localStorage persist
9. `/profile` + `/orders` – Chỉ ra account management: thông tin cá nhân, lịch sử đơn hàng
10. `/xyz` – Chỉ ra Custom 404: not-found.tsx

---

## PHẦN 4: NỘP BÀI

> XÓA node_modules/ và .next/ trước khi nén!
> Định dạng tên: MSSV1_MSSV2.zip

### Cấu Trúc Thư Mục Nộp
```
MSSV1_MSSV2/
├── baocao.pdf              ← Xuất từ Word
├── demo.mp4               ← Video quay màn hình
├── Readme.txt             ← Copy từ e:\Web\GK\technext\Readme.txt
├── PhieuTuDanhGia.pdf     ← Nếu có yêu cầu
└── source/
    └── technext/          ← Copy e:\Web\GK\technext (BỎ node_modules và .next)
        ├── app/
        ├── components/
        ├── context/
        ├── lib/
        ├── public/
        ├── next.config.ts
        ├── package.json
        ├── tsconfig.json
        └── Readme.txt
```

### Checklist Nộp Bài
- [ ] Điền MSSV (dòng 5–6) và GVHD (dòng 11) vào `Readme.txt`
- [ ] Viết xong báo cáo Word → xuất `baocao.pdf`
- [ ] Quay xong video → lưu `demo.mp4`
- [ ] Tạo thư mục `MSSV1_MSSV2/`
- [ ] Copy source code vào `source/technext/`
- [ ] XÓA `node_modules/` và `.next/` trong source
- [ ] Đặt baocao.pdf, demo.mp4, Readme.txt vào thư mục gốc
- [ ] Nén thành `MSSV1_MSSV2.zip`
- [ ] Kiểm tra: giải nén → `cd source/technext` → `npm install` → `npm run dev` → OK
- [ ] Nộp lên hệ thống theo hướng dẫn Khoa

---

## TỔNG TIẾN ĐỘ

```
Source Code  ████████████████████ 100%  ✓ HOÀN THÀNH
Báo Cáo      ░░░░░░░░░░░░░░░░░░░░   0%  Chưa làm
Video Demo   ░░░░░░░░░░░░░░░░░░░░   0%  Chưa làm
Nộp Bài      ░░░░░░░░░░░░░░░░░░░░   0%  Chưa làm
```

---

## THỐNG KÊ DỰ ÁN

| Chỉ số | Giá trị |
|---|---|
| Tổng số file source | ~35+ files (tsx/ts/css/txt/md) |
| Tổng số sản phẩm mock | 24 sản phẩm, 5 danh mục |
| Tổng số trang | 14 trang + loading + error |
| Rendering modes | SSG, ISR, SSR, CSR (đủ 4 loại) |
| Components | 9 (Navbar, Footer, ProductCard, HeroCarousel, PromoBanner, FeaturedProducts, FlashSaleBannerHero, FlashSaleCountdown, ShippingForm) |
| Contexts | 2 (CartContext, AuthContext) |
| Lib files | 4 (types.ts, data.ts, utils.ts, vietnam-divisions.ts) |
| Next.js version | 16.2.4 |
| React version | 19.2.4 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| Motion | ^12.38.0 |

---

## PHẦN 5: CẬP NHẬT TÍNH NĂNG (Đã Hoàn Thành)

> Ghi lại các cải tiến bổ sung theo yêu cầu người dùng.

### 5.1 Cải Thiện Dữ Liệu & Danh Mục (Session 1)
- [x] **Gỡ bỏ danh mục "Tai Nghe" và "Phụ Kiện"** – Web chỉ tập trung điện thoại & tablet
- [x] **Thêm trường `brand`** vào interface `Product` và toàn bộ 25 sản phẩm
- [x] **Cập nhật `ProductsClient.tsx`** – Component lọc sản phẩm client-side mới hoàn toàn
- [x] **Sửa mega-menu Navbar** – Gỡ bỏ Tai Nghe / Phụ Kiện, giữ Điện Thoại + Tablet
- [x] **Product page** (`app/products/page.tsx`) refactor thành thin wrapper gọi `ProductsClient`

### 5.2 Navbar Hover Fix (Session 2 – Lần 1)
- [x] **Tăng delay đóng mega-menu** từ 120ms → 350ms (đủ thời gian di chuột vào dropdown)
- [x] **Thêm `cancelClose()`** vào mega-menu panel – panel không đóng khi chuột đang bên trong
- [x] **User menu** (`onMouseLeave` instant → `userTimer` 350ms delay)
- [x] **Thêm `cancelCloseUser()`** vào dropdown panel – đăng nhập không bị đóng khi di chuột

### 5.3 Hệ Thống Lọc Nâng Cao 10 Chiều (Session 2 – Lần 1)
- [x] **10 bộ lọc**: Thương hiệu · Mức giá · Đánh giá · RAM · Dung lượng ROM · Hệ điều hành · Tần số quét · Sạc nhanh (W) · Nhu cầu · Tính năng đặc biệt
- [x] **Toolbar sticky** – Brand pills, price presets, sort dropdown
- [x] **Sidebar desktop** với cuộn, **Bottom-sheet mobile** drawer
- [x] **Live count** – "Hiển thị N sản phẩm", "N bộ lọc đang bật"
- [x] **Empty state** – Khi 0 kết quả có nút xoá bộ lọc

### 5.4 Tính Năng So Sánh Sản Phẩm (Session 2 – Lần 1)
- [x] **Nút "⚖️ So sánh"** trên mỗi product card (toggle, tối đa 3 SP)
- [x] **Compare bar** cố định dưới trang với thumbnail, nút xoá từng SP, nút "So sánh ngay →"
- [x] **Trang `/compare`** (`app/compare/page.tsx`) – Bảng side-by-side: ảnh, giá (highlight rẻ nhất), đánh giá, nhãn, và toàn bộ detailedSpecs

### 5.5 Sửa Lỗi & Bổ Sung (Session 2 – Lần 2)
- [x] **[Navbar] Xiaomi 15 Ultra image** – Sửa đường dẫn `den.png` → `bac.jpg` (file thực tế)
- [x] **[Data] Thêm trường `features[]`** vào interface `Product` (lib/types.ts)
- [x] **[Data] Gán tags cho 15 điện thoại**:
  - iPhone 1-5: `["face-id", "ip68", "5g", "nfc", "ai", "magsafe"]`
  - Xiaomi 17/15: `["5g", "nfc", "ai"]`; Xiaomi 17 Ultra/15 Ultra: thêm `"ip68"`
  - Samsung S26 Ultra/S25 Ultra: `["5g", "nfc", "ai", "ip68", "s-pen"]`
  - Samsung S26+/S26/S25+/S25: `["5g", "nfc", "ai", "ip67"]`
- [x] **[Data] Cập nhật variants RAM/ROM** cho Samsung S25, S25+, S25 Ultra (từ "256GB" → "12GB/256GB")
- [x] **[Filter] Bộ lọc tính năng dùng `p.features[]`** thay vì string matching → chính xác 100%
- [x] **[Filter UI] Popup collapsible** – Nút "⚙️ Bộ lọc ▼" mở/đóng panel 2 cột phía dưới toolbar, không phải sidebar cố định
  - Popup có "Xem N kết quả →" và "Xong ✓"
  - Click ngoài popup để đóng
- [x] **[Filter] Sửa nhãn tính năng**:
  - "AI phone" → **"Hỗ trợ AI"** (rõ ràng hơn)
  - "Kháng nước" → **"Kháng nước IP68+"** (có chuẩn IP cụ thể)
- [x] **[Filter] Rating filter** – Hoạt động chính xác với button click
- [x] **TypeScript** – 0 errors sau tất cả thay đổi

### 5.6 Kết Quả Kiểm Thử
| Bộ lọc | Kết quả | Đúng mong đợi |
|---|---|---|
| Face ID | 5 SP (tất cả iPhone) | ✅ |
| Kháng nước IP68+ | 9 SP (iPhone + Xiaomi Ultra + Samsung Ultra) | ✅ |
| Hỗ trợ AI | 15 SP (toàn bộ điện thoại) | ✅ |
| S Pen | 2 SP (S26 Ultra + S25 Ultra) | ✅ |
| 5G | 15 SP (toàn bộ điện thoại) | ✅ |
| Face ID + iOS | 5 SP (chỉ iPhone) | ✅ |
| So sánh 3 SP | Hiển thị bảng side-by-side | ✅ |
| Navbar hover delay | 350ms, không đóng khi di chuột vào panel | ✅ |

