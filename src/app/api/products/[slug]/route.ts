import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    
    // Slug ke zariye database se single product find kar rahe hain
    const product = await Product.findOne({ slug: params.slug });
    
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error fetching product", error: error.message },
      { status: 500 }
    );
  }
}