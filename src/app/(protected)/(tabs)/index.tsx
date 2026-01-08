import { ScrollView, StyleSheet, View } from "react-native";
import { AppLinearGradient } from "@/components/AppLinearGradient";
import { PageHeading } from "@/components/PageHeading";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";
import { DayCard } from "@/components/DayCard";

//const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekDays = [
  { day: "Mon", hasActivity: false },
  { day: "Tue", hasActivity: true },
  { day: "Wed", hasActivity: false },
  { day: "Thu", hasActivity: false },
  { day: "Fri", hasActivity: false },
  { day: "Sat", hasActivity: false },
  { day: "Sun", hasActivity: false },
];

export default function Activity() {
  const { user, profile, logout } = useContext(AuthContext);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <AppLinearGradient>
      <ScrollView>
        <PageHeading
          heading="Good morning Kigozi"
          hasNotification={true}
          description="Ready to rock?"
          hasPicture={true}
        />

        <View style={styles.daysCardContainer}>
          {weekDays.map((day, index) => (
            <View key={index}>
              <DayCard
                day={day.day}
                hasActivity={day.hasActivity}
                isCurrentDay={day.day === today}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </AppLinearGradient>
  );
}

const styles = StyleSheet.create({
  daysCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
