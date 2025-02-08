import { BottomSheet } from "components/BottomSheet";
import { Button } from "components/Button";
import { CheckboxCircle } from "components/Checkbox";
import { FixedBottomCTA } from "components/FixedBottomCTA";
import { MultiSelect } from "components/MultiSelect";
import { Txt } from "components/Txt";
import { WheelTimePicker } from "components/WheelTimePicker";
import { colors } from "constants/colors";
import { DAYS_MAP } from "constants/dates";
import { ErrorMessages } from "features/contract/schedule/ErrorMessages";
import {
  FormSchedule,
  transformFormToSchedule,
} from "features/contract/schedule/FormSchedule";
import { ScheduleForm } from "features/contract/schedule/ScheduleForm";
import { validateSchedule } from "features/contract/schedule/ValidateSchedule";
import { Schedule } from "models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createScheduleAPI } from "remotes";
import { formatHour } from "utils/formatHour";

export default function CreateSchedulePage() {
  const router = useRouter();
  const { contractId } = router.query;
  const [scheduleForm, setScheduleForm] = useState<FormSchedule>({
    workingDay: [],
    workingTime: { startHour: null, endHour: null },
    restTime: null,
    noBreak: false,
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async () => {
    const errors = validateSchedule(transformFormToSchedule(scheduleForm, ""));
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    await createScheduleAPI({
      contractId: contractId as string,
      schedule: transformFormToSchedule(scheduleForm, ""),
    });
    router.push(`/${contractId}/edit`);
  };
  return (
    <>
      <ScheduleForm schedule={scheduleForm} onChange={setScheduleForm} />
      <FixedBottomCTA.TypeB
        topAccessory={
          errors.length > 0 ? <ErrorMessages errors={errors} /> : undefined
        }
        leftButton={
          <Button theme="dark" onClick={() => router.back()}>
            취소하기
          </Button>
        }
        rightButton={<Button onClick={handleSubmit}>추가하기</Button>}
      />
    </>
  );
}
