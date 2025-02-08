import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { getContractAPI } from "remotes";
import { ContractScheduleList } from "features/contract/ContractScheduleList";
import { Txt } from "components/Txt";
import { Contract } from "models";

/**
 * 계약서 상세 페이지
 */

export default function ViewContractPage() {
  const router = useRouter();
  const { contractId } = router.query;

  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (contractId) {
      getContractAPI({ contractId: contractId as string }).then(setContract);
    }
  }, [contractId]);

  if (!contract) return <Txt>로딩 중...</Txt>;

  return (
    <>
      <Txt
        css={{ padding: "36px 0 24px 24px", display: "block" }}
        size="large"
        fontWeight="bold"
      >
        근로 일정
      </Txt>
      <ContractScheduleList
        schedules={contract.schedules}
        onScheduleClick={(scheduleId: string) =>
          router.push(`/${contractId}/schedule/${scheduleId}`)
        }
      />
    </>
  );
}
