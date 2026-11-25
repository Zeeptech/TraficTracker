import { Text, View } from "react-native";
import { useAuth } from "../api/useAuth";
import { AddTrip } from "../components/AddTrip";
import { Button } from "../components/UI/Button";
export function Dashboard() {
  const auth = useAuth();

  return (
    <View className="w-fit">
      <Text>Dashboard</Text>
      <AddTrip />
      <Button onClick={auth.logout}>Log Out</Button>
      <Text>Wälkom ditt HoerBarn</Text>
    </View>
  );
}
