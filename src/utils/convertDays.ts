import { DAYS_MAP } from "constants/dates";

/**
 * 숫자 배열 (0~6) -> "월, 화, 수" 형식의 문자열로 변환
 */
export function convertDaysToString(workingDays: number[]): string {
  return workingDays.map((day) => DAYS_MAP[day]).join(", ");
}
