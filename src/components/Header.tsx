"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// Heart aur User hata diye hain
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const navLinks = ["About", "Products", "Why Us", "Contact"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // ---------------- ZUSTAND CART LOGIC ---------------- //
  const cart = useCartStore((state) => state.cart);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  // ---------------------------------------------------- //

  return (
    <>
      {/* Main Navbar */}
      <nav className="w-full bg-white/95 backdrop-blur-md py-4 px-4 md:px-8 lg:px-16 flex items-center justify-between shadow-sm fixed top-0 left-0 z-50 transition-all duration-300">
        
        {/* Logo */}
        <Link href="/">
          <div className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-widest cursor-pointer select-none font-logo drop-shadow-sm">
            NUROXA<span className="text-amber-500">.</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 xl:gap-10 items-center">
          {navLinks.map((link) => (
            <li key={link} className="group relative cursor-pointer">
              <Link
                /* FIX: Ab yahan /# lagaya hai taake doosre pages se bhi home par wapas aa sake */
                href={`/#${link.toLowerCase().replace(" ", "")}`}
                className="text-sm font-bold text-gray-800 uppercase tracking-widest transition-colors duration-300 group-hover:text-amber-500"
              >
                {link}
              </Link>
              {/* Animated Underline */}
              <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-amber-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </li>
          ))}
        </ul>

        {/* Search & Cart Area */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* --- DESKTOP SEARCH BAR --- */}
          <div className="hidden md:flex relative group items-center">
            <Search strokeWidth={2.5} className="w-4 h-4 text-gray-400 absolute left-3 group-focus-within:text-amber-500 transition-colors duration-300" />
            <input 
              type="text" 
              placeholder="Search watches..." 
              className="bg-gray-100/80 text-gray-900 text-sm rounded-full pl-10 pr-4 py-2 w-48 xl:w-64 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-300 placeholder-gray-400"
            />
          </div>
          
          {/* --- CART ICON WITH BADGE --- */}
          <Link href="/cart" className="relative group flex items-center p-2 rounded-full hover:bg-amber-50 transition-colors">
            <ShoppingCart strokeWidth={2} className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 group-hover:text-amber-500 transition-all duration-300" />
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 sm:-top-1 sm:-right-1 bg-amber-500 text-black text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border border-white shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Hamburger Menu (Mobile Only) */}
          <button
            className="lg:hidden text-gray-900 focus:outline-none hover:text-amber-500 transition-all duration-300 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X strokeWidth={2} className="w-7 h-7" /> : <Menu strokeWidth={2} className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`fixed inset-0 bg-amber-400 z-[60] flex flex-col transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-amber-500/30">
          <div className="text-2xl font-extrabold text-gray-900 tracking-widest font-logo drop-shadow-sm">
            NUROXA<span className="text-white">.</span>
          </div>
          <button 
            onClick={() => setMenuOpen(false)}
            className="hover:rotate-90 transition-transform duration-300"
          >
            <X strokeWidth={2} className="w-8 h-8 text-gray-900 hover:text-white transition-colors" />
          </button>
        </div>

        {/* --- MOBILE SEARCH BAR --- */}
        <div className="w-[85%] mx-auto mt-8 relative">
          <Search strokeWidth={2.5} className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search watches..." 
            className="w-full bg-white text-gray-900 text-base md:text-lg rounded-full pl-12 pr-4 py-3 md:py-4 focus:outline-none shadow-sm placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col flex-1 items-center justify-center gap-10 mt-4">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link}
                /* FIX: Mobile me bhi /# lagaya hai */
                href={`/#${link.toLowerCase().replace(" ", "")}`}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-bold text-gray-900 tracking-widest uppercase hover:text-white hover:scale-105 transition-all duration-300"
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;