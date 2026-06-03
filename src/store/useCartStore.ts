import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, color: string) => void;
  updateQuantity: (id: string, color: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (c) => c._id === item._id && c.color === item.color
          );
          if (existingItem) {
            return {
              cart: state.cart.map((c) =>
                c._id === item._id && c.color === item.color
                  ? { ...c, quantity: c.quantity + 1 }
                  : c
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),

      removeFromCart: (id, color) =>
        set((state) => ({
          cart: state.cart.filter((c) => !(c._id === id && c.color === color)),
        })),

      updateQuantity: (id, color, quantity) =>
        set((state) => ({
          cart: state.cart.map((c) =>
            c._id === id && c.color === color ? { ...c, quantity } : c
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'ecommerce-cart',
    }
  )
);