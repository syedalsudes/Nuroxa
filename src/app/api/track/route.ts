import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ success: false, message: "Tracking ID is required" }, { status: 400 });
    }

    // Database mein Order ID se search kar rahe hain
    const order = await Order.findOne({ orderId });

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found. Please check your ID." }, { status: 404 });
    }

    return NextResponse.json({ success: true, order }, { status: 200 });

  } catch (error: any) {
    console.error("Tracking error:", error);
    return NextResponse.json(
      { success: false, message: "Server error while tracking order", error: error.message },
      { status: 500 }
    );
  }
}