import { HTMLInputTypeAttribute } from "react";

export interface InputProps {
  value: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  label?: string;
  warningMessage?: string;
}

export default function Input(props: InputProps) {
  return (
    <div className="flex flex-col gap-2 text-grey_ tracking-wide">
      {props.label && <label className="text-lg">{props.label}</label>}
      <input
        placeholder={props.placeholder}
        type={props.type || "text"}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        className={
          "border border-silver border-opacity-50 bg-lightgrey-50 indent-3 py-3"
        }
      ></input>
      {props.warningMessage && (
        <div className="text-red-400">{props.warningMessage}</div>
      )}
    </div>
  );
}
