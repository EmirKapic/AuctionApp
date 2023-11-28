import { PropsWithChildren, ReactNode } from "react";

interface TaskBarItemProps {
  active?: boolean;
  onClick: () => void;
}

export default function TaskBarItem(
  props: PropsWithChildren<TaskBarItemProps>,
) {
  const className = props.active
    ? "bg-purple text-white"
    : "text-black bg-lightgrey-200 bg-opacity-20 hover:bg-opacity-60";
  return (
    <button
      onClick={(e) => props.onClick()}
      className={
        "flex gap-1 justify-center py-2 min-w-[100px] duration-200 " + className
      }
    >
      {props.children}
    </button>
  );
}
