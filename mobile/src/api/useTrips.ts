import type { Trip } from "@trafictracker/shared/Trip";
import { atom, useAtom } from "jotai";
import { api } from "./api";

const tripsAtom = atom<Trip>();

export function useTrips() {
  const [trip, setTrip] = useAtom(tripsAtom);

  async function search(from: number, to: number) {
    const response = await api.get(`trips/${from}/${to}`);
    const { data } = await response.json();

    setTrip(data);
  }

  return { search, result: trip };
}
