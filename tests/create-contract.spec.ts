import { scrollWheel } from "./utils/scrollWheel";

import { test, expect } from "./utils/extendedTest";

test.describe("유저는 계약서를 추가 할 수 있다", () => {
  test.setTimeout(180000);

  test("계약서 추가", async ({ page }) => {
    await test.step("시작 페이지 진입", async () => {
      await page.goto("/");

      const createContractButton = page.locator("text=계약서 만들기");
      await expect(createContractButton).toBeVisible();
    });

    await test.step("계약서 만들기 CTA 클릭 후 업무 내용 입력 페이지 진입", async () => {
      const createContractButton = page.locator("text=계약서 만들기");
      await createContractButton.click();

      const 업무_내용_입력_페이지_타이틀 =
        page.locator("text=업무 내용을 알려주세요");
      await expect(업무_내용_입력_페이지_타이틀).toBeVisible();
    });

    await test.step("업무 내용 입력 후 근로일정 목록 페이지 진입", async () => {
      const contentInput = page.locator("input");
      await contentInput.fill("프론트엔드 개발");
      const nextButton = page.locator("text=다음");
      await nextButton.click();

      const 근로_일정_목록_페이지_타이틀 =
        page.locator("text=근로 일정을 알려주세요");
      await expect(근로_일정_목록_페이지_타이틀).toBeVisible();
    });

    await test.step("일정 추가하기 버튼 클릭 후 근로일정 페이지 진입", async () => {
      const 일정_추가하기_버튼 = page.locator("text=일정 추가하기");
      await 일정_추가하기_버튼.click();

      const 근로일정_페이지_타이틀 = page.locator("text=근로일").first();
      await expect(근로일정_페이지_타이틀).toBeVisible();
    });

    await test.step("근로일정 입력 후 근로일정 목록 페이지 진입", async () => {
      const 월요일 = page.locator("text=월");
      await 월요일.click();

      const 근로시작시간_INPUT = page.locator("input").nth(0);
      const 근로종료시간_INPUT = page.locator("input").nth(1);
      const 휴게시작시간_INPUT = page.locator("input").nth(2);
      const 휴게종료시간_INPUT = page.locator("input").nth(3);
      await 근로시작시간_INPUT?.click();
      await scrollWheel(page, 1);
      const 근로시작시간_확인_버튼 = page.locator("text=확인");
      await 근로시작시간_확인_버튼.click();
      await expect(근로시작시간_INPUT).toHaveValue("01:00");
      await 근로종료시간_INPUT?.click();
      await scrollWheel(page, 5);
      const 근로종료시간_확인_버튼 = page.locator("text=확인");
      await 근로종료시간_확인_버튼.click();
      await expect(근로종료시간_INPUT).toHaveValue("05:00");
      await 휴게시작시간_INPUT?.click();
      await scrollWheel(page, 2);
      const 휴게시작시간_확인_버튼 = page.locator("text=확인");
      await 휴게시작시간_확인_버튼.click();
      await expect(휴게시작시간_INPUT).toHaveValue("02:00");
      await 휴게종료시간_INPUT?.click();
      await scrollWheel(page, 3);
      const 휴게종료시간_확인_버튼 = page.locator("text=확인");
      await 휴게종료시간_확인_버튼.click();
      await expect(휴게종료시간_INPUT).toHaveValue("03:00");
      const 추가하기_CTA = page.locator("text=추가하기");
      await 추가하기_CTA.click();

      const 근로시간_텍스트 = page.locator("text=01:00 ~ 05:00");
      await expect(근로시간_텍스트).toBeVisible();
    });

    await test.step("일정 추가하기 버튼 클릭 후 근로일정 페이지 진입", async () => {
      const submitButton = page.locator("text=제출");
      await submitButton.click();
      const dialogTitle = page.locator("text=제출할까요?");
      await expect(dialogTitle).toBeVisible();
      const dialogSubmitButton = page.locator("text=제출").nth(2);
      await dialogSubmitButton.click();
      const targetElement = page.locator('li:has-text("프론트엔드 개발")');
      await expect(targetElement).toBeVisible();
      const statusElement = targetElement.locator('span:has-text("계약 완료")');
      await expect(statusElement).toBeVisible();
    });
  });
});
