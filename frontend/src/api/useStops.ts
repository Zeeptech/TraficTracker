import { atom, useAtom } from "jotai";
import { api } from "./api";
import type { LocatedStop } from "@trafictracker/shared/Stop";

interface StopsStore {
  term: string;
  results: LocatedStop[];
}

const stopsAtom = atom<StopsStore>({
  term: "",
  results: [],
});

export function useStops() {
  const [stops, setStops] = useAtom(stopsAtom);

  async function setSearchTerm(term: string) {
    setStops((prev) => ({ ...prev, term }));
  }

  async function search(term?: string) {
    const response = await api.get(
      `stops/name/${encodeURIComponent(term ?? stops.term)}`,
    );
    const { data } = await response.json();

    setStops((prev) => ({ ...prev, results: data }));
  }

  return { setSearchTerm, search, results: stops.results };
}
