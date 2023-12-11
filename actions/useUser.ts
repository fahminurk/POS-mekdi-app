import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { User } from "@prisma/client";
import axios from "axios";

export const useUserQuery = (): UseQueryResult<User[], Error> => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/user").then((res) => res.data),
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      isSuperAdmin: boolean;
    }) => {
      return axios.post("/api/user", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created");
    },
  });
};
