import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Alert, Modal, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import "./App.css";
import { Button } from "./components/UI/Button";
import { useAuth } from "./api/useAuth";
import { updateWidget } from "./widget/updateWidget";

function App() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.user !== undefined) updateWidget(auth.user);
  }, [auth.user]);

  Alert.alert(
    "Welcome to Penis Tracker",
    "This app is in early development and may contain bugs. Please report any issues to the developer.",
    [{ text: "OK" }],
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className=" flex-1  h-full">
          <Text className="text-xl font-bold">Trafic Tracker</Text>
          {auth.isLoggedIn && <Dashboard />}

          {!auth.isLoggedIn && <Login />}
          <View className="flex-1 p-4 justify-end">
            <Button onClick={auth.logout}>Log Out</Button>
            <Text className="text-center text-gray-600"> By Zeephasa</Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
