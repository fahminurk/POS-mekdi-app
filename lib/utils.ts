import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  stock: z.string().min(1, { message: "Stock is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  isSuperAdmin: z.boolean(),
});

export const toIdr = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};
