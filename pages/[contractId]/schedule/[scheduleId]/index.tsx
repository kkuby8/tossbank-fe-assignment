import { useRouter } from "next/router";
import { Txt } from "components/Txt";
import { useState } from "react";
import { transformScheduleToForm } from "features/contract/schedule/FormSchedule";
import { useEffect } from "react";
import { getScheduleAPI } from "remotes";
import { FormSchedule } from "features/contract/schedule/FormSchedule";
import { ScheduleForm } from "features/contract/schedule/ScheduleForm";

export default function SchedulePage() {
  const router = useRouter();
  const { contractId, scheduleId } = router.query;

  const [scheduleForm, setScheduleForm] = useState<FormSchedule | null>(null);

  useEffect(() => {
    async function fetchSchedule() {
      const data = await getScheduleAPI({
        contractId: contractId as string,
        scheduleId: scheduleId as string,
      });
      setScheduleForm(transformScheduleToForm(data));
    }
    fetchSchedule();
  }, [contractId, scheduleId]);

  if (!scheduleForm) return <Txt>Loading...</Txt>;

  return (
    <>
      <ScheduleForm
        isReadOnly={true}
        schedule={scheduleForm}
        onChange={setScheduleForm}
      />
    </>
  );
}
