import { AppLinearGradient } from "@/components/AppLinearGradient";
import { PageHeading } from "@/components/PageHeading";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";
import { DayCard } from "@/components/DayCard";
import { ScrollView, StyleSheet, View } from "react-native";
import Colors from "@/Constants/Colors";
import { AppText } from "@/components/AppText";

const weekDays = [
  { day: "Mon", hasActivity: false },
  { day: "Tue", hasActivity: true },
  { day: "Wed", hasActivity: false },
  { day: "Thu", hasActivity: false },
  { day: "Fri", hasActivity: false },
  { day: "Sat", hasActivity: false },
  { day: "Sun", hasActivity: false },
];

export default function Home() {
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

        <View style={styles.progressContainer}>
          <View style={styles.mapView}>
            <View style={styles.timeAndDistanceContainer}>
              <View style={styles.overMapContainer}>
                <AppText>Time</AppText>
              </View>
              <View style={styles.overMapContainer}>
                <AppText>Distance</AppText>
              </View>
            </View>
          </View>
          <View style={styles.statsView}>
            <View style={styles.statCard}>
              <AppText>calories</AppText>
            </View>
            <View style={styles.statCard}>
              <AppText>calories</AppText>
            </View>
          </View>
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
  progressContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.danger,
    height: 230,
    width: "100%",
  },
  mapView: {
    backgroundColor: Colors.primary,
    height: "100%",
    width: "60%",
  },
  statsView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    height: "100%",
    width: "38%",
  },
  statCard: {
    backgroundColor: Colors.white,
    height: "48%",
  },
  timeAndDistanceContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.lime,
    height: "35%",
    width: "100%",
  },
  overMapContainer: {
    backgroundColor: Colors.white,
    width: "48%",
  },
});
