import Input from "components/Common/Input";
import DatePicker from "react-datepicker";
import { nonNegativeNumberOptions } from "services/UseFormValidators";
import "react-datepicker/dist/react-datepicker.css";

export type PricesFields = {
  startPriceId: string;
  startDateId: string;
  endDateId: string;
  startDate: Date | null;
  endDate: Date | null;
  datesWarningText?: string;
};

export type PricesProps = PricesFields & {
  updateFields: (fields: Partial<PricesFields>) => void;
};

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
              selected={props.startDate}
              onChange={(date) => props.updateFields({ startDate: date })}
              placeholderText="23/12/2024"
              className="border border-silver py-2 px-5 cursor-pointer"
              minDate={new Date()}
              maxDate={props.endDate}
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
              selected={props.endDate}
              onChange={(date) => props.updateFields({ endDate: date })}
              placeholderText="23/12/2024"
              className="border border-silver py-2 px-5 cursor-pointer"
              minDate={props.startDate}
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
