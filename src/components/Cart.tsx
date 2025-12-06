'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

function getItemKey(productId: string, size?: string, color?: string): string {
  return `${productId}-${size || 'default'}-${color || 'default'}`;
}

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const [imageErrors, setImageErrors] = React.useState<Set<string>>(new Set());

  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set(prev).add(productId));
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-secondary-800">Your Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-secondary-500 hover:text-secondary-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="mt-4 text-secondary-500">Your cart is empty</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const itemKey = getItemKey(item.product._id, item.selectedSize, item.selectedColor);
                  return (
                    <div key={itemKey} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        {imageErrors.has(item.product._id) ? (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No image</span>
                          </div>
                        ) : (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                            onError={() => handleImageError(item.product._id)}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-secondary-800 truncate">{item.product.name}</h3>
                        {(item.selectedSize || item.selectedColor) && (
                          <p className="text-sm text-secondary-500">
                            {item.selectedColor && <span>{item.selectedColor}</span>}
                            {item.selectedColor && item.selectedSize && <span> / </span>}
                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          </p>
                        )}
                        <p className="text-primary-600 font-medium">${item.product.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <button
                            onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(itemKey)}
                        className="p-2 text-secondary-400 hover:text-red-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <span className="text-secondary-600">Subtotal</span>
                <span className="text-xl font-semibold text-secondary-800">${totalPrice.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="block w-full py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-center"
              >
                Checkout
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="block w-full mt-2 py-3 text-secondary-600 font-medium hover:text-secondary-800 transition-colors text-center"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
