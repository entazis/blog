export function formatDate(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(d);
}

