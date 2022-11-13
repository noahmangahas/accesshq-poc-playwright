import { expect, Locator, Page } from '@playwright/test';

export class PlanetsPage {
    readonly page: Page;
    readonly planetNames: Locator;
    readonly planetDistances: Locator;
    readonly exploreButtons: Locator;


    constructor(page: Page) {
        let index = 0;
        this.page = page;
        this.planetNames = page.locator('h2');
        this.planetDistances = page.locator('dd.distance');
        this.exploreButtons = page.locator('button >> nth='+index);
    }

    async getPlanetName(planet:string) {
        let index = 0;
        for (let i = 0; i < await this.planetNames.count(); i++) {
            if (await this.planetNames.nth(i).innerText() == planet) {
                index = i + 1;
            }
        }
        this.clickExplore(index);
    }

    async clickExplore(index:number) {
        this.exploreButtons.click();
    }
}