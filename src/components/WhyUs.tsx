"use client";

import { Clock, Diamond, ShieldCheck } from "lucide-react";

const WhyUs = () => {
  return (
    <section id="whyus" className="w-full bg-cream py-24 px-6 md:px-20 pt-28">
      <div className="text-center max-w-4xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-blackText">
          Why Choose <span className="text-gold">Nuroxa?</span>
        </h2>
        <p className="text-lg md:text-xl text-greyText mt-4">
          Where craftsmanship meets legacy - designed for those who value more than time.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-16">
          
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center">
            <Clock className="w-12 h-12 text-gold" />
            <h3 className="text-2xl font-semibold mt-4 text-blackText">Timeless Design</h3>
            <p className="text-greyText mt-3 text-base">
              Crafted with elegance, our designs transcend trends and generations.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center">
            <Diamond className="w-12 h-12 text-gold" />
            <h3 className="text-2xl font-semibold mt-4 text-blackText">Artisan Craftsmanship</h3>
            <p className="text-greyText mt-3 text-base">
              Each piece is meticulously shaped by master artisans for perfection.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="w-12 h-12 text-gold" />
            <h3 className="text-2xl font-semibold mt-4 text-blackText">Enduring Strength</h3>
            <p className="text-greyText mt-3 text-base">
              Built with premium materials to withstand the journey of time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;



