export function setLoginToken(token: string) {
  document.cookie = `token=${token}; path=/;`;
}
