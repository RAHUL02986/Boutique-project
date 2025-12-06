'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import { categories } from '@/lib/data';
import { Product } from '@/types';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?category=${slug}`);
        if (response.ok) {
          const products = await response.json();
          setCategoryProducts(products);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  if (!category) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-800">Category not found</h1>
          <Link href="/shop" className="mt-4 inline-block text-primary-600 hover:text-primary-700">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${category.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">{category.name}</h1>
            <p className="mt-4 text-lg max-w-xl mx-auto px-4">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-secondary-500">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary-600">Shop</Link>
          <span>/</span>
          <span className="text-secondary-800">{category.name}</span>
        </nav>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <p className="text-secondary-500">Loading products...</p>
        </div>
      ) : categoryProducts.length > 0 ? (
        <ProductGrid products={categoryProducts} />
      ) : (
        <div className="py-16 text-center">
          <p className="text-secondary-500">No products found in this category.</p>
          <Link href="/shop" className="mt-4 inline-block text-primary-600 hover:text-primary-700">
            Browse all products
          </Link>
        </div>
      )}
    </div>
  );
}
