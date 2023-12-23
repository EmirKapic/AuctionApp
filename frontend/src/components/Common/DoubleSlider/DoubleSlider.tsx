export interface DoubleSliderProps {
  max: number;
  min: number;
}

export default function DoubleSlider(props: DoubleSliderProps) {
  return (
    <div className="relative h-10">
      <div className="w-full h-2 bg-purple m-auto absolute top-0 bottom-0"></div>
      <input
        type="range"
        max={props.max}
        min={props.min}
        onChange={(e) => console.log(e.target.value)}
        className="appearance-none w-full outline-none absolute m-auto top-0 z-10 bottom-0 bg-transparent [&>&]::-webkit"
      />

      <input
        type="range"
        max={props.max}
        min={props.min}
        onChange={(e) => console.log(e.target.value)}
        className="appearance-none w-full outline-none absolute m-auto top-0 z-10 bottom-0 bg-transparent pointer-events-none"
      />
    </div>
  );
}
