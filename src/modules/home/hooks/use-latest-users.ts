import { API } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { LatestUsersResponse } from "../schemas";


async function getLatestUsers() {
  const response = await API.get<LatestUsersResponse>("/api/latest-users");
  return response.data;
}

export function useLatestUsers() {
  const queryKey = ["latest-users"];
  const query = useQuery({
    queryKey,
    queryFn: getLatestUsers,
    retry: false,
    refetchInterval: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    latestUsers: query.data?.data,
    isEmpty: query.data?.data.total === 0,
    queryKey,
  };
}
