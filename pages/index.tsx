import { FixedBottomCTA } from "components/FixedBottomCTA";
import { List } from "components/List";
import { SelectBottomSheet } from "components/SelectBottomSheet";
import { Txt } from "components/Txt";
import { colors } from "constants/colors";
import { Contract, ContractStatus } from "models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getContractsAPI } from "remotes";

/**
 * 계약서 목록 페이지
 */

export default function ContractsListPage() {
  const router = useRouter();

  // 계약서 목록 상태 저장
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>([]);
  const [status, setStatus] = useState<ContractStatus | "ALL">("ALL");

  // API 호출 (최초 실행)
  useEffect(() => {
    getContractsAPI().then((data) => {
      setContracts(data);
      setFilteredContracts(data);
    });
  }, []);

  // 상태 변경 시 필터링
  useEffect(() => {
    if (status === "ALL") {
      setFilteredContracts(contracts);
    } else {
      setFilteredContracts(
        contracts.filter((contract) => contract.status === status)
      );
    }
  }, [status, contracts]);

  return (
    <>
      <Txt
        css={{ padding: "36px 0 24px 24px", display: "block" }}
        size="large"
        fontWeight="bold"
      >
        근로계약서
      </Txt>
      <SelectBottomSheet
        css={{ padding: "0 24px" }}
        title="상태"
        onChange={(value) => setStatus(value)}
        value={status}
      >
        <SelectBottomSheet.Option value="ALL">전체</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value="WRITING">
          작성중
        </SelectBottomSheet.Option>
        <SelectBottomSheet.Option value="COMPLETED">
          계약 완료
        </SelectBottomSheet.Option>
      </SelectBottomSheet>
      <List css={{ marginTop: "16px" }}>
        {filteredContracts.map((contract) => (
          <List.Row
            key={contract.id}
            iconName="icon-document-lines"
            topText={contract.title}
            right={
              <Txt color={colors.grey700}>
                {contract.status === "WRITING" ? "작성중" : "계약 완료"}
              </Txt>
            }
            withArrow={true}
            onClick={() => {
              if (contract.status === "WRITING") {
                router.push(`/${contract.id}/edit`);
              } else {
                router.push(`/${contract.id}`);
              }
            }}
          />
        ))}
      </List>
      <FixedBottomCTA
        onClick={() => {
          router.push("/create");
        }}
      >
        계약서 만들기
      </FixedBottomCTA>
    </>
  );
}
