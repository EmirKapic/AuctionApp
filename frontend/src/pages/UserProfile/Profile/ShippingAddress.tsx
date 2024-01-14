import Icon from "svgs/Icon";
import sectionHeader from "./sectionHeader";
import Input from "components/Common/Input";
import { useState } from "react";

export default function ShippingAddress() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-silver">
      {sectionHeader(
        <div
          className="flex gap-5 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon name="chevronDown" /> Shipping Address (Optional)
        </div>,
      )}
      {isOpen && (
        <div className="py-5 px-8 w-1/2 flex flex-col gap-5">
          <Input type="text" label="Address" id="address" />
          <Input type="text" label="City" id="city" />
          <Input type="text" label="Zip Code" id="zip" />
          <Input type="text" label="Country" id="country" />
        </div>
      )}
    </div>
  );
}
