'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <Link href={`/product/${product._id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.featured && (
            <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs px-2 py-1 rounded">
              Featured
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-white text-secondary-800 px-4 py-2 rounded font-medium">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product._id}`}>
          <h3 className="font-medium text-secondary-800 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-secondary-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-semibold text-primary-600">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="px-4 py-2 bg-secondary-800 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors disabled:bg-secondary-300 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
