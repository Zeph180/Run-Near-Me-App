/**
 * Speed thresholds used to automatically detect running.
 * All values are in meters per second (m/s).
 */

// Average running starts around 7–9 km/h
// 2.2 m/s ≈ 7.9 km/h
export const RUNNING_SPEED_THRESHOLD = 0; //2.2;

/**
 * Number of consecutive GPS readings above threshold
 * required to confirm a running session.
 */
export const MIN_CONSECUTIVE_READINGS = 0; //3;

/**
 * Speed below which we consider the user stopped or walking
 */
export const STOP_SPEED_THRESHOLD = 0.0; //1.2;

/**
 * How long speed must stay below STOP_SPEED_THRESHOLD
 * before automatically stopping a session (milliseconds)
 */
export const STOP_DURATION_MS = 30_000;

export const RUN_DETECTION_TASK = "RUN_DETECTION_TASK";
