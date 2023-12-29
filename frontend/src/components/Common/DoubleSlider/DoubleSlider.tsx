import { useRef } from "react";
import "./styles.css";

export interface DoubleSliderProps {
  max?: number;
  min?: number;
  totalMax: number;
  totalMin: number;
  setMax: (newMax: number) => void;
  setMin: (newMin: number) => void;
}

export default function DoubleSlider(props: DoubleSliderProps) {
  const fromRef = useRef<HTMLInputElement | null>(null);
  const toRef = useRef<HTMLInputElement | null>(null);

  function slideMin(): void {
    const gap =
      parseInt(toRef.current!.value) - parseInt(fromRef.current!.value);
    if (gap <= 0) props.setMin(parseInt(toRef.current!.value));
    else props.setMin(parseInt(fromRef.current!.value));
  }

  function slideMax(): void {
    const gap =
      parseInt(toRef.current!.value) - parseInt(fromRef.current!.value);

    if (gap <= 0) props.setMax(parseInt(fromRef.current!.value));
    else props.setMax(parseInt(toRef.current!.value));
  }

  return (
    <div className="flex justify-between text-2xl relative">
      <input
        id="fromSlider"
        type="range"
        min={props.totalMin}
        max={props.totalMax}
        value={props.min || 0}
        ref={fromRef}
        onChange={() => slideMin()}
      />
      <input
        id="toSlider"
        type="range"
        min={props.totalMin}
        max={props.totalMax}
        value={props.max || props.totalMax}
        ref={toRef}
        onChange={() => slideMax()}
      />
    </div>
  );
}
