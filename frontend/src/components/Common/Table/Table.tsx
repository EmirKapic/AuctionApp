import { ReactNode } from "react";

export type Header = {
  name: string;
  className?: string;
};

export type Row = {
  dataCells: ReactNode[];
  classNames: (string | undefined)[];
};

export interface TableProps {
  headers?: Header[];
  content?: Row[];
  rowClassName?: string;
  emptyContentAlternative?: ReactNode;
}

export default function Table(props: TableProps) {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className={props.rowClassName}>
          {props.headers?.map((head) => (
            <th className={head.className}>{head.name}</th>
          ))}
        </thead>
        <tbody>
          {props.content?.length === 0
            ? props.emptyContentAlternative
            : props.content?.map((row, index) => (
                <tr className={props.rowClassName} key={index}>
                  {row.dataCells.map((cell, indexc) => (
                    <td className={row.classNames[indexc]} key={indexc}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
