import { ReactNode } from "react";
import { className } from "services/ClassName";
import Icon from "svgs/Icon";

export type GridType = "grid" | "list";

export interface GridTypePickerProps {
  gridType: GridType;
  onTypeChange: (type: GridType) => void;
}

function renderGridTypeButton(
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
      {renderGridTypeButton(
        <div className="flex gap-1">
          <Icon name="grid" />
          Grid
        </div>,
        props.gridType === "grid",
        () => props.onTypeChange("grid"),
      )}
      {renderGridTypeButton(
        <div className="flex gap-1">
          <Icon name="list" />
          List
        </div>,
        props.gridType === "list",
        () => props.onTypeChange("list"),
      )}
    </div>
  );
}
