import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUser } from "../schemas";


async function createUserAccount(data: CreateUser) {
  const response = await API.post("/api/onboarding/users", data);
  return response.data;
}

export function usecreateUserAccount() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createUserAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return mutation;
}
