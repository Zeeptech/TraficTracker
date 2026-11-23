import { useHttpClient } from "@trafictracker/shared/hooks";

export const trafiklab = useHttpClient({
  baseUrl: process.env.TRAFIKLAB_URL,
  params: [`key=${process.env.TRAFIKLAB_KEY}`],
  cacheLifetimeSeconds: 30,
});
