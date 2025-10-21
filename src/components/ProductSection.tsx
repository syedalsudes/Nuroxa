"use client";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Classic Gold Watch",
    description: "Elegant craftsmanship with timeless luxury...",
    img: "/cardpic.svg",
    price: "$299",
    oldPrice: "$399",
    discount: "-25%",
    colors: ["#000000", "#C0C0C0", "#B8860B"],
  },
  {
    id: 2,
    name: "Royal Black Edition",
    description: "Premium black finish with sapphire glass...",
    img: "/cardpic.svg",
    price: "$349",
    oldPrice: "$449",
    discount: "-22%",
    colors: ["#000000", "#8B4513"],
  },
  {
    id: 3,
    name: "Silver Heritage",
    description: "A tribute to modern engineering...",
    img: "/cardpic.svg",
    price: "$259",
    oldPrice: "$329",
    discount: "-18%",
    colors: ["#C0C0C0", "#000000"],
  },
  {
    id: 4,
    name: "Rose Gold Elegance",
    description: "Delicate tones with a modern touch...",
    img: "/cardpic.svg",
    price: "$379",
    oldPrice: "$499",
    discount: "-24%",
    colors: ["#B76E79", "#000000"],
  },
  {
    id: 5,
    name: "Midnight Steel",
    description: "Bold, powerful and made for legacy...",
    img: "/cardpic.svg",
    price: "$289",
    oldPrice: "$369",
    discount: "-21%",
    colors: ["#000000", "#708090"],
  },
  {
    id: 6,
    name: "Chrono Luxe",
    description: "Chronograph with unmatched precision...",
    img: "/cardpic.svg",
    price: "$399",
    oldPrice: "$499",
    discount: "-20%",
    colors: ["#000000", "#B8860B"],
  },
  {
    id: 7,
    name: "Heritage Master",
    description: "Bringing history to your wrist...",
    img: "/cardpic.svg",
    price: "$339",
    oldPrice: "$429",
    discount: "-21%",
    colors: ["#C0C0C0", "#8B4513"],
  },
  {
    id: 8,
    name: "Premium Steel",
    description: "Minimal and flawless aesthetics...",
    img: "/cardpic.svg",
    price: "$309",
    oldPrice: "$389",
    discount: "-19%",
    colors: ["#708090", "#000000"],
  },
];

const ProductSection = () => {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
        Our <span className="text-gold">Exclusive Collection</span>
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-cream rounded-xl shadow-lg p-4 hover:scale-105 transition flex flex-col"
          >
            <div className="relative">
              <Image
                src={item.img}
                alt={item.name}
                width={300}
                height={300}
                className="rounded-md w-full h-auto object-contain"
              />
              <span className="absolute top-2 right-2 bg-gold text-cream text-sm px-2 rounded">
                {item.discount}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-semibold mt-3">
              {item.name}
            </h3>
            <p className="text-greyText text-sm line-clamp-2">
              {item.description}
            </p>

            <div className="flex gap-2 mt-3">
              {item.colors.map((color, index) => (
                <span
                  key={index}
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="font-bold">{item.price}</p>
              <p className="text-greyText line-through text-sm">
                {item.oldPrice}
              </p>
            </div>

            <button className="mt-auto w-full bg-blackText text-cream py-2 rounded-lg hover:bg-gold transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
