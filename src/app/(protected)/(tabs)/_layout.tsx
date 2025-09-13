import { Tabs } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#a4ff53",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#1e1e1e",
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Challenge"
          options={{
            title: "Challenge",
            tabBarIcon: ({ color }) => (
              <Foundation name="mountains" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Activity",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Friends"
          options={{
            title: "Friends",
            tabBarIcon: ({ color }) => (
              <Ionicons name="people-sharp" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-sharp" size={30} color={color} />
            ),
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}
