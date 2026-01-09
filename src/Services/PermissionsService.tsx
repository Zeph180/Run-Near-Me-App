import * as Location from "expo-location";

export async function requestPermissionsService() {
  await Location.requestForegroundPermissionsAsync();
  await Location.requestBackgroundPermissionsAsync();
}
