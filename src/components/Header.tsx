"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react";

const navLinks = ["About", "Products","Contact", "Why Us"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="w-full bg-cream py-4 px-6 md:px-12 lg:px-20 flex items-center justify-between shadow-sm fixed top-0 left-0 z-50">
        <Link href='/'>
          <div className="text-4xl md:text-5xl font-logo text-gold cursor-pointer select-none">
            Nuroxa
          </div>
        </Link>

        <ul className="hidden lg:flex gap-8 text-blackText font-medium">
          {navLinks.map((link) => (
            <li
              key={link}
              className="group hover:text-gold relative cursor-pointer"
            >
              <Link href={`#${link.toLowerCase().replace(" ", "")}`}>
                {link}
              </Link>
              <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-white gap-2 rounded-full shadow-inner px-3 py-1 w-[220px]">
            <Search className="w-5 h-5 text-gold" />
            <input
              type="search"
              placeholder="Search..."
              className="flex-1 outline-none bg-transparent text-blackText placeholder-gray-500 text-sm"
            />
          </div>

          {width > 640 && (
            <>
              <Heart className="w-6 h-6 text-gold hover:text-blackText cursor-pointer transition-colors" />
              <User className="w-6 h-6 text-gold hover:text-blackText cursor-pointer transition-colors" />
              <ShoppingCart className="w-6 h-6 text-gold hover:text-blackText cursor-pointer transition-colors" />
            </>
          )}

          <button
            className="lg:hidden text-gold focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-cream z-50 flex flex-col animate-slideDown">
          <div className="flex justify-end items-center px-6 py-5 border-b border-gold/40">
            <button onClick={() => setMenuOpen(false)}>
              <X className="w-7 h-7 text-gold" />
            </button>
          </div>

          {width <= 1024 && (
            <div className="flex items-center bg-white gap-2 rounded-full shadow-inner px-4 py-2 mx-6 mt-6">
              <Search className="w-5 h-5 text-gold" />
              <input
                type="search"
                placeholder="Search..."
                className="flex-1 outline-none bg-transparent text-blackText placeholder-gray-500 text-sm"
              />
            </div>
          )}

          <nav className="flex flex-col items-center justify-center flex-1 gap-8 text-lg font-medium text-blackText">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={`#${link.toLowerCase().replace(" ", "")}`}
                onClick={() => setMenuOpen(false)}
                className="hover:text-gold transition-colors"
              >
                {link}
              </Link>
            ))}

            {width <= 640 && (
              <div className="flex gap-8 mt-8">
                <Heart className="w-7 h-7 text-gold hover:text-blackText cursor-pointer" />
                <User className="w-7 h-7 text-gold hover:text-blackText cursor-pointer" />
                <ShoppingCart className="w-7 h-7 text-gold hover:text-blackText cursor-pointer" />
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
