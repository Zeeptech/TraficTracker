import * as SecureStore from "expo-secure-store";

export function setLoginToken(token: string) {
  SecureStore.setItem("token", token);
}
