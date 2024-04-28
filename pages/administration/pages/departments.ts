import { BasePage, PageWithForm, PageWithTable } from '../../../common-classes';
import {
  FormItem,
  TableItemPrimaryInfo,
  FormItemType,
  IPageFromCard,
  IPageWithForm,
  IPageWithTable,
} from '../../../types';
import { ComponentDataAttributeEnum, moveFromCardToSpecificPage } from '../../../utils';

import { Locator, Page } from '@playwright/test';

class DepartmentsPage extends BasePage implements IPageFromCard, IPageWithTable, IPageWithForm {
  public readonly cardPageSelector: string = 'handleRedirectToDepartments';

  public readonly table: PageWithTable;
  public readonly tableSelector: string = 'departmentTable';
  public readonly apiTableUrl: string = '/api/Admin/Department/Find';
  public readonly apiDeleteUrl: string = '/api/Admin/Department/Delete';
  public readonly tableItemPrimaryInfo: TableItemPrimaryInfo = {
    name: 'name',
    value: 'EL DEPARTMENT AUTOTEST',
  };

  public readonly form: PageWithForm;
  public readonly formSelector: string = 'DepartmentItem';
  public readonly apiFormSubmitUrl: string = '/api/Admin/Department/Apply';
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

  constructor(page: Page) {
    super(page, '/admin/departments');

    this.table = new PageWithTable(page, this.tableSelector);
    this.form = new PageWithForm(page, this.formSelector, this.formItems, this.apiFormSubmitUrl);
  }

  async moveFromCardToPage() {
    await moveFromCardToSpecificPage(this.page, this.cardPageSelector, this.apiTableUrl);
  }

  async moveToCreatePage() {
    const createButton: Locator = this.page.locator(`[${ComponentDataAttributeEnum.BUTTON}="handleCreateEntity"]`);
    await createButton.click();
  }

  async createObject() {
    await this.table.checkForExistingRecordInTable(this.tableItemPrimaryInfo, this.apiDeleteUrl);

    await this.moveToCreatePage();
    await this.form.fillForm();
    await this.form.submitForm();
  }

  async directCreateObject() {
    await this.redirectToPage();
    await this.form.submitForm();
  }
}

export default DepartmentsPage;
