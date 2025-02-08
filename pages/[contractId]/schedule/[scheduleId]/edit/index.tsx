import { useEffect } from "react";

import {
  FormSchedule,
  transformFormToSchedule,
  transformScheduleToForm,
} from "features/contract/schedule/FormSchedule";
import { useRouter } from "next/router";
import { useState } from "react";
import { deleteScheduleAPI, updateScheduleAPI } from "remotes";
import { getScheduleAPI } from "remotes";
import { Txt } from "components/Txt";
import { ScheduleForm } from "features/contract/schedule/ScheduleForm";
import { FixedBottomCTA } from "components/FixedBottomCTA";
import { Button } from "components/Button";
import { validateSchedule } from "features/contract/schedule/ValidateSchedule";
import { ErrorMessages } from "features/contract/schedule/ErrorMessages";
export default function EditSchedulePage() {
  const router = useRouter();
  const { contractId, scheduleId } = router.query;

  const [errors, setErrors] = useState<string[]>([]);
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

  const handleUpdate = async () => {
    if (!scheduleForm) return;
    const updatedSchedule = transformFormToSchedule(
      scheduleForm,
      scheduleId as string
    );

    const errors = validateSchedule(updatedSchedule);
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    await updateScheduleAPI({
      contractId: contractId as string,
      scheduleId: scheduleId as string,
      schedule: updatedSchedule,
    });

    goBack();
  };

  const handleDelete = async () => {
    await deleteScheduleAPI({
      contractId: contractId as string,
      scheduleId: scheduleId as string,
    });
    goBack();
  };

  const goBack = () => {
    router.push(`/${contractId}/edit`);
  };

  if (!scheduleForm) return <Txt>Loading...</Txt>;

  return (
    <>
      <ScheduleForm schedule={scheduleForm} onChange={setScheduleForm} />
      <FixedBottomCTA.TypeB
        topAccessory={
          errors.length > 0 ? <ErrorMessages errors={errors} /> : undefined
        }
        leftButton={
          <Button theme="dark" onClick={handleDelete}>
            삭제하기
          </Button>
        }
        rightButton={<Button onClick={handleUpdate}>수정하기</Button>}
      />
    </>
  );
}
