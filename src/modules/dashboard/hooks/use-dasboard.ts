import { API } from "@/lib/api";
import { DashboardData } from "@/schemas";
import { useQuery } from "@tanstack/react-query";


async function getDashboardData() {
  const response = await API.get<DashboardData>("/api/users/dashboard");
  return response.data;
}

export function useDasboardData() {
  const queryKey = ["dashboard-data"];
  const query = useQuery({
    queryKey,
    queryFn: getDashboardData,
    retry: false,
    refetchInterval: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    data: query.data?.data,
    queryKey,
  };
}
