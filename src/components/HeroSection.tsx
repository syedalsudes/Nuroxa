"use client";

import { Star } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-hero-gradient w-full min-h-[700px] flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-16 overflow-hidden">
      {/* LEFT TEXT */}
      <div className="relative z-10 text-center lg:text-left lg:w-1/3">
        <h2 className="text-cream text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-lg">
          Welcome to <span className="text-goldLight">Nuroxa</span>
        </h2>
        <p className="text-cream mt-5 text-lg sm:text-xl font-medium opacity-90">
          Where luxury meets time.
        </p>
        <button className="mt-8 px-8 py-3 bg-goldLight text-blackText text-lg font-semibold rounded-full shadow-lg hover:bg-cream transition-all duration-300">
          Explore Collection
        </button>
      </div>

      {/* CENTER WATCH IMAGE */}
      <div className="relative z-10 lg:w-1/3 flex justify-center my-10 lg:my-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gold/30 blur-3xl rounded-full"></div>
          <Image
            src="/watch.svg"
            alt="Luxury Watch"
            width={400}
            height={400}
            className="relative w-[320px] sm:w-[380px] lg:w-[420px] object-contain select-none drop-shadow-2xl"
          />
        </div>
      </div>

      {/* RIGHT TEXT */}
      <div className="relative z-10 text-center lg:text-right lg:w-1/3">
        <h2 className="text-blackText text-3xl sm:text-4xl font-bold leading-snug">
          Redefining <span className="text-gold">Time</span>
        </h2>
        <p className="flex items-center justify-center lg:justify-end gap-2 mt-6 text-lg sm:text-xl font-medium text-cream">
          <Star className="w-6 h-6 fill-gold text-gold" />
          Crafted for Excellence
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
