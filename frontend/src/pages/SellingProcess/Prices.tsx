import Input from "components/Common/Input";
import DatePicker from "react-datepicker";
import { nonNegativeNumberOptions } from "services/UseFormValidators";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFormContext } from "react-hook-form";

export interface PricesProps {
  startPriceId: string;
  startDateId: string;
  endDateId: string;
}

export default function Prices(props: PricesProps) {
  const { control, getValues } = useFormContext();
  return (
    <div className="flex flex-col gap-5">
      <Input
        id={props.startPriceId}
        type="number"
        validationOptions={nonNegativeNumberOptions()}
        label="Your start price"
        placeholder="$53.00"
      />

      <div className="text-lg flex gap-10">
        <div className="w-1/2 flex flex-col">
          <label
            htmlFor={props.startDateId}
            className="cursor-pointer flex flex-col"
          >
            Start date
            <Controller
              name={props.startDateId}
              control={control}
              rules={{
                required: { value: true, message: "Please pick a start date" },
              }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  id={props.startDateId}
                  selected={value}
                  onChange={onChange}
                  placeholderText="12/12/2024"
                  className="border border-silver py-2 px-5 cursor-pointer"
                  minDate={new Date()}
                />
              )}
            />
          </label>
        </div>
        <div className="w-1/2 flex flex-col">
          <label
            htmlFor={props.endDateId}
            className="cursor-pointer flex flex-col"
          >
            End date
            <Controller
              name={props.endDateId}
              control={control}
              rules={{
                required: { value: true, message: "Please pick an end date" },
              }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  id={props.endDateId}
                  selected={value}
                  onChange={onChange}
                  placeholderText="12/12/2024"
                  className="border border-silver py-2 px-5 cursor-pointer"
                  minDate={new Date(getValues(props.startDateId))}
                />
              )}
            />
          </label>
        </div>
      </div>
      <p className="text-lightgrey-200 text-sm">
        The auction will be automatically closed when the end date comes.
        <br /> The highest bid will win the auction.
      </p>
    </div>
  );
}
