import { ConfirmModal } from "components/ConfirmModal";
import { FixedBottomCTA } from "components/FixedBottomCTA";
import { List } from "components/List";
import { Txt } from "components/Txt";
import { ContractScheduleList } from "features/contract/ContractScheduleList";
import { Contract } from "models";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { getContractAPI, updateContractAPI } from "remotes";

export default function EditContractPage() {
  const router = useRouter();
  const { contractId } = router.query;

  const [contract, setContract] = useState<Contract | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (contractId) {
      getContractAPI({ contractId: contractId as string }).then(setContract);
    }
  }, [contractId]);

  const handleAddSchedule = () => {
    router.push(`/${contractId}/schedule/create`);
  };

  const handleEditSchedule = (scheduleId: string) => {
    router.push(`/${contractId}/schedule/${scheduleId}/edit`);
  };

  const handleSubmit = async () => {
    if (contract) {
      try {
        await updateContractAPI({
          contractId: contract.id,
          status: "COMPLETED",
        });
      } catch (error) {
        console.error(error);
      }
    }
    router.push(`/`);
  };

  if (!contract) return <Txt>로딩 중...</Txt>;

  return (
    <>
      <Txt
        css={{ padding: "36px 0 24px 24px", display: "block" }}
        size="large"
        fontWeight="bold"
      >
        근로 일정을 알려주세요
      </Txt>

      {/* 근로 일정 목록 */}
      <ContractScheduleList
        schedules={contract.schedules}
        onScheduleClick={(scheduleId: string) =>
          router.push(`/${contractId}/schedule/${scheduleId}/edit`)
        }
      />

      {/* 일정 추가 버튼 */}
      <List.Row
        iconName="icon-plus-grey-fill"
        topText="일정 추가하기"
        onClick={handleAddSchedule}
      />

      {/* 제출 버튼 */}
      <FixedBottomCTA onClick={() => setShowConfirmModal(true)}>
        제출
      </FixedBottomCTA>

      {/* 제출 다이얼로그 */}
      <ConfirmModal
        open={showConfirmModal}
        title="제출할까요?"
        confirmButtonText="제출"
        cancelButtonText="취소"
        onConfirm={handleSubmit}
        onCancel={() => setShowConfirmModal(false)}
        onDimmedClick={() => setShowConfirmModal(false)}
      />
    </>
  );
}
