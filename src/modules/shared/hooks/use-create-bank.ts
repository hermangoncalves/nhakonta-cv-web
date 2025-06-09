import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBankAccount } from "@/modules/shared/schemas";

async function createBankAccount(data: CreateBankAccount) {
  const response = await API.post("/api/onboarding/bank-accounts", data);
  return response.data;
}

export function usecreateBankAccount() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBankAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bank-accounts"],
      });
    },
  });

  return mutation;
}
