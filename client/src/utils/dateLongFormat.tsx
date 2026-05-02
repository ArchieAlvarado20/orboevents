export default function FormattedDate({ date }) {
  if (!date) return null;

  const formatted = new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <span>{formatted}</span>;
}
