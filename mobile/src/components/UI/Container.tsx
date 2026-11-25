import { View } from "react-native";

export function Container({ children }: { children: React.ReactNode }) {
  return <View className="w-full max-w-3xl mx-auto p-4">{children}</View>;
}
