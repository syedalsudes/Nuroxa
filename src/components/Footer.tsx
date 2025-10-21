"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-blackText text-cream py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-5xl font-logo text-gold select-none">
            Nuroxa
          </h2>
          <p className="text-cream mt-4">
            Timeless luxury crafted for those who lead.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gold mb-4">Explore</h3>
          <ul className="space-y-2 text-cream">
            <li><a href="#about">About Us</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#whyus">Why Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gold mb-4">Support</h3>
          <ul className="space-y-2 text-cream">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Customer Service</li>
            <li>Warranty</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <Facebook className="w-6 h-6 text-gold cursor-pointer" />
            <Instagram className="w-6 h-6 text-gold cursor-pointer" />
            <Twitter className="w-6 h-6 text-gold cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="text-center text-cream mt-10 text-sm">
        © {new Date().getFullYear()} Nuroxa. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;