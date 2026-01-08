import { useContext, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { AppLinearGradient } from "@/components/AppLinearGradient";
import { PageHeading } from "@/components/PageHeading";
import { AppText } from "@/components/AppText";
import { AuthContext } from "@/utils/authContext";
import { FameCard } from "@/components/FameCard";
import { FameCardVertical } from "@/components/FameCardVertical";
import FameCardVerticalProps from "@/types/FameCardVertProps";
import { ProgressChart } from "@/components/ProgressChart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/Constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { RNFile } from "@/types/Requests/Post/PostRequests";
import { UpdateProfilePicRequest } from "@/types/Requests/Profile/ProfileRequests";
import { profileService } from "@/Services/api/ProfileService";

export default function Profile() {
  const { user, profile, logout } = useContext(AuthContext);
  const [range, setRange] = useState("Weekly");
  const [image, setImage] = useState<string | null>(null);

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

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const image = result.assets[0];

      const picToUpload: RNFile = {
        uri: image.uri,
        name: image.fileName ?? "profile.jpg",
        type: image.mimeType ?? "image/jpeg",
      };

      console.log("uiweyweewui : ", profile?.userId);

      let profilePicUploadRequest: UpdateProfilePicRequest = {
        UserId: profile?.userId,
        ProfilePicture: picToUpload,
      };

      let res = await profileService.updateProfilePicture(
        profilePicUploadRequest,
      );

      console.log("upload resp: ", res);
    }
  };

  return (
    <AppLinearGradient>
      <ScrollView>
        <PageHeading
          heading="Profile"
          hasNotification={false}
          description="Here you can track personal progress and edit personal details."
          hasPicture={false}
        />

        <View>
          <View style={styles.container}>
            <View style={styles.avatarBorder}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={{ uri: profile.profileImage }}
                  style={styles.avatar}
                />
                <View style={styles.cameraContainer}>
                  <Pressable
                    style={styles.innerCameraContainer}
                    onPress={() => pickImage()}
                  >
                    <MaterialCommunityIcons
                      name="camera"
                      size={25}
                      color={colors.primary}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>

        <AppText center size="xl" color="white">
          {user?.name}
        </AppText>

        <AppText center>{profile?.city}</AppText>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <FameCard
            title="Weight"
            value={profile?.weight?.toString() || "0.0"}
            unit="KGs"
            border="right"
          />
          <FameCard
            title="Height"
            value={profile?.height?.toString() || "0.0"}
            unit="CM"
            border="right"
          />
          <FameCard
            title="Age"
            value={profile?.age?.toString() || "0.0"}
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
    justifyContent: "center",
    marginTop: 20,
  },
  avatarBorder: {
    backgroundColor: colors.lime,
    height: 130,
    width: 130,
    borderRadius: 70,
    padding: 3,
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
  cameraContainer: {
    height: 120,
    width: 100,
    position: "absolute",
  },
  innerCameraContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    backgroundColor: colors.offWhite,
    position: "absolute",
    borderRadius: 70,
    bottom: 0,
    left: 70,
  },
});
