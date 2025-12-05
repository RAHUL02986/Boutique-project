import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary-400 mb-4">Boutique</h3>
            <p className="text-secondary-300 text-sm">
              Curating the finest fashion pieces for the modern woman. Quality, elegance, and style in every item.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/dresses" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Dresses
                </Link>
              </li>
              <li>
                <Link href="/category/tops" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Tops
                </Link>
              </li>
              <li>
                <Link href="/category/bottoms" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Bottoms
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-secondary-300 text-sm">
              <li>123 Fashion Street</li>
              <li>New York, NY 10001</li>
              <li>hello@boutique.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary-700 text-center text-secondary-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
