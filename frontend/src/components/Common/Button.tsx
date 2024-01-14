import { MouseEventHandler, PropsWithChildren } from "react";
import { className } from "services/ClassName";

type ButtonType = "primary" | "primary-filled" | "secondary";

export interface ButtonProps {
  type: ButtonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  formButtonType?: "submit" | "reset" | "button";
  disabled?: boolean;
}

const buttonClassName: Record<ButtonType, string> = {
  primary:
    "border-2 border-purple flex gap-2 items-center justify-center duration-300 hover:bg-purple hover:text-white shadow-purple-md",
  "primary-filled":
    "flex gap-2 items-center justify-center bg-purple text-white",
  secondary:
    "border-2 border-silver flex gap-2 items-center justify-center hover:bg-lightgrey-200 hover:bg-opacity-40 duration-300",
};

export default function Button(props: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={className(buttonClassName[props.type], props.className)}
      onClick={props.onClick}
      type={props.formButtonType}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
