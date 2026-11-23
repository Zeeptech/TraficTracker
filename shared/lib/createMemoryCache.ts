interface CacheEntry {
  expires: number;
  body: string;
  status: number;
  headers: [string, string][];
}

export function createMemoryCache(lifetimeSeconds: number) {
  const entries = new Map<string, CacheEntry>();

  function get(key: string) {
    const entry = entries.get(key);

    if (!entry) return null;

    if (entry.expires < Date.now()) {
      entries.delete(key);
      return null;
    }

    return new Response(entry.body, {
      status: entry.status,
      headers: entry.headers,
    });
  }

  async function add(key: string, response: Response) {
    for (const [key, entry] of entries) {
      if (entry.expires < Date.now()) entries.delete(key);
    }

    entries.set(key, {
      expires: Date.now() + lifetimeSeconds * 1000,
      body: await response.clone().text(),
      status: response.status,
      headers: [...response.headers],
    });
  }

  return { get, add };
}
