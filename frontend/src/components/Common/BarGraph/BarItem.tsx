import Colors from "services/Colors";

export interface BarItemProps {
  height: number;
  color?: string;
}

export default function BarItem(props: BarItemProps) {
  return (
    <div
      style={{
        height: props.height,
        backgroundColor: props.color || Colors.LIGHTGREY,
      }}
    ></div>
  );
}
