import * as Location from "expo-location";

export type PermissionState = {
  foreground: string | null; // "granted" | "denied" | "undetermined"
  background: string | null; // "granted" | "denied" | "undetermined"
  loading: boolean;
  error: string | null;
};

export async function requestPermissionsService(): Promise<{
  foreground: string;
  background: string;
}> {
  // Step 1️⃣ Request foreground permissions first
  const fg = await Location.requestForegroundPermissionsAsync();
  console.log("[PERMISSION] Foreground:", fg.status);

  if (fg.status !== "granted") {
    throw new Error(
      "Foreground location permission not granted. App cannot track runs.",
    );
  }

  // Step 2️⃣ Request background permissions
  try {
    const bg = await Location.requestBackgroundPermissionsAsync();
    console.log("[PERMISSION] Background:", bg.status);

    if (bg.status !== "granted") {
      throw new Error(
        "Background location permission not granted. App cannot track runs in background.",
      );
    }

    return {
      foreground: fg.status,
      background: bg.status,
    };
  } catch (err: any) {
    console.error("[PERMISSION ERROR]", err);
    throw new Error(
      err?.message ||
        "Background permission request failed. Make sure ACCESS_BACKGROUND_LOCATION is in AndroidManifest and Info.plist for iOS.",
    );
  }
}
