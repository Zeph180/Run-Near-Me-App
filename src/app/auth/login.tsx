import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { AppText } from "@/components/AppText";
import { Link } from "expo-router";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/Button";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const handleLoginWithGoogle = () => {
  console.log("Login with Google!");
};

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username: string; password: string }>({
    username,
    password,
  });

  const handleLogin = () => {
    let valid = true;
    let tempErrors = { email: "", password: "" };

    if (!username) {
      tempErrors.email = "Email is required";
      errors.username = tempErrors.email;
      valid = false;
    }

    if (!password) {
      tempErrors.email = "Password is required";
      errors.password = tempErrors.password;
      valid = false;
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : "This field is required",
    }));

    setusername(value);
    setPassword(value);
  };

  return (
    // <LinearGradient colors={["#2a2829", "#060606"]} style={styles.container}>
    <LinearGradient
      colors={[
        "#363636",
        "#313131",
        "#2c2c2c",
        "#272727",
        "#222222",
        "#1d1d1d",
      ]}
      locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyBoardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <AppText center size={"xl"}>
              Login to continue
            </AppText>

            <FormInput
              label="Username"
              value={username}
              onChangeText={() => handleInputChange("username", username)}
              placeholder="Username"
              secureTextEntry={false}
              autoCapitalize="none"
              error={errors.username}
            />
            <FormInput
              label="Password"
              value={password}
              onChangeText={() => handleInputChange("password", password)}
              keyboardType="default"
              secureTextEntry={true}
              autoCapitalize="none"
              error={errors.password}
              placeholder="Password"
            />

            <Button
              title="Login"
              onPress={() => handleLogin()}
              theme="lime"
              style={styles.button}
            />

            <AppText center>OR</AppText>

            <Button
              title="Continue with Google"
              onPress={() => handleLoginWithGoogle()}
              style={styles.button}
            />

            <AppText center>
              Don{"'"} have an account?{" "}
              <Link href="/auth/sign-up>" style={styles.signUpLink}>
                SIGNUP
              </Link>
            </AppText>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyBoardView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  signupText: {
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    width: "84%",
    marginTop: 20,
    borderRadius: 13,
  },
  signUpLink: {},
});
