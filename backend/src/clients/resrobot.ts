import { useHttpClient } from "@trafictracker/shared/hooks";

export const resrobot = useHttpClient({
  baseUrl: process.env.RESROBOT_URL,
  params: [`accessId=${process.env.RESROBOT_KEY}`, "format=json"],
  cacheLifetimeSeconds: 60,
});
