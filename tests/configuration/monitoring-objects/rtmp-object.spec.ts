import { ConfigurationCardPage, LoginPage } from '../../../pages';
import { OVERRIDE_SYSTEM_USERS, getLoginFromOverrideUserItem } from '../../../utils';

import { test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

OVERRIDE_SYSTEM_USERS.forEach(async (overrideUser) => {
  test(`Full route for adding RTMP object: "${getLoginFromOverrideUserItem(overrideUser)}"`, async ({ page }) => {
    const loginPage = new LoginPage(page, overrideUser);
    const confPage = new ConfigurationCardPage(page);

    await loginPage.redirectToRoot();
    await loginPage.form.fillForm();
    await loginPage.form.skipValidate();

    await confPage.moveToPage();

    await confPage.monitoringObjectPage.moveFromCardToPage();
    await confPage.monitoringObjectPage.rtmpPage.createObject();
  });
});
