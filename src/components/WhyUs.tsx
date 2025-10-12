import { Gem, Truck, ShieldCheck, LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Gem,
    title: "Premium Quality",
    description:
      "Every product is sourced from top manufacturers, ensuring durability and exceptional craftsmanship.",
  },
  {
    icon: Truck,
    title: "Fast Dropshipping",
    description:
      "We offer reliable and fast dropshipping directly to your doorstep without delays.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Enjoy a smooth and secure checkout experience every time you shop.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="text-[#F3E9DC] py-20 px-6" id="whyus">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Why Choose Nuroxa?</h2>
          <p className="mt-4 text-lg text-[#e1d4c4]">
            Discover what makes us stand out in the world of premium dropshipping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <item.icon className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-500">{item.title}</h3>
              <p className="text-sm text-[#e5dccc]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
