import { expect, test } from "@playwright/test";

const routeHeroes = [
  ["/services", "services-overview-hero.webp"],
  ["/work", "work-hero.webp"],
  ["/about", "about-hero.webp"],
  ["/insights", "insights-hero.webp"],
  ["/contact", "contact-hero.webp"],
  ["/privacy", "legal-shared-hero.webp"],
  ["/terms", "legal-shared-hero.webp"],
] as const;

test.describe("Editorial Image Pack v3", () => {
  for (const [route, filename] of routeHeroes) {
    test(`${route} uses its decorative optimized hero`, async ({ page }) => {
      await page.goto(route);
      const hero = page.locator("main .editorial-image-hero").first();
      await expect(hero).toBeVisible();
      const image = hero.locator(".editorial-hero-media img");
      await expect(image).toHaveCount(1);
      await expect(image).toHaveAttribute("alt", "");
      await expect(hero.locator(".editorial-hero-media")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      await expect(image).toHaveAttribute("src", new RegExp(filename));
      await expect
        .poll(() =>
          image.evaluate(
            (element) =>
              element instanceof HTMLImageElement &&
              element.complete &&
              element.naturalWidth > 0,
          ),
        )
        .toBe(true);
    });
  }

  test("service detail heroes reuse one approved service image", async ({
    page,
  }) => {
    const routes = [
      "/services/brand-strategy",
      "/services/creative-design",
      "/services/content-social-media",
      "/services/performance-marketing",
      "/services/web-design-development",
      "/services/campaigns-activations",
    ];
    for (const route of routes) {
      await page.goto(route);
      const hero = page.locator(".service-detail-hero");
      await expect(hero.locator(".editorial-hero-media img")).toHaveCount(1);
      await expect(hero.locator(".service-detail-hero__photo")).toHaveCount(0);
    }
  });

  test("Content and Social uses v2 only in its two approved placements", async ({
    page,
  }) => {
    await page.goto("/services");
    const catalogueImage = page
      .locator(".services-catalogue__item")
      .filter({ hasText: "Content & Social Media" })
      .locator("img");
    await expect(catalogueImage).toHaveAttribute(
      "src",
      /service-content-social-v2\.webp/,
    );
    expect(
      await page
        .locator("main img")
        .evaluateAll((images) =>
          images.some((image) =>
            image.getAttribute("src")?.includes("service-content-social.webp"),
          ),
        ),
    ).toBe(false);

    await page.goto("/services/content-social-media");
    await expect(page.locator(".editorial-hero-media img")).toHaveAttribute(
      "src",
      /service-content-social-v2\.webp/,
    );
    expect(
      await page
        .locator("main img")
        .evaluateAll((images) =>
          images.some((image) =>
            image.getAttribute("src")?.includes("service-content-social.webp"),
          ),
        ),
    ).toBe(false);
  });

  test("support images stay decorative and load without layout overflow", async ({
    page,
  }) => {
    const supportRoutes = [
      ["/work", ".work-empty__index img"],
      ["/about", ".about-relationship__media img"],
      ["/insights", ".insights-prepublication__mark img"],
      ["/contact", ".contact-next__media img"],
    ] as const;
    for (const [route, selector] of supportRoutes) {
      await page.goto(route);
      const support = page.locator(selector);
      await expect(support).toHaveAttribute("alt", "");
      await expect(support).toHaveAttribute("aria-hidden", "true");
      await expect
        .poll(() =>
          support.evaluate(
            (element) =>
              element instanceof HTMLImageElement &&
              element.complete &&
              element.naturalWidth > 0,
          ),
        )
        .toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      ).toBe(true);
    }
  });

  test("homepage imagery and composition remain on the approved v1 set", async ({
    page,
  }) => {
    await page.goto("/");
    const sources = await page
      .locator("main img")
      .evaluateAll((images) =>
        images.map((image) => image.getAttribute("src") ?? ""),
      );
    expect(sources).toHaveLength(7);
    expect(
      sources.every((source) => source.includes("%2Fimages%2Fhome%2F")),
    ).toBe(true);
    expect(
      sources.some((source) => source.includes("%2Fimages%2Feditorial%2F")),
    ).toBe(false);
  });
});
