import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { LocationAccuracy } from "expo-location";
import {
  MIN_CONSECUTIVE_READINGS,
  RUNNING_SPEED_THRESHOLD,
} from "@/Config/runDetection.config.ts";

export function useAutoRunDetector(onRunStart: () => void) {
  const speedHits = useRef(0);
  const watchRef = useRef<Location.LocationSubscription | null>(null);

  const [currentSpeed, setCurrentSpeed] = useState(0);

  const startMonitoring = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    watchRef.current = await Location.watchPositionAsync(
      {
        accuracy: LocationAccuracy.Balanced,
        timeInterval: 2000,
        distanceInterval: 5,
      },
      (location) => {
        const speed = location.coords.speed ?? 0;
        setCurrentSpeed(speed);

        console.log("[GPS UPDATE]", {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          speed,
          accuracy: location.coords.accuracy,
          heading: location.coords.heading,
          timestamp: location.timestamp,
        });

        if (speed >= RUNNING_SPEED_THRESHOLD) {
          speedHits.current += 1;

          if (speedHits.current >= MIN_CONSECUTIVE_READINGS) {
            onRunStart();
            stopMonitoring();
          }
        } else {
          speedHits.current = 0;
        }
      },
    );
  };

  const stopMonitoring = () => {
    watchRef.current?.remove();
    watchRef.current = null;
  };

  useEffect(() => {
    startMonitoring();
    return stopMonitoring;
  }, []);

  return { currentSpeed };
}
