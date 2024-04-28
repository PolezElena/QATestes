import { DepartmentsPage } from './pages';

import { CardPage } from '../../common-classes';

import { Page } from '@playwright/test';

class AdministrationCardPage extends CardPage {
  public readonly departmentsPage: DepartmentsPage;

  constructor(page: Page) {
    super(page, '/admin', 'handleRedirectToAdministration');

    this.departmentsPage = new DepartmentsPage(page);
  }
}

export default AdministrationCardPage;
