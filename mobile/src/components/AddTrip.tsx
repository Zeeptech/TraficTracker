import { useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import { useStops } from "../api/useStops";
import { Button } from "./UI/Button";
import { Container } from "./UI/Container";

export function AddTrip() {
  const stops = useStops();

  // Exempelanvändning:
  const testSearch = "härnösand";

  useEffect(() => {
    // stops.search för att söka
    stops.search(testSearch);
  }, [testSearch]);

  // Resultaten uppdateras efter du kallar på stops.search
  console.log(stops.results);

  return (
    <View>
      <TextInput
        placeholder="Sök efter hållplats"
        className="border border-gray-300 rounded-md p-2 mb-4"
      ></TextInput>

      <Text className="text-lg font-bold mx-3 p-2">Till</Text>
      <TextInput
        placeholder="Sök efter hållplats"
        className="border border-gray-300 rounded-md p-2 mt-4"
      ></TextInput>
    </View>
  );
}
