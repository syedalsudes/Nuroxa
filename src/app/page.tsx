import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductSection from "@/components/ProductSection";
import ContactSection from "@/components/ContactSection";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <div className="relative z-10">
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <ContactSection />
      <WhyUs />
    </div>
  );
}
