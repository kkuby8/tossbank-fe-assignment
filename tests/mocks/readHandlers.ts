import { Contract, Schedule } from "models";
import { http, HttpResponse } from "msw";

const mockSchedules: Schedule[] = [
  {
    id: "1",
    workingDay: [0],
    workingTime: {
      startHour: 1,
      endHour: 12,
    },
    restTime: {
      startHour: 8,
      endHour: 11,
    },
  },
];

const mockContract: Contract = {
  id: "1",
  status: "COMPLETED",
  title: "프론트엔드 개발",
  schedules: mockSchedules,
};

export const readHandlers = [
  http.get("/api/contracts", () =>
    HttpResponse.json<Contract[]>([mockContract])
  ),
  http.get("/api/contracts/1", () =>
    HttpResponse.json<Contract>(mockContract, { status: 200 })
  ),
  http.get("/api/contracts/1/schedules/1", () =>
    HttpResponse.json<Schedule>(mockSchedules[0], { status: 200 })
  ),
];
