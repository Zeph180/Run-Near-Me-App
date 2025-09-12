import { AppText } from "@/components/AppText";
import { StyleSheet, View } from "react-native";

type fameCardProps = {
  title: string;
  value: string;
  unit: string;
  icon?: string;
  border?: "full" | "left" | "right" | "none";
  hasBorder?: boolean;
  hasIcon?: boolean;
};

export const FameCard = ({
  title,
  value,
  unit,
  icon = "",
  border = "none",
  hasIcon = false,
}: fameCardProps) => {
  const getBorderStyle = () => {
    const borderColor = "#a4ff53";
    const borderWidth = 0.5;

    switch (border) {
      case "full":
        return {
          borderColor,
          borderWidth,
        };
      case "left":
        return {
          borderLeftColor: borderColor,
          borderLeftWidth: borderWidth,
        };
      case "right":
        return {
          borderRightColor: borderColor,
          borderRightWidth: borderWidth,
        };
      case "none":
        return {
          border: "none",
        };
    }
  };

  return (
    <View style={[styles.container, getBorderStyle()]}>
      <AppText color="lime" size="medium">
        {title}
      </AppText>
      <AppText color="white" size="xl" center>
        {value}{" "}
        <AppText color="offWhite" size="small">
          {unit}
        </AppText>
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
