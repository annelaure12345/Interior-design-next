import { NextResponse } from 'next/server';
import { Order } from '@/types';

// In a real application, you would save orders to a database
// For now, we'll just simulate order creation
let orders: Order[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: body.items,
      total: body.total,
      customerName: body.customerName,
      email: body.email,
      address: body.address,
      phone: body.phone,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    orders.push(order);

    // In a real app, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Process payment
    // 4. Update inventory

    return NextResponse.json({ 
      success: true, 
      orderId: order.id 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
