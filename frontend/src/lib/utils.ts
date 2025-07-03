export function formatMessageTime(date: string | number | Date): string {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
