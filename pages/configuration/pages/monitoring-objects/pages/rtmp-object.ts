import { BasePage, PageWithForm, PageWithTable } from '../../../../../common-classes';
import {
  FormItem,
  TableItemPrimaryInfo,
  FormItemType,
  IBasePage,
  IPageWithForm,
  IPageWithTableBasic,
} from '../../../../../types';

import { Locator, Page } from '@playwright/test';
import { ComponentDataAttributeEnum } from '../../../../../utils';

class RtmpObjectPage extends BasePage implements IBasePage, IPageWithTableBasic, IPageWithForm {
  public readonly table: PageWithTable | undefined;
  public readonly apiDeleteUrl: string = '/api/Probe/MonitoringObject/DeleteMany';
  public readonly tableItemPrimaryInfo: TableItemPrimaryInfo = {
    name: 'name',
    value: 'EL RTMP AUTOTEST',
  };

  public readonly form: PageWithForm;
  public readonly formSelector: string = 'RTMPConf';
  public readonly apiFormSubmitUrl: string = '/api/Probe/EthernetTransport/ApplyRealTime';

  public readonly formItems: FormItem[] = [
    {
      ...this.tableItemPrimaryInfo,
      type: FormItemType.TEXT_FIELD,
    },
    {
      name: 'url',
      value: 'rtmp://rtmp.elektrika.cz/live/myStream.sdp',
      type: FormItemType.TEXT_FIELD,
    },
    {
      name: 'nodeIDs',
      value: 2,
      type: FormItemType.SELECT,
    },
    {
      name: 'presetProbeID',
      value: 161,
      type: FormItemType.SELECT,
    },
    {
      name: 'presetAlarmID',
      value: 101,
      type: FormItemType.SELECT,
    },
    {
      name: 'presetRecordingID',
      value: 21,
      type: FormItemType.SELECT,
    },
  ];

  constructor(page: Page, table: PageWithTable | undefined) {
    super(page, '/conf/monitoring-objects/rtmp/create');

    this.table = table;
    this.form = new PageWithForm(page, this.formSelector, this.formItems, this.apiFormSubmitUrl);
  }

  async moveToCreatePage() {
    const createButton: Locator = this.page.locator(`[${ComponentDataAttributeEnum.BUTTON}="handleOpenObjectMenu"]`);
    await createButton.click();

    const createObjectButton: Locator = this.page.locator(`[${ComponentDataAttributeEnum.BUTTON}="handleCreateRtmp"]`);
    await createObjectButton.click();
  }

  async createObject() {
    await this.table?.checkForExistingRecordInTable(this.tableItemPrimaryInfo, this.apiDeleteUrl);

    await this.moveToCreatePage();

    await this.form.fillForm();
    await this.form.submitForm();
  }

  async directCreateObject() {
    await this.redirectToPage();
    await this.form.fillForm();
    await this.form.submitForm();
  }
}

export default RtmpObjectPage;
