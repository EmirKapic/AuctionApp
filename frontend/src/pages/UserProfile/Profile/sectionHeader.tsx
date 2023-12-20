import { ReactNode } from "react";

export default function seactionHeader(body: ReactNode): ReactNode {
  return (
    <h4 className="border bg-lightgrey-200 bg-opacity-10 py-3 px-8">{body}</h4>
  );
}
