export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: "new" | "sale" | "hot";
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}
