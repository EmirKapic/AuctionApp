import Button from "components/Common/Button";
import { FormProvider, useForm } from "react-hook-form";

import PersonalInformation from "./PersonalInformation";
import DateUtility from "services/DateUtility";
import CardInformation from "./CardInformation";
import ShippingAddress from "./ShippingAddress";
import { useContext } from "react";
import { UserContext } from "contexts/UserContext";

export type SelectionOption<Value, Label> = {
  value: Value;
  label: Label;
};

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirthDay: number;
  dateOfBirthMonth: SelectionOption<number, string>;
  dateOfBirthYear: number;
  phoneNumber: string;
  creditCard: string;
  address: string;
  city: string;
  zip: string;
  country: string;
};

function getBirthDate(date?: string): Date | undefined {
  if (!date) return;
  return new Date(date);
}

export default function Profile() {
  const userContext = useContext(UserContext);
  const dateOfBirth = getBirthDate(userContext?.dateOfBirth);
  const methods = useForm<FormValues>({
    defaultValues: {
      firstName: userContext?.firstName,
      lastName: userContext?.lastName,
      email: userContext?.email,
      dateOfBirthDay: dateOfBirth?.getDate(),
      dateOfBirthMonth: { value: dateOfBirth?.getMonth() },
      dateOfBirthYear: dateOfBirth?.getFullYear(),
      creditCard: userContext?.creditCard,
      address: userContext?.address,
      phoneNumber: userContext?.phoneNumber,
      city: userContext?.city,
      zip: userContext?.zipCode,
      country: userContext?.country,
    },
  });
  function validateDateOfBirth(
    day: number,
    month: number,
    year: number,
  ): boolean {
    return day <= DateUtility.getMaxDayForMonth(month, year)! && day > 0;
  }

  function handleFormSubmit(
    data: FormValues,
    e?: React.BaseSyntheticEvent,
  ): void {
    console.log(data.dateOfBirthMonth);
    if (
      !validateDateOfBirth(
        data.dateOfBirthDay,
        data.dateOfBirthMonth.value,
        data.dateOfBirthYear,
      )
    ) {
      e?.stopPropagation();
      methods.setError("dateOfBirthDay", {
        type: "custom",
        message: "Invalid day",
      });
      return;
    } else {
      console.log(data);
    }
  }

  return (
    <div className="pb-5">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data, e) =>
            handleFormSubmit(data, e),
          )}
          className="flex flex-col gap-10"
        >
          <PersonalInformation monthOfBirth={dateOfBirth?.getMonth()} />
          <CardInformation />
          <ShippingAddress />
          <Button type="primary" formButtonType="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
