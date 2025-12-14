import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../../global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/utils/authContext";

SplashScreen.setOptions({
  duration: 5000,
  fade: true,
});

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen
          name="(protected)"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
