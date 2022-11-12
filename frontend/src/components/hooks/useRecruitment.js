import useSWR from "swr";
import { authFetcher } from "utils/axios";

function useRecruitment(id) {
  const { data, error, mutate } = useSWR(id ? `/projects/${id}` : null, authFetcher);

  return {
    data,
    error,
    loading: !data && !error,
    mutate,
  };
}

export default useRecruitment;
