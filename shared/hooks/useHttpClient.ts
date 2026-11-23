type Data = Record<string, string>;

interface UseHttpClientProps {
  baseUrl?: string;
  headers?: Data | (() => Data);
  data?: Data;
  params?: string[];
}

async function request({
  method,
  baseUrl,
  endpoint,
  headers,
  params = [],
  data,
}: {
  method: "POST" | "GET" | "PUT" | "DELETE";
  baseUrl?: string;
  endpoint: string;
  headers?: Record<string, string>;
  params?: string[];
  data?: Data;
}) {
  const response = await fetch(
    `${baseUrl}/${endpoint}${params.length > 0 ? `?${params.join("&")}` : ""}`,
    {
      method: method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    },
  );

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response;
}

export function useHttpClient({
  baseUrl,
  headers,
  params,
}: UseHttpClientProps) {
  const getHeaders = () =>
    typeof headers === "function" ? headers() : headers;

  return {
    get: (endpoint: string) =>
      request({ method: "GET", baseUrl, endpoint, headers: getHeaders(), params }),
    post: (endpoint: string, data: Data) =>
      request({ method: "POST", baseUrl, endpoint, headers: getHeaders(), params, data }),
    put: (endpoint: string, data: Data) =>
      request({ method: "PUT", baseUrl, endpoint, headers: getHeaders(), params, data }),
    delete: (endpoint: string) =>
      request({ method: "DELETE", baseUrl, endpoint, params, headers: getHeaders() }),
  };
}
