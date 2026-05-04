export const formatTime = (time?: string) => {
  if (!time) return "";

  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr);

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return `${hour}:${minute} ${ampm}`;
};
