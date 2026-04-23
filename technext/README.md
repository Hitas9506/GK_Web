# TechNext – Hệ Thống Bán Điện Thoại & Phụ Kiện Công Nghệ

Dự án demo được xây dựng bằng [Next.js 16](https://nextjs.org) (App Router) với TypeScript và Tailwind CSS, phục vụ tiểu luận môn **Lập Trình Web và Ứng Dụng (503073)**.

## Bắt Đầu

Chạy môi trường phát triển:

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để xem kết quả.

## Các Trang Chính

| Trang | URL | Kỹ thuật Rendering |
|---|---|---|
| Trang chủ | `/` | SSG (Static Site Generation) |
| Danh sách sản phẩm | `/products` | ISR (revalidate = 60s) |
| Chi tiết sản phẩm | `/products/[id]` | SSR + generateStaticParams |
| Giỏ hàng | `/cart` | CSR (Client-Side Rendering) |
| Tìm kiếm | `/search` | CSR + useSearchParams |
| Giới thiệu | `/about` | Static |
| Đăng nhập | `/login` | CSR |
| Đăng ký | `/register` | CSR |
| Hồ sơ tài khoản | `/profile` | CSR |
| Lịch sử đơn hàng | `/orders` | CSR |
| Chính sách đổi trả | `/chinh-sach-doi-tra` | Static |
| Liên hệ | `/lien-he` | Static |
| So sánh điện thoại | `/so-sanh-dien-thoai` | CSR |
| Trang 404 | `/bất-kỳ` | Custom not-found.tsx |

## Công Nghệ Sử Dụng

- **Next.js 16.2.4** – App Router, React Server Components
- **React 19.2.4** – UI library
- **TypeScript 5** – Type-safe JavaScript
- **Tailwind CSS 4** – Utility-first CSS framework
- **Motion** – Animation library

## Tìm Hiểu Thêm

- [Tài liệu Next.js](https://nextjs.org/docs) – Tìm hiểu các tính năng và API của Next.js.
- [Học Next.js](https://nextjs.org/learn) – Hướng dẫn tương tác.
- [GitHub Next.js](https://github.com/vercel/next.js) – Mã nguồn mở.
