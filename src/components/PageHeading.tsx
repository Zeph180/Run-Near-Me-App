import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { Octicons } from "@expo/vector-icons";

type pageHeadingProps = {
  heading: string;
  description?: string;
  hasNotification: boolean;
};

export function PageHeading({
  heading,
  description,
  hasNotification = true,
}: pageHeadingProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContent}>
        <AppText>
          <AppText size="heading" bold>
            {heading}
          </AppText>{" "}
          {"\n"}
          {description}
        </AppText>
      </View>

      <Pressable onPress={() => {}} disabled={hasNotification}>
        <Octicons name="bell-fill" size={30} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    alignItems: "center",
  },
  textContent: {
    maxWidth: "80%",
  },
});
