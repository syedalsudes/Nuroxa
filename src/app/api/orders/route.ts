import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const generateOrderId = () => {
      return `NX-${Math.floor(100000 + Math.random() * 900000)}`;
    };

    let orderId = generateOrderId();
    
    let existingOrder = await Order.findOne({ orderId });
    while (existingOrder) {
      orderId = generateOrderId();
      existingOrder = await Order.findOne({ orderId });
    }

    const newOrder = await Order.create({
      orderId,
      customer: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        country: body.country,
      },
      items: body.cart,
      pricing: {
        subtotal: body.subtotal,
        deliveryFee: body.deliveryFee,
        total: body.total,
      },
      paymentMethod: body.paymentMethod || "COD",
      instructions: body.instructions || "",
    });

    return NextResponse.json({ success: true, orderId: newOrder.orderId }, { status: 201 });

  } catch (error: any) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { success: false, message: "Order failed", error: error.message },
      { status: 500 }
    );
  }
}