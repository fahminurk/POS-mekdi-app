import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { Product } from "@prisma/client";
import axios from "axios";

export type CategoryWithProduct = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
};

export const useCategoryQuery = (): UseQueryResult<
  CategoryWithProduct[],
  Error
> => {
  return useQuery<CategoryWithProduct[], Error>({
    queryKey: ["categories"],
    queryFn: () => axios.get("/api/category").then((res) => res.data),
  });
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) => {
      return axios.post("/api/category", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("category created");
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/category/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("category deleted");
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; name: string }) => {
      return axios.patch(`/api/category/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("category updated");
    },
  });
};
