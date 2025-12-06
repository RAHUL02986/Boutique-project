import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Parse form data
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File;

    if (!name || !price || !description || !category || !imageFile) {
      return NextResponse.json({ error: 'All fields including image are required' }, { status: 400 });
    }

    // Validate file type
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // Check file size (5MB limit)
    if (imageFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }

    // Save the uploaded file
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(imageFile.name);
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
    fs.writeFileSync(filepath, buffer);

    // Create product with image path
    const imagePath = `/uploads/${filename}`;
    const product = new Product({
      name,
      price,
      description,
      category,
      image: imagePath,
    });
    await product.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const { id, price } = await request.json();

    if (!id || price === undefined) {
      return NextResponse.json({ error: 'Product ID and price are required' }, { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { price: parseFloat(price) },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
