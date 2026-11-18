import { AddTrip } from "../components/AddTrip";
import { Button } from "../components/UI/Button";
import { getLoginToken } from "../utils/getLoginToken";
export function Dashboard() {
  async function logOut() {
    const token = getLoginToken();
    if (token) {
      document.cookie = "token=; path=/; max-age-0";
      fetch("http://localhost:3000/auth", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.split("=")[1]}`,
        },
      }).then((response) => {
        if (response.ok) {
          window.location.reload();
        }
      });
    }
  }

  return (
    <div className="grid w-fit">
      <h1>Dashboard</h1>
      <AddTrip />
      <Button onClick={logOut}>Log Out</Button>
      <h2>Wälkom ditt HoerBarn</h2>
    </div>
  );
}
