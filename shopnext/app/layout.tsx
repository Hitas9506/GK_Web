import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ShopNext – Chất Lượng Được Ghi Nhớ Mãi",
    template: "%s | ShopNext",
  },
  description:
    "Chất lượng được ghi nhớ mãi, sau khi giá cả đã bị lãng quên. ShopNext – cửa hàng thời trang chất lượng cao với hàng ngàn sản phẩm áo, quần, váy và phụ kiện. Giao hàng toàn quốc.",
  keywords: ["thời trang", "chất lượng", "mua sắm online", "áo quần", "shopnext"],
  openGraph: {
    title: "ShopNext – Chất Lượng Được Ghi Nhớ Mãi",
    description: "Chất lượng được ghi nhớ mãi, sau khi giá cả đã bị lãng quên.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
