import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";
import { AuthContext } from "@/utils/authContext";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function ProtectedLayout() {
  const authContext = useContext(AuthContext);

  if (!authContext.isReady) {
    return null;
  }

  if (authContext.isFirstTime) {
    console.log("is first time");
    return <Redirect href="/welcome" />;
  }
  if (!authContext.isLoggedIn) {
    console.log("is not logged in : ", authContext.isLoggedIn);
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
