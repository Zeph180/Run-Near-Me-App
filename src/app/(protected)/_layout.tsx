import {Redirect, Stack, Tabs} from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export const isLoggedIn = false;

export default function RootLayout() {
    if (!isLoggedIn) {
        console.log("is not logged in : ", isLoggedIn);
        return <Redirect href="/auth/login" />
    }
    console.log("is not logged in ww: ", isLoggedIn);

    return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    </Stack>
  );
}
