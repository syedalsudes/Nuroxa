"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { 
  Truck, User, Mail, Phone, MapPin, 
  CreditCard, Banknote, ShieldCheck, Info 
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore(); // clearCart add kiya
  const [isProcessing, setIsProcessing] = useState(false); // Loading state
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Pakistan",
    instructions: ""
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Agar cart khali ho toh wapas bhej do
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-bold text-gray-900">Your cart is empty</h2>
        <Link href="/" className="text-amber-500 font-semibold hover:underline">
          &larr; Back to Shop
        </Link>
      </div>
    );
  }

  // Calculations
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 3000 ? 0 : 200; // Rs. 200 delivery fee logic
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderData = {
      ...formData,
      cart,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: "COD"
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        
        router.push(`/success?orderId=${data.orderId}`);
      } else {
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Check your internet connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32 mb-20 bg-gray-50/50">
      
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Checkout
        </h1>
        <p className="text-gray-500 mt-2">Please complete your delivery details</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col-reverse lg:flex-row gap-10">
        
        {/* ================= LEFT SIDE: FORM ================= */}
        <div className="flex-1 bg-white border border-gray-200 shadow-sm rounded-3xl p-6 md:p-10">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <Truck className="text-amber-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Delivery Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User size={16} className="text-gray-400" /> Full Name *
              </label>
              <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
            </div>
            
            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail size={16} className="text-gray-400" /> Email *
              </label>
              <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Phone size={16} className="text-gray-400" /> Phone Number *
            </label>
            <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+92 300 1234567" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
          </div>

          {/* Complete Address */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <MapPin size={16} className="text-gray-400" /> Complete Address *
            </label>
            <textarea required name="address" value={formData.address} onChange={handleInputChange} rows={3} placeholder="House/Flat No, Street, Area, Landmark" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all resize-none"></textarea>
          </div>

          {/* City, State, ZIP */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
              <input required type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Karachi" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">State/Province *</label>
              <input required type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="Sindh" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
              <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="75000" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all" />
            </div>
          </div>

          {/* Country */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
            <select name="country" value={formData.country} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all">
              <option value="Pakistan">Pakistan</option>
            </select>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-amber-500" /> Payment Method
            </h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 p-4 border-2 border-amber-500 bg-amber-50 rounded-xl cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-amber-500 focus:ring-amber-500" />
                <span className="font-bold text-gray-900 flex items-center gap-2">
                  <Banknote size={20} className="text-amber-600" /> Cash on Delivery (COD)
                </span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-200 bg-gray-50 rounded-xl cursor-not-allowed opacity-60">
                <input type="radio" name="payment" disabled className="w-5 h-5" />
                <span className="font-medium text-gray-600">Credit/Debit Card (Coming Soon)</span>
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <button 
            type="submit" 
            disabled={isProcessing}
            className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-amber-500 hover:text-black transition-colors duration-300 shadow-xl flex items-center justify-center gap-2 group disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : `Place Order - $${total}`}
          </button>
        </div>

        {/* ================= RIGHT SIDE: ORDER SUMMARY ================= */}
        <div className="w-full lg:w-[450px]">
          <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 md:p-8 sticky top-32">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
            
            {/* Cart Items Mini List */}
            <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={`${item._id}-${item.color}`} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center p-1 border border-gray-100 flex-shrink-0">
                    <Image src={item.image || "/cardpic.svg"} alt={item.name} width={50} height={50} className="object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-gray-500">Color:</span>
                      <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: item.color }} />
                    </div>
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Calculations */}
            <div className="flex flex-col gap-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold text-gray-900">{deliveryFee === 0 ? "Free" : `$${deliveryFee}`}</span>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-3xl font-black text-amber-500">${total}</span>
            </div>

            {/* Info Badges (Like Image) */}
            <div className="flex flex-col gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                <Truck className="text-gray-600 flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm font-bold text-gray-900">Expected Delivery: 3-5 Business Days</p>
                  <p className="text-xs text-gray-500">Free delivery on orders above $3,000</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <ShieldCheck className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <p className="text-sm font-bold text-green-900">Cash on Delivery Available</p>
                  <p className="text-xs text-green-700">Pay when you receive your order</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
}