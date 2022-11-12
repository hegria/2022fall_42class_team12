export function getCookie(cookie, keyName) {
  const value = cookie;
  const parts = value.split(`; ${keyName}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}
