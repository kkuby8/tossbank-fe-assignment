import { List } from "components/List";
import { formatHour } from "utils/formatHour";
import { Schedule } from "models";
import { convertDaysToString } from "utils/convertDays";

interface ContractScheduleListProps {
  schedules: Schedule[];
  onScheduleClick: (scheduleId: string) => void;
}

/**
 * 계약서 근로 일정 목록
 *
 * @param schedules 근로 일정 목록
 * @param onScheduleClick 근로 일정 클릭 시 이벤트 (조회 혹은 수정)
 */

export function ContractScheduleList({
  schedules,
  onScheduleClick,
}: ContractScheduleListProps) {
  return (
    <List>
      {schedules.map((schedule) => (
        <List.Row
          key={schedule.id}
          iconName="icon-clock-mono"
          topText={`${formatHour(schedule.workingTime.startHour)} ~ ${formatHour(schedule.workingTime.endHour)}`}
          bottomText={convertDaysToString(schedule.workingDay)}
          onClick={() => onScheduleClick(schedule.id)}
        />
      ))}
    </List>
  );
}
