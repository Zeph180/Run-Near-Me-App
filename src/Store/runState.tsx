let runDetected = false;
let listeners: (() => void)[] = [];

/**
 * This acts like a tiny event bus between background task and React.
 */
export const RunState = {
  detectRun() {
    runDetected = true;
    listeners.forEach((l) => l());
  },

  reset() {
    runDetected = false;
  },

  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  get() {
    return runDetected;
  },
};
