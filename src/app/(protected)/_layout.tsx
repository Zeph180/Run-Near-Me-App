import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";
import { AuthContext } from "@/utils/authContext";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function ProtectedLayout() {
  const authcontext = useContext(AuthContext);

  if (authcontext.isFirstTime) {
    console.log("is first time");
    return <Redirect href="/welcome" />;
  }
  if (!authcontext.isLoggedIn) {
    console.log("is not logged in : ", authcontext.isLoggedIn);
    return <Redirect href="/auth/login" />;
  }
  console.log("is not logged in ww: ", authcontext.isLoggedIn);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
