import { Schedule } from "models";

export const validateSchedule = (schedule: Schedule) => {
  const errors: string[] = [];

  // 1. 근로일 선택 확인
  if (schedule.workingDay.length === 0) {
    errors.push("근로일은 하루 이상 선택해야 해요.");
  }

  // 2. 근로 종료 시각이 시작 시각 이후인지 확인
  if (schedule.workingTime.endHour <= schedule.workingTime.startHour) {
    errors.push("근로 종료 시각은 근로 시작 시각 후가 되어야 해요.");
  }

  // 3. 휴게 종료 시각이 시작 시각 이후인지 확인
  if (
    schedule.restTime &&
    schedule.restTime.endHour <= schedule.restTime.startHour
  ) {
    errors.push("휴게 종료 시각은 휴게 시작 시각 후가 되어야 해요.");
  }

  // 4. 휴게시간이 근로 시작~종료 사이에 있는지 확인
  if (
    schedule.restTime &&
    (schedule.restTime.startHour < schedule.workingTime.startHour ||
      schedule.restTime.endHour > schedule.workingTime.endHour)
  ) {
    errors.push("휴게시간은 근로 시작 시각 후, 근로 종료 시각 전이어야 해요.");
  }

  // 5. 근로시간 4시간당 휴게시간 1시간 보장 확인
  const workDuration =
    schedule.workingTime.endHour - schedule.workingTime.startHour;
  const breakDuration = schedule.restTime
    ? schedule.restTime.endHour - schedule.restTime.startHour
    : 0;
  if (workDuration >= 4 && breakDuration < Math.floor(workDuration / 4)) {
    errors.push("근로시간 4시간당 휴게시간 1시간이 보장되어야 해요.");
  }

  // 6. 총 근로시간 52시간 초과 방지
  const totalWorkHours =
    (workDuration - breakDuration) * schedule.workingDay.length;
  if (totalWorkHours > 52) {
    errors.push("(근로시간 - 휴게시간) * 근로 일자는 52시간 이하여야 해요.");
  }

  return errors;
};
