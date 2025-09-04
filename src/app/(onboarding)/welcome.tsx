import { ImageBackground, StyleSheet, View } from "react-native";
import { Button } from "@/components/Button";
import { AppText } from "@/components/AppText";

export default function Welcome() {
  return (
    <ImageBackground
      source={require("../../../assets/welcomeJogger.png")}
      style={styles.container}
    >
      <View style={styles.Content}>
        <AppText size={"xxl"} center>
          Track your activity {"\n"} and get better
        </AppText>
        <AppText color={"white"} size={"xl"} center>
          Run and check the distance you have covered {"\n"} using Run Near Me
        </AppText>
        <Button
          title="Get Started"
          onPress={() => {}}
          theme={"lime"}
          style={{ width: "80%" }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  Content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
