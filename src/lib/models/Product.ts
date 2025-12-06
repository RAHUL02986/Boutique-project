// File: models/Product.ts

import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. TypeScript Interface for type safety
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  countInStock: number; // Tracks quantity instead of a simple boolean
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Schema Definition
const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 500 },
    price: { type: Number, required: true, default: 0.00 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    countInStock: { 
      type: Number, 
      required: true, 
      default: 0, 
      min: 0 
    },
    featured: { type: Boolean, default: false },
  },
  { 
    timestamps: true // Adds createdAt and updatedAt 
  }
);

// 3. Model Export with Next.js reload check
const Product: Model<IProduct> = (mongoose.models.Product ||
  mongoose.model<IProduct>('Product', ProductSchema)) as Model<IProduct>;

export default Product;