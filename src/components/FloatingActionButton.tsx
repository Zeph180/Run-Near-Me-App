import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type FloatingActionButtonProps = {
  onPress: () => void;
};

const FloatingActionButton = ({ onPress }: FloatingActionButtonProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "lightblue", borderless: true }}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.7 : 1.0 },
        ]}
      >
        <MaterialIcons name="add" size={30} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
  button: {
    backgroundColor: "#2196F3", // Blue FAB color
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
    }),
  },
});

export default FloatingActionButton;
