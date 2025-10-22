"use client";

import Image from "next/image";

const AboutSection = () => {
    return (
        <section id="about" className="w-full bg-cream py-32 px-6 md:px-20 flex flex-col lg:flex-row items-center gap-16 min-h-[800px]">

            {/* LEFT IMAGE */}
            <div className="lg:w-1/2 flex justify-center">
                <Image
                    src="/aboutsection.svg"
                    alt="Luxury Watch"
                    width={500}
                    height={500}
                    className="object-contain select-none"
                />
            </div>

            {/* RIGHT TEXT */}
            <div className="lg:w-1/2 flex flex-col gap-8 text-gold">
                <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                    About Nuroxa
                </h2>

                <p className="text-lg md:text-xl text-blackText leading-relaxed">
                    Founded with a vision to redefine time, Nuroxa blends generations of craftsmanship with modern
                    sophistication. Each watch is a testament to precision, designed not only to measure time but
                    to tell a story of heritage and excellence. Our artisans dedicate countless hours to perfecting
                    every detail, ensuring that every piece is more than a watch — it is a legacy.
                </p>
            </div>

        </section>
    );
};

export default AboutSection;
