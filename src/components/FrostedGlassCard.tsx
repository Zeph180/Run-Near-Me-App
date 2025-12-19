import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export function FrostedGlassCard({ children }: any) {
  return (
    <BlurView intensity={80} tint="dark" style={styles.card}>
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 20,
    overflow: "hidden",
    borderRadius: 18,

    // glass color
    backgroundColor: "rgba(255, 255, 255, 0.15)",

    // frosted border
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",

    // depth
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
});
