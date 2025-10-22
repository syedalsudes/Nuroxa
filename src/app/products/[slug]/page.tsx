"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { Product } from "@/types/Product";


const ProductDetailPage = () => {
  const { slug } = useParams();
  const productId = Array.isArray(slug) ? slug[0] : slug;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      const q = query(collection(db, "nuroxa"), where("slug", "==", productId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = { id: docSnap.id, ...docSnap.data() } as Product;
        setProduct(data);
        setSelectedColor(data.colors[0]);
        setSelectedSize(data.sizes[0]);
      }
    };
    fetchProduct();
  }, [productId]);


  if (!product)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  return (
    <section className="pt-32 pb-20 px-6 md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row gap-12">

        <div className="md:w-1/2 flex flex-col select-none gap-6">
          <div className="relative">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={600}
              height={600}
              className="rounded-md object-contain w-full"
            />
            <span className="absolute top-4 left-4 bg-gold text-black px-3 py-1 rounded-full font-semibold text-sm md:text-base">
              ${product.discountPrice} OFF
            </span>
          </div>

          <div className="flex gap-3 mt-4">
            {product.images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`${product.title}-${idx}`}
                width={100}
                height={100}
                className="rounded-md object-contain border cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </div>


        <div className="md:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold mt-16">{product.title}</h1>
          <p className="text-greyText text-lg">{product.description}</p>

          <div className="mt-4">
            <h4 className="font-semibold mb-3 text-lg">Color:</h4>
            <div className="flex gap-3">
              {product.colors.map((color, idx) => (
                <span
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 cursor-pointer transition-transform ${selectedColor === color ? "border-orange-400 scale-110" : ""
                    }`}
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-3 text-lg">Size:</h4>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size, idx) => (
                <span
                  key={idx}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 md:px-5 md:py-2.5 border rounded-lg cursor-pointer transition-colors ${selectedSize === size ? "border-orange-400 font-bold bg-gold/10" : ""
                    }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 mt-6">
            <p className="text-3xl md:text-4xl font-bold">${product.price}</p>
            <p className="line-through text-greyText text-lg md:text-xl">${product.discountPrice}</p>
            <span className="text-gold font-semibold text-lg md:text-xl">-{product.discountRatio}%</span>
          </div>

          <button className="mt-8 md:mt-auto w-full bg-blackText text-cream py-4 md:py-5 rounded-xl hover:bg-gold transition font-bold text-lg md:text-xl">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
