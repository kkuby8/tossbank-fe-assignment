import axios from "axios";
import { Contract, ContractStatus, Schedule } from "models";

export const createContractAPI = async ({ ...payload }: { title: string }) => {
  const { data } = await axios.post<Contract>("/api/contracts", payload);

  return data;
};

export const getContractsAPI = async () => {
  const { data } = await axios.get<Contract[]>("/api/contracts");

  return data;
};

export const getContractAPI = async ({
  contractId,
}: {
  contractId: string;
}) => {
  const { data } = await axios.get<Contract>(`/api/contracts/${contractId}`);

  return data;
};

export const updateContractAPI = async ({
  contractId,
  ...payload
}: {
  contractId: string;
} & { status: ContractStatus }) => {
  const { data } = await axios.patch(`/api/contracts/${contractId}`, payload);

  return data;
};

export const createScheduleAPI = async ({
  contractId,
  ...payload
}: {
  contractId: string;
} & { schedule: Omit<Schedule, "id"> }) => {
  const { data } = await axios.post<Contract>(
    `/api/contracts/${contractId}/schedules`,
    payload
  );

  return data;
};

export const getScheduleAPI = async ({
  contractId,
  scheduleId,
}: {
  contractId: string;
  scheduleId: string;
}) => {
  const { data } = await axios.get<Schedule>(
    `/api/contracts/${contractId}/schedules/${scheduleId}`
  );

  return data;
};

export const updateScheduleAPI = async ({
  contractId,
  scheduleId,
  ...payload
}: {
  contractId: string;
  scheduleId: string;
} & { schedule: Omit<Schedule, "id"> }) => {
  const { data } = await axios.patch(
    `/api/contracts/${contractId}/schedules/${scheduleId}`,
    payload
  );

  return data;
};

export const deleteScheduleAPI = async ({
  contractId,
  scheduleId,
}: {
  contractId: string;
  scheduleId: string;
}) => {
  const { data } = await axios.delete(
    `/api/contracts/${contractId}/schedules/${scheduleId}`
  );

  return data;
};
