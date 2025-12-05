import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import Category from '@/lib/models/Category';
import { products, categories } from '@/lib/data';

export async function POST() {
  try {
    await connectDB();

    await Product.deleteMany({});
    await Category.deleteMany({});

    await Category.insertMany(categories);
    await Product.insertMany(products);

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully!',
      products: products.length,
      categories: categories.length
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
