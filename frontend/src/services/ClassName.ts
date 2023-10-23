export function className(...args: (string | undefined)[]): string {
  return args.reduce((prev, curr) => prev + " " + curr, "") || " ";
}
