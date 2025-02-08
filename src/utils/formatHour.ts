export function formatHour(hour: number): string {
  if (hour === 24) {
    return "00:00";
  }

  return `${hour.toString().padStart(2, "0")}:00`;
}
