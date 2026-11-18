import { useState } from "react";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import "./App.css";
function App() { // Change useState to true for testing purposes, change it back to false when done
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
