"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Copy, Package, ArrowRight, Check, Info } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "NX-UNKNOWN";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2 second baad wapas normal
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4 py-20 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-green-50/50 to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl -z-10 translate-x-1/3"></div>

      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-14 border border-gray-100 relative z-10 animate-in zoom-in-95 fade-in duration-700">
        
        {/* Animated Check Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-green-50 rounded-[2rem] flex items-center justify-center relative rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="absolute inset-0 bg-green-400 rounded-[2rem] animate-ping opacity-20"></div>
            <CheckCircle className="text-green-500 w-12 h-12 relative z-10" />
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-green-600 uppercase tracking-widest mb-3">
            Payment Successful
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Thank you for choosing NUROXA. Your order is being processed and will be shipped soon.
          </p>
        </div>

        {/* Premium Tracking ID Ticket */}
        <div className="bg-amber-50/50 rounded-3xl p-1 mb-8">
          <div className="bg-white border-2 border-dashed border-amber-200 rounded-[1.3rem] p-6 md:p-8 text-center relative overflow-hidden">
            {/* Ticket Cutouts */}
            <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-amber-50/50 rounded-full border-r-2 border-amber-200"></div>
            <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-amber-50/50 rounded-full border-l-2 border-amber-200"></div>

            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Your Tracking ID
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
              <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-widest font-mono">
                {orderId}
              </span>
              
              {/* Sleek Copy Button */}
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm ${
                  copied 
                  ? "bg-green-100 text-green-700 border border-green-200" 
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied" : "Copy ID"}
              </button>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-10 flex items-start gap-4">
          <div className="bg-white p-2 rounded-full shadow-sm flex-shrink-0 mt-0.5">
            <Info className="text-amber-500" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">Important Note</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Since you checked out as a guest, please <strong>save this Tracking ID</strong>. You will need it to track the real-time status of your delivery.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/track" className="w-full sm:w-auto bg-black text-white px-8 py-4 sm:py-5 rounded-2xl font-bold text-lg hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-xl shadow-black/10 flex items-center justify-center gap-2 group">
            <Package size={20} className="group-hover:animate-bounce" />
            Track Order Now
          </Link>
          
          <Link href="/" className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 sm:py-5 rounded-2xl font-bold text-lg border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 group">
            Continue Shopping
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold tracking-widest uppercase">Verifying Order...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}