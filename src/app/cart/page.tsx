"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Hydration fix

  // Calculations
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 3000 ? 0 : 20; // Example: Free delivery over $3000
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 pt-20">
        <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-amber-500" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">Your bag is empty</h2>
        <p className="text-gray-500">Looks like you have not added any items to your cart yet.</p>
        <Link href="/">
          <button className="mt-4 px-8 py-4 bg-amber-500 text-black font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:bg-amber-400 transition-all hover:-translate-y-1">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32 mb-20">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Section: Cart Items */}
        <div className="flex-1">
          
          {/* Free Delivery Banner */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-8">
            <h3 className="font-bold text-gray-900 mb-1">Free Delivery</h3>
            <p className="text-sm text-gray-600">
              Applies to orders of $3,000 or more. <span className="underline cursor-pointer text-amber-700 font-medium">View details</span>
            </p>
          </div>

          {/* Bag Header */}
          <div className="flex justify-between items-end mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Bag <span className="text-xl font-semibold text-gray-500">({totalItems} items)</span>
            </h1>
            <button 
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 text-sm font-semibold transition"
            >
              Clear All
            </button>
          </div>

          {/* Items List */}
          <div className="flex flex-col gap-6">
            {cart.map((item) => (
              <div 
                key={`${item._id}-${item.color}`} 
                className="flex flex-col sm:flex-row gap-6 bg-white border border-gray-100 shadow-sm p-4 sm:p-6 rounded-2xl relative"
              >
                {/* Image */}
                <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                  <Image 
                    src={item.image || "/cardpic.svg"} 
                    alt={item.name} 
                    width={100} height={100} 
                    className="object-contain w-full h-full mix-blend-multiply" 
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-500">Color:</span>
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Price per item: ${item.price}</p>
                    </div>
                    {/* Item Total Price */}
                    <p className="text-lg font-bold text-gray-900">${item.price * item.quantity}</p>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-700">Quantity:</span>
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item._id, item.color, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-gray-200 rounded-l-lg transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.color, item.quantity + 1)}
                          className="p-2 hover:bg-gray-200 rounded-r-lg transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item._id, item.color)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white border border-gray-100 shadow-xl shadow-gray-100/50 rounded-3xl p-8 sticky top-32">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Summary</h2>
            
            <div className="flex flex-col gap-4 text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery & Handling</span>
                <span className="font-semibold text-gray-900">{deliveryFee === 0 ? "Free" : `$${deliveryFee}`}</span>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-amber-500">${total}</span>
            </div>

            <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-500 hover:text-black transition-colors duration-300 shadow-md flex items-center justify-center gap-2 group">
              Proceed to Checkout
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <Link href="/" className="block text-center mt-6 text-sm font-medium text-gray-500 hover:text-amber-600 transition">
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}