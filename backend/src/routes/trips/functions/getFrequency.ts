import type { Departure } from "@trafictracker/shared/Trip";

export function getFrequency(matches: Departure[]) {
  const times = matches.map((match) => new Date(match.departure).getTime());

  if (times.length < 2) return null;

  return Math.round((times.at(-1)! - times[0]) / (times.length - 1) / 60000);
}
