"use client";

import { BadgeCheck, Diamond, Heart, Star } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-hero-gradient w-full min-h-[800px] flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-16 overflow-hidden pt-[100px] lg:pt-16">

      {/* Left Section */}
      <div className="relative z-10 text-center lg:text-left lg:w-1/3">
        <h2 className="text-cream text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-lg">
          Welcome to <span className="text-goldLight">Nuroxa</span>
        </h2>
        <p className="text-cream mt-5 text-lg sm:text-xl font-medium opacity-90">
          Where <span className="font-semibold">luxury</span> meets <span className="font-semibold">precision</span>.
        </p>
        <a href="#products">
          <button className="mt-8 px-6 py-2.5 bg-goldLight text-blackText text-base sm:text-lg font-semibold rounded-full shadow-lg hover:bg-cream transition-all duration-300 transform hover:scale-105">
            Explore Collection
          </button>
        </a>
      </div>

      {/* Center Image */}
      <div className="relative z-10 lg:w-1/3 flex justify-center my-10 lg:my-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gold/30 blur-3xl rounded-full"></div>
          <Image
            src="/watch.svg"
            alt="Luxury Watch"
            width={400}
            height={400}
            className="relative w-[220px] sm:w-[280px] md:w-[320px] lg:w-[290px] hover:scale-105 object-contain select-none drop-shadow-2xl transition-all duration-300"
          />
        </div>
      </div>


      {/* Right Section */}
      <div className="relative z-10 text-center lg:text-right lg:w-1/3">
        <h2 className="text-cream text-3xl sm:text-4xl font-bold leading-snug  drop-shadow-lg">
          Redefining <span className="text-gold">Time</span>
        </h2>

        {/* Icon + Text */}
        <p className="flex items-center justify-center lg:justify-end gap-2 mt-6 text-lg sm:text-xl font-medium text-cream">
          <Star className="w-6 h-6 fill-gold text-gold transform hover:scale-110 transition-all duration-200" />
          Crafted for <span className="font-semibold">Excellence</span>
        </p>

        <p className="flex items-center justify-center lg:justify-end gap-2 mt-4 text-base sm:text-lg text-cream">
          <BadgeCheck className="w-5 h-5 text-gold transform hover:scale-110 transition-all duration-200" />
          Precision in Every <span className="font-semibold">Tick</span>
        </p>

        <p className="flex items-center justify-center lg:justify-end gap-2 mt-4 text-base sm:text-lg text-cream">
          <Diamond className="w-5 h-5 text-gold transform hover:scale-110 transition-all duration-200" />
          Luxury Meets <span className="font-semibold">Legacy</span>
        </p>

        <p className="flex items-center justify-center lg:justify-end gap-2 mt-4 text-base sm:text-lg text-cream">
          <Heart className="w-5 h-5 text-gold transform hover:scale-110 transition-all duration-200" />
          Designed with <span className="font-semibold">Passion</span>
        </p>
      </div>

    </section>
  );
};

export default HeroSection;
