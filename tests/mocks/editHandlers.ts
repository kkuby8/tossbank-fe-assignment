import { Contract, Schedule } from "models";
import { http, HttpResponse, PathParams } from "msw";

export const editHandlers = (contracts: Contract[]) => [
  http.get("/api/contracts", () => {
    return HttpResponse.json(contracts, {
      status: 200,
    });
  }),

  http.get("/api/contracts/:contractId", ({ params }) => {
    const { contractId } = params;
    const contract = contracts.find((c) => c.id === contractId);

    if (!contract) {
      return HttpResponse.json(null, { status: 404 });
    }

    return HttpResponse.json(contract);
  }),

  http.get("/api/contracts/:contractId/schedules/:scheduleId", ({ params }) => {
    const { contractId, scheduleId } = params;
    const contract = contracts.find((c) => c.id === contractId);
    if (!contract) {
      return HttpResponse.json(null, { status: 404 });
    }

    const schedule = contract.schedules.find(
      (schedule) => schedule.id === scheduleId
    );

    if (!schedule) {
      return HttpResponse.json(null, { status: 404 });
    }
    return HttpResponse.json<Schedule>(schedule, { status: 200 });
  }),

  http.patch<PathParams, { schedule: Omit<Schedule, "id"> }>(
    "/api/contracts/:contractId/schedules/:scheduleId",
    async ({ params, request }) => {
      const { contractId, scheduleId } = params;
      const newSchedule = await request.json();

      const contract = contracts.find((c) => c.id === contractId);
      if (contract) {
        const scheduleIndex = contract.schedules.findIndex(
          (s) => s.id === scheduleId
        );

        if (scheduleIndex > -1) {
          contract.schedules[scheduleIndex] = {
            id: scheduleId as string,
            ...newSchedule.schedule,
          };
        }
      }

      return HttpResponse.json(null, { status: 200 });
    }
  ),

  http.delete<PathParams, { schedule: Omit<Schedule, "id"> }>(
    "/api/contracts/:contractId/schedules/:scheduleId",
    async ({ params }) => {
      const { contractId, scheduleId } = params;

      const contract = contracts.find((c) => c.id === contractId);
      if (contract) {
        contract.schedules = contract.schedules.filter(
          (s) => s.id !== scheduleId
        );
      }

      return HttpResponse.json(null, { status: 200 });
    }
  ),
];
