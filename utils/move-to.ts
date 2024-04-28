import { ComponentDataAttributeEnum } from './data-attributes';

import { Locator, Page, expect } from '@playwright/test';


export const moveToCardPage = async (page: Page, cardPageSelector: string) => {
  const leftMenuButton: Locator = page.locator(`[${ComponentDataAttributeEnum.BUTTON}="handleOpenLeftMenu"]`);
  const configurationButton: Locator = page.locator(`[${ComponentDataAttributeEnum.BUTTON}="${cardPageSelector}"]`);

  await expect(leftMenuButton).toBeVisible();

  if (!configurationButton.isVisible()) {
    await leftMenuButton.click();
  }

  await expect(configurationButton).toBeVisible();
  await configurationButton.click();
};


export const moveFromCardToSpecificPage = async (page: Page, pageSelector: string, fetchUrl?: string) => {
  const cardButton: Locator = page.locator(`[${ComponentDataAttributeEnum.BUTTON}="${pageSelector}"]`);

  await expect(cardButton).toBeVisible();

  //PDV
  //await cardButton.click();

  if(fetchUrl){


    console.log('move-to.ts: moveFromCardToSpecificPage: fetching. URL=', fetchUrl);
    //await page.reload();//PDV

    const responsePromise = page.waitForResponse(resp => resp.url().includes(fetchUrl) && (resp.status() === 200 || resp.status() === 204));
    

    await cardButton.click(); //PDV-LENA
    await responsePromise;//PDV-LENA
  }
  
};
