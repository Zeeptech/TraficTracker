import * as SecureStore from "expo-secure-store";

export function destroyLoginToken() {
  return SecureStore.deleteItemAsync("token");
}
