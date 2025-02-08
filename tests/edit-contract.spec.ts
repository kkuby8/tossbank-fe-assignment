import { scrollWheel } from "./utils/scrollWheel";

import { Page } from "@playwright/test";
import { editHandlers } from "./mocks/editHandlers";
import { test, expect } from "./utils/extendedTest";
import { Contract } from "models";

async function gotoEditPage(page: Page) {
  await test.step(
    "근로 일정을 알려주세요 페이지로 이동한다",
    async () => {
      await page.goto("/");
      await page.waitForLoadState("domcontentloaded");

      const contractRow = page.getByText("작성중인 계약서");
      await contractRow.click();

      await page.getByText("근로 일정을 알려주세요").waitFor();

      const contentPageTitle = page.getByText("근로 일정을 알려주세요");
      await expect(contentPageTitle).toBeVisible();

      const scheduleRow = page.getByText("09:00 ~ 20:00");
      await scheduleRow.click();

      const schedulePageTitle = page.getByText("근로일");
      await expect(schedulePageTitle).toBeVisible();
    },
    { box: true }
  );
}

async function checkEditButtonErrorMessage(page: Page, message: string) {
  await test.step(
    "수정하기 버튼의 에러메시지가 제대로 보이는지 확인한다",
    async () => {
      const errorMessage = page.getByText(message);
      await expect(errorMessage).toBeVisible();
    },
    { box: true }
  );
}

const initialContracts: Contract[] = [
  {
    id: "1",
    title: "작성중인 계약서",
    status: "WRITING",
    schedules: [
      {
        id: "1",
        workingDay: [1],
        workingTime: {
          startHour: 9,
          endHour: 20,
        },
        restTime: {
          startHour: 12,
          endHour: 15,
        },
      },
    ],
  },
];

test.beforeEach(async ({ worker }) => {
  const contractsCopy = JSON.parse(JSON.stringify(initialContracts));
  await worker.use(...editHandlers(contractsCopy));
});

test.describe("유저는 계약서를 수정 할 수 있다", () => {
  test("근로일정 수정", async ({ page, worker }) => {
    await gotoEditPage(page);

    await page.getByRole("option", { name: "화" }).click();

    const editButton = page.getByRole("button", { name: "수정하기" });
    await editButton.click();

    await page.getByText("근로 일정을 알려주세요").waitFor();

    await expect(page.getByText("월, 화")).toBeVisible();
  });

  test("근로일정 삭제", async ({ page, worker }) => {
    await gotoEditPage(page);

    const 삭제버튼 = page.getByText("삭제하기");
    await 삭제버튼.click();

    await page.getByText("근로 일정을 알려주세요").waitFor();

    const 작성중인_스케줄 = page.getByText("09:00 ~ 20:00");
    await expect(작성중인_스케줄).toBeHidden();
  });
});

test.describe("유저는 잘못된 근로조건으로 계약서를 수정 할 수 없다", () => {
  test("근로일이 선택되지 않은 경우", async ({ page }) => {
    await gotoEditPage(page);

    await page.getByRole("option", { name: "월" }).click();
    const editButton = page.getByRole("button", { name: "수정하기" });
    await editButton.click();

    await checkEditButtonErrorMessage(
      page,
      "근로일은 하루 이상 선택해야 해요."
    );
  });

  test("근로 종료 시각이 시작 시각 후인 경우", async ({ page }) => {
    await gotoEditPage(page);

    const workStartInput = page.locator("input").nth(0);
    const workEndInput = page.locator("input").nth(1);

    await workStartInput.click();
    await scrollWheel(page, 0);
    await page.getByRole("button", { name: "확인" }).click();

    await workEndInput.click();
    await scrollWheel(page, 0);
    await page.getByRole("button", { name: "확인" }).click();

    const editButton = page.getByRole("button", { name: "수정하기" });
    await editButton.click();

    await checkEditButtonErrorMessage(
      page,
      "근로 종료 시각은 근로 시작 시각 후가 되어야 해요."
    );
  });

  test("휴게 종료 시각이 시작 시각보다 같거나 이전인 경우", async ({
    page,
  }) => {
    await gotoEditPage(page);

    const restStartInput = page.locator("input").nth(2);
    const restEndInput = page.locator("input").nth(3);

    await restStartInput.click();
    await scrollWheel(page, 0);
    await page.getByRole("button", { name: "확인" }).click();

    await restEndInput.click();
    await scrollWheel(page, 0);
    await page.getByRole("button", { name: "확인" }).click();

    const editButton = page.getByRole("button", { name: "수정하기" });
    await editButton.click();
    await checkEditButtonErrorMessage(
      page,
      "휴게 종료 시각은 휴게 시작 시각 후가 되어야 해요."
    );
  });

  test("휴게 시간이 근로 시간 내에 있지 않은 경우", async ({ page }) => {
    await gotoEditPage(page);

    const restStartInput = page.locator("input").nth(2);
    await restStartInput.click();
    await scrollWheel(page, 0);
    await page.getByRole("button", { name: "확인" }).click();

    const editButton = page.getByRole("button", { name: "수정하기" });
    await editButton.click();
    await checkEditButtonErrorMessage(
      page,
      "휴게시간은 근로 시작 시각 후, 근로 종료 시각 전이어야해요."
    );
  });

  test("근로 시간이 4시간 이상일 때 휴게 시간이 충분하지 않은 경우", async ({
    page,
  }) => {
    await gotoEditPage(page);

    const workStartInput = page.locator("input").nth(0);
    await workStartInput.click();
    await scrollWheel(page, 0);
    await page.getByRole("button", { name: "확인" }).click();

    const editButton = page.getByRole("button", { name: "수정하기" });
    await editButton.click();
    await checkEditButtonErrorMessage(
      page,
      "근로시간 4시간당 휴게시간 1시간이 보장되어야 해요."
    );
  });

  test("총 근로 시간이 52시간을 초과하는 경우", async ({ page }) => {
    await gotoEditPage(page);

    await page.getByRole("option", { name: "화" }).click();
    await page.getByRole("option", { name: "수" }).click();
    await page.getByRole("option", { name: "목" }).click();
    await page.getByRole("option", { name: "금" }).click();
    await page.getByRole("option", { name: "토" }).click();
    await page.getByRole("option", { name: "일" }).click();

    const editButton = page.getByRole("button", { name: "수정하기" });
    await editButton.click();
    await checkEditButtonErrorMessage(
      page,
      "(근로시간 - 휴게시간) * 근로 일자 는 52시간 이하여야 해요."
    );
  });
});
