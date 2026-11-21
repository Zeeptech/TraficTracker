export function destroyLoginToken() {
  document.cookie = "token=; path=/; max-age=0";
}
