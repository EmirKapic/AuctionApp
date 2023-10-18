import Icon from "svgs/Icon";

export interface PurpleButtonProps {
  text: string;
  className: string;
  onClick: () => void;
}

export default function PurpleButton(props: PurpleButtonProps) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.text}
      <Icon name="chevronRight" />
    </button>
  );
}
