import { Tabs } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Tabs />
    </React.Fragment>
  );
}
