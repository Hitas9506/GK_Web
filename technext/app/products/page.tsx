import type { Metadata } from "next";
import { products } from "@/lib/data";
import ProductsClient from "@/components/ProductsClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cửa Hàng | TechNext",
  description:
    "Điện thoại và máy tính bảng chính hãng Apple, Samsung, Xiaomi. Giá tốt nhất, bảo hành 12 tháng, giao hàng toàn quốc.",
};

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string; brand?: string }>;
}) {
  const { category, brand } = await props.searchParams;
  return (
    <div style={{ paddingTop: "92px" }}>
      <ProductsClient
        allProducts={products}
        defaultCategory={category ?? "all"}
        defaultBrand={brand ?? ""}
      />
    </div>
  );
}
