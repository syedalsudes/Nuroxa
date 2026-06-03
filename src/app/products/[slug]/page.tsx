"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, ShieldCheck, ArrowLeft } from "lucide-react";

interface ProductType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  colors: string[];
  price: number;
  estimatedPrice?: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug;

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor || product.colors[0],
      quantity: 1
    });

  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();

        if (data.success) {
          setProduct(data.product);
          if (data.product.colors?.length > 0) {
            setSelectedColor(data.product.colors[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  // Discount formula wapas card jaisa kar diya (e.g., "-25%")
  const calculateDiscount = (price: number, estimatedPrice?: number) => {
    if (!estimatedPrice || estimatedPrice <= price) return null;
    const discount = ((estimatedPrice - price) / estimatedPrice) * 100;
    return `-${Math.round(discount)}%`;
  };

  // ---------------- SKELETON LOADER (Themed) ---------------- //
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32 animate-pulse">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 h-[400px] md:h-[500px] bg-amber-50 rounded-3xl border border-amber-100"></div>
          <div className="flex-1 flex flex-col gap-6 pt-4">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="flex gap-4 items-center">
              <div className="h-8 bg-amber-100 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/5"></div>
            </div>
            <div className="h-px bg-gray-100 w-full my-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="flex gap-3 mt-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-14 bg-amber-200 rounded-xl w-full mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- NOT FOUND STATE ---------------- //
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-bold text-gray-900">Product not found</h2>
        <Link href="/" className="text-amber-500 font-semibold hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Shop
        </Link>
      </div>
    );
  }

  const discountLabel = calculateDiscount(product.price, product.estimatedPrice);

  // ---------------- MAIN UI ---------------- //
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32 mb-20 bg-white">

      {/* Breadcrumb / Back Button */}
      <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-amber-500 font-medium transition mb-8 group">
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Collection
      </Link>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center md:items-start">

        {/* Left Side: Product Image Showcase with Zigzag Pattern */}
        <div className="flex-1 w-full bg-white border border-amber-200 shadow-sm rounded-3xl p-8 lg:p-12 flex items-center justify-center relative group overflow-hidden">

          {/* Central Radial Gradient to make the watch pop against the zigzag */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.4)_100%)] -z-10"></div>

          {/* Discount Badge on the Image */}
          {discountLabel && (
            <span className="absolute top-6 right-6 bg-amber-500 text-black text-sm md:text-base px-3 py-1 font-extrabold rounded shadow-md z-10 tracking-wide">
              {discountLabel}
            </span>
          )}

          <Image
            src={product.image || "/cardpic.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-[350px] md:h-[450px] object-contain drop-shadow-2xl mix-blend-multiply group-hover:scale-105 transition-transform duration-500 relative z-0"
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="flex-1 flex flex-col w-full">
          {/* Title */}
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Description (Grey text) */}
          <div className="mb-8">
            <p className="text-gray-500 leading-relaxed text-base md:text-lg">
              {product.description}
            </p>
          </div>

          {/* Colors Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-10">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">Select Color</h3>
              <div className="flex gap-4">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                    className={`w-10 h-10 rounded-full shadow-sm transition-all duration-300 ${selectedColor === color
                        ? "ring-2 ring-offset-4 ring-amber-500 scale-110 border-none"
                        : "border border-gray-300 hover:scale-105"
                      }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          <hr className="border-gray-100 mb-6" />

          <div className="flex items-end gap-4 mb-6">
            <span className="text-4xl font-black text-amber-500">${product.price}</span>
            {product.estimatedPrice && (
              <span className="text-xl text-gray-400 line-through mb-1">${product.estimatedPrice}</span>
            )}
          </div>

          <div className="mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full bg-amber-500 text-black py-4 md:py-5 rounded-2xl font-bold text-lg hover:bg-yellow-400 transition-colors duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <ShoppingBag size={24} />
              Add to Cart
            </button>
            <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck size={16} className="text-amber-500" />
              Secure Checkout & Free Shipping
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}