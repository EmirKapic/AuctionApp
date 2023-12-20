import Button from "components/Common/Button";
import { FormProvider, useForm } from "react-hook-form";

import PersonalInformation from "./PersonalInformation";
import DateUtility from "services/DateUtility";
import CardInformation from "./CardInformation";
import { useState } from "react";

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
  creditCart: string;
};

export default function Profile() {
  const methods = useForm<FormValues>({
    defaultValues: {
      email: "testmail@mail.ba",
    },
  });
  const [isCardInfoOpen, setIsCardInfoOpen] = useState(false);

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
          <PersonalInformation />
          <CardInformation
            active={isCardInfoOpen}
            setActive={() => setIsCardInfoOpen(!isCardInfoOpen)}
          />
          <Button type="primary" formButtonType="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
