import { http, HttpResponse, PathParams } from "msw";
import { nanoid } from "nanoid";
import { z, ZodError } from "zod";
import { LiveStorage } from "@mswjs/storage";

const scheduleSchema = z.object({
  id: z.string(),
  workingDay: z.array(z.number()),
  workingTime: z.object({
    startHour: z.number(),
    endHour: z.number(),
  }),
  restTime: z
    .object({
      startHour: z.number(),
      endHour: z.number(),
    })
    .nullable(),
});

type Schedule = z.infer<typeof scheduleSchema>;

const contractStatusSchema = z.union([
  z.literal("WRITING"),
  z.literal("COMPLETED"),
]);
const contractSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: contractStatusSchema,
  schedules: z.array(scheduleSchema),
});

type Contract = z.infer<typeof contractSchema>;

const initialContracts: Contract[] = [
  {
    id: nanoid(),
    schedules: [
      {
        id: nanoid(),
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
    ],
    status: "COMPLETED",
    title: "매장 관리",
  },
];

const contracts = new LiveStorage<Contract[]>("contracts", initialContracts);

export const handlers = [
  // createContractAPI
  http.post<PathParams, { title: string }>(
    "/api/contracts",
    async ({ request }) => {
      const createContractSchema = z.object({
        title: z.string(),
      });

      try {
        const requestData = await request.json();

        const { title } = createContractSchema.parse(requestData);
        const newContract: Contract = {
          id: nanoid(),
          status: "WRITING",
          title,
          schedules: [],
        };

        contracts.update((prevContract) => prevContract.concat(newContract));

        return HttpResponse.json(newContract, { status: 201 });
      } catch (error) {
        if (error instanceof ZodError) {
          return HttpResponse.json({ message: error.issues }, { status: 400 });
        } else {
          return HttpResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          );
        }
      }
    }
  ),

  // getContractsAPI
  http.get("/api/contracts", () => {
    return HttpResponse.json(contracts.getValue(), { status: 200 });
  }),

  // getContractAPI
  http.get("/api/contracts/:contractId", ({ params }) => {
    const { contractId } = params;
    const contract = contracts.getValue().find((c) => c.id === contractId);

    if (!contract) {
      return HttpResponse.json(null, { status: 404 });
    }

    return HttpResponse.json(contract);
  }),

  // updateContractAPI
  http.patch<PathParams>(
    "/api/contracts/:contractId",
    async ({ params, request }) => {
      try {
        const { contractId } = params;
        const requestData = await request.json();

        const parsedContractId = z.string().parse(contractId);

        const updateContractSchema = z.object({
          status: contractStatusSchema,
        });
        const { status } = updateContractSchema.parse(requestData);

        contracts.update((prevState) => {
          return prevState.map((contract) => {
            if (contract.id === parsedContractId) {
              return {
                ...contract,
                status: status ? status : contract.status,
              };
            }

            return contract;
          });
        });

        return HttpResponse.json({ status: 204 });
      } catch (error) {
        if (error instanceof ZodError) {
          return HttpResponse.json({ message: error.issues }, { status: 400 });
        } else {
          return HttpResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          );
        }
      }
    }
  ),

  // createScheduleAPI
  http.post<PathParams, { schedule: Omit<Schedule, "id"> }>(
    "/api/contracts/:contractId/schedules",
    async ({ params, request }) => {
      try {
        const { contractId } = params;
        const parsedContractId = z.string().parse(contractId);

        const requestData = await request.json();
        const createScheduleSchema = scheduleSchema.omit({ id: true });
        const parsedRequestData = createScheduleSchema.parse(
          requestData.schedule
        );

        const newSchedule: Schedule = { id: nanoid(), ...parsedRequestData };

        contracts.update((prevState) => {
          return prevState.map((contract) => {
            if (contract.id === parsedContractId) {
              return {
                ...contract,
                schedules: contract.schedules.concat(newSchedule),
              };
            }

            return contract;
          });
        });

        return HttpResponse.json(newSchedule, { status: 201 });
      } catch (error) {
        if (error instanceof ZodError) {
          return HttpResponse.json({ message: error.issues }, { status: 400 });
        } else {
          return HttpResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          );
        }
      }
    }
  ),

  // getScheduleAPI
  http.get("/api/contracts/:contractId/schedules/:scheduleId", ({ params }) => {
    const { contractId, scheduleId } = params;
    const schedules = contracts
      .getValue()
      .find((c) => c.id === contractId)?.schedules;
    const schedule = schedules?.find((schedule) => schedule.id === scheduleId);

    if (!schedule) {
      return HttpResponse.json(null, { status: 404 });
    }

    return HttpResponse.json(schedule);
  }),

  // updateScheduleAPI
  http.patch<PathParams, { schedule: Omit<Schedule, "id"> }>(
    "/api/contracts/:contractId/schedules/:scheduleId",
    async ({ params, request }) => {
      try {
        const { contractId, scheduleId } = params;
        const parsedContractId = z.string().parse(contractId);
        const parsedScheduleId = z.string().parse(scheduleId);

        const requestData = await request.json();
        const createScheduleSchema = scheduleSchema.omit({ id: true });
        const parsedRequestData = createScheduleSchema.parse(
          requestData.schedule
        );

        const updatedSchedule: Omit<Schedule, "id"> = parsedRequestData;

        contracts.update((prevState) => {
          return prevState.map((contract) => {
            if (contract.id === parsedContractId) {
              return {
                ...contract,
                schedules: contract.schedules.map((prevSchedule) => {
                  if (prevSchedule.id === parsedScheduleId) {
                    return { ...updatedSchedule, id: parsedScheduleId };
                  }

                  return prevSchedule;
                }),
              };
            }

            return contract;
          });
        });

        return HttpResponse.json({ status: 204 });
      } catch (error) {
        if (error instanceof ZodError) {
          return HttpResponse.json({ message: error.issues }, { status: 400 });
        } else {
          return HttpResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          );
        }
      }
    }
  ),

  // deleteScheduleAPI
  http.delete<PathParams, { title: string }>(
    "/api/contracts/:contractId/schedules/:scheduleId",
    async ({ params }) => {
      try {
        const { contractId, scheduleId } = params;

        const parsedContractId = z.string().parse(contractId);
        const parsedScheduleId = z.string().parse(scheduleId);

        contracts.update((prevState) => {
          return prevState.map((contract) => {
            if (contract.id === parsedContractId) {
              return {
                ...contract,
                schedules: contract.schedules.filter(
                  (prevSchedule) => prevSchedule.id !== parsedScheduleId
                ),
              };
            }

            return contract;
          });
        });

        return HttpResponse.json({ status: 204 });
      } catch (error) {
        if (error instanceof ZodError) {
          return HttpResponse.json({ message: error.issues }, { status: 400 });
        } else {
          return HttpResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          );
        }
      }
    }
  ),
];
