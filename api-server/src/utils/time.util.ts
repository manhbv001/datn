export const toLocaleTimeString = (time?: string): string => {
  if (time)
    return new Date(time).toLocaleTimeString(process.env.LOCALES, {
      hour12: false,
      timeZone: process.env.TIME_ZONE,
    });

  return new Date().toLocaleTimeString(process.env.LOCALES, {
    hour12: false,
    timeZone: process.env.TIME_ZONE,
  });
};
