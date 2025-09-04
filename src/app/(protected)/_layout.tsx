import { Redirect, Stack } from "expo-router";
import React from "react";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export const isLoggedIn = false;
export const isFirstTime = true;

export default function RootLayout() {
  if (isFirstTime) {
    console.log("is first time");
    return <Redirect href="/welcome" />;
  }
  if (!isLoggedIn) {
    console.log("is not logged in : ", isLoggedIn);
    return <Redirect href="/auth/login" />;
  }
  console.log("is not logged in ww: ", isLoggedIn);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
