import { useContext, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
import { AppLinearGradient } from "@/components/AppLinearGradient";
import { PageHeading } from "@/components/PageHeading";
import { AppText } from "@/components/AppText";
import { AuthContext } from "@/utils/authContext";
import { FameCard } from "@/components/FameCard";
import { FameCardVertical } from "@/components/FameCardVertical";
import FameCardVerticalProps from "@/types/FameCardVertProps";
import { ProgressChart } from "@/components/ProgressChart";

export default function Profile() {
  const { user, profile, account, token, isLoggedIn, logout } =
    useContext(AuthContext);
  const [range, setRange] = useState("Weekly");

  const vertCards: FameCardVerticalProps[] = [
    {
      icon: "clock-time-four",
      value: "21",
      label: "Hours",
      unit: "Hours",
    },
    {
      icon: "go-kart-track",
      value: "184",
      label: "Total Distance",
      unit: "KMs",
    },
    {
      icon: "fire",
      value: "1728",
      label: "Total Calories Burned",
      unit: "Kcal",
    },
    {
      icon: "heart-pulse",
      value: "75",
      label: "Heart Rate",
      unit: "BPM",
    },
  ];

  return (
    <AppLinearGradient>
      <ScrollView>
        <PageHeading
          heading="Profile"
          hasNotification={false}
          description="Here you can track personal progress and edit personal details."
        />

        <View style={styles.container}>
          <View style={styles.avatarBorder}>
            <View style={styles.avatarWrapper}>
              <Image
                source={require("../../../../assets/profile.jpg")}
                style={styles.avatar}
              />
            </View>
          </View>

          <AppText center size="xl" color="white">
            {profile?.nickName}
          </AppText>

          <AppText center>{profile?.city}</AppText>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <FameCard
              title="Weight"
              value={profile?.weight?.toString() || ""}
              unit="KGs"
              border="right"
            />
            <FameCard
              title="Height"
              value={profile?.height?.toString() || ""}
              unit="CM"
              border="right"
            />
            <FameCard
              title="Age"
              value={profile?.age?.toString() || ""}
              unit="Yrs"
            />
          </View>

          <View style={styles.grid}>
            {vertCards.map((card, index) => (
              <View key={index}>
                <FameCardVertical
                  value={card.value}
                  label={card.label}
                  unit={card.unit}
                  icon={card.icon}
                />
              </View>
            ))}
          </View>
        </View>

        <View>
          <ProgressChart
            title="Progress Chart"
            subtitle="Step count of this week"
            selectedRange={range}
            onRangeChange={setRange}
            data={[200, 300, 50, 0, 320, 400]}
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          />
        </View>

        <Button title="Logout" onPress={() => logout()} />
      </ScrollView>
    </AppLinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  avatarBorder: {
    backgroundColor: "#a4ff54",
    height: 130,
    width: 130,
    borderRadius: 70,
    padding: 2,
    margin: 15,
  },
  avatarWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    borderWidth: 3.2,
    borderColor: "black",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 70,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 60,
    marginBottom: 30,
  },
});
