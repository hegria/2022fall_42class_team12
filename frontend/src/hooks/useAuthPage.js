import useMe from "hooks/useMe";
import Router from "next/router";
import { useEffect } from "react";

function useAuthPage(redirectPath = "/") {
  const { loggedIn, loadingLoginCheck } = useMe();

  useEffect(() => {
    if (!loadingLoginCheck && !loggedIn) {
      Router.replace(redirectPath);
    }
  }, [loggedIn, loadingLoginCheck, redirectPath]);

  const loadingAuth = loadingLoginCheck || !loggedIn;

  return loadingAuth;
}

export default useAuthPage;
