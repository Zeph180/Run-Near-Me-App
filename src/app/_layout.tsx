import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../../global.css";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/utils/authContext";
import { useSensorSession } from "@/hooks/useSensorSession";
import { useBackgroundTracking } from "@/hooks/useBackgroundTracking";
import "@/tasks/runDetectionTask";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const sensorSession = useSensorSession();

  // useAutoRunDetector(() => sensorSession.startSession());
  //
  // useAutoRunDetector(() => {
  //   if (!sensorSession.isRunning) {
  //     sensorSession.startSession();
  //   }
  // });
  useBackgroundTracking();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

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
