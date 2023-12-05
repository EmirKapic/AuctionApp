import { PropsWithChildren } from "react";
import { className } from "services/ClassName";

export interface TableProps {
  className?: string;
}

export default function Table(props: PropsWithChildren<TableProps>) {
  return (
    <div className="w-full">
      <table className={className("w-full", props.className)}>
        {props.children}
      </table>
    </div>
  );
}
