import { ScrollView } from "react-native";
import { AppLinearGradient } from "@/components/AppLinearGradient";
import { PageHeading } from "@/components/PageHeading";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";
import { AppText } from "@/components/AppText";

//const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
        <AppText>Activity</AppText>
      </ScrollView>
    </AppLinearGradient>
  );
}
