// File: pages/api/seed.ts

import connectDB from '../../../lib/mongodb'; 
import Product, { IProduct } from '../../../lib/models/Product';
import { NextApiRequest, NextApiResponse } from 'next';

// Dummy data using the IProduct structure
const sampleProducts: Partial<IProduct>[] = [
  {
    name: 'Classic Cotton T-Shirt',
    price: 29.99,
    description: 'A soft, breathable, and durable t-shirt for everyday comfort.',
    category: 'Apparel/Tops',
    image: '/images/products/classic-tee.jpg',
    countInStock: 25,
    featured: true
  },
  {
    name: 'Premium Slim-Fit Jeans',
    price: 89.50,
    description: 'High-quality denim with a modern slim-fit cut. Features five pockets and subtle distressing.',
    category: 'Apparel/Bottoms',
    image: '/images/products/slim-jeans.jpg',
    countInStock: 15,
    featured: false
  },
  {
    name: 'Luxury Leather Wallet',
    price: 49.99,
    description: 'Hand-stitched leather wallet with multiple card slots and a dedicated cash compartment.',
    category: 'Accessories',
    image: '/images/products/leather-wallet.jpg',
    countInStock: 40,
    featured: true
  }
];


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        // 1. Connect to the Database
        await connectDB();

        // 2. Clear old data (optional, for a clean seed)
        await Product.deleteMany({}); 
        console.log('Existing products cleared.');

        // 3. Insert the dummy products
        await Product.insertMany(sampleProducts);
        
        // 4. Confirm success
        res.status(200).json({ 
            message: 'Database seeded successfully!',
            count: sampleProducts.length,
            targetDB: process.env.MONGODB_URI
        });

    } catch (error) {
        console.error('Seeding failed:', error);
        res.status(500).json({ message: 'Seeding process failed.', error: (error as Error).message });
    }
}