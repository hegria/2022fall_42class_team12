import useSWRInfinite from "swr/infinite";
import { fetcher } from "utils/axios";

function useRecruitments({ pageSize, keyword, sortBy, userId, isAuthor, isFavorite, isApplied }) {
  const { data, size, setSize, error } = useSWRInfinite((idx, prevData) => {
    if (prevData && !prevData.content.length) return null;
    return `/projects?pageSize=${pageSize}&pageNumber=${idx + 1}&keyword=${keyword ?? ""}&sortBy=${
      sortBy ?? ""
    }&userId=${userId ?? ""}&isAuthor=${isAuthor ?? ""}&isFavorite=${isFavorite ?? ""}&isApplied=${
      isApplied ?? ""
    }`;
  }, fetcher);

  const recruitments = data ? [].concat(...data.map((pageData) => pageData.content)) : [];
  const initialLoading = !data && !error;
  const loadingMore = initialLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const empty = data?.[0]?.content.length === 0;
  const reachingEnd = empty || (data && data[data.length - 1]?.content.length < pageSize);

  return {
    data,
    recruitments,
    size,
    setSize,
    error,
    initialLoading,
    loadingMore,
    reachingEnd,
    empty,
  };
}

export default useRecruitments;
