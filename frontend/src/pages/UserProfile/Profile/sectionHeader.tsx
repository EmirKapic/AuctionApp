import { ReactNode } from "react";

export default function seactionHeader(title: string): ReactNode {
  return (
    <h4 className="border bg-lightgrey-200 bg-opacity-10 py-3 px-8">{title}</h4>
  );
}
