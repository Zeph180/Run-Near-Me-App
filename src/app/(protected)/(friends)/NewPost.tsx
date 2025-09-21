import { AppLinearGradient } from "@/components/AppLinearGradient";
import { KeyboardAvoidingView, View } from "react-native";
import { PageHeading } from "@/components/PageHeading";

export default function NewPost() {
  return (
    <AppLinearGradient>
      <KeyboardAvoidingView>
        <PageHeading
          heading="New Post"
          hasNotification={false}
          description="What have you achieved today?"
        />
        <View></View>
      </KeyboardAvoidingView>
    </AppLinearGradient>
  );
}
