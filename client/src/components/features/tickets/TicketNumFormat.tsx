export const formatTicketId = (id: string) => {
  if (!id) return "";

  const cleaned = id.replace(/\D/g, ""); // extract numbers only

  const part1 = cleaned.slice(0, 3).padEnd(3, "0");
  const part2 = cleaned.slice(3, 6).padEnd(3, "0");

  return `TCK-${part1}-${part2}`;
};
