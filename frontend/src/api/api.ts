import { useHttpClient } from "@trafictracker/shared/hooks";
import { getLoginToken } from "../utils/getLoginToken";

export const api = useHttpClient({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: () => ({
    Authorization: `Bearer ${getLoginToken()}`,
    "Content-Type": "application/json",
  }),
});
