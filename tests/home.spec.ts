import { mkdirSync } from "node:fs";
import { expect, test } from "@playwright/test";

const screenshots = "qa/phase3";
const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
] as const;

test.beforeAll(() => mkdirSync(screenshots, { recursive: true }));

for (const viewport of viewports) {
  test(`light homepage at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    if (viewport.width < 1024) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page
        .getByRole("combobox", { name: "Choose colour theme" })
        .selectOption("light");
      await page.getByRole("button", { name: "Close menu" }).click();
    } else {
      await page
        .getByRole("combobox", { name: "Choose colour theme" })
        .selectOption("light");
    }
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    for (const heading of [
      "Ideas that move people. Marketing that moves business.",
      "Marketing works better when the pieces agree.",
      "The right work for the problem in front of you.",
      "The thinking should be as clear as the result.",
      "Less theatre. More useful thinking and well-made work.",
      "A clear path from question to outcome.",
      "Built for teams with something worth growing.",
      "What are you trying to move?",
    ]) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }

    await expect(page.locator(".home-service")).toHaveCount(6);
    await expect(page.locator(".home-process__list li")).toHaveCount(4);
    await expect(page.locator(".home-why__list li")).toHaveCount(4);
    await expect(page.locator(".home-work__empty")).toContainText(
      "Our first public case studies are being prepared with client approval.",
    );
    await expect(page.locator(".home-view")).toContainText(
      "We do not begin with a list of deliverables.",
    );

    const images = page.locator(
      ".home-hero__media img, .home-service__media img",
    );
    await expect(images).toHaveCount(7);
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      expect(
        await image.evaluate(
          (element: HTMLImageElement) => element.naturalWidth,
        ),
      ).toBeGreaterThan(0);
    }

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      ),
      "horizontal overflow",
    ).toBeFalsy();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `${screenshots}/home-light-${viewport.width}.png`,
      fullPage: true,
      animations: "disabled",
    });
  });
}
