import { LoginPage } from '../../pages';
import { OverrideFormItem } from '../../types';

import { test } from '@playwright/test';

const WRONG_USER: OverrideFormItem[] = [
  {
    name: 'login',
    value: 'wrong_user',
  },
  {
    name: 'password',
    value: 'wrong_password',
  },
];

const EMPTY_USER: OverrideFormItem[] = [
  {
    name: 'login',
    value: ' ',
    preSubmitValidation: {
      isValid: false,
    },
  },
  {
    name: 'password',
    value: ' ',
    preSubmitValidation: {
      isValid: false,
    },
  },
];

test.describe.configure({ mode: 'serial' });

test(`Authorization with incorrect user`, async ({ page }) => {
  const loginPage = new LoginPage(page, WRONG_USER);

  await loginPage.redirectToRoot();
  await loginPage.form.fillForm({
    submitValidation: {
      status: 400,
    },
  });
  await loginPage.form.submitForm()

});

test(`Authorization with empty form`, async ({ page }) => {
  const loginPage = new LoginPage(page, EMPTY_USER);

  await loginPage.redirectToRoot();
  await loginPage.form.fillForm();
  await loginPage.form.submitForm();
});


/*
test(`Authorization with incorrect user`, async ({ page }) => {
  const loginPage = new LoginPage(page, WRONG_USER);

  await loginPage.redirectToRoot();
  await loginPage.form.fillFormAndSubmit({
    submitValidation: {
      status: 400,
    },
  });
});

test(`Authorization with empty form`, async ({ page }) => {
  const loginPage = new LoginPage(page, EMPTY_USER);

  await loginPage.redirectToRoot();
  await loginPage.form.fillFormAndSubmit();
});
*/