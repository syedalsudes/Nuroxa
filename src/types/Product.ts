export interface Product {
  id: string;
  title: string;
  description: string;
  slug: string;
  images: string[];
  price: number;
  discountPrice: number;
  discountRatio: number;
  sizes: string[];
  colors: string[];
  category: string;
  stock: number;
  rating: number;
  isFeatured: boolean;
}
