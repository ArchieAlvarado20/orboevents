export const cleanTags = (tags) => {
  try {
    if (typeof tags === "string") {
      tags = JSON.parse(tags);
    }

    while (
      Array.isArray(tags) &&
      tags.length === 1 &&
      typeof tags[0] === "string" &&
      tags[0].startsWith("[")
    ) {
      tags = JSON.parse(tags[0]);
    }

    return Array.isArray(tags)
      ? tags.map((t) =>
          String(t)
            .replace(/[\[\]\"]/g, "")
            .trim(),
        )
      : [];
  } catch {
    return [];
  }
};
