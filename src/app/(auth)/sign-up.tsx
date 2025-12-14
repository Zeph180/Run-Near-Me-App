import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AppLinearGradient } from "@/components/AppLinearGradient";
import { AppText } from "@/components/AppText";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/Button";
import { authScreenStyles } from "@/styles/authScreenStyles";
import { Link } from "expo-router";
import { FrostedGlassCard } from "@/components/FrostedGlassCard";
import React, { useState } from "react";
import { useApiMutation } from "@/hooks/useApi";
import { authService } from "@/Services/api/Auth";
import { validateEmail } from "@/utils/emailValidation";
import { navigate } from "expo-router/build/global-state/routing";
import { Image } from "expo-image";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email: string;
    password: string;
    name: string;
  }>({
    email: "",
    password: "",
    name: "",
  });

  const {
    mutate: signUpUser,
    isLoading,
    error,
  } = useApiMutation((data) => authService.signup(data));

  async function handleSignUp() {
    let valid = true;
    let tempErrors = { email: "", password: "", name: "" };
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      tempErrors.email = emailValidation.error;
      valid = false;
    }
    if (!password.trim()) {
      tempErrors.password = "Password is required";
    }
    if (!name.trim()) {
      tempErrors.name = "Username is required";
    }
    setErrors(tempErrors);
    if (!valid) return;

    const credentials = {
      email,
      password,
      name,
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    };

    try {
      const result = await signUpUser(credentials);
      console.log("Signup result: ", result);
      if (!result) {
        console.log("Signup result is null");
        return;
      }
      if (!result?.success) {
        console.log("Signup failed");
        return;
      }
      console.log("Signup success");
      navigate("/login");
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
        <TouchableWithoutFeedback onPress={() => {}}>
          <ScrollView
            contentContainerStyle={authScreenStyles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={authScreenStyles.logoContainer}>
              <Image
                style={authScreenStyles.logoImage}
                source={require("../../../assets/logo.svg")}
                contentFit="contain"
              />
            </View>

            <AppText center size={"xl"}>
              Sign up to get started
            </AppText>

            <FrostedGlassCard>
              <View>
                <FormInput
                  label="Name"
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  secureTextEntry={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  editable={true}
                  error={errors.name}
                />
                <FormInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  secureTextEntry={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={true}
                  error={errors.email}
                />
                <FormInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  keyboardType="default"
                  editable={true}
                  error={errors.password}
                />

                <Button
                  title="Sign up"
                  onPress={() => handleSignUp()}
                  theme="lime"
                  style={authScreenStyles.button}
                />

                <AppText center>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    style={authScreenStyles.signUpLink}
                    onPress={() => {}}
                  >
                    Login
                  </Link>
                </AppText>
              </View>
            </FrostedGlassCard>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AppLinearGradient>
  );
}
