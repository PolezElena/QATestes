import { BasePage, PageWithForm, PageWithTable } from '../../../../../common-classes';
import {
  FormItem,
  TableItemPrimaryInfo,
  FormItemType,
  IBasePage,
  IPageWithForm,
  IPageWithTableBasic,
  WaitForApiResponseItem,
} from '../../../../../types';
import { ComponentDataAttributeEnum, OK_VALIDATE_STATUS } from '../../../../../utils';

import { Locator, Page } from '@playwright/test';

class MpegDashPage extends BasePage implements IBasePage, IPageWithTableBasic, IPageWithForm {
  public readonly table: PageWithTable | undefined;
  public readonly apiDeleteUrl: string = '/api/Probe/MonitoringObject/DeleteMany';
  public readonly tableItemPrimaryInfo: TableItemPrimaryInfo = {
    name: 'name',
    value: 'EL MPEG-DASH AUTOTEST',
  };

  public readonly form: PageWithForm;
  public readonly formSelector: string = 'MpegDashConfForm';
  public readonly apiFormSubmitUrl: string = '/api/Probe/EthernetTransport/Apply';
  public readonly waitForApiResponse: WaitForApiResponseItem[] = [
    { url: '/api/Probe/OTTProbe/GetMpdSourceMetadata', status: OK_VALIDATE_STATUS },
  ];

  public readonly formItems: FormItem[] = [
    {
      ...this.tableItemPrimaryInfo,
      type: FormItemType.TEXT_FIELD,
    },
    {
      name: 'url',
      value: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd',
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
      value: 302,
      type: FormItemType.SELECT,
    },
  ];

  constructor(page: Page, table: PageWithTable | undefined) {
    super(page, '/conf/monitoring-objects/mpeg-dash/create');

    this.table = table;
    this.form = new PageWithForm(page, this.formSelector, this.formItems, this.apiFormSubmitUrl);
  }

  async moveToCreatePage() {
    const createButton: Locator = this.page.locator(`[${ComponentDataAttributeEnum.BUTTON}="handleOpenObjectMenu"]`);
    await createButton.click();

    const createObjectButton: Locator = this.page.locator(
      `[${ComponentDataAttributeEnum.BUTTON}="handleCreateMpegDash"]`,
    );
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

export default MpegDashPage;
