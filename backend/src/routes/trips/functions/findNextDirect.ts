import { resrobot } from "../../../clients/resrobot.js";
import type { Departure } from "@trafictracker/shared/Trip";

interface ResRobotTrip {
  Origin: { date: string; time: string };
  Destination: { date: string; time: string };
  LegList: { Leg: { type: string; Product: { displayNumber: string }[] }[] };
}

export async function findNextDirect(
  from: string,
  to: string,
): Promise<Departure | null> {
  let after: string[] = [];

  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await resrobot.get("trip", [
      `originId=${from}`,
      `destId=${to}`,
      "numF=6",
      "originWalk=0",
      "destWalk=0",
      ...after,
    ]);

    const { Trip: found = [] }: { Trip?: ResRobotTrip[] } = await res.json();

    if (found.length === 0) return null;

    const direct = found.find(
      ({ LegList }) =>
        LegList.Leg.length === 1 && LegList.Leg[0].type === "JNY",
    );

    if (direct) {
      return {
        line: direct.LegList.Leg[0].Product[0].displayNumber,
        platform: null,
        departure: `${direct.Origin.date}T${direct.Origin.time}`,
        arrival: `${direct.Destination.date}T${direct.Destination.time}`,
      };
    }

    const last = found.at(-1)!.Origin;
    const [date, time] = new Date(
      new Date(`${last.date}T${last.time}`).getTime() + 60000,
    )
      .toLocaleString("sv-SE")
      .split(" ");

    after = [`date=${date}`, `time=${time.slice(0, 5)}`];
  }

  return null;
}
