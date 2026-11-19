export function getLoginToken() {
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.slice("token=".length);
  return token;
}
