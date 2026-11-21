import { useAuth } from "../api/useAuth";
import { AddTrip } from "../components/AddTrip";
import { Button } from "../components/UI/Button";
export function Dashboard() {
  const auth = useAuth();

  return (
    <div className="grid w-fit">
      <h1>Dashboard</h1>
      <AddTrip />
      <Button onClick={auth.logout}>Log Out</Button>
      <h2>Wälkom ditt HoerBarn</h2>
    </div>
  );
}
