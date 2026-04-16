import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ShopNext – Thời Trang Phong Cách",
    template: "%s | ShopNext",
  },
  description:
    "ShopNext – Cửa hàng thời trang online với hàng ngàn sản phẩm áo, quần, váy và phụ kiện chất lượng cao. Mua sắm dễ dàng, giao hàng nhanh chóng.",
  keywords: ["thời trang", "mua sắm online", "áo quần", "shopnext"],
  openGraph: {
    title: "ShopNext – Thời Trang Phong Cách",
    description:
      "Cửa hàng thời trang online chất lượng cao",
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
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
