import { TableItemPrimaryInfo } from '../types';
import { ComponentDataAttributeEnum } from '../utils';

import { Locator, Page } from '@playwright/test';

class PageWithTable {
  private readonly page: Page;

  private readonly tableSelector: string;

  constructor(page: Page, tableSelector: string) {
    this.page = page;

    this.tableSelector = tableSelector;
  }

  async deleteExistingTableRecord(existingRow: Locator, apiDeleteUrl: string | undefined) {
    const rowMenuButton: Locator = existingRow.locator(`[${ComponentDataAttributeEnum.BUTTON}="handleToggleRowMenu"]`);
    await rowMenuButton.click();

    const deleteButton: Locator = existingRow.locator(`[${ComponentDataAttributeEnum.BUTTON}="handleDeleteEntity"]`);
    await deleteButton.click();

    const confirmDeleteButton: Locator = this.page.locator(`[${ComponentDataAttributeEnum.BUTTON}="handleSaveEntity"]`);
 
    //PDV
    //await confirmDeleteButton.click();

    if (apiDeleteUrl) {
      const response = this.page.waitForResponse(
        (resp) => resp.url().includes(apiDeleteUrl) && (resp.status() === 200 || resp.status() === 204),
        );

        //PDV-LENA
        await confirmDeleteButton.click();

        //PDV-LENA
        await response;
    }

    console.log('page-with-tables.ts: deleteExistingTableRecord: Old object has been deleted');
  }

  async getLoadedTableElement(): Promise<Locator> {
    const tableElement: Locator = this.page.locator(`[${ComponentDataAttributeEnum.TABLE}="${this.tableSelector}"]`);
    const isTableVisible: boolean = (await tableElement.count()) > 0;

    const tableLoader: Locator = tableElement.locator(`[${ComponentDataAttributeEnum.LOADER}]`);
    await tableLoader.waitFor({ state: 'detached' });

    if (!isTableVisible) {

      throw new Error('Table not found');
    }

    return tableElement;
  }

  async getRowsInLoadedTableByItemInfo(tableElement: Locator, primaryItemInfo: TableItemPrimaryInfo): Promise<Locator> {
    const allTableRows: Locator = tableElement.locator(`[${ComponentDataAttributeEnum.TABLE_ROW}]`);

    const existingRows: Locator = allTableRows.filter({
      has: this.page.locator(`[${ComponentDataAttributeEnum.TABLE_CELL}="${primaryItemInfo.name}"]`).filter({
        hasText: primaryItemInfo.value.toString(),
      }),
    });

    return existingRows;
  }

  async deleteExistingRows(existingRows: Locator, apiDeleteUrl: string | undefined) {
    const elementsCount: number = await existingRows.count();

    console.log('page-with-tables.ts: deleteExistingRows: objects with the same name: ', elementsCount);

    if (elementsCount > 0) {
      const rowsLocators: Locator[] = await existingRows.all();

      for (const row of rowsLocators) {
        const recordID: string | null = await row.getAttribute(ComponentDataAttributeEnum.TABLE_ROW);
        await this.deleteExistingTableRecord(row, apiDeleteUrl);

        console.log('page-with-tables.ts: deleteExistingRows: Deleted object with id: ', recordID);
      }
    }
  }

  async checkForExistingRecordInTable(primaryItemInfo: TableItemPrimaryInfo, apiDeleteUrl?: string) {
    console.log('page-with-tables.ts: checkForExistingRecordInTable: Looking for object: ', primaryItemInfo);

    const tableElement: Locator = await this.getLoadedTableElement();
    const existingRows: Locator = await this.getRowsInLoadedTableByItemInfo(tableElement, primaryItemInfo);

    await this.deleteExistingRows(existingRows, apiDeleteUrl);
/*
    try{

      console.log('checkForExistingRecordInTable first try');
      const tableElement: Locator = await this.getLoadedTableElement();
      const existingRows: Locator = await this.getRowsInLoadedTableByItemInfo(tableElement, primaryItemInfo);

      await this.deleteExistingRows(existingRows, apiDeleteUrl);
    }
    catch{

      console.log('checkForExistingRecordInTable second try');
      const tableElement: Locator = await this.getLoadedTableElement();
      const existingRows: Locator = await this.getRowsInLoadedTableByItemInfo(tableElement, primaryItemInfo);

      await this.deleteExistingRows(existingRows, apiDeleteUrl);
    }
    finally{

    }*/
  }
}

export default PageWithTable;
