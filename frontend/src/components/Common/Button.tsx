import { MouseEventHandler, PropsWithChildren } from "react";
import { className } from "services/ClassName";

type ButtonType = "primary" | "secondary" | "primary-filled";

export interface ButtonProps {
  type: ButtonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const buttonClassName: Record<ButtonType, string> = {
  primary:
    "border-2 border-purple flex gap-2 items-center justify-center duration-300 hover:bg-purple hover:text-white shadow-purple-md",
  secondary: "...",
  "primary-filled":
    "flex gap-2 items-center justify-center bg-purple text-white",
};

export default function Button(props: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={className(buttonClassName[props.type], props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
