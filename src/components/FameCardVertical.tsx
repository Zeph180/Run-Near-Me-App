import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppText } from "@/components/AppText";
import FameCardVerticalProps from "@/types/FameCardVertProps";

export const FameCardVertical = ({
  icon,
  value,
  label,
  color = "#a4ff53",
  labelPosition = "top",
  unit = "",
}: FameCardVerticalProps) => {
  const LabelComponent = (
    <AppText color="offWhite" size="small">
      {label}
    </AppText>
  );

  return (
    <View style={styles.container}>
      {labelPosition === "top" && LabelComponent}

      <View style={[styles.card, { borderColor: color }]}>
        {icon && (
          <View style={[styles.iconContainer, { borderRightColor: color }]}>
            <MaterialCommunityIcons name={icon} size={30} color={color} />
          </View>
        )}

        <View style={styles.textContainer}>
          <AppText className="mb-0" size="xl" center color="lime" bold>
            {value}{" "}
            <AppText size="small" color="lime" bold={false}>
              {unit}
            </AppText>
          </AppText>
        </View>
      </View>

      {labelPosition === "bottom" && LabelComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    marginBottom: 6,
    marginTop: 6,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.3,
    borderRadius: 8,
    padding: 12,
    minWidth: 150,
  },
  iconContainer: {
    borderRightWidth: 1,
    paddingRight: 12,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
