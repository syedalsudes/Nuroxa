import mongoose, { Schema, Document, Model } from "mongoose";

// 1. TypeScript Interface define kar rahe hain
export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  images: string;
  colors: string[];
  price: number;       // Number format calculation ke liye behtar hai
  estimatedPrice?: number; // Optional field (old price)
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Schema define kar rahe hain
const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    images: { type: String, required: true },
    colors: { type: [String], default: [] },    
    price: { type: Number, required: true },
    estimatedPrice: { type: Number },
  },
  { timestamps: true }
);

// 3. Model ko export kar rahe hain (Agar pehle se bana hai toh wahi use karega, nahi toh naya banayega)
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;