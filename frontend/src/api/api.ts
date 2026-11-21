import { getLoginToken } from "../utils/getLoginToken";

type Data = Record<string, string>;

async function request(
  method: "POST" | "GET" | "PUT" | "DELETE",
  endpoint: string,
  data?: Data,
) {
  const token = getLoginToken();

  const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response;
}

export const api = {
  get: (url: string) => request("GET", url),
  post: (url: string, data: Data) => request("POST", url, data),
  put: (url: string, data: Data) => request("PUT", url, data),
  delete: (url: string) => request("DELETE", url),
};
