import Input from "components/Common/Input";
import { requiredFieldsOptions } from "services/UseFormValidators";

export interface InputIds {
  titleId: string;
}

export default function ItemInfo(props: InputIds) {
  return (
    <div>
      <Input
        id={props.titleId}
        label="What do you sell?"
        type="text"
        validationOptions={requiredFieldsOptions("You must enter a name")}
      />
    </div>
  );
}
