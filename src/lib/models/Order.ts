import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. TypeScript Interface for type safety
export interface IOrder extends Document {
  orderNumber: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: {
    product: {
      _id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }[];
  paymentInfo: {
    cardName: string;
    cardNumber: string; // In production, this should be tokenized/encrypted
    expiryDate: string;
    cvv: string; // In production, this should not be stored
  };
  orderTotal: number;
  shipping: number;
  tax: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Schema Definition
const OrderSchema: Schema<IOrder> = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    items: [{
      product: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
      },
      quantity: { type: Number, required: true, min: 1 },
    }],
    paymentInfo: {
      cardName: { type: String, required: true },
      cardNumber: { type: String, required: true }, // Note: In production, use payment processor
      expiryDate: { type: String, required: true },
      cvv: { type: String, required: true }, // Note: In production, don't store CVV
    },
    orderTotal: { type: Number, required: true },
    shipping: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  },
  {
    timestamps: true // Adds createdAt and updatedAt
  }
);

// 3. Model Export with Next.js reload check
const Order: Model<IOrder> = (mongoose.models.Order ||
  mongoose.model<IOrder>('Order', OrderSchema)) as Model<IOrder>;

export default Order;
