import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { Category, Product } from "@prisma/client";
import axios from "axios";

export type ProductWithCategory = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  categoryId: string;
  category: Category;
};

export const useProductQuery = (): UseQueryResult<
  ProductWithCategory[],
  Error
> => {
  return useQuery<ProductWithCategory[], Error>({
    queryKey: ["products"],
    queryFn: () => axios.get("/api/product").then((res) => res.data),
  });
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      price: string;
      stock: string;
      categoryId: string;
      imgUrl: string;
    }) => {
      return axios.post("/api/product", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("product created");
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/product/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("product deleted");
    },
  });
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: {
      id: string;
      name: string;
      description: string;
      price: string;
      stock: string;
      categoryId: string;
      imgUrl: string;
    }) => {
      return axios.patch(`/api/product/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("product updated");
    },
  });
};
