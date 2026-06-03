import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();
    
    // Database se saare products fetch kar rahe hain
    const products = await Product.find({}).sort({ createdAt: -1 }); // Naye products pehle ayenge
    
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Products fetch karne me error aya", error: error.message },
      { status: 500 }
    );
  }
}