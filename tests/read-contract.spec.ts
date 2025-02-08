import { expect } from "@playwright/test";

import { test } from "./utils/extendedTest";
import { readHandlers } from "./mocks/readHandlers";

test.describe("유저는 계약서를 확인 할 수 있다", () => {
  test("계약서 확인", async ({ page, worker }) => {
    await worker.use(...readHandlers);

    await page.goto("/");

    const 완료된계약서 = page.getByText("프론트엔드 개발");
    await 완료된계약서.click();

    const 추가하기 = page.getByText("일정 추가하기");
    await expect(추가하기).toBeHidden();

    const 취소하기 = page.getByText("제출");
    await expect(취소하기).toBeHidden();

    const schedulePageTitle = page.getByText("근로 일정");
    await expect(schedulePageTitle).toBeVisible();

    const schedule = page.getByRole("listitem");
    await schedule.click();

    const 삭제하기 = page.getByText("삭제하기");
    await expect(삭제하기).toBeHidden();

    const 수정하기 = page.getByText("수정하기");
    await expect(수정하기).toBeHidden();

    const 근로시작시간 = page.locator("input[value='01:00']");
    const 근로시작시간Readonly속성 =
      await 근로시작시간.getAttribute("readonly");
    const 근로시작시간Disabled속성 =
      await 근로시작시간.getAttribute("disabled");

    expect(
      근로시작시간Readonly속성 === String(true) ||
        근로시작시간Readonly속성 === "" ||
        근로시작시간Disabled속성 === String(true) ||
        근로시작시간Disabled속성 === ""
    ).toBeTruthy();

    const 휴식시작시간 = await page.locator("input[value='08:00']");
    const 휴식시작시간Readonly속성 =
      await 휴식시작시간.getAttribute("readonly");
    const 휴식시작시간Disabled속성 =
      await 휴식시작시간.getAttribute("disabled");

    expect(
      휴식시작시간Readonly속성 === String(true) ||
        휴식시작시간Readonly속성 === "" ||
        휴식시작시간Disabled속성 === String(true) ||
        휴식시작시간Disabled속성 === ""
    ).toBeTruthy();
  });
});
