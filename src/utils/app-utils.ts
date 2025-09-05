export function makeSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "_") // Replace ONLY spaces with underscores
    .replace(/-+/g, "-") // Collapse multiple hyphens to single hyphen
    .replace(/^[-_]+/, "") // Remove leading underscores and hyphens
    .replace(/[-_]+$/, ""); // Remove trailing underscores and hyphens
}
