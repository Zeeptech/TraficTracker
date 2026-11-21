import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import "./App.css";
import { useAuth } from "./api/useAuth";

function App() {
  const auth = useAuth();

  return (
    <>
      <h1 className="text-xl font-bold">Trafic Tracker</h1>
      {auth.isLoggedIn && <Dashboard />}
      {!auth.isLoggedIn && <Login />}
      <p> By Zeephasa</p>
    </>
  );
}

export default App;
