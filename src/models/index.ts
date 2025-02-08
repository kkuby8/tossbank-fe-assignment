export type ContractStatus = "WRITING" | "COMPLETED";
export interface Schedule {
  id: string;
  workingDay: number[];
  workingTime: {
    startHour: number;
    endHour: number;
  };
  restTime: {
    startHour: number;
    endHour: number;
  } | null;
}
export interface Contract {
  id: string;
  title: string;
  status: ContractStatus;
  schedules: Schedule[];
}
