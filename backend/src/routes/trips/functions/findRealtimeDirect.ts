import { trafiklab } from "../../../clients/trafiklab.js";
import type { Departure } from "@trafictracker/shared/Trip";

interface Call {
  trip: { trip_id: string };
  route: { designation: string };
  scheduled: string;
  realtime: string;
  canceled: boolean;
  scheduled_platform?: { designation: string };
}

export async function findRealtimeDirect(
  from: string,
  to: string,
): Promise<Departure[]> {
  const [fromRes, toRes] = await Promise.all([
    trafiklab.get(`departures/${from}`),
    trafiklab.get(`arrivals/${to}`),
  ]);

  const { departures }: { departures: Call[] } = await fromRes.json();
  const { arrivals }: { arrivals: Call[] } = await toRes.json();

  return departures
    .filter((departure) => !departure.canceled)
    .flatMap((departure) => {
      const arrival = arrivals.find(
        (arrival) =>
          arrival.trip.trip_id === departure.trip.trip_id &&
          arrival.scheduled > departure.scheduled,
      );

      if (!arrival) return [];

      return {
        line: departure.route.designation,
        platform: departure.scheduled_platform?.designation ?? null,
        departure: departure.realtime ?? departure.scheduled,
        arrival: arrival.realtime ?? arrival.scheduled,
      };
    });
}
