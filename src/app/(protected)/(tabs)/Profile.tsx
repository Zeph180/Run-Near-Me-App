import { AppLinearGradient } from "@/components/AppLinearGradient";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";
import { PageHeading } from "@/components/PageHeading";
import { SafeAreaView } from "react-native";

export default function Profile() {
  const authContext = useContext(AuthContext);

  return (
    <AppLinearGradient>
      <SafeAreaView>
        <PageHeading
          heading="Profile"
          hasNotification={false}
          description="Here you can track personal progress and edit personal details."
        />
        <Button title="Logout" onPress={authContext.logout} />
      </SafeAreaView>
    </AppLinearGradient>
  );
}
