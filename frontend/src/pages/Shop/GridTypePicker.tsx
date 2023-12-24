import { ReactNode } from "react";
import { className } from "services/ClassName";
import Icon from "svgs/Icon";

export type GridType = "grid" | "list";

export interface GridTypePickerProps {
  active: GridType;
  onTypeChange: (type: GridType) => void;
}

function gridType(
  children: ReactNode,
  active: boolean,
  onTypeChange: () => void,
): ReactNode {
  return (
    <button
      className={className(
        "px-7 h-full py-2",
        active ? "bg-purple text-white" : "w",
      )}
      onClick={onTypeChange}
    >
      {children}
    </button>
  );
}

export default function GridTypePicker(props: GridTypePickerProps) {
  return (
    <div className="flex border items-center">
      {gridType(
        <div className="flex gap-1">
          <Icon name="grid" />
          Grid
        </div>,
        props.active === "grid",
        () => props.onTypeChange("grid"),
      )}
      {gridType(
        <div className="flex gap-1">
          <Icon name="list" />
          List
        </div>,
        props.active === "list",
        () => props.onTypeChange("list"),
      )}
    </div>
  );
}
