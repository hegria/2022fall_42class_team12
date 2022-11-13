import useSWR from "swr";
import { authFetcher } from "utils/axios";

// NOTE: 페이지네이션 적용할 것이라면 pageSize=9999 고치기
function useApplication(projectId) {
  const { data, error, mutate } = useSWR(
    projectId ? `/applications?pageSize=9999&pageNumber=1&projectId=${projectId}` : null,
    authFetcher
  );

  return {
    data,
    error,
    loading: !data && !error,
    mutate,
  };
}

export default useApplication;
