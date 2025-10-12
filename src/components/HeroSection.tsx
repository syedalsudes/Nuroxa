import Image from "next/image";


const HeroSection = () => {
  return (
    <section className="min-h-screen px-6 py-32 text-primary-text">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">

        <div className="flex-1 p-6 lg:p-12 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Welcome to <br />
            <span className="text-accent-text">Nuroxa</span> Dropshipping Store
          </h1>
          <p className="text-lg md:text-xl mt-4">
            Shop the best products from anywhere, anytime!
          </p>
          <button className="mt-6 px-6 py-3 bg-button-gold text-white rounded-lg hover:bg-button-hover transition transform hover:scale-105">
            Start Shopping
          </button>
        </div>

        <div className="flex justify-center items-center flex-1 my-10 lg:my-0">
          <Image
            src="/herosection.svg"
            alt="herosection"
            className="w-52 h-52 md:w-80 md:h-80 object-contain transition-transform duration-300 ease-out hover:scale-110 select-none"
            width={20}
            height={20}
          />
        </div>

        <div className="flex-1 p-6 lg:p-12 text-center lg:text-right">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Your 24/7 <span className="text-accent-text">Online Shopping</span> Experience
          </h2>
          <p className="text-lg md:text-xl mt-4">
            Explore thousands of products now.
          </p>
        </div>

      </div>

    </section>
  );
};

export default HeroSection;
