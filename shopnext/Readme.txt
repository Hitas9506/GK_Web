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
ShopNext – Hệ thống bán hàng thời trang online được xây dựng bằng Next.js 16
App Router với TypeScript nhằm minh họa các tính năng nổi bật của framework:
  - SSG   (Static Site Generation)  → Trang chủ (/), Trang About
  - ISR   (Incremental Static Regen)→ Danh sách sản phẩm (/products)
  - SSR   (Server-Side Rendering)   → Chi tiết sản phẩm (/products/[id])
  - CSR   (Client-Side Rendering)   → Giỏ hàng (/cart), Tìm kiếm (/search)
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
  cd source/shopnext

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
  - Hình ảnh sản phẩm là placeholder (nếu không hiển thị được ảnh,
    component sẽ tự động fallback sang icon emoji).
  - Để build production: npm run build && npm start

================================================================================
CẤU TRÚC THƯ MỤC
================================================================================
shopnext/
 ├── app/                      # Next.js App Router
 │   ├── layout.tsx            # Root layout (Navbar, Footer, CartProvider)
 │   ├── page.tsx              # Trang chủ – SSG
 │   ├── not-found.tsx         # Custom 404
 │   ├── products/
 │   │   ├── page.tsx          # Danh sách SP – ISR (revalidate=60)
 │   │   ├── loading.tsx       # Skeleton loading UI
 │   │   ├── error.tsx         # Error boundary
 │   │   └── [id]/
 │   │       ├── page.tsx      # Chi tiết SP – SSR + generateStaticParams
 │   │       └── ProductDetailClient.tsx  # Client component
 │   ├── cart/
 │   │   └── page.tsx          # Giỏ hàng – CSR
 │   ├── search/
 │   │   └── page.tsx          # Tìm kiếm – CSR
 │   └── about/
 │       └── page.tsx          # Giới thiệu – Static
 ├── components/
 │   ├── Navbar.tsx            # Thanh điều hướng responsive
 │   ├── Footer.tsx            # Chân trang
 │   └── ProductCard.tsx       # Card sản phẩm với next/image
 ├── context/
 │   └── CartContext.tsx       # Cart state (React Context API)
 ├── lib/
 │   ├── types.ts              # TypeScript interfaces
 │   ├── data.ts               # Mock data (24 sản phẩm)
 │   └── utils.ts              # Utility functions
 ├── public/
 │   └── images/products/      # (Thư mục ảnh sản phẩm - nếu có)
 ├── next.config.ts
 ├── tailwind.config.ts
 ├── tsconfig.json
 └── package.json

================================================================================
CÁC TRANG CHÍNH
================================================================================
  /              → Trang chủ (SSG): Hero, danh mục, sản phẩm nổi bật
  /products      → Tất cả sản phẩm (ISR): Filter theo danh mục
  /products/[id] → Chi tiết sản phẩm (SSR): Chọn size/màu, thêm giỏ
  /cart          → Giỏ hàng (CSR): Quản lý số lượng, tính tổng
  /search        → Tìm kiếm (CSR): Real-time filter
  /about         → Giới thiệu (Static): Về ShopNext

================================================================================
