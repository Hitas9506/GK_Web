"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { CartItem, Product } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: number, size: string, color: string) => void;
  updateQuantity: (
    productId: number,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CART_KEY = "shopnext_cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

/** Persist helper */
function persistCart(next: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota errors */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Bug 2 fix: read from localStorage on first render so cart survives refreshes
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const addItem = useCallback(
    (product: Product, size: string, color: string) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) =>
            i.product.id === product.id &&
            i.size === size &&
            i.color === color
        );
        const next = existing
          ? prev.map((i) =>
              i.product.id === product.id && i.size === size && i.color === color
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          : [...prev, { product, quantity: 1, size, color }];
        persistCart(next);
        return next;
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: number, size: string, color: string) => {
      setItems((prev) => {
        const next = prev.filter(
          (i) =>
            !(
              i.product.id === productId &&
              i.size === size &&
              i.color === color
            )
        );
        persistCart(next);
        return next;
      });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: number, size: string, color: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, color);
        return;
      }
      setItems((prev) => {
        const next = prev.map((i) =>
          i.product.id === productId && i.size === size && i.color === color
            ? { ...i, quantity }
            : i
        );
        persistCart(next);
        return next;
      });
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    persistCart([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
