import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/lib/models/Category';
import { categories } from '@/lib/data';

export async function GET() {
  try {
    try {
      await connectDB();
      const dbCategories = await Category.find().sort({ name: 1 });
      
      if (dbCategories.length > 0) {
        return NextResponse.json(dbCategories);
      }
    } catch (dbError) {
      console.log('MongoDB not available, using local data');
    }

    const categoriesWithIds = categories.map((c, index) => ({
      ...c,
      _id: `category-${index}`,
    }));

    return NextResponse.json(categoriesWithIds);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const category = new Category(body);
    await category.save();

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
