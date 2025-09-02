import {Redirect, Stack, Tabs} from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";

export const isLoggedIn = false;

export default function RootLayout() {
    if (!isLoggedIn) {
        return <Redirect href="/login" />
    }
  return (

      
    <React.Fragment>
      <StatusBar style="auto" />
      <Tabs />
    </React.Fragment>
  );
}
