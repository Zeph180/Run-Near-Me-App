export const logEvent = (tag: string, data: any) => {
  console.log(`[${new Date().toISOString()}]`, tag, JSON.stringify(data));
};
