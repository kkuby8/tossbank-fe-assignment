import { Schedule } from "models";

/**
 * 스케쥴 폼 타입
 * 요구사항: 근로일정 추가를 시작할 때 근로일, 근로시간, 휴게시간이 입력되어 있지 않도록 해주세요.
 * Schedule의 시간 값은 nullable하지 않아서 빈 값을 null로 주기 위해 새로 정의
 * restTime이 null이면 휴게 시간을 안쓰는 것으로 간주 하려면 초기에 항상 체크되어 있어야 하므로
 * noBreak boolean 필드 추가
 */
export interface FormSchedule {
  workingDay: number[];
  workingTime: {
    startHour: number | null;
    endHour: number | null;
  };
  restTime: {
    startHour: number;
    endHour: number;
  } | null;
  noBreak: boolean;
}

export function transformScheduleToForm(schedule: Schedule): FormSchedule {
  return {
    workingDay: schedule.workingDay,
    workingTime: {
      startHour: schedule.workingTime.startHour ?? null,
      endHour: schedule.workingTime.endHour ?? null,
    },
    restTime: schedule.restTime,
    noBreak: schedule.restTime === null, // 휴게시간이 없으면 noBreak 설정
  };
}

export function transformFormToSchedule(
  form: FormSchedule,
  id: string
): Schedule {
  return {
    id,
    workingDay: form.workingDay,
    workingTime: {
      startHour: form.workingTime.startHour ?? 0, // null일 경우 0으로 처리
      endHour: form.workingTime.endHour ?? 0,
    },
    restTime: form.noBreak ? null : form.restTime,
  };
}
