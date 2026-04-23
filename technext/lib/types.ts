export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand?: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: "new" | "sale" | "hot";
  variants: string[];
  variantPrices: Record<string, number>;
  colors: string[];
  colorImages: Record<string, string>;
  inStock: boolean;
  featured?: boolean;
  specs?: string;
  detailedSpecs?: { label: string; value: string }[];
  /** Tag-based features for filtering, e.g. ["5g","nfc","face-id","ip68","ai","s-pen","wireless-charge"] */
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  shippingInfo?: ShippingInfo;
  userId?: string;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
}
