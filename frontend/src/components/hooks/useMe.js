import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { authFetcher } from "utils/axios";
import { deleteCookie, getCookie } from "utils/cookie";

function useMe() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (!document) {
      return;
    }
    if (getCookie("jwt") != null) {
      setLoggedIn(true);
    }
  }, []);

  const logout = useCallback(() => {
    deleteCookie("jwt");
    Router.reload();
  }, []);

  const { data, mutate, error } = useSWR(loggedIn ? "/users/me" : null, authFetcher);

  return {
    loggedIn,
    logout,
    user: data,
    error,
    mutate,
  };
}

export default useMe;
