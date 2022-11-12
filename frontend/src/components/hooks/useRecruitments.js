import useSWR from "swr";
import { fetcher } from "utils/axios";

function useRecruitments({
  pageSize,
  pageNumber,
  keyword,
  sortBy,
  userId,
  isAuthor,
  isFavorite,
  isApplied,
}) {
  const queryString = `?pageSize=${pageSize}&pageNumber=${pageNumber}&keyword=${keyword}&sortBy=${sortBy}&userId=${userId}&isAuthor=${isAuthor}&isFavorite=${isFavorite}&isApplied=${isApplied}`;
  const { data, error } = useSWR("/projects" + queryString, fetcher);

  return {
    data,
    error,
    loading: !data && !error,
  };
}

export default useRecruitments;
