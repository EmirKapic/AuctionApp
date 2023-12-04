export default function comparator<T>(first: T, second: T): number {
  if (first < second) return -1;
  else if (first > second) return 1;
  else return 0;
}
