import { useState } from "react";
import Icon from "svgs/Icon";

export interface SelectProps {
  items: string[];
  onChange: (selectedItem: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function Select(props: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.placeholder);
  const options = props.items.map((item) => (
    <li
      className="py-2 hover:text-purple cursor-pointer hover:bg-lightgrey-200 hover:bg-opacity-20 indent-5"
      key={item}
      onClick={() => {
        setSelectedOption(item);
        setIsOpen(false);
        props.onChange(item);
      }}
    >
      {item}
    </li>
  ));
  return (
    <div className="flex-grow flex flex-col relative">
      <button
        className={
          "border border-silver mt-5 py-2 px-5 " +
          (props.disabled ? "opacity-30" : "")
        }
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        disabled={props.disabled}
      >
        <div className="flex justify-between items-center">
          {selectedOption}
          <div className={"duration-300" + (isOpen ? " rotate-180" : "")}>
            <Icon name="chevronDown" />
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="border border-silver mt-3">
          <ul>{options}</ul>
        </div>
      )}
    </div>
  );
}
