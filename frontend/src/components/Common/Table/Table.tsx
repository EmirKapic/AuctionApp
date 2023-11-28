import { ReactNode } from "react";

export interface TableProps {
  headers?: ReactNode;
  content?: ReactNode;
  rowClassName?: string;
  headerClassName?: string;
}

export default function Table(props: TableProps) {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className={props.headerClassName + " " + props.rowClassName}>
          {props.headers}
        </thead>
        <tbody>{props.content}</tbody>
      </table>
    </div>
  );
}
