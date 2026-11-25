import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useAuth } from "../api/useAuth";
import { Button } from "./UI/Button";

function LoginForm() {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    auth.login(username, password);
  }
  return (
    <View className="w-fit p-4">
      <Text>Login</Text>
      <View>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          onSubmitEditing={login}
        />
        <Button onClick={login}>
          <Text className="text-white">Login</Text>
        </Button>
      </View>
    </View>
  );
}

export default LoginForm;
