import { AppLinearGradient } from "@/components/AppLinearGradient";
import { PageHeading } from "@/components/PageHeading";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";

export default function Home() {
  const { profile } = useContext(AuthContext);

  return (
    <AppLinearGradient>
      <PageHeading
        heading="Good morning, Suubi!"
        hasNotification={true}
        description="Ready to rock?"
        hasPicture={true}
        pictureUrl={profile.profileImage}
      />
    </AppLinearGradient>
  );
}
