import { useState, useEffect } from "react";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import "./App.css";
import { getLoginToken } from "./utils/getLoginToken";
function App() {
  // Change useState to true for testing purposes, change it back to false when done
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = getLoginToken();
    if (token) {
      fetch("http://localhost:3000/auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.split("=")[1]}`,
        },
      }).then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
        }
      });
    }
  }, []);

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <>
      <h1 className="text-xl font-bold">Trafic Tracker</h1>
      {isAuthenticated && <Dashboard />}
      {!isAuthenticated && <Login />}
      <p> By Zeephasa</p>
    </>
  );
}

export default App;
