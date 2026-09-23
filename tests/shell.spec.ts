import { expect, test } from "@playwright/test";

test("global shell, theme persistence, system preference, and assets", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page).toHaveTitle(
    "Kreative Sparq | Strategy, Creative & Digital Marketing",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "en-NG");
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Ideas that move people. Marketing that moves business.",
  );
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  const theme = page.getByRole("combobox", { name: "Choose colour theme" });
  await theme.selectOption("dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator(".site-header .brand-logo__dark")).toBeVisible();
  await expect(
    page.locator('meta[name="theme-color"][data-live-theme]'),
  ).toHaveAttribute("content", "#1A2421");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("combobox", { name: "Choose colour theme" }),
  ).toHaveValue("dark");

  await page
    .getByRole("combobox", { name: "Choose colour theme" })
    .selectOption("system");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  for (const asset of [
    "/favicon.svg",
    "/favicon.ico",
    "/site.webmanifest",
    "/icon-192.png",
    "/icon-512.png",
  ]) {
    const response = await page.request.get(asset);
    expect(response.ok(), asset).toBeTruthy();
  }

  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBeFalsy();
});

test("mobile menu keyboard flow, focus return, scroll lock, and width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const trigger = page.getByRole("button", { name: "Open menu" });
  await expect(
    page.getByRole("dialog", { name: "Explore Kreative Sparq" }),
  ).toBeHidden();
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "Explore Kreative Sparq" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  await expect(page.locator("body")).toHaveClass(/mobile-menu-open/);
  await expect(
    page.getByRole("navigation", { name: "Mobile primary" }).getByRole("link"),
  ).toHaveCount(5);

  await page
    .getByRole("combobox", { name: "Choose colour theme" })
    .selectOption("dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Close menu" }).focus();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Explore Kreative Sparq" }),
  ).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveClass(/mobile-menu-open/);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBeFalsy();

  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBeFalsy();
});
