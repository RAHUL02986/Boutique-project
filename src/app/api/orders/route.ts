import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { customerInfo, items, paymentInfo, orderTotal, shipping, tax } = body;

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const order = new Order({
      orderNumber,
      customerInfo,
      items,
      paymentInfo,
      orderTotal,
      shipping,
      tax,
      status: 'pending',
    });

    await order.save();

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: order._id
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    const orders = await Order.find({ 'customerInfo.email': email })
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
