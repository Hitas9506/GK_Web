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

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback(
    (product: Product, size: string, color: string) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) =>
            i.product.id === product.id &&
            i.size === size &&
            i.color === color
        );
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id && i.size === size && i.color === color
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, { product, quantity: 1, size, color }];
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: number, size: string, color: string) => {
      setItems((prev) =>
        prev.filter(
          (i) =>
            !(
              i.product.id === productId &&
              i.size === size &&
              i.color === color
            )
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: number, size: string, color: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, color);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.size === size && i.color === color
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

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
