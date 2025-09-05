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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email,
    password,
  });

  const validate = () => {
    let valid = true;
    let tempErrors = { email: "", password: "" };

    if (!email) {
      tempErrors.email = "Email is required";
      valid = false;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient
        colors={["#2a2829", "#181718", "#040404"]}
        style={styles.gradient}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Link href="/auth/sign-up" asChild>
              <AppText center size={"xl"}>
                Login to continue
              </AppText>
            </Link>

            <FormInput
              label="Email"
              value={email}
              onChangeText={() => setErrors}
              placeholder="Username"
              secureTextEntry={false}
              autoCapitalize="none"
              keyboardType="email-address"
              error={errors.email}
            />
            <FormInput
              label="Password"
              value={password}
              onChangeText={() => console.log(password)}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              keyboardType="email-address"
              error={errors.password}
            />

            <Button
              title="Login"
              onPress={validate}
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
              <Link href="/auth/sign-up>">SIGNUP</Link>
            </AppText>
          </ScrollView>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    width: "89%",
    marginTop: 20,
    borderRadius: 13,
  },
});
