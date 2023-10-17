import Icon from "svgs/Icon";

export interface PurpleButtonProps {
  text: string;
  paddingX: number;
  paddingY: number;
  onClick: () => void;
}

export default function PurpleButton(props: PurpleButtonProps) {
  return (
    <button
      className={`border-2 border-purple px-${props.paddingX} py-${props.paddingY}  flex gap-2 items-center duration-300 text-center hover:bg-purple hover:text-white shadow-purple-md`}
      onClick={props.onClick}
    >
      {props.text}
      <Icon name="chevronRight" />
    </button>
  );
}
