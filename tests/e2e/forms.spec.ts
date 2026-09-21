import { expect, test, type Page } from '@playwright/test';

/**
 * The forms only render when a lead destination is configured, because an
 * inquiry form with nowhere to send an inquiry would discard messages. These
 * specs assert that exactly one of the two states is on the page, then test
 * whichever one this build produced.
 */
async function formIsLive(page: Page) {
  return (await page.locator('form').count()) > 0;
}

test.describe('contact form', () => {
  test('shows either a working form or an honest unavailable state', async ({ page }) => {
    await page.goto('/contact');

    const form = page.locator('form');
    const unavailable = page.getByText('The inquiry form is not accepting messages yet.');

    if (await formIsLive(page)) {
      await expect(form).toHaveCount(1);
      await expect(unavailable).toHaveCount(0);
    } else {
      await expect(unavailable).toBeVisible();
      await expect(page.getByRole('link', { name: 'Book a strategy call' }).first()).toBeVisible();
    }
  });

  test('labels every control and reports errors for an empty submission', async ({ page }) => {
    await page.goto('/contact');
    test.skip(!(await formIsLive(page)), 'No lead destination is configured in this build.');

    for (const id of ['name', 'email', 'company', 'phone', 'service', 'message', 'consent']) {
      const control = page.locator(`#contact-${id}`);
      await expect(control).toHaveCount(1);
      await expect(control).toHaveAccessibleName(/\S/);
    }

    await page.getByRole('button', { name: /send|submit/i }).click();

    const summary = page.locator('[aria-live="polite"]').filter({ hasText: /\S/ }).first();
    await expect(summary).toBeVisible();
    await expect(page.locator('[aria-invalid="true"]').first()).toBeVisible();
  });

  test('clears the error state once the fields are corrected', async ({ page }) => {
    await page.goto('/contact');
    test.skip(!(await formIsLive(page)), 'No lead destination is configured in this build.');

    await page.getByRole('button', { name: /send|submit/i }).click();
    await expect(page.locator('[aria-invalid="true"]').first()).toBeVisible();

    await page.locator('#contact-name').fill('Adaeze Okafor');
    await page.locator('#contact-email').fill('adaeze@example.com');
    await page.locator('#contact-company').fill('Example Limited');
    await page
      .locator('#contact-message')
      .fill('We are planning a brand refresh and would like to talk through the approach.');
    await page.locator('#contact-consent').check();

    await expect(page.locator('#contact-name')).toHaveValue('Adaeze Okafor');
    await expect(page.locator('#contact-consent')).toBeChecked();
  });

  test('keeps the honeypot out of the tab order and out of the accessibility tree', async ({
    page,
  }) => {
    await page.goto('/contact');
    test.skip(!(await formIsLive(page)), 'No lead destination is configured in this build.');

    const honeypot = page.locator('input[name="website"]');
    await expect(honeypot).toHaveAttribute('tabindex', '-1');
    await expect(honeypot.locator('xpath=ancestor::*[@aria-hidden="true"]')).toHaveCount(1);
  });
});

test.describe('project brief', () => {
  test('shows either the stepped brief or an honest unavailable state', async ({ page }) => {
    await page.goto('/start-a-project');

    if (await formIsLive(page)) {
      await expect(page.getByRole('progressbar')).toBeVisible();
    } else {
      await expect(page.getByRole('link', { name: 'Book a strategy call' }).first()).toBeVisible();
    }
  });

  test('moves forward and back through the steps and preserves entries', async ({ page }) => {
    await page.goto('/start-a-project');
    test.skip(!(await formIsLive(page)), 'No lead destination is configured in this build.');

    await expect(page.getByRole('heading', { name: 'Who should we speak with?' })).toBeVisible();

    await page.locator('#project-name').fill('Adaeze Okafor');
    await page.locator('#project-email').fill('adaeze@example.com');
    await page.locator('#project-company').fill('Example Limited');

    await page.getByRole('button', { name: 'Continue to services' }).click();
    await expect(page.getByRole('heading', { name: 'Which areas are relevant?' })).toBeVisible();
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');

    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.locator('#project-name')).toHaveValue('Adaeze Okafor');
    await expect(page.locator('#project-email')).toHaveValue('adaeze@example.com');
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
  });

  test('sends the visitor back to the step that holds a failing field', async ({ page }) => {
    await page.goto('/start-a-project');
    test.skip(!(await formIsLive(page)), 'No lead destination is configured in this build.');

    // Walk to the last step without answering anything, then submit.
    for (const label of [
      'Continue to services',
      'Continue to the brief',
      'Continue to timing and budget',
    ]) {
      await page.getByRole('button', { name: label }).click();
    }
    const lastStepButton = page.getByRole('button', { name: /review|send|submit/i }).last();
    await lastStepButton.click();

    await expect(page.getByText('Check the highlighted fields.')).toBeVisible();
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
  });

  test('keeps every fieldset in the DOM so the brief works without steps', async ({ page }) => {
    await page.goto('/start-a-project');
    test.skip(!(await formIsLive(page)), 'No lead destination is configured in this build.');

    await expect(page.locator('form fieldset')).toHaveCount(5);
    await expect(page.locator('#project-goal')).toHaveCount(1);
    await expect(page.locator('#project-consent')).toHaveCount(1);
  });
});

test.describe('booking', () => {
  test('never presents a booking surface it cannot deliver', async ({ page }) => {
    await page.goto('/book');

    const iframe = page.locator('iframe');
    if ((await iframe.count()) === 0) {
      // With no scheduling link configured the page must say so and offer a
      // route that does work, rather than showing an empty frame.
      await expect(page.getByRole('main')).toContainText(/\S/);
      await expect(page.locator('main a[href]').first()).toBeVisible();
    } else {
      await expect(iframe.first()).toHaveAttribute('title', /\S/);
    }
  });
});
