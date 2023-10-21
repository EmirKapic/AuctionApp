export function className(...args: (string | undefined)[]): string {
  let style = "";
  args.forEach((item) => {
    if (item) {
      style += " " + item;
    }
  });
  return style;
}
