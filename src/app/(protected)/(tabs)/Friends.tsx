import { AppLinearGradient } from "@/components/AppLinearGradient";
import { PageHeading } from "@/components/PageHeading";
import FormInput from "@/components/FormInput";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import TabSwitcher from "@/components/TabSwitcher";
import { AppText } from "@/components/AppText";
import PostContent from "@/components/Post";

export default function Friends() {
  const [searchValue, setSearchValue] = useState<string>("");

  const tabs = [
    {
      label: "Posts",
      content: (
        <View>
          <AppText>Posts Content</AppText>
          <PostContent
            author="Zeph"
            profileImage={require("../../../../assets/profile.jpg")}
            postImage={require("../../../../assets/profile.jpg")}
            timestamp="May 23, 2025 at 08:19 AM"
            location="Kla"
            content="There is nothing better than a perfect morning jog! After a long time... Hope to continue a bit longer this time.. Feeling refreshed!"
          />
          <PostContent
            author="Luna"
            profileImage={require("../../../../assets/profile.jpg")}
            timestamp="Sep 14, 2025 at 06:45 PM"
            content="Just finished reading an amazing book. 📖✨ #bookworm"
          />
        </View>
      ),
    },
    {
      label: "Requests",
      content: (
        <View>
          <AppText>Requests Content</AppText>
        </View>
      ),
    },
    {
      label: "Leaderboard",
      content: (
        <View>
          <AppText>Leader Boards</AppText>
        </View>
      ),
    },
  ];

  return (
    <AppLinearGradient>
      <PageHeading
        heading="Friends"
        hasNotification={true}
        description="See what your friends have achieved and get inspired"
      />
      <ScrollView>
        <FormInput
          // label="Email"
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="What are you looking for today?"
          secureTextEntry={false}
          autoCapitalize="none"
          // error={errors.email}
          keyboardType="email-address"
          // editable={!isLoading}
          style={{ width: "100%" }}
        />

        <TabSwitcher
          tabs={tabs}
          initialTab={0}
          onTabChange={(index, tab) => console.log(`Active tab: ${tab.label}`)}
        />
      </ScrollView>
    </AppLinearGradient>
  );
}
