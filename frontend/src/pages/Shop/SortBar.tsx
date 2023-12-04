import SortType from "./SortType";
import Select from "react-select";

export interface SortBarProps {
  sort: SortType;
  onChange: (newSort: SortType) => void;
  className?: string;
}

export default function SortBar(props: SortBarProps) {
  return (
    <div>
      <Select
        options={Object.values(SortType).map((type) => {
          return { value: type, label: type };
        })}
        value={{ value: props.sort, label: props.sort }}
        onChange={(selected) => props.onChange(selected!.value)}
        className={props.className}
        styles={{
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? "#8367D8" : "",
            color: state.isFocused ? "white" : "",
          }),
        }}
      />
    </div>
  );
}
