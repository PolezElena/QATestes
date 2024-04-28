import { AdministrationCardPage, LoginPage } from '../../pages';
import { OVERRIDE_SYSTEM_USERS, getLoginFromOverrideUserItem } from '../../utils';

import { test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

OVERRIDE_SYSTEM_USERS.forEach(async (overrideUser) => {
  test(`Full route for adding department object: "${getLoginFromOverrideUserItem(overrideUser)}"`, async ({ page }) => {
    const loginPage = new LoginPage(page, overrideUser);
    const adminPage = new AdministrationCardPage(page);

    await loginPage.redirectToRoot();
    await loginPage.form.fillForm();
    await loginPage.form.skipValidate();

    await adminPage.moveToPage();

    await adminPage.departmentsPage.moveFromCardToPage();
    await adminPage.departmentsPage.createObject();
  });
});
