import { PropsWithChildren, ReactNode } from "react";

export interface TaskBarProps {
  elements: ReactNode[];
  activeIndex: number;
  elementsClassName?: string;
  barClassName?: string;
}

export default function TaskBar(props: PropsWithChildren<TaskBarProps>) {
  return (
    <div>
      <div className={props.barClassName}>{props.children}</div>
      <div className={props.elementsClassName}>
        {props.elements[props.activeIndex]}
      </div>
    </div>
  );
}
