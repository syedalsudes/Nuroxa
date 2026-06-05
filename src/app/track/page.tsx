"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle, MapPin, Receipt, Calendar, User } from "lucide-react";

interface OrderData {
  orderId: string;
  orderStatus: string;
  customer: { fullName: string; email: string; address: string; city: string };
  pricing: { total: number };
  createdAt: string;
}

export default function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState("");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setError("");
    setOrderData(null);

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: trackingId.trim().toUpperCase() }),
      });

      const data = await res.json();

      if (data.success) {
        setOrderData(data.order);
      } else {
        setError(data.message || "Order not found.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Status Check Logic
  const statuses = ["Pending", "Processing", "Shipped", "Delivered"];
  const currentStatusIndex = orderData ? statuses.indexOf(orderData.orderStatus) : -1;
  const isCancelled = orderData?.orderStatus === "Cancelled";

  return (
    <div className="min-h-screen bg-gray-50/50 py-16 pt-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-amber-100/40 to-transparent -z-10"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10 translate-x-1/3"></div>

      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-widest rounded-full border border-amber-200 inline-block mb-4">
            Live Tracking
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Track Your Order
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Enter your unique Tracking ID below to get real-time updates on your delivery status.
          </p>
        </div>

        {/* Premium Search Input Box */}
        <div className="bg-white p-3 md:p-4 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 mb-10 max-w-2xl mx-auto relative z-10 animate-in zoom-in-95 duration-500">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-6 text-amber-500" size={24} />
              <input
                type="text"
                placeholder="e.g., NX-123456"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full pl-16 pr-6 py-4 bg-transparent outline-none transition-all uppercase placeholder:normal-case placeholder:text-gray-400 font-black text-gray-900 tracking-widest text-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-8 py-4 sm:py-5 rounded-2xl font-bold text-lg hover:bg-amber-500 hover:text-black transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 flex-shrink-0"
            >
              {loading ? "Tracking..." : "Track Now"}
            </button>
          </form>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-center gap-2 text-red-600 animate-in shake">
            <AlertCircle size={20} /> <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Results Section */}
        {orderData && (
          <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100/80 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Top Bar with Order ID & Date */}
            <div className="bg-black text-white px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-amber-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Package className="text-amber-500" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Order Number</p>
                  <h2 className="text-2xl md:text-3xl font-black tracking-wider text-white">{orderData.orderId}</h2>
                </div>
              </div>
              <div className="text-left md:text-right flex items-center gap-2 md:block">
                <Calendar className="text-gray-400 md:hidden" size={16} />
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1 hidden md:block">Order Date</p>
                  <p className="font-bold text-white text-lg">{new Date(orderData.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* Cancelled State */}
              {isCancelled ? (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 flex flex-col items-center text-center text-red-700 mb-10">
                  <AlertCircle size={48} className="mb-4 text-red-500" />
                  <h3 className="font-black text-2xl mb-2">Order Cancelled</h3>
                  <p className="text-red-600/80 max-w-md">
                    Unfortunately, this order has been cancelled. If you believe this is a mistake, please contact our support team.
                  </p>
                </div>
              ) : (
                /* Premium Progress Timeline */
                <div className="relative pt-6 pb-12 mb-8">
                  {/* Background Connecting Line */}
                  <div className="absolute left-[31px] md:left-auto md:top-[31px] top-0 bottom-0 md:bottom-auto w-[2px] md:w-full md:h-[2px] bg-gray-100 z-0"></div>
                  
                  {/* Active Connecting Line (Progress) with Glow */}
                  <div 
                    className="absolute left-[31px] md:left-auto md:top-[31px] top-0 md:h-[2px] w-[2px] md:w-full bg-amber-500 z-0 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    style={{
                      height: window.innerWidth < 768 ? `${(currentStatusIndex / (statuses.length - 1)) * 100}%` : '2px',
                      width: window.innerWidth >= 768 ? `${(currentStatusIndex / (statuses.length - 1)) * 100}%` : '2px'
                    }}
                  ></div>

                  <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-0 relative z-10">
                    {/* Step 1: Pending */}
                    <div className="flex flex-row md:flex-col items-center gap-6 md:gap-4 text-center w-full md:w-1/4 group">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative ${currentStatusIndex >= 0 ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-110" : "bg-white border-2 border-gray-100 text-gray-300"}`}>
                        {currentStatusIndex > 0 && <div className="absolute inset-0 bg-white rounded-2xl opacity-20"></div>}
                        <Clock size={28} className={currentStatusIndex === 0 ? "animate-pulse" : ""} />
                      </div>
                      <div className="text-left md:text-center">
                        <p className={`font-black text-lg ${currentStatusIndex >= 0 ? "text-gray-900" : "text-gray-400"}`}>Pending</p>
                        <p className={`text-sm ${currentStatusIndex === 0 ? "text-amber-600 font-semibold" : "text-gray-500"}`}>Order received</p>
                      </div>
                    </div>

                    {/* Step 2: Processing */}
                    <div className="flex flex-row md:flex-col items-center gap-6 md:gap-4 text-center w-full md:w-1/4 group">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative ${currentStatusIndex >= 1 ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-110" : "bg-white border-2 border-gray-100 text-gray-300"}`}>
                        {currentStatusIndex > 1 && <div className="absolute inset-0 bg-white rounded-2xl opacity-20"></div>}
                        <Package size={28} className={currentStatusIndex === 1 ? "animate-pulse" : ""} />
                      </div>
                      <div className="text-left md:text-center">
                        <p className={`font-black text-lg ${currentStatusIndex >= 1 ? "text-gray-900" : "text-gray-400"}`}>Processing</p>
                        <p className={`text-sm ${currentStatusIndex === 1 ? "text-amber-600 font-semibold" : "text-gray-500"}`}>Packing items</p>
                      </div>
                    </div>

                    {/* Step 3: Shipped */}
                    <div className="flex flex-row md:flex-col items-center gap-6 md:gap-4 text-center w-full md:w-1/4 group">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative ${currentStatusIndex >= 2 ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-110" : "bg-white border-2 border-gray-100 text-gray-300"}`}>
                        {currentStatusIndex > 2 && <div className="absolute inset-0 bg-white rounded-2xl opacity-20"></div>}
                        <Truck size={28} className={currentStatusIndex === 2 ? "animate-pulse" : ""} />
                      </div>
                      <div className="text-left md:text-center">
                        <p className={`font-black text-lg ${currentStatusIndex >= 2 ? "text-gray-900" : "text-gray-400"}`}>Shipped</p>
                        <p className={`text-sm ${currentStatusIndex === 2 ? "text-amber-600 font-semibold" : "text-gray-500"}`}>On the way</p>
                      </div>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className="flex flex-row md:flex-col items-center gap-6 md:gap-4 text-center w-full md:w-1/4 group">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative ${currentStatusIndex >= 3 ? "bg-green-500 text-white shadow-lg shadow-green-500/30 scale-110" : "bg-white border-2 border-gray-100 text-gray-300"}`}>
                        <CheckCircle size={28} />
                      </div>
                      <div className="text-left md:text-center">
                        <p className={`font-black text-lg ${currentStatusIndex >= 3 ? "text-gray-900" : "text-gray-400"}`}>Delivered</p>
                        <p className={`text-sm ${currentStatusIndex === 3 ? "text-green-600 font-semibold" : "text-gray-500"}`}>Successfully</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Modern Receipt / Quick Details Box */}
              <div className="bg-gray-50/80 rounded-[1.5rem] p-6 md:p-8 border border-gray-100 relative overflow-hidden">
                {/* Decorative dots for receipt feel */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-gray-100"></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-gray-100"></div>
                
                <h3 className="font-black text-xl text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-200 border-dashed">
                  <Receipt className="text-amber-500" size={24} /> Order Summary
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-500">
                      <User size={18} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Customer Name</span>
                      <span className="font-bold text-gray-900 text-base">{orderData.customer.fullName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center flex-shrink-0 text-amber-600">
                      <Receipt size={18} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</span>
                      <span className="font-black text-amber-600 text-xl">${orderData.pricing.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="sm:col-span-2 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-500 mt-1">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Shipping Address</span>
                      <span className="font-semibold text-gray-700 leading-relaxed max-w-lg block">
                        {orderData.customer.address}, {orderData.customer.city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}