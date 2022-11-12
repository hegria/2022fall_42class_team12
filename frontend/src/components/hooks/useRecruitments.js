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

  return {
    data,
    size,
    setSize,
    error,
    initialLoading: !data && !error,
  };
}

export default useRecruitments;
