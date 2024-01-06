import Input from "components/Common/Input";
import sectionHeader from "./sectionHeader";
import Icon from "svgs/Icon";
import { useState } from "react";

export default function CardInformation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-silver">
      {sectionHeader(
        <div
          className="flex gap-5 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon name="chevronDown" /> Card information (Optional)
        </div>,
      )}
      {isOpen && (
        <div className="py-5 px-8">
          <Input
            type="text"
            id="creditCard"
            label="Credit card number"
            className="w-1/2"
          />
        </div>
      )}
    </div>
  );
}
