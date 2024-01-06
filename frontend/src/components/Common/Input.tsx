import { HTMLInputTypeAttribute } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { className } from "services/ClassName";

export interface InputProps {
  id: string;
  validationOptions?: RegisterOptions<FieldValues, string>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export default function Input(props: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2 text-grey_ tracking-wide">
      {props.label && (
        <label className="text-lg" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      <input
        id={props.id}
        placeholder={props.placeholder}
        type={props.type}
        className={className(
          "border border-silver border-opacity-50 indent-3 py-3",
          props.disabled
            ? "bg-lightgrey-200 bg-opacity-20 text-lightgrey-200"
            : "bg-lightgrey-50",
          props.className,
        )}
        {...register(props.id, props.validationOptions)}
        disabled={props.disabled}
      />
      {errors[props.id] && (
        <div className="text-red-500">
          {errors[props.id]?.message?.toString()}
        </div>
      )}
    </div>
  );
}
