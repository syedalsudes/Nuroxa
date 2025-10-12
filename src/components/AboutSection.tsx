import Image from "next/image";


const AboutSection = () => {
  return (
    <section className="text-primary-text py-16 px-6" id="about">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        <div className="md:w-1/2 ">
          <Image
            src="/aboutimg.svg" 
            alt="About Nuroxa"
            className="rounded-3xl shadow-2xl w-full object-cover"
            width={20}
            height={20}
          />
        </div>

        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 text-accent-text">
            About <span className="text-button-gold">Nuroxa</span>
          </h2>
          <p className="text-lg text-primary-text leading-relaxed">
            Nuroxa is a next-generation dropshipping brand focused on quality, convenience, and customer experience.
            We bring the best global products right to your door — with 24/7 shopping, smooth delivery, and an eye for style.
          </p>
          <p className="mt-4 text-primary-text">
            With a golden touch of service and a brown foundation of trust, Nuroxa is here to change how you shop online.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
