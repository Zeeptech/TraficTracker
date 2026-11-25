import { atom, getDefaultStore, useAtom } from "jotai";
import { Alert } from "react-native";
import { setLoginToken } from "../utils/setLoginToken";
import { destroyLoginToken } from "../utils/destroyLoginToken";
import type { User } from "@trafictracker/shared";
import { api } from "./api";

const authAtom = atom<User | null | undefined>();
const store = getDefaultStore();

async function refresh() {
  const response = await api.get("auth");

  if (!response.ok) {
    store.set(authAtom, null);
    return Alert.alert(response.statusText);
  }

  const result = await response.json();

  store.set(authAtom, result.user);
}

refresh().catch(() => store.set(authAtom, null));

export function useAuth() {
  const [user, setUser] = useAtom(authAtom);

  async function login(username: string, password: string) {
    const response = await api.post("auth", { username, password });
    const result = await response.json();

    console.log(result.token);

    setLoginToken(result.token);

    await refresh();
  }

  async function logout() {
    const response = await api.delete("auth");

    if (!response.ok) {
      return Alert.alert(response.statusText);
    }

    await destroyLoginToken();
    setUser(null);
  }

  return { login, logout, refresh, isLoggedIn: !!user, user };
}
