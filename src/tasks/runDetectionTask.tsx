import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import {
  RUN_DETECTION_TASK,
  RUNNING_SPEED_THRESHOLD,
} from "@/Config/runDetection.config.ts";
import { logEvent } from "@/utils/logger";
import { RunState } from "@/Store/runState";

/**
 * Background task called by Expo TaskManager
 * when location updates are received in the background
 */
TaskManager.defineTask(RUN_DETECTION_TASK, ({ data, error }) => {
  if (error || !data) {
    console.error("[RUN DETECTION TASK] error ", error);
    return;
  }

  const { locations } = data as { locations: Location.LocationObject[] };

  locations.forEach((location) => {
    const speed = location.coords.speed ?? 0;

    logEvent("[BG GPS]", {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      speed,
      timestamp: location.timestamp,
    });

    // Detect running automatically
    if (speed >= RUNNING_SPEED_THRESHOLD) {
      logEvent("[BG RUN DETECTED]", { speed });
      RunState.detectRun();

      /**
       * Here you can:
       * 1. Trigger a foreground session (via a state manager or context)
       * 2. Persist session start to local DB
       */
    }
  });
});
