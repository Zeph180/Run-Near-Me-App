import { Image, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { Octicons } from "@expo/vector-icons";

type pageHeadingProps = {
  heading: string;
  description?: string;
  hasNotification: boolean;
  hasPicture: boolean;
  pictureUrl?: string;
};

export function PageHeading({
  heading,
  description,
  hasNotification = true,
  hasPicture = false,
  pictureUrl = "",
}: pageHeadingProps) {
  return (
    <View style={styles.container}>
      {hasPicture && (
        <Pressable onPress={() => {}} disabled={hasNotification}>
          <Image
            source={{ uri: pictureUrl }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 15,
              marginRight: 10,
            }}
          />
        </Pressable>
      )}

      <View style={styles.justifiedContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: "row",
  },
  justifiedContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "85%",
  },
  textContent: {
    maxWidth: "80%",
  },
});
