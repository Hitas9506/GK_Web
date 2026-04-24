import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { CompareProvider } from "@/context/CompareContext";

export const metadata: Metadata = {
  title: {
    default: "TechNext – Điện Thoại & Tablet Chính Hãng",
    template: "%s | TechNext",
  },
  description:
    "TechNext – Cửa hàng điện thoại và tablet chính hãng Apple, Samsung, Xiaomi. Giá tốt nhất, giao hàng toàn quốc.",
  keywords: [
    "điện thoại", "smartphone", "tablet", "xiaomi", "samsung", "iphone", "TechNext",
  ],
  openGraph: {
    title: "TechNext – Điện Thoại & Tablet Chính Hãng",
    description: "Cửa hàng điện thoại và tablet chính hãng. Giá tốt nhất, giao hàng toàn quốc.",
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
            <CompareProvider>
              <PromoBanner />
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </CompareProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

