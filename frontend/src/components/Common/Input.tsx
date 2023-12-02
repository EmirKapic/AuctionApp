import { HTMLInputTypeAttribute } from "react";
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

export interface InputProps {
  id: string;
  validationOptions?: RegisterOptions<FieldValues, string>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  multiline?: boolean;
  rows?: number;
  cols?: number;
  maxLength?: number;
}

/*
  We search the errors object for any key that matches the id of our input
  If found, our input has a mistake, and the appropriate message is shown
*/
function isInputInvalid(
  errors: FieldErrors<FieldValues>,
  name: string,
): boolean {
  return Object.keys(errors).some((key) => key.includes(name));
}

export default function Input(props: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2 text-grey_ tracking-wide">
      {/* maybe without the conditional render?*/}
      {props.label && (
        <label className="text-lg" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      {props.multiline ? (
        <textarea
          id={props.id}
          placeholder={props.placeholder}
          className="border border-silver py-1 px-3"
          maxLength={props.maxLength}
          rows={props.rows}
          cols={props.cols}
          {...register(props.id, props.validationOptions)}
        />
      ) : (
        <input
          id={props.id}
          placeholder={props.placeholder}
          type={props.type}
          className="border border-silver border-opacity-50 bg-lightgrey-50 indent-3 py-3"
          {...register(props.id, props.validationOptions)}
        />
      )}
      {isInputInvalid(errors, props.id) && (
        <div className="text-red-500">
          {errors[props.id]?.message?.toString()}
        </div>
      )}
    </div>
  );
}
