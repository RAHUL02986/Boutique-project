import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { products } from '@/lib/data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    try {
      await connectDB();
      
      let query: any = {};
      if (category) query.category = category;
      if (featured === 'true') query.featured = true;

      const dbProducts = await Product.find(query).sort({ createdAt: -1 });
      
      if (dbProducts.length > 0) {
        return NextResponse.json(dbProducts);
      }
    } catch (dbError) {
      console.log('MongoDB not available, using local data');
    }

    let filteredProducts = [...products];
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.featured);
    }

    const productsWithIds = filteredProducts.map((p, index) => ({
      ...p,
      _id: `product-${index}`,
    }));

    return NextResponse.json(productsWithIds);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const product = new Product(body);
    await product.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
