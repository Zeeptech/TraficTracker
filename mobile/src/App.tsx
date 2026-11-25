import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import "./App.css";
import { useAuth } from "./api/useAuth";

function App() {
  const auth = useAuth();

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text className="text-xl font-bold">Trafic Tracker</Text>
        {auth.isLoggedIn && <Dashboard />}
        {!auth.isLoggedIn && <Login />}
        <Text> By Zeephasa</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
