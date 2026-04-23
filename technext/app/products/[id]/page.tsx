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

  return <ProductDetailClient product={product!} />;
}
