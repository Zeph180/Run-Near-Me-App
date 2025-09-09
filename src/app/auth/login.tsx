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
import { authService, LoginRequest } from "@/Services/api/Auth";
import { useApiMutation } from "@/hooks/useApi";
import { validateEmail } from "@/utils/emailValidation";

const handleLoginWithGoogle = () => {
  console.log("Login with Google!");
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const authContext = useContext(AuthContext);

  const {
    mutate: loginUser,
    isLoading,
    error,
  } = useApiMutation((data) => authService.login(data));

  async function handleLogin() {
    let valid = true;
    let tempErrors = { email: "", password: "" };

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      tempErrors.email = emailValidation.error;
      valid = false;
    }

    if (!password.trim()) {
      tempErrors.password = "Password is required";
      valid = false;
    }

    setErrors(tempErrors);
    if (!valid) return;

    const credentials: LoginRequest = {
      email,
      password,
    };

    try {
      const result = await loginUser(credentials);

      if (!result) {
        console.log("Login result is null");
        return;
      }

      if (result.error) {
        console.log("Login error: ", result.error);
        return;
      }

      if (result.statusCode !== 200 || !result.data) {
        console.log("Login failed or returned invalid data");
        return;
      }

      authContext.login(result);
      router.replace("(protected)");
    } catch (error) {
      console.log(error);
    }
  }

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
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              secureTextEntry={false}
              autoCapitalize="none"
              error={errors.email}
              keyboardType="email-address"
              editable={!isLoading}
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
              editable={!isLoading}
            />

            <Button
              title={isLoading ? "Signing in..." : "Login"}
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
