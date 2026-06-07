import { expect, test, type Page } from '@playwright/test';

async function open(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
}

test.describe('Poly Oil front smoke tests', () => {
  test('home page loads key sections', async ({ page }) => {
    await open(page, '/');

    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(/poly ?oil|polyoil/i);
    await expect(page.locator('#accueil')).toBeVisible();
    await expect(page.locator('#produits')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('SEO pages are reachable', async ({ page }) => {
    await open(page, '/huile-moteur-tunisie');
    await expect(page).toHaveURL('/huile-moteur-tunisie');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await open(page, '/lubrifiants-automobiles');
    await expect(page).toHaveURL('/lubrifiants-automobiles');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await open(page, '/eau-lave-glace');
    await expect(page).toHaveURL('/eau-lave-glace');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await open(page, '/contact');
    await expect(page).toHaveURL('/contact');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('contact form can be submitted', async ({ page }) => {
    await open(page, '/contact');

    await page.fill('#name', 'Playwright Test');
    await page.fill('#email', 'playwright@example.com');
    await page.fill('#subject', 'Test E2E');
    await page.fill('#message', 'Message envoye par Playwright.');

    let dialogMessage = '';
    page.once('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await page.getByRole('button', { name: /envoyer le message|send message/i }).click({ force: true });
    await expect.poll(() => dialogMessage.length).toBeGreaterThan(0);

    await expect(page.locator('#name')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
    await expect(page.locator('#subject')).toHaveValue('');
    await expect(page.locator('#message')).toHaveValue('');
  });
});
