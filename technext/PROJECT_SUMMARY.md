# TechNext — Project Summary Graph

> **Framework**: Next.js 16 (App Router) · **Language**: TypeScript · **Styling**: Tailwind CSS 4 + Inline Styles  
> **Storage**: localStorage (no backend) · **Phiên bản**: 2026

---

## 1. Kiến Trúc Tổng Thể

```mermaid
graph TD
    Browser["🌐 Browser"] --> Layout["app/layout.tsx · RootLayout"]
    Layout --> Auth["AuthProvider\ncontext/AuthContext.tsx"]
    Layout --> Cart["CartProvider\ncontext/CartContext.tsx"]
    Layout --> PB["PromoBanner.tsx\nTop USP bar"]
    Layout --> NB["Navbar.tsx\nMega menu + Search + Cart + Auth"]
    Layout --> MAIN["main children\nAll pages render here"]
    Layout --> FT["Footer.tsx\nLinks + Social icons"]
    Auth --> NB
    Cart --> NB
    Cart --> MAIN
```

---

## 2. Cấu Trúc Pages — App Router

```mermaid
graph LR
    APP["app/"] --> HOME["page.tsx\n🏠 Trang Chủ\n(Hero + Flash Sale + Products)"]
    APP --> PROD["products/\n🛍️ Danh Sách Sản Phẩm\n+ [id]/ Chi Tiết SP"]
    APP --> CART["cart/\n🛒 Giỏ Hàng + Checkout\n+ ShippingForm"]
    APP --> ORDERS["orders/\n📦 Quản Lý Đơn Hàng"]
    APP --> PROFILE["profile/\n👤 Hồ Sơ · Đổi MK · Địa chỉ"]
    APP --> LOGIN["login/\n🔐 Đăng Nhập\n(email + social mock)"]
    APP --> REGISTER["register/\n📝 Đăng Ký tài khoản"]
    APP --> ABOUT["about/\n🏢 Giới Thiệu TechNext"]
    APP --> LIENHE["lien-he/\n📞 Liên Hệ + Tạo Phiếu KT"]
    APP --> DOITRA["chinh-sach-doi-tra/\n📋 Chính Sách Đổi Trả"]
    APP --> SEARCH["search/\n🔍 Tìm Kiếm sản phẩm"]
    APP --> COMPARE["so-sanh-dien-thoai/\n⚖️ So Sánh Điện Thoại"]
    APP --> NOTFOUND["not-found.tsx\n❌ 404 Page"]
```

---

## 3. Components Map

```mermaid
graph TD
    subgraph "Always Rendered — Layout Layer"
        PB2["PromoBanner.tsx\nThẻ USP: Bảo Hành · Đổi Trả · Giao Hàng · Trả Góp"]
        NB2["Navbar.tsx ⭐ 75KB\nMega menu 4 loại · Brand tabs · Hỗ Trợ · Search · Cart · Auth dropdown"]
        FT2["Footer.tsx use client\nSocial: FB·TikTok·Zalo·Gmail · Policy links"]
    end

    subgraph "Home Page — app/page.tsx 33KB"
        HC["HeroCarousel.tsx 18KB\nAuto-slide · Arrow nav · Dot nav"]
        FSB["FlashSaleBannerHero.tsx 16KB\nFlash sale countdown + product showcase"]
        FSC["FlashSaleCountdown.tsx\nTimer HH:MM:SS"]
        FP["FeaturedProducts.tsx\nFilter tabs · Product grid"]
        PC["ProductCard.tsx\nRating · Badge · Add to cart"]
    end

    subgraph "Checkout — app/cart/"
        SF["ShippingForm.tsx\nTỉnh/Huyện/Xã picker\n(vietnam-divisions.ts data)"]
    end
```

---

## 4. Navbar — Mega Menu Chi Tiết

