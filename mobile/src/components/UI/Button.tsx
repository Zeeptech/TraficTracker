import { Pressable, Text } from "react-native";

export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Pressable
      className="bg-emerald-800 px-4 py-2 my-2 rounded-md active:bg-emerald-900 mx-auto"
      onPress={onClick}
    >
      <Text className="text-white">{children}</Text>
    </Pressable>
  );
}
