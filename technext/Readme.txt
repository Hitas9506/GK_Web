================================================================================
THÔNG TIN NHÓM
================================================================================
[Điền tên và MSSV của các thành viên vào đây]
- Thành viên 1: [Hoàng Thái Đăng Khoa] – MSSV: [52400017]
- Thành viên 2: [Tạ Đình Quốc Thái] – MSSV: [52400035]
- Thành viên 3: [Nguyễn Huy Hoàng] – MSSV: [52400116]

Môn học  : Lập Trình Web và Ứng Dụng – 503073
Học kỳ   : 2 – Năm học 2025-2026
Đề tài   : Next.js (Đề tài số 11)
GVHD     : [Tên giảng viên phụ trách]

================================================================================
MÔ TẢ DỰ ÁN
================================================================================
TechNext – Hệ thống bán điện thoại & phụ kiện công nghệ online được xây dựng bằng Next.js 16
App Router với TypeScript nhằm minh họa các tính năng nổi bật của framework:
  - SSG   (Static Site Generation)  → Trang chủ (/), Giới Thiệu (/about),
                                       Chính Sách Đổi Trả (/chinh-sach-doi-tra),
                                       Liên Hệ (/lien-he)
  - ISR   (Incremental Static Regen)→ Danh sách sản phẩm (/products)
  - SSR   (Server-Side Rendering)   → Chi tiết sản phẩm (/products/[id])
  - CSR   (Client-Side Rendering)   → Giỏ hàng (/cart), Tìm kiếm (/search),
                                       Đăng nhập (/login), Đăng ký (/register),
                                       Hồ sơ (/profile), Đơn hàng (/orders),
                                       So sánh điện thoại (/so-sanh-dien-thoai)
  - generateStaticParams            → Pre-render tất cả trang sản phẩm
  - generateMetadata                → SEO động cho từng trang
  - next/image                      → Tối ưu hình ảnh
  - loading.tsx, error.tsx          → Streaming UI và Error Boundary
  - not-found.tsx                   → Custom 404

================================================================================
YÊU CẦU HỆ THỐNG
================================================================================
  - Node.js   >= 18.x (khuyến nghị 20.x LTS)
  - npm       >= 9.x
  - Hệ điều hành: Windows / macOS / Linux

Kiểm tra phiên bản:
  node -v
  npm -v

================================================================================
HƯỚNG DẪN CÀI ĐẶT & CHẠY
================================================================================

Bước 1: Giải nén file ZIP (nếu chưa giải nén)

Bước 2: Mở terminal và di chuyển vào thư mục source
  cd source/technext

Bước 3: Cài đặt dependencies
  npm install

Bước 4: Chạy môi trường phát triển
  npm run dev

Bước 5: Mở trình duyệt và truy cập
  http://localhost:3000

================================================================================
GHI CHÚ QUAN TRỌNG
================================================================================
  - KHÔNG cần database, KHÔNG cần file .env, KHÔNG cần kết nối internet.
  - Toàn bộ dữ liệu là mock data được lưu trong file: lib/data.ts
  - Xác thực người dùng (Auth) được xử lý bằng localStorage thông qua AuthContext.
  - Hình ảnh sản phẩm là placeholder (nếu không hiển thị được ảnh,
    component sẽ tự động fallback sang icon emoji).
  - Để build production: npm run build && npm start

