export interface CheckboxProps {
  label: string;
  id: string;
  onChange: (active: boolean) => void;
  checked?: boolean;
  labelClassName?: string;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <div className="flex gap-3">
      <input
        id={props.id}
        type="checkbox"
        onChange={(e) => props.onChange(e.target.checked)}
        checked={props.checked}
      />
      <label htmlFor={props.id} className={props.labelClassName}>
        {[props.label]}
      </label>
    </div>
  );
}
