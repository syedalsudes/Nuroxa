"use client";

import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="about" className="w-full bg-white py-16 lg:py-24 px-6 lg:px-24 flex justify-center">
      <div className="max-w-[1200px] w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* LEFT SECTION (Image with Rounded Corners) */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group">
          {/* Subtle amber glow effect on hover */}
          <div className="absolute inset-0 bg-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none mix-blend-overlay"></div>
          <Image
            src="/about.png"
            alt="About Nuroxa"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>

        {/* RIGHT SECTION (Text & Stats) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          
          {/* Main Heading (Updated to Amber Gradient) */}
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-widest leading-tight mb-6 drop-shadow-sm">
            ABOUT US
          </h2>

          <p className="text-gray-600 text-base lg:text-lg leading-loose mb-10 text-justify md:text-left">
            Founded with a singular vision to redefine horology, Nuroxa blends generations of master craftsmanship with modern architectural sophistication.
            Every timepiece is a testament to precision—designed not just to measure seconds, but to capture the essence of a legacy. Our artisans dedicate countless hours to perfecting every microscopic detail.
          </p>
          
          {/* Stats Section (Amber text with better spacing) */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-8 border-t border-gray-100 w-full">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-start">
              <span className="text-3xl lg:text-4xl font-black text-amber-500 tracking-tight drop-shadow-sm">2026</span>
              <span className="text-[11px] lg:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Established</span>
            </div>
            
            <div className="w-px h-12 bg-gray-200 hidden sm:block"></div>
            
            {/* Stat 2 */}
            <div className="flex flex-col items-start">
              <span className="text-3xl lg:text-4xl font-black text-amber-500 tracking-tight drop-shadow-sm">100%</span>
              <span className="text-[11px] lg:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Handcrafted</span>
            </div>

            <div className="w-px h-12 bg-gray-200 hidden sm:block"></div>
            
            {/* Stat 3 */}
            <div className="flex flex-col items-start">
              <span className="text-3xl lg:text-4xl font-black text-amber-500 tracking-tight drop-shadow-sm">Premium</span>
              <span className="text-[11px] lg:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Materials</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;