================================================================================
CẤU TRÚC THƯ MỤC
================================================================================
technext/
 ├── app/                              # Next.js App Router
 │   ├── layout.tsx                    # Root layout (PromoBanner, Navbar, Footer, Providers)
 │   ├── page.tsx                      # Trang chủ – SSG (Hero carousel, Flash sale, sản phẩm)
 │   ├── globals.css                   # Global CSS (Tailwind, biến màu, animations)
 │   ├── not-found.tsx                 # Custom 404
 │   ├── products/
 │   │   ├── page.tsx                  # Danh sách SP – ISR (revalidate=60)
 │   │   ├── loading.tsx               # Skeleton loading UI
 │   │   ├── error.tsx                 # Error boundary
 │   │   └── [id]/
 │   │       ├── page.tsx              # Chi tiết SP – SSR + generateStaticParams
 │   │       └── ProductDetailClient.tsx  # Client component (chọn variant/màu, thêm giỏ)
 │   ├── cart/
 │   │   └── page.tsx                  # Giỏ hàng – CSR (quản lý số lượng, checkout)
 │   ├── search/
 │   │   └── page.tsx                  # Tìm kiếm – CSR (real-time filter, URL sync)
 │   ├── about/
 │   │   └── page.tsx                  # Giới thiệu – Static (mission, timeline, team)
 │   ├── login/
 │   │   └── page.tsx                  # Đăng nhập – CSR (form + mock Google/Facebook)
 │   ├── register/
 │   │   └── page.tsx                  # Đăng ký – CSR (form tạo tài khoản)
 │   ├── profile/
 │   │   └── page.tsx                  # Hồ sơ – CSR (thông tin cá nhân, địa chỉ)
 │   ├── orders/
 │   │   └── page.tsx                  # Lịch sử đơn hàng – CSR (danh sách, trạng thái)
 │   ├── chinh-sach-doi-tra/
 │   │   └── page.tsx                  # Chính sách đổi trả – Static
 │   ├── lien-he/
 │   │   └── page.tsx                  # Liên hệ – Static
 │   └── so-sanh-dien-thoai/
 │       └── page.tsx                  # So sánh điện thoại – CSR
 ├── components/
 │   ├── Navbar.tsx                    # Thanh điều hướng responsive (mega menu, auth, giỏ hàng)
 │   ├── Footer.tsx                    # Chân trang (4 cột: thông tin, danh mục, hỗ trợ, liên hệ)
 │   ├── ProductCard.tsx               # Card sản phẩm (next/image, badge, add-to-cart)
 │   ├── HeroCarousel.tsx              # Carousel full-width trang chủ (auto-slide, arrows, dots)
 │   ├── PromoBanner.tsx               # Banner promo trên cùng (USP: ship/bảo hành/đổi trả)
 │   ├── FeaturedProducts.tsx          # Lưới sản phẩm nổi bật (filter theo danh mục)
 │   ├── FlashSaleBannerHero.tsx       # Banner Flash Sale với countdown
 │   ├── FlashSaleCountdown.tsx        # Đồng hồ đếm ngược Flash Sale
 │   └── ShippingForm.tsx              # Form nhập địa chỉ giao hàng (tỉnh/huyện/xã)
 ├── context/
 │   ├── CartContext.tsx               # Cart state (React Context API – addItem, removeItem, ...)
 │   └── AuthContext.tsx               # Auth state (đăng nhập, đăng ký, localStorage persist)
 ├── lib/
 │   ├── types.ts                      # TypeScript interfaces (Product, CartItem, Order, ...)
 │   ├── data.ts                       # Mock data (24 sản phẩm, 5 danh mục, helper functions)
 │   ├── utils.ts                      # Utility functions (formatPrice, calculateDiscount, ...)
 │   └── vietnam-divisions.ts          # Dữ liệu tỉnh/huyện/xã Việt Nam (cho form địa chỉ)
 ├── public/
 │   ├── APPLE.svg                     # Logo Apple
 │   ├── SAMSUNG.svg                   # Logo Samsung
 │   ├── XIAOMI.png                    # Logo Xiaomi
 │   └── videos/                       # Video sản phẩm (Hero Carousel)
 │       ├── iphone-17-pro.mp4
 │       ├── ipad-m5.mp4
 │       ├── ipad-air.webm
 │       ├── mi17ultra.mp4
 │       ├── samsung-s26-ultra.webm
 │       └── xiaomi-pad-8-pro.webm
 ├── next.config.ts
 ├── tsconfig.json
 ├── postcss.config.mjs
 ├── eslint.config.mjs
 ├── package.json
 └── Readme.txt

================================================================================
CÁC TRANG CHÍNH
================================================================================
  /                      → Trang chủ (SSG): Hero carousel, Flash sale, danh mục, sản phẩm nổi bật
  /products              → Tất cả sản phẩm (ISR): Filter theo danh mục
  /products/[id]         → Chi tiết sản phẩm (SSR): Chọn phiên bản/màu, thêm giỏ
  /cart                  → Giỏ hàng (CSR): Quản lý số lượng, nhập địa chỉ, tính tổng
  /search                → Tìm kiếm (CSR): Real-time filter, URL sync
  /about                 → Giới thiệu (Static): Về TechNext, sứ mệnh, đội ngũ
  /login                 → Đăng nhập (CSR): Form + mock Google/Facebook login
  /register              → Đăng ký (CSR): Tạo tài khoản mới
  /profile               → Hồ sơ (CSR): Thông tin cá nhân, địa chỉ giao hàng
  /orders                → Đơn hàng (CSR): Lịch sử mua hàng, trạng thái đơn
  /chinh-sach-doi-tra    → Chính sách đổi trả (Static)
  /lien-he               → Liên hệ (Static)
  /so-sanh-dien-thoai    → So sánh điện thoại (CSR)
  /[bất-kỳ]             → 404 (Custom not-found.tsx)

================================================================================
