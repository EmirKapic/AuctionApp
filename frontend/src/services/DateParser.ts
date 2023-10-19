export function getNormalized(dateString: string): Date {
  return new Date(dateString.split("T")[0]);
}
