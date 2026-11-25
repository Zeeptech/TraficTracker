import { Text, View } from "react-native";
import { useAuth } from "../api/useAuth";
import { AddTrip } from "../components/AddTrip";
import { Button } from "../components/UI/Button";
import { Container } from "../components/UI/Container";
export function Dashboard() {
  const auth = useAuth();

  return (
    <Container>
      <Text>Dashboard</Text>
      <AddTrip />
      <Text>Wälkom ditt HoerBarn</Text>
    </Container>
  );
}
