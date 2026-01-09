import { Accelerometer, Gyroscope } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

/**
 * Automatically starts a sensor session
 * without any user interaction.
 */
export function useAutoSensorSession() {
  // Hold sensor subscriptions
  const accelerometerSubscription = useRef<any>(null);
  const gyroscopeSubscription = useRef<any>(null);

  // Track whether sensors are active
  const [isRunning, setIsRunning] = useState(false);

  // Store collected sensor data
  const [sessionData, setSessionData] = useState<any[]>([]);

  /**
   * Starts sensor listeners
   */
  const startSession = () => {
    if (isRunning) return;

    setIsRunning(true);
    setSessionData([]);

    // Set how often sensor data is collected
    Accelerometer.setUpdateInterval(1000);
    Gyroscope.setUpdateInterval(1000);

    accelerometerSubscription.current = Accelerometer.addListener((data) => {
      setSessionData((prev) => [
        ...prev,
        {
          sensor: "accelerometer",
          ...data,
          timestamp: Date.now(),
        },
      ]);
    });

    gyroscopeSubscription.current = Gyroscope.addListener((data) => {
      setSessionData((prev) => [
        ...prev,
        {
          sensor: "gyroscope",
          ...data,
          timestamp: Date.now(),
        },
      ]);
    });
  };

  /**
   * Stops sensor listeners cleanly
   */
  const stopSession = () => {
    accelerometerSubscription.current?.remove();
    gyroscopeSubscription.current?.remove();

    accelerometerSubscription.current = null;
    gyroscopeSubscription.current = null;

    setIsRunning(false);
  };

  /**
   * Automatically start session on app load
   */
  useEffect(() => {
    startSession();

    /**
     * Handle app lifecycle:
     * - Restart sensors when app returns to foreground
     * - Stop sensors when app goes background (battery safety)
     */
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        startSession();
      } else {
        stopSession();
      }
    });

    return () => {
      stopSession();
      subscription.remove();
    };
  }, []);

  return {
    isRunning,
    sessionData,
  };
}
