export const getPagination = (
  page: number,
  totalPages: number,
): (number | string)[] => {
  const pages: (number | string)[] = [];

  const delta = 1;
  const range: number[] = [];

  for (
    let i = Math.max(2, page - delta);
    i <= Math.min(totalPages - 1, page + delta);
    i++
  ) {
    range.push(i);
  }

  pages.push(1);

  if (range[0] > 2) {
    pages.push("...");
  }

  pages.push(...range);

  if (range[range.length - 1] < totalPages - 1) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};
