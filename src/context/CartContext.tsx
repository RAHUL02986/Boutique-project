'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '@/types';

interface AddToCartOptions {
  product: Product;
  quantity?: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (options: AddToCartOptions) => void;
  removeFromCart: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getItemKey(productId: string, size?: string, color?: string): string {
  return `${productId}-${size || 'default'}-${color || 'default'}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = ({ product, quantity = 1, selectedSize, selectedColor }: AddToCartOptions) => {
    setItems((prevItems) => {
      const itemKey = getItemKey(product._id, selectedSize, selectedColor);
      const existingItemIndex = prevItems.findIndex(
        (item) => getItemKey(item.product._id, item.selectedSize, item.selectedColor) === itemKey
      );
      
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      }
      
      return [...prevItems, { 
        product, 
        quantity,
        selectedSize,
        selectedColor,
      }];
    });
  };

  const removeFromCart = (itemKey: string) => {
    setItems((prevItems) => 
      prevItems.filter((item) => 
        getItemKey(item.product._id, item.selectedSize, item.selectedColor) !== itemKey
      )
    );
  };

  const updateQuantity = (itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        getItemKey(item.product._id, item.selectedSize, item.selectedColor) === itemKey
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
