import * as SecureStore from "expo-secure-store";

export function getLoginToken() {
  const token = SecureStore.getItem("token") ?? undefined;
  return token;
}
