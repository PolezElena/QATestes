import { HlsPage, MpegDashPage, RtmpObjectPage } from './pages';

import { BasePage, PageWithTable } from '../../../../common-classes';
import { moveFromCardToSpecificPage } from '../../../../utils';
import { IPageFromCard, IPageWithTable } from '../../../../types';

import { Page } from '@playwright/test';

class MonitoringObjectPage extends BasePage implements IPageFromCard, IPageWithTable {
  public readonly cardPageSelector: string = 'handleRedirectToMonitoringObjects';

  public readonly table: PageWithTable;
  public readonly tableSelector: string = 'objects-monitoring-list';
  public readonly apiTableUrl: string = '/api/Probe/MonitoringObject/Find';

  public readonly hlsPage: HlsPage;
  public readonly rtmpPage: RtmpObjectPage;
  public readonly mpegDashPage: MpegDashPage;

  constructor(page: Page) {
    super(page, '/conf/monitoring-objects');

    this.table = new PageWithTable(page, this.tableSelector);

    this.hlsPage = new HlsPage(page, this.table);
    this.mpegDashPage = new MpegDashPage(page, this.table);
    this.rtmpPage = new RtmpObjectPage(this.page, this.table);
  }

  async moveFromCardToPage() {
    await moveFromCardToSpecificPage(this.page, this.cardPageSelector, this.apiTableUrl);
  }
}

export default MonitoringObjectPage;
