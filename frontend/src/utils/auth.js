import { getCookie } from "utils/cookie";

export function getAuthHeader() {
  const authToken = document.cookie ? getCookie(document.cookie, "jwt") : undefined;

  const config = authToken
    ? {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    : {};

  return config;
}
