import Button from "components/Common/Button";
import { FormProvider, useForm } from "react-hook-form";

import PersonalInformation from "./PersonalInformation";
import DateUtility from "services/DateUtility";
import CardInformation from "./CardInformation";
import ShippingAddress from "./ShippingAddress";
import { useContext } from "react";
import { UserContext } from "contexts/UserContext";
import post from "services/fetching/Post";
import User from "models/User";
import UrlBuilder from "services/UrlBuilder";

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

type UpdateRequest = FormValues & {
  dateOfBirth: string;
};

function getBirthDate(date?: string): Date | undefined {
  if (!date) return;
  return new Date(date);
}

export interface ProfileProps {
  updateUserContext: (updatedUser: User) => void;
}

export default function Profile(props: ProfileProps) {
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
    }
    const birthDate = new Date(
      data.dateOfBirthYear,
      data.dateOfBirthMonth.value,
      data.dateOfBirthDay,
      new Date().getUTCHours(),
    );
    post<User, UpdateRequest>(new UrlBuilder().user().url, {
      ...data,
      dateOfBirth: birthDate.toISOString(),
    }).then((user) => props.updateUserContext(user.data));
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
          <Button
            type="primary"
            formButtonType="submit"
            className="w-fit ml-auto py-2 px-10 uppercase font-bold"
          >
            Save changes
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
