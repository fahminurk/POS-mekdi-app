import { create } from "zustand";
import { Product } from "@prisma/client";

interface OrderState {
  orders: {
    id: string;
    name: string;
    price: number;
    imgUrl: string;
    description: string;
    stock: number;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    qty: number;
  }[];
  addOrder: (product: Product, quantity: number) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: (product, quantity) => {
    set((state) => {
      const existingProductIndex = state.orders.findIndex(
        (p) => p.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Jika produk sudah ada dalam daftar pesanan, tambahkan ke jumlah yang ada
        const updatedOrders = state.orders.map((p, index) => {
          if (index === existingProductIndex) {
            return { ...p, qty: p.qty + quantity };
          }
          return p;
        });

        return {
          orders: updatedOrders,
        };
      } else {
        // Jika produk belum ada dalam daftar pesanan, tambahkan produk baru
        return {
          orders: [
            ...state.orders,
            {
              ...product,
              qty: quantity,
            },
          ],
        };
      }
    });
  },
}));
