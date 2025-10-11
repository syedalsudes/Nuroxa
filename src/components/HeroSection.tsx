import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center">
            <div className=" flex absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-3xl"></div>

            <h1 className="text-5xl font-semibold tracking-wide text-white relative z-10">
                Timeless Elegance
            </h1>

            <div className="mt-10 relative z-10">
                <Image
                    src="/herosection.svg"
                    alt="Hero Watch"
                    width={450}
                    height={450}
                    className="object-contain"
                />
            </div>
        </section>

    );
}
