import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { AntDesign } from "@expo/vector-icons";
import colors from "@/Constants/Colors";

type dayProps = {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  hasActivity: boolean;
  isCurrentDay: boolean;
};

export function DayCard({
  day,
  isCurrentDay = false,
  hasActivity = false,
}: dayProps) {
  let textColor = "disabled";
  let fireColor = colors.disabled;

  if (hasActivity) {
    textColor = "offWhite";
    fireColor = colors.offWhite;
  } else if (isCurrentDay) {
    textColor = "lime";
    fireColor = colors.lime;
  }

  return (
    <Pressable>
      <View style={styles.dayCardContainer}>
        <AppText size={"small"} bold color={textColor}>
          {day}
        </AppText>
        <AntDesign name="fire" size={8} color={fireColor} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dayCardContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.disabled,
    width: 40,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
