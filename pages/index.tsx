import { FixedBottomCTA } from "components/FixedBottomCTA";
import { List } from "components/List";
import { SelectBottomSheet } from "components/SelectBottomSheet";
import { Txt } from "components/Txt";
import { colors } from "constants/colors";

export default function IndexPage() {
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
        onChange={(value) => {
          console.log(value);
        }}
        value={""}
      >
        <SelectBottomSheet.Option value="">전체</SelectBottomSheet.Option>
      </SelectBottomSheet>
      <List css={{ marginTop: "16px" }}>
        <List.Row
          iconName="icon-document-lines"
          topText="쓰레기 비우기"
          right={<Txt color={colors.grey700}>작성중</Txt>}
          withArrow={true}
        />
        <List.Row
          iconName="icon-document-lines"
          topText="물건 정리"
          right={<Txt color={colors.grey700}>계약 완료</Txt>}
          withArrow={false}
        />
      </List>
      <FixedBottomCTA>계약서 만들기</FixedBottomCTA>
    </>
  );
}
