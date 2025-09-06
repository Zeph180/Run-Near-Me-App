import { AppLinearGradient } from "@/components/AppLinearGradient";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";

export default function Profile() {
  const authContext = useContext(AuthContext);

  return (
    <AppLinearGradient>
      <AppText>Profile screen</AppText>
      <Button title="Logout" onPress={authContext.logout} />
    </AppLinearGradient>
  );
}
