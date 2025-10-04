import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppText, colorMap } from "@/components/AppText";

export type Action = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  onPress: () => void;
  iconColor?: "lime" | "offWhite";
};

type ActionButtonProps = {
  action: Action;
  iconSize?: number;
  spacing?: number;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  iconSize = 25,
  spacing = 10,
}: ActionButtonProps) => {
  // @ts-ignore
  return (
    <Pressable
      onPress={action.onPress}
      style={[styles.button, { columnGap: spacing }]}
    >
      <MaterialCommunityIcons
        name={action.icon}
        size={iconSize}
        color={colorMap[action.iconColor ?? "offWhite"]}
      />
      <AppText size="small" center>
        {action.label}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
  },
});

export default ActionButton;
