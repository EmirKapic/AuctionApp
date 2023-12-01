import DatePicker from "react-datepicker";
import Icon from "svgs/Icon";

export interface DatePickerProps {
  placeholderText?: string;
  date?: Date;
  onChange: (newDate: Date | null) => void;
  showIcon?: boolean;
  className?: string;
}

export default function DatePick(props: DatePickerProps) {
  return (
    <DatePicker
      placeholderText={props.placeholderText}
      showIcon={props.showIcon}
      icon={<Icon name="calendar" />}
      onChange={(date) => props.onChange(date)}
      selected={props.date}
      className=""
    />
  );
}
