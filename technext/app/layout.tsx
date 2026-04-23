import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "TechNext – Điện Thoại & Phụ Kiện Chính Hãng",
    template: "%s | TechNext",
  },
  description:
    "TechNext – Cửa hàng điện thoại, tablet, tai nghe và phụ kiện công nghệ chính hãng. Giá tốt nhất, giao hàng toàn quốc.",
  keywords: [
    "điện thoại", "smartphone", "tablet", "tai nghe", "phụ kiện",
    "xiaomi", "samsung", "iphone", "TechNext", "mua điện thoại online",
  ],
  openGraph: {
    title: "TechNext – Điện Thoại & Phụ Kiện Chính Hãng",
    description: "Cửa hàng điện thoại, phụ kiện công nghệ chính hãng. Giá tốt nhất, giao hàng toàn quốc.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          <CartProvider>
            <PromoBanner />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
