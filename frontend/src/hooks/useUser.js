import useSWR from "swr";
import { authFetcher } from "utils/axios";

function useUser(userId) {
  const { data, error, mutate } = useSWR(userId ? `/users/${userId}` : null, authFetcher);

  return {
    data,
    error,
    loading: !data && !error,
    mutate,
  };
}

export default useUser;
