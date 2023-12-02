import Input from "components/Common/Input";
import DatePicker from "react-datepicker";
import { nonNegativeNumberOptions } from "services/UseFormValidators";
import "react-datepicker/dist/react-datepicker.css";

export type DateState = { date?: Date; onChange: (newDate: Date) => void };

export interface PricesProps {
  startPriceId: string;
  startDateId: string;
  endDateId: string;
  startDate: DateState;
  endDate: DateState;
  datesWarningText?: string;
}

export default function Prices(props: PricesProps) {
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
            <DatePicker
              id={props.startDateId}
              selected={props.startDate.date}
              onChange={props.startDate.onChange}
              placeholderText="12/12/2024"
              className="border border-silver py-2 px-5 cursor-pointer"
              minDate={new Date()}
            />
          </label>
        </div>
        <div className="w-1/2 flex flex-col">
          <label
            htmlFor={props.endDateId}
            className="cursor-pointer flex flex-col"
          >
            End date
            <DatePicker
              id={props.endDateId}
              selected={props.endDate.date}
              onChange={props.endDate.onChange}
              placeholderText="12/12/2024"
              className="border border-silver py-2 px-5 cursor-pointer"
              minDate={props.startDate.date}
            />
          </label>
        </div>
      </div>
      <div className="text-red-500">{props.datesWarningText}</div>
      <p className="text-lightgrey-200 text-sm">
        The auction will be automatically closed when the end date comes.
        <br /> The highest bid will win the auction.
      </p>
    </div>
  );
}
