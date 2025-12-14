import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { AppText } from "@/components/AppText";
import { Link } from "expo-router";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/Button";
import { useContext, useState } from "react";
import { AppLinearGradient } from "@/components/AppLinearGradient";
import { AuthContext } from "@/utils/authContext";
import { authService, LoginRequest } from "@/Services/api/Auth";
import { useApiMutation } from "@/hooks/useApi";
import { validateEmail } from "@/utils/emailValidation";
import { authScreenStyles } from "@/styles/authScreenStyles";
import { FrostedGlassCard } from "@/components/FrostedGlassCard";

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
      console.log("Login result: ", result);
      if (!result) {
        console.log("Login result is null");
        return;
      }

      if (result.errors.length > 0) {
        console.log("Login error: ", result.errors);
        return;
      }

      if (!result.data) {
        console.log("Resp data :", result.data);
        console.log("Login failed or returned invalid data");
        return;
      }

      authContext.login(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppLinearGradient>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authScreenStyles.keyBoardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={authScreenStyles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <AppText center size={"xl"}>
              Login to continue
            </AppText>

            <FrostedGlassCard style={authScreenStyles.formContainer}>
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
                style={authScreenStyles.button}
              />

              <AppText center>OR</AppText>

              <Button
                title="Continue with Google"
                onPress={() => handleLoginWithGoogle()}
                style={authScreenStyles.button}
              />

              <AppText center>
                Don{"'"}t have an account?{" "}
                <Link href="/sign-up" style={authScreenStyles.signUpLink}>
                  <AppText color={"lime"}>Signup</AppText>
                </Link>
              </AppText>
            </FrostedGlassCard>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AppLinearGradient>
  );
}
