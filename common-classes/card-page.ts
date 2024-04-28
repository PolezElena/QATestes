import BasePage from './base-page';

import { moveToCardPage } from '../utils';

import { Page } from '@playwright/test';

class CardPage extends BasePage {
  public readonly pagePath: string;

  private readonly cardPageSelector: string;

  constructor(page: Page, pagePath: string, cardPageSelector: string) {
    super(page, pagePath);

    this.pagePath = pagePath;
    this.cardPageSelector = cardPageSelector;
  }

  async moveToPage() {
    await moveToCardPage(this.page, this.cardPageSelector);
  }
}

export default CardPage;
