import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

export interface TextAreaProps {
  id: string;
  validationOptions?: RegisterOptions<FieldValues, string>;
  placeholder?: string;
  label?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
}

export default function TextArea(props: TextAreaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2 text-grey_ tracking-wide">
      <label className="text-lg" htmlFor={props.id}>
        {props.label}
      </label>
      <textarea
        id={props.id}
        placeholder={props.placeholder}
        className="border border-silver py-1 px-3"
        maxLength={props.maxLength}
        rows={props.rows}
        cols={props.cols}
        {...register(props.id, props.validationOptions)}
      />
      {errors[props.id] && (
        <div className="text-red-500">
          {errors[props.id]?.message?.toString()}
        </div>
      )}
    </div>
  );
}
