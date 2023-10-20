export function className(...args: (string | undefined)[]): string {
  let style = "";
  args.forEach((item) => {
    style += " " + item;
  });
  return style;
}
