import { Wheel } from "./Wheel";

interface Props {
  onChange: (time: number) => void;
  initialValue?: number;
}

export function WheelTimePicker({ onChange, initialValue }: Props) {
  return (
    <div
      onTouchMove={(e) => {
        e.stopPropagation();
      }}
      css={{
        display: "flex",
        height: "195px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        css={{
          display: "flex",
          width: "100%",
          height: "230px",
          background: "none",
        }}
      >
        <Wheel
          options={range(0, 24)}
          initialIndex={initialValue}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
