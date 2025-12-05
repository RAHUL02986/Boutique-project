'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });
  const [updateProductId, setUpdateProductId] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');

  // 🔍 Filter States
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'super_admin') {
      router.push('/');
      return;
    }
    fetchProducts();
  }, [user, router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
        }),
      });

      if (response.ok) {
        alert('Product added successfully');
        setNewProduct({
          name: '',
          price: '',
          description: '',
          category: '',
          image: '',
        });
        fetchProducts();
      } else {
        alert('Error adding product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  const handleUpdatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updateProductId,
          price: parseFloat(updatePrice),
        }),
      });

      if (response.ok) {
        alert('Price updated successfully');
        setUpdateProductId('');
        setUpdatePrice('');
        fetchProducts();
      } else {
        alert('Error updating price');
      }
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Error updating price');
    }
  };

  if (!user || user.role !== 'super_admin') {
    return <div>Access denied</div>;
  }

  // 🔎 Filtered Products
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchName.toLowerCase()) &&
      product.category.toLowerCase().includes(searchCategory.toLowerCase()) &&
      product._id.toLowerCase().includes(searchId.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md"
              >
                Add Product
              </button>
            </form>
          </div>

          {/* Update Price Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Update Product Price</h2>
            <form onSubmit={handleUpdatePrice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product ID</label>
                <input
                  type="text"
                  value={updateProductId}
                  onChange={(e) => setUpdateProductId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">New Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={updatePrice}
                  onChange={(e) => setUpdatePrice(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md"
              >
                Update Price
              </button>
            </form>
          </div>
        </div>

        {/* Products List */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Products</h2>

          {/* Filter Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />

            <input
              type="text"
              placeholder="Search by Category"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />

            <input
              type="text"
              placeholder="Search by Product ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Category</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{product._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
