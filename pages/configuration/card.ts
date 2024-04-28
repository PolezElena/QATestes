import { MonitoringObjectPage, StatePanelsPage } from './pages';

import { CardPage } from '../../common-classes';

import { Page } from '@playwright/test';

class ConfigurationCardPage extends CardPage {
  public readonly monitoringObjectPage: MonitoringObjectPage;
  public readonly statePanelsPage: StatePanelsPage;

  constructor(page: Page) {
    super(page, '/conf', 'handleRedirectToConfiguration');

    this.monitoringObjectPage = new MonitoringObjectPage(page);
    this.statePanelsPage = new StatePanelsPage(page);
  }
}

export default ConfigurationCardPage;
