export const formatTime = (time: string) => {
  if (!time) return "";

  return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
