import { test, expect } from '@playwright/test';
import { PlanetsPage } from '../pages/planets.page';

// Navigate to Planets Page
test.beforeEach(async ({ page }) => {
    await page.goto('https://d18u5zoaatmpxx.cloudfront.net/');
    await page.locator('span:has-text("Planets")').click();
    await expect(page).toHaveURL('https://d18u5zoaatmpxx.cloudfront.net/#/planets');
});

test('Click Explore Button', async ({ page }) => {
    // Get all Planets
    const cards = await page.locator('h2');
    const planet = "Earth";
    let index = 0;

    for (let i = 0; i < await cards.count(); i++) {
        // Once planet is found, obtain the index for nth-match
        if (await cards.nth(i).innerText() == planet) {
            index = i + 1;
        }
    }
    // Use nth match to click on the corresponding Explore button
    await page.locator('button >> nth='+index).click();

    // Assert
    await expect(page.locator('text=Exploring '+planet)).toBeVisible();
    await expect(page.locator('div.popup-message')).toHaveText('Exploring '+planet);
});

test('Find the furthest planet', async ({ page }) => {
    //Get all Planets' distances
    const distances = await page.locator('dd.distance');
    let furthestDistance = 0;
    let index = 0;

    // Go through all distances
    for (let i = 0; i < await distances.count(); i++) {
        
        // Convert the distance text to a number and find the furthest distance
        let distance = parseInt(await (await distances.nth(i).innerText()).slice(0,-3).replace(/,/g,''));
        if (distance > furthestDistance) {
            furthestDistance = distance;
            index = i+1;
        }
    }
    await page.locator('button >> nth='+index).click();

    // Assert
    await expect(page.locator('div.popup-message')).toHaveText('Exploring Neptune');
});

test.skip('Click Explore button using POM', async ({ page }) => {
    const mypage = new PlanetsPage(page);
    await mypage.getPlanetName('Earth');
});