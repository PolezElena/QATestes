import { Locator, Page } from '@playwright/test';
import { BasePage, PageWithForm, PageWithTable } from '../../../../../common-classes';
import {
  FormItem,
  FormItemType,
  IBasePage,
  IPageWithForm,
  IPageWithTableBasic,
  TableItemPrimaryInfo,
  WaitForApiResponseItem,
} from '../../../../../types';
import { ComponentDataAttributeEnum, OK_VALIDATE_STATUS } from '../../../../../utils';

class HlsPage extends BasePage implements IBasePage, IPageWithTableBasic, IPageWithForm {
  public readonly table: PageWithTable | undefined;
  public readonly apiDeleteUrl: string = '/api/Probe/MonitoringObject/DeleteMany';
  public readonly tableItemPrimaryInfo: TableItemPrimaryInfo = {
    name: 'name',
    value: 'EL HLS AUTOTEST',
  };

  public readonly form: PageWithForm;
  public readonly formSelector: string = 'HlsConf';
  public readonly apiFormSubmitUrl: string = '/api/Probe/EthernetTransport/Apply';
  public readonly waitForApiResponse: WaitForApiResponseItem[] = [
    { url: '/api/Probe/OTTProbe/GetHlsSourceMetadata', status: OK_VALIDATE_STATUS },
  ];

  public readonly formItems: FormItem[] = [
    {
      ...this.tableItemPrimaryInfo,
      type: FormItemType.TEXT_FIELD,
    },
    {
      name: 'url',
      value: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: FormItemType.TEXT_FIELD,
    },
    {
      name: 'nodeIDs',
      value: 2,
      type: FormItemType.SELECT,
    },
    {
      name: 'presetProbeID',
      value: 21,
      type: FormItemType.SELECT,
    },
    {
      name: 'presetAlarmID',
      value: 301,
      type: FormItemType.SELECT,
    },
  ];

  constructor(page: Page, table: PageWithTable | undefined) {
    super(page, '/conf/monitoring-objects/hls/create');

    this.table = table;
    this.form = new PageWithForm(page, this.formSelector, this.formItems, this.apiFormSubmitUrl);
  }

  async moveToCreatePage() {
    const createButton: Locator = this.page.locator(`[${ComponentDataAttributeEnum.BUTTON}="handleOpenObjectMenu"]`);
    await createButton.click();

    const createObjectButton: Locator = this.page.locator(`[${ComponentDataAttributeEnum.BUTTON}="handleCreateHls"]`);
    await createObjectButton.click();
  }

  async createObject() {
    await this.table?.checkForExistingRecordInTable(this.tableItemPrimaryInfo, this.apiDeleteUrl);

    await this.moveToCreatePage();
    await this.form.fillForm({ waitForApiResponse: this.waitForApiResponse });
    await this.form.submitForm({ waitForApiResponse: this.waitForApiResponse });
  }

   async directCreateObject() {
    await this.redirectToPage();
    await this.form.fillForm({ waitForApiResponse: this.waitForApiResponse });
    await this.form.submitForm({ waitForApiResponse: this.waitForApiResponse });
  }

}

export default HlsPage;
