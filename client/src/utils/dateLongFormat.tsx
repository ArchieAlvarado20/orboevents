type Props = {
  date?: string;
  className?: string;
};

export default function FormattedDate({ date, className }: Props) {
  if (!date) return null;

  const formatted = new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <span className={className}>{formatted}</span>;
}
