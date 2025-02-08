import { Page } from "@playwright/test";

export async function scrollWheel(page: Page, targetNumber: number) {
  const target = page.locator(`text=0`).first();
  const boundingBox = await target.boundingBox();
  if (!boundingBox) {
    throw new Error("Target을 찾을 수 없습니다.");
  }

  const x = boundingBox.x + boundingBox.width / 2;
  const y = boundingBox.y + boundingBox.height / 2;

  const maxScrolls = 30;

  for (let i = 0; i < 12; i++) {
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y + 50, { steps: 20 });
    await page.mouse.up();
  }

  for (let i = 0; i < maxScrolls; i++) {
    const targetElementFontColor = await page
      .locator(`text=${targetNumber}`)
      .first()
      .evaluate((element) => {
        return window.getComputedStyle(element).color;
      });

    if (targetElementFontColor === "rgb(0, 0, 0)") {
      break;
    }

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y - 20, { steps: 40 });
    await page.mouse.up();
    await page.waitForTimeout(2500);
  }
}
