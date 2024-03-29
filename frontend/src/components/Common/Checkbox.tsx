import { PropsWithChildren } from "react";

export interface CheckboxProps {
  id: string;
  onChange?: (active: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Checkbox(props: PropsWithChildren<CheckboxProps>) {
  return (
    <div className="flex gap-3">
      <input
        id={props.id}
        type="checkbox"
        onChange={(e) =>
          props.onChange ? props.onChange(e.target.checked) : {}
        }
        checked={props.checked}
        disabled={props.disabled}
        className={props.className}
      />
      <label htmlFor={props.id}>{props.children}</label>
    </div>
  );
}
