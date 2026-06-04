type Props = {
  date?: string;
  className?: string;
  showWeekday?: boolean; // ✅ optional
};

export default function FormattedDate({
  date,
  className,
  showWeekday = true,
}: Props) {
  if (!date) return null;

  const formatted = new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(showWeekday && { weekday: "long" }), // ✅ isasama lang kung true
  });

  if (showWeekday) {
    const parts = formatted.split(", "); // ["Monday", "January 1", "2025"]
    return (
      <span
        className={className}
      >{`${parts[1]}, ${parts[2]} - ${parts[0]}`}</span>
    );
  }

  return <span className={className}>{formatted}</span>; // "January 1, 2025"
}
