import { StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface AppLinearGradientProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export function AppLinearGradient({ children, style }: AppLinearGradientProps) {
  return (
    <LinearGradient
      colors={[
        "#363636",
        "#313131",
        "#2c2c2c",
        "#272727",
        "#222222",
        "#1d1d1d",
      ]}
      locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
