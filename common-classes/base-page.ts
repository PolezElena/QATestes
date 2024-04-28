import { IBasePage } from '../types';
import { ROOT_PAGE_ADDRESS } from '../utils';

import { Page } from '@playwright/test';

class BasePage implements IBasePage {
  public readonly pagePath: string;

  protected readonly page: Page;

  constructor(page: Page, pagePath: string) {
    this.page = page;
    this.pagePath = pagePath;
  }

  async redirectToPage() {
    await this.page.goto(ROOT_PAGE_ADDRESS + this.pagePath);
  }
}

export default BasePage;
