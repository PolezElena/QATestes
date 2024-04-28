import { StatePanelsDesignerPage } from './pages';

import { BasePage, PageWithForm, PageWithTable } from '../../../../common-classes';
import { ComponentDataAttributeEnum, moveFromCardToSpecificPage } from '../../../../utils';
import {
  FormItem,
  FormItemType,
  IPageFromCard,
  IPageWithForm,
  IPageWithTable,
  TableItemPrimaryInfo,
} from '../../../../types';

import { Locator, Page } from '@playwright/test';
//import { url } from 'inspector'; //PDV-LENA

class StatePanelsPage extends BasePage implements IPageFromCard, IPageWithTable, IPageWithForm {
  public readonly cardPageSelector: string = 'handleRedirectToStatePanels';

  public readonly table: PageWithTable;
  public readonly tableSelector: string = 'confStatePanelListTable';
  public readonly apiTableUrl: string = '/api/Frontend/StatePanel/Find';
  public readonly apiDeleteUrl: string = '/api/Frontend/StatePanel/Delete';
  public readonly tableItemPrimaryInfo: TableItemPrimaryInfo = {
    name: 'name',
    value: 'EL STATE PANEL AUTOTEST',
    isButton: true,
  };

  public readonly form: PageWithForm;
  public readonly formSelector: string = 'PanelSetForm';
  public readonly apiFormSubmitUrl: string = '/api/Frontend/StatePanel/Apply';
  public readonly formItems: FormItem[] = [
    {
      ...this.tableItemPrimaryInfo,
      type: FormItemType.TEXT_FIELD,
    },
    {
      name: 'description',
      value: 'AUTO GENERATED OBJECT',
      type: FormItemType.TEXTAREA_FIELD,
    },
  ];

  public readonly designerPage: StatePanelsDesignerPage;

  constructor(page: Page) {
    super(page, '/conf/state-panels');

    this.table = new PageWithTable(page, this.tableSelector);
    this.form = new PageWithForm(page, this.formSelector, this.formItems, this.apiFormSubmitUrl);

    this.designerPage = new StatePanelsDesignerPage(page);
  }

  async moveFromCardToPage() {
    await moveFromCardToSpecificPage(this.page, this.cardPageSelector, this.apiTableUrl);
  }

  async moveToCreatePage() {
    const createButton: Locator = this.page.locator(`[${ComponentDataAttributeEnum.BUTTON}="handleCreateEntity"]`);
    await createButton.click();
  }

  async createObjectSimple() {
    await this.table.checkForExistingRecordInTable(this.tableItemPrimaryInfo, this.apiDeleteUrl);

    await this.moveToCreatePage();
    await this.form.fillForm();
  }

 async directCreateObjectSimple() {
    await this.redirectToPage();
    await this.form.fillForm();
  } 

  async testObject() {
    await this.table.checkForExistingRecordInTable(this.tableItemPrimaryInfo, this.apiDeleteUrl);

    //await this.moveToCreatePage();
    await this.form.submitForm();
  }

 async directTestObject() {
    await this.redirectToPage();
    await this.form.submitForm();
  } 

/*  async createObject() {
    await this.table.checkForExistingRecordInTable(this.tableItemPrimaryInfo, this.apiDeleteUrl);

    await this.moveToCreatePage();
    await this.form.fillFormAndSubmit();
  }

 async directCreateObject() {
    await this.redirectToPage();
    await this.form.fillFormAndSubmit();
  } */

}

export default StatePanelsPage;
