"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ProductType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  colors: string[];
  price: number;
  estimatedPrice?: number;
}

const ProductSection = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          setError("Failed to load products. Please try again.");
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Something went wrong. Please check your internet connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const calculateDiscount = (price: number, estimatedPrice?: number) => {
    if (!estimatedPrice || estimatedPrice <= price) return null;
    const discount = ((estimatedPrice - price) / estimatedPrice) * 100;
    return `-${Math.round(discount)}%`;
  };

  return (
    <section id="products" className="py-16 px-4 sm:px-8 md:px-16 pt-20 lg:px-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
        Our <span className="text-gold">Exclusive Collection</span>
      </h2>

      {/* ERROR STATE */}
      {error && (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-red-500 font-semibold text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-cream rounded-xl shadow-lg p-4 flex flex-col animate-pulse">
              <div className="w-full h-[250px] bg-gray-200 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
              <div className="flex justify-between items-center mt-auto">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="w-full h-10 bg-gray-200 rounded-lg mt-4"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((item) => {
            const discountLabel = calculateDiscount(item.price, item.estimatedPrice);

            return (
              <div
                key={item._id}
                className="bg-cream rounded-xl shadow-lg p-4 hover:scale-105 transition flex flex-col"
              >
                <div className="relative bg-white rounded-md overflow-hidden">
                  <Link href={`/products/${item.slug}`}>
                    <Image
                      src={item.image || "/cardpic.svg"}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="w-full h-[250px] object-contain cursor-pointer p-2 mix-blend-multiply"
                    />
                  </Link>
                  {discountLabel && (
                    <span className="absolute top-2 right-2 bg-gold text-cream text-sm px-2 rounded z-10">
                      {discountLabel}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-semibold mt-3">
                  <Link href={`/product/${item.slug}`} className="hover:text-gold transition">
                    {item.name}
                  </Link>
                </h3>
                <p className="text-greyText text-sm line-clamp-2 mt-1">
                  {item.description}
                </p>

                <div className="flex gap-2 mt-3">
                  {item.colors?.map((color, index) => (
                    <span
                      key={index}
                      className="w-4 h-4 rounded-full border shadow-sm"
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4 mb-4">
                  <p className="font-bold text-lg">${item.price}</p>
                  {item.estimatedPrice && (
                    <p className="text-greyText line-through text-sm">
                      ${item.estimatedPrice}
                    </p>
                  )}
                </div>

                <Link href={`/products/${item.slug}`}>
                  <button className="mt-auto w-full bg-gold text-cream py-2 rounded-lg hover:bg-blackText transition cursor-pointer">
                    View details
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-20 text-gray-500 font-semibold text-xl">
          No products found.
        </div>
      )}
    </section>
  );
};

export default ProductSection;