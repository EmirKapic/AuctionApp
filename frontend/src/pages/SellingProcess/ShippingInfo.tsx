import Input from "components/Common/Input";
import {
  emailValidationOptions,
  phoneNumberValidationOptions,
  requiredFieldsOptions,
} from "services/UseFormValidators";

export interface ShippingInfoProps {
  addressId: string;
  cityId: string;
  zipId: string;
  countryId: string;
  phoneId: string;
}

export default function ShippingInfo(props: ShippingInfoProps) {
  return (
    <div className="flex flex-col gap-10">
      <Input
        id={props.addressId}
        label="Adress"
        type="text"
        validationOptions={requiredFieldsOptions("Please enter your adress")}
      />
      <div className="flex gap-5">
        <div className="flex-grow">
          <Input
            id={props.cityId}
            label="City"
            type="text"
            validationOptions={requiredFieldsOptions("Please enter your city")}
          />
        </div>
        <div className="flex-grow">
          <Input
            id={props.zipId}
            label="Zip Code"
            type="text"
            validationOptions={requiredFieldsOptions(
              "Please enter your zip code",
            )}
          />
        </div>
      </div>
      <Input
        id={props.countryId}
        label="Country"
        type="text"
        validationOptions={requiredFieldsOptions("Please enter your country")}
      />
      <Input
        id={props.phoneId}
        label="Phone Number"
        type="tel"
        validationOptions={phoneNumberValidationOptions()}
      />
    </div>
  );
}
