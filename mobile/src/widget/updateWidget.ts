import type { User } from "@trafictracker/shared";
import { Widget } from "../../modules/widget";

interface WidgetTrip {
  line: string;
  from: string;
  to: string;
  departure: number;
  frequencyMinutes: number | null;
}

interface WidgetData {
  name?: string;
  trip?: WidgetTrip;
}

export function updateWidget(user: User | null) {
  const data: WidgetData = user
    ? {
        name: user.name,
        trip: {
          line: "17",
          from: "T-Centralen",
          to: "Odenplan",
          departure: Date.now() + 10 * 60 * 1000,
          frequencyMinutes: 2,
        },
      }
    : {};

  Widget?.update(JSON.stringify(data));
}
