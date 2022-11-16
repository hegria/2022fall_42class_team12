import useSWRInfinite from "swr/infinite";
import { fetcher } from "utils/axios";

function useUsers({ pageSize, keyword }) {
  const { data, size, setSize, error } = useSWRInfinite((idx, prevData) => {
    if (prevData && !prevData.content.length) return null;
    return `/users?pageSize=${pageSize}&pageNumber=${idx + 1}&keyword=${keyword ?? ""}`;
  }, fetcher);

  const users = data ? [].concat(...data.map((pageData) => pageData.content)) : [];
  const initialLoading = !data && !error;
  const loadingMore = initialLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const empty = data?.[0]?.content.length === 0;
  const reachingEnd = empty || (data && data[data.length - 1]?.totalPages < size + 1);

  return {
    data,
    users,
    size,
    setSize,
    error,
    initialLoading,
    loadingMore,
    reachingEnd,
    empty,
  };
}

export default useUsers;
