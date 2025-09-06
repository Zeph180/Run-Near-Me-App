import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { AppText } from "@/components/AppText";
import { Link, router } from "expo-router";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/Button";
import { useContext, useState } from "react";
import { AppLinearGradient } from "@/components/AppLinearGradient";
import { AuthContext } from "@/utils/authContext";

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
  const authContext = useContext(AuthContext);

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

    //TODO: add login logic here
    if (valid) {
      authContext.login();
      router.replace("(protected)");
    }
  };

  return (
    <AppLinearGradient>
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
              onChangeText={setusername}
              placeholder="Username"
              secureTextEntry={false}
              autoCapitalize="none"
              error={errors.username}
            />
            <FormInput
              label="Password"
              value={password}
              onChangeText={setPassword}
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
                <AppText color={"lime"}>SIGNUP</AppText>
              </Link>
            </AppText>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AppLinearGradient>
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
  orText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 15,
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
  signUpLink: {
    color: "#9ACD32",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
