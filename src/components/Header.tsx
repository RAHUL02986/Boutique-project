'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Cart from './Cart';
import { categories } from '@/lib/data';

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const { totalItems, setIsCartOpen } = useCart();
  const { user, login, logout } = useAuth();

  const handleImageError = (categorySlug: string) => {
    setImageErrors(prev => new Set(prev).add(categorySlug));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      setIsLoginModalOpen(false);
      setEmail('');
      setPassword('');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-serif font-bold text-primary-600">Boutique</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-secondary-700 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <Link
                  href="/shop"
                  className="text-secondary-700 hover:text-primary-600 transition-colors flex items-center"
                >
                  Shop
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {isMegaMenuOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-xl rounded-lg p-6 mt-2">
                    <div className="grid grid-cols-2 gap-6">
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/category/${category.slug}`}
                          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-secondary-800 group-hover:text-primary-600">
                              {category.name}
                            </h3>
                            <p className="text-sm text-secondary-500 mt-1">{category.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link
                        href="/shop"
                        className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                      >
                        View All Products
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/about" className="text-secondary-700 hover:text-primary-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-secondary-700 hover:text-primary-600 transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-secondary-700">Welcome, {user.email}</span>
                  {user.role === 'super_admin' && (
                    <Link
                      href="/admin"
                      className="text-secondary-700 hover:text-primary-600 transition-colors"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="text-secondary-700 hover:text-primary-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-secondary-700 hover:text-primary-600 transition-colors"
                >
                  Login
                </button>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-secondary-700 hover:text-primary-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-secondary-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/"
                className="block text-secondary-700 hover:text-primary-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="block text-secondary-700 hover:text-primary-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <div className="pl-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="block text-sm text-secondary-500 hover:text-primary-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/about"
                className="block text-secondary-700 hover:text-primary-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-secondary-700 hover:text-primary-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}

        {isLoginModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsLoginModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </header>
      <Cart />
    </>
  );
}