```mermaid
graph TD
    NB3["Navbar.tsx"] --> ITEMS["NAV_ITEMS 9 mục"]
    ITEMS --> I1["/ · Trang Chủ"]
    ITEMS --> I2["Cửa Hàng\n→ MEGA: cua-hang\n3 columns: Khám Phá · Dịch Vụ · Cộng Đồng"]
    ITEMS --> I3["Điện Thoại → BRAND: dien-thoai"]
    ITEMS --> I4["Tablet → BRAND: tablet"]
    ITEMS --> I5["Tai Nghe → BRAND: tai-nghe"]
    ITEMS --> I6["Phụ Kiện → BRAND: phu-kien"]
    ITEMS --> I7["/orders · Đơn Hàng"]
    ITEMS --> I8["/about · Giới Thiệu"]
    ITEMS --> I9["Hỗ Trợ → MEGA: ho-tro\n3 columns"]

    I3 --> PH["PHONE_BRANDS\n🍎Apple·🟠Xiaomi·🔵Samsung\n4 sản phẩm mỗi brand"]
    I4 --> TB["TABLET_BRANDS\nidem"]
    I5 --> HP["HEADPHONE_BRANDS\nidem"]
    I6 --> AC["ACCESSORY_BRANDS\nidem"]

    I9 --> HT1["🔧 Hỗ Trợ Kỹ Thuật\nHotline · Hướng dẫn · Tạo Phiếu /lien-he"]
    I9 --> HT2["🛍️ Tư Vấn Bán Hàng\nHotline · socialRow icons\nFacebook·TikTok·Zalo·Gmail"]
    I9 --> HT3["⚙️ Tiện Ích\nĐơn Hàng · Đổi Trả · Bảo Hành · So Sánh"]
```

---

## 5. Auth System — AuthContext.tsx

```mermaid
graph TD
    AC2["AuthContext.tsx use client"] --> SEED["6 Seed Accounts\nadmin / admin@technext.vn\ndemo@technext.vn / khoa / thai / hoang"]
    AC2 --> STORE["localStorage\ntechnext_accounts\ntechnext_user"]

    AC2 --> FN1["login(email, password)\n700ms simulated delay"]
    AC2 --> FN2["loginWithSocial(google|facebook)\nmock random user"]
    AC2 --> FN3["register(name, email, pw)\n600ms simulated delay"]
    AC2 --> FN4["updateProfile(Partial User)"]
    AC2 --> FN5["updateShipping(ShippingInfo)"]
    AC2 --> FN6["changePassword(old, new)\nverifies old pw"]
    AC2 --> FN7["logout()\nremove localStorage"]

    SEED --> ROLES["role: admin | user"]
    ROLES --> ADMIN["admin → thấy tất cả orders"]
    ROLES --> USER["user → thấy orders của mình"]
```

---

## 6. Cart System — CartContext.tsx

```mermaid
graph TD
    CC["CartContext.tsx use client"] --> STATE["items: CartItem[]\nkhởi tạo từ localStorage"]
    CC --> STORE2["localStorage: technext_cart"]
    CC --> FN["addItem(product, variant, color)\nremoveItem()\nupdateQuantity()\nclearCart()"]
    CC --> COMPUTED["totalItems: số lượng tổng\ntotalPrice: tổng tiền"]

    STATE --> CART3["Cart page\nCheckout + ShippingForm"]
    COMPUTED --> BADGE2["Navbar badge 🛒"]
```

---

## 7. Data Layer — lib/

```mermaid
graph TD
    DT2["lib/data.ts 23KB\n27 sản phẩm"] --> PHONE["Điện Thoại 15sp\nApple id1-5: iPhone 17PM/Pro/17/Air/17e\nXiaomi id6-9: 17U/17/15U/15\nSamsung id10-15: S26U/S26+/S26/S25U/S25+/S25"]
    DT2 --> TAB["Máy Tính Bảng 12sp\nApple id16-19: ProM5/AirM4/Gen11/MiniA17\nXiaomi id20-23: Pad8Pro/Pad8/Pad7Pro/Pad7\nSamsung id24-27: TabS11U/S11/S10U/S10+"]
    DT2 --> CATS["categories[]\nall·dien-thoai·tablet·tai-nghe·phu-kien"]
    DT2 --> HELPERS["getProductById()\ngetProductBySlug()\ngetProductsByCategory()\ngetFeaturedProducts()\nsearchProducts()"]

    TY2["lib/types.ts"] --> T["Product · CartItem\nOrder · OrderStatus\nCategory · ShippingInfo"]
    UT2["lib/utils.ts"] --> U["formatPrice()\ncalculateDiscount()"]
    VD2["lib/vietnam-divisions.ts 45KB"] --> V["Toàn bộ Tỉnh/Huyện/Xã\ncủa Việt Nam"]
```

