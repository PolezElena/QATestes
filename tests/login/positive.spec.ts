import { LoginPage } from '../../pages';
import { OVERRIDE_SYSTEM_USERS, getLoginFromOverrideUserItem } from '../../utils';

import { test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

OVERRIDE_SYSTEM_USERS.forEach(async (overrideUser) => {
  test(`Authorization for user: "${getLoginFromOverrideUserItem(overrideUser)}"`, async ({ page }) => {
    const loginPage = new LoginPage(page, overrideUser);

    await loginPage.redirectToRoot();
    await loginPage.form.fillForm();
    await loginPage.form.submitForm();
  });
});

/*
OVERRIDE_SYSTEM_USERS.forEach(async (overrideUser) => {
  test(`Authorization for user: "${getLoginFromOverrideUserItem(overrideUser)}"`, async ({ page }) => {
    const loginPage = new LoginPage(page, overrideUser);

    await loginPage.redirectToRoot();
    await loginPage.form.fillFormAndSubmit();
  });
});

*/