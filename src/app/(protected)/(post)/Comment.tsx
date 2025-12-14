import { AppText } from "@/components/AppText";
import { AppLinearGradient } from "@/components/AppLinearGradient";
import PostContent from "@/components/Post";
import { KeyboardAvoidingView } from "react-native";
import FormInput from "@/components/FormInput";
import { useState } from "react";

export default function Comment() {
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppLinearGradient>
      <KeyboardAvoidingView>
        <PostContent
          author="JKIgozi"
          timestamp="2323:32323"
          content="lorem ipsun tes ammet is a hgood pharase"
          likesCount={2}
          commentsCount={1}
          postId="4rerererrre"
        />

        <FormInput
          value={comment}
          placeholder="Write something great..."
          secureTextEntry={false}
          autoCapitalize="none"
          keyboardType="numeric"
          multiline={true}
          editable={!isLoading}
          onChangeText={setComment}
        />
      </KeyboardAvoidingView>
    </AppLinearGradient>
  );
}