---

## 8. Support Hub Flow — lien-he/

```mermaid
graph TD
    LH2["app/lien-he/page.tsx\nuse client"] --> FORM["Form fields\nHọ tên · Email · SĐT · Mô tả · Loại thiết bị · Hình ảnh"]
    FORM --> TYPE2{"Loại hỗ trợ?"}
    TYPE2 --> |"Kỹ thuật"| KT2["Hiện 3 options:\n📞 Hotline\n📖 Hướng dẫn\n📋 Tạo phiếu"]
    TYPE2 --> |"Bán hàng"| BH2["Form liên hệ thông thường"]
    KT2 --> SUB["Submit → setSubmitted(true)\nThông báo: chờ duyệt phiếu"]
    SUB --> TL["4-step timeline:\n✅ Tiếp nhận\n⏳ Kỹ thuật xem xét\n⏳ Phê duyệt\n⏳ Đến cửa hàng sửa"]
    TL --> BADGE3["Navbar Profile Dropdown:\n🟠 Kiểm Tra Phiếu Kỹ Thuật\n(pulsing orange dot)"]
```

---

## 9. Public Assets

| File | Format | Dùng cho |
|---|---|---|
| `APPLE.svg` | SVG | Brand logo Apple (white path, dark bg) |
| `XIAOMI.png` | PNG | Brand logo Xiaomi (fallback "Mi" text) |
| `SAMSUNG.svg` | SVG | Brand logo Samsung (fallback "S" text) |
| `logo SAMSUNG S.jpg` | JPG | (dự phòng) |
| `facebook.webp` | WebP | Social icon Footer + Navbar |
| `tiktok.avif` | AVIF | Social icon Footer + Navbar |
| `zalo.png` | PNG | Social icon Zalo (white bg) |
| `gmail.webp` | WebP | Social icon Gmail (white bg) |
| `Google.png` | PNG | Google logo (dự phòng) |
| `videos/` | dir | Hero carousel background videos |

---

## 10. File Size Overview

| File | Size | Vai trò |
|---|---|---|
| `components/Navbar.tsx` | **75 KB** | Core mega menu, brand tabs, auth, search |
| `lib/vietnam-divisions.ts` | **45 KB** | Địa giới hành chính toàn quốc |
| `app/page.tsx` | **33 KB** | Trang chủ hoàn chỉnh |
| `lib/data.ts` | **23 KB** | 27 sản phẩm + helpers |
| `components/HeroCarousel.tsx` | **18 KB** | Carousel auto-slide |
| `components/FlashSaleBannerHero.tsx` | **16 KB** | Flash sale banner |
| `components/PromoBanner.tsx` | **9 KB** | Top promo bar |
| `components/Footer.tsx` | **9 KB** | Footer + social icons |
| `context/AuthContext.tsx` | **8 KB** | Auth state + 6 seed accounts |

---

## 11. Seed Accounts (Test Login)

| Email / Username | Password | Role |
|---|---|---|
| `admin` | `admin` | 🛡️ Admin |
| `admin@technext.vn` | `admin` | 🛡️ Admin |
| `demo@technext.vn` | `demo123` | 👤 User |
| `khoa@technext.vn` | `123456` | 👤 User |
| `thai@technext.vn` | `123456` | 👤 User |
| `hoang@technext.vn` | `123456` | 👤 User |

---

## 12. Tech Stack Summary

```mermaid
graph LR
    TS2["TypeScript"] --> NX2["Next.js 16\nApp Router"]
    NX2 --> TW2["Tailwind CSS 4\n+ Inline Styles"]
    NX2 --> LS3["localStorage\nAuth · Cart (no backend)"]
    NX2 --> SVG2["Inline SVG\nApple brand icon"]
    NX2 --> IMG2["Public assets\n.svg · .png · .webp · .avif"]
    NX2 --> PAGES2["12 Routes\nSSR + CSR mixed"]
```
