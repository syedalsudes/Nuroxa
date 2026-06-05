"use client";

import { useEffect, useState } from "react";
import { Lock, Package, CheckCircle, Clock, Search, RefreshCw, LogOut, ChevronDown, User } from "lucide-react";

export default function AdminPage() {
  // Security State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Data State
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // TUMHARA SECRET PASSWORD
  const ADMIN_PASSWORD = "nuroxa123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      setLoginError("Incorrect password!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput("");
    setOrders([]);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, orderStatus: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => 
          prev.map((order) => order.orderId === orderId ? { ...order, orderStatus: newStatus } : order)
        );
      }
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  // 1. LOCK SCREEN UI (Sleek & Professional)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-amber-400/10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl -z-10 translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl border border-gray-100 p-10 text-center relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-amber-100 shadow-inner">
            <Lock className="text-amber-500 w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-gray-500 mb-8 font-medium">Please enter the master passcode.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                placeholder="Enter Passcode" 
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value); setLoginError(""); }}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-center text-xl tracking-[0.2em] font-mono transition-all placeholder:tracking-normal placeholder:text-gray-400"
              />
              {loginError && <p className="text-red-500 text-sm mt-3 font-bold animate-pulse">{loginError}</p>}
            </div>
            <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-md">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. MAIN DASHBOARD UI
  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-black text-gray-900 tracking-widest font-logo">
              NUROXA<span className="text-amber-500">.</span>
            </div>
            <span className="hidden sm:block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full border border-amber-200">
              Admin Area
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-gray-200">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-gray-600" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-gray-900">Administrator</p>
                <p className="text-xs text-gray-500">System Admin</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-bold text-sm transition-colors p-2 rounded-lg hover:bg-red-50">
              <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Orders Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Track and manage your recent sales.</p>
          </div>
          <button onClick={fetchOrders} className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm text-sm font-bold text-gray-700">
            <RefreshCw size={16} className={loading ? "animate-spin text-amber-500" : "text-gray-400"} /> 
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        {/* Stats Cards (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {/* Card 1 - Black accent */}
          <div className="bg-black text-white p-6 rounded-3xl shadow-lg relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center"><Package size={24} className="text-white" /></div>
              <div>
                <p className="text-sm font-medium text-gray-400">Total Orders</p>
                <h3 className="text-3xl font-black">{orders.length}</h3>
              </div>
            </div>
          </div>

          {/* Card 2 - Amber accent */}
          <div className="bg-amber-500 text-black p-6 rounded-3xl shadow-lg shadow-amber-500/20 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-black/10 rounded-2xl flex items-center justify-center"><Clock size={24} className="text-black" /></div>
              <div>
                <p className="text-sm font-bold text-black/70">Pending Actions</p>
                <h3 className="text-3xl font-black">{orders.filter(o => o.orderStatus === "Pending").length}</h3>
              </div>
            </div>
          </div>

          {/* Card 3 - White accent */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-green-50 rounded-full blur-2xl group-hover:bg-green-100 transition-all"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center"><CheckCircle size={24} className="text-green-600" /></div>
              <div>
                <p className="text-sm font-bold text-gray-500">Successfully Delivered</p>
                <h3 className="text-3xl font-black text-gray-900">{orders.filter(o => o.orderStatus === "Delivered").length}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Data Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header Area */}
          <div className="px-6 py-5 border-b border-gray-100 bg-white flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
            {/* Optional search icon to make it look realistic */}
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 text-gray-400">
              <Search size={16} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                  <th className="p-5">Order Details</th>
                  <th className="p-5">Customer Info</th>
                  <th className="p-5">Payment</th>
                  <th className="p-5">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="p-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <Package size={48} className="mb-4 opacity-50" />
                        <p className="text-lg font-medium">No orders found yet.</p>
                        <p className="text-sm">When customers place orders, they will appear here.</p>
                      </div>
                    </td>
                  </tr>
                )}

                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors group">
                    
                    {/* Column 1: Order ID */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                          <Package size={18} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{order.orderId}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Customer */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-black flex items-center justify-center text-sm border border-amber-200">
                          {order.customer.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{order.customer.fullName}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{order.customer.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Column 3: Amount */}
                    <td className="p-5">
                      <div className="font-black text-gray-900">${order.pricing.total.toLocaleString()}</div>
                      <div className="text-xs font-semibold text-gray-400 mt-0.5 flex items-center gap-1">
                        {order.paymentMethod} • <span className="text-amber-600">{order.items?.length || 0} items</span>
                      </div>
                    </td>

                    {/* Column 4: Status Badge/Dropdown */}
                    <td className="p-5">
                      <div className="relative inline-block">
                        <select 
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                          disabled={updatingId === order.orderId}
                          className={`appearance-none pr-8 pl-4 py-2 rounded-full font-bold text-xs tracking-wide uppercase border outline-none transition-all cursor-pointer shadow-sm ${
                            order.orderStatus === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" :
                            order.orderStatus === "Processing" ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" :
                            order.orderStatus === "Shipped" ? "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100" :
                            order.orderStatus === "Delivered" ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" :
                            "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                          } ${updatingId === order.orderId ? "opacity-50 cursor-wait" : ""}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <ChevronDown size={14} className={
                            order.orderStatus === "Pending" ? "text-amber-700" :
                            order.orderStatus === "Processing" ? "text-blue-700" :
                            order.orderStatus === "Shipped" ? "text-purple-700" :
                            order.orderStatus === "Delivered" ? "text-green-700" : "text-red-700"
                          } />
                        </div>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}