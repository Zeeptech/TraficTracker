import { createMemoryCache } from "../lib/createMemoryCache.js";

type Data = Record<string, string>;

interface UseHttpClientProps {
  baseUrl?: string;
  headers?: Data | (() => Data);
  data?: Data;
  params?: string[];
  cacheLifetimeSeconds?: number;
}

export function useHttpClient({
  baseUrl,
  headers,
  params,
  cacheLifetimeSeconds,
}: UseHttpClientProps) {
  const cache = cacheLifetimeSeconds
    ? createMemoryCache(cacheLifetimeSeconds)
    : null;

  async function request({
    method,
    baseUrl,
    endpoint,
    headers,
    params = [],
    data,
    useCache,
  }: UseHttpClientProps & {
    method: "POST" | "GET" | "PUT" | "DELETE";
    endpoint: string;
    useCache?: boolean;
    headers?: Record<string, string>;
  }) {
    const url = `${baseUrl}/${endpoint}${params.length > 0 ? `?${params.join("&")}` : ""}`;

    const cached = useCache ? cache?.get(url) : null;

    if (cached) return cached;

    const response = await fetch(url, {
      method: method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    if (useCache) await cache?.add(url, response);

    return response;
  }

  const getHeaders = () =>
    typeof headers === "function" ? headers() : headers;

  return {
    get: (endpoint: string, extraParams: string[] = []) =>
      request({
        method: "GET",
        baseUrl,
        endpoint,
        headers: getHeaders(),
        params: [...(params ?? []), ...extraParams],
        useCache: true,
      }),
    post: (endpoint: string, data: Data) =>
      request({
        method: "POST",
        baseUrl,
        endpoint,
        headers: getHeaders(),
        params,
        data,
      }),
    put: (endpoint: string, data: Data) =>
      request({
        method: "PUT",
        baseUrl,
        endpoint,
        headers: getHeaders(),
        params,
        data,
      }),
    delete: (endpoint: string) =>
      request({
        method: "DELETE",
        baseUrl,
        endpoint,
        params,
        headers: getHeaders(),
      }),
  };
}
