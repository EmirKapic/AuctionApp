import { className } from "services/ClassName";
import BarItem from "./BarItem";
import { ReactNode } from "react";

export type Bar = {
  index: number;
  size: number;
};

export interface BarGraphProps {
  data: Array<Bar>;
  height: number;
  numberOfBars?: number;
  className?: string;
  barColor?: string;
}

/*
x0 = 0, y0 = 0
x1 = maxHeightReal, y1 = maxHeightPixels

y = y1 / x1 * input

*/

function getHeightInPixels(
  maxHeightReal: number,
  maxHeightInPixels: number,
  size: number,
): number {
  return (maxHeightInPixels / maxHeightReal) * size;
}

export default function BarGraph(props: BarGraphProps) {
  const maxHeight = Math.max(...props.data.map((data) => data.size)); //the most js-like line of code ever written :D
  const completeBars: Array<ReactNode> = [];
  for (let i = 0; i < (props.numberOfBars ? props.numberOfBars + 1 : 21); i++) {
    const dataPoint = props.data.find((data) => data.index === i);
    if (dataPoint)
      completeBars.push(
        <BarItem
          key={dataPoint.index}
          height={getHeightInPixels(maxHeight, props.height, dataPoint.size)}
          color={props.barColor}
        />,
      );
    else completeBars.push(<BarItem height={0} />);
  }

  console.log(completeBars);
  return (
    <div
      className={className(props.className)}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${
          props.numberOfBars ? props.numberOfBars + 1 : 21
        }, 1fr)`,
        alignItems: "end",
      }}
    >
      {completeBars}
    </div>
  );
}
