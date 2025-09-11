import { useContext } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { AppLinearGradient } from "@/components/AppLinearGradient";
import { PageHeading } from "@/components/PageHeading";
import { AppText } from "@/components/AppText";
import { AuthContext } from "@/utils/authContext";
import { FameCard } from "@/components/FameCard";

export default function Profile() {
  const { user, profile, account, token, isLoggedIn } = useContext(AuthContext);

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
        </View>
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
});
