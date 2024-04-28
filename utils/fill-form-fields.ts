import { ComponentDataAttributeEnum } from './data-attributes';

import { FormFieldFillMethod, FormItem, FormItemType } from '../types';

import { Locator, Page } from '@playwright/test';

const fillTextField: FormFieldFillMethod = async ({ name, value, formElement }) => {
  if (!Array.isArray(value)) {
    const textField: Locator = formElement.locator(`[${ComponentDataAttributeEnum.CONTROL}="${name}"] input[name]`);
    await textField.fill(value.toString());
  }
};

const fillTextAreaField: FormFieldFillMethod = async ({ name, value, formElement }) => {
  if (!Array.isArray(value)) {
    const textField: Locator = formElement.locator(`[${ComponentDataAttributeEnum.CONTROL}="${name}"] textarea[name]`);
    await textField.fill(value.toString());
  }
};

const fillSelectField: FormFieldFillMethod = async ({ name, value, formElement, page }) => {
  const selectField: Locator = formElement.locator(`[${ComponentDataAttributeEnum.CONTROL}="${name}"] > div`);
  await selectField.click();

  const popper: Locator = page.locator(`[${ComponentDataAttributeEnum.SELECT_DROPDOWN}="${name}"]`);
  const option: Locator = popper.locator(`[${ComponentDataAttributeEnum.SELECT_DROPDOWN_OPTION}="${value}"]`);
   
  await option.click();
 
};

const fillFormFields = async (formSelector: string, formItems: FormItem[], page: Page) => {
  const formElement: Locator = page.locator(`[${ComponentDataAttributeEnum.FORM}="${formSelector}"]`);
  let fillMethod: FormFieldFillMethod | undefined;

  for (const { name, value, type } of formItems) {
    switch (type) {
      case FormItemType.TEXT_FIELD:
        fillMethod = fillTextField;
        break;
      case FormItemType.TEXTAREA_FIELD:
        fillMethod = fillTextAreaField;
        break;
      case FormItemType.SELECT:
        fillMethod = fillSelectField;
        break;
      default:
        break;
    }

    await fillMethod?.({
      name,
      value,
      formElement,
      page,
    });
  }
};

export default fillFormFields;
