import { useEffect } from "react";
import { useStops } from "../api/useStops";
import { Button } from "./UI/Button";

export function AddTrip() {
  const stops = useStops();

  // Exempelanvändning:
  const testSearch = "klippgatan";

  useEffect(() => {
    // stops.search för att söka
    stops.search(testSearch);
  }, [testSearch]);

  // Resultaten uppdateras efter du kallar på stops.search
  console.log(stops.results);

  return (
    <div className="grid w-fit">
      <h1>Add Trip</h1>
    </div>
  );
}
