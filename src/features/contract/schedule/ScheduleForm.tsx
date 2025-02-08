import { useState } from "react";
import { MultiSelect } from "components/MultiSelect";
import { BottomSheet } from "components/BottomSheet";
import { WheelTimePicker } from "components/WheelTimePicker";
import { CheckboxCircle } from "components/Checkbox";
import { Txt } from "components/Txt";
import { colors } from "constants/colors";
import { DAYS_MAP } from "constants/dates";
import { formatHour } from "utils/formatHour";
import { FormSchedule } from "features/contract/schedule/FormSchedule";

interface ScheduleFormProps {
  isReadOnly?: boolean;
  schedule: FormSchedule;
  onChange: (schedule: FormSchedule) => void;
}

export function ScheduleForm({
  isReadOnly = false,
  schedule,
  onChange,
}: ScheduleFormProps) {
  const BREAK_TIME_DEFAULTS = {
    initialBreakStart: schedule.restTime?.startHour,
    initialBreakEnd: schedule.restTime?.endHour,
  };

  const [isOpenTimePicker, setIsOpenTimePicker] = useState<
    "workStart" | "workEnd" | "breakStart" | "breakEnd" | null
  >(null);

  const handleChange = (
    field: keyof FormSchedule,
    updater: (prev: any) => any
  ) => {
    if (isReadOnly) return;
    onChange({
      ...schedule,
      [field]: updater(schedule[field]), // ✅ 이전 상태를 기반으로 안전하게 업데이트
    });
  };

  const toggleDaySelection = (day: number) => {
    if (isReadOnly) return;

    handleChange(
      "workingDay",
      (prev: number[]) =>
        prev.includes(day)
          ? prev.filter((d) => d !== day) // ✅ 선택된 경우 제거
          : [...prev, day].sort((a, b) => a - b) // ✅ 추가 후 항상 오름차순 정렬
    );
  };

  const toggleNoBreak = () => {
    if (isReadOnly) return;
    if (schedule.noBreak) {
      handleChange("restTime", (prev: any) => ({
        startHour: BREAK_TIME_DEFAULTS.initialBreakStart,
        endHour: BREAK_TIME_DEFAULTS.initialBreakEnd,
      }));
    } else {
      handleChange("restTime", (prev: any) => null);
    }
    handleChange("noBreak", (prev: boolean) => !prev);
  };
  const validateSchedule = (schedule: FormSchedule) => {
    const errors: string[] = [];

    // 1. 근로일 선택 확인
    if (schedule.workingDay.length === 0) {
      errors.push("근로일은 하루 이상 선택해야 해요.");
    }

    // 2. 근로시간이 선택되었는지 확인
    if (
      schedule.workingTime.startHour === null ||
      schedule.workingTime.endHour === null
    ) {
      errors.push("근로 시작 시간과 종료 시간을 모두 선택해야 해요.");
    } else {
      // 3. 근로 종료 시각이 시작 시각 이후인지 확인
      if (schedule.workingTime.endHour <= schedule.workingTime.startHour) {
        errors.push("근로 종료 시각은 근로 시작 시각 후가 되어야 해요.");
      }
    }

    // 4. 휴게시간이 선택되었는지 확인
    if (schedule.restTime) {
      if (
        schedule.restTime.startHour === null ||
        schedule.restTime.endHour === null
      ) {
        errors.push("휴게 시작 시간과 종료 시간을 모두 선택해야 해요.");
      } else {
        // 5. 휴게 종료 시각이 시작 시각 이후인지 확인
        if (schedule.restTime.endHour <= schedule.restTime.startHour) {
          errors.push("휴게 종료 시각은 휴게 시작 시각 후가 되어야 해요.");
        }

        // 6. 휴게시간이 근로 시작~종료 사이에 있는지 확인
        if (
          schedule.restTime.startHour < schedule.workingTime.startHour! ||
          schedule.restTime.endHour > schedule.workingTime.endHour!
        ) {
          errors.push(
            "휴게시간은 근로 시작 시각 후, 근로 종료 시각 전이어야 해요."
          );
        }
      }
    }

    // 7. 근로시간 4시간당 휴게시간 1시간 보장 확인 (근로시간이 null이 아닐 때만 수행)
    if (
      schedule.workingTime.startHour !== null &&
      schedule.workingTime.endHour !== null
    ) {
      const workDuration =
        schedule.workingTime.endHour - schedule.workingTime.startHour;
      const breakDuration = schedule.restTime
        ? schedule.restTime.endHour - schedule.restTime.startHour
        : 0;
      if (workDuration >= 4 && breakDuration < Math.floor(workDuration / 4)) {
        errors.push("근로시간 4시간당 휴게시간 1시간이 보장되어야 해요.");
      }

      // 8. 총 근로시간 52시간 초과 방지
      const totalWorkHours =
        (workDuration - breakDuration) * schedule.workingDay.length;
      if (totalWorkHours > 52) {
        errors.push(
          "(근로시간 - 휴게시간) * 근로 일자는 52시간 이하여야 해요."
        );
      }
    }

    return errors;
  };
  return (
    <>
      <Txt
        css={{ padding: "36px 24px 8px", display: "block" }}
        size="large"
        fontWeight="bold"
      >
        근로일
      </Txt>

      {/* 근로일 선택 */}
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          padding: "0 24px",
          marginTop: "24px",
        }}
      >
        <MultiSelect>
          {DAYS_MAP.map((day, index) => (
            <MultiSelect.Option
              key={index}
              checked={schedule.workingDay.includes(index)}
              onClick={isReadOnly ? undefined : () => toggleDaySelection(index)}
            >
              {day}
            </MultiSelect.Option>
          ))}
        </MultiSelect>
      </div>

      {/* 근로시간 */}
      <div css={{ marginTop: "24px", marginLeft: "24px", marginRight: "24px" }}>
        <Txt size="small" color={colors.grey800} fontWeight="regular">
          근로시간
        </Txt>
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TimeTxtView
            timeString={
              schedule.workingTime.startHour
                ? formatHour(schedule.workingTime.startHour)
                : ""
            }
            disabled={isReadOnly}
            onClick={
              isReadOnly ? undefined : () => setIsOpenTimePicker("workStart")
            }
          />
          <Txt>~</Txt>
          <TimeTxtView
            timeString={
              schedule.workingTime.endHour
                ? formatHour(schedule.workingTime.endHour)
                : ""
            }
            disabled={isReadOnly}
            onClick={
              isReadOnly ? undefined : () => setIsOpenTimePicker("workEnd")
            }
          />
        </div>
      </div>

      {/* 휴게시간 */}
      <div css={{ marginTop: "24px", marginLeft: "24px", marginRight: "24px" }}>
        <Txt>휴게시간</Txt>
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TimeTxtView
            timeString={
              schedule.restTime?.startHour
                ? formatHour(schedule.restTime.startHour)
                : ""
            }
            disabled={isReadOnly || schedule.noBreak}
            onClick={
              isReadOnly ? undefined : () => setIsOpenTimePicker("breakStart")
            }
          />
          <Txt>~</Txt>
          <TimeTxtView
            timeString={
              schedule.restTime?.endHour
                ? formatHour(schedule.restTime.endHour)
                : ""
            }
            disabled={isReadOnly || schedule.noBreak}
            onClick={
              isReadOnly ? undefined : () => setIsOpenTimePicker("breakEnd")
            }
          />
        </div>
      </div>

      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "24px",
          marginLeft: "24px",
          marginRight: "24px",
        }}
      >
        <Txt>휴게시간 없음</Txt>
        <CheckboxCircle checked={schedule.noBreak} onClick={toggleNoBreak} />
      </div>

      {/* BottomSheet + WheelTimePicker */}
      <BottomSheet
        open={!!isOpenTimePicker}
        close={() => setIsOpenTimePicker(null)}
        header="시간 선택"
      >
        <WheelTimePicker
          onChange={(value) => {
            if (isOpenTimePicker === "workStart")
              handleChange("workingTime", (prev: any) => ({
                ...prev,
                startHour: value,
              }));
            if (isOpenTimePicker === "workEnd")
              handleChange("workingTime", (prev: any) => ({
                ...prev,
                endHour: value,
              }));
            if (isOpenTimePicker === "breakStart")
              handleChange("restTime", (prev: any) => ({
                ...prev,
                startHour: value,
              }));
            if (isOpenTimePicker === "breakEnd")
              handleChange("restTime", (prev: any) => ({
                ...prev,
                endHour: value,
              }));
          }}
          initialValue={
            isOpenTimePicker === "workStart"
              ? schedule.workingTime.startHour ?? 0
              : isOpenTimePicker === "workEnd"
                ? schedule.workingTime.endHour ?? 0
                : isOpenTimePicker === "breakStart"
                  ? schedule.restTime?.startHour ?? 0
                  : schedule.restTime?.endHour ?? 0
          }
        />
      </BottomSheet>
    </>
  );
}

const TimeTxtView = ({
  timeString,
  disabled,
  onClick,
}: {
  timeString: string;
  disabled: boolean;
  onClick: (() => void) | undefined;
}) => {
  return (
    <div
      css={{
        padding: "12px 0",
        borderBottom: "2px solid #ddd",
        flex: 1,
        height: "24px",
      }}
      onClick={disabled ? undefined : onClick}
    >
      <Txt size="large" color={colors.grey800} fontWeight="regular">
        {timeString}
      </Txt>
    </div>
  );
};
