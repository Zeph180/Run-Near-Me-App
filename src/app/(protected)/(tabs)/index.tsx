import { Text } from "react-native";
import { AppLinearGradient } from "@/components/AppLinearGradient";
import { Button } from "@/components/Button";
import { navigate } from "expo-router/build/global-state/routing";

export default function activity() {
  return (
    <AppLinearGradient>
      <Text>Activity screen</Text>
      <Button
        title="Got to profile"
        onPress={() => {
          navigate("/profile");
        }}
      />
    </AppLinearGradient>
  );
}
