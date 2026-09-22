import { mkdirSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const screenshotDirectory = "qa/phase5";
const widths = [360, 375, 390, 768, 1024, 1440, 1920] as const;
const themes = ["light", "dark"] as const;

function contrastRatio(foreground: string, background: string) {
  const luminance = (color: string) => {
    const channels = color
      .match(/\d+(?:\.\d+)?/g)
      ?.slice(0, 3)
      .map(Number);
    if (!channels || channels.length !== 3) {
      throw new Error(`Unexpected computed colour: ${color}`);
    }
    const [red, green, blue] = channels.map((value) => {
      const normalized = value / 255;
      return normalized <= 0.04045
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  };
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

test.beforeAll(() => mkdirSync(screenshotDirectory, { recursive: true }));

async function setTheme(
  page: Page,
  theme: (typeof themes)[number],
  width: number,
) {
  await page.goto("/");
  if (width < 1024) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("combobox", { name: "Choose colour theme" })
      .selectOption(theme);
    await page.getByRole("button", { name: "Close menu" }).click();
  } else {
    await page
      .getByRole("combobox", { name: "Choose colour theme" })
      .selectOption(theme);
  }
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
}

async function waitForEveryVisibleImage(page: Page) {
  const images = page.locator("img:visible");
  await expect(images).toHaveCount(9);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await image.evaluate((element: HTMLImageElement) => element.decode());
  }
  await expect(page.locator(".site-footer img")).toHaveJSProperty(
    "complete",
    true,
  );
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

for (const width of widths) {
  for (const theme of themes) {
    test(`${theme} complete homepage at ${width}px`, async ({ page }) => {
      test.setTimeout(60_000);
      await page.setViewportSize({
        width,
        height: width < 600 ? 844 : width < 1024 ? 1024 : 900,
      });
      await setTheme(page, theme, width);
      await waitForEveryVisibleImage(page);

      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        ),
        "horizontal overflow",
      ).toBe(false);
      await expect(page.locator(".home-service")).toHaveCount(6);
      await expect(page.locator(".home-process__list li")).toHaveCount(4);
      await expect(page.locator(".site-footer .brand-logo img")).toBeVisible();
      if (width <= 375) {
        for (const service of await page.locator(".home-service").all()) {
          const layout = await service.evaluate((element) => {
            const row = element.getBoundingClientRect();
            const image = element
              .querySelector(".home-service__media")!
              .getBoundingClientRect();
            const link = element
              .querySelector(".home-text-link")!
              .getBoundingClientRect();
            return {
              imageWidth: image.width,
              imageRatio: image.width / image.height,
              linkHeight: link.height,
              linkRight: link.right,
              rowRight: row.right,
            };
          });
          expect(layout.imageWidth).toBeGreaterThanOrEqual(115);
          expect(layout.imageRatio).toBeCloseTo(0.8, 1);
          expect(layout.linkHeight).toBeGreaterThanOrEqual(44);
          expect(layout.linkRight).toBeLessThanOrEqual(layout.rowRight + 1);
        }
      }
      await page.screenshot({
        path: `${screenshotDirectory}/home-${theme}-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
    });
  }
}

for (const theme of themes) {
  test(`${theme} axe checks for desktop and mobile menu`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await setTheme(page, theme, 1440);
    const desktop = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(desktop.violations).toEqual([]);

    await page.setViewportSize({ width: 390, height: 844 });
    const mobile = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(mobile.violations).toEqual([]);
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = await new AxeBuilder({ page })
      .include("#mobile-menu")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(menu.violations).toEqual([]);
  });

  test(`${theme} hover, focus and pressed feedback`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await setTheme(page, theme, 1440);
    const primary = page.locator(".home-hero .button--primary");
    const background = () =>
      primary.evaluate((element) => getComputedStyle(element).backgroundColor);
    const colors = () =>
      primary.evaluate((element) => {
        const style = getComputedStyle(element);
        return { foreground: style.color, background: style.backgroundColor };
      });
    const resting = await background();
    const restingColors = await colors();
    expect(
      contrastRatio(restingColors.foreground, restingColors.background),
    ).toBeGreaterThanOrEqual(4.5);
    await primary.hover();
    await expect.poll(background).not.toBe(resting);
    const hovering = await background();
    const hoverColors = await colors();
    expect(
      contrastRatio(hoverColors.foreground, hoverColors.background),
    ).toBeGreaterThanOrEqual(4.5);

    await page.keyboard.press("Tab");
    await primary.focus();
    await expect(primary).toHaveCSS("outline-style", "solid");

    const box = await primary.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.mouse.down();
    await expect
      .poll(() => primary.evaluate((element) => element.matches(":active")))
      .toBe(true);
    await expect.poll(background).not.toBe(hovering);
    const pressedColors = await colors();
    expect(
      contrastRatio(pressedColors.foreground, pressedColors.background),
    ).toBeGreaterThanOrEqual(4.5);
    await page.mouse.move(0, 0);
    await page.mouse.up();

    const secondary = page.locator(".home-hero .home-text-link");
    await secondary.hover();
    await expect(secondary).toHaveCSS("text-decoration-line", "underline");
    await secondary.focus();
    await expect(secondary).toHaveCSS("outline-style", "solid");
    const selector = page.getByRole("combobox", {
      name: "Choose colour theme",
    });
    await selector.focus();
    await expect(selector).toHaveCSS("outline-style", "solid");
  });

  test(`${theme} reduced motion leaves every chapter immediately available`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await setTheme(page, theme, 390);
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
    await expect(page.locator(".home-hero__copy-inner")).toHaveCSS(
      "animation-name",
      "none",
    );
    await expect(page.locator(".home-hero__media img")).toHaveCSS(
      "animation-name",
      "none",
    );
    await expect(page.locator(".home-hero__copy-inner")).toHaveCSS(
      "opacity",
      "1",
    );
  });

  test(`${theme} 200% zoom-equivalent reflow`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await setTheme(page, theme, 1440);
    const session = await page.context().newCDPSession(page);
    await session.send("Emulation.setDeviceMetricsOverride", {
      width: 720,
      height: 450,
      deviceScaleFactor: 2,
      mobile: false,
    });
    expect(await page.evaluate(() => window.innerWidth)).toBe(720);
    expect(await page.evaluate(() => window.devicePixelRatio)).toBe(2);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      ),
    ).toBe(false);
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      page.getByRole("dialog", { name: "Explore Kreative Sparq" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("dialog", { name: "Explore Kreative Sparq" }),
    ).toBeHidden();
    await session.send("Emulation.clearDeviceMetricsOverride");
    await session.detach();
  });
}
