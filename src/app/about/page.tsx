import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary-800">About Us</h1>
          <p className="mt-4 text-secondary-600 max-w-2xl mx-auto">
            Discover the story behind Boutique
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                alt="Our boutique store"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-secondary-800 mb-6">Our Story</h2>
              <p className="text-secondary-600 mb-4">
                Founded in 2010, Boutique began with a simple vision: to create a fashion destination that celebrates 
                individuality and empowers women to express themselves through style.
              </p>
              <p className="text-secondary-600 mb-4">
                What started as a small corner shop has grown into a beloved brand, known for curating the finest 
                fashion pieces from around the world. We believe that every woman deserves to feel confident and 
                beautiful, and our carefully selected collections reflect that belief.
              </p>
              <p className="text-secondary-600">
                Today, we continue to stay true to our roots while embracing innovation. Each piece in our collection 
                is chosen with care, ensuring quality, elegance, and timeless style that transcends seasons.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-secondary-800 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-4">Quality First</h3>
              <p className="text-secondary-600">
                We source only the finest materials and work with skilled artisans to ensure every piece meets 
                our high standards of quality and craftsmanship.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-4">Sustainability</h3>
              <p className="text-secondary-600">
                We are committed to sustainable practices, from eco-friendly packaging to partnering with 
                brands that share our environmental values.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-4">Community</h3>
              <p className="text-secondary-600">
                We believe in building a community of confident women who inspire and support each other 
                in their personal style journeys.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-secondary-800 mb-8">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-bold text-primary-600">10+</p>
              <p className="text-secondary-600 mt-2">Years in Business</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-600">50K+</p>
              <p className="text-secondary-600 mt-2">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-600">500+</p>
              <p className="text-secondary-600 mt-2">Products</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-600">15</p>
              <p className="text-secondary-600 mt-2">Countries Served</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
