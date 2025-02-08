import { colors } from "constants/colors";
import { TrackDetails, useKeenSlider } from "keen-slider/react.js";
import { CSSProperties, memo, useEffect, useRef, useState } from "react";
import { Txt } from "../Txt";

const DEFAULT_DIAL_DEGREE = 18;

type Perspective = "right" | "left" | "center";

interface Props {
  /** 슬라이드 항목에 보여줄 값을 포맷합니다. */
  formatValue?: (value: number) => string;
  /**
   * 시작 인덱스
   * @default 0
   */
  initialIndex?: number;
  /** 슬라이드 옵션 */
  options: number[];
  /**
   * 슬라이드의 마지막 항목에 다다랐을 때 루프 반복 여부
   * @default false
   */
  loop?: boolean;
  /** 값을 슬라이드할 때 실행될 콜백 함수 */
  onChange(value: number): void;
  /**
   * 원근 설정
   * @default 'center'
   */
  perspective?: Perspective;
  /** 슬라이드에 사용할 값을 설정합니다. */
  setValue?(index: number): number;
  /**
   * 다이얼 하나당 회전 각도. 다이얼 개수 x 다이얼 하나당 회전 각도 = 360
   * @default 18
   */
  dialDegree?: number;
}

export const Wheel = memo(function Wheel({
  formatValue,
  initialIndex = 0,
  options = [],
  loop = false,
  onChange,
  perspective = "center",
  dialDegree = DEFAULT_DIAL_DEGREE,
}: Props) {
  const slidesPerView = loop ? 9 : 1;

  const [sliderState, setSliderState] = useState<TrackDetails | null>(null);

  const size = useRef(0);

  const [sliderRef, slider] = useKeenSlider({
    slides: {
      number: options.length,
      origin: loop ? "center" : "auto",
      perView: slidesPerView,
    },
    vertical: true,
    initial: initialIndex,
    loop,
    dragSpeed: (value) => {
      const height = size.current;

      return (
        value *
        (height /
          ((height / 2) * Math.tan(dialDegree * (Math.PI / 180))) /
          slidesPerView)
      );
    },
    created: (s) => {
      size.current = s.size;
    },
    updated: (s) => {
      size.current = s.size;
    },
    detailsChanged: (s) => {
      setSliderState(s.track.details);
    },
    rubberband: !loop,
    mode: "free-snap",
    slideChanged: (slider) => {
      const { abs, rel } = slider.track.details;
      if (Number.isNaN(abs)) {
        slider.destroy();
        return;
      }
      onChange(options[rel]!);
    },
  });

  const [radius, setRadius] = useState(0);

  useEffect(() => {
    if (slider.current != null) {
      setRadius(slider.current.size / 2);
    }
  }, [slider]);

  function getSlideValues() {
    if (!sliderState) {
      return [];
    }

    const offset = loop ? 1 / 2 - 1 / slidesPerView / 2 : 0;

    const values = options.map((option, index) => {
      const distance =
        sliderState.slides[index] != null
          ? (sliderState.slides[index]!.distance - offset) * slidesPerView
          : 0;
      const rotate =
        Math.abs(distance) > 360 / dialDegree / 2
          ? 180
          : distance * dialDegree * -1;
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        color: rotate === 0 ? 'black' : colors.grey900
      };
      const value = option;

      return { value, style };
    });

    return values;
  }

  return (
    <div
      css={{
        width: `calc(100% + 12px)`,
        display: "flex",
        flexWrap: "wrap",
        overflow: "visible",
        position: "relative",
        userSelect: "none",
        touchAction: "pan-y",
        color: colors.grey900,
        height: "100%",
        transform: "translate3d(0, 0, 0)",
        "&[data-keen-slider-moves] *": {
          pointerEvents: "none",
        },
      }}
      ref={sliderRef}
    >
      <div
        css={{
          position: "relative",
          top: 0,
          left: "-8px",
          zIndex: 10,
          height: "42%",
          width: "100%",
          transform: "translate3d(0, 0, 180px)",
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 100%)",
        }}
      />
      <div
        css={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          height: "16%",
          width: "100%",
          padding: "0 6px",
          ...PERSPECTIVE_STYLE[perspective],
        }}
      >
        {getSlideValues().map(({ value, style }) => (
          <Txt
            key={value}
            style={style}
            size="large"
            color={colors.grey900}
            css={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
            }}
          >
            {formatValue?.(value) ?? value}
          </Txt>
        ))}
      </div>
      <div
        css={{
          position: "relative",
          top: 0,
          left: "-8px",
          zIndex: 10,
          height: "42%",
          width: "100%",
          transform: "translate3d(0, 0, 180px)",
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.9) 100%)",
          marginTop: "2px",
        }}
      />
    </div>
  );
});

const PERSPECTIVE_STYLE: Record<Perspective, CSSProperties> = {
  left: {
    perspectiveOrigin: "calc(50% - 100px) 50%",
    transform: "translateX(-10px)",
  },
  right: {
    perspectiveOrigin: "calc(50% + 100px) 50%",
    transform: "translateX(10px)",
  },
  center: {},
};
