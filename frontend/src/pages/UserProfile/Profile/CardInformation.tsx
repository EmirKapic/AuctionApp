import Input from "components/Common/Input";
import sectionHeader from "./sectionHeader";
import Icon from "svgs/Icon";

export interface CardInformationProps {
  active?: boolean;
  setActive: () => void;
}

export default function CardInformation(props: CardInformationProps) {
  return (
    <div className="border border-silver">
      {sectionHeader(
        <div className="flex gap-5 cursor-pointer" onClick={props.setActive}>
          <Icon name="chevronDown" /> Card information (Optional)
        </div>,
      )}
      {props.active && (
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
