import { BasePage } from '../../../../../common-classes';

import { Page } from '@playwright/test';

class StatePanelsDesignerPage extends BasePage {
  constructor(page: Page) {
    super(page, '/conf/state-panels/design');

    // this.rtmpPage = new RtmpObjectPage(this.page, this.table);
  }
}

export default StatePanelsDesignerPage;
