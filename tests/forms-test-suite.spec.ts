import { test, expect } from '@playwright/test';

// Open Web Playground
test.beforeEach(async ({ page }) => {
    await page.goto('https://d18u5zoaatmpxx.cloudfront.net/');
});

test('Find Login Link',async ({ page }) => {
    // Click on the Login button
    await page.locator('text=person').click();
    await expect(page.locator('div[role="document"] header >> text=Login')).toBeVisible();
});

test('Toast message on Form submit', async ({ page }) => {
    // Navigate to Forms page
    await page.locator('span:has-text("Forms")').click();
    await expect(page).toHaveURL('https://d18u5zoaatmpxx.cloudfront.net/#/forms');
    await expect(page.locator('div[role="tab"] >> text=Modern')).toHaveClass('v-tab v-tab--active');

    // Fill up the form
    await page.locator('input[name="name"]').fill('Noah');
    await page.locator('input[name="email"]').fill('noah@email.com');
    await page.locator('#state').click();
    await page.locator('text=NSW').click();
    await page.locator('text=Do you agree?').click();

    // Click Submit button
    await page.locator('button:has-text("submit")').click();

    // Validate Toast message appears
    await expect(page.locator('text=Thanks for your feedback Noah')).toBeVisible();
});