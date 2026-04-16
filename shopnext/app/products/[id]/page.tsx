import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductById } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

// Pre-render all product paths at build time (SSG)
export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = getProductById(Number(params.id));
  if (!product) return { title: "Sản phẩm không tồn tại" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const product = getProductById(Number(params.id));

  if (!product) notFound();

  // TypeScript guard: product is guaranteed non-null after notFound()
  const safeProduct = product!;

  const related = products
    .filter(
      (p) => p.category === safeProduct.category && p.id !== safeProduct.id
    )
    .slice(0, 4);

  return <ProductDetailClient product={safeProduct} related={related} />;
}
