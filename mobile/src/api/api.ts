import { useHttpClient } from "@trafictracker/shared/hooks";
import { getLoginToken } from "../utils/getLoginToken";

export const api = useHttpClient({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  headers: () => ({
    Authorization: `Bearer ${getLoginToken()}`,
    "Content-Type": "application/json",
  }),
});
