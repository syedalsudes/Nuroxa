"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[100dvh] lg:min-h-[750px] flex items-center justify-center overflow-hidden pt-24 pb-12 lg:py-20">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.png"
          alt="Nuroxa Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between h-full gap-10 lg:gap-0">
        
        {/* --- LEFT SECTION: Typography & CTA --- */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-20 mt-4 lg:mt-0">
          <span className="text-yellow-500 uppercase tracking-[0.3em] sm:tracking-[0.4em] text-xs sm:text-sm font-bold mb-4 sm:mb-6 block drop-shadow-md">
            The 2026 Collection
          </span>
          
          <h2 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[85px] font-black leading-[1.1] lg:leading-[0.9] tracking-tighter mb-6 sm:mb-8 drop-shadow-lg">
            BEYOND <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 inline-block mt-2 lg:mt-0">
              TIME.
            </span>
          </h2>
          
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-sm sm:max-w-md font-light leading-relaxed mb-8 sm:mb-10 drop-shadow-md px-4 sm:px-0">
            A symphony of masterful engineering and uncompromising luxury. Elevate your presence with every second.
          </p>
          
          <a 
            href="#products" 
            className="group flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_40px_-10px_rgba(234,179,8,0.5)]"
          >
            Discover Now
            <ArrowRight strokeWidth={2.5} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* --- RIGHT SECTION: Floating Hero Product --- */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[300px] sm:min-h-[400px] lg:min-h-full">
          
          {/* Glowing Aura Effect Behind Watch */}
          <div className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[400px] lg:h-[400px] bg-yellow-500/20 rounded-full blur-[60px] lg:blur-[80px] animate-pulse z-0"></div>

          {/* Floating Watch Image */}
          <div className="relative z-10 animate-[float_6s_ease-in-out_infinite] w-[250px] sm:w-[320px] lg:w-[450px]">
            <Image
              src="/wa.png" 
              alt="Nuroxa Signature Watch"
              width={500}
              height={500}
              className="object-contain w-full h-auto drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] lg:drop-shadow-[0_30px_30px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>
      </div>

      {/* Inline Styles for the floating animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @media (min-width: 1024px) {
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-25px); }
            100% { transform: translateY(0px); }
          }
        }
      `}} />
    </section>
  );
};

export default HeroSection;