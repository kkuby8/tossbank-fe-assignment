import { FixedBottomCTA } from "components/FixedBottomCTA";
import { Input } from "components/Input";
import { Txt } from "components/Txt";
import { colors } from "constants/colors";
import { useRouter } from "next/router";
import { useState } from "react";
import { createContractAPI } from "remotes";

/**
 * 계약서 생성 페이지
 */

export default function ContractsCreatePage() {
  const router = useRouter();

  const [title, setTitle] = useState(""); // 입력 값
  const [error, setError] = useState(false); // 에러 상태

  const handleSubmit = async () => {
    if (title.length < 1 || title.length > 12) {
      setError(true);
      return;
    }

    try {
      const response = await createContractAPI({ title });
      router.push(`/${response.id}/edit`);
    } catch (err) {
      console.error("계약서 생성 실패:", err);
    }
  };

  return (
    <>
      <Txt
        css={{ padding: "36px 24px 8px", display: "block" }}
        size="large"
        fontWeight="bold"
      >
        업무 내용을 알려주세요
      </Txt>
      <Input
        css={{
          margin: "16px 24px",
          width: "calc(100% - 48px)",
          borderBottom: `1px solid ${error ? colors.red : colors.grey400}`,
          "&:focus": {
            borderBottom: `1px solid ${error ? colors.red : colors.grey400}`, // 포커스 시 색 변경 방지
          },
        }}
        placeholder="예시) 고객응대 관리"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) {
            setError(e.target.value.length > 12);
          }
        }}
      />
      {error && (
        <Txt css={{ marginLeft: "24px", ontSize: "14px" }} color={colors.red}>
          업무 내용은 1~12자 까지 입력할 수 있어요.
        </Txt>
      )}
      <FixedBottomCTA disabled={title.length < 1} onClick={handleSubmit}>
        다음
      </FixedBottomCTA>
    </>
  );
}
